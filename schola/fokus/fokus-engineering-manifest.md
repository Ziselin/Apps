# Fokus Engineering Manifest

Fokus ist die lokale Schola-App zum Erstellen und Bearbeiten von Aufgabenspaces. Sie arbeitet ohne Konten und ohne Netzwerkübertragung.

## Fachliche Leitlinien

- Lehrkraft-Masterdaten, Klartextcodes und Codezustände bleiben im lokalen Browser-Speicher.
- Der Erstellen-Modus besitzt einen Editor-/Browser-Umschalter in der unteren Fußleiste. Der Browser verwaltet mehrere lokale Projekte sowie vollständige `.fokus-lehrer`-Sicherungen.
- Projektordner folgen dem Ziselin-Browserbaum und lassen sich aufklappen. Der Kindbereich `Klassen` verwaltet projektbezogene Klassen und Schülerlisten mit stabilen lokalen IDs.
- Klassen- und Namensdaten sind Bestandteil der Lehrerversion, werden jedoch nicht in die verteilte Schülerversion übernommen.
- Der Export in der Editor-Hauptansicht erzeugt ausschließlich die reduzierte Schülerversion `.fokus`.
- Verteilte `.fokus`-Dateien enthalten Aufgaben, BE, Wortgrenzen und ausschließlich SHA-256-Prüfwerte der vierstelligen alphanumerischen Zugangscodes; die Codes selbst sind nicht enthalten.
- Verteilte `.fokus`-Dateien enthalten niemals Lösungen, Lösungsvarianten, Lösungshashes, Erwartungshorizonte oder andere auswertungsrelevante Lehrkraftdaten. Beim Lückentext wird nur die Position der Lücken exportiert.
- Ein aktivierter Wortspeicher ist ausdrücklich freigegebener Aufgabeninhalt für Schüler und damit keine verborgene Korrekturlösung. Er enthält eine ungeordnete Wortmenge ohne Zuordnung zu einzelnen Lücken und kann zusätzliche Ablenkungsbegriffe enthalten.
- Lösungen und Erwartungshorizonte bleiben ausschließlich in der lokalen Lehrerversion. Erst wenn eine Schülerarbeit später in das zugehörige Lehrkraftprojekt importiert wird, darf Fokus beide Datenbereiche lokal zusammenführen und daraus einen pseudonymisierten Korrektur-Prompt erzeugen. Dieser Auswertungsprozess ist noch nicht implementiert.
- `.fokus-resultat`-Dateien enthalten Antworten und ein getrenntes Integritätsprotokoll.
- Bei der Abgabe bestätigt der Schüler seinen vollständigen Namen. Erst diese Bestätigung beendet Tracking und Zeitmessung; der Dateiname beginnt mit Name und lokalem Datum-Zeitstempel.
- Editorfelder wachsen mit dem Inhalt; nur der gesamte Aufgabenraum scrollt.
- Der Plus-Knopf öffnet eine erweiterbare Auswahl von Aufgabentypen. Unterstützt werden `text` (Textaufgabe) und `cloze` (Lückentext).
- Jeder Projektordner verwendet einheitlich entweder `BE` (Bewertungseinheiten, zugleich der kompatible Standard für bestehende Projekte) oder `P` (Punkte). Die Auswahl am Bewertungsfeld einer beliebigen Aufgabe stellt alle Aufgaben desselben Projekts um; neue Aufgaben, Export, Schüleransicht und Ergebnisansicht verwenden dieselbe Einheit.
- Bearbeitung beginnt ausschließlich durch den expliziten Start. Ein Fokusverlust von mindestens zehn Sekunden sperrt die Sitzung.
- Interaktive Schola-Materialien, die innerhalb des Fokus-Aufgabenraums eingebettet sind, gehören zum erlaubten Arbeitsbereich. Die Interaktion in einem solchen eingebetteten Dokument darf weder als Fokusverlust protokolliert werden noch die Sperrfrist starten; erst das tatsächliche Verlassen oder Ausblenden des Browserdokuments gilt als Fokusverlust.
- Materialien behalten in der Schüleransicht eine nicht editierbare Materialkopfzeile ohne Ein-/Ausklapp- oder Löschfunktion. Von dort können sie innerhalb der Fokus-Seite bildschirmfüllend geöffnet und wieder verkleinert werden; in dieser Ansicht bleibt die laufende Bearbeitungszeit sichtbar.
- Gehört eine gesperrte Sitzung zum lokal vorhandenen Lehrkraftprojekt, bietet Fokus eine ausschließlich auf diesem Gerät sichtbare Beendigung der Lehrkraft-Vorschau an. Schülerimporte erhalten diese Freigabe nicht.
- Eine gesperrte importierte Sitzung kann nach ausdrücklicher Warnbestätigung verworfen werden, damit die Bearbeiten-Startseite und eine neue Dateiauswahl wieder erreichbar sind.
- Ereignisse unterstützen die Aufsicht, sind aber keine automatische fachliche Bewertung.
- Fokus verspricht keine betriebssystemweite Kiosksicherheit. Browser- und Betriebssystemgrenzen werden in der Oberfläche nicht verschleiert.
