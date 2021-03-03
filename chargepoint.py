"""Ladepunkt-Logik
"""

import data
import ev
import pub
import timecheck


class allChargepoints():
    """
    """

    def __init__(self):
        self._data = {}

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, data):
        self._data = data

class chargepoint():
    """ geht alle Ladepunkte durch, prüft, ob geladen werden darf und ruft die Funktion des angesteckten Autos auf. 
    """

    def __init__(self):
        self._data = {}
        self._template = None  # Instanz des zugeordneten CP-Templates
        self._topic_path = None

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, data):
        self._data = data

    @property
    def template(self):
        return self._template

    @template.setter
    def template(self, template):
        self._template = template

    @property
    def topic_path(self):
        return self._topic_path

    @topic_path.setter
    def topic_path(self, path):
        self._topic_path = path

    def _is_cp_available(self):
        """ prüft, ob sich der LP in der vorgegebenen Zeit zurückgemeldet hat.
        """
        # dummy
        return True

    def _is_autolock_active(self):
        """ ruft die Funktion der Template-Klasse auf.
        """
        try:
            return self._template.autolock(self._data["get"]["autolock_state"], self._data["get"]["charge_state"], self._topic_path)
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in __is_autolock_active")

    def get_state(self):
        """prüft alle Bedingungen und ruft die EV-Logik auf.

        Return
        ------
        0..x: Nummer des zugeordneten EV
        None: Ladepunkt nicht verfügbar
        """
        try:
            if self._is_cp_available() == True:
                if self._data["get"]["manual_lock"] == False:
                    if self._data["get"]["plug_state"] == True:
                        if self._is_autolock_active() == True:
                            return self._template.get_ev(self._data["get"]["rfid"])
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in get_state")
            return None
        return None


class cpTemplate():
    """ Vorlage für einen LP.
    """

    def __init__(self):
        self._data = {}

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, data):
        self._data = data

    def autolock(self, autolock_state, charge_state, topic_path):
        """ ermittelt den Status des Autolock und published diesen. Es wird sich immer der Status des vorherigen Plans gemerkt, so kann festgestellt  werden, wenn sich zwei Pläne widersprechen.

        Parameter
        ---------
        autolock_state : int
            Autolock-Status-Code:
            0 = standby
            1 = Nach Beenden der Ladung wird Autolock aktiviert
            2 = durch Autolock gesperrt
            3 = nicht durch Autolock gesperrt
            4 = Autolock manuell deaktiviert

        charge_state : int
            Ladung aktiv/nicht aktiv

        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics

        Return
        ------
        True: nicht durch Autolock gesperrt -> Ladung möglich
        False: durch Autolock gesperrt
        """
        try:
            if (self._data["autolock"]["active"] == True):
                if autolock_state != 4:
                    if timecheck.check_plans_timeframe(self._data["autolock"]) != None:
                        if self._data["autolock"]["wait_for_charging_end"] == True:
                            if charge_state == True:
                                state = 1
                            else:
                                state = 2
                        else:
                            state = 2
                    else:
                        state = 3

                    pub.pub(topic_path+"/get/autolock_state", state)
                    if (state == 1) or (state == 3):
                        return True
                    elif state == 2:
                        return False
                else:
                    return True
            else:
                return True
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in autolock")
            return True

    def autolock_manual_disabling(self, topic_path):
        """ aktuelles Autolock wird außer Kraft gesetzt.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self._data["autolock"]["active"] == True):
                pub.pub(topic_path+"/get/autolock", 4)
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in autolock_manual_disabling")

    def autolock_manual_enabling(self, topic_path):
        """ aktuelles Autolock wird wieder aktiviert.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self._data["autolock"]["active"] == True):
                pub.pub(topic_path+"/get/autolock", 0)
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in autolock_manual_enabling")

    def autolock_enable_after_charging_end(self, autolock_state, topic_path):
        """Wenn kein Strom für den LP übrig ist, muss Autolock ggf noch aktiviert werden.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self._data["autolock"]["active"] == True) and autolock_state == 1:
                pub.pub(topic_path+"/get/autolock", 2)
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in autolock_enable_after_charging_end")

    def get_ev(self, rfid):
        """ermittelt das dem LP zugeordnete EV
        """
        try:
            if self._data["rfid_enabling"] == True and rfid != 0:
                vehicle = ev.get_ev_to_rfid(rfid)
                if vehicle == None:
                    return self._data["ev"]
                else:
                    return vehicle
            else:
                return self._data["ev"]
        except KeyError as key:
            print("dictionary key", key, "doesn't exist in get_ev")