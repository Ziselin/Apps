# Changelog

## 0.2.0 – Unveröffentlicht

### 2026-09-05

- Präzise Pfeilanschlüsse auf allen vier Elementseiten, direkt verschiebbare Griffpunkte sowie Seiten-/Positionsregler; die beim Verbinden gewählten Positionen bleiben gespeichert.
- Gemeinsame Diagrammgeometrie für Editor und Export, mehrzeilige Namen, veränderbare Elementbreite und mehrstufige Verschachtelung.
- Rechtwinklige Hindernisumgehung über ein Wegnetz; Beschriftungen folgen beim Ziehen der tatsächlichen Linie.
- Kompakte Organe, offene Gewaltenbereiche, Ebenentrennlinien und eine leere föderale Strukturvorlage.
- Rückgängig/Wiederholen, sichere Importprüfung und Einpassung ohne Verschieben der Modellinhalte.
- Verfassung/Grundordnung mit eigener didaktischer Typkarte und Beziehungen für normative Grundlagen.
- Browserprüfung für Palette, Strukturvorlage, Historie, Konturverbindungen, verschiebbare Pfeilanschlüsse, Diagrammansicht, SVG-Download und PDF-Druckansicht.

## Unveröffentlicht – 2026-09-04

- Kopfzeile an die gemeinsame Schola-Vorlage mit Menüschalter, Ziselin-Marke, Appname, Arbeitsmodus und zentralem Seitenmenü angeglichen.
- Platzhaltertext der leeren Modellfläche wird nach dem ersten platzierten Element zuverlässig ausgeblendet.
- Zielerkennung beim Ziehen einer Beziehung korrigiert, sodass das Ablegen auf einem zweiten Element die Beziehungsauswahl öffnet.
- Modellfläche mit 40–160 Prozent zoombar gemacht; Herauszoomen vergrößert den sichtbaren logischen Arbeitsbereich.
- Verschieben der Modellfläche bei gedrückter mittlerer Maustaste ergänzt und den Versatz im Modell gespeichert.
- Mausrad-Zoom ohne Zusatztaste ermöglicht und auf den Punkt unter dem Mauszeiger zentriert.
- Elementkarten auf ihre Bezeichnung reduziert; Verbindungen beginnen nun direkt an der Elementkontur statt an einem separaten Anschlussoval.
- Klick auf einen Elementtyp zeigt nun didaktische Informationen im Inspektor; neue Elemente entstehen ausschließlich als Kopie per Drag-and-drop.
- Verbindungswerkzeug erscheint beim Überfahren einer Elementkontur; Quelle und Ziel werden nun nacheinander per Klick gesetzt.
- Institutionelle Bereiche typisierbar, Elemente hierarchisch verschachtelbar und Beziehungen automatisch rechtwinklig geroutet.
- Magnetische Mittelachsen mit Hilfslinien sowie skalierbare, verschachtelbare Bereiche mit automatischer Elementzuordnung ergänzt.
- Hindernisärmeres Linienrouting, verschiebbare Beschriftungen und Bereichsaktionen für horizontale, vertikale und kompakte Anordnung ergänzt.
- Ruhige Diagrammansicht, Exportprüfung sowie SVG-, Druck-/PDF- und Modelldatei-Ausgabe ergänzt.

## 0.1.0 – 2026-09-04

- Erste Fassung des visuellen Staatsbaukastens mit frei platzierbaren politischen Elementen und institutionellen Ebenen.
- Gerichtete, zwingend typisierte Beziehungen aus sieben fachlichen Kategorien.
- Gemeinsames Datenmodell für Basis- und erweiterten Modus mit Element- und Beziehungseigenschaften.
- Automatische lokale Speicherung sowie strukturierter JSON-Import und -Export.
## Anschlussraster und manuelle Leitungen – 2026-09-05

- Runde Anschlussmarker mit einheitlich 20 Canvas-Einheiten Abstand; neue und bestehende Pfeilanschlüsse rasten am nächsten Marker ein.
- Ausgewählte rechtwinklige Linienabschnitte quer verschieben, einschließlich der Endabschnitte; Anschlüsse bleiben verankert.
- Manuelle Verläufe werden gespeichert und im Diagramm/Export übernommen. Rückkehr zur automatischen Führung über den Inspektor.
- Geometrie- und Browsertests für Raster, Segmentbewegung und Persistenz ergänzt.
## Magnetische Eckpunkte – 2026-09-05

- Sichtbare Einrast-Vorschau beim Überfahren der Anschlussmarker und beim Anlegen von Verbindungen.
- Ausgewählte Linien zeigen verschiebbare Eckgriffe; stärkere Anziehung an horizontalen/vertikalen Ausrichtungen, schwächere an 45°-Diagonalen.
- Rechtsklick entfernt einen Eckpunkt und verbindet seine Nachbarn direkt. Freie Verläufe bleiben in Modelldatei und Export erhalten und lassen sich rückgängig machen.
- Elementtexte vertikal zentriert (bei verschachtelten Elementen im Titelbereich); Modellfeld verbreitert und Hinweiszeile entfernt.
- Browserprüfung für Eckpunktbewegung, Rechtsklick und Rückgängig ergänzt.
## Kontextbezogene Anschlusspunkte – 2026-09-05

- Anschlusspunkte bleiben im Ruhezustand verborgen und erscheinen beim Hover nur am jeweiligen Element.
- Nach Wahl eines Startpunkts werden die Anschlusspunkte aller möglichen Ziele eingeblendet; bei einer ausgewählten Verbindung nur diejenigen ihrer beiden Elemente.
- Der magnetisch rot hervorgehobene Punkt ist unmittelbar anklickbar. Das zusätzliche Fadenkreuz und der Fadenkreuz-Cursor wurden entfernt.
- Browserprüfung deckt alle Sichtbarkeitszustände sowie den vollständigen Marker-Klickablauf ab.
## Verfassungsquellen an Beziehungen – 2026-09-05

- Beziehungen können nun eine konkrete Verfassungsfundstelle oder Passage als Quelle erhalten.
- Bei vorhandener Quelle erscheint ein § oberhalb der Beziehungsbeschriftung; Editor, Diagrammansicht und Export verwenden dieselbe Darstellung.
- Browserprüfung für Quellenfeld, Persistenz und §-Markierung ergänzt.
