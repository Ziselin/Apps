# Parlament Engineering Manifest

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
- Parteien, Stimmenmodus, Sitzzahl, Sperrklausel und gewählte Ergebnisansicht werden ausschließlich lokal im Browser gespeichert.
- Der Explorer verwaltet benannte, voneinander unabhängige Momentaufnahmen. Ein Datensatz verändert den aktuellen Arbeitsstand erst durch die ausdrückliche Aktion „Im Parlament öffnen“.
- Die „Aktuelle Ansicht“ ist der ungespeicherte Arbeitsstand und wird im Explorer stets separat von benannten Momentaufnahmen geführt; erst „Wahlergebnis speichern“ erzeugt einen Archivdatensatz.
- JSON-Exporte verwenden den Typ `schola-parliament-result` und die Formatversion 1; Importe werden vor dem lokalen Speichern validiert und normalisiert.
- Die Diagrammansicht sortiert ausschließlich die Parteien nach Stimmenanteil, die die eingestellte Sperrklausel erreichen. Die vollständige Eingabeliste bleibt Container 1 vorbehalten.
- Die Säulenauswahl summiert ausschließlich die im aktuell gewählten Verfahren vergebenen Sitze; die Anzeige nennt den Anteil dieser Sitze am gesamten Parlament und nicht die Stimmenanteile.
- Farben sind abstrakt, stabil am Datensatz gespeichert und tragen nie allein die Ergebnisinformation.
