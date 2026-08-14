# Changelog – Periodensystem

Alle wesentlichen Änderungen an der Mini-App werden in dieser Datei dokumentiert.

## Unveröffentlicht

### Hinzugefügt

- Vollständiges Periodensystem mit 118 auswählbaren Elementen angelegt.
- Farbliche Elementkategorien mit beschrifteter Legende ergänzt.
- Große Einzelansicht mit grundlegenden Elementdaten umgesetzt.
- Direkten Aufruf eines Elements über Symbol oder Ordnungszahl ermöglicht.
- Responsive, horizontal verschiebbare Darstellung für kleine Bildschirme ergänzt.
- Eigenes Icon, Manifest und lokal gespeicherte PubChem-Fachdaten angelegt.

### Behoben

- Elementdaten werden nun auch beim direkten lokalen Öffnen ohne Webserver geladen.
- Lanthanoide und Actinoide in die vorgesehenen vollständigen Rasterzeilen verschoben; die schmale Trennzeile bleibt frei.

### Geändert

- Doppelten Einführungstitel und Bedienhinweis oberhalb des PSE entfernt.
- Gesamtansicht an die verfügbare Monitorgröße angepasst; Elementkacheln reduzieren ihre Details stufenweise und zeigen auf Telefonen nur noch die Symbole.
- Standardkacheln leicht hochformatig gestaltet, Beschriftungen zentriert sowie Ordnungszahl und Atommasse in einer betonten Kopfzeile angeordnet.
- Legende unterhalb des Periodensystems zentriert ausgerichtet.
- Atommasse bei Platzkonflikten dynamisch zunächst auf eine aufgerundete ganze Zahl reduziert und bei fortbestehender Kollision ausgeblendet; der vollständige Wert bleibt in der Einzelansicht erhalten.
- Vertikale Detailreduktion vereinheitlicht: Bei knapper Höhe verschwinden zunächst alle Elementnamen und erst bei weiterem Platzmangel Ordnungszahlen und Atommassen im gesamten Raster.
- Symbolgröße kontinuierlich an die Kachelhöhe gekoppelt und den sprunghaften Wechsel zum kompakten Modus beseitigt; Legende wird bei geringer Höhe rechtzeitig ausgeblendet.
- Festen Rasterwechsel bei 700 Pixeln entfernt und Abstände, Kachelform sowie Typografie über Breite und Höhe kontinuierlich skalierbar gemacht.

## 0.1.0 – 2026-08-14

### Stand

- Erste funktionsfähige Fassung der PSE-Mini-App.
