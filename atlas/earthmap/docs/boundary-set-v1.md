# EarthMap Boundary-Set v1

Boundary-Set v1 ist das Austausch- und Archivformat für geografische Einheiten in EarthMap. Es beschreibt nicht die Statistik selbst, sondern die kartografische Grundlage, an die Statistikdaten später andocken.

Die wichtigste Architekturregel lautet:

> Boundary-Sets sind die räumliche Wahrheit. Statistik-Layer referenzieren Boundary-IDs und enthalten Werte, Quellen und Darstellungsregeln, aber keine zweite Geometriewahrheit.

## Ziele

- stabile IDs für geografische Einheiten bereitstellen
- Geometrie, Metadaten, Quellen, Lizenz und zeitliche Gültigkeit zusammenhalten
- große Kartenbestände kachel-/chunkfähig machen
- Matching mit externen Tabellen ermöglichen, z. B. über ISO-Codes, Wikidata-ID, amtliche Schlüssel oder Namen
- spätere Worker-/IndexedDB-Pipeline vorbereiten

## Nicht-Ziele

- keine Statistikdaten speichern
- keine endgültige politische oder rechtliche Wahrheit behaupten
- keine QGIS-artige Vollbearbeitung ersetzen
- keine lokalen Rechte-/Policy-Entscheidungen verwalten

## Top-Level-Struktur

```json
{
  "schema": "ziselin-boundary-set-v1",
  "id": "natural-earth:10m:admin0:deu",
  "stable_id": "natural-earth:10m:admin0:deu",
  "version_id": "natural-earth:10m:admin0:deu@natural-earth-10m-reference",
  "title": "Germany",
  "provider": "Natural Earth",
  "provider_boundary_id": "DEU",
  "boundary_type": "administrative",
  "admin_level": "ADM0",
  "rank": 1,
  "country_iso3": "DEU",
  "wikidata_id": "Q183",
  "valid_from": "",
  "valid_to": null,
  "valid_precision": "unknown",
  "temporal_status": "undated_reference",
  "source": {},
  "license": {},
  "data_binding": {},
  "features": []
}
```

## Felder

| Feld | Bedeutung |
| --- | --- |
| `schema` | Formatkennung. Für dieses Format immer `ziselin-boundary-set-v1`. |
| `id` | konkrete ID dieses Boundary-Sets. Darf versioniert oder quellenspezifisch sein. |
| `stable_id` | stabile, langfristig referenzierbare ID der Einheit. Statistikdaten sollen bevorzugt hieran andocken. |
| `version_id` | konkrete Fassung der Einheit, inklusive zeitlicher oder quellenspezifischer Version. |
| `title` | menschenlesbarer Name. |
| `provider` | Datenanbieter, z. B. Natural Earth, geoBoundaries, amtliche Quelle. |
| `provider_boundary_id` | ID des Anbieters, z. B. ISO-3, ISO-3166-2, Wahlkreisnummer. |
| `boundary_type` | Art der Grenze, z. B. `administrative`, `electoral`, `historical`, `statistical`, `custom`. |
| `admin_level` | Verwaltungsebene, z. B. `ADM0`, `ADM1`, `ADM2`, `electoral_district`. |
| `rank` | interne Rangordnung für Darstellung und Vererbung von Projektstilen. |
| `country_iso3` | ISO-3-Kontext, falls zutreffend. Bei überstaatlichen Einheiten leer oder Liste über Metadaten. |
| `wikidata_id` | Wikidata-QID, wenn bekannt. Wichtig für Synonyme, Sprachen und spätere KI-gestützte Zuordnung. |
| `valid_from` | Beginn der fachlichen Gültigkeit. Leer, wenn unbekannt. |
| `valid_to` | Ende der fachlichen Gültigkeit. `null`, wenn aktuell/offen oder unbekannt. |
| `valid_precision` | Genauigkeit der Zeitangabe, z. B. `day`, `year`, `unknown`. |
| `temporal_status` | zeitlicher Status, z. B. `current`, `historical`, `undated_reference`. |
| `source` | Quellenangaben zur Geometrie und Metadaten. |
| `license` | Lizenzinformation mit Link und Kompatibilität. |
| `data_binding` | Hinweise, über welche Schlüssel externe Tabellen andocken sollen. |
| `features` | GeoJSON-Features dieses Boundary-Sets. Eine einfache Karte hat meist ein Feature, komplexe Karten mehrere. |

## `source`

```json
{
  "label": "Natural Earth",
  "url": "https://www.naturalearthdata.com/",
  "accessed_at": "",
  "note": "Coast-aligned local build from Natural Earth 10m."
}
```

Hier wird die Herkunft der Geometrie dokumentiert. Für importierte oder bearbeitete Karten soll zusätzlich festgehalten werden, ob und wie die Geometrie verändert wurde.

## `license`

```json
{
  "id": "public-domain",
  "label": "Public Domain",
  "url": "https://www.naturalearthdata.com/about/terms-of-use/",
  "detail": "Natural Earth public domain map data.",
  "compatibility": {
    "wikimedia": true,
    "openstreetmap": true,
    "attribution_required": false
  }
}
```

Die Lizenz gehört zur kartografischen Grundlage, nicht zum Statistikwert. Statistikdaten können eigene Quellen und Nutzungsbedingungen haben.

## `data_binding`

```json
{
  "primary_key": "stable_id",
  "provider_key": "provider_boundary_id",
  "match_keys": [
    "DEU",
    "Germany",
    "Deutschland",
    "Q183"
  ],
  "preferred_table_keys": [
    "boundary_key",
    "stable_id",
    "iso3",
    "wikidata_id",
    "boundary_label"
  ]
}
```

`data_binding` beschreibt, wie CSV- oder Tabellenwerte später zur Karte finden. Es ist die Brücke zur GearBox/Statistiklogik.

Wichtig: `match_keys` sind Such- und Zuordnungshilfen. Sie ersetzen nicht `stable_id`.

## `features`

Jedes Feature ist ein GeoJSON-Feature mit zusätzlichen EarthMap-Feldern.

```json
{
  "type": "Feature",
  "id": "natural-earth:10m:admin0:deu",
  "stable_id": "natural-earth:10m:admin0:deu",
  "version_id": "natural-earth:10m:admin0:deu@natural-earth-10m-reference",
  "name": "Germany",
  "wikidata_id": "Q183",
  "rank": 1,
  "valid_from": "",
  "valid_to": null,
  "properties": {},
  "match_tokens": [],
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": []
  }
}
```

## Index-/Chunk-Struktur

Große Kartenbestände werden nicht als ein großer Block geladen. Ein Boundary-Archiv besteht aus:

```text
index.json
chunks/
  natural-earth_10m_admin0_deu.geojson
  natural-earth_10m_admin0_fra.geojson
  ...
```

Der Index enthält nur leichte Metadaten:

```json
{
  "schema": "ziselin-boundary-set-index-v1",
  "id": "natural-earth:10m:admin0",
  "title": "Natural Earth 10m Admin0",
  "boundary_set_schema": "ziselin-boundary-set-v1",
  "chunks": [
    {
      "stable_id": "natural-earth:10m:admin0:deu",
      "title": "Germany",
      "admin_level": "ADM0",
      "rank": 1,
      "country_iso3": "DEU",
      "wikidata_id": "Q183",
      "file": "chunks/natural-earth_10m_admin0_deu.geojson",
      "bbox": [5.86, 47.27, 15.04, 55.06],
      "bytes": 123456,
      "feature_count": 1,
      "match_keys": ["DEU", "Germany", "Deutschland", "Q183"]
    }
  ]
}
```

Dadurch kann EarthMap später:

- nur sichtbare oder benötigte Chunks laden
- Statistikdaten vorab gegen den Index matchen
- Geometrien erst nachladen, wenn sie wirklich gezeichnet werden
- große Archive in IndexedDB ablegen

## Admin-1-Länderchunks

Für Admin-0 ist ein Chunk meist genau ein Boundary-Set. Für Admin-1 wäre eine Datei pro Region zu kleinteilig. Darum nutzt EarthMap hier Länderchunks:

```json
{
  "schema": "ziselin-boundary-set-country-chunk-v1",
  "id": "natural-earth:10m:admin1:deu",
  "country_iso3": "DEU",
  "features": [
    {
      "stable_id": "natural-earth:10m:admin1:deu:de-by",
      "name": "Bayern",
      "properties": {
        "iso_3166_2": "DE-BY"
      },
      "geometry": {}
    }
  ]
}
```

Der Chunk ist also nur die Ladeeinheit. Die fachliche Einheit bleibt das einzelne Feature mit eigener `stable_id`, `version_id`, Zeitinformation, Wikidata-ID und `match_tokens`.

## Beispiel: Statistik-Andockung

Eine CSV-Zeile:

```csv
boundary_key;boundary_label;value;unit;source_label
DEU;Germany;5.8;%;Example Source
```

Die GearBox sucht `DEU` im Index, findet `natural-earth:10m:admin0:deu`, lädt bei Bedarf den Chunk und erzeugt daraus einen Statistik-Layer:

```json
{
  "boundary_key": "DEU",
  "stable_id": "natural-earth:10m:admin0:deu",
  "value": 5.8,
  "unit": "%",
  "fill": "#87b87a"
}
```

Die Geometrie bleibt im Boundary-Set. Die Statistik bleibt im Statistik-Layer.

## Versionierungsregel

`stable_id` bleibt stabil, solange dieselbe fachliche Einheit gemeint ist. `version_id` ändert sich, wenn:

- die Geometrie fachlich relevant geändert wird
- sich die zeitliche Gültigkeit ändert
- eine andere Quelle oder ein anderer Bearbeitungsstand benutzt wird

## Offene Punkte für v1.1

- standardisierte Vereinfachungsstufen pro Boundary
- Topologie-/Nachbarschaftsindex
- explizite Parent-/Child-Relationen im Index
- historische Grenzvarianten
- Validierungsreport pro Build
- optionale TopoJSON-Ausgabe
