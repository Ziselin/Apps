# Periodensystem Engineering Manifest

## Präambel

Periodensystem ist eine eigenständige Schola-Mini-App zur übersichtlichen Darstellung der chemischen Elemente. Sie bewahrt die fachlich bedeutsame räumliche Ordnung des PSE und ermöglicht eine große, konzentrierte Einzelansicht ausgewählter Elemente.

## Stellung in der Manifestordnung

Dieses Manifest regelt den spezifischen Kompetenzbereich der Mini-App Periodensystem. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt.

## Fachliche und gestalterische Grundregeln

- Die Gesamtansicht erhält das klassische Raster mit 18 Gruppen und sieben Perioden; Lanthanoide und Actinoide werden in eigenen Reihen dargestellt.
- Jedes Element ist unmittelbar auswählbar. Die Einzelansicht zeigt mindestens Symbol, deutschen Namen, Ordnungszahl, relative Atommasse, Gruppe, Periode, Elementkategorie und Aggregatzustand.
- Elementkategorien werden farblich unterschieden und zusätzlich durch eine beschriftete Legende vermittelt. Fachliche Zuordnung darf nie ausschließlich von Farbe abhängen.
- Die Gesamtansicht skaliert vollständig in den verfügbaren Bildschirmbereich. Große Ansichten zeigen Ordnungszahl, Symbol und Namen; mittlere Ansichten reduzieren Details; auf Telefonen erscheinen nur die Elementsymbole in Minikacheln.
- Standardkacheln sind quadratisch bis leicht hochformatig und werden als zentriertes Raster dargestellt. Ordnungszahl steht hervorgehoben oben links, Atommasse oben rechts; Elementsymbol und Name sind mittig ausgerichtet.
- Ein Element kann über den URL-Parameter `element` mit Symbol oder Ordnungszahl direkt geöffnet werden.
- Die App funktioniert auch beim direkten Öffnen als lokale Datei vollständig offline. Fachdaten liegen getrennt von Darstellung und Bedienlogik in `elements-data.js`; eine JSON-Fassung bleibt als neutrales Austausch- und Prüfungsformat erhalten.
- Die Fachdaten führen ihre Herkunft und den Abrufzeitpunkt mit. Ausgangsquelle ist die Periodensystem-Schnittstelle von PubChem.
