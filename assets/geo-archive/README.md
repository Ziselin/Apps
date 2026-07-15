# Ziselin Geo-Archive

Dieses Verzeichnis ist das lokale Kartenarchiv für EarthMap.

Ziel ist nicht, QGIS nachzubauen, sondern kartografische Grunddaten so zu normalisieren, dass sie zitierbar, versionierbar, zeitlich prüfbar und mit externen statistischen Daten verknüpfbar werden.

## Grundregel

Kartografische Daten sind nur dann veröffentlichungsfähig, wenn Lizenz, Provenienz, Gültigkeit und Kompatibilität maschinenlesbar dokumentiert sind. Grenzen ohne klare Lizenz oder ohne belastbare Zeitangabe dürfen lokal angezeigt, aber nicht als geprüfte freie Ziselin-/Atlas-Karte exportiert oder weiterveröffentlicht werden.

Eine Boundary ist fachlich immer zeitgebunden: Sie beschreibt nicht nur eine Fläche, sondern eine konkrete Fassung dieser Fläche in einem Gültigkeitszeitraum.

## Struktur

- `schemas/` enthält JSON-Schemas und Beispielspezifikationen.
- `collections/` enthält standardisierte Boundary-Sets, also Kartensammlungen mit Einzelflächen.
- `datasets/` enthält GearBox-Definitionen und Arbeitsbeispiele für die Kopplung externer Tabellen an Boundary-Sets.

## Boundary-Set

Das Boundary-Set ist die fachliche Arbeitsgrundlage von EarthMap. Dort liegen:

- Identität,
- Geometrie,
- Provenienz,
- Lizenz,
- Rang,
- Parent-Beziehungen,
- Gültigkeit,
- Such- und Matching-Informationen.

GeoJSON bleibt eine Geometrie- und Austauschform. Die zitierbare, zeitlich prüfbare EarthMap-Fassung ist das Boundary-Set.

## GearBox

Eine GearBox ist keine zweite Datenbank und kein eigenes Statistikarchiv. Sie ist die Übersetzungsschicht zwischen:

1. einer externen CSV-/TSV-/JSON-Tabelle,
2. einem Boundary-Set,
3. einer gewünschten Visualisierung.

Die GearBox speichert nicht die Geometrie und nicht die fachliche Boundary-Wahrheit. Sie erklärt nur:

- an welches Boundary-Set eine Tabelle andockt,
- welche Tabellenspalte der Join-Schlüssel ist,
- welches Boundary-Feld dagegen gematcht wird,
- welche Wertspalten visualisiert werden können,
- welche Einheiten, Quellen und Darstellungsregeln gelten.

So bleiben Kartenarchiv und Statistikdaten getrennt. Eine CSV darf ersetzt oder neu erzeugt werden, ohne die Boundaries zu verändern.

## Importprinzip für Karten

Externe Formate wie GeoJSON, KML/KMZ, Shapefile oder API-Antworten werden nicht dauerhaft roh verwendet. Sie werden in ein Ziselin-Boundary-Set überführt:

1. Geometrie übernehmen.
2. stabile IDs prüfen oder erzeugen.
3. Name, Codes und möglichst Wikidata-ID je Einzelfläche ergänzen.
4. Quelle, Lizenz, Gültigkeit und Abrufzeitpunkt dokumentieren.
5. Review-Status setzen.

So kann EarthMap später Tabellenwerte zuverlässig auf Kartenobjekte matchen.

## Zeitregel

Jedes Boundary-Set und jede Einzelfläche besitzt eine Zeitangabe:

- `valid_from`: Beginn der Gültigkeit, soweit bekannt.
- `valid_to`: Ende der Gültigkeit oder `null` für offen/gegenwärtig.
- `valid_precision`: Genauigkeit der Angabe, z. B. `day`, `year`, `unknown`.
- `temporal_status`: z. B. `current`, `historical`, `undated_reference`, `working`.

Fehlt ein belastbarer Gültigkeitszeitraum, bleibt die Boundary nutzbar, wird aber als undatierte Referenz- oder Arbeitsfassung behandelt. Externe Tabellen sollen später gegen eine konkrete Boundary-Fassung oder gegen einen Zeitpunkt gemappt werden.

## ID-Regel

- `stable_id` bezeichnet die sachliche Einheit, z. B. `DEU-MV`.
- `version_id` bezeichnet die konkrete zeitgebundene Boundary-Fassung, z. B. `DEU-MV@1990-10-03..open`.
- `id` bleibt die technische Objekt-ID innerhalb des Boundary-Set- oder Projektkontexts.

Diese Trennung erlaubt, dieselbe politische oder administrative Einheit über mehrere historische Geometrie-Fassungen hinweg wiederzuerkennen.
