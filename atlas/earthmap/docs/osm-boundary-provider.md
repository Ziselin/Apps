# EarthMap OSM-Boundary-Provider

EarthMap soll OSM-Daten nicht direkt als rohe Live-Antwort rendern. OSM ist eine Datenquelle; die App arbeitet intern weiter mit `Boundary-Set-v1`.

## Zweck

OSM ergänzt die Ebenen, die Natural Earth nicht oder nicht global bereitstellt, insbesondere ADM2, ADM3 und darunterliegende Verwaltungsebenen.

## Datenfluss

1. Nutzer sucht oder importiert eine Verwaltungseinheit.
2. Der Provider ermittelt passende OSM-Relationen, bevorzugt mit `boundary=administrative` und `admin_level`.
3. Die Relation wird in ein `Boundary-Set-v1` überführt.
4. EarthMap speichert stabile Identität, Parent-Bezug, Gültigkeit, Quelle, Lizenz und Geometrie getrennt von Statistikwerten.
5. Der Renderer erhält nur bereits normalisierte Boundary-Features und färbt sie nach Projekt-/Statistikregeln ein.

## Mindestfelder

- `stable_id`: EarthMap-interne stabile ID.
- `provider`: `OpenStreetMap`.
- `provider_boundary_id`: OSM-Relation-ID.
- `admin_level`: z. B. `ADM2`, `ADM3` oder OSM-`admin_level`.
- `country_iso3`: übergeordnetes Land, falls eindeutig.
- `parent_id`: übergeordnete Boundary, wenn bekannt.
- `wikidata_id`: wenn über OSM/Wikidata ermittelbar.
- `valid_from` / `valid_to`: fachliche Gültigkeit, falls bekannt.
- `source.url`: Link auf OSM-Relation oder Overpass-Abfrage.
- `license`: ODbL-Informationen.

## Regel

OSM-Daten müssen vor dem Rendern in die gleiche Engine-Pipeline wie Natural Earth überführt werden. Dadurch bleiben Suche, gespeicherte Karten, Statistik-Matching und Darstellung harmonisiert.

## Archivlogik

Die physische Engine-Struktur darf provider-orientiert bleiben:

```text
assets/earthmap-engine/boundary-sets/osm/europe/DEU/ADM2/
assets/earthmap-engine/boundary-sets/geoboundaries/current/BRA/ADM3/
```

Die menschliche Archivansicht wird separat katalogisiert:

```text
DEU/
  ADM-1/
  ADM-2/
    [2024-] Landkreis Rostock.boundary.json
  ADM-3/
```

Der Zeitraum im Dateinamen ist nur Orientierung. Autoritativ bleiben `valid_from`, `valid_to`, `valid_precision` und `temporal_status` im Boundary-Set.

## Provider-Routing

- Europa ADM2–ADM4: bevorzugt OpenStreetMap, wenn die Relation sauber polygonisiert und kategorisiert werden kann.
- Globale Lücken und Nicht-Europa ADM2–ADM5: bevorzugt geoBoundaries.
- Bestehende Natural-Earth-Daten, z. B. USA ADM2, bleiben als Referenz erhalten und werden in die gleiche logische Ordnerstruktur eingehängt.
