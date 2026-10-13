# Changelog – TypeMap

Alle wesentlichen Änderungen an der App werden in dieser Datei dokumentiert.

## Unveröffentlicht

### Behoben

- Die Druckpaginierung hält Überschriften mit dem folgenden Inhalt zusammen. Verkettete Kapitel- und Tabellenüberschriften wandern gemeinsam mit Tabellenkopf und erster Datenzeile auf die nächste Seite; Absätze beachten zudem explizit mindestens zwei Anfangs- und Schlusszeilen.
- Kurze Absätze und Absatzenden im Blocksatz verwenden nicht mehr Chromiums auf Schlusszeilen optimierten `pretty`-Umbruch. Dadurch werden vorletzte Zeilen nicht übermäßig gesperrt und die automatische Silbentrennung kann reguläre Umbruchstellen wieder nutzen; Vorschau, HTML und PDF folgen derselben Regel.
- Bei Markdown-Tabellen genügt in der Trennzeile nun ein Bindestrich pro Spalte (`|-|-|`); längere und ausgerichtete Varianten bleiben weiterhin gültig.
- Markdown-Tabellen werden auch dann als eigene Blöcke erkannt, wenn vor oder nach ihnen keine Leerzeile steht.
- Der JSON-Export über das Exportmenü enthält nur noch das aktive TypeMap-Projekt statt der gesamten lokalen Projektbibliothek.
- Fußnoten werden in der gerenderten Ansicht unabhängig von ihren Markdown-Labels nach ihrem ersten Auftreten fortlaufend über das gesamte Dokument nummeriert; dieselbe Nummerierung gilt im HTML- und Druckexport.
- Die geometrisch aufwendige Markierungsschicht im Markdown-Editor wurde entfernt, damit auch sehr umfangreiche Dokumente ohne vollständigen DOM-Spiegel bearbeitet werden können.
- Autospeichern erzeugt nicht mehr zusätzlich einen vollständigen HTML-Export; die Veröffentlichung für verbundene Apps erfolgt erst bei Vorschau oder ausdrücklicher Freigabe im Dokumentdialog.
- Projekte werden in IndexedDB einzeln gespeichert. Bestehende Gesamtsnapshots werden automatisch migriert, während laufende Speicherungen nur geänderte Projekte schreiben.
- Langsame Vorschau- und Speichervorgänge geben kompakte, inhaltsfreie Performance-Messwerte in der Entwicklerkonsole aus.
- Die Dokumentvorschau fügt Textblöcke gesammelt ein und überlässt das Layout außerhalb des sichtbaren Bereichs der browsernativen `content-visibility`-Virtualisierung.
- Der vollständige Aufbau des Dokumentstrukturmodells für die Vorschau läuft in einem Web Worker. Bei nicht verfügbarer oder blockierter Worker-Unterstützung fällt TypeMap automatisch auf die bisherige Hauptthread-Berechnung zurück.
- Zeilennummern gelten vorrangig für Exporte mit festgelegtem Layout. In der flexiblen Vorschau erscheinen sie nur bei Dokumenten bis 50.000 Zeichen und 1.500 Quellzeilen oder in einer einzelnen Kapitelansicht; bei Größenänderungen werden kurze Live-Ansichten neu vermessen.
- PDF- und Druckausgaben nummerieren ausschließlich stabile Textblockanfänge. Sichtzeilennummern bleiben auf HTML- und Bildausgaben beschränkt, damit über Seiten fragmentierte Absätze keine versetzten oder abgeschnittenen Nummern erzeugen.

### Hinzugefügt

- App-spezifisches Changelog und fortlaufende Versionsführung eingerichtet.
- Fortschreibbare Präambel mit einer Kurzbeschreibung der App im Manifest ergänzt.
- Markdown-Pipe-Tabellen werden in Vorschau, HTML und PDF semantisch als Tabellen ausgegeben. Artikel verwendet eine zurückhaltende Buchsatz-Darstellung, Aufsatz einen LaTeX-/Booktabs-Stil und Notizbuch ein einfaches Raster; der vorhandene Tabellen-Button fügt außerdem eine Vorlage ein und übernimmt tabulatorgetrennte Auswahlen.

## 0.1.0 – 2026-08-14

### Stand

- Bestehenden Entwicklungsstand von TypeMap als Ausgangsversion übernommen.
