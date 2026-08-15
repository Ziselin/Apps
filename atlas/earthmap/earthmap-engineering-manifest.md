# EarthMap Engineering Manifest

## Präambel

EarthMap ist eine kartenbasierte Anwendung zur räumlichen Darstellung, Suche und Einordnung historischer und gegenwärtiger Orte, Grenzen und zugehöriger Fachdaten.

Dieses Manifest bündelt die Regeln, die sich beim Aufbau der EarthMap herausgebildet haben. Es soll verhindern, dass spätere Datenimporte, Suchlogiken oder Rendering-Umbauten alte Fehler wieder einschleppen.

## Stellung in der Manifestordnung

Dieses Manifest regelt den spezifischen Kompetenzbereich von EarthMap. Es ergänzt das Ziselin-Organisationsmanifest und das Atlas-Projektmanifest. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt und nicht stillschweigend überschrieben.

## 1. Boundary-Sets sind die räumliche Wahrheit

- Eine Boundary beschreibt eine geografische oder administrative Einheit in einer konkreten Fassung.
- Geometrie, stabile Identität, Parent-Beziehung, Rang, Provenienz, Lizenz und Gültigkeit gehören in das Boundary-Set.
- Statistik-Layer, Suchkarten und Darstellungsregeln dürfen keine zweite Geometriewahrheit erzeugen.
- GeoJSON bleibt Austausch- und Speicherform; die fachliche EarthMap-Fassung ist das Boundary-Set-v1.

## 2. Gleiche administrative Einheit wird als eine Boundary geführt

- Provider liefern getrennte Geometrieteile manchmal als getrennte Features.
- Wenn Name, Land, Admin-Level, Parent und Gültigkeit gleich sind, ist das in EarthMap eine mehrteilige Boundary.
- Solche Features werden zu `MultiPolygon` oder einer äquivalenten mehrteiligen Geometrie konsolidiert.
- Alle ursprünglichen Provider-IDs, Stable-IDs und Version-IDs bleiben als Provenienz- und Alternativ-IDs erhalten.
- Browser, Suche, Statistik und Export dürfen eine fachlich gleiche Einheit nicht doppelt aufführen.

## 3. Parent-Codes sind Kontext, keine Identität

- `DEU`, `FRA`, `USA` usw. dürfen beim Laden und Eingrenzen helfen.
- Sie dürfen nicht allein entscheiden, welche feinere Boundary getroffen wird.
- Beim Übergang von Suchindex zu voller Geometrie werden nur starke Identitäten genutzt:
  - `stable_id`
  - `version_id`
  - Provider-ID
  - amtliche Codes
  - Wikidata-ID
  - explizit gespeicherte Alternativ-IDs
- Breite Tokens wie Land, Parent, Provider oder Admin-Level dürfen nicht als Identität einer Einzelfläche gewinnen.

## 4. Matching folgt einer Hierarchie

1. Starke technische oder amtliche ID.
2. Wikidata-ID.
3. ISO-/amtlicher Code mit passendem Level und Parent.
4. Name/Alias nur innerhalb eines klaren Such- oder Parent-Kontexts.
5. Fallback nur, wenn kein stärkerer Treffer existiert und die Mehrdeutigkeit klein ist.

Bei Statistikdaten ist der Join bewusst strenger als bei Freitextsuche. Eine CSV darf nicht aus Versehen auf die falsche Boundary fallen, nur weil ein Name ähnlich ist.

## 5. Suche und Statistik benutzen denselben Renderer-Tunnel

- Suchergebnisse und Statistik-Layer sollen dieselben Boundary-Features einfärben.
- Eine gespeicherte Suche ist im Kern ein Datenlayer ohne numerische Werte.
- Eine Statistik ist ein Datenlayer mit Wertspalten.
- Leere Werte werden wie Suchmarkierungen dargestellt; numerische Werte werden nach Darstellungsregeln klassifiziert.
- `role = context` und `role = focus` gelten für beide Ansätze.

## 6. Focus und Context

- Ohne Context gibt es keine Einschränkung für Focus.
- Mit Context muss Focus Teil des Context sein.
- Context-Elemente erhalten eigene Darstellungsregeln.
- Focus-Elemente können Wertlogik, Farbspektren und Wertlabels tragen.
- Mehrere aktive Karten im selben Projekt müssen gemeinsam gerendert werden; mehrere aktive Projektordner nicht.

## 7. Statistikdaten bleiben externe Daten

- EarthMap speichert nicht den Ursprung der Statistik als eigene amtliche Wahrheit.
- Importierte CSV-/JSON-Tabellen werden in einen Datenlayer übernommen.
- Quellenangaben pro Zeile bleiben erhalten.
- `value1`, `unit1`, `value2`, `unit2` usw. sind erlaubt.
- Die aktive Wertreihe bestimmt, welche Werte gerendert werden.
- Source-Details und Boundary-Key-Details bleiben über Detaildialoge zugänglich.

## 8. Gültigkeit und historische Suche

- Boundaries besitzen `valid_from`, `valid_to`, `valid_precision` und `temporal_status`.
- Organisationssuchen mit Jahr, z. B. `EU (1995)`, nutzen historische Mitgliedschaft.
- Ohne Jahr werden aktuelle Mitglieder gesucht.
- Abgelaufene Organisationen oder Verträge sollen ohne Jahresangabe nicht so tun, als seien sie aktuell.
- Deutsche Sonderfälle vor 1990 werden vorläufig über heutige ADM1-Einheiten modelliert, bis historische Boundary-Sets vorhanden sind.

## 9. Boundary-Hierarchie

- ADM0: Staaten und abhängige Gebiete.
- ADM1: Gliedstaaten, Provinzen, Bundesländer, autonome Regionen.
- ADM2/ADM3/ADM4/ADM5: feinere Verwaltungsebenen, abhängig vom Land.
- Provider-Unterschiede werden intern normalisiert; die UI zeigt verständliche deutsche Bezeichnungen.
- Im Archiv werden feinere Ebenen unter ihrem Parent eingeordnet.

## 10. Provider-Regeln

- Natural Earth ist die leichte globale Grundkarte und Engine-Basis.
- geoBoundaries ergänzt Verwaltungsebenen, wenn Natural Earth sie nicht oder nicht fein genug liefert.
- OSM darf für feinere Ebenen genutzt werden, muss aber in Boundary-Set-v1 normalisiert werden.
- Wikidata liefert IDs, Aliase, Übersetzungen und Organisationsbeziehungen, aber keine unkritisch zu rendernde Geometrie.
- Provider-Daten werden nicht live als dauerhafte Wahrheit verwendet; sie werden geprüft, normalisiert und versioniert.

## 11. Küsten, Wasser und Grenzen

- Küstenlinie und Landfüllung müssen harmonisieren.
- Länder- oder Provinzmarkierungen dürfen Wasserflächen nicht überdecken.
- Wo unterschiedliche Grenzquellen nicht exakt übereinanderliegen, muss die Engine perspektivisch eine einheitliche Kartenbasis bevorzugen.
- Linien gleicher Ebene sollen nicht durch doppelte Überlagerung dicker wirken.
- Politische Boundaries liegen über Markierungsflächen.

## 12. Engine-Performance

- Die Engine lädt Grundlayer, Indexdaten und Detailgeometrien getrennt.
- Kleine Startdaten müssen schnell sichtbar sein.
- Schwere Geometrien werden in Chunks geladen und in Commit-Schritten an MapLibre übergeben.
- Die UI darf beim Nachladen nicht einfrieren.
- Bewegung des Globus oder der Karte hat Vorrang vor Hydrierung.
- Nach Bewegung muss unterbrochenes Nachladen wieder aufgenommen werden.
- ADM1- und gespeicherte Such-/Statistiklayer sollen nach derselben robusten Batch-/Commit-Logik geladen werden.

## 13. Rendering-Phasen

1. Karte/Globus initialisieren.
2. Grundflächen und Wasser anzeigen.
3. Küstenlinien anzeigen.
4. Admin0-Grenzen anzeigen.
5. Sichtbare feinere Layer nach Zoom und Viewport laden.
6. Aktive Projektlayer hydrieren.
7. Markierungen und Wertlabels rendern.
8. Diagnose aktualisieren.

Keine spätere Phase darf eine frühere Phase verdecken oder deren Füllung zerstören.

## 14. Projektaktivierung

- Es darf immer nur ein Projektordner aktiv sein.
- Wird ein Projekt aktiviert, werden andere Projekte samt Unterordnern und Karten deaktiviert.
- Innerhalb eines aktiven Projekts dürfen mehrere Karten aktiv sein.
- Beim Wechsel in die Renderansicht werden aktive Projektlayer robust neu bewertet und nötige Chunks geladen.

## 15. UI- und Diagnose-Regeln

- Engine- und Harmonisierungsdiagnose bleiben einklappbar.
- Kleine Bildschirme dürfen technische Konsolen ausblenden.
- Diagnose muss zeigen:
  - Quellen
  - Layer
  - Feature-Zahl
  - Ladezeit
  - Sichtbarkeit
  - Hydrierung
  - Drawable-/Match-Zahlen
- Technische Detaildialoge folgen dem Konsolenfenster-Template.

## 16. Export

- PNG exportiert den aktuellen sichtbaren Ausschnitt.
- HTML soll das sichtbare Kartenbild möglichst EWYS-artig erhalten.
- Export darf keine interne Diagnose, UI-Schubladen oder Bearbeitungselemente enthalten.
- Exportierte Darstellungen dürfen keine andere fachliche Kartenlogik verwenden als die Live-Ansicht.

## 17. Was bei künftigen Datenimporten zwingend zu prüfen ist

- Sind gleiche administrative Einheiten mehrfach vorhanden?
- Sind getrennte Insel-/Exklavengeometrien als MultiPolygon zusammengeführt?
- Sind Stable-ID und Version-ID sauber getrennt?
- Sind Parent-Beziehungen vollständig?
- Sind ISO-/amtliche Codes und Wikidata-ID vorhanden, soweit verfügbar?
- Ist die Lizenz exportfähig?
- Ist der Gültigkeitszeitraum angegeben?
- Funktionieren Suche, Statistikmatching und Browserklick auf dieselbe Boundary?
- Wird die Boundary auf allen relevanten Zoomstufen ohne UI-Freeze geladen?

## 18. Offline-Daten und Veröffentlichung

- Die vollständige Offline-Installation darf umfangreiche Boundary-Sets, Provider-Spiegelungen und generierte Geometriearchive enthalten, die nicht Bestandteil gewöhnlicher GitHub-Pages-Veröffentlichungen sind.
- Große lokale Geometriedaten werden über die projektweite `.gitignore` ausdrücklich vom normalen Git-Workflow getrennt; sie werden dadurch weder gelöscht noch für die Offline-App unzugänglich.
- Kataloge, Provider-Registries, Quellcode und kleine Indexdateien werden getrennt von den Geometriearchiven bewertet und dürfen veröffentlicht werden, wenn die Online-App nicht auf ausgeschlossene Dateien verweist.
- Änderungen an bereits versionierten EarthMap-Indizes werden nie allein veröffentlicht, wenn sie neue, online nicht vorhandene Geometriedateien voraussetzen.
- Ein späterer Online-Datenkanal für EarthMap benötigt eine eigene, dokumentierte Hosting-, Versions- und Cache-Strategie und wird nicht durch einen unbeabsichtigten Repository-Upload ersetzt.
