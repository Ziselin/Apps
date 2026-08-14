# Classroom Screen Engineering Manifest

## Präambel

Classroom Screen ist eine flexibel bestückbare Unterrichtsfläche für die Sekundarstufen und darüber hinaus. Eigenständig entwickelte Mini-Apps wie der Timer sowie Classroom-spezifische Notizen und eingebundene Texte unterstützen Arbeitsphasen und die gemeinsame Orientierung im Raum.

Dieses Manifest regelt den spezifischen Kompetenzbereich der Schola-App Classroom Screen. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest.

## Zuständigkeit

Classroom Screen verantwortet die Unterrichtsfläche, ihre Mini-Apps, deren Anordnung und Zustände sowie den Import und Export eines vollständigen Screen-Arbeitsstands.

## Vereinbarte Grundregeln

- Der Classroom Screen bindet eigenständige Mini-Apps ein, besitzt aber nicht deren alleinige fachliche Implementierung.
- Der Timer muss im Classroom Screen und im eigenständigen Zugang dieselbe Implementierung verwenden.

- Mini-Apps liegen direkt auf der Unterrichtsfläche und können eigene gespeicherte Zustände besitzen.
- Der Besen leert die Unterrichtsfläche und setzt die Zustände der entfernten Mini-Apps zurück.
- Der JSON-Export enthält die Einstellungen aller vorhandenen Mini-Apps und bleibt für weitere Mini-Apps erweiterbar.
- TypeMap-Texte werden mit HTML und Provenienzinformationen übernommen; ihre ID bleibt eine allgemeine TypeMap-ID.
- Appübergreifende UI-Vorlagen werden aus `assets/ui` eingebunden und nicht lokal dupliziert.
- Neue fachliche oder organisatorische Classroom-Screen-Regeln werden in diesem Manifest dokumentiert.
- Erkannte Konflikte mit übergeordneten Manifesten werden vor einer Implementierungsänderung gemeinsam geklärt.
