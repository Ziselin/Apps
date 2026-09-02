# Changelog – Classroom Screen

Alle wesentlichen Änderungen an der App werden in dieser Datei dokumentiert.

## Unveröffentlicht

### Hinzugefügt

- Das aktive Stundenplanmodul spielt zu Beginn und Ende tatsächlich stattfindender Unterrichtsstunden automatisch dieselben Signale wie der Stundenplan. Ausfälle und unterrichtsfreie Tage werden berücksichtigt; beim Ausblenden verstummen die Signale.
- Integrierte Funktion „Datum“ ergänzt: Das aktuelle Datum mit Wochentag lässt sich über die Schnellleiste ein- und ausblenden, frei positionieren und mitsamt Schriftgröße skalieren. Sichtbarkeit und Layout werden lokal und im JSON-Export gesichert.
- Integrierte Funktion „Bild einfügen“ mit Dateiimport, Drag & Drop und Übernahme aus der Zwischenablage ergänzt. Bilder lassen sich rahmenlos platzieren, auswählen, verschieben, proportional skalieren und schließen; Bilddaten und Layout werden lokal sowie im JSON-Export gesichert.
- Gemeinsame Checkboxliste unter „Mehr“ auf Mini-Apps und integrierte Funktionen erweitert.
- Die kompakte Stundenanzeige berücksichtigt den unabhängigen Unterrichtsausfall-Schalter klassenbezogener Projekttage.
- Stundenplan als auswählbare Mini-App der Schnellleiste mit Projektordner-ID-Dialog ergänzt.
- Stundenplan-Mini-App um einen blanken Tagesrahmen im Verhältnis 1:5 und die live animierte aktuelle Unterrichtsstunde mit Phasenverlauf ergänzt.
- Stundenplanfeld auf kompakte halbe Breite reduziert und frei verschiebbar mit gespeicherter Position eingerichtet.
- Classroom-Stundenanzeige für die Tafel auf Fach, Unterrichtszeit, aktuelle Phase und einen ruhigen unbeschrifteten Verlauf reduziert.
- Hauptmenü auf die zentrale, aus TimeMap abgeleitete Menüvorlage umgestellt.
- Das bisherige methodische Werkzeugraster unter „Mehr“ wurde durch eine kompakte Checkbox-Liste für Timer, Periodensystem und „Text einfügen“ ersetzt. Die lokal gespeicherte Auswahl bestimmt, welche Mini-Apps in der unteren Schnellleiste erscheinen.
- Schnellleiste und Auswahlfenster verwenden dieselben zentralen SVG-Icons wie die Mini-Apps-Sammlung der Schola-Hauptseite.
- Das Periodensystem lässt sich aus der Schnellleiste in einem eigenen Classroom-Container öffnen und schließen, ohne seine fachliche Implementierung zu duplizieren.
- App-spezifisches Changelog und fortlaufende Versionsführung eingerichtet.
- Fortschreibbare Präambel mit einer Kurzbeschreibung der App im Manifest ergänzt.
- Eigenständigen Timer-Zugang auf Basis derselben Implementierung ermöglicht.

### Geändert

- Zuständigkeit des Classroom Screens gegenüber eigenständigen Mini-Apps im Manifest geklärt.

## 0.1.0 – 2026-08-14

### Stand

- Bestehenden Entwicklungsstand des Classroom Screens mit Timer-, Notiz-, Textelement- und Exportfunktionen als Ausgangsversion übernommen.
