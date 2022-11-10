import logging
import threading
from typing import Any, List, Optional

from control import data
from modules import ripple_control_receiver
from modules.common.abstract_device import AbstractDevice
from modules.common.component_type import ComponentType, type_to_topic_mapping
from modules.common.store import update_values
from helpermodules import pub
from helpermodules.utils import thread_handler

log = logging.getLogger(__name__)


class Loadvars:
    def __init__(self) -> None:
        self.event_module_update_completed = threading.Event()

    def get_values(self) -> None:
        try:
            not_finished_threads = self._set_values()
            levels = data.data.counter_all_data.get_list_of_elements_per_level()
            levels.reverse()
            for level in levels:
                with ModuleUpdateCompletedContext(self.event_module_update_completed):
                    self._update_values_of_level(level, not_finished_threads)
                data.data.copy_module_data()
            with ModuleUpdateCompletedContext(self.event_module_update_completed):
                thread_handler(self._get_general())
            data.data.pv_data["all"].calc_power_for_all_components()
            data.data.bat_data["all"].calc_power_for_all_components()
        except Exception:
            log.exception("Fehler im loadvars-Modul")

    def _set_values(self) -> List[str]:
        """Threads, um Werte von Geräten abzufragen"""
        modules_threads: List[threading.Thread] = []
        for item in data.data.system_data.values():
            try:
                if isinstance(item, AbstractDevice):
                    modules_threads.append(threading.Thread(target=item.update, args=(),
                                           name=f"device{item.device_config.id}"))
            except Exception:
                log.exception(f"Fehler im loadvars-Modul bei Element {item}")
        for cp in data.data.cp_data.values():
            try:
                modules_threads.append(threading.Thread(target=cp.chargepoint_module.get_values,
                                       args=(), name=f"cp{cp.chargepoint_module.id}"))
            except Exception:
                log.exception(f"Fehler im loadvars-Modul bei Element {cp.num}")
        return thread_handler(modules_threads)

    def _update_values_of_level(self, elements, not_finished_threads: List[str]) -> None:
        """Threads, um von der niedrigsten Ebene der Hierarchie Werte ggf. miteinander zu verrechnen und zu publishen"""
        modules_threads: List[threading.Thread] = []
        for element in elements:
            try:
                if element["type"] == ComponentType.CHARGEPOINT.value:
                    chargepoint = data.data.cp_data[f'{type_to_topic_mapping(element["type"])}{element["id"]}']
                    if self.thread_without_set_value(modules_threads, not_finished_threads) is False:
                        modules_threads.append(threading.Thread(
                            target=update_values,
                            args=(chargepoint.chargepoint_module,),
                            name=f"cp{chargepoint.chargepoint_module.id}"))
                else:
                    component = self.__get_component_obj_by_id(element["id"], not_finished_threads)
                    if component is None:
                        continue
                    modules_threads.append(threading.Thread(target=update_values, args=(
                        component,), name=f"component{component.component_config.id}"))
            except Exception:
                log.exception(f"Fehler im loadvars-Modul bei Element {element}")
        thread_handler(modules_threads)

    def thread_without_set_value(self,
                                 modules_threads: List[threading.Thread],
                                 not_finished_threads: List[str]) -> bool:
        for t in not_finished_threads:
            for module_thread in modules_threads:
                if t == module_thread.name:
                    return True
        return False

    def __get_component_obj_by_id(self, id: int, not_finished_threads: List[str]) -> Optional[Any]:
        for item in data.data.system_data.values():
            if isinstance(item, AbstractDevice):
                for t in not_finished_threads:
                    if t == f"device{item.device_config.id}":
                        log.error(f"Keine aktuellen Werte für Gerät {item.device_config.name}")
                        return None
                for comp in item.components.values():
                    if comp.component_config.id == id:
                        return comp
        else:
            log.error(f"Element {id} konnte keinem Gerät zugeordnet werden.")
            return None

    def _get_general(self) -> List[threading.Thread]:
        threads = []  # type: List[threading.Thread]
        try:
            # Beim ersten Durchlauf wird in jedem Fall eine Exception geworfen,
            # da die Daten erstmalig ins data-Modul kopiert werden müssen.
            if data.data.general_data.data.ripple_control_receiver.configured:
                threads.append(threading.Thread(target=ripple_control_receiver.read, args=()))
        except Exception:
            log.exception("Fehler im loadvars-Modul")
        finally:
            return threads


class ModuleUpdateCompletedContext:
    def __init__(self, event_module_update_completed: threading.Event):
        self.event_module_update_completed = event_module_update_completed

    def __enter__(self):
        timeout = data.data.general_data.data.control_interval/2
        if self.event_module_update_completed.wait(timeout) is False:
            log.error(
                "Modul-Daten wurden noch nicht vollständig empfangen. Timeout abgelaufen, fortsetzen der Regelung.")
        return None

    def __exit__(self, exception_type, exception, exception_traceback) -> bool:
        self.event_module_update_completed.clear()
        pub.Pub().pub("openWB/set/system/device/module_update_completed", True)
        return True
