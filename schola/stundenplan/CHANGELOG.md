# Changelog – Stundenplan

Alle wesentlichen Änderungen an der App werden in dieser Datei dokumentiert.

## 1.1.0 – Unveröffentlicht

### 2026-08-25

- Mehrtägige Projekttage nach Klassen gleichen Unterricht nun über aktuelle Klassen-, Kurs- und Klassenstufen-Zuordnungen statt über fragile Anzeigenamen oder veraltete ID-Momentaufnahmen ab.
- Projekttage können unabhängig steuern, ob sie Unterricht ausfallen lassen und ob sie selbst im Kalender erscheinen.
- Klasseneditor um die Tabs „Allgemein“ und „Schülerliste“ mit stabilen kopierbaren Schüler-IDs sowie bearbeitbaren eindeutigen laufenden Nummern erweitert.
- Allgemein-Tab mit kompaktem Klassenkürzel-Feld und bis zu zwei optionalen Klassenlehrern ergänzt.
- Stabile `KL1`-Klassen-ID mit Kopierdialog und lokal aktualisiertem Transportdatensatz für Klassenname, Klassenlehrer und Schülerliste ergänzt.
- Klassenstufen samt Klassen-, Lehrer- und Schülerdaten als eigene JSON-Dateien importier- und exportierbar gemacht.
- Klassen und Fächer im Eigenschaftenbereich in zwei kompakte Tabs aufgeteilt.
- Klassen innerhalb einer Klassenstufe nach ihrem Kürzel alphabetisch sortiert.
- Menüs der Fachkarten wieder kollisionsfrei am rechten Kartenrand ausgerichtet.
- Zeitlich begrenzte Projekttage blenden auch Kursstunden über deren aktuelle Herkunftsklassen zuverlässig aus.
- Ältere Projekttag-Zuweisungen werden über Schule, Klassenstufe und Kürzel auf die aktuellen Klassen-IDs aufgelöst.
- Stundenkarten auf zwei Zeilen verdichtet und Raumangabe rechts unter der Klasse angeordnet.
- Ausfalloption bei Projekttagen eindeutig auf den regulären Unterricht der zugewiesenen Klasse bezogen.

### 2026-08-24

- Rahmenlose Hauptansicht, höhenoptimiertes Jahresraster, einheitlich gewichtete Kopfleisten-Symbole und `file://`-sicheres zentrales Hauptmenü umgesetzt.
- Als Frist markierte Termine als datierte To-dos mit Erledigt-Checkbox dargestellt.
- Rechte Hauptseiten-Sidebar für Projektgruppen, Klassenprojekte und offene To-dos ergänzt.
- Kalenderposition beim Öffnen und Schließen der rechten Sidebar stabilisiert.
- Projektkarten mit scrollbar aufklappbaren Terminen und unabhängige To-do-Scrollfläche ergänzt.
- Sidebar-Projekte, Termine und To-dos nach dem jeweils nächsten Datum geordnet.
- Vollständig abgelaufene Projekte aus der Sidebar-Projektansicht ausgeblendet.
- Projektinterne To-dos zusätzlich mit synchroner Erledigt-Checkbox in den aufgeklappten Projektkarten dargestellt.
- Eigenständige Einzelveranstaltungen aus der Projektansicht in einen chronologischen Sidebar-Tab verschoben.
- Eingeklappte schulische und persönliche Termingruppen per Ziehen dauerhaft sortierbar gemacht.
- Separate Klassenfahrten-Rubrik aus „Schulische Termine“ entfernt, ohne bestehende Daten zu löschen.
- Einzeltermine über eine dritte Dialog-Checkbox unabhängig in den Kalenderansichten ein- und ausblendbar gemacht.
- Tagesfelder im Jahreskalender auf ein maximales Breite-Höhe-Verhältnis von 1,5:1 begrenzt.
- Jahresraster gegen Zellüberlagerungen abgesichert und bei niedrigen Desktopfenstern zugunsten der Lesbarkeit scrollbar gemacht.
- Wochenspalten und Tagesfelder auch in schmalen Monatskarten vollständig innerhalb ihrer Karten gehalten.
- Vertikalen Zeitmaßstab und damit die Stundenfeldhöhe in Tages- und Wochenansicht halbiert.
- Oberen Leerraum zwischen Kopfzeile und Kalendersteuerung auf höchstens die Hälfte reduziert.
- Kopfzeile selbst auf 60 px verdichtet und Kalendersteuerung unmittelbar darunter positioniert.
- Sichtbaren Abstand zwischen unterem Kalenderrand und Fußleiste etwa halbiert.
- Stabile `SP1`-Projektordner-ID mit Kopierdialog im Projektmenü als Grundlage der Classroom-Screen-Anbindung ergänzt.

### 2026-08-23

- Freie Minuteneingabe mit einheitlicher 5-Minuten-Uhrauswahl umgesetzt.
- Urlaub als ganztägige Abwesenheit mit automatischem Unterrichtsausfall festgelegt.
- Fachunabhängige Klassen, Schulansichten, Fächer- und Kurszuordnungen, globale Darstellungsvarianten sowie semantische Mehrfachauswahl ergänzt.
- Schulische und persönliche Termingruppen um einklappbare Gruppen sowie verschachtelte Projektgruppen mit Terminen und To-dos erweitert.
- Automatische Startposition am aktuellen Zeitpunkt von der laufenden Aktualisierung des Zeitbalkens getrennt.
- Wochentagswerte migrierter und importierter Stunden in Kalender, Statistik, Signalen und Export vereinheitlicht.
- Stundenplanlogiken als gemeinsames, rückwärtskompatibel importierbares JSON-Paket exportiert.

### 2026-08-22

- Kalenderansichten, Live-Unterrichtsverlauf, Signale und Unterrichtsstatistik ausgebaut.
- Schulen, Zeitmodelle, Ferien, Feiertage und Unterrichtsausfälle zusammengeführt.
- Stundenplanlogiken sowie schulische, persönliche und klassenbezogene Termine neu organisiert.
- Browserstruktur, Sichtbarkeitssteuerung, Importe und Exporte erweitert.
- Kalenderaktualisierung, zeitproportionale Darstellung, Scrollverhalten und Menüs stabilisiert.

## 1.0.0 – 2026-08-14

### Stand

- Funktionale und vollständige Stundenplan-App als stabile Version 1.0 festgehalten.
