# Fokus Engineering Manifest

Fokus ist die lokale Schola-App zum Erstellen und Bearbeiten von Aufgabenspaces. Sie arbeitet ohne Konten und ohne Netzwerkübertragung.

## Fachliche Leitlinien

- Lehrkraft-Masterdaten, Klartextcodes und Codezustände bleiben im lokalen Browser-Speicher.
- Der Erstellen-Modus besitzt einen Editor-/Browser-Umschalter in der unteren Fußleiste. Der Browser verwaltet mehrere lokale Projekte sowie vollständige `.fokus-lehrer`-Sicherungen.
- Projektordner folgen dem Ziselin-Browserbaum und lassen sich aufklappen. Der Kindbereich `Klassen` verwaltet projektbezogene Klassen und Schülerlisten mit stabilen lokalen IDs.
- Klassen- und Namensdaten sind Bestandteil der Lehrerversion, werden jedoch nicht in die verteilte Schülerversion übernommen.
- Der Export in der Editor-Hauptansicht erzeugt ausschließlich die reduzierte Schülerversion `.fokus`.
- Verteilte `.fokus`-Dateien enthalten Aufgaben, BE, Wortgrenzen und ausschließlich SHA-256-Prüfwerte der vierstelligen alphanumerischen Zugangscodes; die Codes selbst sind nicht enthalten.
- `.fokus-resultat`-Dateien enthalten Antworten und ein getrenntes Integritätsprotokoll.
- Bei der Abgabe bestätigt der Schüler seinen vollständigen Namen. Erst diese Bestätigung beendet Tracking und Zeitmessung; der Dateiname beginnt mit Name und lokalem Datum-Zeitstempel.
- Editorfelder wachsen mit dem Inhalt; nur der gesamte Aufgabenraum scrollt.
- Der Plus-Knopf öffnet eine erweiterbare Auswahl von Aufgabentypen. Der erste unterstützte Typ ist `text` (Textaufgabe).
- Bearbeitung beginnt ausschließlich durch den expliziten Start. Ein Fokusverlust von mindestens zehn Sekunden sperrt die Sitzung.
- Gehört eine gesperrte Sitzung zum lokal vorhandenen Lehrkraftprojekt, bietet Fokus eine ausschließlich auf diesem Gerät sichtbare Beendigung der Lehrkraft-Vorschau an. Schülerimporte erhalten diese Freigabe nicht.
- Eine gesperrte importierte Sitzung kann nach ausdrücklicher Warnbestätigung verworfen werden, damit die Bearbeiten-Startseite und eine neue Dateiauswahl wieder erreichbar sind.
- Ereignisse unterstützen die Aufsicht, sind aber keine automatische fachliche Bewertung.
- Fokus verspricht keine betriebssystemweite Kiosksicherheit. Browser- und Betriebssystemgrenzen werden in der Oberfläche nicht verschleiert.
