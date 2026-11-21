# Deus Guide – Engineering-Manifest

## Präambel

Deus Guide ist ein mobiler, einsteigerfreundlicher Einstellungsassistent für den XP Deus II. Die Anwendung übersetzt Suchort, Zielart und Platzbedingungen in nachvollziehbare Ausgangseinstellungen, ohne eine technisch unmögliche sichere Materialbestimmung zu versprechen.

## Zuständigkeit und Ablage

- Die App liegt eigenständig unter `Andere/deus-guide` und folgt dem Ziselin-Organisationsmanifest.
- Sie wird nicht auf der allgemeinen Ziselin-Startseite verlinkt. Der Zugriff erfolgt über den eigenständigen Ziselin-Bereich `Andere`, der nur über seine direkte URL erreichbar ist.
- App-spezifischer Quellcode, Gestaltung, Icon und Dokumentation verbleiben in diesem Ordner.
- Die App ist statisch, benötigt kein Konto und speichert persönliche Programme ausschließlich im Browser (`localStorage`).

## Verbindliche Produktregeln

- Empfehlungen sind Ausgangspunkte und werden durch einen Vor-Ort-Check ergänzt.
- Gold, Silber oder andere Metalle werden nicht als sicher anhand eines Leitwerts identifizierbar dargestellt.
- Aggressive Notch- oder Diskriminierungsempfehlungen werden vermieden, wenn dadurch wertvolle Ziele verloren gehen können.
- Die Oberfläche zeigt Anfängern primär die gegenüber dem Werkprogramm zu ändernden Werte und die zugehörigen Menüpfade.
- Parameter werden nach beobachtbaren Problemen einzeln feinjustiert; gleichzeitige, nicht nachvollziehbare Mehrfachänderungen werden vermieden.
- Rechtsinformationen sind Hinweise, keine Suchfreigabe oder Rechtsberatung.

## Technische Regeln

- Die App funktioniert ohne Build-Schritt als HTML, CSS und JavaScript.
- Mobile Bedienung, Tastaturzugänglichkeit, gut lesbare Schriftgrößen und reduzierte Bewegung werden unterstützt.
- Persönliche Daten und gespeicherte Programme verlassen den Browser nicht.
- Die Entscheidungslogik bleibt von der Darstellung getrennt und wird in `deus-guide.js` zentral gepflegt.

## Quellenbasis

Die fachliche Grundlage bildet das offizielle deutschsprachige XP-DEUS-II-Handbuch sowie die offiziellen XP-Firmwarehinweise. Firmwareabhängige Funktionen müssen vor künftigen Erweiterungen erneut gegen die jeweils aktuelle XP-Dokumentation geprüft werden.
