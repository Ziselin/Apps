# Ziselin Geo-Archive

Dieses Verzeichnis ist das lokale Kartenarchiv für EarthMap.

Ziel ist nicht, QGIS nachzubauen, sondern kartografische Grunddaten so zu normalisieren, dass sie zitierbar, versionierbar und mit statistischen Datensätzen verknüpfbar werden.

## Grundregel

Kartografische Daten sind nur dann veröffentlichungsfähig, wenn Lizenz, Provenienz und Kompatibilität maschinenlesbar dokumentiert sind. Grenzen ohne klare Lizenz dürfen lokal angezeigt, aber nicht als freie Ziselin-/Atlas-Karte exportiert oder weiterveröffentlicht werden.

## Struktur

- `schemas/` enthält JSON-Schemas und Beispielspezifikationen.
- `collections/` enthält standardisierte Boundary-Sets, also Kartensammlungen mit Einzelflächen.
- `datasets/` enthält Datensätze, die über stabile IDs auf Boundary-Sets verweisen.

## Importprinzip

Externe Formate wie GeoJSON, KML/KMZ, Shapefile oder API-Antworten werden nicht dauerhaft roh verwendet. Sie werden in ein Ziselin-Boundary-Set überführt:

1. Geometrie übernehmen.
2. stabile IDs prüfen oder erzeugen.
3. Name, Codes und möglichst Wikidata-ID je Einzelfläche ergänzen.
4. Quelle, Lizenz, Gültigkeit und Abrufzeitpunkt dokumentieren.
5. Review-Status setzen.

So kann EarthMap später Tabellenwerte zuverlässig auf Kartenobjekte matchen.
