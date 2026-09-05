# Changelog

## 0.2.0 – Unveröffentlicht

### 2026-09-05

- Der neue Elementtyp „Institutionssammlung“ zeigt bis zu 40 Institutionen als kompakte Liste in einer gemeinsamen Box. Nur die Sammlung besitzt Anschlusspunkte und Beziehungen; ihre Einträge bleiben bewusst rein informativ und reduzieren so Pfeil- und Routingkomplexität.
- Komplexe und KI-generierte Modelle reagieren flüssiger: Pfeilrouten werden je Zeichenzyklus nur noch einmal berechnet und für Quellenkollisionen wiederverwendet. Der Generator empfiehlt zudem höchstens 45 didaktisch relevante Elemente und 90 Beziehungen statt technischer Maximalauslastung. Er startet erzeugte Modelle im erweiterten Modus mit nur einer aktiven Ebene, verbietet doppelte Enthaltensein-Beziehungen neben `parentId` und begrenzt ausufernde Listen gleichartiger Unterbehörden.
- Der entfernte frühere Diagrammansichtsmodus wird beim Start zuverlässig zurückgesetzt; seine veralteten CSS- und JavaScript-Pfade wurden entfernt, damit die Bearbeitungsoberfläche nicht mehr vollständig ausgeblendet hängen bleiben kann.
- Basis und Erweitert sind nun didaktisch getrennt: Beziehungsrubriken, Ebenenfilter, Ebenenanlage und Ebenenzuweisung erscheinen nur im erweiterten Modus. Beim Wechsel zu Basis gilt die zuletzt gewählte Ebenensicht weiter; Elemente deaktivierter Ebenen und ihre Beziehungen werden vollständig ausgeblendet. Beziehungen der sichtbaren Ebene erscheinen rubrikenübergreifend und werden anhand ihres Typs automatisch einer Rubrik zugeordnet; vorhandene Ebenendaten bleiben unverändert erhalten.
- Der Import bietet nun zwei Wege: eine Modelldatei auswählen oder JSON-Code direkt in ein Codefenster einfügen. Eingefügter Code wird validiert, Markdown-Codeblöcke werden toleriert und Fehler bleiben zur Korrektur sichtbar.
- „Generieren“ im Drei-Punkte-Menü erstellt aus einem gewünschten Staat einen ausführlichen, kopierbaren KI-Prompt mit dem exakten importierbaren JSON-Schema, zulässigen Elementen und Beziehungen, Quellen- sowie Layoutregeln. Administrative Ebenen werden darin als vertikale Hierarchie und Legislative, Exekutive sowie Judikative als horizontale Spalten vorgegeben. Ein semantisches Abstandsmodell hält zusammengehörige Institutionen kompakt, trennt unterschiedliche Blöcke und reserviert lesbare Pfeil- und Beschriftungskanäle.
- Die Kopfzeile ist ruhiger: Diagrammansicht und lokaler Speicherhinweis entfallen dort; Neu, Importieren und Exportieren befinden sich nun in einem Drei-Punkte-Menü direkt neben dem klassischeren Zentrieren-Symbol der Modellfläche.
- Auch Einzelelemente unterstützen nun dieselbe mehrteilige Quellenverwaltung wie Beziehungen: Gesetz, Fundstelle, Weblink und Funktionsnotiz lassen sich ergänzen; ein anklickbares § am Element öffnet die Quellenkarte.
- Jede Beziehungsrubrik bietet „Eigene Beziehung …“: Schüler können beim Erstellen und nachträglichen Bearbeiten eine freie Beziehungsbeschreibung eingeben; benutzerdefinierte Beziehungen bleiben ihrer Rubrik zugeordnet und sind importierbar.
- Beziehungen unterstützen mehrere Rechtsquellen: Im Bearbeitungsdialog lassen sich Quellen mit „+“ ergänzen und per Pfeiltasten durchblättern; die Quellenkarte bietet dieselbe Navigation. Bestehende Einzelquellen werden automatisch übernommen.
- Beziehungsrubriken funktionieren als einzeln wählbare Diagrammebenen oben rechts im Canvas: Elemente bleiben beim Wechsel bestehen, nur die Beziehungen der aktiven Rubrik werden angezeigt, bearbeitet und exportiert; neue Beziehungen gehören automatisch zur aktiven Rubrik.
- Kollidiert die Position oberhalb einer Beziehungsbeschriftung mit einem Element oder einer anderen Linie, wird der §-Quellenmarker automatisch als Präfix vor die Beschriftung gesetzt, ohne Elementabstände zu verändern.
- Der transparente Innenraum eines gruppierten Elements fängt keine Klicks mehr ab; Beziehungen zwischen seinen Unterelementen können direkt ausgewählt werden, während die Gruppenbeschriftung bedienbar bleibt.
- Rechtsgrundlagen können zusätzlich eine Webquelle enthalten; Domains werden als sichere HTTPS-Adressen gespeichert und in der Quellenkarte anklickbar angeboten.
- Klicks auf den §-Quellenmarker werden nicht mehr als Klick auf die freie Canvas-Fläche behandelt; die Quellenkarte öffnet dadurch zuverlässig.
- Der §-Quellenmarker zeigt beim Hover seine Schaltflächenfunktion und öffnet per Klick eine gestaltete Quellenkarte mit Gesetz, Fundstelle und Inhaltsnotiz.
- Der §-Quellenmarker erhält eine deckende Freistellung, sodass die Verbindungslinie nicht mehr durch das Zeichen läuft.
- Die Beziehungsauswahl im rechten Inspektor wird nach dem Entfernen der Pfeilanschluss-Steuerung wieder zuverlässig initialisiert und angezeigt.
- Die Beschriftung „Eine politische Ordnung entsteht hier“ wurde vollständig von der Arbeitsfläche entfernt.
- Der Beziehungsinspektor konzentriert sich auf die Beziehungsart; Pfeilanschlüsse und automatische Verlaufsordnung wurden dort entfernt. Quellen werden über einen eigenen Dialog mit Gesetzestext, Fundstelle und Inhaltsnotiz erfasst.
- Anschlusspunkte erscheinen erst nach einem echten Klick auf ein Element; nicht ausgewählte Elemente bleiben direkt verschiebbar und lösen beim Ziehen keine Verbindungsvorbereitung aus.
- Interne Verbindungen innerhalb gruppierter Elemente bleiben auch bei aktiver administrativer Ebene sichtbar; der Gruppencontainer verdeckt die darunterliegende Linienführung nicht mehr.
- Institutionelle Ebenen sind jetzt administrative Filter mit Checkboxen im Canvas: neue Ebenen erscheinen als Schalter, Elemente werden im Inspektor zugewiesen, und inaktive Ebenen werden lesbar abgeblendet und gesperrt.
- Beziehungen zwischen Unterelementen einer Elementgruppe bleiben sichtbar; für solche internen Verbindungen wird der Abstand der Unterelemente automatisch vergrößert.
- Lange deutsche Elementbezeichnungen werden nun an plausiblen Silbengrenzen mit Trennstrich umgebrochen, statt einzelne Buchstaben in eigene Zeilen zu setzen.
- Die Canvas-Unterlage wird nun aus den tatsächlichen Inhaltsgrenzen mit gleichmäßigem Rand berechnet und der Diagramminhalt darin symmetrisch zentriert, statt eine große feste Fläche nur nach rechts und unten zu erweitern.
- Beim Zoomen mit dem Mausrad bleibt der Weltpunkt unter dem Mauszeiger unverändert an derselben Bildschirmposition.
- Inhaltliche Elementgruppen sind nun ausdrücklich im Inspektor benannt: Unterelemente können dort zugeordnet oder gelöst und neue Typen direkt aus der Palette auf ein übergeordnetes Element gezogen werden.
- Die logische Canvas-Unterlage wächst über ihre bisherige Mindestgröße hinaus, sobald Elemente, Bereiche oder manuelle Linienverläufe zusätzlichen Platz benötigen; die bisherigen festen Verschiebegrenzen entfallen.
- Beim Laden, Hinzufügen und Zoomen wird die Unterlage so verschoben, dass die Gesamtanordnung aller Elemente im sichtbaren Canvas zentriert bleibt; manuelles Verschieben der Unterlage bleibt möglich.
- Neu auf einer Geraden gesetzte Bearbeitungspunkte lassen sich beim ersten Ziehen frei zu einem dauerhaften Knick verschieben, ohne als technischer Pfeil-Endpunkt zu verschwinden.
- Richtungssensitive Manipulationscursor: Vierfachpfeil über Elementen sowie Hoch/Runter beziehungsweise Links/Rechts für Beschriftungen auf vertikalen und horizontalen Liniensegmenten.
- Keine sichtbaren technischen Stützpunkte mehr hinter Pfeilspitzen; auf einer Geraden ergänzte Bearbeitungspunkte bleiben nur bis zum Verlassen der ausgewählten Linie erhalten, sofern sie nicht zu einem echten Knick verschoben wurden.
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
## Geschützter Pfeil-Endlauf – 2026-09-05

- Pfeilspitzen treffen ihre Ziel-Outline nun immer im rechten Winkel.
- Pfeilspitzen besitzen unabhängig von der ausgewählten Linienstärke eine feste Größe.
- Der gerade Endlauf umfasst die Pfeilspitze und mindestens eine zusätzliche sichtbare Pfeillänge hinter ihrer breiten Seite – auch bei manuell bearbeiteten oder gelöschten Eckpunkten.
- Der geschützte Endlauf gilt identisch in Editor, Diagrammansicht und Export; sein Eckpunkt lässt sich nur senkrecht zur Zielkante verlängern.
- Geometrietests decken alle vier Zielseiten und die Mindestlänge ab.
## Verankerte Leitungssegmente beim Verschieben – 2026-09-05

- Beim Verschieben eines verbundenen Elements wandern Anschluss und angrenzender Knick gemeinsam; Richtung und Länge des direkten Segments bleiben bei Verbindungen mit mindestens zwei Segmenten erhalten.
- Der unveränderte Rest der Leitung wird ausschließlich durch rechtwinklige Zwischenstücke wieder angeschlossen, ohne schräg entstehende Segmente.
- Die Berechnung verwendet die Ausgangsroute des Ziehvorgangs, sodass sich bei längeren Bewegungen keine zusätzlichen Knicke ansammeln.
- Geometrie- und Browsertests prüfen Quell- und Zielanschlüsse, Segmenterhalt und ausschließlich orthogonale Übergänge.
## Mindestabstand zu Elementkonturen – 2026-09-05

- Jede Verbindung verlässt auch ihr Quellelement zunächst senkrecht; der erste Knick liegt mindestens eine Pfeillänge außerhalb der Outline.
- Frei verschobene Mittelsegmente werden aus dem Schutzraum von Elementkonturen herausgeschoben.
- Anfangs- und Endlauf sind gegen seitliches Verschieben sowie Löschen geschützt, bleiben aber entlang ihrer senkrechten Achse verlängerbar.
- Tests decken alle vier Quellseiten, Mindestabstand und frei bewegliche Segmente ab.
## Undurchdringliche Elemente – 2026-09-05

- Sämtliche geraden und diagonalen Segmente werden vor der Darstellung gegen alle relevanten Elementflächen geprüft.
- Blockierte manuelle Verläufe wechseln zur automatischen Hindernisführung; eine unmögliche Route wird nicht durch ein Element gezeichnet.
- Das Verschieben eines Elements kann bestehende Leitungen daher ebenfalls nicht durch eine andere Institution führen.
- Die Exportprüfung meldet Verbindungen, für die in der aktuellen Anordnung kein zulässiger Weg existiert.
## Temporäre Kollisionsvorschau – 2026-09-05

- Gegriffene Liniensegmente und Eckpunkte dürfen während des Ziehens vorübergehend durch Elemente geführt werden, damit die gegenüberliegende Seite erreichbar bleibt.
- Regelverletzende Vorschauen erscheinen blassrot und gestrichelt; in einer wieder zulässigen Position kehrt die normale Darstellung zurück.
- Loslassen in einer ungültigen Position stellt die exakte Route vor Beginn des Ziehens wieder her, eine gültige Endposition wird gespeichert.
- Geschützte Anfangs- und Endsegmente bleiben auch beim Verschieben eines Mittelsegments orthogonal erhalten.
- Der Browsertest prüft Durchführen, ungültige Ablage mit Rollback und gültige Ablage hinter einem Hindernis.
## Stützpunkte per Doppelklick – 2026-09-05

- Ein Doppelklick auf eine Verbindung oder einen sichtbaren Segmentgriff fügt an der projizierten Klickposition einen neuen Stützpunkt ein.
- Die geteilten Segmente lassen sich anschließend unabhängig verschieben; der Punkt kann wie bestehende freie Ecken per Rechtsklick entfernt werden.
- Die Doppelklick-Erkennung bleibt stabil, obwohl die Linie nach dem ersten Klick ausgewählt und mit Bearbeitungsgriffen neu gezeichnet wird.
- Geometrie- und Browsertests prüfen Einfügen, Speichern, Sichtbarkeit und anschließendes Entfernen.
