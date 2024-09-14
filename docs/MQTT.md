# MQTT

## Grundsätzliches
MQTT bedeutet: Message Queuing Telemetry Transport. Es handelt sich hierbei um ein M2M (Machine to Machine) Protokoll.
Für eine Kommunikation wird ein Broker (=Verwalter) benötigt, welcher die Nachrichten von den Sendern empfängt und an die Empfänger, welche sich für den Inhalt angemeldet haben, weiterleitet. Man spricht bei MQTT von publish und subscribe. Die Nachrichten werden in topics verschickt. 

openWB hat einen eigenen MQTT-Broker integriert, über den die Kommunikation läuft. Möchte man die Wallbox steuern oder Status-Nachrichten empfangen, sollte man sich als Client an diesem Broker anmelden. Der Broker läuft auf der IP der openWB unter Port 1883 ohne Nutzerauthentifizierung. 

## Zähler

Als EVU-Zähler können auch Werte über MQTT empfangen werden. Die Integration ist im Abschnitt [Zähler](https://github.com/openWB/core/wiki/Zähler) beschrieben.

## Steuerbefehle

Auf eigene Gefahr! Die folgenden Einstellungen und Kommunikationsmöglichkeiten sind nicht spezifiziert und nur von kundigen Nutzern mit entpsrechendem Fachwissen über die Konsequenzen durchzuführen. 

Bei den Steuerbefehlen ist `#` immer durch den entsprechenden Ladepunkt/Zähler/Fahrzeug zu ersetzen. Dies ist zwingend zu beachten, da ansonsten neue Fahrzeuge/Zähler etc. erstellt werden, wenn es nicht die ID eines Konfigurierten Gerätes ist.

Setzen des Lademodus
`openWB/set/vehicle/template/charge_template/#/chargemode/selected`

 Werte die zu senden sind:
| Modus | Wert |
| ------------- | ------------- |
| Sofortladen | instant_charging |
| PV-Laden | pv_charging |
| Zielladen | scheduled_charging |
| Standby | standby |
| Stop | stop |

> [!CAUTION]
> Lademodus des angesteckten Auto wird in den LP geschrieben. Solange immer dasselbe Auto dran steckt ist das gleich, aber wenn Du ein anderes Auto ansteckst, bei mir z.b. ein Gastauto und Du nur den Lademodus deines normalen Auto ausliest und damit steuerst, ist der dortige Lademodus halt dann nicht der eigentliche des LP

"Minimal Stromstärke" auf z.B. 6A (nur in PV-Laden!)
`openWB/set/vehicle/template/charge_template/#/chargemode/pv_charging/min_current -> 6`

SoC-Limit auf z.B. 80% setzen (nur in PV-Laden!)
`openWB/set/vehicle/template/charge_template/#/chargemode/pv_charging/max_soc -> 80`

Setzen von min_Current für min+PV nachbauen (nur in PV-Laden!)
`openWB/set/vehicle/template/charge_template/#/chargemode/pv_charging/min_current`

Ladepunkt sperren für Priosteuerung der LP:
`openWB/set/chargepoint/#/set/manual_lock`

SoC Update triggern:
`openWB/set/vehicle/#/get/force_soc_update`

SoC im manuellen Modus setzen:
`openWB/set/vehicle/#/soc_module/calculated_soc_state/manual_soc`

> [!IMPORTANT]
> Die Liste ist unvollständig! Gerne kannst du deinen Beitrag leisten!


## Statusnachrichten

Wo wird welcher nützliche Inhalt gesendet. 

Ladeprofil Status (verschachteltes JSON, muss entsprechend weiter decodiert werden...):
`openWB/vehicle/template/charge_template/#`

> [!IMPORTANT]
> Die Liste ist unvollständig! Gerne kannst du deinen Beitrag leisten!
