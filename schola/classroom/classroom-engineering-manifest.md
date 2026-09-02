# Classroom Screen Engineering Manifest

## Präambel

Classroom Screen ist eine flexibel bestückbare Unterrichtsfläche für die Sekundarstufen und darüber hinaus. Eigenständig entwickelte Mini-Apps wie der Timer sowie Classroom-spezifische Notizen und eingebundene Texte unterstützen Arbeitsphasen und die gemeinsame Orientierung im Raum.

Dieses Manifest regelt den spezifischen Kompetenzbereich der Schola-App Classroom Screen. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest.

## Zuständigkeit

Classroom Screen verantwortet die Unterrichtsfläche, ihre Mini-Apps, deren Anordnung und Zustände sowie den Import und Export eines vollständigen Screen-Arbeitsstands.

## Vereinbarte Grundregeln

- Der Classroom Screen bindet eigenständige Mini-Apps ein, besitzt aber nicht deren alleinige fachliche Implementierung.
- Der Timer muss im Classroom Screen und im eigenständigen Zugang dieselbe Implementierung verwenden.
- Ist das Stundenplanmodul mit einem ausgewählten Projekt aktiv und sichtbar, spielt der Classroom Screen automatisch die zentralen Stundenplan-Signale zu Stundenbeginn und Stundenende. Es gelten dieselben Regeln für Gültigkeitszeiträume, Wechselwochen, Ferien, Krankheit, Termine und klassenbezogene Unterrichtsausfälle wie für die Stundenanzeige; ein ausgeblendetes oder nicht ausgewähltes Modul erzeugt keine Signale.

- Mini-Apps liegen direkt auf der Unterrichtsfläche und können eigene gespeicherte Zustände besitzen.
- Das Menü „Mehr“ ist eine reine Verwaltung der Schnellleiste. Seine Checkboxliste führt eigenständige Mini-Apps und integrierte Classroom-Funktionen gemeinsam; ausgewählte Einträge erscheinen als Schnellzugriff in der unteren Leiste. Das Abwählen eines Schnellzugriffs entfernt keine bereits auf der Unterrichtsfläche liegenden Inhalte. Diese Auswahl wird lokal gespeichert. Zu den integrierten Funktionen gehören „Text einfügen“, „Bild einfügen“ und „Datum“.
- Namen und Icons richten sich nach der Mini-Apps-Sammlung der Schola-Hauptseite. Die Schnellleiste und ihre Auswahlliste binden exakt dieselben zentralen SVG-Dateien ein.
- Das eigenständige Periodensystem kann als Mini-App in einem begrenzten Classroom-Container geöffnet und geschlossen werden. Seine fachliche Implementierung bleibt vollständig im Mini-App-Verzeichnis; der Classroom Screen bindet sie nur ein.
- Der Besen leert die Unterrichtsfläche und setzt die Zustände der entfernten Mini-Apps zurück.
- Der JSON-Export enthält die Einstellungen aller vorhandenen Mini-Apps und bleibt für weitere Mini-Apps erweiterbar.
- TypeMap-Texte werden mit HTML und Provenienzinformationen übernommen; ihre ID bleibt eine allgemeine TypeMap-ID.
- Bilder werden ohne externe ID per lokalem Dateiimport, Drag & Drop oder aus der Zwischenablage übernommen. Eingefügte Bilder erscheinen rahmenlos, können frei verschoben und proportional skaliert werden und werden einschließlich ihrer Position und Bilddaten lokal sowie im Screen-JSON gesichert.
- Die Datumsfunktion zeigt das aktuelle Datum in deutscher Langform einschließlich Wochentag. Sie erscheint rahmenlos, ist frei verschiebbar und skaliert Anzeige und Schrift gemeinsam; Sichtbarkeit und Layout werden lokal sowie im Screen-JSON gesichert.
- Appübergreifende UI-Vorlagen werden aus `assets/ui` eingebunden und nicht lokal dupliziert.
- Neue fachliche oder organisatorische Classroom-Screen-Regeln werden in diesem Manifest dokumentiert.
- Erkannte Konflikte mit übergeordneten Manifesten werden vor einer Implementierungsänderung gemeinsam geklärt.
