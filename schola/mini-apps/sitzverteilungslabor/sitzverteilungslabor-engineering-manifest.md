# Sitzverteilungslabor Engineering Manifest

## Fachlicher Zweck

Die MiniApp isoliert die mathematische proportionale Sitzverteilung. Sie bildet weder das Bundestagswahlrecht noch Wahlkreise, Direktmandate oder Ausgleichsmechanismen ab.

## Berechnungsregeln

- Alle Verfahren werden über `allocation-engine.js` mit derselben Schnittstelle aufgerufen. Die Oberfläche enthält keine eigene Zuteilungslogik.
- Die Sperrklausel bezieht sich auf den Stimmenanteil vor der Verteilung. Der Grenzwert selbst ist zugelassen; Stimmen ausgeschiedener Parteien gehen nicht in die anschließende Verteilung ein.
- Sainte-Laguë/Schepers wird als äquivalentes Höchstzahlverfahren mit Divisoren 1, 3, 5, … berechnet. Dies entspricht dem Divisorverfahren mit Standardrundung.
- D’Hondt verwendet die Divisoren 1, 2, 3, …; Hare/Niemeyer zunächst ganzzahlige Quoten und danach die größten Reste.
- Exakte Gleichstände werden sichtbar protokolliert. Technisch entscheidet reproduzierbar zuerst die höhere Stimmenzahl, danach die stabile Partei-ID. Dies ist keine Aussage über die Losregeln einer realen Wahlordnung.
- Ein weiteres mathematisches Verfahren wird im Methodenregister ergänzt und implementiert dieselbe Ergebnisstruktur.

## Oberfläche und Zustand

- Die Anwendung folgt der Schola-Farb-, Karten- und Navigationssprache und ist eigenständig sowie per `iframe` einbettbar.
- Parteien, Stimmenmodus, Sitzzahl, Sperrklausel und Ansicht werden ausschließlich lokal im Browser gespeichert.
- Farben sind abstrakt, stabil am Datensatz gespeichert und tragen nie allein die Ergebnisinformation.
