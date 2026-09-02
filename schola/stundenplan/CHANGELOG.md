# Changelog – Stundenplan

Alle wesentlichen Änderungen an der App werden in dieser Datei dokumentiert.

## 1.1.0 – Unveröffentlicht

### 2026-09-02

- Der Live-Ladebalken mit Phasenfortschritt und 15-Minuten-Countdown erscheint in Tages- und Wochenansicht ausschließlich bei Unterrichtsstunden, Vertretungen und Aufsichten.

### 2026-08-31

- Vertretungsstunden erlauben alternativ zur Katalogauswahl eine freie Klassenangabe, ohne dafür statistisch relevante Klassen anlegen zu müssen.
- Aufsichten folgen bei ausdrücklich unterrichtsüberschreibenden Terminen derselben Ausblendlogik wie Fächer und Kurse.
- Unterrichtsüberschreibungen bleiben unabhängig vom Auge einer Termingruppe wirksam; aktivierte Ausfalloptionen werden im Dialog rot und mit einem eindeutigen Hinweis hervorgehoben.
- Beim Blättern durch Tages- und Wochenansicht bleibt die zuvor betrachtete Zeitposition erhalten; die Ansicht springt nicht erneut zur aktuellen Uhrzeit.
- Vertretungsstunden werden obligatorisch angezeigt und von Ferien, Krankheit, Projekten, Terminen oder anderen Unterrichtsausfällen nicht überschrieben.
- Heute fällige unerledigte To-dos werden kreidegelb markiert und zwischen überfälligen und später fälligen Aufgaben einsortiert.
- To-do-Karten öffnen beim Anklicken den zugehörigen Bearbeitungsdialog; ausschließlich die Checkbox ändert den Erledigt-Status.
- Abgelaufene schulische und persönliche Termine erscheinen im Editor dezent entsättigt und verblasst, bleiben jedoch vollständig bedienbar.

### 2026-08-30

- Aufsichten erhalten die Unterrichts-Farbpalette, bleiben auch an sonst unterrichtsfreien Tagen obligatorisch sichtbar und zeigen 15 Minuten vor Beginn den roten Countdown.
- Der Aufsichts-Eingabeplan positioniert Einträge minutengenau und zeigt stundenübergreifende Aufsichten als eine zusammenhängende Karte.
- Aufsichtspläne zeigen ihre Einträge in einem klickbaren Wochenraster mit festen 60-Minuten-Zeilen, ohne Stundenbezeichnungen oder Pausen; freie Felder öffnen zuverlässig unmittelbar den Dialog mit frei anpassbarer Zeit.
- Der Unterordner „Aufsichten“ verwaltet versionierte, wiederkehrende Aufsichtspläne mit Schule, wählbaren Wochentagen, Gültigkeit sowie einzelnen Einträgen aus Zeit und Ort – ohne Fach, Klasse oder Verlauf.
- Aufsichtsplan-Versionen können über ihr Browsermenü geschützt durch Gedrückthalten gelöscht werden; mindestens eine Version bleibt erhalten.
- „Stundenpläne“ erhält den Unterordner „Vertretungen“ für einmalige Stunden mit Datum, Zeit, Klasse und Raum; neue Einträge stehen oben und erscheinen obligatorisch wie Unterricht im Kalender.
- Vertretungsstunden erhalten ein frei eintragbares Fach, das in der Kalenderdarstellung als Stundenbezeichnung erscheint.
- Ein Klick auf eine Vertretungsstunde in Tages-, Wochen- oder Monatsansicht öffnet unmittelbar ihren Bearbeitungsdialog.
- Vertretungen erscheinen im Editor als ruhige, bündig ausgerichtete Infozeilen mit Datum, Zeit, Klasse/Klassenstufe, Raum und Fach.
- Der Projektbrowser zeigt nur den Unterordner „Vertretungen“; einzelne Vertretungsstunden bleiben der Editorliste und dem Kalender vorbehalten.
- Zeitfelder in Vertretungs- und Aufsichtsdialogen erhalten ausreichend Breite für sauber getrennte und zentrierte Stunden-, Doppelpunkt- und Minutenbereiche.
- Unerledigte überfällige To-dos bleiben in der Stundenplan-Sidebar ganz oben und werden kreiderot hervorgehoben.
- Jeder Haupt-Projektordner repräsentiert genau ein Schuljahr und bewahrt dessen Klassen, Kurse sowie schulische und persönliche Termine global; bestehende Projekte werden verlustfrei in dieses Modell überführt.
- Projekttitel und Kalenderrahmen liegen im Haupt-Projektordner; ausschließlich die darin enthaltenen Stundenplanversionen besitzen eigene Gültigkeitszeiträume.
- Der Browser gliedert „Stundenpläne“ in vollständige, zeitlich gültige Stundenplanversionen und deren sämtliche Stundenplanlogiken; bestehende Logiken werden gemeinsam in die erste Version migriert.
- Vollständige Stundenplanversionen lassen sich samt aller Logiken, Unterrichtsstunden und Zeitraster nicht-destruktiv duplizieren; die Kopie bleibt bis zur vollständigen Gültigkeitsangabe kalenderinaktiv.
- Stundenplanversionen können über ihr Browsermenü vollständig gelöscht werden; als Schutz vor einem orientierungslosen Leerzustand bleibt mindestens eine Version erhalten.
- Kurse erhalten eine kopierbare `KU1`-ID; der lokale Klassenkatalog transportiert darüber Fach, Kursname und ausschließlich die ausgewählten Kursschüler.

### 2026-08-27

- „Projekttage nach Klassen“ in „Schulische Termine“ überführt: gemeinsamer Ereignisdialog mit optionaler Klassen-/Kurszuweisung, getrennten Auswirkungen auf Klassenunterricht und eigenen Unterricht sowie personenbezogener Fristlogik; Klassen erzeugen keine Browserordner mehr.
- Bestehende klassenbezogene Projekte verlustfrei als ungruppierte schulische Termine migriert und für die manuelle Gruppenorganisation vorbereitet.
- Die Zuordnung von Einzelereignissen unterscheidet allgemeine Gruppen und darin liegende Projektgruppen jetzt eindeutig; beide Ebenen sind direkt auswählbar.
- Schulische Termine um einen optionalen Ort/Raum ergänzt; Tages- und Wochenansicht zeigen Klassenbezug und Raum wie bei Unterrichtsstunden oben rechts untereinander.
- Unterrichtsstunden zeigen 15 Minuten vor Beginn einen kreideroten, rückwärts laufenden Vorbereitungsbalken und wechseln zum Stundenbeginn live in den regulären Phasenverlauf.
- Schulische und persönliche Termingruppen zeigen im Gruppenkopf den jeweils nächsten anstehenden Termin – einschließlich der Termine aus enthaltenen Projektgruppen.
- Klassenkarten zeigen Klassenlehrer und Schülerzahl als direkte Sprungziele zu „Allgemein“ beziehungsweise „Schülerliste“ im Klassendialog.
- Kurse um eine Schülerauswahl mit Checkboxdialog, stabilen Schüler-IDs und gekoppelten Herkunftsklassen erweitert.

### 2026-08-25

- Mehrtägige Unterrichtsstunden als gemeinsame Serie gespeichert, sodass abgewählte Wochentage entfernt und beim Zurückstellen keine Doppelstunden erzeugt werden.
- Ungruppierte schulische und persönliche Einzeltermine in dieselbe Dialog-Zuordnung einbezogen und „Keine Gruppe“ als echte Ablageebene umgesetzt.
- Gruppen- und Projektgruppenzuordnung aus den Terminkarten in die Bearbeitungsdialoge von Terminen, Fristen und To-dos verlegt.
- Einzeltermine um eine direkte Auswahl ihrer Termin- oder Projektgruppe ergänzt.
- Bestehende Termine per Ziehen zwischen Gruppen, Projektgruppen und der Einzeltermin-Ebene verschiebbar gemacht.
- Trennlinie im Kopf eingeklappter Projektgruppen entfernt.
- Projektgruppen innerhalb persönlicher und schulischer Termingruppen standardmäßig eingeklappt und separat aufklappbar gemacht.
- Termingruppen im Projektbrowser mit gezielter Scrollnavigation zu ihren Editor-Karten verknüpft.
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
- Sichtbarkeitsaugen von der Ausfalllogik getrennt: ausgeblendete Termine und Projekttage behalten ihre fachliche Wirkung.
- Navigierbare Monatsansicht mit Unterricht, Ferien, Projekten, Terminen und Abwesenheiten ergänzt.
- Heutigen Tag in Monats- und Jahresansicht einheitlich über die Tageszahl statt über einen zusätzlichen Zellrahmen hervorgehoben.
- Klassenordner im Projektbrowser aufklappbar gemacht und eingerichtete Schulen als direkte Unterpunkte ergänzt.
- Klassenbrowser bis zu Klassenstufen und Einzelfächern hierarchisch ausgebaut und mit gezielter Editor-Navigation verknüpft.

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
