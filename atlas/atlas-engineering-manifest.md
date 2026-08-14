# Atlas Engineering Manifest

## Präambel

Atlas verbindet Werkzeuge zur räumlichen, zeitlichen, textuellen und quellenbezogenen Erschließung von Wissen. EarthMap, TimeMap, TypeMap und Sourcerer sollen Inhalte strukturiert erfassen, nachvollziehbar verknüpfen und anschaulich darstellen.

Dieses Manifest hält die gemeinsamen Architekturregeln des Projekts Atlas fest. Es gilt für EarthMap, Sourcerer, TimeMap und TypeMap. Es ist kein Produkttext, sondern eine Arbeitsgrundlage für künftige Eingriffe am Atlas-Code.

## Stellung in der Manifestordnung

Dieses Manifest konkretisiert innerhalb des Projekts Atlas die projektweiten Regeln des Ziselin-Organisationsmanifests. Es besitzt keine Regelungskompetenz für Schola oder andere Ziselin-Projekte. Die Manifestdateien der vier Atlas-Apps regeln deren besondere fachliche Anforderungen. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt und nicht stillschweigend überschrieben.

## 1. Fachliche Daten und Darstellung bleiben getrennt

- Bibliografische, geografische oder zeitliche Sachinformationen sind nicht automatisch Formatierungsanweisungen.
- Stile, Farben, Layout und Renderregeln werden explizit zugewiesen.
- Eine App darf aus Metadaten hilfreiche Anzeigen erzeugen, aber Metadaten nicht stillschweigend in Formatierungswahrheiten verwandeln.

## 2. Externe Daten werden normalisiert, nicht roh weitergeschleppt

- Importierte Daten dürfen aus GeoJSON, CSV, KML/KMZ, Shapefile, Wikisource, Wikidata, OSM, Natural Earth, geoBoundaries oder KI-Ausgaben stammen.
- Die App arbeitet danach mit eigenen, dokumentierten Zwischenformaten.
- Rohdaten sind Quelle und Provenienz, nicht die interne Wahrheit.
- Beim Import sollen Herkunft, Lizenz, Abrufzeitpunkt, Gültigkeit und Review-Status erhalten bleiben.

## 3. Stabile IDs sind wichtiger als Anzeigenamen

- Anzeigenamen dürfen übersetzt, korrigiert oder gekürzt werden.
- Matching darf nicht allein über Namen erfolgen, wenn stabile Codes vorhanden sind.
- Stabile Schlüssel sollen kurz und menschenlesbar sein, wo das fachlich sicher ist.
- Technische Provider-IDs bleiben als Detail- und Provenienzinformation erhalten.

## 4. Zeit ist ein Primärfeld

- Datensätze, Karten, Quellen und Policies sind zeitgebunden.
- Wenn ein Objekt nur für einen Zeitraum gilt, muss dieser Zeitraum maschinenlesbar bleiben.
- Dateinamen dürfen Zeiträume anzeigen, sind aber nie autoritativer als die Felder im Datenmodell.

## 5. UI-Vorlagen sind verbindlich

- Wiederkehrende UI-Elemente werden aus Vorlagen abgeleitet: App-Hauptseite, Kopfzeile, Fußzeile, Browserzeilen, Tabs, Farbauswahl, technische Detailfenster, Buttons.
- Änderungen an solchen Elementen sollen an der Vorlage erfolgen, nicht lokal in nur einer App.
- App-spezifische Farbe und Sprache dürfen variieren; Verhalten, Abstände, Zustände und Grundlogik sollen gleich bleiben.

## 6. Änderungen brauchen sichtbares Feedback

- Buttons zeigen Hover-, Pressed-, Disabled- und Aktivzustand.
- Längere Prozesse zeigen Fortschritt oder zumindest Aktivität.
- Ein Klick, der Daten übernimmt, muss sichtbar bestätigt werden.
- Wenn der Nutzer in die Renderansicht zurückkehrt, müssen zuvor übernommene Änderungen gerendert werden.

## 7. Keine stillen Datenverluste

- Felder, die aus einer UI verschwinden, werden nicht gelöscht, solange nicht klar ist, dass sie veraltet sind.
- Nicht mehr sichtbare Informationen wandern in Legacy-, Advanced- oder Provenienzbereiche.
- Exportformate sollen alle Ebenen sichern, die für spätere Rekonstruktion nötig sind.

## 8. Performance ist Architektur, nicht Nachpolitur

- Große Daten werden nicht vollständig im UI-Thread verarbeitet, wenn eine vorbereitete Index-/Kachel-/Chunk-Struktur möglich ist.
- Bewegung, Scrollen und direkte Interaktion haben Vorrang vor Nachladen.
- Nachladen darf aussetzen, aber nicht die Bedienung blockieren.
- Geladene Daten werden in stabilen Commit-Schritten an den Renderer übergeben.

## 9. Diagnose bleibt eingebaut

- Für komplexe Render- und Matchingpfade gibt es Diagnosefenster oder Diagnosewerte.
- Diagnose zeigt nicht nur Fehler, sondern Datenfluss: geladen, gematcht, zeichnungsfähig, hydriert, gerendert.
- Diagnosefelder sollen knapp, lesbar und im gleichen technischen Fenstertemplate gestaltet sein.

## 10. Kommentare erklären Absicht und Datenfluss

- Kommentare erklären Architekturentscheidungen, Grenzfälle und Gründe für ungewöhnliche Logik.
- Kommentare sollen nicht triviale Syntax nacherzählen.
- Wenn ein Fehler teuer erarbeitet wurde, wird die Regel im Code dokumentiert.
