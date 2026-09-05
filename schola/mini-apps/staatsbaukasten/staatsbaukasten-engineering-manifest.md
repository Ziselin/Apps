# Staatsbaukasten Engineering Manifest

## Präambel

Der Staatsbaukasten ist eine eigenständig erreichbare Schola-MiniApp für die präzise visuelle Modellierung politischer Ordnungen. Er richtet sich vorrangig an die gymnasiale Oberstufe und verbindet eine verständliche Arbeitsoberfläche mit einem fachlich strukturierten, exportierbaren Datenmodell.

## Stellung in der Manifestordnung

Dieses Manifest regelt den spezifischen Kompetenzbereich der MiniApp Staatsbaukasten. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt.

## Fachliche Grundregeln

- Die elementare Aussageeinheit ist immer `Element – typisierte Beziehung – Element`; bedeutungslose grafische Verbindungen sind unzulässig.
- Konkrete Institutionen sind Instanzen abstrakter Elementtypen. Eigenschaften werden nur dann zu eigenen Typen, wenn sie eine dauerhaft andere fachliche Rolle ausdrücken.
- Eigenschaften eines Organs liegen am Element; Eigenschaften eines institutionellen Verhältnisses liegen an der Beziehung.
- Beziehungsrichtungen werden aktiv formuliert und semantisch eindeutig gespeichert. Passive Gegenrelationen werden nicht als parallele Typen geführt.
- Modellinhalt und visuelle Position bleiben getrennte Ebenen desselben Datenmodells.
- Basis- und erweiterter Modus verwenden dasselbe Datenmodell. Der Basismodus reduziert ausschließlich die sichtbaren Bearbeitungsmöglichkeiten.
- Die Taxonomie bleibt offen für moderne, historische, föderale, zentralistische und nichtwestliche Ordnungen und setzt keine konkrete deutsche Staatsstruktur voraus.
- Die App bewertet politische Systeme nicht und enthält keine Aufgabenstellungen oder Vergleichsfunktionen.

## Daten und Austausch

- Jedes Element, jede Beziehung und jede institutionelle Ebene besitzt eine stabile Identität.
- Modelle werden automatisch lokal gespeichert und vollständig als versionierte JSON-Datei exportiert und importiert.
- Visuelle Informationen dürfen fachliche Informationen nicht ersetzen; ein Modell bleibt ohne seine Anordnung semantisch verständlich.

## Diagrammgestaltung und Bedienung

- Die Schola-Kopfzeile und das zentrale App-Menü bleiben die verbindlichen Oberflächenvorlagen.
- Diagramme verwenden kompakte rechteckige Organe, offene Gewaltenbereiche und beschriftete Trennlinien für staatliche Ebenen. Farben sind optional.
- Paletteinträge zeigen bei Auswahl didaktische Erläuterungen. Drag-and-drop erzeugt Kopien mit eigener Identität.
- Verfassungen und Grundordnungen sind normative Grundlagen und werden von handelnden Institutionen unterschieden.
- Anschlusspositionen werden als Seite und relativer Anteil der Elementkontur an der Beziehung gespeichert. Verschieben, Skalieren und Export erhalten diese Positionen.
- Editor und Export verwenden dieselbe Geometrie für Kartengrößen, mehrzeilige Namen, Verschachtelung, Anschlüsse und Linien.
- Automatisches Routing berücksichtigt andere Organe. Bei geometrisch unmöglichen Wegen muss die Ausgabeprüfung auf einen verbleibenden Konflikt hinweisen.
- Einpassung verändert nur den Bildausschnitt. Rückgängig/Wiederholen stellt den vollständigen Modellzustand wieder her.
- Bereichszugehörigkeit und visuelle Verschachtelung ersetzen keine ausdrücklich modellierte politische Beziehung.
- Importdateien werden vor der Übernahme auf gültige Referenzen und zyklenfreie Hierarchien geprüft.
