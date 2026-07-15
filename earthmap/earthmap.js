const ui = Object.fromEntries([
  "globeApp", "menuButton", "menuButtonIcon", "menuCloseButton", "menuOverlay", "sideMenu",
  "themeToggleButton", "themeToggleIcon", "exportProjectButton", "exportMenu", "fullscreenButton",
  "saveSearchLayerButton",
  "mapSearchInput", "mapSearchOptions", "mapSearchInfoButton", "mapSearchInfoPopup",
  "openWorkspaceButton", "returnPreviewButton", "globe", "mapLibreContainer", "globeCanvas", "mapEngineDiagnostics",
  "viewToolsDrawer", "viewToolsDrawerTab", "viewToolsDrawerPanel", "projectionToggle", "graticuleToggle", "admin1Toggle",
  "browserActionsMenuButton", "browserActionsMenu",
  "editorBackButton",
  "newProjectButton", "importBoundarySetButton", "importBoundarySetFromFolderButton", "boundarySetImportInput", "projectBrowserList", "libraryBrowserList",
  "boundarySearchInput", "boundarySearchButton", "boundarySearchResults",
  "layerEditorTitle", "layerEditorSummary", "layerEditorContent", "layerMetaList",
].map((id) => [id, document.getElementById(id)]));

let viewToolsDrawerCloseTimer = null;
let mapSearchDebounceTimer = null;
let mapSearchRequestSerial = 0;
let mapLibreAdmin1RequestSerial = 0;
let mapLibreAdmin1ViewportTimer = null;
let mapSearchOptionCache = null;
let wikidataMapSearchLoadingCount = 0;
const wikidataMapSearchCache = new Map();
const MAP_SEARCH_INPUT_DEBOUNCE_MS = 260;
const MAP_SEARCH_ADMIN1_SYNC_DELAY_MS = 180;
const earthMapLazyAssetPromises = new Map();

const DEFAULT_LAYER_FILL_COLOR = "#c6a86a";
const DEFAULT_LAYER_OUTLINE_COLOR = "#8f9690";
const LIGHT_MAP_SELECTED_COLOR = "#9fa29d";
const LIGHT_MAP_SELECTED_OUTLINE_COLOR = "#6f7571";
const LIGHT_MAP_SPECIAL_HIGHLIGHT_COLOR = "#b88a3a";
const LIGHT_MAP_SPECIAL_OUTLINE_COLOR = "#7d602d";
const LIGHT_MAP_ADMIN0_BOUNDARY_COLOR = "rgba(76,82,79,.82)";
const LIGHT_MAP_ADMIN1_BOUNDARY_COLOR = "rgba(98,105,100,.48)";
const LIGHT_MAP_ADMIN1_SPECIAL_BOUNDARY_COLOR = "rgba(76,82,79,.72)";
const LIGHT_MAP_COASTLINE_COLOR = "#2e8eba";
const DARK_MAP_COASTLINE_COLOR = "#2e8eba";
const DARK_MAP_WATER_COLOR = "#c8ebff";
const DARK_MAP_SELECTED_COLOR = "#fefee9";
const DARK_MAP_UNSELECTED_COLOR = "#e0e0e0";
const DARK_MAP_SPECIAL_HIGHLIGHT_COLOR = "#c12737";
const DARK_MAP_BOUNDARY_COLOR = "#666666";
const DEFAULT_CONTINENTAL_MAP_ID = "continental-natural-earth-10m-land";
const OSM_TOPOGRAPHIC_MAP_ID = "continental-osm-topographic-unlabeled";
const EARTHMAP_ARCHIVE_DB_NAME = "ziselin-earthmap-archive";
const EARTHMAP_ARCHIVE_DB_VERSION = 1;
const EARTHMAP_BOUNDARY_FEATURE_STORE = "boundarySetFeatures";
const NATURAL_EARTH_ARCHIVE_ID = "natural-earth-10m-archive";
const EARTHMAP_BOUNDARY_SET_SCHEMA = "ziselin-boundary-set-v1";
const EARTHMAP_GEARBOX_SCHEMA = "ziselin-gearbox-v1";
const EARTHMAP_PROJECT_DISPLAY_STYLE_VERSION = "boundary-hierarchy-v1";
const EARTHMAP_ENGINE_ADMIN0_BASE = "../assets/earthmap-engine/boundary-sets/natural-earth/10m/admin0/";
const EARTHMAP_ENGINE_ADMIN1_BASE = "../assets/earthmap-engine/boundary-sets/natural-earth/10m/admin1/";
const EARTHMAP_RENDER_ENGINE_V2 = "maplibre-pilot";
const MAPLIBRE_LAND_SOURCE_ID = "earthmap-natural-earth-land";
const MAPLIBRE_LAND_FILL_LAYER_ID = "earthmap-natural-earth-land-fill";
const MAPLIBRE_COASTLINE_LAYER_ID = "earthmap-natural-earth-coastline";
const MAPLIBRE_WATER_SOURCE_ID = "earthmap-natural-earth-water";
const MAPLIBRE_WATER_FILL_LAYER_ID = "earthmap-natural-earth-water-fill";
const MAPLIBRE_WATER_OUTLINE_LAYER_ID = "earthmap-natural-earth-water-outline";
const MAPLIBRE_ADMIN0_SOURCE_ID = "earthmap-natural-earth-admin0";
const MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID = "earthmap-natural-earth-admin0-boundaries";
const MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_SOURCE_ID = "earthmap-natural-earth-admin0-special-boundaries";
const MAPLIBRE_ADMIN0_FILL_LAYER_ID = "earthmap-natural-earth-admin0-fill";
const MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID = "earthmap-natural-earth-admin0-boundary";
const MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID = "earthmap-natural-earth-admin0-special-boundary";
const MAPLIBRE_ADMIN1_SOURCE_ID = "earthmap-natural-earth-admin1";
const MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID = "earthmap-natural-earth-admin1-boundaries";
const MAPLIBRE_ADMIN1_FILL_LAYER_ID = "earthmap-natural-earth-admin1-fill";
const MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID = "earthmap-natural-earth-admin1-boundary";
const MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID = "earthmap-natural-earth-admin1-special-boundary";
const MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID = "earthmap-natural-earth-admin1-swiss-canton-boundary";
const MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID = "earthmap-search-highlight";
const MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID = "earthmap-search-context-fill";
const MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID = "earthmap-search-focus-fill";
const MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID = "earthmap-search-context-outline";
const MAPLIBRE_SEARCH_FOCUS_OUTLINE_LAYER_ID = "earthmap-search-focus-outline";
// Architekturregel: Boundary-Sets speichern geografische Einheiten, Geometrie,
// Provenienz, Lizenz und Gültigkeit. GearBoxes speichern dagegen nur die
// Übersetzung externer Tabellen auf diese Boundaries: Join-Spalten, Wertspalten,
// Quellenhinweise und Darstellungsregeln. Statistikdaten werden dadurch nicht
// versehentlich zur zweiten Kartenwahrheit.
const NATURAL_EARTH_ADMIN1_BOUNDARY_LAYER_ZOOM = 3.15;
const NATURAL_EARTH_ADMIN1_BOUNDARY_LOAD_ZOOM = 2.75;
const MAPLIBRE_ADMIN1_VIEWPORT_LOAD_ZOOM = 2.75;
const MAPLIBRE_ADMIN1_VIEWPORT_CHUNK_LIMIT = 6;
const MAPLIBRE_ADMIN1_PERMANENT_VIEWPORT_ZOOM = 3.5;
const MAPLIBRE_SWISS_CANTON_BOUNDARY_ZOOM = 6.5;
const MAPLIBRE_FULL_LAND_LOAD_ZOOM = 2.15;
const MAPLIBRE_WATER_LOAD_ZOOM = 2.35;
const MAPLIBRE_BAIKONUR_BBOX = [62.75, 45.52, 64.02, 46.44];
const NATURAL_EARTH_ARCHIVE_DATASETS = [
  {
    id: "admin_0_countries",
    label: "Staaten und abhängige Gebiete",
    detail: "10m",
    path: `${EARTHMAP_ENGINE_ADMIN0_BASE}index.json`,
    status: "Boundary-Set-v1 gekachelt · Küsten an Grundkarte ausgerichtet",
  },
  {
    id: "admin_1_states_provinces",
    label: "Gliedstaaten / Provinzen",
    detail: "10m",
    path: `${EARTHMAP_ENGINE_ADMIN1_BASE}index.json`,
    status: "Boundary-Set-v1 nach ISO-3 gekachelt · Küsten an Grundkarte ausgerichtet",
  },
  {
    id: "lakes",
    label: "Seen und Gewässerflächen",
    detail: "10m",
    path: "../assets/geojson/natural-earth/10m/ne_10m_lakes.geojson",
    status: "GeoJSON eingebunden",
  },
  {
    id: "enclosed_seas",
    label: "Binnenmeere",
    detail: "10m",
    path: "../assets/geojson/natural-earth/10m/ne_10m_enclosed_seas.geojson",
    status: "aus Natural-Earth-Marineflächen extrahiert",
  },
];
const CONTINENTAL_MAP_OPTIONS = [
  {
    value: "none",
    label: "Keine Grundkarte",
    detail: "Es wird keine Kontinental- oder Küstenliniengrundkarte dargestellt.",
    renderable: true,
  },
  {
    value: DEFAULT_CONTINENTAL_MAP_ID,
    label: "Natural Earth 10 m",
    detail: "Renderbare Vektor-Grundkarte aus der lokalen Natural-Earth-10m-Hierarchie.",
    renderable: true,
  },
  {
    value: OSM_TOPOGRAPHIC_MAP_ID,
    label: "OSM topografisch · unbeschriftet",
    detail: "Lokaler, unbeschrifteter topografischer Grundkartenstil auf der vorhandenen Vektor-Geometrie. Echte OSM-Offline-Tiles können später als Datenquelle ergänzt werden.",
    renderable: true,
  },
];

const MAP_SEARCH_UNION_ALIASES = [
  {
    id: "european-union",
    names: ["Europäische Union", "EU", "European Union", "Union européenne", "Europaeische Union"],
    iso3: [
      "AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN",
      "FRA", "DEU", "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX",
      "MLT", "NLD", "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE",
      // Räumliche EU-Darstellung: Natural Earth führt einzelne EU-Gebiete
      // nicht zwingend innerhalb des Mitgliedstaats, sondern als eigene
      // Admin-0-Geometrien. Für die Karte ergänzen wir diese ausdrücklich,
      // damit "EU" nicht nur Mitgliedstaaten, sondern den dargestellten
      // EU-Geltungsraum markiert. Nicht-EU-Gebiete wie Grönland/Färöer
      // bleiben bewusst draußen.
      "GLP", "GUF", "MAF", "MTQ", "MYT", "REU",
    ],
  },
  {
    id: "united-nations",
    names: ["Vereinte Nationen", "United Nations", "UN", "UNO", "United Nations Organization"],
    // UN-Regel: Diese Liste bildet aktuelle Mitgliedstaaten ab, nicht
    // Gründungsmitglieder. Wikidata führt für Q1065 u. a. P112 (Gründer);
    // diese Eigenschaft darf hier gerade NICHT als Mitgliedschaftsersatz
    // verwendet werden, weil sie historische Gründung und aktuelle
    // Zugehörigkeit vermischt.
    iso3: [
      "AFG", "ALB", "DZA", "AND", "AGO", "ATG", "ARG", "ARM", "AUS",
      "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ",
      "BEN", "BTN", "BOL", "BIH", "BWA", "BRA", "BRN", "BGR", "BFA",
      "BDI", "CPV", "KHM", "CMR", "CAN", "CAF", "TCD", "CHL", "CHN",
      "COL", "COM", "COG", "CRI", "CIV", "HRV", "CUB", "CYP", "CZE",
      "PRK", "COD", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV",
      "GNQ", "ERI", "EST", "SWZ", "ETH", "FJI", "FIN", "FRA", "GAB",
      "GMB", "GEO", "DEU", "GHA", "GRC", "GRD", "GTM", "GIN", "GNB",
      "GUY", "HTI", "HND", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ",
      "IRL", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR",
      "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE",
      "LTU", "LUX", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL",
      "MRT", "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR",
      "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NZL", "NIC", "NER",
      "NGA", "MKD", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY",
      "PER", "PHL", "POL", "PRT", "QAT", "KOR", "ROU", "RUS", "RWA",
      "KNA", "LCA", "VCT", "WSM", "SMR", "STP", "SAU", "SEN", "SRB",
      "SYC", "SLE", "SGP", "SVK", "SVN", "SLB", "SOM", "ZAF", "SSD",
      "ESP", "LKA", "SDN", "SUR", "SWE", "CHE", "SYR", "TJK", "THA",
      "TLS", "TGO", "TON", "TTO", "TUN", "TUR", "TKM", "TUV", "UGA",
      "UKR", "ARE", "GBR", "TZA", "USA", "URY", "UZB", "VUT", "VEN",
      "VNM", "YEM", "ZMB", "ZWE",
    ],
  },
  {
    id: "g7",
    names: ["G7", "Gruppe der Sieben", "Group of Seven"],
    iso3: ["CAN", "FRA", "DEU", "ITA", "JPN", "GBR", "USA"],
  },
  {
    id: "nato",
    names: ["NATO", "North Atlantic Treaty Organization", "Organisation des Nordatlantikvertrags", "Nordatlantikpakt"],
    iso3: [
      "ALB", "BEL", "BGR", "CAN", "HRV", "CZE", "DNK", "EST", "FIN",
      "FRA", "DEU", "GRC", "HUN", "ISL", "ITA", "LVA", "LTU", "LUX",
      "MNE", "NLD", "MKD", "NOR", "POL", "PRT", "ROU", "SVK", "SVN",
      "ESP", "SWE", "TUR", "GBR", "USA",
    ],
  },
  {
    id: "asean",
    names: ["ASEAN", "Verband Südostasiatischer Nationen", "Association of Southeast Asian Nations"],
    iso3: ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM"],
  },
  {
    id: "brics",
    names: ["BRICS", "BRICS-Staaten", "BRICS Plus"],
    iso3: ["BRA", "RUS", "IND", "CHN", "ZAF", "EGY", "ETH", "IDN", "IRN", "ARE"],
  },
  {
    id: "g20",
    names: ["G20", "Gruppe der Zwanzig", "Group of Twenty"],
    iso3: [
      "ARG", "AUS", "BRA", "CAN", "CHN", "FRA", "DEU", "IND", "IDN",
      "ITA", "JPN", "MEX", "RUS", "SAU", "ZAF", "KOR", "TUR", "GBR", "USA",
    ],
  },
  {
    id: "oecd",
    names: ["OECD", "Organisation für wirtschaftliche Zusammenarbeit und Entwicklung"],
    iso3: [
      "AUS", "AUT", "BEL", "CAN", "CHL", "COL", "CRI", "CZE", "DNK",
      "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ISR",
      "ITA", "JPN", "KOR", "LVA", "LTU", "LUX", "MEX", "NLD", "NZL",
      "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE", "TUR",
      "GBR", "USA",
    ],
  },
  {
    id: "opec",
    names: ["OPEC", "Organisation erdölexportierender Länder"],
    iso3: ["DZA", "COG", "GNQ", "GAB", "IRN", "IRQ", "KWT", "LBY", "NGA", "SAU", "ARE", "VEN"],
  },
  {
    id: "mercosur",
    names: ["Mercosur", "Mercosul", "Gemeinsamer Markt des Südens"],
    iso3: ["ARG", "BOL", "BRA", "PRY", "URY"],
  },
  {
    id: "usmca",
    names: ["USMCA", "CUSMA", "T-MEC", "NAFTA", "Nordamerikanisches Freihandelsabkommen"],
    iso3: ["CAN", "MEX", "USA"],
  },
  {
    id: "cis",
    names: ["GUS", "CIS", "Gemeinschaft Unabhängiger Staaten", "Commonwealth of Independent States"],
    iso3: ["ARM", "AZE", "BLR", "KAZ", "KGZ", "MDA", "RUS", "TJK", "UZB"],
  },
  {
    id: "au",
    names: ["Afrikanische Union", "AU", "African Union"],
    iso3: [
      "DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF",
      "TCD", "COM", "COG", "COD", "CIV", "DJI", "EGY", "GNQ", "ERI",
      "SWZ", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "KEN", "LSO",
      "LBR", "LBY", "MDG", "MWI", "MLI", "MRT", "MUS", "MAR", "MOZ",
      "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "SOM",
      "ZAF", "SSD", "SDN", "TZA", "TGO", "TUN", "UGA", "ZMB", "ZWE",
      "ESH",
    ],
  },
];

const MAP_SEARCH_ADMIN0_RELATION_OVERRIDES = [
  {
    child_iso3: "ALD",
    parent_iso3: "FIN",
    // Natural Earth führt Åland als eigene Admin-0-Geometrie ALD. Fachlich ist
    // Åland autonomer Teil Finnlands und im EU-Geltungsraum enthalten. Die
    // Suchdarstellung ergänzt diese Geometrie deshalb bei "Finnland", ohne die
    // stabilen Boundary-IDs von FIN und ALD zusammenzulegen. Die Struktur
    // folgt bewusst den Boundary-Kategoriefeldern, damit spätere Sonderfälle
    // über Eigenschaften/Archivdaten gepflegt werden können statt über eine
    // zweite Suchwahrheit.
    classification: {
      type: "constituent_state",
      rank: 2,
      sovereignty_status: "autonomous",
      constitutional_status: "autonomous_region",
      relation_to_parent: "part_of",
      parent_id: "FIN",
      geometry_scope: "core_territory",
    },
    applies_to: {
      search_parent_context: true,
      search_parent_display: true,
      eu_scope: true,
    },
  },
];

const MAP_SEARCH_COUNTRY_ALIASES = [
  { names: ["Russische Föderation", "Russian Federation", "Rossijskaja Federazija"], iso3: "RUS" },
  { names: ["Vereinigte Staaten", "USA", "United States", "United States of America", "US"], iso3: "USA" },
  { names: ["Vereinigtes Königreich", "UK", "United Kingdom", "Great Britain", "Großbritannien"], iso3: "GBR" },
  { names: ["Südkorea", "South Korea", "Republik Korea", "Republic of Korea"], iso3: "KOR" },
  { names: ["Nordkorea", "North Korea", "Demokratische Volksrepublik Korea"], iso3: "PRK" },
  { names: ["Iran", "Islamische Republik Iran", "Islamic Republic of Iran"], iso3: "IRN" },
  { names: ["Vereinigte Arabische Emirate", "VAE", "UAE", "United Arab Emirates"], iso3: "ARE" },
  { names: ["Elfenbeinküste", "Côte d’Ivoire", "Cote d Ivoire", "Ivory Coast"], iso3: "CIV" },
];

const MAP_TYPE_CHOICES = [
  { value: "", label: "—", description: "Noch nicht fachlich zugeordnet." },
  { value: "state", label: "1 · Staat / Großverband", description: "Souveräner oder quasi-souveräner Staat bzw. Großverband, z. B. Königreich Frankreich, Republik Venedig, Osmanisches Reich." },
  { value: "composite_realm", label: "2 · Zusammengesetzter Rechtsraum", description: "Übergeordneter Rechts-, Reichs- oder Ordnungsraum, der nicht zwingend ein moderner Zentralstaat ist, z. B. HRR, Deutscher Bund, Habsburgermonarchie." },
  { value: "constituent_state", label: "3 · Gliedstaat / Teilstaat", description: "Gliedstaat, Teilstaat oder privilegierter Akteur innerhalb eines größeren Verbandes, z. B. Kurfürstentum Sachsen, Kanton, Bundesstaat." },
  { value: "territorial_holding", label: "4 · Besitz- oder Herrschaftsraum", description: "Konkreter Besitz- oder Herrschaftsraum eines Akteurs, auch wenn er administrativ nicht sauber eingegliedert ist." },
  { value: "administrative_division", label: "5 · Verwaltungseinheit", description: "Normale Verwaltungseinheit innerhalb eines Staates oder Teilstaates, z. B. Provinz, Gouvernement, Département, Kreis." },
  { value: "jurisdictional_region", label: "6 · Rechts- oder Organisationsraum", description: "Rechts-, Gerichts-, Steuer-, Militär- oder Organisationsraum, der keine allgemeine Verwaltungseinheit ist, z. B. Reichskreis." },
  { value: "dependent_polity", label: "7 · Abhängiges Gemeinwesen", description: "Gemeinwesen mit eigener Herrschaftsstruktur, aber begrenzter Außen- oder Innenautonomie, z. B. Vasall, Protektorat, Tributstaat." },
  { value: "colony_or_overseas_possession", label: "8 · Kolonie / Überseegebiet", description: "Kolonie, Handelsstützpunkt, Überseegebiet oder Besitzung außerhalb des Kernraums." },
  { value: "personal_union_member", label: "9 · Personalunionsglied", description: "Gebiet, das über eine Person mit anderen Herrschaften verbunden ist, rechtlich aber getrennt bleibt." },
  { value: "claimed_or_disputed_area", label: "10 · Anspruchs- oder Streitgebiet", description: "Beanspruchtes, umstrittenes, nominell kontrolliertes oder nur teilweise kontrolliertes Gebiet." },
];

const MAP_RANK_CHOICES = [
  { value: "", label: "—", description: "Noch nicht hierarchisch eingeordnet." },
  { value: "0", label: "0 · Makro-/Zivilisationsraum", description: "Sehr großer Ordnungs-, Kultur- oder Zivilisationsraum, z. B. Christendom, Dar al-Islam, Sinosphere." },
  { value: "1", label: "1 · Staat / Reich / Großverband", description: "Souveräner Hauptakteur oder oberste politische Ordnung, z. B. Frankreich, Osmanisches Reich, HRR." },
  { value: "2", label: "2 · Teilstaat / große Abhängigkeit", description: "Teilstaat, Kronland, Reichsstand, Kolonie oder abhängiger Staat, z. B. Kurbrandenburg, Böhmen, Britisch-Indien." },
  { value: "3", label: "3 · regionale Division / Jurisdiktion", description: "Provinz, Kreis, Gouvernement, Département oder Reichskreis." },
  { value: "4", label: "4 · lokale Einheit", description: "Lokale Verwaltungseinheit, Stadtgebiet, Distrikt, Grafschaft, Amt oder Herrschaft." },
];

const PROJECT_RANK_OUTLINE_DEFAULTS = {
  "0": { strokeColor: "#5f665f", strokeWidth: 1.65, strokeStyle: "solid" },
  "1": { strokeColor: "#626862", strokeWidth: 1.35, strokeStyle: "solid" },
  "2": { strokeColor: "#777f78", strokeWidth: 1.05, strokeStyle: "dashed" },
  "3": { strokeColor: "#929991", strokeWidth: 0.74, strokeStyle: "solid" },
  "4": { strokeColor: "#b7bdb5", strokeWidth: 0.52, strokeStyle: "solid" },
};

const PROJECT_STROKE_STYLE_CHOICES = [
  { value: "solid", label: "Durchgezogen" },
  { value: "dashed", label: "Gestrichelt" },
  { value: "dotted", label: "Punktiert" },
  { value: "dash_dot", label: "Strich-Punkt" },
];

const SOVEREIGNTY_STATUS_CHOICES = [
  { value: "", label: "—", description: "Noch nicht hinsichtlich politisch-rechtlicher Eigenständigkeit eingeordnet." },
  { value: "sovereign", label: "1 · Souverän", description: "Eigenständiger Staat mit eigener Außenhoheit." },
  { value: "composite_sovereign", label: "2 · Zusammengesetzt souverän", description: "Zusammengesetzter Großstaat oder Reich mit mehreren Rechtskörpern, z. B. HRR, Habsburgermonarchie, Polen-Litauen." },
  { value: "supranational", label: "3 · Supranational", description: "Institutionenraum oberhalb souveräner Mitgliedstaaten mit übertragenen Hoheitsrechten, z. B. EU oder EG." },
  { value: "semi_sovereign", label: "4 · Halbsouverän", description: "Weitgehend eigenständig, aber in eine übergeordnete Ordnung eingebunden, z. B. Reichsstand im HRR." },
  { value: "autonomous", label: "5 · Autonom", description: "Interne Selbstverwaltung ohne volle Souveränität." },
  { value: "dependent", label: "6 · Abhängig", description: "Abhängig von Schutz-, Tribut-, Vasallen- oder Kolonialmacht." },
  { value: "non_sovereign", label: "7 · Nicht souverän", description: "Reine Verwaltungs-, Rechts- oder Organisationsregion." },
  { value: "occupied", label: "8 · Besetzt", description: "Militärisch oder faktisch besetzt, ohne stabile rechtliche Eingliederung." },
  { value: "disputed", label: "9 · Umstritten", description: "Gebiet mit konkurrierenden Herrschaftsansprüchen oder unklarem Status." },
  { value: "claimed", label: "10 · Beansprucht", description: "Beansprucht, aber nicht oder kaum kontrolliert." },
];

const CONSTITUTIONAL_STATUS_CHOICES = [
  { value: "", label: "—", description: "Noch nicht hinsichtlich dauerhaft hervorzuhebender Binnenordnung eingeordnet." },
  { value: "ordinary", label: "1 · Normale Verwaltungseinheit", description: "Keine besondere konstitutionelle Hervorhebung; Darstellung nur über normale Provinz-/Detailansicht." },
  { value: "federal_subject", label: "2 · Föderationssubjekt", description: "Gliedstaat eines Bundesstaats, z. B. deutsches Bundesland, US-Bundesstaat, kanadische Provinz." },
  { value: "autonomous_region", label: "3 · Autonome Region", description: "Region mit verfassungsrechtlich oder gesetzlich hervorgehobener Selbstverwaltung, z. B. Autonome Gemeinschaften Spaniens." },
  { value: "constituent_country", label: "4 · Konstituierender Landesteil", description: "Konstitutionell hervorgehobener Landesteil eines Staates, z. B. Home Nations, falls als saubere Geometrie vorhanden." },
  { value: "special_region", label: "5 · Sonderregion", description: "Sonderstatus mit politisch-rechtlicher Eigenstellung, der nicht gut in die anderen Kategorien passt." },
];

const RELATION_TO_PARENT_CHOICES = [
  { value: "", label: "—", description: "Noch nicht bestimmt." },
  { value: "none", label: "1 · Kein Parent", description: "Oberste Ebene ohne übergeordnetes Gebiet." },
  { value: "part_of", label: "2 · Teil von", description: "Generisches Teil-von-Verhältnis, wenn nichts Spezifischeres passt." },
  { value: "member", label: "3 · Mitglied", description: "Verfassungsrechtliches Mitglied eines Verbandes, z. B. Reichsstand, Kanton, Bundesstaat." },
  { value: "administrative_subdivision", label: "4 · Verwaltungsgliederung", description: "Normale Verwaltungseinheit, z. B. Provinz, Département, Gouvernement." },
  { value: "jurisdictional", label: "5 · Jurisdiktion", description: "Rechts-, Gerichts-, Steuer-, Militär- oder Organisationsraum." },
  { value: "dynastic_union", label: "6 · Dynastischer Verbund", description: "Mehrere Gebiete unter einem Herrscherhaus oder Besitzverbund." },
  { value: "personal_union", label: "7 · Personalunion", description: "Rechtlich getrennte Gebiete mit demselben Monarchen." },
  { value: "vassalage_or_tributary", label: "8 · Vasall / Tribut", description: "Vasallen-, Lehns-, Tribut- oder Suzeränitätsverhältnis." },
  { value: "protectorate", label: "9 · Protektorat", description: "Schutzverhältnis mit eingeschränkter Souveränität." },
  { value: "colonial_possession", label: "10 · Kolonialbesitz", description: "Koloniale Besitz- oder Herrschaftsbeziehung." },
  { value: "military_occupation", label: "11 · Militärische Besetzung", description: "Faktische militärische Kontrolle." },
  { value: "claim_or_dispute", label: "12 · Anspruch / Streit", description: "Anspruch, Streitgebiet oder nicht final kontrollierter Raum." },
];

const GEOMETRY_SCOPE_CHOICES = [
  { value: "", label: "—", description: "Noch nicht bestimmt, was die Geometrie genau abbildet." },
  { value: "de_jure_extent", label: "1 · Rechtlicher Geltungsraum", description: "Rechtlich anerkannter oder beanspruchter Geltungsbereich einer politischen Ordnung." },
  { value: "de_facto_control", label: "2 · Faktische Kontrolle", description: "Tatsächlich kontrolliertes Gebiet, unabhängig vom Rechtsanspruch." },
  { value: "full_territorial_extent", label: "3 · Gesamter territorialer Umfang", description: "Gesamter territorialer Umfang einer Entität, inklusive verstreuter Besitzungen." },
  { value: "core_territory", label: "4 · Kerngebiet", description: "Kernland ohne Außenbesitzungen, Kolonien oder abhängige Gebiete." },
  { value: "administrative_extent", label: "5 · Verwaltungsgebiet", description: "Gebiet einer konkreten Verwaltungseinheit." },
  { value: "jurisdictional_extent", label: "6 · Geltungsraum einer Ordnung", description: "Geltungsraum einer Rechts-, Gerichts-, Steuer-, Zoll-, Militär- oder Organisationsordnung." },
  { value: "dynastic_possession", label: "7 · Dynastischer Besitz", description: "Besitzkomplex eines Hauses oder Herrschers, nicht zwingend ein einheitlicher Staat." },
  { value: "inside_parent_only", label: "8 · Nur innerhalb des Parents", description: "Nur der Teil einer Entität, der innerhalb des Parent-Gebiets liegt." },
  { value: "outside_parent_only", label: "9 · Nur außerhalb des Parents", description: "Nur der Teil einer Entität außerhalb des Parent-Gebiets." },
  { value: "claimed_extent", label: "10 · Beanspruchter Raum", description: "Beanspruchtes, aber nicht zwingend kontrolliertes Gebiet." },
  { value: "disputed_extent", label: "11 · Strittiger Raum", description: "Gebiet mit konkurrierender oder strittiger Zuordnung." },
  { value: "sphere_of_influence", label: "12 · Einflussraum", description: "Einflussraum ohne direkte territoriale Eingliederung oder Verwaltung." },
];

function normalizeProjectStrokeStyle(value) {
  return PROJECT_STROKE_STYLE_CHOICES.some((choice) => choice.value === value) ? value : "solid";
}

function normalizeProjectRankKey(value) {
  const key = String(value ?? "");
  return Object.prototype.hasOwnProperty.call(PROJECT_RANK_OUTLINE_DEFAULTS, key) ? key : "3";
}

function createDefaultRankOutlineStyles(existing = {}) {
  return Object.fromEntries(Object.entries(PROJECT_RANK_OUTLINE_DEFAULTS).map(([rank, defaults]) => {
    const source = existing?.[rank] || {};
    const width = Number(source.strokeWidth);
    return [rank, {
      strokeColor: source && Object.prototype.hasOwnProperty.call(source, "strokeColor")
        ? normalizeColorValue(source.strokeColor, "") || ""
        : defaults.strokeColor,
      strokeWidth: Number.isFinite(width) && width >= 0 ? width : defaults.strokeWidth,
      strokeStyle: normalizeProjectStrokeStyle(source.strokeStyle || defaults.strokeStyle),
    }];
  }));
}

function normalizeProjectDisplaySettings(project, legacyContinentalMap = null) {
  const source = project?.displaySettings || {};
  const needsLocatorDefault = source.styleProfileVersion !== EARTHMAP_PROJECT_DISPLAY_STYLE_VERSION;
  // Projekt-Darstellungsregel: Der Renderer darf nicht mit freien,
  // verstreuten Magic Numbers arbeiten. Der Projektordner hält die
  // kartografische Rang-Hierarchie. Die konkrete Farbwelt bleibt Theme-Sache:
  // hell ist für den Atlas-/LaTeX-Look reserviert, dunkel für den sachlichen
  // Wikipedia-/Locator-Look. Manuelle Projektänderungen bleiben danach erhalten.
  return {
    ...source,
    styleProfileVersion: EARTHMAP_PROJECT_DISPLAY_STYLE_VERSION,
    continentalMapId: normalizeContinentalMapId(source.continentalMapId
      || (legacyContinentalMap?.display?.visible === false ? "none" : DEFAULT_CONTINENTAL_MAP_ID),
    ),
    rankOutlineStyles: createDefaultRankOutlineStyles(needsLocatorDefault ? {} : source.rankOutlineStyles),
  };
}

function createEditorTabButton(id, panel, label, active = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `editor-tab${active ? " is-active" : ""}`;
  button.id = id;
  button.dataset.editorTab = panel;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", active ? "true" : "false");
  const panelIds = {
    background: "panelBackground",
    gearbox: "panelGearBox",
    collections: "panelCollections",
    properties: "panelProperties",
  };
  button.setAttribute("aria-controls", panelIds[panel] || `panel-${panel}`);
  button.textContent = label;
  if (panel !== "properties") {
    button.addEventListener("click", () => setEditorTab(panel));
  }
  return button;
}

function createStatisticWorkTabButton(key, label, active = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `editor-tab${active ? " is-active" : ""}`;
  button.dataset.editorTab = `statistic-${key}`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", active ? "true" : "false");
  button.setAttribute("aria-controls", "panelGearBox");
  button.textContent = label;
  button.addEventListener("click", () => {
    const draft = ensureGearBoxDraft();
    draft.activeTab = key;
    state.gearBoxModeAction = "work";
    renderEditorTabs();
    renderGearBoxPanel();
    updateEditorModeView();
  });
  return button;
}

function createStatisticLayerTabButton(key, label, active = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `editor-tab${active ? " is-active" : ""}`;
  button.dataset.editorTab = `statistic-layer-${key}`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", active ? "true" : "false");
  button.setAttribute("aria-controls", "panelProperties");
  button.textContent = label;
  button.addEventListener("click", () => {
    state.statisticLayerActiveTab = key;
    renderEditorTabs();
    renderObjectEditor();
    updateEditorModeView();
  });
  return button;
}

function isGearBoxWorkMode() {
  return state.gearBoxModeAction === "work" || state.gearBoxModeAction === "csv";
}

function renderEditorTabs() {
  const tabs = document.querySelector(".editor-tabs");
  if (!tabs) return;
  const propertiesMode = state.editorMode === "object" || state.editorMode === "archive-object" || state.editorMode === "project" || state.editorMode === "subfolder";
  if (propertiesMode) {
    const item = getActiveLibraryItem();
    if (state.editorMode === "object" && isStatisticLayerItem(item)) {
      const activeStatisticTab = state.statisticLayerActiveTab || "properties";
      tabs.replaceChildren(
        createStatisticLayerTabButton("properties", "Eigenschaften", activeStatisticTab === "properties"),
        createStatisticLayerTabButton("values", "Werte", activeStatisticTab === "values"),
        createStatisticLayerTabButton("csv", "CSV-Code", activeStatisticTab === "csv"),
      );
      return;
    }
    tabs.replaceChildren(createEditorTabButton("tabProperties", "properties", "Eigenschaften", true));
    return;
  }
  if (state.activeEditorTab === "gearbox" && isGearBoxWorkMode()) {
    const activeWorkTab = ensureGearBoxDraft().activeTab || (state.gearBoxModeAction === "csv" ? "csv" : "editor");
    tabs.replaceChildren(
      createStatisticWorkTabButton("editor", "Eigenschaften", activeWorkTab === "editor"),
      createStatisticWorkTabButton("values", "Werte", activeWorkTab === "values"),
      createStatisticWorkTabButton("csv", "CSV-Code", activeWorkTab === "csv"),
    );
    return;
  }
  tabs.replaceChildren(
    createEditorTabButton("tabBackground", "background", "Hintergrund", state.activeEditorTab === "background"),
    createEditorTabButton("tabGearBox", "gearbox", "Statistik", state.activeEditorTab === "gearbox"),
    createEditorTabButton("tabCollections", "collections", "Importieren", state.activeEditorTab === "collections"),
  );
}

function initializeEarthMapEditorShell() {
  const editorPanel = document.querySelector(".editor-panel");
  const tabs = editorPanel?.querySelector(".editor-tabs");
  const searchPanel = document.getElementById("panelBoundarySearch");
  const layerPanel = document.getElementById("panelLayerEditor");
  if (!editorPanel || !tabs || !searchPanel) return;

  tabs.replaceChildren(
    createEditorTabButton("tabBackground", "background", "Hintergrund", true),
    createEditorTabButton("tabGearBox", "gearbox", "Statistik"),
    createEditorTabButton("tabCollections", "collections", "Importieren"),
  );

  const backgroundPanel = document.createElement("section");
  backgroundPanel.id = "panelBackground";
  backgroundPanel.className = "editor-tab-panel is-active";
  backgroundPanel.dataset.editorPanel = "background";
  backgroundPanel.setAttribute("role", "tabpanel");
  backgroundPanel.setAttribute("aria-labelledby", "tabBackground");
  backgroundPanel.innerHTML = `
    <div class="editor-section background-map-section">
      <h3>Hintergrundkarten</h3>
      <p>Hintergrundkarten bestimmen die Grunddarstellung des Globus. Sie erscheinen nicht im Projektbrowser, bleiben hier aber auswählbar und über ihre Eigenschaften prüfbar.</p>
      <div id="backgroundMapList" class="background-map-list"></div>
    </div>
  `;

  const propertiesPanel = document.createElement("section");
  propertiesPanel.id = "panelProperties";
  propertiesPanel.className = "editor-tab-panel";
  propertiesPanel.dataset.editorPanel = "properties";
  propertiesPanel.setAttribute("role", "tabpanel");
  propertiesPanel.setAttribute("aria-labelledby", "tabProperties");
  propertiesPanel.hidden = true;

  searchPanel.id = "panelGearBox";
  searchPanel.dataset.editorPanel = "gearbox";
  searchPanel.setAttribute("aria-labelledby", "tabGearBox");
  searchPanel.classList.remove("is-active");
  searchPanel.hidden = true;
  searchPanel.innerHTML = `
    <div class="editor-section gearbox-tool-section">
      <h3>Statistik</h3>
      <p>Statistiken koppeln externe CSV-/JSON-Werte an ein Boundary-Set. Sie speichern keine Geometrie und keine zweite Statistik-Wahrheit, sondern Join-Regeln, Wertspalten, Quellen und Darstellung.</p>
      <div class="gearbox-mode-row">
        <button type="button" id="gearBoxCreateButton" class="secondary-button mode-decision-button">Statistik erstellen</button>
        <button type="button" id="gearBoxGenerateButton" class="secondary-button mode-decision-button">Statistik generieren</button>
        <button type="button" id="gearBoxCsvCodeButton" class="secondary-button mode-decision-button" hidden>CSV-Code</button>
      </div>
    </div>
    <div id="gearBoxWorkspace" class="editor-section gearbox-workspace"></div>
    <input id="gearBoxCsvFileInput" type="file" accept=".csv,text/csv,.tsv,text/tab-separated-values,.json,application/json" hidden>
  `;
  if (layerPanel) {
    const objectEditor = document.createElement("div");
    objectEditor.id = "mapObjectEditor";
    objectEditor.className = "map-object-editor";
    objectEditor.hidden = true;
    while (layerPanel.firstChild) objectEditor.appendChild(layerPanel.firstChild);
    propertiesPanel.appendChild(objectEditor);
    layerPanel.remove();
  }

  const collectionsPanel = document.createElement("section");
  collectionsPanel.id = "panelCollections";
  collectionsPanel.className = "editor-tab-panel";
  collectionsPanel.dataset.editorPanel = "collections";
  collectionsPanel.setAttribute("role", "tabpanel");
  collectionsPanel.setAttribute("aria-labelledby", "tabCollections");
  collectionsPanel.hidden = true;
  collectionsPanel.innerHTML = `
    <div class="editor-section collection-tool-section">
      <h3>Importieren</h3>
      <p>Lade GeoJSON, KML, KMZ, gezippte Shapefiles oder ein Ziselin-Boundary-Set. Die Sammlung wird zuerst hier geprüft, in unser GeoJSON-Modell normalisiert und erst mit „Zum Projekt hinzufügen“ in das aktive Projekt übernommen.</p>
      <div class="collection-import-actions">
        <button type="button" id="importBoundarySetButton" class="secondary-button">Vom Desktop importieren</button>
        <button type="button" id="importBoundarySetFromFolderButton" class="secondary-button">Aus Importordner importieren</button>
      </div>
      <p class="structured-editor-field-help">Importordner: <code>earthmap/imports</code>. Lege dort GeoJSON, KML/KMZ oder gezippte Shapefiles ab.</p>
    </div>
    <div class="editor-section collection-tool-section">
      <h3 id="collectionImportTitle">Keine Sammlung geladen</h3>
      <p id="collectionImportSummary" class="empty-state">Importiere eine komplexe Karte, um Quelle, Lizenz, Einheiten und Kompatibilität zu prüfen.</p>
      <div id="collectionImportContent" class="layer-editor-content" hidden>
        <dl id="collectionImportMetaList" class="layer-meta-list"></dl>
        <button type="button" id="addCollectionToProjectButton" class="secondary-button">Zum Projekt hinzufügen</button>
      </div>
    </div>
  `;

  tabs.insertAdjacentElement("afterend", backgroundPanel);
  backgroundPanel.insertAdjacentElement("afterend", propertiesPanel);
  searchPanel.insertAdjacentElement("afterend", collectionsPanel);

  Object.assign(ui, Object.fromEntries([
    "mapObjectEditor", "importBoundarySetButton", "importBoundarySetFromFolderButton", "collectionImportTitle", "collectionImportSummary",
    "collectionImportContent", "collectionImportMetaList", "addCollectionToProjectButton", "backgroundMapList",
    "gearBoxCreateButton", "gearBoxGenerateButton", "gearBoxCsvCodeButton", "gearBoxWorkspace", "gearBoxCsvFileInput",
  ].map((id) => [id, document.getElementById(id)])));
}

initializeEarthMapEditorShell();

const STORAGE_KEY = "earthmap-projects-v1";
const LEGACY_STORAGE_KEY = "globemap-projects-v1";
const ACTIVE_PROJECT_STORAGE_KEY = "earthmap-active-project-v1";
const THEME_STORAGE_KEY = "earthmap-theme";
const VIEW_SETTINGS_STORAGE_KEY = "earthmap-view-settings-v1";
const MAP_PROJECTION_GLOBE = "globe";
const MAP_PROJECTION_FLAT = "map";
const NATURAL_EARTH_ASSET_BASE = "../assets/geojson/natural-earth/";
const boundaryFeatureRenderCache = new Map();
const boundaryFeatureVectorPathCache = new Map();

const GEOMETRY_BASE_REGISTRY = {
  naturalEarthModern: {
    id: "natural-earth-modern",
    label: "Natural Earth · moderne Erde",
    kind: "modern-earth",
    source: "Natural Earth",
    geometryType: "political-and-physical-boundaries",
    detailLevels: [
      { id: "10m-hierarchy", label: "10m · Vektorhierarchie", use: "Algorithmische Detailsteuerung", path: `${NATURAL_EARTH_ASSET_BASE}10m/tiles-vector-hierarchy/` },
    ],
  },
};

function createBoundaryDataBindingDefaults() {
  return {
    supports_external_datasets: true,
    preferred_keys: [
      "stable_id",
      "version_id",
      "wikidata_id",
      "iso3",
      "official_code",
      "name+parent+valid_at",
    ],
    join_notes: "Statistikdaten werden nicht im Boundary-Set gespeichert. Externe Datenblätter referenzieren diese Grenzen über stabile IDs, Versions-IDs, Wikidata-IDs, ISO-/Amtsschlüssel oder als Fallback über Name, Parent und Zeitbezug.",
  };
}

// Architekturregel: Earth-Map-Projekte referenzieren Boundary-Sets, statt eine
// einzelne Weltgeometrie fest einzubauen. Ein Boundary-Set beschreibt eine
// zitierbare, zeitlich gültige Fassung politischer/geografischer Grenzen.
// Statistikdaten bleiben externe Datenblätter und docken später über stabile
// Boundary-IDs, Versions-IDs, Wikidata-IDs oder ISO-Schlüssel an.
function createDefaultBoundarySets() {
  const stableId = "natural-earth-modern-land";
  const versionId = `${stableId}@undated-reference`;
  return [{
    id: `boundary-${Date.now()}`,
    schema: EARTHMAP_BOUNDARY_SET_SCHEMA,
    stable_id: stableId,
    version_id: versionId,
    role: "default",
    geometryBaseId: GEOMETRY_BASE_REGISTRY.naturalEarthModern.id,
    label: GEOMETRY_BASE_REGISTRY.naturalEarthModern.label,
    valid_from: "",
    valid_to: null,
    valid_precision: "unknown",
    temporal_status: "undated_reference",
    data_binding: createBoundaryDataBindingDefaults(),
    temporalModel: {
      kind: "present-day",
      validAt: "current",
    },
    detailStrategy: GEOMETRY_BASE_REGISTRY.naturalEarthModern.detailLevels.map((level, index) => ({
      ...level,
      minZoom: index === 0 ? 1 : index === 1 ? 7.05 : 16,
    })),
  }];
}

function createDefaultLibraryFolders() {
  return [
    {
      id: "folder-continental-maps",
      type: "continental-maps",
      title: "Kontinentalkarten",
      description: "Grundkarten für Kontinente, Küstenlinien und großräumige Landflächen.",
      items: [createDefaultContinentalMapItem(), createOsmTopographicMapItem()],
    },
    {
      id: "folder-boundary-maps",
      type: "boundary-maps",
      title: "einfache Karten",
      description: "Einzeln hinzugefügte Länder-, Grenz- und Regionskarten dieses Projekts.",
      items: [],
      subfolders: [],
    },
    {
      id: "folder-boundary-collections",
      type: "boundary-collections",
      title: "komplexe Karten",
      description: "Standardisierte Boundary-Sets mit einzeln referenzierbaren Flächen.",
      items: [],
      subfolders: [],
    },
  ];
}

function createDefaultContinentalMapItem() {
  return {
    id: DEFAULT_CONTINENTAL_MAP_ID,
    kind: "continental-map",
    name: "Natural Earth 10 m",
    source: "Natural Earth",
    adminLevel: "Landflächen / Küstenlinien",
    detail: "10m",
    license: "Public Domain",
    sourceUrl: `${NATURAL_EARTH_ASSET_BASE}10m/ne_10m_land.geojson`,
    importedAt: "system-default",
    temporalCoverage: {
      label: "gegenwärtige Natural-Earth-Grundkarte",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "#b8b8b4",
      outlineColor: "#8f9690",
    },
    geometryRef: {
      provider: "natural-earth",
      detail: "10m",
      dataset: "land",
    },
    locked: true,
  };
}

function createOsmTopographicMapItem() {
  return {
    id: OSM_TOPOGRAPHIC_MAP_ID,
    kind: "continental-map",
    name: "OSM topografisch · unbeschriftet",
    source: "OpenStreetMap-Stil · lokale Vektorgrundkarte",
    adminLevel: "Topografische Hintergrundkarte ohne Beschriftung",
    detail: "lokal gerendert",
    license: "Natural Earth Public Domain; OSM-Stilreferenz ohne Tile-Daten",
    sourceUrl: "https://www.openstreetmap.org/copyright",
    importedAt: "system-prepared",
    temporalCoverage: {
      label: "gegenwärtige topografische Grunddarstellung",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "#e7e2d1",
      outlineColor: "#9fa79f",
    },
    geometryRef: {
      provider: "local-osm-style",
      dataset: "topographic-unlabeled",
      status: "renderable",
    },
    locked: true,
  };
}

function createEarthMapProject(title = "Neues Earth-Map-Projekt") {
  return {
    id: `earthmap-${Date.now()}`,
    title,
    iconName: "mdi:folder",
    iconColor: "#9a6419",
    status: "in Vorbereitung",
    activeBoundarySetId: "",
    activeLibraryItemId: "",
    displaySettings: {
      continentalMapId: DEFAULT_CONTINENTAL_MAP_ID,
    },
    boundarySets: createDefaultBoundarySets(),
    libraryFolders: createDefaultLibraryFolders(),
    naturalEarthOverrides: {},
    dataLayers: [],
    classification: {
      mode: "manual-breaks",
      breaks: [
        { from: 0, to: 10, color: "#d9cc98" },
        { from: 11, to: 50, color: "#b9c59d" },
        { from: 51, to: 200, color: "#6e9388" },
      ],
    },
  };
}

function repairLegacyText(value) {
  if (typeof value !== "string") return value;
  return value
    .replaceAll("Â·", "·")
    .replaceAll("Ã¤", "ä")
    .replaceAll("Ã¶", "ö")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ã„", "Ä")
    .replaceAll("Ã–", "Ö")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("ÃŸ", "ß");
}

function normalizeLibraryItem(item) {
  return {
    id: item?.id || `layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: item?.kind || "boundary-map",
    name: repairLegacyText(item?.name || "Unbenannte Karte"),
    source: repairLegacyText(item?.source || ""),
    iso3: String(item?.iso3 || ""),
    wikidataId: normalizeWikidataId(item?.wikidataId || item?.wikidata_id || item?.wikidata || ""),
    adminLevel: repairLegacyText(item?.adminLevel || item?.level || ""),
    detail: repairLegacyText(item?.detail || ""),
    license: repairLegacyText(item?.license || ""),
    sourceUrl: item?.sourceUrl || item?.apiUrl || "",
    importedAt: item?.importedAt || new Date().toISOString(),
    temporalCoverage: {
      label: repairLegacyText(item?.temporalCoverage?.label || "gegenwärtig / aktuell"),
      from: item?.temporalCoverage?.from || "",
      to: item?.temporalCoverage?.to || "",
    },
    display: {
      visible: item?.display?.visible !== false,
      color: item?.display && Object.prototype.hasOwnProperty.call(item.display, "color") ? item.display.color : DEFAULT_LAYER_FILL_COLOR,
      outlineColor: item?.display && Object.prototype.hasOwnProperty.call(item.display, "outlineColor")
        ? item.display.outlineColor
        : item?.display?.strokeColor || DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: item?.geometryRef || null,
    boundarySet: item?.boundarySet || null,
    locked: item?.locked === true,
  };
}

function createLibrarySubfolder(title = "Neuer Unterordner", id = "") {
  return {
    id: id || `subfolder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: repairLegacyText(title || "Neuer Unterordner"),
    items: [],
  };
}

function normalizeLibrarySubfolder(subfolder) {
  return {
    id: subfolder?.id || `subfolder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: repairLegacyText(subfolder?.title || "Unbenannter Unterordner"),
    items: Array.isArray(subfolder?.items) ? subfolder.items.map(normalizeLibraryItem) : [],
  };
}

function normalizeLibraryFolders(folders) {
  const defaults = createDefaultLibraryFolders();
  const incoming = Array.isArray(folders) ? folders : [];
  return defaults.map((folder) => {
    const existing = incoming.find((candidate) => candidate?.type === folder.type || candidate?.id === folder.id) || {};
    let items = Array.isArray(existing.items)
      ? existing.items.map(normalizeLibraryItem)
      : (folder.items || []).map(normalizeLibraryItem);
    if (folder.type === "continental-maps") {
      [createDefaultContinentalMapItem(), createOsmTopographicMapItem()].map(normalizeLibraryItem).forEach((defaultItem) => {
        const existingDefault = items.find((item) => item.id === defaultItem.id);
        if (existingDefault) {
          Object.assign(existingDefault, {
            kind: defaultItem.kind,
            source: existingDefault.source || defaultItem.source,
            adminLevel: existingDefault.adminLevel || defaultItem.adminLevel,
            detail: existingDefault.detail || defaultItem.detail,
            license: existingDefault.license || defaultItem.license,
            sourceUrl: existingDefault.sourceUrl || defaultItem.sourceUrl,
            temporalCoverage: existingDefault.temporalCoverage || defaultItem.temporalCoverage,
            geometryRef: existingDefault.geometryRef || defaultItem.geometryRef,
            locked: true,
          });
        } else {
          items = [...items, defaultItem];
        }
      });
    }
    return {
      ...folder,
      ...existing,
      title: folder.type === "boundary-maps" && ["Länderkarten", "Einzelkarten"].includes(repairLegacyText(existing.title))
        ? "einfache Karten"
        : folder.type === "boundary-collections" && ["Kartensammlungen", "Sammlungen"].includes(repairLegacyText(existing.title))
          ? "komplexe Karten"
        : repairLegacyText(existing.title || folder.title),
      description: repairLegacyText(existing.description || folder.description),
      items,
      subfolders: Array.isArray(existing.subfolders)
        ? existing.subfolders.map(normalizeLibrarySubfolder)
        : (folder.subfolders || []).map(normalizeLibrarySubfolder),
    };
  });
}

function normalizeDataLayer(layer) {
  const title = repairLegacyText(layer?.title || layer?.name || "Statistischer Datenlayer");
  return {
    id: layer?.id || `data-layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: layer?.kind || "gearbox-data-layer",
    origin: layer?.origin || "csv",
    title,
    name: title,
    importedAt: layer?.importedAt || new Date().toISOString(),
    schema: layer?.schema || "ziselin-earthmap-data-layer-v1",
    gearBox: layer?.gearBox || null,
    table: {
      format: layer?.table?.format || "csv",
      delimiter: layer?.table?.delimiter || ";",
      hasHeader: layer?.table?.hasHeader !== false,
      headers: Array.isArray(layer?.table?.headers) ? layer.table.headers.map(repairLegacyText) : [],
      rows: Array.isArray(layer?.table?.rows) ? layer.table.rows : [],
      raw: String(layer?.table?.raw || ""),
    },
    valueMatches: Array.isArray(layer?.valueMatches) ? layer.valueMatches : [],
    visible: layer?.visible !== false,
    matchPreview: layer?.matchPreview || null,
  };
}

function sanitizeDataLayerForStorage(layer) {
  const normalized = normalizeDataLayer(layer);
  return {
    ...normalized,
    // Statistiklayer speichern die Tabelle, Join-Regeln und Darstellungslogik.
    // Die Geometrie wird beim Rendern aus dem Boundary-Archiv rekonstruiert;
    // sonst bläht ein Datenimport den Projektindex unnötig auf und kann
    // localStorage sprengen.
    valueMatches: (normalized.valueMatches || []).map((match) => {
      const { feature, ...storedMatch } = match || {};
      return storedMatch;
    }),
  };
}

function sanitizeProjectForStorage(project) {
  return {
    ...project,
    dataLayers: Array.isArray(project?.dataLayers)
      ? project.dataLayers.map(sanitizeDataLayerForStorage)
      : [],
  };
}

function normalizeProject(project) {
  const normalized = {
    ...createEarthMapProject(project?.title || "Earth-Map-Projekt"),
    ...project,
    boundarySets: Array.isArray(project?.boundarySets) && project.boundarySets.length ? project.boundarySets : createDefaultBoundarySets(),
    libraryFolders: normalizeLibraryFolders(project?.libraryFolders),
  };
  normalized.title = repairLegacyText(normalized.title);
  normalized.iconName = normalizeProjectIconName(normalized.iconName || "mdi:folder");
  normalized.iconColor = normalizeColorValue(normalized.iconColor, "#9a6419") || "#9a6419";
  const legacyContinentalMap = getLibraryFolder(normalized, "continental-maps")?.items?.find((item) => (
    item.id === "continental-natural-earth-10m-land" || item.geometryRef?.dataset === "land"
  ));
  normalized.displaySettings = normalizeProjectDisplaySettings(normalized, legacyContinentalMap);
  normalized.boundarySets = normalized.boundarySets.map((boundarySet) => ({
    ...boundarySet,
    label: repairLegacyText(boundarySet.label),
    detailStrategy: (boundarySet.detailStrategy || []).map((level) => ({
      ...level,
      label: repairLegacyText(level.label),
      use: repairLegacyText(level.use),
    })),
  }));
  normalized.activeBoundarySetId = normalized.activeBoundarySetId || normalized.boundarySets[0]?.id || "";
  normalized.activeLibraryItemId = String(normalized.activeLibraryItemId || "");
  normalized.dataLayers = Array.isArray(normalized.dataLayers) ? normalized.dataLayers.map(normalizeDataLayer) : [];
  normalized.naturalEarthOverrides = normalized.naturalEarthOverrides && typeof normalized.naturalEarthOverrides === "object"
    ? normalized.naturalEarthOverrides
    : {};
  return normalized;
}

function isGeneratedStartProject(project) {
  const boundaryMaps = getLibraryFolder(project, "boundary-maps")?.items || [];
  const hasLayers = Array.isArray(project?.dataLayers) && project.dataLayers.length > 0;
  // Migrationsregel: Frühere Builds haben die neutrale Start-Erde als echtes
  // Projekt "Weltkarte · Grundmodell" gespeichert. Diese Ansicht ist aber nur
  // der leere App-Zustand und darf nicht als Nutzerdatensatz weiterleben.
  return project?.title === "Weltkarte · Grundmodell" && !hasLayers && boundaryMaps.length === 0;
}

function loadProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed?.projects)) {
      const projects = parsed.projects.map(normalizeProject).filter((project) => !isGeneratedStartProject(project));
      if (projects.length !== parsed.projects.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
      }
      // Eine bewusst gespeicherte leere Projektliste ist ein gültiger Zustand:
      // Sie bedeutet "neutrale Start-Erde". In diesem Fall darf der alte
      // GlobeMap-Legacy-Speicher keine gelöschten Projekte wiederbeleben.
      return projects;
    }
    const legacyParsed = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacyParsed?.projects) && legacyParsed.projects.length) {
      const projects = legacyParsed.projects.map(normalizeProject).filter((project) => !isGeneratedStartProject(project));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
      return projects;
    }
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gelesen werden.", error);
  }
  return [];
}

function loadActiveProjectId(projects) {
  try {
    const stored = localStorage.getItem(ACTIVE_PROJECT_STORAGE_KEY);
    if (stored === "") return "";
    if (stored && projects.some((project) => project.id === stored)) return stored;
  } catch {
    // Ohne localStorage fällt EarthMap auf die neutrale Startansicht zurück.
  }
  return "";
}

function createInitialCollapsedBrowserNodeIds(projects) {
  // Browserregel: Beim Start oder Refresh beginnt die Projektbibliothek
  // aufgeräumt. Die geöffneten Baumzustände sind reine Sitzungsgesten und
  // werden bewusst nicht dauerhaft gespeichert.
  return (projects || []).flatMap((project) => {
    const folderNodes = (project.libraryFolders || []).map((folder) => `${folder.type}:${project.id}`);
    const typedSubfolderNodes = (project.libraryFolders || []).flatMap((folder) => (
      (folder.subfolders || []).map((subfolder) => `subfolder:${project.id}:${folder.type}:${subfolder.id}`)
    ));
    const projectSubfolderIds = new Set((project.libraryFolders || [])
      .filter((folder) => folder.type === "boundary-maps" || folder.type === "boundary-collections")
      .flatMap((folder) => (folder.subfolders || []).map((subfolder) => subfolder.id)));
    const projectSubfolderNodes = [...projectSubfolderIds].map((id) => `subfolder:${project.id}:project-layers:${id}`);
    return [
      `project:${project.id}`,
      ...folderNodes,
      ...typedSubfolderNodes,
      ...projectSubfolderNodes,
    ];
  });
}

function loadViewSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(VIEW_SETTINGS_STORAGE_KEY) || "{}");
    return {
      showGraticule: parsed.showGraticule === true,
      showAdmin1Boundaries: parsed.showAdmin1Boundaries === true,
      mapProjectionMode: parsed.mapProjectionMode === MAP_PROJECTION_FLAT ? MAP_PROJECTION_FLAT : MAP_PROJECTION_GLOBE,
    };
  } catch {
    return { showGraticule: false, showAdmin1Boundaries: false, mapProjectionMode: MAP_PROJECTION_GLOBE };
  }
}

function persistViewSettings() {
  try {
    localStorage.setItem(VIEW_SETTINGS_STORAGE_KEY, JSON.stringify({
      showGraticule: state.showGraticule === true,
      showAdmin1Boundaries: state.showAdmin1Boundaries === true,
      mapProjectionMode: state.mapProjectionMode === MAP_PROJECTION_FLAT ? MAP_PROJECTION_FLAT : MAP_PROJECTION_GLOBE,
    }));
  } catch (error) {
    console.warn("EarthMap-Ansichtseinstellungen konnten nicht gespeichert werden.", error);
  }
}

const state = {
  projects: loadProjects(),
  ...loadViewSettings(),
  activeProjectId: "",
  openProjectBrowserMenuId: null,
  openFolderBrowserMenuId: null,
  openLayerBrowserMenuId: null,
  draggedLibraryItem: null,
  browserActionsMenuOpen: false,
  collapsedBrowserNodeIds: [],
  expandedArchiveNodeIds: [],
  detailsLayoutMode: "normal",
  detailsLayoutStep: 0,
  pendingBoundarySetImport: null,
  gearBoxModeAction: null,
  gearBoxWorkSource: "create",
  gearBoxDraft: null,
  gearBoxPromptRequest: "",
  gearBoxPromptAdminLevel: "ADM0",
  gearBoxPromptScope: "",
  gearBoxGeneratedPrompt: "",
  gearBoxPromptCopied: false,
  editorMode: "tool",
  activeEditorTab: "background",
  statisticLayerActiveTab: "properties",
  previousToolEditorTab: "background",
  activeEditorItemId: "",
  activeEditorChapterKey: "",
  activeSubfolderRef: null,
  activeArchiveItem: null,
  viewToolsDrawerOpen: false,
  boundarySetFeatureCache: new Map(),
  loadingBoundarySetIds: new Set(),
  mapSearchHighlight: null,
  naturalEarthAdmin0EngineIndex: null,
  naturalEarthAdmin0EngineChunkCache: new Map(),
  naturalEarthAdmin0EngineChunkPromises: new Map(),
  naturalEarthAdmin1EngineIndex: null,
  naturalEarthAdmin1Dataset: null,
  naturalEarthAdmin1Loading: false,
  naturalEarthAdmin1Error: "",
  naturalEarthAdmin1CountryChunkCache: new Map(),
  naturalEarthAdmin1CountryChunkPromises: new Map(),
  naturalEarthAdmin1LineChunkCache: new Map(),
  naturalEarthAdmin1LineChunkPromises: new Map(),
  naturalEarthAdmin1BoundaryLoading: false,
  naturalEarthAdmin1BoundaryLoaded: false,
  naturalEarthAdmin1BoundaryError: "",
  naturalEarthAdmin0BoundaryRings: null,
  naturalEarthAdmin1BoundaryRings: null,
  naturalEarthAdmin0BoundaryPreparing: false,
  naturalEarthAdmin1BoundaryPreparing: false,
  backgroundTaskQueue: [],
  backgroundTaskRunning: false,
  backgroundTaskSerial: 0,
  heavyMapLayerWorkEnabled: false,
  heavyMapLayerWorkTimer: 0,
  naturalEarthLakePolygons: null,
  naturalEarthLakeRings: null,
  naturalEarthLakePreparing: false,
  naturalEarthEnclosedSeaPolygons: null,
  naturalEarthEnclosedSeaRings: null,
  naturalEarthEnclosedSeaPreparing: false,
};

state.activeProjectId = loadActiveProjectId(state.projects);
state.collapsedBrowserNodeIds = createInitialCollapsedBrowserNodeIds(state.projects);
const PROJECT_DELETE_HOLD_MS = 820;
let projectDeleteHoldState = null;
let layerDeleteHoldState = null;

function persistProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects.map(sanitizeProjectForStorage) }));
    localStorage.setItem(ACTIVE_PROJECT_STORAGE_KEY, state.activeProjectId || "");
    return true;
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gespeichert werden.", error);
    return false;
  }
}

function openEarthMapArchiveDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB ist in diesem Browser nicht verfügbar."));
      return;
    }
    const request = window.indexedDB.open(EARTHMAP_ARCHIVE_DB_NAME, EARTHMAP_ARCHIVE_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(EARTHMAP_BOUNDARY_FEATURE_STORE)) {
        db.createObjectStore(EARTHMAP_BOUNDARY_FEATURE_STORE, { keyPath: "id" });
      }
    };
    request.onerror = () => reject(request.error || new Error("EarthMap-Archiv konnte nicht geöffnet werden."));
    request.onsuccess = () => resolve(request.result);
  });
}

async function saveBoundarySetFeaturesToArchive(boundarySet) {
  const features = Array.isArray(boundarySet?.features) ? boundarySet.features : [];
  if (!boundarySet?.id || !features.length) return null;
  const db = await openEarthMapArchiveDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(EARTHMAP_BOUNDARY_FEATURE_STORE, "readwrite");
    const store = transaction.objectStore(EARTHMAP_BOUNDARY_FEATURE_STORE);
    store.put({
      id: boundarySet.id,
      features,
      updatedAt: new Date().toISOString(),
    });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Geometrien konnten nicht im EarthMap-Archiv gespeichert werden."));
    transaction.onabort = () => reject(transaction.error || new Error("Geometriespeicherung wurde abgebrochen."));
  });
  db.close();
  state.boundarySetFeatureCache.set(boundarySet.id, features);
  return {
    provider: "indexeddb",
    database: EARTHMAP_ARCHIVE_DB_NAME,
    store: EARTHMAP_BOUNDARY_FEATURE_STORE,
    key: boundarySet.id,
    featureCount: features.length,
    storedAt: new Date().toISOString(),
  };
}

async function loadBoundarySetFeaturesFromArchive(key) {
  if (!key) return [];
  const db = await openEarthMapArchiveDb();
  const record = await new Promise((resolve, reject) => {
    const transaction = db.transaction(EARTHMAP_BOUNDARY_FEATURE_STORE, "readonly");
    const request = transaction.objectStore(EARTHMAP_BOUNDARY_FEATURE_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error("Geometrien konnten nicht aus dem EarthMap-Archiv gelesen werden."));
  });
  db.close();
  return Array.isArray(record?.features) ? record.features : [];
}

async function ensureArchivedBoundarySetFeatures(item) {
  const storage = item?.boundarySet?.geometryStorage;
  const key = storage?.key || item?.boundarySet?.id || "";
  if (storage?.provider !== "indexeddb" || !key) return [];
  const cached = state.boundarySetFeatureCache.get(key);
  if (cached?.length) return cached;
  const features = await loadBoundarySetFeaturesFromArchive(key);
  state.boundarySetFeatureCache.set(key, features);
  return features;
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || null;
}

function getActiveBoundarySet(project = getActiveProject()) {
  return project?.boundarySets?.find((set) => set.id === project.activeBoundarySetId) || project?.boundarySets?.[0] || null;
}

function getLibraryFolder(project, folderType) {
  return project?.libraryFolders?.find((folder) => folder.type === folderType) || null;
}

function getActiveLibraryItem(project = getActiveProject()) {
  if (state.editorMode === "archive-object") return state.activeArchiveItem || null;
  const activeId = project?.activeLibraryItemId || "";
  if (!activeId) return null;
  const dataLayer = (project?.dataLayers || []).find((candidate) => candidate.id === activeId);
  if (dataLayer) return dataLayer;
  for (const folder of project.libraryFolders || []) {
    const item = folder.items?.find((candidate) => candidate.id === activeId);
    if (item) return item;
    for (const subfolder of folder.subfolders || []) {
      const nestedItem = subfolder.items?.find((candidate) => candidate.id === activeId);
      if (nestedItem) return nestedItem;
    }
  }
  return null;
}

function getLibraryFolderItems(folder) {
  const directItems = Array.isArray(folder?.items) ? folder.items : [];
  const nestedItems = (folder?.subfolders || []).flatMap((subfolder) => (
    Array.isArray(subfolder.items) ? subfolder.items : []
  ));
  return [...directItems, ...nestedItems];
}

function getAllProjectLibraryItems(project = getActiveProject()) {
  return (project?.libraryFolders || []).flatMap((folder) => getLibraryFolderItems(folder));
}

function findLibraryItemLocation(project, itemId) {
  if (!project || !itemId) return null;
  const dataLayerIndex = (project.dataLayers || []).findIndex((layer) => layer.id === itemId);
  if (dataLayerIndex >= 0) {
    return {
      project,
      folder: { type: "data-layers", title: "Statistik" },
      subfolder: null,
      items: project.dataLayers,
      index: dataLayerIndex,
      item: project.dataLayers[dataLayerIndex],
    };
  }
  for (const folder of project.libraryFolders || []) {
    const directIndex = (folder.items || []).findIndex((item) => item.id === itemId);
    if (directIndex >= 0) {
      return {
        project,
        folder,
        subfolder: null,
        items: folder.items,
        index: directIndex,
        item: folder.items[directIndex],
      };
    }
    for (const subfolder of folder.subfolders || []) {
      const nestedIndex = (subfolder.items || []).findIndex((item) => item.id === itemId);
      if (nestedIndex >= 0) {
        return {
          project,
          folder,
          subfolder,
          items: subfolder.items,
          index: nestedIndex,
          item: subfolder.items[nestedIndex],
        };
      }
    }
  }
  return null;
}

function isBrowserNodeCollapsed(nodeId) {
  return state.collapsedBrowserNodeIds.includes(nodeId);
}

function toggleBrowserNode(nodeId) {
  const collapsed = new Set(state.collapsedBrowserNodeIds);
  if (collapsed.has(nodeId)) collapsed.delete(nodeId);
  else collapsed.add(nodeId);
  state.collapsedBrowserNodeIds = [...collapsed];
  renderProjectBrowser();
}

function isArchiveBrowserNodeCollapsed(nodeId) {
  return !state.expandedArchiveNodeIds.includes(nodeId);
}

function toggleArchiveBrowserNode(nodeId) {
  const expanded = new Set(state.expandedArchiveNodeIds);
  if (expanded.has(nodeId)) expanded.delete(nodeId);
  else expanded.add(nodeId);
  state.expandedArchiveNodeIds = [...expanded];
  renderProjectBrowser();
  if (expanded.has(nodeId) && nodeId.includes(":admin1:")) {
    loadNaturalEarthAdmin1Dataset();
  }
}

function getVisibleBoundaryMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-maps");
  return getLibraryFolderItems(folder).filter((item) => item.display?.visible !== false);
}

function getVisibleBoundaryCollectionItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-collections");
  return getLibraryFolderItems(folder).filter((item) => item.display?.visible !== false);
}

function getVisibleProjectBoundaryItems(project = getActiveProject()) {
  return [
    ...getVisibleBoundaryMapItems(project),
    ...getVisibleBoundaryCollectionItems(project),
  ];
}

function getContinentalMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "continental-maps");
  return getLibraryFolderItems(folder);
}

function normalizeContinentalMapId(value) {
  if (value === "natural-earth-10m") return DEFAULT_CONTINENTAL_MAP_ID;
  if (value === "osm-topographic-unlabeled") return OSM_TOPOGRAPHIC_MAP_ID;
  if (value === "none") return "none";
  return value || DEFAULT_CONTINENTAL_MAP_ID;
}

function getContinentalMapChoices(project = getActiveProject()) {
  return [
    { value: "none", label: "Keine Grundkarte" },
    ...getContinentalMapItems(project).map((item) => ({
      value: item.id,
      label: item.name || item.id,
    })),
  ];
}

function getSelectedContinentalMapOption(project = getActiveProject()) {
  const selectedId = normalizeContinentalMapId(project?.displaySettings?.continentalMapId || DEFAULT_CONTINENTAL_MAP_ID);
  const item = getContinentalMapItems(project).find((candidate) => candidate.id === selectedId);
  if (item) {
    return {
      value: item.id,
      label: item.name,
      detail: [item.source, item.detail, item.license].filter(Boolean).join(" · "),
      renderable: item.id === DEFAULT_CONTINENTAL_MAP_ID || item.id === OSM_TOPOGRAPHIC_MAP_ID,
    };
  }
  return CONTINENTAL_MAP_OPTIONS.find((option) => option.value === selectedId)
    || CONTINENTAL_MAP_OPTIONS.find((option) => option.value === DEFAULT_CONTINENTAL_MAP_ID)
    || CONTINENTAL_MAP_OPTIONS[0];
}

function shouldRenderContinentalBaseMap(project = getActiveProject()) {
  // Architekturregel: Die neutrale Start-Erde bleibt sichtbar, solange noch kein
  // Projekt geladen ist. Sobald ein Projekt aktiv ist, steuert dessen
  // Darstellungseigenschaft die Grundkarte; sie ist kein Browserobjekt mehr.
  if (!project) return true;
  const option = getSelectedContinentalMapOption(project);
  return [DEFAULT_CONTINENTAL_MAP_ID, OSM_TOPOGRAPHIC_MAP_ID].includes(option?.value) && option.renderable !== false;
}

function getActiveContinentalMapId(project = getActiveProject()) {
  if (!project) return DEFAULT_CONTINENTAL_MAP_ID;
  return getSelectedContinentalMapOption(project)?.value || DEFAULT_CONTINENTAL_MAP_ID;
}

function isOsmTopographicBaseMap(project = getActiveProject()) {
  return getActiveContinentalMapId(project) === OSM_TOPOGRAPHIC_MAP_ID;
}

function getContinentalRenderStyle(project = getActiveProject()) {
  const dark = document.body.classList.contains("earthmap-theme-dark");
  if (isOsmTopographicBaseMap(project)) {
    return dark
      ? {
        sea: DARK_MAP_WATER_COLOR,
        land: DARK_MAP_UNSELECTED_COLOR,
        outline: DARK_MAP_COASTLINE_COLOR,
        contour: "rgba(102,102,102,.26)",
        shade: "rgba(0,0,0,.035)",
      }
      : {
        sea: "#eef2ef",
        land: "#e8e2ce",
        outline: "rgba(95,104,98,.46)",
        contour: "rgba(155,132,82,.24)",
        shade: "rgba(82,92,86,.08)",
      };
  }
  return {
    sea: dark ? DARK_MAP_WATER_COLOR : getThemeMapColor("--sea", "#fbfbf8"),
    land: dark ? DARK_MAP_UNSELECTED_COLOR : getThemeMapColor("--land", "#c4c4c0"),
    outline: dark ? DARK_MAP_COASTLINE_COLOR : getThemeMapColor("--land-outline", "rgba(92,96,94,.46)"),
    contour: "",
    shade: "",
  };
}

function getNaturalEarthCountryFeatureByIso3(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  const features = getNaturalEarthCountryDataset().features;
  return features.find((feature) => getNaturalEarthIso3(feature).toUpperCase() === normalizedIso3) || null;
}

function loadEarthMapScriptAsset(key, src, isReady) {
  if (typeof isReady === "function" && isReady()) return Promise.resolve(true);
  if (earthMapLazyAssetPromises.has(key)) return earthMapLazyAssetPromises.get(key);
  const promise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(typeof isReady === "function" ? Boolean(isReady()) : true);
    script.onerror = () => {
      console.warn(`EarthMap-Asset konnte nicht geladen werden: ${src}`);
      resolve(false);
    };
    document.head.appendChild(script);
  }).finally(() => {
    if (typeof isReady === "function" && !isReady()) earthMapLazyAssetPromises.delete(key);
  });
  earthMapLazyAssetPromises.set(key, promise);
  return promise;
}

function runWhenIdle(callback, timeout = 1800) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    window.setTimeout(callback, Math.min(timeout, 900));
  }
}

function waitForNextFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
}

function waitForEarthMapIdle(timeout = 1200) {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(resolve, { timeout });
    } else {
      window.setTimeout(resolve, Math.min(timeout, 120));
    }
  });
}

function pauseEarthMapBackgroundTasks() {
  state.backgroundTaskSerial += 1;
}

function queueEarthMapBackgroundTask(label, task, options = {}) {
  if (typeof task !== "function") return;
  const key = options.key || label;
  if (key && state.backgroundTaskQueue.some((entry) => entry.key === key)) return;
  state.backgroundTaskQueue.push({
    key,
    label,
    task,
    priority: Number(options.priority) || 0,
  });
  state.backgroundTaskQueue.sort((a, b) => b.priority - a.priority);
  runEarthMapBackgroundTaskQueue();
}

function runEarthMapBackgroundTaskQueue() {
  if (state.backgroundTaskRunning) return;
  if (!state.backgroundTaskQueue.length) return;
  state.backgroundTaskRunning = true;
  const serial = state.backgroundTaskSerial;
  const runNext = async () => {
    if (serial !== state.backgroundTaskSerial || isNavigatingGlobe) {
      state.backgroundTaskRunning = false;
      if (state.backgroundTaskQueue.length) {
        runWhenIdle(runEarthMapBackgroundTaskQueue, 900);
      }
      return;
    }
    const entry = state.backgroundTaskQueue.shift();
    if (!entry) {
      state.backgroundTaskRunning = false;
      return;
    }
    const isHeavyDataLayerTask = String(entry.key || "").startsWith("gearbox-");
    if (isHeavyDataLayerTask && isNaturalEarthTileWorkPending()) {
      state.backgroundTaskQueue.push(entry);
      state.backgroundTaskQueue.sort((a, b) => b.priority - a.priority);
      state.backgroundTaskRunning = false;
      runWhenIdle(runEarthMapBackgroundTaskQueue, 900);
      return;
    }
    try {
      await waitForEarthMapIdle(900);
      if (serial !== state.backgroundTaskSerial || isNavigatingGlobe) {
        state.backgroundTaskQueue.unshift(entry);
        state.backgroundTaskRunning = false;
        runWhenIdle(runEarthMapBackgroundTaskQueue, 900);
        return;
      }
      await entry.task({
        yield: () => waitForEarthMapIdle(700),
        shouldPause: () => serial !== state.backgroundTaskSerial
          || isNavigatingGlobe
          || (isHeavyDataLayerTask && isNaturalEarthTileWorkPending()),
      });
    } catch (error) {
      console.warn(`EarthMap-Hintergrundaufgabe fehlgeschlagen: ${entry.label}`, error);
    }
    state.backgroundTaskRunning = false;
    if (state.backgroundTaskQueue.length) runEarthMapBackgroundTaskQueue();
  };
  void runNext();
}

function loadNaturalEarthCountries10m() {
  return loadEarthMapScriptAsset(
    "natural-earth-admin0-countries-10m",
    "../assets/geojson/natural-earth/10m/ne_10m_admin_0_countries.coast-aligned.js?v=20260709b",
    () => Boolean(window.EarthMapNaturalEarthCountries10m?.features?.length),
  ).then(() => {
    mapSearchOptionCache = null;
    return getNaturalEarthCountryDataset();
  });
}

async function loadNaturalEarthAdmin0EngineIndex() {
  if (state.naturalEarthAdmin0EngineIndex?.chunks?.length) return state.naturalEarthAdmin0EngineIndex;
  await loadEarthMapScriptAsset(
    "earthmap-engine-natural-earth-admin0-index",
    `${EARTHMAP_ENGINE_ADMIN0_BASE}index.js?v=20260712a`,
    () => Boolean(window.EarthMapBoundarySetIndexNaturalEarth10mAdmin0?.chunks?.length),
  );
  state.naturalEarthAdmin0EngineIndex = window.EarthMapBoundarySetIndexNaturalEarth10mAdmin0 || null;
  mapSearchOptionCache = null;
  return state.naturalEarthAdmin0EngineIndex;
}

function getNaturalEarthAdmin0EngineIndex() {
  return state.naturalEarthAdmin0EngineIndex || window.EarthMapBoundarySetIndexNaturalEarth10mAdmin0 || null;
}

function getNaturalEarthAdmin0EngineEntryByIso3(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  const index = getNaturalEarthAdmin0EngineIndex();
  return index?.chunks?.find((candidate) => (
    String(candidate.country_iso3 || candidate.provider_boundary_id || "").toUpperCase() === normalizedIso3
  )) || null;
}

function getNaturalEarthAdmin0TitleByIso3(iso3) {
  const entry = getNaturalEarthAdmin0EngineEntryByIso3(iso3);
  if (entry?.title) return repairLegacyText(entry.title);
  const feature = getNaturalEarthCountryFeatureByIso3(iso3);
  return feature ? getNaturalEarthCountryName(feature) : "";
}

function getNaturalEarthAdmin0EngineEntryByArchiveKey(archiveKey) {
  const normalizedKey = String(archiveKey || "");
  if (!normalizedKey) return null;
  const index = getNaturalEarthAdmin0EngineIndex();
  return index?.chunks?.find((candidate) => candidate.stable_id === normalizedKey) || null;
}

function getNaturalEarthAdmin0EngineChunkFromWindow(stableId) {
  return window.EarthMapBoundarySetChunksNaturalEarth10mAdmin0?.[stableId] || null;
}

function getFeatureFromBoundarySetChunk(boundarySet) {
  return Array.isArray(boundarySet?.features) ? boundarySet.features[0] || null : null;
}

function toNaturalEarthAdmin0EngineFeature(boundarySet) {
  const feature = getFeatureFromBoundarySetChunk(boundarySet);
  if (!feature) return null;
  return {
    ...feature,
    properties: {
      ...(feature.properties || {}),
      ISO_A3: boundarySet.country_iso3 || boundarySet.provider_boundary_id || feature.properties?.ISO_A3 || "",
      ISO_A2: boundarySet.country_iso2 || feature.properties?.ISO_A2 || "",
      ADM0_A3: boundarySet.country_iso3 || feature.properties?.ADM0_A3 || "",
      NAME: boundarySet.title || feature.name || feature.properties?.NAME || "",
      NAME_EN: boundarySet.title || feature.properties?.NAME_EN || "",
      WIKIDATAID: boundarySet.wikidata_id || feature.wikidata_id || feature.properties?.WIKIDATAID || "",
      _ziselinBoundarySetStableId: boundarySet.stable_id || "",
      _ziselinEngineSource: "boundary-set-v1-admin0",
    },
  };
}

async function loadNaturalEarthAdmin0EngineChunk(entry) {
  const stableId = String(entry?.stable_id || "");
  if (!stableId) return null;
  if (state.naturalEarthAdmin0EngineChunkCache.has(stableId)) {
    return state.naturalEarthAdmin0EngineChunkCache.get(stableId);
  }
  const existing = getNaturalEarthAdmin0EngineChunkFromWindow(stableId);
  if (existing?.features?.length) {
    state.naturalEarthAdmin0EngineChunkCache.set(stableId, existing);
    return existing;
  }
  if (state.naturalEarthAdmin0EngineChunkPromises.has(stableId)) {
    return state.naturalEarthAdmin0EngineChunkPromises.get(stableId);
  }
  const scriptFile = entry?.scriptFile || "";
  if (!scriptFile) return null;
  const promise = loadEarthMapScriptAsset(
    `earthmap-engine-natural-earth-admin0-chunk-${stableId}`,
    `${EARTHMAP_ENGINE_ADMIN0_BASE}${scriptFile}?v=${entry.bytes || "1"}`,
    () => Boolean(getNaturalEarthAdmin0EngineChunkFromWindow(stableId)?.features?.length),
  )
    .then(() => {
      const chunk = getNaturalEarthAdmin0EngineChunkFromWindow(stableId);
      if (chunk?.features?.length) state.naturalEarthAdmin0EngineChunkCache.set(stableId, chunk);
      return chunk || null;
    })
    .finally(() => {
      state.naturalEarthAdmin0EngineChunkPromises.delete(stableId);
    });
  state.naturalEarthAdmin0EngineChunkPromises.set(stableId, promise);
  return promise;
}

async function loadNaturalEarthAdmin0EngineFeature(entry) {
  const chunk = await loadNaturalEarthAdmin0EngineChunk(entry);
  return toNaturalEarthAdmin0EngineFeature(chunk);
}

function getLoadedNaturalEarthAdmin0EngineFeatures() {
  return [...state.naturalEarthAdmin0EngineChunkCache.values()]
    .map(toNaturalEarthAdmin0EngineFeature)
    .filter(Boolean);
}

function requestNaturalEarthAdmin0EngineFeatureByIso3(iso3) {
  const entry = getNaturalEarthAdmin0EngineEntryByIso3(iso3);
  if (!entry) return;
  void loadNaturalEarthAdmin0EngineFeature(entry).then((feature) => {
    if (!feature) return;
    boundaryFeatureRenderCache.clear();
    boundaryFeatureVectorPathCache.clear();
    scheduleGlobeRender();
  });
}

function loadNaturalEarthAdmin0BoundaryLayer() {
  return loadEarthMapScriptAsset(
    "natural-earth-admin0-boundaries-10m",
    "../assets/geojson/natural-earth/10m/ne_10m_admin_0_countries.coastless.boundaries.js?v=20260709c",
    () => Boolean(window.EarthMapNaturalEarthAdmin0Boundaries10m?.features?.length),
  ).then(() => {
    state.naturalEarthAdmin0BoundaryRings = null;
    state.naturalEarthAdmin0BoundaryPreparing = false;
    scheduleGlobeRender();
  });
}

function loadNaturalEarthLakesLayer() {
  return loadEarthMapScriptAsset(
    "natural-earth-lakes-10m",
    "../assets/geojson/natural-earth/10m/ne_10m_lakes.js?v=20260709a",
    () => Boolean(window.EarthMapNaturalEarthLakes10m?.features?.length),
  ).then(() => {
    state.naturalEarthLakePolygons = null;
    state.naturalEarthLakeRings = null;
    state.naturalEarthLakePreparing = false;
    scheduleGlobeRender();
  });
}

function scheduleNaturalEarthBackgroundAssets() {
  // Performance-Regel: Mobile Geräte bekommen zuerst eine interaktive Kugel.
  // Schwere Natural-Earth-Zusatzdaten werden in Ruhephasen nachgeladen und
  // dürfen den ersten Paint nicht blockieren. Explizite Such- und Archivaktionen
  // rufen dieselben Loader sofort ab.
  runWhenIdle(() => { void loadNaturalEarthAdmin0EngineIndex().then(() => renderProjectBrowser()); }, 1200);
  runWhenIdle(() => { void loadNaturalEarthAdmin1Dataset().then(() => renderProjectBrowser()); }, 1700);
  runWhenIdle(() => { void loadNaturalEarthAdmin0BoundaryLayer(); }, 2200);
  runWhenIdle(() => { void loadNaturalEarthLakesLayer(); }, 2600);
}

async function ensureNaturalEarthSearchBaseLoaded() {
  if (getNaturalEarthAdmin0EngineIndex()?.chunks?.length || window.EarthMapNaturalEarthCountries10m?.features?.length) return;
  beginWikidataMapSearchLoading();
  try {
    await loadNaturalEarthAdmin0EngineIndex();
  } finally {
    endWikidataMapSearchLoading();
  }
}

function getNaturalEarthCountryDataset() {
  const engineIndex = getNaturalEarthAdmin0EngineIndex();
  if (engineIndex?.chunks?.length) {
    return {
      detail: "10m",
      label: "10m · Engine Boundary-Set-v1 · Admin-0",
      sourceUrl: `${EARTHMAP_ENGINE_ADMIN0_BASE}index.json`,
      features: getLoadedNaturalEarthAdmin0EngineFeatures(),
      index: engineIndex,
    };
  }
  const tenMeter = window.EarthMapNaturalEarthCountries10m;
  if (tenMeter?.features?.length) {
    return {
      detail: "10m",
      label: "10m · Natural-Earth-Admin-0 · küstenausgerichtet",
      sourceUrl: `${NATURAL_EARTH_ASSET_BASE}10m/ne_10m_admin_0_countries.coast-aligned.geojson`,
      features: tenMeter.features,
    };
  }
  const fallback = window.EarthMapNaturalEarthCountries;
  return {
    detail: "110m",
    label: "110m · Natural-Earth-Fallback",
    sourceUrl: `${NATURAL_EARTH_ASSET_BASE}110m/ne_110m_admin_0_countries.geojson`,
    features: fallback?.features || [],
  };
}

async function loadNaturalEarthAdmin1Dataset() {
  if (state.naturalEarthAdmin1Dataset) return;
  if (state.naturalEarthAdmin1Loading) {
    await earthMapLazyAssetPromises.get("earthmap-engine-natural-earth-admin1-index");
  }
  state.naturalEarthAdmin1Loading = true;
  state.naturalEarthAdmin1Error = "";
  renderProjectBrowser();
  await loadNaturalEarthAdmin1EngineIndex();
  state.naturalEarthAdmin1Loading = false;
  const index = getNaturalEarthAdmin1EngineIndex();
  if (index?.feature_index?.length) {
    state.naturalEarthAdmin1Dataset = {
      detail: "10m",
      label: "10m · Engine Boundary-Set-v1 · Admin-1",
      sourceUrl: `${EARTHMAP_ENGINE_ADMIN1_BASE}index.json`,
      features: index.feature_index.map(toNaturalEarthAdmin1EngineMetadataFeature),
      index,
    };
    state.naturalEarthAdmin1Error = "";
    renderProjectBrowser();
    return;
  }
  state.naturalEarthAdmin1Error = "Gliedstaaten / Provinzen konnten nicht geladen werden.";
  renderProjectBrowser();
}

function getNaturalEarthAdmin1MetadataFeatures() {
  return state.naturalEarthAdmin1Dataset?.features
    || window.EarthMapNaturalEarthAdmin1Metadata10m?.features
    || [];
}

async function loadNaturalEarthAdmin1EngineIndex() {
  if (state.naturalEarthAdmin1EngineIndex?.chunks?.length) return state.naturalEarthAdmin1EngineIndex;
  await loadEarthMapScriptAsset(
    "earthmap-engine-natural-earth-admin1-index",
    `${EARTHMAP_ENGINE_ADMIN1_BASE}index.js?v=20260712a`,
    () => Boolean(window.EarthMapBoundarySetIndexNaturalEarth10mAdmin1?.chunks?.length),
  );
  state.naturalEarthAdmin1EngineIndex = window.EarthMapBoundarySetIndexNaturalEarth10mAdmin1 || null;
  mapSearchOptionCache = null;
  return state.naturalEarthAdmin1EngineIndex;
}

function getNaturalEarthAdmin1EngineIndex() {
  return state.naturalEarthAdmin1EngineIndex || window.EarthMapBoundarySetIndexNaturalEarth10mAdmin1 || null;
}

function toNaturalEarthAdmin1EngineMetadataFeature(entry = {}) {
  return {
    type: "Feature",
    id: entry.stable_id,
    stable_id: entry.stable_id,
    version_id: entry.version_id,
    name: repairLegacyText(entry.title || entry.provider_boundary_id || "Unbenannte Region"),
    wikidata_id: normalizeWikidataId(entry.wikidata_id || ""),
    match_tokens: entry.match_keys || [],
    bbox: entry.bbox,
    properties: {
      name: repairLegacyText(entry.title || ""),
      name_de: repairLegacyText(entry.title || ""),
      name_en: repairLegacyText(entry.title || ""),
      iso_3166_2: entry.iso_3166_2 || "",
      adm1_code: entry.adm1_code || "",
      wikidataid: entry.wikidata_id || "",
      adm0_a3: entry.country_iso3 || "",
      sov_a3: entry.country_iso3 || "",
      admin: getNaturalEarthAdmin0TitleByIso3(entry.country_iso3) || entry.country_iso3 || "",
      geonunit: getNaturalEarthAdmin0TitleByIso3(entry.country_iso3) || entry.country_iso3 || "",
      type: "Gliedstaat / Provinz",
      type_en: "Admin-1",
    },
  };
}

async function ensureNaturalEarthAdmin1ChunkIndexLoaded() {
  await loadNaturalEarthAdmin1EngineIndex();
}

function getNaturalEarthAdmin1ChunkIndexEntry(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  if (!normalizedIso) return null;
  const engineEntry = (getNaturalEarthAdmin1EngineIndex()?.chunks || [])
    .find((chunk) => String(chunk.country_iso3 || chunk.iso3 || "").toUpperCase() === normalizedIso);
  if (engineEntry) return engineEntry;
  return (window.EarthMapNaturalEarthAdmin1ChunkIndex10m?.chunks || [])
    .find((chunk) => String(chunk.iso3 || "").toUpperCase() === normalizedIso) || null;
}

function getNaturalEarthAdmin1FeatureIndexEntry(archiveKey) {
  const normalizedKey = String(archiveKey || "");
  if (!normalizedKey) return null;
  return (getNaturalEarthAdmin1EngineIndex()?.feature_index || [])
    .find((entry) => entry.stable_id === normalizedKey || entry.version_id === normalizedKey) || null;
}

function getNaturalEarthAdmin1ChunkFromWindow(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  return window.EarthMapBoundarySetChunksNaturalEarth10mAdmin1?.[normalizedIso]
    || window.EarthMapNaturalEarthAdmin1CountryChunks10m?.[normalizedIso]
    || null;
}

function getNaturalEarthAdmin1LineChunkFromWindow(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  return window.EarthMapBoundarySetLineChunksNaturalEarth10mAdmin1?.[normalizedIso] || null;
}

function toNaturalEarthAdmin1ChunkDataset(iso3, data, sourceUrl) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  return {
    detail: "10m",
    label: `10m · Natural-Earth-Admin-1 · ${normalizedIso}`,
    sourceUrl,
    features: Array.isArray(data?.features) ? data.features : [],
  };
}

function toNaturalEarthAdmin1LineChunkDataset(iso3, data, sourceUrl) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  return {
    detail: "10m",
    label: `10m · Natural-Earth-Admin-1-Linien · ${normalizedIso}`,
    sourceUrl,
    features: Array.isArray(data?.features) ? data.features : [],
  };
}

function loadNaturalEarthAdmin1CountryChunkScript(iso3, entry) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  const scriptFile = entry?.scriptFile || String(entry?.file || "").replace(/\.geojson$/i, ".js").replace("admin1-by-country/", "admin1-by-country-js/");
  const basePath = entry?.stable_id || entry?.country_iso3 ? EARTHMAP_ENGINE_ADMIN1_BASE : `${NATURAL_EARTH_ASSET_BASE}10m/`;
  if (!normalizedIso || !scriptFile) return Promise.resolve({ type: "FeatureCollection", features: [] });
  const existing = getNaturalEarthAdmin1ChunkFromWindow(normalizedIso);
  if (existing?.features?.length) {
    return Promise.resolve(toNaturalEarthAdmin1ChunkDataset(normalizedIso, existing, `${basePath}${scriptFile}`));
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `${basePath}${scriptFile}?v=${entry?.bytes || "1"}`;
    script.async = true;
    script.onload = () => {
      const data = getNaturalEarthAdmin1ChunkFromWindow(normalizedIso);
      resolve(toNaturalEarthAdmin1ChunkDataset(normalizedIso, data, script.src));
    };
    script.onerror = () => {
      console.warn(`Natural-Earth-Admin-1-Script-Chunk ${normalizedIso} konnte nicht geladen werden.`);
      resolve({ type: "FeatureCollection", features: [] });
    };
    document.head.appendChild(script);
  });
}

function loadNaturalEarthAdmin1LineChunkScript(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  if (!normalizedIso) return Promise.resolve({ type: "FeatureCollection", features: [] });
  const scriptFile = `lines-js/natural-earth-10m-admin1-lines-${normalizedIso.toLowerCase()}.js`;
  const sourceUrl = `${EARTHMAP_ENGINE_ADMIN1_BASE}${scriptFile}`;
  const existing = getNaturalEarthAdmin1LineChunkFromWindow(normalizedIso);
  if (existing?.features?.length) {
    return Promise.resolve(toNaturalEarthAdmin1LineChunkDataset(normalizedIso, existing, sourceUrl));
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `${sourceUrl}?v=20260714a`;
    script.async = true;
    script.onload = () => {
      const data = getNaturalEarthAdmin1LineChunkFromWindow(normalizedIso);
      resolve(toNaturalEarthAdmin1LineChunkDataset(normalizedIso, data, script.src));
    };
    script.onerror = () => {
      console.warn(`Natural-Earth-Admin-1-Linienchunk ${normalizedIso} konnte nicht geladen werden.`);
      resolve({ type: "FeatureCollection", features: [] });
    };
    document.head.appendChild(script);
  });
}

async function loadNaturalEarthAdmin1CountryChunk(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  if (!normalizedIso) return { type: "FeatureCollection", features: [] };
  if (state.naturalEarthAdmin1CountryChunkCache.has(normalizedIso)) {
    return state.naturalEarthAdmin1CountryChunkCache.get(normalizedIso);
  }
  if (state.naturalEarthAdmin1CountryChunkPromises.has(normalizedIso)) {
    return state.naturalEarthAdmin1CountryChunkPromises.get(normalizedIso);
  }

  await ensureNaturalEarthAdmin1ChunkIndexLoaded();
  const entry = getNaturalEarthAdmin1ChunkIndexEntry(normalizedIso);
  if (!entry) return { type: "FeatureCollection", features: [] };
  // Online-Regel: Admin-1-Geometrien werden nicht mehr als globaler 38-MB-
  // Block geladen. Metadata bleibt global, echte Geometrie kommt pro ISO-3-
  // Chunk nach Bedarf. Das hält GitHub-Dateien klein und Suchinteraktionen
  // online performant. App-/Dateikontexte können fetch() auf lokalen GeoJSON-
  // Dateien blockieren; darum gibt es darunter denselben Chunk zusätzlich als
  // Script-Fallback. So bleibt die Suche nach "Texas; Vereinigte Staaten"
  // genauso zuverlässig wie die schon per Script geladenen Grundkarten.
  const basePath = entry?.stable_id || entry?.country_iso3 ? EARTHMAP_ENGINE_ADMIN1_BASE : `${NATURAL_EARTH_ASSET_BASE}10m/`;
  const promise = fetch(`${basePath}${entry.file}`, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const dataset = toNaturalEarthAdmin1ChunkDataset(normalizedIso, data, `${basePath}${entry.file}`);
      state.naturalEarthAdmin1CountryChunkCache.set(normalizedIso, dataset);
      return dataset;
    })
    .catch(async (error) => {
      console.warn(`Natural-Earth-Admin-1-GeoJSON-Chunk ${normalizedIso} konnte nicht geladen werden, versuche Script-Fallback.`, error);
      const dataset = await loadNaturalEarthAdmin1CountryChunkScript(normalizedIso, entry);
      if (dataset.features?.length) state.naturalEarthAdmin1CountryChunkCache.set(normalizedIso, dataset);
      return dataset;
    })
    .finally(() => {
      state.naturalEarthAdmin1CountryChunkPromises.delete(normalizedIso);
    });
  state.naturalEarthAdmin1CountryChunkPromises.set(normalizedIso, promise);
  return promise;
}

async function loadNaturalEarthAdmin1LineChunk(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  if (!normalizedIso) return { type: "FeatureCollection", features: [] };
  if (state.naturalEarthAdmin1LineChunkCache.has(normalizedIso)) {
    return state.naturalEarthAdmin1LineChunkCache.get(normalizedIso);
  }
  if (state.naturalEarthAdmin1LineChunkPromises.has(normalizedIso)) {
    return state.naturalEarthAdmin1LineChunkPromises.get(normalizedIso);
  }
  // Die ADM1-Grenzlinien werden engine-seitig vorbereitet. Der Renderer soll
  // nicht mehr aus jedem Polygonlauf Segmente ableiten und zusammenstitching
  // betreiben; das war langsam und erzeugte die fragmentarischen Linienbilder.
  // Polygone bleiben separat erhalten, weil Suche, Statistik und Eigenschaften
  // weiterhin die vollständigen Flächen und Metadaten brauchen.
  const promise = loadNaturalEarthAdmin1LineChunkScript(normalizedIso)
    .then((dataset) => {
      if (dataset.features?.length) state.naturalEarthAdmin1LineChunkCache.set(normalizedIso, dataset);
      return dataset;
    })
    .finally(() => {
      state.naturalEarthAdmin1LineChunkPromises.delete(normalizedIso);
    });
  state.naturalEarthAdmin1LineChunkPromises.set(normalizedIso, promise);
  return promise;
}

function requestNaturalEarthAdmin1BoundaryLayerForZoom() {
  if (globeZoom < NATURAL_EARTH_ADMIN1_BOUNDARY_LOAD_ZOOM) return;
  if (state.naturalEarthAdmin1BoundaryLoaded || state.naturalEarthAdmin1BoundaryLoading) return;
  if (isNavigatingGlobe) return;

  state.naturalEarthAdmin1BoundaryLoading = true;
  state.naturalEarthAdmin1BoundaryError = "";
  const script = document.createElement("script");
  script.src = "../assets/geojson/natural-earth/10m/ne_10m_admin_1_states_provinces.coastless.boundaries.js?v=20260709c";
  script.async = true;
  script.onload = () => {
    state.naturalEarthAdmin1BoundaryLoading = false;
    state.naturalEarthAdmin1BoundaryLoaded = Boolean(window.EarthMapNaturalEarthAdmin1Boundaries10m?.features?.length);
    state.naturalEarthAdmin1BoundaryRings = null;
    state.naturalEarthAdmin1BoundaryPreparing = false;
    scheduleGlobeRender();
  };
  script.onerror = () => {
    state.naturalEarthAdmin1BoundaryLoading = false;
    state.naturalEarthAdmin1BoundaryError = "Gliedstaaten / Provinzen konnten nicht als Kartenlayer geladen werden.";
    console.warn(state.naturalEarthAdmin1BoundaryError);
  };

  const appendScript = () => {
    if (globeZoom < NATURAL_EARTH_ADMIN1_BOUNDARY_LOAD_ZOOM || isNavigatingGlobe) {
      state.naturalEarthAdmin1BoundaryLoading = false;
      scheduleGlobeRender();
      return;
    }
    document.head.appendChild(script);
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(appendScript, { timeout: 1800 });
  } else {
    window.setTimeout(appendScript, 900);
  }
}

function getSquaredDistanceToSegment(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) {
    const px = point[0] - start[0];
    const py = point[1] - start[1];
    return px * px + py * py;
  }
  const t = clamp(((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy), 0, 1);
  const projected = [start[0] + t * dx, start[1] + t * dy];
  const px = point[0] - projected[0];
  const py = point[1] - projected[1];
  return px * px + py * py;
}

function simplifyOpenLine(points, toleranceSquared, startIndex = 0, endIndex = points.length - 1, keep = new Set([0, points.length - 1])) {
  if (endIndex <= startIndex + 1) return keep;
  let maxDistance = 0;
  let splitIndex = -1;
  for (let index = startIndex + 1; index < endIndex; index += 1) {
    const distance = getSquaredDistanceToSegment(points[index], points[startIndex], points[endIndex]);
    if (distance > maxDistance) {
      maxDistance = distance;
      splitIndex = index;
    }
  }
  if (maxDistance > toleranceSquared && splitIndex > -1) {
    keep.add(splitIndex);
    simplifyOpenLine(points, toleranceSquared, startIndex, splitIndex, keep);
    simplifyOpenLine(points, toleranceSquared, splitIndex, endIndex, keep);
  }
  return keep;
}

function simplifyClosedRing(ring, tolerance) {
  const source = (ring || []).filter((point) => Number.isFinite(point?.[0]) && Number.isFinite(point?.[1]));
  if (source.length < 4 || tolerance <= 0) return source;
  const open = source.slice(0, -1);
  if (open.length < 3) return source;
  const keep = simplifyOpenLine(open, tolerance * tolerance);
  const simplified = [...keep].sort((a, b) => a - b).map((index) => open[index]);
  if (simplified.length < 3) return [];
  simplified.push(simplified[0]);
  return simplified;
}

function simplifyBoundaryFeatureForZoom(feature, detail) {
  if (!feature || detail !== "10m") return feature;
  const tolerance = Math.max(0.0001, getNaturalEarth10mDetailThreshold() * 0.7);
  const iso3 = getNaturalEarthIso3(feature) || feature.properties?.NAME || "unknown";
  const cacheKey = `${iso3}|${tolerance.toFixed(5)}`;
  if (boundaryFeatureRenderCache.has(cacheKey)) return boundaryFeatureRenderCache.get(cacheKey);
  if (boundaryFeatureRenderCache.size > 180) boundaryFeatureRenderCache.clear();

  // Renderregel: Natural-Earth-Länder verwenden den 10m-Masterdatensatz und
  // werden erst zur Anzeige vereinfacht. Dadurch bleiben Quellen-/Layerdaten
  // bibliotheksfähig, während die sichtbare Vektordichte denselben Zoomtakt
  // nutzt wie die Küstenlinien.
  const simplifyPolygon = (polygon) => (polygon || [])
    .map((ring) => simplifyClosedRing(ring, tolerance))
    .filter((ring) => ring.length >= 4);
  const geometry = feature.geometry?.type === "Polygon"
    ? { type: "Polygon", coordinates: simplifyPolygon(feature.geometry.coordinates) }
    : feature.geometry?.type === "MultiPolygon"
      ? { type: "MultiPolygon", coordinates: (feature.geometry.coordinates || []).map(simplifyPolygon).filter((polygon) => polygon.length) }
      : feature.geometry;
  const simplified = { ...feature, geometry };
  boundaryFeatureRenderCache.set(cacheKey, simplified);
  return simplified;
}

function getRenderableBoundaryFeature(item) {
  const provider = item?.geometryRef?.provider || "";
  if (provider !== "natural-earth" && item?.source !== "Natural Earth") return null;
  const dataset = getNaturalEarthCountryDataset();
  const iso3 = item.geometryRef?.iso3 || item.iso3;
  const feature = getNaturalEarthCountryFeatureByIso3(iso3);
  if (!feature && dataset.index?.chunks?.length) {
    requestNaturalEarthAdmin0EngineFeatureByIso3(iso3);
  }
  return simplifyBoundaryFeatureForZoom(feature, dataset.detail);
}

function normalizeBoundarySetFeaturesForRender(features) {
  return (features || [])
    .map((feature) => ({
      type: "Feature",
      properties: {
        ...(feature.properties || {}),
        ziselin_id: feature.id,
        name: feature.name,
        wikidata_id: feature.wikidata_id || "",
      },
      geometry: feature.geometry,
    }))
    .filter((feature) => feature.geometry);
}

function requestArchivedBoundarySetFeatures(item) {
  const storage = item?.boundarySet?.geometryStorage;
  const key = storage?.key || item?.boundarySet?.id || "";
  if (storage?.provider !== "indexeddb" || !key || state.loadingBoundarySetIds.has(key)) return;
  state.loadingBoundarySetIds.add(key);
  loadBoundarySetFeaturesFromArchive(key)
    .then((features) => {
      state.boundarySetFeatureCache.set(key, features);
      renderObjectEditor();
      renderGlobe();
    })
    .catch((error) => {
      console.warn("Archivierte EarthMap-Geometrien konnten nicht geladen werden.", error);
    })
    .finally(() => {
      state.loadingBoundarySetIds.delete(key);
    });
}

function getRenderableBoundaryFeatures(item) {
  if (item?.boundarySet?.features?.length) {
    return normalizeBoundarySetFeaturesForRender(item.boundarySet.features);
  }
  const archiveKey = item?.boundarySet?.geometryStorage?.key;
  if (archiveKey) {
    const cached = state.boundarySetFeatureCache.get(archiveKey);
    if (cached?.length) return normalizeBoundarySetFeaturesForRender(cached);
    requestArchivedBoundarySetFeatures(item);
    return [];
  }
  const feature = getRenderableBoundaryFeature(item);
  return feature ? [feature] : [];
}

function hexToRgba(hex, alpha = 1) {
  const value = String(hex || "").trim();
  const match = value.match(/^#?([0-9a-f]{6})$/i);
  if (!match) return `rgba(198,168,106,${alpha})`;
  const intValue = Number.parseInt(match[1], 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  return `rgba(${red},${green},${blue},${alpha})`;
}

function normalizeColorValue(value, fallback = "") {
  const raw = String(value || "").trim();
  const short = raw.match(/^#?([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1].split("").map((char) => `${char}${char}`).join("")}`.toLowerCase();
  }
  const full = raw.match(/^#?([0-9a-f]{6})$/i);
  if (full) return `#${full[1].toLowerCase()}`;
  // Farbwerte aus Karten-/Statistikmetadaten kommen gelegentlich als
  // achtstelliger RGBA-Hexcode. Canvas-Füllungen dieser App arbeiten zentral
  // mit RGB plus separatem Alpha; darum wird hier nur der RGB-Anteil
  // normalisiert, statt den Wert später als ungültig zu verwerfen.
  const rgba = raw.match(/^#?([0-9a-f]{6})[0-9a-f]{2}$/i);
  if (rgba) return `#${rgba[1].toLowerCase()}`;
  return fallback;
}

function isEarthMapDarkMode() {
  return document.body.classList.contains("earthmap-theme-dark");
}

function getMapLayerFillColor(value) {
  const color = normalizeColorValue(value, "");
  if (!isEarthMapDarkMode()) return color;
  if (!color || color.toLowerCase() === DEFAULT_LAYER_FILL_COLOR.toLowerCase()) return DARK_MAP_SELECTED_COLOR;
  return color;
}

function getMapBoundaryColor(value) {
  const color = normalizeColorValue(value, "");
  if (!isEarthMapDarkMode()) return color;
  if (!color || color.toLowerCase() === DEFAULT_LAYER_OUTLINE_COLOR.toLowerCase()) return DARK_MAP_BOUNDARY_COLOR;
  return color;
}

function normalizeWikidataId(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const match = raw.match(/(?:^|\/)(Q\d+)(?:$|[/?#])/i) || raw.match(/\bQ\d+\b/i);
  return match ? match[1].toUpperCase() : raw.toUpperCase();
}

function normalizeProjectIconName(value) {
  const raw = String(value || "").trim();
  return /^[a-z0-9-]+:[a-z0-9-]+$/i.test(raw) ? raw.toLowerCase() : "mdi:folder";
}

function getIconifyPreviewUrl(iconName, color = "#9a6419", size = 24) {
  const normalizedName = normalizeProjectIconName(iconName);
  const [prefix, ...nameParts] = normalizedName.split(":");
  const iconPath = nameParts.join(":");
  const normalizedColor = encodeURIComponent(normalizeColorValue(color, "#9a6419") || "#9a6419");
  return `https://api.iconify.design/${encodeURIComponent(prefix)}/${encodeURIComponent(iconPath)}.svg?height=${size}&color=${normalizedColor}`;
}

function isNeutralPaletteColor(color) {
  const normalized = normalizeColorValue(color);
  if (!normalized) return true;
  const intValue = Number.parseInt(normalized.slice(1), 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
  const isBlackish = red <= 20 && green <= 20 && blue <= 20;
  const isWhitish = red >= 235 && green >= 235 && blue >= 235;
  return isBlackish || isWhitish || spread <= 10;
}

function collectProjectPaletteColors(project = getActiveProject(), extraColors = []) {
  const palette = [];
  const seen = new Set();
  const pushColor = (value) => {
    const normalized = normalizeColorValue(value);
    if (!normalized || isNeutralPaletteColor(normalized) || seen.has(normalized)) return;
    seen.add(normalized);
    palette.push(normalized);
  };

  // Farbregel: Earth Map unterscheidet wie TimeMap freie Farbwahl von
  // Projektfarben. Die Palette sammelt deshalb nur Farben, die im aktuellen
  // Projekt bereits semantisch verwendet werden, statt globale Appfarben
  // ungezielt anzubieten.
  pushColor(DEFAULT_LAYER_FILL_COLOR);
  pushColor(DEFAULT_LAYER_OUTLINE_COLOR);
  pushColor(DARK_MAP_SPECIAL_HIGHLIGHT_COLOR);
  (project?.classification?.breaks || []).forEach((entry) => pushColor(entry?.color));
  (project?.libraryFolders || []).forEach((folder) => {
    getLibraryFolderItems(folder).forEach((item) => {
      pushColor(item?.display?.color);
      pushColor(item?.display?.outlineColor);
    });
  });
  (Array.isArray(extraColors) ? extraColors : [extraColors]).forEach(pushColor);
  return palette.slice(0, 12);
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function slugifyFilename(value, fallback = "earth-map") {
  const slug = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setWorkspaceMode(mode) {
  ui.globeApp.classList.toggle("workspace-mode-details", mode === "details");
  ui.globeApp.classList.toggle("workspace-mode-preview", mode !== "details");
  if (mode === "details") setDetailsLayoutMode(state.detailsLayoutMode);
}

function isNarrowDetailsViewport() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function normalizeDetailsLayoutMode(mode) {
  if (isNarrowDetailsViewport()) return mode === "editor" ? "editor" : "browser";
  return ["normal", "browser", "editor"].includes(mode) ? mode : "normal";
}

function setDetailsLayoutMode(mode) {
  const normalizedMode = normalizeDetailsLayoutMode(mode);
  state.detailsLayoutMode = normalizedMode;
  ui.globeApp?.classList.toggle("details-layout-normal", normalizedMode === "normal");
  ui.globeApp?.classList.toggle("details-layout-browser", normalizedMode === "browser");
  ui.globeApp?.classList.toggle("details-layout-editor", normalizedMode === "editor");
}

function cycleDetailsLayoutMode() {
  if (isNarrowDetailsViewport()) {
    setDetailsLayoutMode(state.detailsLayoutMode === "browser" ? "editor" : "browser");
    return;
  }
  const order = ["normal", "browser", "normal", "editor"];
  state.detailsLayoutStep = (state.detailsLayoutStep + 1) % order.length;
  setDetailsLayoutMode(order[state.detailsLayoutStep]);
}

function setBrowserActionsMenuOpen(isOpen) {
  state.browserActionsMenuOpen = Boolean(isOpen);
  if (ui.browserActionsMenu) ui.browserActionsMenu.hidden = !state.browserActionsMenuOpen;
  ui.browserActionsMenuButton?.setAttribute("aria-expanded", state.browserActionsMenuOpen ? "true" : "false");
}

function setMenuOpen(isOpen) {
  if (isOpen) {
    ui.sideMenu.querySelectorAll("details[open]").forEach((details) => {
      details.open = false;
    });
  }
  ui.sideMenu.classList.toggle("is-open", isOpen);
  ui.sideMenu.setAttribute("aria-hidden", String(!isOpen));
  ui.sideMenu.inert = !isOpen;
  ui.menuOverlay.hidden = !isOpen;
  ui.menuButton.setAttribute("aria-expanded", String(isOpen));
}

function setExportMenuOpen(isOpen) {
  if (ui.exportMenu) ui.exportMenu.hidden = !isOpen;
  ui.exportProjectButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch {
    // Manche eingebettete Browser blockieren Vollbild; die UI bleibt dann einfach unverändert.
  }
}

function updateFullscreenButtonState() {
  ui.fullscreenButton?.classList.toggle("is-active", Boolean(document.fullscreenElement));
}

function setViewToolsDrawerOpen(isOpen) {
  state.viewToolsDrawerOpen = Boolean(isOpen);
  ui.viewToolsDrawer?.classList.toggle("is-open", state.viewToolsDrawerOpen);
  if (ui.viewToolsDrawerPanel) {
    if (viewToolsDrawerCloseTimer) {
      window.clearTimeout(viewToolsDrawerCloseTimer);
      viewToolsDrawerCloseTimer = null;
    }
    ui.viewToolsDrawerPanel.classList.remove("is-closing");
    if (state.viewToolsDrawerOpen) {
      ui.viewToolsDrawerPanel.hidden = false;
    } else if (!ui.viewToolsDrawerPanel.hidden) {
      ui.viewToolsDrawerPanel.classList.add("is-closing");
      viewToolsDrawerCloseTimer = window.setTimeout(() => {
        ui.viewToolsDrawerPanel.hidden = true;
        ui.viewToolsDrawerPanel.classList.remove("is-closing");
        viewToolsDrawerCloseTimer = null;
      }, 190);
    }
  }
  ui.viewToolsDrawerTab?.setAttribute("aria-expanded", state.viewToolsDrawerOpen ? "true" : "false");
}

function syncViewToolsControls() {
  if (ui.projectionToggle) {
    const isFlatMap = state.mapProjectionMode === MAP_PROJECTION_FLAT;
    ui.projectionToggle.setAttribute("aria-pressed", "false");
    ui.projectionToggle.classList.remove("is-active");
    ui.projectionToggle.setAttribute("aria-label", isFlatMap ? "Zur Globusansicht wechseln" : "Zur Kartenansicht wechseln");
    const label = ui.projectionToggle.querySelector(".app-view-drawer-option-label");
    if (label) label.textContent = isFlatMap ? "Globusansicht" : "Kartenansicht";
  }
  ui.graticuleToggle?.setAttribute("aria-pressed", state.showGraticule === true ? "true" : "false");
  ui.graticuleToggle?.classList.toggle("is-active", state.showGraticule === true);
  ui.admin1Toggle?.setAttribute("aria-pressed", state.showAdmin1Boundaries === true ? "true" : "false");
  ui.admin1Toggle?.classList.toggle("is-active", state.showAdmin1Boundaries === true);
}

function applyMapLibreProjection() {
  const map = mapLibreEngineState.map;
  if (!map || typeof map.setProjection !== "function") return;
  // Architekturregel: Theme und Kartenart sind getrennte Zustände. MapLibre
  // setzt beim Stylewechsel die Projektion zurück; deshalb wird die gewünschte
  // Ansicht zentral nach jedem Initial- und Restyle-Vorgang erneut angewendet.
  const projectionType = state.mapProjectionMode === MAP_PROJECTION_FLAT ? "mercator" : "globe";
  try {
    map.setProjection({ type: projectionType });
  } catch (error) {
    mapLibreEngineState.status = projectionType === "globe" ? "ready-no-globe-projection" : "ready-no-map-projection";
    mapLibreEngineState.error = error?.message || String(error);
  }
}

function setMapProjectionMode(mode) {
  state.mapProjectionMode = mode === MAP_PROJECTION_FLAT ? MAP_PROJECTION_FLAT : MAP_PROJECTION_GLOBE;
  syncViewToolsControls();
  persistViewSettings();
  applyMapLibreProjection();
  syncMapLibreCamera();
  renderGlobe();
}

function toggleMapProjectionMode() {
  setMapProjectionMode(state.mapProjectionMode === MAP_PROJECTION_FLAT ? MAP_PROJECTION_GLOBE : MAP_PROJECTION_FLAT);
}

function setGraticuleVisible(isVisible) {
  state.showGraticule = Boolean(isVisible);
  syncViewToolsControls();
  persistViewSettings();
  renderGlobe();
}

function setAdmin1BoundariesVisible(isVisible) {
  state.showAdmin1Boundaries = Boolean(isVisible);
  syncViewToolsControls();
  persistViewSettings();
  syncMapLibreAdmin1Visibility();
  void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
  renderGlobe();
}

function setTheme(theme, persist = true) {
  const isDark = theme === "dark";
  document.body.classList.toggle("earthmap-theme-dark", isDark);
  ui.themeToggleButton?.setAttribute("aria-pressed", isDark ? "true" : "false");
  ui.themeToggleButton?.setAttribute("aria-label", isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren");
  if (ui.themeToggleIcon) {
    ui.themeToggleIcon.src = isDark
      ? "https://api.iconify.design/boxicons/sun-bright.svg?color=%23ffb347"
      : "https://api.iconify.design/material-symbols-light/dark-mode-rounded.svg?color=%23213633";
  }
  if (ui.menuButtonIcon) {
    ui.menuButtonIcon.src = isDark
      ? "https://api.iconify.design/material-symbols/menu.svg?color=%23ffb347"
      : "https://api.iconify.design/material-symbols/menu.svg?color=%23213633";
  }
  syncMapLibreTheme();
  if (ui.globeCanvas) renderGlobe();
  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch (error) {
      console.warn("EarthMap theme preference could not be saved", error);
    }
  }
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

function toggleTheme() {
  setTheme(document.body.classList.contains("earthmap-theme-dark") ? "light" : "dark");
}

function getEarthMapExportTitle() {
  return getActiveProject()?.title || "Earth Map";
}

function getLiveRenderBackgroundColor() {
  let element = ui.globe;
  while (element) {
    const color = window.getComputedStyle(element).backgroundColor;
    if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") return color;
    element = element.parentElement;
  }
  return window.getComputedStyle(document.body).backgroundColor || "#fff";
}

function getEarthMapLivePngBlob() {
  return new Promise((resolve, reject) => {
    const baseCanvas = webglState.ready ? webglState.canvas : ui.globeCanvas;
    if (!baseCanvas?.width || !baseCanvas?.height) {
      reject(new Error("png-export-empty"));
      return;
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = baseCanvas.width;
    exportCanvas.height = baseCanvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    exportCtx.fillStyle = getLiveRenderBackgroundColor();
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // PNG-Regel: PNG ist ein Abbild der aktuellen Live-Ansicht. Bei WebGL
    // besteht diese Ansicht aus zwei Canvas-Ebenen: Kugel/Grundkarte unten und
    // 2D-Annotationen/Suchmarkierungen oben. Beide Ebenen werden hier bewusst
    // zusammengeführt, damit Export und Bildschirmbild deckungsgleich bleiben.
    if (webglState.ready) exportCtx.drawImage(webglState.canvas, 0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(ui.globeCanvas, 0, 0, exportCanvas.width, exportCanvas.height);

    exportCanvas.toBlob((pngBlob) => {
      if (pngBlob) resolve(pngBlob);
      else reject(new Error("png-export-empty"));
    }, "image/png");
  });
}

async function exportEarthMapPng() {
  // PNG-Regel: Anders als der HTML-Export ist PNG ein Abbild der aktuellen
  // Live-Ansicht. Es übernimmt also Zoom, Ausschnitt, Theme-Farben und gerade
  // sichtbare Suchmarkierungen exakt aus dem Renderfenster.
  renderGlobe();
  const blob = await getEarthMapLivePngBlob();
  downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.png`);
}

function cloneCoordinatesForExport(coordinates) {
  if (!Array.isArray(coordinates)) return [];
  if (typeof coordinates[0] === "number") {
    return [Number(coordinates[0]) || 0, Number(coordinates[1]) || 0];
  }
  return coordinates.map(cloneCoordinatesForExport);
}

function cloneGeometryForExport(geometry) {
  if (!geometry || typeof geometry !== "object") return null;
  if (geometry.type === "GeometryCollection") {
    return {
      type: "GeometryCollection",
      geometries: (geometry.geometries || []).map(cloneGeometryForExport).filter(Boolean),
    };
  }
  return {
    type: geometry.type,
    coordinates: cloneCoordinatesForExport(geometry.coordinates),
  };
}

function cloneFeatureForExport(feature) {
  const geometry = cloneGeometryForExport(feature?.geometry || feature);
  return geometry ? { type: "Feature", properties: {}, geometry } : null;
}

function cloneFeatureCollectionForExport(geojson) {
  if (geojson?.type === "FeatureCollection") {
    return {
      type: "FeatureCollection",
      features: (geojson.features || []).map(cloneFeatureForExport).filter(Boolean),
    };
  }
  const feature = cloneFeatureForExport(geojson);
  return { type: "FeatureCollection", features: feature ? [feature] : [] };
}

function cloneFeatureForGeoJsonExport(feature, extraProperties = {}) {
  const geometry = cloneGeometryForExport(feature?.geometry || feature);
  if (!geometry) return null;
  return {
    type: "Feature",
    properties: {
      ...(feature?.properties || {}),
      ...extraProperties,
    },
    geometry,
  };
}

function getGeoJsonExportFeatures(item) {
  if (item?.boundarySet?.features?.length) {
    return item.boundarySet.features
      .map((feature) => ({
        type: "Feature",
        properties: {
          ...(feature.properties || {}),
          ziselin_id: feature.id,
          name: feature.name,
          wikidata_id: feature.wikidata_id || "",
        },
        geometry: feature.geometry,
      }))
      .filter((feature) => feature.geometry);
  }
  const archiveKey = item?.boundarySet?.geometryStorage?.key;
  if (archiveKey && state.boundarySetFeatureCache.has(archiveKey)) {
    return (state.boundarySetFeatureCache.get(archiveKey) || [])
      .map((feature) => ({
        type: "Feature",
        properties: {
          ...(feature.properties || {}),
          ziselin_id: feature.id,
          name: feature.name,
          wikidata_id: feature.wikidata_id || "",
        },
        geometry: feature.geometry,
      }))
      .filter((feature) => feature.geometry);
  }
  const provider = item?.geometryRef?.provider || "";
  if (provider === "natural-earth" || item?.source === "Natural Earth") {
    const feature = getNaturalEarthCountryFeatureByIso3(item.geometryRef?.iso3 || item.iso3);
    return feature ? [feature] : [];
  }
  return getRenderableBoundaryFeatures(item);
}

function getSubfolderItemEntries(project, folderType, subfolderId) {
  if (!project || !subfolderId) return [];
  if (folderType === "project-layers") {
    return getProjectSubfolderItems(project, subfolderId);
  }
  const folder = getLibraryFolder(project, folderType);
  const subfolder = (folder?.subfolders || []).find((candidate) => candidate.id === subfolderId);
  return (subfolder?.items || []).map((item) => ({ item, folderType }));
}

function getHighestResolutionEarthMapExportLand(project) {
  if (!shouldRenderContinentalBaseMap(project)) {
    return { type: "FeatureCollection", features: [] };
  }

  const countries = getNaturalEarthCountryDataset();
  // Exportregel: Die HTML-Publikationsfassung darf nicht vom gerade sichtbaren
  // Tile-/Zoomzustand abhängen. Wenn die 10m-Weltgrundlage geladen ist, wird
  // sie vollständig serialisiert; nur falls sie fehlt, greifen wir auf den
  // interaktiven Arbeitsstand zurück.
  if (countries.detail === "10m" && countries.features?.length) {
    return { type: "FeatureCollection", features: countries.features };
  }

  return getInteractiveNaturalEarthSource()
    || activeNaturalEarthSource
    || { type: "FeatureCollection", features: [] };
}

function getEarthMapSearchExportHighlights() {
  const highlight = state.mapSearchHighlight;
  const selectedFeatures = Array.isArray(highlight?.selectedFeatures)
    ? highlight.selectedFeatures
    : [highlight?.countryFeature].filter(Boolean);
  const focusFeatures = Array.isArray(highlight?.focusFeatures)
    ? highlight.focusFeatures
    : [highlight?.provinceFeature].filter(Boolean);
  const contextColor = getMapSearchSelectedAreaColor();
  const contextOutlineColor = getMapSearchSelectedOutlineColor();
  const focusColor = getMapSearchSpecialHighlightColor();
  const focusOutlineColor = getMapSearchSpecialOutlineColor();

  // Exportregel: Suchmarkierungen sind kein gespeicherter Projektlayer, gehören
  // aber zum aktuellen Darstellungszustand. Für den HTML-Export werden sie
  // deshalb separat serialisiert und im Minimalviewer über den Projektkarten
  // gezeichnet.
  return [
    ...selectedFeatures.map((feature, index) => {
      const featureCollection = cloneFeatureCollectionForExport(feature);
      return {
        role: "context",
        fillMode: index > 0 ? "diagonal-hatch" : "solid",
        color: contextColor,
        outlineColor: contextOutlineColor,
        feature: featureCollection,
        samples: createLandSamples(extractLandRings(featureCollection), 0.55),
      };
    }),
    ...focusFeatures.map((feature) => {
      const featureCollection = cloneFeatureCollectionForExport(feature);
      return {
        role: "focus",
        fillMode: "solid",
        color: focusColor,
        outlineColor: focusOutlineColor,
        feature: featureCollection,
        samples: createLandSamples(extractLandRings(featureCollection), 0.55),
      };
    }),
  ].filter((entry) => entry.feature?.features?.length);
}

function getEarthMapWaterFeatureCollectionForExport() {
  const features = [
    ...(window.EarthMapNaturalEarthLakes10m?.features || []),
    ...(window.EarthMapNaturalEarthEnclosedSeas10m?.features || []),
  ];
  return { type: "FeatureCollection", features };
}

function buildSubfolderGeoJsonExport(project, folderType, subfolder) {
  const folder = folderType === "project-layers"
    ? { type: "project-layers", title: "Projektkarten" }
    : getLibraryFolder(project, folderType);
  const entries = getSubfolderItemEntries(project, folderType, subfolder?.id);
  const features = [];

  // Exportregel: Unterordner werden als Standard-GeoJSON exportiert. Ziselin-
  // Metadaten werden vorerst in properties geschrieben, damit GIS-Tools die
  // Datei direkt öffnen können. Welche fachlichen Attribute dauerhaft in den
  // Export gehören, schärfen wir später am Boundary-Set-Standard nach.
  entries.forEach(({ item, folderType: itemFolderType }, itemIndex) => {
    const classification = item.boundarySet || item.classification || {};
    getGeoJsonExportFeatures(item).forEach((feature, featureIndex) => {
      const cloned = cloneFeatureForGeoJsonExport(feature, {
        ziselin_project_id: project.id,
        ziselin_project_title: project.title,
        ziselin_subfolder_id: subfolder.id,
        ziselin_subfolder_title: subfolder.title,
        ziselin_folder_type: itemFolderType || folderType,
        ziselin_folder_title: getLibraryFolder(project, itemFolderType || folderType)?.title || folder.title || "",
        ziselin_layer_id: item.id,
        ziselin_layer_name: item.name,
        ziselin_layer_source: item.source || "",
        ziselin_layer_detail: item.detail || "",
        ziselin_layer_license: item.license || "",
        ziselin_layer_color: item.display?.color || "",
        ziselin_layer_outline_color: item.display?.outlineColor || "",
        ziselin_type: classification.type || "",
        ziselin_rank: classification.rank ?? "",
        ziselin_sovereignty_status: classification.sovereignty_status || "",
        ziselin_constitutional_status: classification.constitutional_status || "",
        ziselin_relation_to_parent: classification.relation_to_parent || "",
        ziselin_parent_id: classification.parent_id || "",
        ziselin_geometry_scope: classification.geometry_scope || "",
        ziselin_item_index: itemIndex,
        ziselin_feature_index: featureIndex,
      });
      if (cloned) features.push(cloned);
    });
  });

  return {
    type: "FeatureCollection",
    name: subfolder?.title || "Unterordner",
    properties: {
      ziselin_schema: "earthmap-subfolder-export-v1",
      exported_at: new Date().toISOString(),
      project_id: project.id,
      project_title: project.title,
      folder_type: folderType,
      folder_title: folder?.title || "",
      subfolder_id: subfolder?.id || "",
      subfolder_title: subfolder?.title || "",
      layer_count: entries.length,
      feature_count: features.length,
    },
    features,
  };
}

async function exportLibrarySubfolder(project, folderType, subfolder) {
  const entries = getSubfolderItemEntries(project, folderType, subfolder?.id);
  await Promise.all(entries.map(({ item }) => ensureArchivedBoundarySetFeatures(item)));
  const geojson = buildSubfolderGeoJsonExport(project, folderType, subfolder);
  if (!geojson.features.length) {
    window.alert("Der Unterordner enthält keine exportierbaren Karten.");
    return;
  }
  const filename = `${slugifyFilename(project?.title, "earth-map")}-${slugifyFilename(subfolder?.title, "unterordner")}.geojson`;
  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: "application/geo+json;charset=utf-8" });
  downloadBlob(blob, filename);
}

function getEarthMapHtmlExportState() {
  const project = getActiveProject();
  // Exportregel: Das HTML ist ein eigenständiger, interaktiver Minimalviewer.
  // Auch hier gilt die 10m-Masterregel: Exportiert wird die höchste verfügbare
  // vollständige Weltgrundlage, nicht nur der im Editor gerade geladene Ausschnitt.
  const land = getHighestResolutionEarthMapExportLand(project);
  const landRings = extractLandRings(land);
  const layers = getVisibleProjectBoundaryItems(project).map((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return null;
    const layerFeature = cloneFeatureCollectionForExport({ type: "FeatureCollection", features });
    return {
      id: item.id,
      name: item.name,
      color: normalizeColorValue(item.display?.color, ""),
      outlineColor: normalizeColorValue(item.display?.outlineColor, ""),
      feature: layerFeature,
      samples: createLandSamples(extractLandRings(layerFeature), 0.55),
    };
  }).filter((layer) => layer?.feature);

  return {
    land: cloneFeatureCollectionForExport(land),
    water: cloneFeatureCollectionForExport(getEarthMapWaterFeatureCollectionForExport()),
    landSamples: createLandSamples(landRings, 1.15),
    layers,
    searchHighlights: getEarthMapSearchExportHighlights(),
    rotation: { ...rotation },
    zoom: 1,
  };
}

function buildEarthMapHtmlExport() {
  let stateJson = "";
  try {
    stateJson = JSON.stringify(getEarthMapHtmlExportState()).replace(/</g, "\\u003c");
  } catch (error) {
    console.error("Earth Map export state could not be serialized", error);
    stateJson = JSON.stringify({
      land: { type: "FeatureCollection", features: [] },
      water: { type: "FeatureCollection", features: [] },
      landSamples: [],
      layers: [],
      searchHighlights: [],
      rotation: { ...rotation },
      zoom: 1,
    });
  }
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Earth Map</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #fff; }
    body { cursor: grab; }
    body.is-dragging { cursor: grabbing; }
    canvas { display: block; width: 100vw; height: 100vh; background: #fff; touch-action: none; }
  </style>
</head>
<body>
  <canvas id="earthMapCanvas" aria-label="Interaktiver Earth-Map-Globus"></canvas>
  <script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
  <script>
  (() => {
    const EXPORT_STATE = ${stateJson};
    const canvas = document.getElementById("earthMapCanvas");
    const ctx = canvas.getContext("2d");
    const DEG = Math.PI / 180;
    const WATER = "#fbfbf8";
    const LAND = "#b8b8b4";
    const LAND_STROKE = "#ffffff";
    const SPHERE_STROKE = "#a9aaa7";
    let rotation = {
      lon: Number(EXPORT_STATE.rotation?.lon) || 0,
      lat: Number(EXPORT_STATE.rotation?.lat) || 0,
    };
    const zoom = 1;
    let drag = null;
    let view = { width: 1, height: 1, radius: 1, cx: 0, cy: 0 };
    let renderFrame = 0;
    let pendingDraftRender = false;

    function colorWithAlpha(hex, alpha) {
      const match = String(hex || "").trim().match(/^#?([0-9a-f]{6})$/i);
      if (!match) return "rgba(198,168,106," + alpha + ")";
      const value = parseInt(match[1], 16);
      return "rgba(" + ((value >> 16) & 255) + "," + ((value >> 8) & 255) + "," + (value & 255) + "," + alpha + ")";
    }

    function rotatePoint(lon, lat) {
      const lambda = (lon + rotation.lon) * DEG;
      const phi = lat * DEG;
      const tilt = rotation.lat * DEG;
      const cosPhi = Math.cos(phi);
      const x = cosPhi * Math.sin(lambda);
      const y = Math.sin(phi) * Math.cos(tilt) - cosPhi * Math.cos(lambda) * Math.sin(tilt);
      const z = Math.sin(phi) * Math.sin(tilt) + cosPhi * Math.cos(lambda) * Math.cos(tilt);
      return { x, y, z };
    }

    function projectPosition(position) {
      const point = rotatePoint(Number(position[0]), Number(position[1]));
      if (point.z <= 0.012) return null;
      return {
        x: view.cx + point.x * view.radius,
        y: view.cy - point.y * view.radius,
      };
    }

    function forEachPolygon(geometry, callback) {
      if (!geometry) return;
      if (geometry.type === "Polygon") {
        callback(geometry.coordinates || []);
      } else if (geometry.type === "MultiPolygon") {
        (geometry.coordinates || []).forEach((polygon) => callback(polygon || []));
      } else if (geometry.type === "GeometryCollection") {
        (geometry.geometries || []).forEach((child) => forEachPolygon(child, callback));
      }
    }

    function drawRing(ring) {
      let hasPoint = false;
      let moved = false;
      let previous = null;
      const maxSegmentLength = view.radius * 0.36;
      for (const position of ring || []) {
        const projected = projectPosition(position);
        if (!projected) {
          moved = false;
          previous = null;
          continue;
        }
        if (previous) {
          const dx = projected.x - previous.x;
          const dy = projected.y - previous.y;
          if (Math.hypot(dx, dy) > maxSegmentLength) {
            moved = false;
          }
        }
        hasPoint = true;
        if (!moved) {
          ctx.moveTo(projected.x, projected.y);
          moved = true;
        } else {
          ctx.lineTo(projected.x, projected.y);
        }
        previous = projected;
      }
      return hasPoint;
    }

    function drawFeatureCollection(geojson, fill, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasShape = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) {
              ctx.closePath();
              hasShape = true;
            }
          }
        });
      }
      if (!hasShape) return;
      ctx.fillStyle = fill;
      ctx.fill("evenodd");
      if (stroke && lineWidth > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    function drawFeatureLines(geojson, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasLine = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) hasLine = true;
          }
        });
      }
      if (!hasLine) return;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    function drawSurfaceSamples(samples, fill, radiusFactor, minRadius) {
      const dotRadius = Math.max(minRadius, view.radius * radiusFactor);
      ctx.fillStyle = fill;
      for (const sample of samples || []) {
        const point = projectPosition([sample.lon, sample.lat]);
        if (!point) continue;
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createD3Projection() {
      if (!window.d3?.geoOrthographic || !window.d3?.geoPath) return null;
      return window.d3.geoOrthographic()
        .translate([view.cx, view.cy])
        .scale(view.radius)
        .rotate([rotation.lon, rotation.lat])
        .clipAngle(90)
        .precision(0.45);
    }

    function drawDiagonalHatchInCurrentClip(color, lineWidth, spacing) {
      const extent = Math.max(view.width, view.height) * 1.6;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      for (let offset = -extent; offset < extent; offset += spacing) {
        ctx.moveTo(view.cx + offset - extent, view.cy + extent);
        ctx.lineTo(view.cx + offset + extent, view.cy - extent);
      }
      ctx.stroke();
    }

    function drawD3Feature(geojson, fill, stroke, lineWidth, options = {}) {
      const projection = createD3Projection();
      if (!projection) return false;
      const path = window.d3.geoPath(projection, ctx);
      ctx.beginPath();
      path(geojson);
      if (options.fillMode === "diagonal-hatch") {
        ctx.fillStyle = options.baseFill || "rgba(255,255,255,.08)";
        ctx.fill("evenodd");
        ctx.save();
        ctx.beginPath();
        path(geojson);
        ctx.clip("evenodd");
        drawDiagonalHatchInCurrentClip(
          options.hatchColor || fill,
          options.hatchLineWidth || 1.25,
          options.hatchSize || 17,
        );
        ctx.restore();
      } else {
        ctx.fillStyle = fill;
        ctx.fill("evenodd");
      }
      if (stroke && lineWidth > 0) {
        ctx.beginPath();
        path(geojson);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      return true;
    }

    function resizeCanvas() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      view.width = width;
      view.height = height;
      view.cx = width / 2;
      view.cy = height / 2;
      view.radius = Math.min(width, height) * 0.47 * zoom;
    }

    function render(draft = false) {
      ctx.clearRect(0, 0, view.width, view.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, view.width, view.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.fillStyle = WATER;
      ctx.fill();
      ctx.clip();
      // Bewegungsregel: Die volle 10m-Geometrie bleibt die Zielfassung. Während
      // des Ziehens rendern wir jedoch eine leichte Vorschau, damit die Rotation
      // unmittelbar der Hand folgt; beim Loslassen wird wieder vollständig gezeichnet.
      if (draft) {
        drawSurfaceSamples(EXPORT_STATE.landSamples, "rgba(184,184,180,.78)", .0068, 1.4);
        for (const layer of EXPORT_STATE.layers || []) {
          drawSurfaceSamples(layer.samples, colorWithAlpha(layer.color, .82), .0058, 1.15);
        }
        for (const highlight of EXPORT_STATE.searchHighlights || []) {
          drawSurfaceSamples(highlight.samples, colorWithAlpha(highlight.color, highlight.role === "focus" ? .86 : .72), .0058, 1.15);
        }
      } else {
        const d3Rendered = drawD3Feature(EXPORT_STATE.land, "rgba(184,184,180,.82)", "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
        if (!d3Rendered) {
          drawSurfaceSamples(EXPORT_STATE.landSamples, "rgba(184,184,180,.78)", .0068, 1.4);
          drawFeatureLines(EXPORT_STATE.land, "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
        }
        for (const layer of EXPORT_STATE.layers || []) {
          const layerRendered = drawD3Feature(layer.feature, colorWithAlpha(layer.color, .78), colorWithAlpha(layer.outlineColor || layer.color, .98), Math.max(.7, view.radius * .0013));
          if (!layerRendered) {
            drawSurfaceSamples(layer.samples, colorWithAlpha(layer.color, .82), .0058, 1.15);
            drawFeatureLines(layer.feature, colorWithAlpha(layer.outlineColor || layer.color, .98), Math.max(.7, view.radius * .0013));
          }
        }
        for (const highlight of EXPORT_STATE.searchHighlights || []) {
          const isFocus = highlight.role === "focus";
          const renderedHighlight = drawD3Feature(
            highlight.feature,
            colorWithAlpha(highlight.color, isFocus ? .74 : .66),
            colorWithAlpha(highlight.outlineColor || highlight.color, isFocus ? .9 : .78),
            Math.max(isFocus ? .82 : .58, view.radius * .0012),
            {
              fillMode: highlight.fillMode,
              baseFill: colorWithAlpha(highlight.color, .16),
              hatchColor: colorWithAlpha(highlight.color, .66),
              hatchLineWidth: 1.25,
              hatchSize: 17,
            },
          );
          if (!renderedHighlight) {
            drawSurfaceSamples(highlight.samples, colorWithAlpha(highlight.color, isFocus ? .86 : .72), .0058, 1.15);
            drawFeatureLines(highlight.feature, colorWithAlpha(highlight.outlineColor || highlight.color, isFocus ? .9 : .78), Math.max(isFocus ? .82 : .58, view.radius * .0012));
          }
        }
        // Layerregel: Wasserflächen sind Teil der physischen Grundkarte. Sie
        // werden nach thematischen Markierungen erneut gezeichnet, damit Länder-
        // und Suchflächen Seen oder Binnenmeere nicht überdecken.
        drawD3Feature(EXPORT_STATE.water, WATER, "rgba(126,130,128,.28)", Math.max(.45, view.radius * .0008));
      }
      const gradient = ctx.createRadialGradient(
        view.cx - view.radius * .38,
        view.cy - view.radius * .42,
        view.radius * .05,
        view.cx,
        view.cy,
        view.radius
      );
      gradient.addColorStop(0, "rgba(255,255,255,.42)");
      gradient.addColorStop(.62, "rgba(255,255,255,.02)");
      gradient.addColorStop(1, "rgba(0,0,0,.10)");
      ctx.fillStyle = gradient;
      ctx.fillRect(view.cx - view.radius, view.cy - view.radius, view.radius * 2, view.radius * 2);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.strokeStyle = SPHERE_STROKE;
      ctx.lineWidth = Math.max(1, view.radius * .002);
      ctx.stroke();
    }

    function requestRender(draft = false) {
      pendingDraftRender = draft;
      if (renderFrame) return;
      renderFrame = window.requestAnimationFrame(() => {
        const shouldDraft = pendingDraftRender;
        renderFrame = 0;
        pendingDraftRender = false;
        render(shouldDraft);
      });
    }

    canvas.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, lon: rotation.lon, lat: rotation.lat };
      document.body.classList.add("is-dragging");
      canvas.setPointerCapture(event.pointerId);
    });
    function getLatitudeLimit() {
      const t = Math.max(0, Math.min(1, (zoom - 1) / 5));
      const eased = 1 - ((1 - t) ** 2);
      return 58 + eased * 31.2;
    }
    canvas.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const sensitivity = 0.42 / Math.sqrt(Math.max(1, zoom));
      const latitudeLimit = getLatitudeLimit();
      rotation.lon = drag.lon - (event.clientX - drag.x) * sensitivity;
      rotation.lat = Math.max(-latitudeLimit, Math.min(latitudeLimit, drag.lat - (event.clientY - drag.y) * sensitivity));
      requestRender(true);
    });
    canvas.addEventListener("pointerup", (event) => {
      drag = null;
      document.body.classList.remove("is-dragging");
      try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
      requestRender(false);
    });
    // Exportregel: Der HTML-Export bleibt drehbar, aber nicht zoombar. So ist
    // die Ansicht als saubere Publikationsfassung stabil und unabhängig von
    // Mausrad- oder Touchpad-Gesten.
    canvas.addEventListener("wheel", (event) => event.preventDefault(), { passive: false });
    window.addEventListener("resize", () => {
      resizeCanvas();
      requestRender(false);
    });
    function renderWhenReady(attempt = 0) {
      resizeCanvas();
      render();
      if (window.d3?.geoOrthographic || attempt >= 30) return;
      window.setTimeout(() => renderWhenReady(attempt + 1), 120);
    }
    renderWhenReady();
  })();
  </script>
</body>
</html>`;
}

async function exportEarthMapHtml() {
  try {
    await Promise.all([
      loadNaturalEarthCountries10m(),
      loadNaturalEarthLakesLayer(),
    ]);
    renderGlobe();
    const blob = new Blob([buildEarthMapHtmlExport()], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.html`);
  } catch (error) {
    console.error("HTML export failed", error);
    window.alert(`HTML-Export fehlgeschlagen: ${error?.message || "unbekannter Fehler"}`);
  }
}

function handleExportFormat(format) {
  setExportMenuOpen(false);
  if (format === "html") {
    exportEarthMapHtml();
  } else if (format === "png") {
    exportEarthMapPng().catch((error) => {
      console.error("PNG export failed", error);
      window.alert("PNG-Export fehlgeschlagen. Bitte versuche es erneut.");
    });
  }
}

const ctx = ui.globeCanvas.getContext("2d");
const DEG = Math.PI / 180;
const hasD3Geo = typeof window.d3?.geoOrthographic === "function" && typeof window.d3?.geoPath === "function";
document.documentElement.dataset.geoEngine = hasD3Geo ? "d3-orthographic" : "canvas-fallback";

// Geodatenregel: Die sichtbare Weltgeometrie kommt nicht aus handgebauten
// Platzhalterpolygonen, sondern aus dem Geometrie-Basisdatensatz des aktiven
// Projekts. Natural Earth ist hier die erste echte moderne Basis. Die
// Renderer-Schicht arbeitet mit Lon/Lat-Ringen und Oberflächenproben; dadurch
// bleibt die Darstellung auf der Kugeloberfläche stabil und kann später auch
// historische oder paläogeografische Grenzräume mit derselben Schnittstelle anzeigen.

const NATURAL_EARTH_LAND_DETAILS = {
  "10m": { key: "10m-land-vector-hierarchy", tileBasePath: `${NATURAL_EARTH_ASSET_BASE}10m/tiles-vector-hierarchy/`, minZoom: 1 },
};

let activeNaturalEarthSource = null;
let pendingNaturalEarthDetail = "";
let activeNaturalEarthTileSignature = "";
let pendingNaturalEarthTileBuildSignature = "";
const pendingNaturalEarthTiles = new Set();
const naturalEarthTileLoadQueue = [];
let naturalEarthTileLoadActiveCount = 0;
const naturalEarthSurfaceCache = {
  signature: "",
  fillRings: [],
  outlineRings: [],
};

const geoState = {
  detailLevel: "10m",
  landRings: [],
  landSamples: [],
  status: "loading",
  samplesReady: false,
  sampleGeneration: 0,
};

const webglState = {
  canvas: document.createElement("canvas"),
  gl: null,
  program: null,
  positionBuffer: null,
  sphereVertexCount: 0,
  mapTexture: null,
  mapTextureSignature: "",
  landMesh: null,
  landLineMesh: null,
  landSignature: "",
  layerMeshes: new Map(),
  layerSignature: "",
  maxTextureSize: 4096,
  ready: false,
};

const mapLibreEngineState = {
  map: null,
  status: "initializing",
  error: "",
  active: false,
  styleLoaded: false,
  lastFrameAt: 0,
  lastDiagnosticsAt: 0,
  lastCameraSyncAt: 0,
  movingFps: 0,
  movingFrameMs: 0,
  lastRenderGapMs: 0,
  frameCount: 0,
  renderPhase: "idle",
  sourceCount: 0,
  layerCount: 0,
  landLayerVisible: false,
  landSourceReady: false,
  coastlineLayerVisible: false,
  coastlineWidth: 0,
  coastlineColor: "",
  landSource: "none",
  landFeatureCount: 0,
  landLoadMs: 0,
  fullLandRequested: false,
  fullLandPending: false,
  fullLandGeoJson: null,
  fullLandPromise: null,
  fullLandLoadMode: "none",
  waterGeoJson: null,
  waterPromise: null,
  waterLayerVisible: false,
  waterSourceReady: false,
  waterFeatureCount: 0,
  waterLoadMs: 0,
  waterLoadMode: "none",
  waterDetail: "none",
  admin0GeoJson: null,
  admin0BoundaryGeoJson: null,
  admin0SpecialBoundaryGeoJson: null,
  admin0Promise: null,
  admin0BoundaryPromise: null,
  admin0LayerVisible: false,
  admin0SourceReady: false,
  admin0BoundarySourceReady: false,
  admin0FeatureCount: 0,
  admin0BoundaryFeatureCount: 0,
  admin0LoadedChunks: 0,
  admin0TotalChunks: 0,
  admin0LoadMs: 0,
  admin1GeoJson: null,
  admin1Iso3: [],
  admin1ViewportIso3: [],
  admin1DemandMode: "none",
  admin1LayerVisible: false,
  admin1SourceReady: false,
  admin1FeatureCount: 0,
  admin1LineFeatureCount: 0,
  admin1LoadMs: 0,
  searchResolveMs: 0,
  searchHighlightFeatures: 0,
  searchHighlightSourceReady: false,
};

function getMapLibreZoomFromGlobeZoom() {
  // Übergangsregel: Die alte Globussteuerung arbeitet mit einem linearen
  // Skalierungsfaktor, MapLibre dagegen mit logarithmischen Zoomstufen. Diese
  // Übersetzung ist bewusst zentralisiert, damit wir den Motorwechsel später
  // kalibrieren können, ohne Eingabelogik und Renderlogik zu vermischen.
  return clamp(Math.log2(Math.max(1, globeZoom)) + 0.65, 0, 17);
}

function getEarthMapMapLibreStyle() {
  const style = getContinentalRenderStyle();
  return {
    version: 8,
    name: "EarthMap MapLibre Pilot",
    sources: {},
    layers: [
      {
        id: "earthmap-water-background",
        type: "background",
        paint: {
          "background-color": style.sea,
        },
      },
    ],
  };
}

function stripGeoJsonAltitudeCoordinates(coordinates) {
  if (!Array.isArray(coordinates)) return coordinates;
  if (typeof coordinates[0] === "number") return coordinates.slice(0, 2);
  return coordinates.map(stripGeoJsonAltitudeCoordinates);
}

function cloneGeoJsonForMapLibre(geojson) {
  return {
    ...geojson,
    features: (geojson?.features || []).map((feature, index) => ({
      ...feature,
      id: feature.id || feature.properties?._earthMapFeatureId || `earthmap-land-${index}`,
      geometry: feature.geometry ? {
        ...feature.geometry,
        coordinates: stripGeoJsonAltitudeCoordinates(feature.geometry.coordinates),
      } : feature.geometry,
      properties: {
        ...(feature.properties || {}),
        stable_id: feature.properties?._earthMapFeatureId || `earthmap-land-${index}`,
      },
    })),
  };
}

function getMapLibrePilotLandDataset(detail = "start") {
  // Pilotregel: Die Engine startet mit einer sehr kleinen Natural-Earth-
  // Startgeometrie und ersetzt sie nachgelagert durch die vollständige
  // 10m-Landfläche. Die Vollgeometrie wird kontrolliert geladen: zuerst als
  // GeoJSON-Datei, bei blockiertem fetch() als Script-Fallback. Erst danach
  // wird sie als MapLibre-Source gesetzt, sodass klar diagnostizierbar bleibt,
  // welche Geometrie wirklich aktiv ist.
  if (detail === "full") {
    if (!mapLibreEngineState.fullLandGeoJson?.features?.length) return null;
    return {
      label: "natural-earth-10m-land",
      geojson: cloneGeoJsonForMapLibre(mapLibreEngineState.fullLandGeoJson),
      featureCount: mapLibreEngineState.fullLandGeoJson.features.length,
    };
  }
  const start = window.EarthMapNaturalEarthTileData?.["10m-land-hierarchy-global-start"] || null;
  if (start?.features?.length) {
    return {
      label: "natural-earth-global-start",
      geojson: cloneGeoJsonForMapLibre(start),
    };
  }
  return null;
}

function loadMapLibrePilotFullLandGeoJson() {
  if (mapLibreEngineState.fullLandGeoJson?.features?.length) {
    return Promise.resolve(mapLibreEngineState.fullLandGeoJson);
  }
  if (mapLibreEngineState.fullLandPromise) return mapLibreEngineState.fullLandPromise;
  const url = "../assets/geojson/natural-earth/10m/ne_10m_land.geojson?v=20260712a";
  mapLibreEngineState.fullLandLoadMode = "fetch";
  mapLibreEngineState.fullLandPromise = fetch(url, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .catch(async (error) => {
      console.warn("Natural-Earth-10m-Land per GeoJSON-URL nicht geladen, versuche Script-Fallback.", error);
      mapLibreEngineState.fullLandLoadMode = "script";
      const loaded = await loadEarthMapScriptAsset(
        "natural-earth-10m-land-script",
        "../assets/geojson/natural-earth/10m/ne_10m_land.js?v=20260712a",
        () => Boolean(window.EarthMapNaturalEarthData?.land10m?.features?.length),
      );
      if (!loaded) throw new Error("Natural-Earth-10m-Land-Script nicht geladen");
      return window.EarthMapNaturalEarthData.land10m;
    })
    .then((geojson) => {
      mapLibreEngineState.fullLandGeoJson = geojson?.features?.length ? geojson : null;
      return mapLibreEngineState.fullLandGeoJson;
    })
    .finally(() => {
      mapLibreEngineState.fullLandPromise = null;
    });
  return mapLibreEngineState.fullLandPromise;
}

function removeMapLibrePilotLandLayer() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  try {
    if (map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID)) map.removeLayer(MAPLIBRE_COASTLINE_LAYER_ID);
    if (map.getLayer(MAPLIBRE_LAND_FILL_LAYER_ID)) map.removeLayer(MAPLIBRE_LAND_FILL_LAYER_ID);
    if (map.getSource(MAPLIBRE_LAND_SOURCE_ID)) map.removeSource(MAPLIBRE_LAND_SOURCE_ID);
  } catch (error) {
    mapLibreEngineState.status = "land-remove-error";
    mapLibreEngineState.error = error?.message || String(error);
  }
}

function removeMapLibrePilotWaterLayer() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  try {
    if (map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID)) map.removeLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID);
    if (map.getLayer(MAPLIBRE_WATER_FILL_LAYER_ID)) map.removeLayer(MAPLIBRE_WATER_FILL_LAYER_ID);
    if (map.getSource(MAPLIBRE_WATER_SOURCE_ID)) map.removeSource(MAPLIBRE_WATER_SOURCE_ID);
  } catch (error) {
    mapLibreEngineState.status = "water-remove-error";
    mapLibreEngineState.error = error?.message || String(error);
  }
}

function removeMapLibrePilotAdmin0Layer() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  try {
    if (map.getLayer(MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID);
    if (map.getLayer(MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID);
    if (map.getLayer(MAPLIBRE_ADMIN0_FILL_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN0_FILL_LAYER_ID);
    if (map.getSource(MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_SOURCE_ID)) map.removeSource(MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_SOURCE_ID);
    if (map.getSource(MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID)) map.removeSource(MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID);
    if (map.getSource(MAPLIBRE_ADMIN0_SOURCE_ID)) map.removeSource(MAPLIBRE_ADMIN0_SOURCE_ID);
  } catch (error) {
    mapLibreEngineState.status = "admin0-remove-error";
    mapLibreEngineState.error = error?.message || String(error);
  }
}

function removeMapLibrePilotAdmin1Layer() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  try {
    if (map.getLayer(MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID);
    if (map.getLayer(MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID);
    if (map.getLayer(MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID);
    if (map.getLayer(MAPLIBRE_ADMIN1_FILL_LAYER_ID)) map.removeLayer(MAPLIBRE_ADMIN1_FILL_LAYER_ID);
    if (map.getSource(MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID)) map.removeSource(MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID);
    if (map.getSource(MAPLIBRE_ADMIN1_SOURCE_ID)) map.removeSource(MAPLIBRE_ADMIN1_SOURCE_ID);
  } catch (error) {
    mapLibreEngineState.status = "admin1-remove-error";
    mapLibreEngineState.error = error?.message || String(error);
  }
  mapLibreEngineState.admin1GeoJson = null;
  mapLibreEngineState.admin1Iso3 = [];
  mapLibreEngineState.admin1ViewportIso3 = [];
  mapLibreEngineState.admin1DemandMode = "none";
  mapLibreEngineState.admin1FeatureCount = 0;
  mapLibreEngineState.admin1LineFeatureCount = 0;
  mapLibreEngineState.admin1SourceReady = false;
  mapLibreEngineState.admin1LayerVisible = false;
}

function getMapLibrePilotWaterGeoJson() {
  if (mapLibreEngineState.waterGeoJson?.features?.length) {
    return cloneGeoJsonForMapLibre(mapLibreEngineState.waterGeoJson);
  }
  return null;
}

function loadMapLibrePilotWaterGeoJson(detail = "full") {
  if (mapLibreEngineState.waterGeoJson?.features?.length && mapLibreEngineState.waterDetail === detail) {
    return Promise.resolve(mapLibreEngineState.waterGeoJson);
  }
  if (mapLibreEngineState.waterPromise) return mapLibreEngineState.waterPromise;
  mapLibreEngineState.waterLoadMode = detail === "major" ? "script-major" : "script";
  const startedAt = performance.now();
  const loaders = [
    loadEarthMapScriptAsset(
      "natural-earth-enclosed-seas-10m",
      "../assets/geojson/natural-earth/10m/ne_10m_enclosed_seas.js?v=20260709a",
      () => Boolean(window.EarthMapNaturalEarthEnclosedSeas10m?.features?.length),
    ),
  ];
  if (detail !== "major") {
    loaders.unshift(loadEarthMapScriptAsset(
      "natural-earth-lakes-10m",
      "../assets/geojson/natural-earth/10m/ne_10m_lakes.js?v=20260709a",
      () => Boolean(window.EarthMapNaturalEarthLakes10m?.features?.length),
    ));
  }
  mapLibreEngineState.waterPromise = Promise.all(loaders)
    .then(() => {
      const features = [
        ...(detail === "major" ? [] : (window.EarthMapNaturalEarthLakes10m?.features || [])),
        ...(window.EarthMapNaturalEarthEnclosedSeas10m?.features || []),
      ];
      mapLibreEngineState.waterGeoJson = {
        type: "FeatureCollection",
        name: detail === "major" ? "natural-earth-10m-major-water" : "natural-earth-10m-water",
        features,
      };
      mapLibreEngineState.waterDetail = detail;
      mapLibreEngineState.waterFeatureCount = features.length;
      mapLibreEngineState.waterLoadMs = performance.now() - startedAt;
      return mapLibreEngineState.waterGeoJson;
    })
    .finally(() => {
      mapLibreEngineState.waterPromise = null;
    });
  return mapLibreEngineState.waterPromise;
}

async function loadMapLibrePilotAdmin0GeoJson() {
  if (mapLibreEngineState.admin0GeoJson?.features?.length) return mapLibreEngineState.admin0GeoJson;
  if (mapLibreEngineState.admin0Promise) return mapLibreEngineState.admin0Promise;
  const startedAt = performance.now();
  mapLibreEngineState.admin0Promise = (async () => {
    const index = await loadNaturalEarthAdmin0EngineIndex();
    const chunks = index?.chunks || [];
    mapLibreEngineState.admin0TotalChunks = chunks.length;
    mapLibreEngineState.admin0LoadedChunks = 0;
    const features = [];
    // Pilotregel: Admin-0 wird hier noch als Gesamt-Source installiert. Das
    // bestätigt Layer-Reihenfolge, Styling und Boundary-Set-Datenfluss. Die
    // produktive Stufe ersetzt diese Source durch MVT/PMTiles-Kacheln.
    for (let indexOffset = 0; indexOffset < chunks.length; indexOffset += 12) {
      const batch = chunks.slice(indexOffset, indexOffset + 12);
      const loaded = await Promise.all(batch.map((entry) => loadNaturalEarthAdmin0EngineFeature(entry)));
      features.push(...loaded.filter(Boolean));
      mapLibreEngineState.admin0LoadedChunks = Math.min(indexOffset + batch.length, chunks.length);
      mapLibreEngineState.admin0FeatureCount = features.length;
      renderMapEngineDiagnostics();
      await waitForNextFrame();
    }
    mapLibreEngineState.admin0GeoJson = {
      type: "FeatureCollection",
      name: "natural-earth-10m-admin0-boundary-set",
      features,
    };
    mapLibreEngineState.admin0FeatureCount = features.length;
    mapLibreEngineState.admin0LoadMs = performance.now() - startedAt;
    return mapLibreEngineState.admin0GeoJson;
  })().finally(() => {
    mapLibreEngineState.admin0Promise = null;
  });
  return mapLibreEngineState.admin0Promise;
}

function loadMapLibrePilotAdmin0BoundaryGeoJson() {
  if (mapLibreEngineState.admin0BoundaryGeoJson?.features?.length) {
    return Promise.resolve(mapLibreEngineState.admin0BoundaryGeoJson);
  }
  if (mapLibreEngineState.admin0BoundaryPromise) return mapLibreEngineState.admin0BoundaryPromise;
  mapLibreEngineState.admin0BoundaryPromise = loadEarthMapScriptAsset(
    "natural-earth-admin0-boundaries-10m",
    "../assets/geojson/natural-earth/10m/ne_10m_admin_0_countries.coastless.boundaries.js?v=20260709c",
    () => Boolean(window.EarthMapNaturalEarthAdmin0Boundaries10m?.features?.length),
  )
    .then(async () => {
      const source = window.EarthMapNaturalEarthAdmin0Boundaries10m || null;
      const baikonurFeature = await loadMapLibreBaikonurAdmin0Feature();
      mapLibreEngineState.admin0SpecialBoundaryGeoJson = baikonurFeature
        ? { type: "FeatureCollection", features: [baikonurFeature] }
        : null;
      mapLibreEngineState.admin0BoundaryGeoJson = source?.features?.length
        ? removeBaikonurSegmentsFromAdmin0Boundaries(source)
        : null;
      mapLibreEngineState.admin0BoundaryFeatureCount = mapLibreEngineState.admin0BoundaryGeoJson?.features?.length || 0;
      return mapLibreEngineState.admin0BoundaryGeoJson;
    })
    .finally(() => {
      mapLibreEngineState.admin0BoundaryPromise = null;
    });
  return mapLibreEngineState.admin0BoundaryPromise;
}

async function loadMapLibreBaikonurAdmin0Feature() {
  try {
    await loadNaturalEarthAdmin0EngineIndex();
    const entry = getNaturalEarthAdmin0EngineEntryByIso3("KAB");
    if (!entry) return null;
    return await loadNaturalEarthAdmin0EngineFeature(entry);
  } catch (error) {
    console.warn("EarthMap-Baikonur-Sondergrenze konnte nicht geladen werden.", error);
    return null;
  }
}

function isCoordinateInsideBbox(coordinate, bbox) {
  if (!Array.isArray(coordinate) || coordinate.length < 2) return false;
  const lon = Number(coordinate[0]);
  const lat = Number(coordinate[1]);
  return Number.isFinite(lon)
    && Number.isFinite(lat)
    && lon >= bbox[0]
    && lon <= bbox[2]
    && lat >= bbox[1]
    && lat <= bbox[3];
}

function shouldRemoveBaikonurAdmin0Line(line) {
  if (!Array.isArray(line) || line.length < 2) return false;
  const points = line.filter((point) => Array.isArray(point) && point.length >= 2);
  if (!points.length) return false;
  const midpoint = points.reduce((acc, point) => [acc[0] + Number(point[0] || 0), acc[1] + Number(point[1] || 0)], [0, 0])
    .map((sum) => sum / points.length);
  return points.every((point) => isCoordinateInsideBbox(point, MAPLIBRE_BAIKONUR_BBOX))
    || isCoordinateInsideBbox(midpoint, MAPLIBRE_BAIKONUR_BBOX);
}

function removeBaikonurSegmentsFromAdmin0Boundaries(source) {
  // Natural Earth speichert Admin-0-Grenzen hier als eine Sammel-MultiLineString
  // ohne Länder-Properties. Baikonur (KAB) ist aber ein lease/Sondergebiet und
  // soll nicht wie eine normale Staatsgrenze erscheinen. Deshalb schneiden wir
  // nur dessen kompakten Linienring aus der Sammelgrenze heraus und zeichnen ihn
  // anschließend aus dem referenzierbaren Boundary-Set gestrichelt neu.
  return {
    ...source,
    features: (source.features || []).map((feature) => {
      const geometry = feature?.geometry || {};
      if (geometry.type === "MultiLineString") {
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: (geometry.coordinates || []).filter((line) => !shouldRemoveBaikonurAdmin0Line(line)),
          },
        };
      }
      if (geometry.type === "LineString" && shouldRemoveBaikonurAdmin0Line(geometry.coordinates || [])) {
        return null;
      }
      return feature;
    }).filter(Boolean),
  };
}

function installMapLibrePilotLandLayer(detail = "start") {
  const map = mapLibreEngineState.map;
  if (!map) return false;
  if (!map.isStyleLoaded?.()) {
    mapLibreEngineState.status = "land-waiting-for-style";
    map.once("idle", installMapLibrePilotLandLayer);
    renderMapEngineDiagnostics();
    return false;
  }
  const startedAt = performance.now();
  const dataset = getMapLibrePilotLandDataset(detail);
  const land = dataset?.geojson || null;
  if (!dataset?.geojsonUrl && !land?.features?.length) {
    mapLibreEngineState.landSource = "missing";
    mapLibreEngineState.landFeatureCount = 0;
    renderMapEngineDiagnostics();
    return false;
  }
  try {
    const renderStyle = getContinentalRenderStyle();
    const coastlineWidth = isEarthMapDarkMode() ? 1.25 : 1;
    removeMapLibrePilotLandLayer();
    map.addSource(MAPLIBRE_LAND_SOURCE_ID, {
      type: "geojson",
      data: dataset.geojsonUrl || land,
    });
    const landBeforeId = getFirstExistingMapLibreLayerId([
      MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID,
      MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID,
      MAPLIBRE_WATER_FILL_LAYER_ID,
      MAPLIBRE_COASTLINE_LAYER_ID,
      MAPLIBRE_WATER_OUTLINE_LAYER_ID,
      MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
    ]);
    map.addLayer({
      id: MAPLIBRE_LAND_FILL_LAYER_ID,
      type: "fill",
      source: MAPLIBRE_LAND_SOURCE_ID,
      paint: {
        "fill-color": renderStyle.land,
        "fill-opacity": 1,
      },
    }, landBeforeId);
    map.addLayer({
      id: MAPLIBRE_COASTLINE_LAYER_ID,
      type: "line",
      source: MAPLIBRE_LAND_SOURCE_ID,
      paint: {
        "line-color": renderStyle.outline,
        "line-width": coastlineWidth,
        "line-opacity": 1,
      },
    });
    mapLibreEngineState.landSource = dataset.label;
    mapLibreEngineState.landFeatureCount = dataset.featureCount || land.features.length;
    mapLibreEngineState.landLoadMs = performance.now() - startedAt;
    mapLibreEngineState.coastlineColor = renderStyle.outline;
    mapLibreEngineState.coastlineWidth = coastlineWidth;
    mapLibreEngineState.status = "ready";
    mapLibreEngineState.error = "";
    map.resize?.();
    orderMapLibreReadableBoundaryLayers();
    updateMapLibreDiagnosticsFrame();
    return true;
  } catch (error) {
    mapLibreEngineState.status = "land-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
    return false;
  }
}

function installMapLibrePilotWaterLayer() {
  const map = mapLibreEngineState.map;
  if (!map) return false;
  if (!map.isStyleLoaded?.()) {
    mapLibreEngineState.status = "water-waiting-for-style";
    map.once("idle", installMapLibrePilotWaterLayer);
    renderMapEngineDiagnostics();
    return false;
  }
  const water = getMapLibrePilotWaterGeoJson();
  if (!water?.features?.length) {
    mapLibreEngineState.waterFeatureCount = 0;
    renderMapEngineDiagnostics();
    return false;
  }
  try {
    const renderStyle = getContinentalRenderStyle();
    const outline = isEarthMapDarkMode()
      ? DARK_MAP_COASTLINE_COLOR
      : getThemeMapColor("--water-outline", "rgba(92,96,94,.28)");
    removeMapLibrePilotWaterLayer();
    map.addSource(MAPLIBRE_WATER_SOURCE_ID, {
      type: "geojson",
      data: water,
    });
    map.addLayer({
      id: MAPLIBRE_WATER_FILL_LAYER_ID,
      type: "fill",
      source: MAPLIBRE_WATER_SOURCE_ID,
      paint: {
        "fill-color": renderStyle.sea,
        "fill-opacity": 1,
      },
    }, map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID) ? MAPLIBRE_COASTLINE_LAYER_ID : undefined);
    map.addLayer({
      id: MAPLIBRE_WATER_OUTLINE_LAYER_ID,
      type: "line",
      source: MAPLIBRE_WATER_SOURCE_ID,
      paint: {
        "line-color": outline,
        "line-width": isEarthMapDarkMode() ? 1.05 : 0.85,
        "line-opacity": 1,
      },
    });
    mapLibreEngineState.waterFeatureCount = water.features.length;
    mapLibreEngineState.status = "ready";
    mapLibreEngineState.error = "";
    syncMapLibreSearchHighlight();
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
    orderMapLibreReadableBoundaryLayers();
    updateMapLibreDiagnosticsFrame();
    return true;
  } catch (error) {
    mapLibreEngineState.status = "water-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
    return false;
  }
}

function installMapLibrePilotAdmin0Layer() {
  const map = mapLibreEngineState.map;
  if (!map) return false;
  if (!map.isStyleLoaded?.()) {
    mapLibreEngineState.status = "admin0-waiting-for-style";
    map.once("idle", installMapLibrePilotAdmin0Layer);
    renderMapEngineDiagnostics();
    return false;
  }
  const admin0Boundaries = mapLibreEngineState.admin0BoundaryGeoJson;
  if (!admin0Boundaries?.features?.length) {
    renderMapEngineDiagnostics();
    return false;
  }
  try {
    const boundaryColor = isEarthMapDarkMode()
      ? "rgba(74,82,80,.96)"
      : "rgba(66,72,68,.86)";
    removeMapLibrePilotAdmin0Layer();
    map.addSource(MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID, {
      type: "geojson",
      data: cloneGeoJsonForMapLibre(admin0Boundaries),
    });
    map.addLayer({
      id: MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID,
      type: "line",
      source: MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": boundaryColor,
        "line-width": [
          "interpolate", ["linear"], ["zoom"],
          0, 0.95,
          2.5, 1.16,
          5.5, 1.32,
          9, 1.46,
        ],
        "line-opacity": [
          "interpolate", ["linear"], ["zoom"],
          0, 0.86,
          2.5, 0.94,
          6, 0.98,
        ],
      },
    }, map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID)
      ? MAPLIBRE_WATER_OUTLINE_LAYER_ID
      : (map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID) ? MAPLIBRE_COASTLINE_LAYER_ID : undefined));
    if (mapLibreEngineState.admin0SpecialBoundaryGeoJson?.features?.length) {
      map.addSource(MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_SOURCE_ID, {
        type: "geojson",
        data: cloneGeoJsonForMapLibre(mapLibreEngineState.admin0SpecialBoundaryGeoJson),
      });
      map.addLayer({
        id: MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID,
        type: "line",
        source: MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": isEarthMapDarkMode() ? "rgba(74,82,80,.98)" : "rgba(64,70,67,.78)",
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            0, 0.68,
            3, 0.78,
            6, 0.94,
            10, 1.08,
          ],
          "line-opacity": [
            "interpolate", ["linear"], ["zoom"],
            0, 0.72,
            3, 0.84,
            6, 0.94,
          ],
          "line-dasharray": [2.6, 3.2],
        },
      }, map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID)
        ? MAPLIBRE_WATER_OUTLINE_LAYER_ID
        : (map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID) ? MAPLIBRE_COASTLINE_LAYER_ID : undefined));
    }
    mapLibreEngineState.status = "ready";
    mapLibreEngineState.error = "";
    syncMapLibreSearchHighlight();
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
    updateMapLibreDiagnosticsFrame();
    return true;
  } catch (error) {
    mapLibreEngineState.status = "admin0-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
    return false;
  }
}

function requestMapLibrePilotAdmin0Layer() {
  if (mapLibreEngineState.admin0BoundaryGeoJson?.features?.length || mapLibreEngineState.admin0BoundaryPromise) return;
  mapLibreEngineState.status = "loading-admin0";
  mapLibreEngineState.error = "Natural-Earth-10m-Admin-0-Grenzen werden geladen";
  renderMapEngineDiagnostics();
  runWhenIdle(() => {
    loadMapLibrePilotAdmin0BoundaryGeoJson()
      .then((geojson) => {
        if (!geojson?.features?.length) {
          mapLibreEngineState.status = "admin0-missing";
          mapLibreEngineState.error = "Admin-0-Grenzen enthalten keine Features";
          renderMapEngineDiagnostics();
          return;
        }
        mapLibreEngineState.admin0FeatureCount = geojson.features.length;
        mapLibreEngineState.admin0LoadedChunks = 1;
        mapLibreEngineState.admin0TotalChunks = 1;
        installMapLibrePilotAdmin0Layer();
        syncMapLibreCamera();
      })
      .catch((error) => {
        mapLibreEngineState.status = "admin0-error";
        mapLibreEngineState.error = error?.message || String(error);
        renderMapEngineDiagnostics();
      });
  }, 900);
}

function collectMapLibreSearchFeatures(input, output = []) {
  if (!input) return output;
  if (Array.isArray(input)) {
    input.forEach((entry) => collectMapLibreSearchFeatures(entry, output));
    return output;
  }
  if (input.type === "FeatureCollection") {
    (input.features || []).forEach((feature) => collectMapLibreSearchFeatures(feature, output));
    return output;
  }
  if (input.type === "Feature") output.push(input);
  return output;
}

function isNaturalEarthAdmin1Feature(feature) {
  const props = feature?.properties || {};
  return Boolean(props.iso_3166_2 || props.ISO3166_2 || props.adm1_code);
}

function getFeaturePolygonCoordinates(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function getBoundarySegmentCoordKey(point) {
  const lon = Number(point?.[0]);
  const lat = Number(point?.[1]);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return "";
  return `${lon.toFixed(5)},${lat.toFixed(5)}`;
}

function getBoundarySegmentKey(a, b) {
  const aKey = getBoundarySegmentCoordKey(a);
  const bKey = getBoundarySegmentCoordKey(b);
  if (!aKey || !bKey || aKey === bKey) return "";
  return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
}

function getBoundarySegmentGroupKey(segment) {
  return `${segment.boundaryClass || "detail"}|${segment.countryIso3 || ""}`;
}

function getOtherBoundarySegmentPoint(segment, pointKey) {
  const startKey = getBoundarySegmentCoordKey(segment.coordinates[0]);
  return startKey === pointKey ? segment.coordinates[1] : segment.coordinates[0];
}

function stitchBoundarySegmentsToLineFeatures(segments) {
  const groups = new Map();
  segments.forEach((segment) => {
    const key = getBoundarySegmentGroupKey(segment);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(segment);
  });
  const features = [];
  groups.forEach((groupSegments, groupKey) => {
    const adjacency = new Map();
    const used = new Set();
    groupSegments.forEach((segment, index) => {
      segment._stitchId = `${groupKey}:${index}`;
      const startKey = getBoundarySegmentCoordKey(segment.coordinates[0]);
      const endKey = getBoundarySegmentCoordKey(segment.coordinates[1]);
      if (!adjacency.has(startKey)) adjacency.set(startKey, []);
      if (!adjacency.has(endKey)) adjacency.set(endKey, []);
      adjacency.get(startKey).push(segment);
      adjacency.get(endKey).push(segment);
    });

    const findNext = (pointKey) => (adjacency.get(pointKey) || []).find((segment) => !used.has(segment._stitchId));
    const starts = [...adjacency.entries()]
      .filter(([, connected]) => connected.length !== 2)
      .map(([pointKey]) => pointKey);

    const consumePath = (startSegment, startPointKey) => {
      const coordinates = [];
      let currentSegment = startSegment;
      let currentPointKey = startPointKey;
      while (currentSegment && !used.has(currentSegment._stitchId)) {
        used.add(currentSegment._stitchId);
        const otherPoint = getOtherBoundarySegmentPoint(currentSegment, currentPointKey);
        const currentPoint = currentSegment.coordinates.find((point) => getBoundarySegmentCoordKey(point) === currentPointKey);
        if (!coordinates.length && currentPoint) coordinates.push(currentPoint);
        coordinates.push(otherPoint);
        currentPointKey = getBoundarySegmentCoordKey(otherPoint);
        currentSegment = findNext(currentPointKey);
      }
      return coordinates;
    };

    starts.forEach((startPointKey) => {
      let segment = findNext(startPointKey);
      while (segment) {
        const coordinates = consumePath(segment, startPointKey);
        if (coordinates.length > 1) {
          features.push({
            type: "Feature",
            id: `admin1-boundary-${features.length}`,
            properties: {
              _earthMapAdmin1BoundaryClass: segment.boundaryClass,
              _earthMapAdmin1CountryIso3: segment.countryIso3 || "",
              _earthMapSharedBoundaryCount: segment.count,
            },
            geometry: { type: "LineString", coordinates },
          });
        }
        segment = findNext(startPointKey);
      }
    });

    groupSegments.forEach((segment) => {
      if (used.has(segment._stitchId)) return;
      const startKey = getBoundarySegmentCoordKey(segment.coordinates[0]);
      const coordinates = consumePath(segment, startKey);
      if (coordinates.length > 1) {
        features.push({
          type: "Feature",
          id: `admin1-boundary-${features.length}`,
          properties: {
            _earthMapAdmin1BoundaryClass: segment.boundaryClass,
            _earthMapAdmin1CountryIso3: segment.countryIso3 || "",
            _earthMapSharedBoundaryCount: segment.count,
          },
          geometry: { type: "LineString", coordinates },
        });
      }
    });
  });
  return features;
}

function createUniqueAdmin1BoundaryLineCollection(geojson) {
  const segments = new Map();
  (geojson?.features || []).forEach((feature, featureIndex) => {
    const polygons = getFeaturePolygonCoordinates(feature);
    const props = feature.properties || {};
    const isPermanent = props._earthMapAdmin1BoundaryClass === "permanent";
    const countryIso3 = props._earthMapAdmin1CountryIso3 || getNaturalEarthAdmin1CountryIso3(feature);
    polygons.forEach((polygon) => {
      (polygon || []).forEach((ring) => {
        if (!Array.isArray(ring) || ring.length < 2) return;
        for (let index = 0; index < ring.length - 1; index += 1) {
          const start = ring[index];
          const end = ring[index + 1];
          const key = getBoundarySegmentKey(start, end);
          if (!key) continue;
          const existing = segments.get(key);
          if (existing) {
            existing.count += 1;
            if (isPermanent && existing.boundaryClass !== "permanent") {
              existing.boundaryClass = "permanent";
              existing.countryIso3 = countryIso3;
            }
            return;
          }
          segments.set(key, {
            count: 1,
            coordinates: [[Number(start[0]), Number(start[1])], [Number(end[0]), Number(end[1])]],
            boundaryClass: isPermanent ? "permanent" : "detail",
            countryIso3,
            featureIndex,
          });
        }
      });
    });
  });
  // Kartografische Regel: Admin-1-Linien werden segmentweise dedupliziert.
  // Exakt identische Kanten zweier Nachbarflächen werden nur einmal gezeichnet,
  // aber einseitige Segmente bleiben erhalten. Natural-Earth-Grenzen sind nicht
  // überall perfekt als Gegenkante modelliert; eine reine "count > 1"-Regel
  // erzeugt darum fragmentarische Binnenlinien.
  return {
    type: "FeatureCollection",
    name: "earthmap-admin1-unique-boundaries",
    features: stitchBoundarySegmentsToLineFeatures([...segments.values()]),
  };
}

function isPermanentAdmin1BoundaryFeature(feature) {
  const props = feature?.properties || {};
  const iso3 = getNaturalEarthAdmin1CountryIso3(feature);
  const type = String(props.type || "").toLowerCase();
  const typeEn = String(props.type_en || "").toLowerCase();
  const constitutionalStatus = String(
    feature?.constitutional_status
    || feature?.classification?.constitutional_status
    || props.constitutional_status
    || props.ziselin_constitutional_status
    || "",
  ).toLowerCase();
  if (constitutionalStatus === "ordinary") return false;
  if (["federal_subject", "autonomous_region", "constituent_country", "special_region"].includes(constitutionalStatus)) {
    return true;
  }
  const ownCategory = [
    feature?.classification?.sovereignty_status,
    feature?.classification?.relation_to_parent,
    feature?.classification?.boundary_type,
    feature?.boundary_type,
    feature?.sovereignty_status,
    feature?.relation_to_parent,
    props.ziselin_sovereignty_status,
    props.ziselin_relation_to_parent,
    props.ziselin_boundary_type,
  ].map((value) => String(value || "").toLowerCase()).join(" ");
  // Fachregel: Normale ADM1-Details bleiben abschaltbar. Dauerhaft sichtbar
  // sind Einheiten, die föderale, konstitutionelle oder autonome Subjekte
  // darstellen. Eigene Boundary-Set-v1-Kategorien haben Vorrang; Natural-
  // Earth-Typen werden danach länderspezifisch interpretiert, weil dieselben
  // Wörter ("province", "state", "region") je nach Staat Verschiedenes meinen.
  if (/\b(federal_subject|federated_subject|constituent_country|home_nation|autonomous_region|autonomous_subject)\b/.test(ownCategory)) {
    return true;
  }
  if (/\b(ordinary_administrative|district|borough|county|municipality|department)\b/.test(ownCategory)) {
    return false;
  }

  // Natural Earth führt Baikonur als eigenes Sonderkürzel KAB. Das Gebiet ist
  // politisch sichtbar, soll aber nicht wie eine gewöhnliche kasachische
  // Binnenverwaltung wirken; deshalb läuft es über die gestrichelte Sonderklasse.
  if (iso3 === "KAB") return true;

  if (iso3 === "DEU") return type === "land" || typeEn === "state";
  if (iso3 === "USA") return type === "state" || typeEn === "state";
  if (iso3 === "CAN") return type === "province" || typeEn === "province" || type === "territoire" || typeEn === "territory";
  if (iso3 === "AUS") return type === "state" || typeEn === "state" || typeEn === "territory";
  if (iso3 === "AUT") return type === "land" || typeEn === "state";
  if (iso3 === "CHE") return type === "canton" || typeEn === "canton";
  if (iso3 === "BRA") return type === "estado" || typeEn === "state";
  if (iso3 === "MEX") return type === "estado" || typeEn === "state";
  if (iso3 === "RUS") {
    return type === "respublika"
      || typeEn === "republic"
      || type.includes("avtonom")
      || typeEn.includes("autonomous");
  }
  // Natural Earth bildet die britischen Home Nations im Admin-1-Datensatz
  // nicht als saubere vier Gesamtflächen ab. Bis wir ein kuratiertes
  // Boundary-Set für Wales/Schottland/England/Nordirland haben, vermeiden wir
  // hier bewusst falsche Treffer wie London Boroughs oder Mid Ulster.
  if (iso3 === "GBR") return false;
  return false;
}

function getMapLibreLongitudeIntervals(west, east) {
  const normalizedWest = normalizeLongitude(west);
  const normalizedEast = normalizeLongitude(east);
  const rawSpan = Math.abs(Number(east) - Number(west));
  if (rawSpan >= 360) return [[-180, 180]];
  if (normalizedWest <= normalizedEast) return [[normalizedWest, normalizedEast]];
  return [[normalizedWest, 180], [-180, normalizedEast]];
}

function longitudeIntervalsIntersect(a, b) {
  return a.some(([aWest, aEast]) => b.some(([bWest, bEast]) => aWest <= bEast && aEast >= bWest));
}

function getMapLibreExpandedBounds() {
  const map = mapLibreEngineState.map;
  if (!map?.getBounds) return null;
  const bounds = map.getBounds();
  const west = bounds.getWest();
  const east = bounds.getEast();
  const south = bounds.getSouth();
  const north = bounds.getNorth();
  const zoom = map.getZoom?.() ?? getMapLibreZoomFromGlobeZoom();
  // Viewport-Regel: Admin-1 wird nicht exakt am Bildschirmrand geschnitten,
  // sondern mit einer kleinen Umgebung geladen. Die Umgebung schrumpft beim
  // Hineinzoomen, damit Bewegungen flüssig bleiben und nicht unnötig viele
  // Länder-Chunks angefordert werden.
  const lonPad = clamp(20 / Math.max(1.35, zoom), 2.8, 9);
  const latPad = clamp(14 / Math.max(1.35, zoom), 2.0, 6);
  return {
    west: west - lonPad,
    east: east + lonPad,
    south: clamp(south - latPad, -90, 90),
    north: clamp(north + latPad, -90, 90),
  };
}

function doesBboxIntersectMapLibreBounds(bbox, bounds) {
  if (!Array.isArray(bbox) || bbox.length < 4 || !bounds) return false;
  const [minLon, minLat, maxLon, maxLat] = bbox.map(Number);
  if (![minLon, minLat, maxLon, maxLat].every(Number.isFinite)) return false;
  if (maxLat < bounds.south || minLat > bounds.north) return false;
  return longitudeIntervalsIntersect(
    getMapLibreLongitudeIntervals(minLon, maxLon),
    getMapLibreLongitudeIntervals(bounds.west, bounds.east),
  );
}

function getMapLibreViewportAdmin0Iso3s(options = {}) {
  const map = mapLibreEngineState.map;
  const zoom = map?.getZoom?.() ?? getMapLibreZoomFromGlobeZoom();
  const minZoom = Number.isFinite(options.minZoom) ? options.minZoom : MAPLIBRE_ADMIN1_VIEWPORT_LOAD_ZOOM;
  if (zoom < minZoom) return [];
  const index = getNaturalEarthAdmin0EngineIndex();
  const bounds = getMapLibreExpandedBounds();
  if (!index?.chunks?.length || !bounds) return [];
  const limit = Number.isFinite(options.limit) ? Math.max(0, options.limit) : MAPLIBRE_ADMIN1_VIEWPORT_CHUNK_LIMIT;
  const center = map.getCenter?.();
  const centerLon = normalizeLongitude(center?.lng ?? rotation.lon);
  const centerLat = Number.isFinite(center?.lat) ? center.lat : rotation.lat;
  const getBboxCenterDistance = (entry) => {
    const bbox = entry.bbox || [];
    const midLon = normalizeLongitude((Number(bbox[0]) + Number(bbox[2])) / 2);
    const midLat = (Number(bbox[1]) + Number(bbox[3])) / 2;
    const lonDistance = Math.abs(normalizeLongitude(midLon - centerLon));
    const latDistance = Math.abs(midLat - centerLat);
    return lonDistance + latDistance * 1.35;
  };
  const visibleEntries = index.chunks
    .filter((entry) => doesBboxIntersectMapLibreBounds(entry.bbox, bounds))
    .sort((a, b) => getBboxCenterDistance(a) - getBboxCenterDistance(b));
  return (limit > 0 ? visibleEntries.slice(0, limit) : visibleEntries)
    .map((entry) => String(entry.country_iso3 || entry.provider_boundary_id || "").toUpperCase())
    .filter(Boolean);
}

function scheduleMapLibreAdmin1ViewportSync(delay = 760) {
  if (!mapLibreEngineState.active) return;
  window.clearTimeout(mapLibreAdmin1ViewportTimer);
  mapLibreAdmin1ViewportTimer = window.setTimeout(() => {
    if (isNavigatingGlobe) {
      scheduleMapLibreAdmin1ViewportSync(900);
      return;
    }
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
  }, delay);
}

function getMapLibreAdmin1Iso3DemandSet(includeViewport = false) {
  const highlight = state.mapSearchHighlight;
  const iso3s = new Set();
  const selectedFeatures = collectMapLibreSearchFeatures(Array.isArray(highlight?.selectedFeatures)
    ? highlight.selectedFeatures
    : [highlight?.countryFeature].filter(Boolean));
  const focusFeatures = collectMapLibreSearchFeatures(Array.isArray(highlight?.focusFeatures)
    ? highlight.focusFeatures
    : [highlight?.provinceFeature].filter(Boolean));

  focusFeatures.forEach((feature) => {
    if (!isNaturalEarthAdmin1Feature(feature)) return;
    const iso3 = getNaturalEarthAdmin1CountryIso3(feature);
    if (iso3) iso3s.add(iso3);
  });

  // On-demand-Regel: einzelne oder wenige Kontextstaaten dürfen ihre Admin-1-
  // Linien sofort zeigen. Große Verbände wie EU/NATO lösen dagegen nicht
  // automatisch dutzende Provinz-Chunks aus; dafür braucht es später Kacheln.
  if (selectedFeatures.length > 0 && selectedFeatures.length <= 3) {
    selectedFeatures.forEach((feature) => {
      if (isNaturalEarthAdmin1Feature(feature)) {
        const iso3 = getNaturalEarthAdmin1CountryIso3(feature);
        if (iso3) iso3s.add(iso3);
        return;
      }
      const iso3 = getNaturalEarthIso3(feature).toUpperCase();
      if (iso3) iso3s.add(iso3);
    });
  }

  if (includeViewport) {
    getMapLibreViewportAdmin0Iso3s().forEach((iso3) => iso3s.add(iso3));
    getMapLibreViewportAdmin0Iso3s({
      minZoom: MAPLIBRE_ADMIN1_PERMANENT_VIEWPORT_ZOOM,
      limit: 0,
    }).forEach((iso3) => iso3s.add(iso3));
  }

  // Baikonur wird von Natural Earth sowohl als Admin-0-Sondergebiet (KAB)
  // als auch als Admin-1-Chunk geführt. Gerendert wird es eindeutig über den
  // Admin-0-Sonderlayer; der Admin-1-Pfad würde sonst dieselbe Linie doppeln.
  iso3s.delete("KAB");

  return iso3s;
}

function installMapLibrePilotAdmin1Layer(geojson, iso3s = [], lineGeoJson = null) {
  const map = mapLibreEngineState.map;
  if (!map || !map.isStyleLoaded?.()) return false;
  removeMapLibrePilotAdmin1Layer();
  if (!geojson?.features?.length) {
    updateMapLibreDiagnosticsFrame();
    return false;
  }
  try {
    const boundaryColor = isEarthMapDarkMode()
      ? "rgba(92,98,96,.9)"
      : "rgba(78,84,80,.62)";
    // Alle Admin-1-Grenzen teilen dieselbe kartografische Strichdefinition.
    // Autonome Regionen, Föderationssubjekte und Kantone dürfen fachlich
    // gefiltert oder später eingeblendet werden, sollen aber nicht durch
    // eigene Farbe oder Dicke als Sonderstil aus dem Provinzbild fallen.
    const admin1BoundaryLineWidth = [
      "interpolate", ["linear"], ["zoom"],
      0, 0.52,
      2.8, 0.6,
      5.5, 0.78,
      9, 0.94,
    ];
    const admin1BoundaryLineOpacity = [
      "interpolate", ["linear"], ["zoom"],
      0, 0.24,
      2.4, 0.34,
      3.2, 0.56,
      5, 0.78,
    ];
    const classifiedGeoJson = {
      ...geojson,
      features: (geojson.features || []).map((feature) => ({
        ...feature,
        properties: {
          ...(feature.properties || {}),
          ziselin_constitutional_status: feature.constitutional_status || feature.classification?.constitutional_status || feature.properties?.ziselin_constitutional_status || feature.properties?.constitutional_status || "",
          _earthMapAdmin1CountryIso3: getNaturalEarthAdmin1CountryIso3(feature),
          _earthMapAdmin1BoundaryClass: isPermanentAdmin1BoundaryFeature(feature) ? "permanent" : "detail",
        },
      })),
    };
    const preparedLineGeoJson = lineGeoJson?.features?.length
      ? lineGeoJson
      : createUniqueAdmin1BoundaryLineCollection(classifiedGeoJson);
    map.addSource(MAPLIBRE_ADMIN1_SOURCE_ID, {
      type: "geojson",
      data: cloneGeoJsonForMapLibre(classifiedGeoJson),
    });
    map.addSource(MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID, {
      type: "geojson",
      data: cloneGeoJsonForMapLibre(preparedLineGeoJson),
    });
    map.addLayer({
      id: MAPLIBRE_ADMIN1_FILL_LAYER_ID,
      type: "fill",
      source: MAPLIBRE_ADMIN1_SOURCE_ID,
      paint: {
        "fill-color": "rgba(0,0,0,0)",
        "fill-opacity": 0,
      },
    }, map.getLayer(MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID)
      ? MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID
      : (map.getLayer(MAPLIBRE_WATER_FILL_LAYER_ID) ? MAPLIBRE_WATER_FILL_LAYER_ID : undefined));
    map.addLayer({
      id: MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
      type: "line",
      source: MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID,
      filter: ["!=", ["get", "_earthMapAdmin1BoundaryClass"], "permanent"],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        "visibility": state.showAdmin1Boundaries === true ? "visible" : "none",
      },
      paint: {
        "line-color": boundaryColor,
        "line-width": admin1BoundaryLineWidth,
        "line-opacity": admin1BoundaryLineOpacity,
      },
    }, map.getLayer(MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID)
      ? MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID
      : (map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID) ? MAPLIBRE_WATER_OUTLINE_LAYER_ID : undefined));
    map.addLayer({
      id: MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID,
      type: "line",
      source: MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID,
      filter: [
        "all",
        ["==", ["get", "_earthMapAdmin1BoundaryClass"], "permanent"],
        ["!=", ["get", "_earthMapAdmin1CountryIso3"], "CHE"],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        "visibility": state.showAdmin1Boundaries === true ? "visible" : "none",
      },
      paint: {
        "line-color": boundaryColor,
        "line-width": admin1BoundaryLineWidth,
        "line-opacity": admin1BoundaryLineOpacity,
      },
    }, map.getLayer(MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID)
      ? MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID
      : (map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID) ? MAPLIBRE_WATER_OUTLINE_LAYER_ID : undefined));
    map.addLayer({
      id: MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID,
      type: "line",
      source: MAPLIBRE_ADMIN1_BOUNDARY_SOURCE_ID,
      minzoom: MAPLIBRE_SWISS_CANTON_BOUNDARY_ZOOM,
      filter: [
        "all",
        ["==", ["get", "_earthMapAdmin1BoundaryClass"], "permanent"],
        ["==", ["get", "_earthMapAdmin1CountryIso3"], "CHE"],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        "visibility": state.showAdmin1Boundaries === true ? "visible" : "none",
      },
      paint: {
        "line-color": boundaryColor,
        "line-width": admin1BoundaryLineWidth,
        "line-opacity": admin1BoundaryLineOpacity,
      },
    }, map.getLayer(MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID)
      ? MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID
      : (map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID) ? MAPLIBRE_WATER_OUTLINE_LAYER_ID : undefined));
    mapLibreEngineState.admin1GeoJson = geojson;
    mapLibreEngineState.admin1Iso3 = iso3s;
    mapLibreEngineState.admin1FeatureCount = geojson.features.length;
    mapLibreEngineState.admin1LineFeatureCount = preparedLineGeoJson.features?.length || 0;
    mapLibreEngineState.admin1SourceReady = true;
    mapLibreEngineState.admin1LayerVisible = true;
    orderMapLibreReadableBoundaryLayers();
    updateMapLibreDiagnosticsFrame();
    return true;
  } catch (error) {
    mapLibreEngineState.status = "admin1-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
    return false;
  }
}

function syncMapLibreAdmin1Visibility() {
  const map = mapLibreEngineState.map;
  if (!map?.getLayer?.(MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID)) return;
  try {
    [
      MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID,
    ].forEach((layerId) => {
      if (!map.getLayer(layerId)) return;
      map.setLayoutProperty(
        layerId,
        "visibility",
        state.showAdmin1Boundaries === true ? "visible" : "none",
      );
    });
  } catch (error) {
    console.warn("EarthMap-Provinzgrenzen konnten nicht umgeschaltet werden.", error);
  }
}

function getFirstExistingMapLibreLayerId(layerIds = []) {
  const map = mapLibreEngineState.map;
  if (!map?.getLayer) return undefined;
  return layerIds.find((layerId) => map.getLayer(layerId));
}

function raiseMapLibreLayersInOrder(layerIds = []) {
  const map = mapLibreEngineState.map;
  if (!map?.getLayer || !map?.moveLayer) return;
  layerIds.forEach((layerId) => {
    if (!map.getLayer(layerId)) return;
    map.moveLayer(layerId);
  });
}

function orderMapLibreBaseLayers() {
  const map = mapLibreEngineState.map;
  if (!map?.getLayer || !map?.moveLayer) return;
  try {
    // Basisregel: Landflächen sind die niedrigste Geo-Fläche über dem
    // Hintergrund. Sie dürfen bei nachgeladenen Detailstufen niemals über
    // Suche, Wasser, Küstenlinien oder politische Grenzen rutschen.
    if (map.getLayer(MAPLIBRE_LAND_FILL_LAYER_ID)) {
      const beforeLand = getFirstExistingMapLibreLayerId([
        MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID,
        MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID,
        MAPLIBRE_WATER_FILL_LAYER_ID,
        MAPLIBRE_COASTLINE_LAYER_ID,
        MAPLIBRE_WATER_OUTLINE_LAYER_ID,
        MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID,
        MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
      ]);
      if (beforeLand && beforeLand !== MAPLIBRE_LAND_FILL_LAYER_ID) {
        map.moveLayer(MAPLIBRE_LAND_FILL_LAYER_ID, beforeLand);
      }
    }
    if (map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID)) {
      const beforeCoastline = getFirstExistingMapLibreLayerId([
        MAPLIBRE_WATER_OUTLINE_LAYER_ID,
        MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID,
        MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID,
        MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
        MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID,
      ]);
      if (beforeCoastline && beforeCoastline !== MAPLIBRE_COASTLINE_LAYER_ID) {
        map.moveLayer(MAPLIBRE_COASTLINE_LAYER_ID, beforeCoastline);
      }
    }
  } catch (error) {
    console.warn("EarthMap-Basislayerreihenfolge konnte nicht gesetzt werden.", error);
  }
}

function orderMapLibreReadableBoundaryLayers() {
  const map = mapLibreEngineState.map;
  if (!map?.getLayer || !map?.moveLayer) return;
  try {
    orderMapLibreBaseLayers();
    // Lesbarkeitsregel: MapLibre-Layer werden hier bewusst als explizite
    // Stapelung sortiert. Relative Einfügepunkte ("vor Wasser", "vor Outline")
    // waren zu fragil, sobald Suche, Statistik und nachgeladene Admin-Layer
    // gleichzeitig aktiv sind. Die Ordnung bleibt fachlich: Markierungsflächen
    // unten; Such-Outlines dürfen eine Auswahl akzentuieren, aber politische
    // Grenzen müssen darüber liegen, damit markierte Länder nicht zu roten
    // Flächen ohne kartografische Struktur werden. Küsten/Gewässer bleiben oben.
    raiseMapLibreLayersInOrder([
      MAPLIBRE_LAND_FILL_LAYER_ID,
      MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID,
      MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID,
      MAPLIBRE_WATER_FILL_LAYER_ID,
      MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID,
      MAPLIBRE_SEARCH_FOCUS_OUTLINE_LAYER_ID,
      MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN1_SPECIAL_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN1_SWISS_CANTON_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN0_SPECIAL_BOUNDARY_LAYER_ID,
      MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID,
      MAPLIBRE_COASTLINE_LAYER_ID,
      MAPLIBRE_WATER_OUTLINE_LAYER_ID,
    ]);
  } catch (error) {
    console.warn("EarthMap-Layerreihenfolge konnte nicht nachgeschärft werden.", error);
  }
}

async function syncMapLibreAdmin1LayerForSearch(options = {}) {
  const map = mapLibreEngineState.map;
  if (!map || !map.isStyleLoaded?.()) return;
  const includeViewport = options.includeViewport === true;
  const zoom = map.getZoom?.() ?? getMapLibreZoomFromGlobeZoom();
  if (includeViewport && zoom >= MAPLIBRE_ADMIN1_VIEWPORT_LOAD_ZOOM && !getNaturalEarthAdmin0EngineIndex()?.chunks?.length) {
    await loadNaturalEarthAdmin0EngineIndex();
  }
  const requestSerial = ++mapLibreAdmin1RequestSerial;
  const viewportIso3s = includeViewport ? getMapLibreViewportAdmin0Iso3s() : [];
  const permanentViewportIso3s = includeViewport ? getMapLibreViewportAdmin0Iso3s({
    minZoom: MAPLIBRE_ADMIN1_PERMANENT_VIEWPORT_ZOOM,
    limit: 0,
  }) : [];
  const iso3s = [...getMapLibreAdmin1Iso3DemandSet(includeViewport)].filter(Boolean).sort();
  const signature = iso3s.join(",");
  mapLibreEngineState.admin1ViewportIso3 = permanentViewportIso3s.length ? permanentViewportIso3s : viewportIso3s;
  mapLibreEngineState.admin1DemandMode = permanentViewportIso3s.length
    ? "permanent-viewport"
    : (includeViewport ? "viewport" : (state.mapSearchHighlight ? "search" : "none"));
  if (!signature) {
    mapLibreEngineState.admin1ViewportIso3 = [];
    mapLibreEngineState.admin1DemandMode = "none";
    // Eine leere Admin-1-Anforderung darf nur dann aktiv löschen, wenn kein
    // Such- oder Viewport-Kontext beteiligt ist. Sonst räumt eine große Suche
    // wie "EU" die bereits sichtbaren politischen Boundaries weg, obwohl sie
    // fachlich weiter gelten und nach der nächsten Viewport-Synchronisierung
    // wieder gebraucht werden.
    if (!includeViewport && !state.mapSearchHighlight) {
      removeMapLibrePilotAdmin1Layer();
    } else {
      syncMapLibreAdmin1Visibility();
      orderMapLibreReadableBoundaryLayers();
    }
    updateMapLibreDiagnosticsFrame();
    return;
  }
  if (signature === mapLibreEngineState.admin1Iso3.join(",") && mapLibreEngineState.admin1SourceReady) {
    syncMapLibreAdmin1Visibility();
    orderMapLibreReadableBoundaryLayers();
    return;
  }
  const startedAt = performance.now();
  mapLibreEngineState.status = "loading-admin1";
  mapLibreEngineState.error = `Admin-1 wird geladen (${mapLibreEngineState.admin1DemandMode}): ${signature}`;
  renderMapEngineDiagnostics();
  const features = [];
  const lineFeatures = [];
  for (const iso3 of iso3s) {
    if (requestSerial !== mapLibreAdmin1RequestSerial) return;
    if (includeViewport && isNavigatingGlobe) {
      scheduleMapLibreAdmin1ViewportSync(520);
      return;
    }
    const [dataset, lineDataset] = await Promise.all([
      loadNaturalEarthAdmin1CountryChunk(iso3),
      loadNaturalEarthAdmin1LineChunk(iso3),
    ]);
    features.push(...(dataset?.features || []));
    lineFeatures.push(...(lineDataset?.features || []));
    // Die Chunk-Schleife gibt der UI bewusst Luft. Admin-1 bleibt reaktiv,
    // bis MVT/PMTiles diese Zwischenstufe später ganz ersetzt.
    await waitForNextFrame();
  }
  if (requestSerial !== mapLibreAdmin1RequestSerial) return;
  mapLibreEngineState.admin1LoadMs = performance.now() - startedAt;
  installMapLibrePilotAdmin1Layer({
    type: "FeatureCollection",
    name: `earthmap-admin1-on-demand-${signature}`,
    features,
  }, iso3s, {
    type: "FeatureCollection",
    name: `earthmap-admin1-lines-on-demand-${signature}`,
    features: lineFeatures,
  });
  mapLibreEngineState.status = "ready";
  mapLibreEngineState.error = "";
  renderMapEngineDiagnostics();
}

function getMapLibreSearchHighlightFeatureCollection() {
  const highlight = state.mapSearchHighlight;
  const liveSearchBlocked = isStatisticalMapActive();
  const selectedFeatures = liveSearchBlocked
    ? []
    : (Array.isArray(highlight?.selectedFeatures)
      ? highlight.selectedFeatures
      : [highlight?.countryFeature].filter(Boolean));
  const focusFeatures = liveSearchBlocked
    ? []
    : (Array.isArray(highlight?.focusFeatures)
      ? highlight.focusFeatures
      : [highlight?.provinceFeature].filter(Boolean));
  const contextColor = getMapSearchSelectedAreaColor();
  const contextOutline = getMapSearchSelectedOutlineColor();
  const focusColor = getMapSearchSpecialHighlightColor();
  const focusOutline = getMapSearchSpecialOutlineColor();
  const features = [];

  const appendSearchFeatures = (input, role, inputIndex, fill, outline, opacity) => {
    const sourceFeatures = input?.type === "FeatureCollection"
      ? input.features || []
      : [input].filter(Boolean);
    sourceFeatures.forEach((feature, featureIndex) => {
      if (!feature?.geometry) return;
      // Suchdatenfluss: Organisationen wie EU/NATO werden als FeatureCollection
      // aufgelöst. MapLibre-Layer brauchen aber einzelne Features mit eigener
      // Geometry. Darum wird die Sammlung hier nur für den Renderpfad
      // aufgefächert; die semantische Suchlogik bleibt unverändert.
      features.push({
        ...feature,
        id: `search-${role}-${inputIndex}-${featureIndex}`,
        properties: {
          ...(feature.properties || {}),
          _earthMapSearchRole: role,
          _earthMapSearchOrder: inputIndex,
          _earthMapSearchMemberOrder: featureIndex,
          _earthMapSearchFill: fill,
          _earthMapSearchOutline: outline,
          _earthMapSearchOpacity: opacity,
        },
      });
    });
  };

  selectedFeatures.forEach((feature, index) => {
    appendSearchFeatures(
      feature,
      "context",
      index,
      contextColor,
      contextOutline,
      isEarthMapDarkMode() ? 0.78 : 0.52,
    );
  });
  focusFeatures.forEach((feature, index) => {
    appendSearchFeatures(
      feature,
      "focus",
      index,
      focusColor,
      focusOutline,
      isEarthMapDarkMode() ? 0.82 : 0.68,
    );
  });
  const savedSearchLayers = (getActiveProject()?.dataLayers || [])
    .filter((layer) => layer?.kind === "gearbox-data-layer" && layer.origin === "search" && layer.visible !== false);
  savedSearchLayers.forEach((layer, layerIndex) => {
    layer._searchRenderSkipped = 0;
    layer._searchRenderSkippedExamples = [];
    const hasDrawableMatches = (layer.valueMatches || []).some((match) => hasDrawableBoundaryFeature(match?.feature));
    if (!hasDrawableMatches) {
      scheduleSearchResultLayerHydration(layer);
      return;
    }
    (layer.valueMatches || []).forEach((match, matchIndex) => {
      if (!hasDrawableBoundaryFeature(match?.feature)) return;
      const savedRole = match.role || "context";
      const renderRole = savedRole === "focus" ? "focus" : "context";
      const before = features.length;
      appendSearchFeatures(
        match.feature,
        renderRole,
        1000 + layerIndex * 100 + matchIndex,
        match.fill || (renderRole === "focus" ? focusColor : contextColor),
        match.outline || (renderRole === "focus" ? focusOutline : contextOutline),
        renderRole === "focus"
          ? (isEarthMapDarkMode() ? 0.82 : 0.68)
          : (isEarthMapDarkMode() ? 0.78 : 0.52),
      );
      if (features.length === before) {
        layer._searchRenderSkipped = Number(layer._searchRenderSkipped || 0) + 1;
        layer._searchRenderSkippedExamples = [
          ...new Set([
            ...(Array.isArray(layer._searchRenderSkippedExamples) ? layer._searchRenderSkippedExamples : []),
            match.boundaryKey || match.stable_id || match.featureId || "—",
          ]),
        ].slice(0, 8);
      }
    });
  });

  return {
    type: "FeatureCollection",
    name: "earthmap-search-highlight",
    features,
  };
}

function removeMapLibreSearchHighlightLayer() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  [
    MAPLIBRE_SEARCH_FOCUS_OUTLINE_LAYER_ID,
    MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID,
    MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID,
    MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID,
  ].forEach((layerId) => {
    if (map.getLayer(layerId)) map.removeLayer(layerId);
  });
  if (map.getSource(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID)) {
    map.removeSource(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID);
  }
  mapLibreEngineState.searchHighlightFeatures = 0;
  mapLibreEngineState.searchHighlightSourceReady = false;
}

function hasCompleteMapLibreSearchHighlightLayers() {
  const map = mapLibreEngineState.map;
  return Boolean(map?.getSource?.(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID)
    && map.getLayer(MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID)
    && map.getLayer(MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID)
    && map.getLayer(MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID)
    && map.getLayer(MAPLIBRE_SEARCH_FOCUS_OUTLINE_LAYER_ID));
}

function syncMapLibreSearchHighlight(options = {}) {
  const map = mapLibreEngineState.map;
  if (!map || !map.isStyleLoaded?.()) return;
  const collection = getMapLibreSearchHighlightFeatureCollection();
  const features = collection.features || [];
  if (!features.length) {
    removeMapLibreSearchHighlightLayer();
    orderMapLibreReadableBoundaryLayers();
    updateMapLibreDiagnosticsFrame();
    return;
  }
  try {
    if (features.length && hasCompleteMapLibreSearchHighlightLayers()) {
      const source = map.getSource(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID);
      source?.setData?.(cloneGeoJsonForMapLibre(collection));
      mapLibreEngineState.searchHighlightFeatures = features.length;
      mapLibreEngineState.searchHighlightSourceReady = true;
      orderMapLibreReadableBoundaryLayers();
      if (options.syncAdmin1 !== false) {
        scheduleMapLibreAdmin1ViewportSync(MAP_SEARCH_ADMIN1_SYNC_DELAY_MS);
      }
      updateMapLibreDiagnosticsFrame();
      return;
    }
    removeMapLibreSearchHighlightLayer();
    const waterFillBeforeId = map.getLayer(MAPLIBRE_WATER_FILL_LAYER_ID)
      ? MAPLIBRE_WATER_FILL_LAYER_ID
      : (map.getLayer(MAPLIBRE_COASTLINE_LAYER_ID) ? MAPLIBRE_COASTLINE_LAYER_ID : undefined);
    const outlineBeforeId = map.getLayer(MAPLIBRE_WATER_OUTLINE_LAYER_ID)
      ? MAPLIBRE_WATER_OUTLINE_LAYER_ID
      : (map.getLayer(MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID) ? MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID : undefined);

    map.addSource(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID, {
      type: "geojson",
      data: cloneGeoJsonForMapLibre(collection),
    });
    map.addLayer({
      id: MAPLIBRE_SEARCH_CONTEXT_FILL_LAYER_ID,
      type: "fill",
      source: MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID,
      filter: ["==", ["get", "_earthMapSearchRole"], "context"],
      paint: {
        "fill-color": ["get", "_earthMapSearchFill"],
        "fill-opacity": ["get", "_earthMapSearchOpacity"],
      },
    }, waterFillBeforeId);
    map.addLayer({
      id: MAPLIBRE_SEARCH_FOCUS_FILL_LAYER_ID,
      type: "fill",
      source: MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID,
      filter: ["==", ["get", "_earthMapSearchRole"], "focus"],
      paint: {
        "fill-color": ["get", "_earthMapSearchFill"],
        "fill-opacity": ["get", "_earthMapSearchOpacity"],
      },
    }, waterFillBeforeId);
    map.addLayer({
      id: MAPLIBRE_SEARCH_CONTEXT_OUTLINE_LAYER_ID,
      type: "line",
      source: MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID,
      filter: ["==", ["get", "_earthMapSearchRole"], "context"],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": ["get", "_earthMapSearchOutline"],
        "line-width": [
          "interpolate", ["linear"], ["zoom"],
          0, isEarthMapDarkMode() ? 1.05 : 0.96,
          5, isEarthMapDarkMode() ? 1.22 : 1.08,
          9, isEarthMapDarkMode() ? 1.38 : 1.2,
        ],
        "line-opacity": isEarthMapDarkMode() ? 0.98 : 0.92,
      },
    }, outlineBeforeId);
    map.addLayer({
      id: MAPLIBRE_SEARCH_FOCUS_OUTLINE_LAYER_ID,
      type: "line",
      source: MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID,
      filter: ["==", ["get", "_earthMapSearchRole"], "focus"],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": ["get", "_earthMapSearchOutline"],
        "line-width": [
          "interpolate", ["linear"], ["zoom"],
          0, isEarthMapDarkMode() ? 1.45 : 1.24,
          5, isEarthMapDarkMode() ? 1.68 : 1.42,
          9, isEarthMapDarkMode() ? 1.86 : 1.56,
        ],
        "line-opacity": 0.98,
      },
    }, outlineBeforeId);
    mapLibreEngineState.searchHighlightFeatures = features.length;
    mapLibreEngineState.searchHighlightSourceReady = true;
    orderMapLibreReadableBoundaryLayers();
    if (options.syncAdmin1 !== false) {
      scheduleMapLibreAdmin1ViewportSync(MAP_SEARCH_ADMIN1_SYNC_DELAY_MS);
    }
    updateMapLibreDiagnosticsFrame();
  } catch (error) {
    mapLibreEngineState.status = "search-error";
    mapLibreEngineState.error = error?.message || String(error);
    mapLibreEngineState.searchHighlightFeatures = 0;
    mapLibreEngineState.searchHighlightSourceReady = false;
    renderMapEngineDiagnostics();
  }
}

function requestMapLibrePilotWaterLayer(detail = "full") {
  if (
    mapLibreEngineState.waterGeoJson?.features?.length
    && mapLibreEngineState.waterDetail === detail
    && mapLibreEngineState.waterSourceReady
  ) {
    if (!mapLibreEngineState.admin0BoundaryGeoJson?.features?.length) requestMapLibrePilotAdmin0Layer();
    return;
  }
  if (mapLibreEngineState.waterPromise) return;
  mapLibreEngineState.status = "loading-water";
  mapLibreEngineState.error = detail === "major"
    ? "große Natural-Earth-10m-Gewässer werden geladen"
    : "Natural-Earth-10m-Gewässer werden nachgeladen";
  renderMapEngineDiagnostics();
  runWhenIdle(() => {
    loadMapLibrePilotWaterGeoJson(detail)
      .then((geojson) => {
        if (!geojson?.features?.length) {
          mapLibreEngineState.status = "water-missing";
          mapLibreEngineState.error = "Gewässerdaten enthalten keine Features";
          renderMapEngineDiagnostics();
          return;
        }
        installMapLibrePilotWaterLayer();
        requestMapLibrePilotAdmin0Layer();
        syncMapLibreCamera();
      })
      .catch((error) => {
        mapLibreEngineState.status = "water-error";
        mapLibreEngineState.error = error?.message || String(error);
        renderMapEngineDiagnostics();
      });
  }, 650);
}

function maybeRequestMapLibrePilotWaterLayer(zoom = getMapLibreZoomFromGlobeZoom()) {
  if (zoom < MAPLIBRE_WATER_LOAD_ZOOM) return;
  requestMapLibrePilotWaterLayer("full");
}

function requestMapLibrePilotFullLandLayer() {
  if (mapLibreEngineState.fullLandPending) return;
  if (mapLibreEngineState.fullLandRequested && mapLibreEngineState.landSource === "natural-earth-10m-land") return;
  mapLibreEngineState.fullLandPending = true;
  runWhenIdle(() => {
    mapLibreEngineState.status = "loading-full-land";
    mapLibreEngineState.error = "vollständige Natural-Earth-10m-Landfläche wird nachgeladen";
    renderMapEngineDiagnostics();
    loadMapLibrePilotFullLandGeoJson()
      .then((geojson) => {
        if (!geojson?.features?.length) {
          mapLibreEngineState.status = "full-land-missing";
          mapLibreEngineState.error = "vollständige 10m-Landfläche enthält keine Features";
          renderMapEngineDiagnostics();
          return;
        }
        const installed = installMapLibrePilotLandLayer("full");
        mapLibreEngineState.fullLandRequested = installed;
        maybeRequestMapLibrePilotWaterLayer();
        syncMapLibreCamera();
      })
      .catch((error) => {
        mapLibreEngineState.status = "full-land-error";
        mapLibreEngineState.error = error?.message || String(error);
        renderMapEngineDiagnostics();
      })
      .finally(() => {
        mapLibreEngineState.fullLandPending = false;
      });
  }, 400);
}

function maybeRequestMapLibrePilotFullLandLayer(zoom = getMapLibreZoomFromGlobeZoom()) {
  if (zoom < MAPLIBRE_FULL_LAND_LOAD_ZOOM) return;
  if (mapLibreEngineState.landSource === "natural-earth-10m-land") return;
  requestMapLibrePilotFullLandLayer();
}

function renderMapEngineDiagnostics() {
  if (!ui.mapEngineDiagnostics) return;
  const engineLabel = mapLibreEngineState.active ? "MapLibre Pilot" : "Legacy";
  const status = mapLibreEngineState.status || "unknown";
  const detail = mapLibreEngineState.error || (mapLibreEngineState.styleLoaded ? "style bereit" : "wartet");
  const movingFps = mapLibreEngineState.renderPhase === "active" ? mapLibreEngineState.movingFps.toFixed(0) : "idle";
  const movingFrame = mapLibreEngineState.renderPhase === "active" ? `${mapLibreEngineState.movingFrameMs.toFixed(1)} ms` : "—";
  const diagnosticZoom = mapLibreEngineState.map?.getZoom?.() ?? getMapLibreZoomFromGlobeZoom();
  // Diagnosekonvention: "Zoom" ist der exakte Schaltwert der Engine.
  // "Höhe" ist eine relative Kamerahöhe aus demselben Wert: groß = weit weg,
  // klein = nah. So können wir Schwellen präzise besprechen, ohne so zu tun,
  // als läge schon ein metrisches Höhenmodell vor.
  const diagnosticHeight = 1 / (2 ** diagnosticZoom);
  const statisticLayers = getEarthMapStatisticDebugInfo?.() || [];
  const activeStatisticLayers = statisticLayers.filter((layer) => layer.visible);
  const statisticRows = activeStatisticLayers.reduce((sum, layer) => sum + layer.rows, 0);
  const statisticMatches = activeStatisticLayers.reduce((sum, layer) => sum + layer.matches, 0);
  const statisticDrawable = activeStatisticLayers.reduce((sum, layer) => sum + layer.drawableMatches, 0);
  const statisticHydrating = activeStatisticLayers.some((layer) => layer.hydrationPending);
  const firstStatisticDraw = activeStatisticLayers
    .map((layer) => layer.lastStatisticDraw || null)
    .find(Boolean);
  const savedSearchLayers = (getActiveProject()?.dataLayers || [])
    .filter((layer) => layer?.kind === "gearbox-data-layer" && layer.origin === "search" && layer.visible !== false);
  const savedSearchRows = savedSearchLayers.reduce((sum, layer) => sum + (Array.isArray(layer.table?.rows) ? layer.table.rows.length : 0), 0);
  const savedSearchMatches = savedSearchLayers.reduce((sum, layer) => sum + (Array.isArray(layer.valueMatches) ? layer.valueMatches.length : 0), 0);
  const savedSearchDrawable = savedSearchLayers.reduce((sum, layer) => sum + (Array.isArray(layer.valueMatches)
    ? layer.valueMatches.filter((match) => hasDrawableBoundaryFeature(match?.feature)).length
    : 0), 0);
  const savedSearchHydrating = savedSearchLayers.some((layer) => layer._searchGeometryHydrationPending || layer._searchGeometryHydrationQueued);
  const savedSearchSkipped = savedSearchLayers.reduce((sum, layer) => sum + (Number(layer._searchRenderSkipped) || 0), 0);
  const savedSearchSkippedExamples = [...new Set(savedSearchLayers.flatMap((layer) => (
    Array.isArray(layer._searchRenderSkippedExamples) ? layer._searchRenderSkippedExamples : []
  )))].slice(0, 6);
  const yesNo = (value) => value ? "ja" : "nein";
  const savedSearchLast = savedSearchLayers
    .map((layer) => ({
      matched: Number(layer._searchHydrationLastMatched),
      missing: Number(layer._searchHydrationLastMissing),
      examples: Array.isArray(layer._searchHydrationLastMissingExamples) ? layer._searchHydrationLastMissingExamples : [],
      at: Number(layer._searchHydrationLastRunAt),
    }))
    .filter((entry) => Number.isFinite(entry.at))
    .sort((a, b) => b.at - a.at)[0] || null;
  const savedSearchNote = `${savedSearchRows} gespeicherte Zeilen · ${savedSearchDrawable}/${savedSearchMatches} drawable · Hydrierung ${yesNo(savedSearchHydrating)}${
    savedSearchLast
      ? ` · letzter Lauf ${savedSearchLast.matched}/${savedSearchLast.matched + savedSearchLast.missing}${savedSearchLast.examples.length ? ` · fehlt ${savedSearchLast.examples.join(", ")}` : ""}`
      : ""
  }${savedSearchSkipped ? ` · Render-Skip ${savedSearchSkipped}${savedSearchSkippedExamples.length ? ` (${savedSearchSkippedExamples.join(", ")})` : ""}` : ""}`;
  const visibleText = (value) => value ? "sichtbar" : "aus";
  const loadText = (value) => Number.isFinite(value) && value > 0 ? `${value.toFixed(1)} ms` : "—";
  const sourceText = (value) => value ? "bereit" : "—";
  const layerRow = ({ label, source, visible, features, load, note = "" }) => `
    <tr>
      <th scope="row">${label}</th>
      <td>${source}</td>
      <td>${visible}</td>
      <td>${features}</td>
      <td>${load}</td>
      <td>${note}</td>
    </tr>
  `;
  ui.mapEngineDiagnostics.innerHTML = `
    <strong>Engine</strong>
    <dl class="engine-diagnostics-summary">
      <dt>Pfad</dt><dd>${engineLabel}</dd>
      <dt>Status</dt><dd>${status}</dd>
      <dt>Render</dt><dd>${mapLibreEngineState.renderPhase}</dd>
      <dt>Zoom</dt><dd>${diagnosticZoom.toFixed(2)}</dd>
      <dt>Höhe</dt><dd>${diagnosticHeight.toFixed(4)} rel.</dd>
      <dt>FPS</dt><dd>${movingFps}</dd>
      <dt>Frame</dt><dd>${movingFrame}</dd>
      <dt>Letzter</dt><dd>${mapLibreEngineState.lastRenderGapMs.toFixed(0)} ms</dd>
      <dt>Quellen</dt><dd>${mapLibreEngineState.sourceCount}</dd>
      <dt>Layer</dt><dd>${mapLibreEngineState.layerCount}</dd>
    </dl>
    <table class="engine-diagnostics-layer-table">
      <thead>
        <tr><th>Layer</th><th>Quelle</th><th>Sicht</th><th>Feat.</th><th>Laden</th><th>Notiz</th></tr>
      </thead>
      <tbody>
        ${layerRow({
          label: "Land",
          source: sourceText(mapLibreEngineState.landSourceReady),
          visible: visibleText(mapLibreEngineState.landLayerVisible),
          features: mapLibreEngineState.landFeatureCount,
          load: loadText(mapLibreEngineState.landLoadMs),
          note: mapLibreEngineState.fullLandLoadMode || mapLibreEngineState.landSource,
        })}
        ${layerRow({
          label: "Küste",
          source: sourceText(mapLibreEngineState.landSourceReady),
          visible: visibleText(mapLibreEngineState.coastlineLayerVisible),
          features: mapLibreEngineState.landFeatureCount,
          load: "—",
          note: `${mapLibreEngineState.coastlineWidth.toFixed(2)} · ${mapLibreEngineState.coastlineColor || "—"}`,
        })}
        ${layerRow({
          label: "Wasser",
          source: sourceText(mapLibreEngineState.waterSourceReady),
          visible: visibleText(mapLibreEngineState.waterLayerVisible),
          features: mapLibreEngineState.waterFeatureCount,
          load: loadText(mapLibreEngineState.waterLoadMs),
          note: mapLibreEngineState.waterLoadMode,
        })}
        ${layerRow({
          label: "Admin0",
          source: sourceText(mapLibreEngineState.admin0BoundarySourceReady),
          visible: visibleText(mapLibreEngineState.admin0LayerVisible),
          features: mapLibreEngineState.admin0FeatureCount,
          load: loadText(mapLibreEngineState.admin0LoadMs),
          note: `${mapLibreEngineState.admin0LoadedChunks}/${mapLibreEngineState.admin0TotalChunks} Chunks`,
        })}
        ${layerRow({
          label: "Admin1",
          source: sourceText(mapLibreEngineState.admin1SourceReady),
          visible: visibleText(mapLibreEngineState.admin1LayerVisible),
          features: `${mapLibreEngineState.admin1FeatureCount}/${mapLibreEngineState.admin1LineFeatureCount}`,
          load: loadText(mapLibreEngineState.admin1LoadMs),
          note: `${mapLibreEngineState.admin1DemandMode} · ${mapLibreEngineState.admin1Iso3.join(",") || "—"}`,
        })}
        ${layerRow({
          label: "Suche",
          source: sourceText(mapLibreEngineState.searchHighlightSourceReady),
          visible: mapLibreEngineState.searchHighlightSourceReady ? "aktiv" : "aus",
          features: mapLibreEngineState.searchHighlightFeatures,
          load: "—",
          note: isStatisticalMapActive() && !savedSearchRows
            ? "durch Statistik blockiert"
            : `${savedSearchNote} · Suche ${mapLibreEngineState.searchResolveMs ? `${mapLibreEngineState.searchResolveMs.toFixed(0)} ms` : "—"}`,
        })}
        ${layerRow({
          label: "Statistik",
          source: activeStatisticLayers.length ? "Projekt" : "—",
          visible: activeStatisticLayers.length ? "aktiv" : "aus",
          features: `${statisticDrawable}/${statisticMatches}`,
          load: "—",
          note: `${statisticRows} Werte · Hydrierung ${yesNo(statisticHydrating)}${firstStatisticDraw ? ` · gezeichnet ${firstStatisticDraw.drawn}/${firstStatisticDraw.attempted}` : ""}`,
        })}
      </tbody>
    </table>
    <dl class="engine-diagnostics-summary engine-diagnostics-note">
      <dt>Hinweis</dt><dd>${detail}</dd>
    </dl>
  `;
}

function updateMapLibreDiagnosticsFrame() {
  const now = performance.now();
  if (mapLibreEngineState.lastFrameAt) {
    const delta = now - mapLibreEngineState.lastFrameAt;
    mapLibreEngineState.lastRenderGapMs = delta;
    if (now - mapLibreEngineState.lastCameraSyncAt < 450 && delta < 220) {
      mapLibreEngineState.renderPhase = "active";
      mapLibreEngineState.movingFrameMs = delta;
      mapLibreEngineState.movingFps = delta > 0 ? 1000 / delta : 0;
    } else if (mapLibreEngineState.renderPhase !== "style") {
      mapLibreEngineState.renderPhase = "idle";
    }
  }
  mapLibreEngineState.lastFrameAt = now;
  mapLibreEngineState.frameCount += 1;
  if (now - mapLibreEngineState.lastDiagnosticsAt < 250) return;
  mapLibreEngineState.lastDiagnosticsAt = now;
  const style = mapLibreEngineState.map?.getStyle?.();
  mapLibreEngineState.sourceCount = style?.sources ? Object.keys(style.sources).length : 0;
  mapLibreEngineState.layerCount = style?.layers?.length || 0;
  mapLibreEngineState.landSourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_LAND_SOURCE_ID));
  const landLayer = mapLibreEngineState.map?.getLayer?.(MAPLIBRE_LAND_FILL_LAYER_ID);
  const landVisibility = landLayer ? mapLibreEngineState.map?.getLayoutProperty?.(MAPLIBRE_LAND_FILL_LAYER_ID, "visibility") : "none";
  mapLibreEngineState.landLayerVisible = Boolean(landLayer) && landVisibility !== "none";
  const coastlineLayer = mapLibreEngineState.map?.getLayer?.(MAPLIBRE_COASTLINE_LAYER_ID);
  const coastlineVisibility = coastlineLayer ? mapLibreEngineState.map?.getLayoutProperty?.(MAPLIBRE_COASTLINE_LAYER_ID, "visibility") : "none";
  mapLibreEngineState.coastlineLayerVisible = Boolean(coastlineLayer) && coastlineVisibility !== "none";
  mapLibreEngineState.waterSourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_WATER_SOURCE_ID));
  const waterLayer = mapLibreEngineState.map?.getLayer?.(MAPLIBRE_WATER_FILL_LAYER_ID);
  const waterVisibility = waterLayer ? mapLibreEngineState.map?.getLayoutProperty?.(MAPLIBRE_WATER_FILL_LAYER_ID, "visibility") : "none";
  mapLibreEngineState.waterLayerVisible = Boolean(waterLayer) && waterVisibility !== "none";
  mapLibreEngineState.admin0SourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_ADMIN0_SOURCE_ID));
  mapLibreEngineState.admin0BoundarySourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_ADMIN0_BOUNDARY_SOURCE_ID));
  const admin0Layer = mapLibreEngineState.map?.getLayer?.(MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID);
  const admin0Visibility = admin0Layer ? mapLibreEngineState.map?.getLayoutProperty?.(MAPLIBRE_ADMIN0_BOUNDARY_LAYER_ID, "visibility") : "none";
  mapLibreEngineState.admin0LayerVisible = Boolean(admin0Layer) && admin0Visibility !== "none";
  mapLibreEngineState.admin1SourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_ADMIN1_SOURCE_ID));
  const admin1Layer = mapLibreEngineState.map?.getLayer?.(MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID);
  const admin1Visibility = admin1Layer ? mapLibreEngineState.map?.getLayoutProperty?.(MAPLIBRE_ADMIN1_BOUNDARY_LAYER_ID, "visibility") : "none";
  mapLibreEngineState.admin1LayerVisible = Boolean(admin1Layer) && admin1Visibility !== "none";
  mapLibreEngineState.searchHighlightSourceReady = Boolean(mapLibreEngineState.map?.getSource?.(MAPLIBRE_SEARCH_HIGHLIGHT_SOURCE_ID));
  if (!mapLibreEngineState.searchHighlightSourceReady) mapLibreEngineState.searchHighlightFeatures = 0;
  renderMapEngineDiagnostics();
}

function syncMapLibreCamera() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  const center = [normalizeLongitude(rotation.lon), clamp(rotation.lat, -85, 85)];
  const zoom = getMapLibreZoomFromGlobeZoom();
  try {
    mapLibreEngineState.lastCameraSyncAt = performance.now();
    mapLibreEngineState.renderPhase = "active";
    map.jumpTo({
      center,
      zoom,
      bearing: 0,
      pitch: 0,
    });
    document.body.classList.toggle("earthmap-globe-outline-visible", false);
    maybeRequestMapLibrePilotFullLandLayer(zoom);
    maybeRequestMapLibrePilotWaterLayer(zoom);
    scheduleMapLibreAdmin1ViewportSync();
  } catch (error) {
    mapLibreEngineState.status = "camera-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
  }
}

function syncMapLibreTheme() {
  const map = mapLibreEngineState.map;
  if (!map) return;
  try {
    map.setStyle(getEarthMapMapLibreStyle(), { diff: false });
    mapLibreEngineState.styleLoaded = false;
    mapLibreEngineState.status = "restyling";
    mapLibreEngineState.renderPhase = "style";
    map.once("styledata", () => {
      mapLibreEngineState.styleLoaded = true;
      applyMapLibreProjection();
      installMapLibrePilotLandLayer(mapLibreEngineState.fullLandGeoJson?.features?.length ? "full" : "start");
      if (mapLibreEngineState.waterGeoJson?.features?.length) installMapLibrePilotWaterLayer();
      if (mapLibreEngineState.admin0BoundaryGeoJson?.features?.length) installMapLibrePilotAdmin0Layer();
      syncMapLibreSearchHighlight();
      void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
      syncMapLibreCamera();
      scheduleMapLibreAdmin1ViewportSync(650);
    });
    renderMapEngineDiagnostics();
  } catch (error) {
    mapLibreEngineState.status = "style-error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
  }
}

function initializeMapLibreEnginePilot() {
  if (!ui.mapLibreContainer) return;
  if (!window.maplibregl?.Map) {
    mapLibreEngineState.status = "unavailable";
    mapLibreEngineState.error = "MapLibre nicht geladen";
    renderMapEngineDiagnostics();
    return;
  }
  if (mapLibreEngineState.map) return;
  try {
    mapLibreEngineState.map = new window.maplibregl.Map({
      container: ui.mapLibreContainer,
      style: getEarthMapMapLibreStyle(),
      interactive: false,
      attributionControl: false,
      center: [normalizeLongitude(rotation.lon), clamp(rotation.lat, -85, 85)],
      zoom: getMapLibreZoomFromGlobeZoom(),
      pitch: 0,
      bearing: 0,
    });
    mapLibreEngineState.active = true;
    mapLibreEngineState.status = "loading";
    ui.mapLibreContainer.classList.add("is-active");
    ui.globe?.classList.add("is-maplibre-pilot");
    document.documentElement.dataset.geoEngineV2 = EARTHMAP_RENDER_ENGINE_V2;
    mapLibreEngineState.map.on("load", () => {
      mapLibreEngineState.status = "ready";
      mapLibreEngineState.styleLoaded = true;
      applyMapLibreProjection();
      installMapLibrePilotLandLayer();
      requestMapLibrePilotWaterLayer("major");
      requestMapLibrePilotAdmin0Layer();
      syncMapLibreCamera();
      updateMapLibreDiagnosticsFrame();
    });
    mapLibreEngineState.map.on("render", updateMapLibreDiagnosticsFrame);
    mapLibreEngineState.map.on("idle", () => {
      mapLibreEngineState.renderPhase = "idle";
      updateMapLibreDiagnosticsFrame();
    });
    mapLibreEngineState.map.on("error", (event) => {
      mapLibreEngineState.status = "error";
      mapLibreEngineState.error = event?.error?.message || "MapLibre-Fehler";
      renderMapEngineDiagnostics();
    });
  } catch (error) {
    mapLibreEngineState.status = "error";
    mapLibreEngineState.error = error?.message || String(error);
    renderMapEngineDiagnostics();
  }
  renderMapEngineDiagnostics();
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("EarthMap WebGL shader error", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    uniform float u_lon;
    uniform float u_lat;
    uniform float u_scaleX;
    uniform float u_scaleY;
    uniform float u_depthScale;
    varying vec2 v_uv;
    varying float v_light;
    varying float v_rim;
    void main() {
      float lon = radians(u_lon);
      float lat = radians(-u_lat);
      float cosLon = cos(lon);
      float sinLon = sin(lon);
      vec3 p = vec3(
        a_position.x * cosLon + a_position.z * sinLon,
        a_position.y,
        -a_position.x * sinLon + a_position.z * cosLon
      );
      float cosLat = cos(lat);
      float sinLat = sin(lat);
      vec3 r = vec3(
        p.x,
        p.y * cosLat - p.z * sinLat,
        p.y * sinLat + p.z * cosLat
      );
      gl_Position = vec4(r.x * u_scaleX, r.y * u_scaleY, -r.z * u_depthScale, 1.0);
      v_uv = a_uv;
      v_light = clamp(0.98 + r.z * 0.035 + r.y * 0.012 - r.x * 0.008, 0.92, 1.03);
      v_rim = smoothstep(0.58, 1.0, 1.0 - max(0.0, r.z));
    }
  `);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    uniform sampler2D u_map;
    uniform vec4 u_color;
    uniform int u_useTexture;
    varying vec2 v_uv;
    varying float v_light;
    varying float v_rim;
    void main() {
      vec4 base = u_useTexture == 1 ? texture2D(u_map, v_uv) : u_color;
      vec3 shaded = base.rgb * v_light;
      shaded = mix(shaded, vec3(0.90, 0.90, 0.87), v_rim * 0.055);
      gl_FragColor = vec4(shaded, base.a);
    }
  `);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("EarthMap WebGL program error", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function lonLatToSpherePoint(lon, lat, radius = 1) {
  const lambda = lon * DEG;
  const phi = lat * DEG;
  const cosPhi = Math.cos(phi);
  return [
    radius * cosPhi * Math.sin(lambda),
    radius * Math.sin(phi),
    radius * cosPhi * Math.cos(lambda),
  ];
}

function createSphereVertices(segments = 96, rings = 48, radius = 1) {
  const vertices = [];
  const pushVertex = (lon, lat) => {
    vertices.push(
      ...lonLatToSpherePoint(lon, lat, radius),
      (lon + 180) / 360,
      (90 - lat) / 180,
    );
  };
  for (let latIndex = 0; latIndex < rings; latIndex += 1) {
    const latA = -90 + (latIndex / rings) * 180;
    const latB = -90 + ((latIndex + 1) / rings) * 180;
    for (let lonIndex = 0; lonIndex < segments; lonIndex += 1) {
      const lonA = -180 + (lonIndex / segments) * 360;
      const lonB = -180 + ((lonIndex + 1) / segments) * 360;
      pushVertex(lonA, latA);
      pushVertex(lonB, latA);
      pushVertex(lonB, latB);
      pushVertex(lonA, latA);
      pushVertex(lonB, latB);
      pushVertex(lonA, latB);
    }
  }
  return new Float32Array(vertices);
}

function getRingCentroid(ring) {
  const open = ring.slice(0, -1);
  const sum = open.reduce((acc, [lon, lat]) => ({ lon: acc.lon + lon, lat: acc.lat + lat }), { lon: 0, lat: 0 });
  const count = Math.max(1, open.length);
  return [sum.lon / count, sum.lat / count];
}

function ringToSphereFanVertices(ring, radius = 1.003) {
  const cleanRing = sanitizeRing(ring);
  if (cleanRing.length < 4) return [];
  const [centerLon, centerLat] = getRingCentroid(cleanRing);
  const centerPoint = lonLatToSpherePoint(centerLon, centerLat, radius);
  const vertices = [];
  for (let index = 0; index < cleanRing.length - 1; index += 1) {
    vertices.push(
      ...centerPoint,
      ...lonLatToSpherePoint(cleanRing[index][0], cleanRing[index][1], radius),
      ...lonLatToSpherePoint(cleanRing[index + 1][0], cleanRing[index + 1][1], radius),
    );
  }
  return vertices;
}

function geoJsonToSphereVertices(geojson, radius = 1.003) {
  const vertices = [];
  extractLandRings(geojson).forEach((ring) => {
    vertices.push(...ringToSphereFanVertices(densifyRing(ring, 0.85), radius));
  });
  return new Float32Array(vertices);
}

function geoJsonToSphereLineVertices(geojson, radius = 1.006) {
  const vertices = [];
  extractLandRings(geojson).forEach((ring) => {
    const denseRing = densifyRing(ring, 0.85);
    for (let index = 0; index < denseRing.length - 1; index += 1) {
      vertices.push(
        ...lonLatToSpherePoint(denseRing[index][0], denseRing[index][1], radius),
        ...lonLatToSpherePoint(denseRing[index + 1][0], denseRing[index + 1][1], radius),
      );
    }
  });
  return new Float32Array(vertices);
}

function preparedSurfaceToSphereVertices(preparedSurface, radius = 1.003) {
  const vertices = [];
  (preparedSurface?.fillRings || []).forEach((ring) => {
    vertices.push(...ringToSphereFanVertices(ring, radius));
  });
  return new Float32Array(vertices);
}

function preparedSurfaceToSphereLineVertices(preparedSurface, radius = 1.006) {
  const vertices = [];
  (preparedSurface?.outlineRings || []).forEach((ring) => {
    for (let index = 0; index < ring.length - 1; index += 1) {
      vertices.push(
        ...lonLatToSpherePoint(ring[index][0], ring[index][1], radius),
        ...lonLatToSpherePoint(ring[index + 1][0], ring[index + 1][1], radius),
      );
    }
  });
  return new Float32Array(vertices);
}

function createWebglMesh(vertices) {
  const gl = webglState.gl;
  if (!gl || !vertices?.length) return null;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  return { buffer, vertexCount: vertices.length / 3 };
}

function deleteWebglMesh(mesh) {
  if (mesh?.buffer && webglState.gl) webglState.gl.deleteBuffer(mesh.buffer);
}

function getWebglTextureSize() {
  return Math.min(webglState.maxTextureSize || 1024, 1024);
}

function createEarthMapTextureCanvas(textureWidth = getWebglTextureSize()) {
  const canvas = document.createElement("canvas");
  canvas.width = textureWidth;
  canvas.height = Math.floor(textureWidth / 2);
  const textureContext = canvas.getContext("2d");
  textureContext.fillStyle = getContinentalRenderStyle().sea;
  textureContext.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

function updateWebglMapTexture() {
  const gl = webglState.gl;
  const textureSize = getWebglTextureSize();
  const signature = `water-sphere|${textureSize}|${getActiveContinentalMapId()}|${document.body.classList.contains("earthmap-theme-dark") ? "dark" : "light"}`;
  if (signature === webglState.mapTextureSignature && webglState.mapTexture) return;
  const textureCanvas = createEarthMapTextureCanvas(textureSize);
  if (!webglState.mapTexture) webglState.mapTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, webglState.mapTexture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  webglState.mapTextureSignature = signature;
  webglState.mapTextureSize = textureSize;
}

function initWebglRenderer() {
  const gl = webglState.canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  if (!gl) return false;
  webglState.gl = gl;
  webglState.maxTextureSize = Math.min(8192, gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096);
  webglState.program = createProgram(gl);
  if (!webglState.program) return false;
  webglState.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, webglState.positionBuffer);
  const sphereVertices = createSphereVertices();
  gl.bufferData(gl.ARRAY_BUFFER, sphereVertices, gl.STATIC_DRAW);
  webglState.sphereVertexCount = sphereVertices.length / 5;
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  webglState.canvas.id = "globeWebglCanvas";
  webglState.canvas.className = "globe-webgl-canvas";
  webglState.canvas.setAttribute("aria-hidden", "true");
  ui.globe.appendChild(webglState.canvas);
  ui.globeCanvas.classList.add("is-webgl-hidden");
  webglState.ready = true;
  document.documentElement.dataset.geoEngine = "webgl-sphere";
  return true;
}

function getRenderableLandGeoJson() {
  return getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
}

function updateWebglLandMesh() {
  const source = getRenderableLandGeoJson();
  const signature = `${activeNaturalEarthTileSignature}|${source?.features?.length || 0}|${Boolean(source?._earthMapWebglLandVertices)}|${Boolean(source?._earthMapWebglLineVertices)}`;
  if (!source || signature === webglState.landSignature) return;
  deleteWebglMesh(webglState.landMesh);
  deleteWebglMesh(webglState.landLineMesh);
  const landVertices = source._earthMapWebglLandVertices || geoJsonToSphereVertices(source, 1.003);
  const lineVertices = source._earthMapWebglLineVertices || geoJsonToSphereLineVertices(source, 1.006);
  webglState.landMesh = createWebglMesh(landVertices);
  webglState.landLineMesh = createWebglMesh(lineVertices);
  webglState.landSignature = signature;
}

function getLayerMeshSignature(items) {
  const dataset = getNaturalEarthCountryDataset();
  const threshold = dataset.detail === "10m" ? getNaturalEarth10mDetailThreshold().toFixed(5) : "fallback";
  return items.map((item) => `${item.id}:${item.iso3}:${item.boundarySet?.features?.length || 0}:${item.display?.color || ""}`).join("|") + `|${dataset.detail}|${threshold}`;
}

function updateWebglLayerMeshes() {
  const items = getVisibleProjectBoundaryItems();
  const signature = getLayerMeshSignature(items);
  if (signature === webglState.layerSignature) return;
  webglState.layerMeshes.forEach(deleteWebglMesh);
  webglState.layerMeshes.clear();
  items.forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;
    const mesh = createWebglMesh(geoJsonToSphereVertices({ type: "FeatureCollection", features }, 1.008));
    const color = getMapLayerFillColor(item.display?.color);
    if (mesh && color) webglState.layerMeshes.set(item.id, { mesh, color });
  });
  webglState.layerSignature = signature;
}

function hexToVectorColor(hex, alpha = 1) {
  const normalized = normalizeColorValue(hex, "#b8b8b4") || "#b8b8b4";
  const value = Number.parseInt(normalized.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255, alpha];
}

function styleColorToVectorColor(color, fallback = "#b8b8b4", alpha = 1) {
  return hexToVectorColor(normalizeColorValue(color, fallback) || fallback, alpha);
}

function drawWebglMesh(mesh, color, depthScale = 0.62, mode = null) {
  const gl = webglState.gl;
  const program = webglState.program;
  if (!mesh?.vertexCount) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  const uvLocation = gl.getAttribLocation(program, "a_uv");
  if (uvLocation >= 0) gl.disableVertexAttribArray(uvLocation);
  gl.uniform4fv(gl.getUniformLocation(program, "u_color"), color);
  gl.uniform1i(gl.getUniformLocation(program, "u_useTexture"), 0);
  gl.uniform1f(gl.getUniformLocation(program, "u_lon"), rotation.lon);
  gl.uniform1f(gl.getUniformLocation(program, "u_lat"), rotation.lat);
  const width = Math.max(1, webglState.canvas.width);
  const height = Math.max(1, webglState.canvas.height);
  const fit = Math.min(width, height);
  const zoomScale = 0.94 * globeZoom;
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleX"), zoomScale * (fit / width));
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleY"), zoomScale * (fit / height));
  gl.uniform1f(gl.getUniformLocation(program, "u_depthScale"), depthScale);
  gl.drawArrays(mode || gl.TRIANGLES, 0, mesh.vertexCount);
}

function drawWebglLandSurface() {
  if (!shouldRenderContinentalBaseMap()) return false;
  updateWebglLandMesh();
  const style = getContinentalRenderStyle();
  const gl = webglState.gl;
  const hasLandMesh = Boolean(webglState.landMesh?.vertexCount);
  const hasLineMesh = Boolean(webglState.landLineMesh?.vertexCount);
  if (hasLandMesh) {
    drawWebglMesh(webglState.landMesh, styleColorToVectorColor(style.land, "#c4c4c0", 1), 0.62, gl.TRIANGLES);
  }
  if (hasLineMesh && !isNavigatingGlobe) {
    drawWebglMesh(webglState.landLineMesh, styleColorToVectorColor(style.outline, "#5c605e", 1), 0.62, gl.LINES);
  }
  return hasLandMesh;
}

function drawWebglTexturedSphere() {
  const gl = webglState.gl;
  const program = webglState.program;
  gl.bindBuffer(gl.ARRAY_BUFFER, webglState.positionBuffer);
  const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const uvLocation = gl.getAttribLocation(program, "a_uv");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(uvLocation);
  gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
  gl.uniform1i(gl.getUniformLocation(program, "u_useTexture"), 1);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, webglState.mapTexture);
  gl.uniform1i(gl.getUniformLocation(program, "u_map"), 0);
  gl.uniform1f(gl.getUniformLocation(program, "u_lon"), rotation.lon);
  gl.uniform1f(gl.getUniformLocation(program, "u_lat"), rotation.lat);
  const width = Math.max(1, webglState.canvas.width);
  const height = Math.max(1, webglState.canvas.height);
  const fit = Math.min(width, height);
  const zoomScale = 0.94 * globeZoom;
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleX"), zoomScale * (fit / width));
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleY"), zoomScale * (fit / height));
  gl.uniform1f(gl.getUniformLocation(program, "u_depthScale"), 0.62);
  gl.drawArrays(gl.TRIANGLES, 0, webglState.sphereVertexCount);
}

function drawProjectedOutlineRings(geojson, radius, center, strokeStyle, lineWidth, maxStep = 0.9) {
  const rings = extractLandRings(geojson);
  if (!rings.length) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  rings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, maxStep), radius, center, strokeStyle, lineWidth);
  });
  ctx.restore();
}

function drawWebglMapOutlines(radius, center) {
  // Outlines sind optisch hilfreich, aber rechnerisch teuer, weil sie aus
  // vielen Lon/Lat-Ringen in Screen-Kurven übersetzt werden. Während aktiver
  // Bewegung verzichten wir darauf; die Vektorflächen liefern bereits eine
  // saubere Lesefassung, die feinen Linien erscheinen nach der Ruhephase.
  if (isNavigatingGlobe && globeZoom > 1.35) return;
  const source = shouldRenderContinentalBaseMap() ? getRenderableLandGeoJson() : null;
  if (source) {
    drawProjectedOutlineRings(source, radius, center, getContinentalRenderStyle().outline, 1.05, 0.85);
  }

  getVisibleProjectBoundaryItems().forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;
    const outlineColor = getMapBoundaryColor(item.display?.outlineColor);
    if (outlineColor) drawProjectedOutlineRings({ type: "FeatureCollection", features }, radius, center, hexToRgba(outlineColor, 0.95), 1.25, 0.65);
  });
}

function drawVectorMapSurface(radius, center) {
  if (!shouldRenderContinentalBaseMap()) return false;
  if (!hasD3Geo) return false;
  const source = getRenderableLandGeoJson();
  if (!source?.features?.length) return false;
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  drawGeographicLayer(radius, center);
  ctx.restore();
  return true;
}

function drawWebglAtmosphereOverlay(width, height, dpr, usedWebglLandSurface = false) {
  const cssWidth = Math.max(1, Math.floor(width / dpr));
  const cssHeight = Math.max(1, Math.floor(height / dpr));
  const baseSize = Math.min(cssWidth, cssHeight);
  const radius = baseSize * 0.47 * globeZoom;
  const center = { x: cssWidth / 2, y: cssHeight / 2 };
  ui.globeCanvas.width = Math.floor(cssWidth * dpr);
  ui.globeCanvas.height = Math.floor(cssHeight * dpr);
  ui.globeCanvas.style.width = `${cssWidth}px`;
  ui.globeCanvas.style.height = `${cssHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const rim = ctx.createRadialGradient(
    center.x - radius * 0.16,
    center.y - radius * 0.18,
    radius * 0.62,
    center.x,
    center.y,
    radius * 1.02,
  );
  rim.addColorStop(0, "rgba(255,255,255,0)");
  rim.addColorStop(0.72, "rgba(255,255,255,0)");
  rim.addColorStop(0.92, "rgba(170,176,171,.055)");
  rim.addColorStop(1, "rgba(108,116,111,.11)");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = rim;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1.2, baseSize * 0.0032);
  ctx.strokeStyle = "rgba(118,126,121,.30)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center.x, center.y, radius + Math.max(1, baseSize * 0.002), 0, Math.PI * 2);
  ctx.lineWidth = Math.max(0.8, baseSize * 0.0016);
  ctx.strokeStyle = "rgba(255,255,255,.48)";
  ctx.stroke();

  // Renderregel: Die Grundlandmasse wird im WebGL-Pfad nicht mehr über Canvas
  // gefüllt. Canvas bleibt hier für Atmosphäre, Markierungen und Annotationen.
  // Dadurch hängt die Interaktionsgeschwindigkeit nicht mehr an der Zahl der
  // Küstenvektoren, die in jedem Frame neu auf die Kugel projiziert würden.
  const usedVectorSurface = Boolean(usedWebglLandSurface);
  if (!usedVectorSurface) drawVectorMapSurface(radius, center);
  drawMapSearchHighlights(radius, center, { contextOnly: true });
  drawProjectBoundaryLayers(radius, center);
  drawStatisticalDataLayer(radius, center);
  drawMapSearchHighlights(radius, center, { focusOnly: true });
  // Layerregel: Gewässer schneiden thematische Länderflächen optisch aus. Eine
  // Länderhervorhebung darf Seen oder Binnenmeere nicht überdecken.
  if (shouldRenderContinentalBaseMap()) drawNaturalEarthLakeLayer(radius, center);
  if (shouldRenderContinentalBaseMap()) drawNaturalEarthAdmin0BoundaryLayer(radius, center);
  drawNaturalEarthAdmin1BoundaryLayer(radius, center);
  if (shouldRenderContinentalBaseMap() && !webglState.landLineMesh) drawNaturalEarthCoastlineOverlay(radius, center);
  if (state.showGraticule) drawGraticule(radius, center);
  if (!usedVectorSurface) drawWebglMapOutlines(radius, center);
}

function renderWebglGlobe() {
  if (!webglState.ready && !initWebglRenderer()) return false;
  const rect = ui.globe.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  webglState.canvas.width = Math.floor(width * dpr);
  webglState.canvas.height = Math.floor(height * dpr);
  webglState.canvas.style.width = `${width}px`;
  webglState.canvas.style.height = `${height}px`;

  updateWebglMapTexture();

  const gl = webglState.gl;
  gl.viewport(0, 0, webglState.canvas.width, webglState.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(webglState.program);
  drawWebglTexturedSphere();
  const usedWebglLandSurface = drawWebglLandSurface();
  drawWebglAtmosphereOverlay(webglState.canvas.width, webglState.canvas.height, dpr, usedWebglLandSurface);
  return true;
}

function getLoadedNaturalEarthLand(level) {
  const config = NATURAL_EARTH_LAND_DETAILS[level];
  return config ? window.EarthMapNaturalEarthData?.[config.key] || null : null;
}

function getDesiredNaturalEarthDetailLevel() {
  // Architekturregel: Die moderne Küsten-/Landdarstellung hat nur eine
  // autoritative Quelle: Natural Earth 10m. Alle sichtbaren Detailstufen sind
  // automatisch generalisierte Ableitungen dieser Master-Geometrie.
  return "10m";
}

function normalizeLongitude(lon) {
  let value = lon;
  while (value < -180) value += 360;
  while (value > 180) value -= 360;
  return value;
}

function getBufferedViewportBounds() {
  const rect = ui.globe.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const baseSize = Math.min(width, height);
  const radius = baseSize * 0.47 * globeZoom;
  const viewportHalfLon = Math.asin(clamp(width / (2 * radius), 0, 1)) / DEG;
  const viewportHalfLat = Math.asin(clamp(height / (2 * radius), 0, 1)) / DEG;
  const bufferedHalfLon = clamp(viewportHalfLon * 3, 8, 180);
  const bufferedHalfLat = clamp(viewportHalfLat * 3, 8, 90);
  const centerLon = normalizeLongitude(-rotation.lon);
  const centerLat = clamp(-rotation.lat, -90, 90);
  const minLat = clamp(centerLat - bufferedHalfLat, -90, 90);
  const maxLat = clamp(centerLat + bufferedHalfLat, -90, 90);
  const minLon = centerLon - bufferedHalfLon;
  const maxLon = centerLon + bufferedHalfLon;
  const lonSegments = minLon < -180
    ? [[minLon + 360, 180], [-180, maxLon]]
    : maxLon > 180
      ? [[minLon, 180], [-180, maxLon - 360]]
      : [[minLon, maxLon]];
  return { minLat, maxLat, lonSegments };
}

function tileIntersectsViewport(tile, bounds) {
  const latIntersects = tile.minLat <= bounds.maxLat && tile.maxLat >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => tile.minLon <= maxLon && tile.maxLon >= minLon);
}

function getNaturalEarth10mTileIndex() {
  return window.EarthMapNaturalEarthTileIndex?.[NATURAL_EARTH_LAND_DETAILS["10m"].key] || null;
}

function getNaturalEarth10mDetailThreshold() {
  const index = getNaturalEarth10mTileIndex();
  const thresholds = index?.thresholds || [];
  if (!thresholds.length) return 0.02;
  let current = thresholds[0].importance;
  for (const entry of thresholds) {
    if (globeZoom >= entry.zoom) current = entry.importance;
    else break;
  }
  return current;
}

function getNaturalEarthSurfaceDensity() {
  return globeZoom > 7 ? 0.45 : 0.9;
}

function resetNaturalEarthSurfaceCache() {
  naturalEarthSurfaceCache.signature = "";
  naturalEarthSurfaceCache.fillRings = [];
  naturalEarthSurfaceCache.outlineRings = [];
}

function createPreparedNaturalEarthSurface(source, density = getNaturalEarthSurfaceDensity()) {
  const rings = extractLandRings(source);
  return {
    density,
    fillRings: rings.map((ring) => densifyRing(ring, density)),
    outlineRings: rings.map((ring) => densifyRing(ring, globeZoom > 7 ? 0.45 : 0.85)),
  };
}

async function createPreparedNaturalEarthSurfaceInBatches(source, taskContext = {}, density = getNaturalEarthSurfaceDensity()) {
  const rings = await extractLandRingsInBatches(source, taskContext);
  if (!rings) return null;
  const fillRings = [];
  const outlineRings = [];
  for (let index = 0; index < rings.length; index += 1) {
    if (taskContext.shouldPause?.()) return null;
    const ring = rings[index];
    fillRings.push(densifyRing(ring, density));
    outlineRings.push(densifyRing(ring, globeZoom > 7 ? 0.45 : 0.85));
    if (index % 24 === 0) await taskContext.yield?.();
  }
  return { density, fillRings, outlineRings };
}

function getSurfaceBudgetSignature() {
  if (globeZoom < 2.4) return "surface-xl";
  if (globeZoom < 4.2) return "surface-l";
  if (globeZoom < 7) return "surface-m";
  return "surface-s";
}

function getNaturalEarthSurfaceFeatureBudget() {
  const mobileFactor = window.matchMedia?.("(max-width: 760px)")?.matches ? 0.58 : 1;
  const base = globeZoom < 2.4 ? 420
    : globeZoom < 4.2 ? 760
      : globeZoom < 7 ? 1250
        : globeZoom < 12 ? 1900
          : 2800;
  return Math.max(260, Math.round(base * mobileFactor));
}

function getVisibleNaturalEarth10mTiles() {
  const index = getNaturalEarth10mTileIndex();
  if (!index?.tiles?.length) return [];
  const bounds = getBufferedViewportBounds();
  return index.tiles.filter((tile) => tileIntersectsViewport(tile, bounds));
}

function getNaturalEarth10mTileDataKey(tile) {
  return `10m-land-hierarchy-${tile.key}`;
}

function getNaturalEarthGlobalTile() {
  const index = getNaturalEarth10mTileIndex();
  if (window.EarthMapNaturalEarthTileData?.["10m-land-hierarchy-global-start"]) {
    return { key: "global-start", file: "ne_10m_land_hierarchy_global_start.js", isGlobal: true };
  }
  return index?.global ? { ...index.global, isGlobal: true } : null;
}

function getNaturalEarthTileLoadLimit() {
  return window.matchMedia?.("(max-width: 760px)")?.matches ? 1 : 2;
}

function queueNaturalEarthTileLoads(tiles) {
  let added = false;
  tiles.forEach((tile) => {
    const key = tile.isGlobal ? `10m-land-hierarchy-${tile.key}` : getNaturalEarth10mTileDataKey(tile);
    if (window.EarthMapNaturalEarthTileData?.[key]) return;
    if (pendingNaturalEarthTiles.has(key)) return;
    if (naturalEarthTileLoadQueue.some((entry) => entry.key === key)) return;
    naturalEarthTileLoadQueue.push({ key, tile });
    pendingNaturalEarthTiles.add(key);
    added = true;
  });
  if (added) runNaturalEarthTileLoadQueue();
}

function runNaturalEarthTileLoadQueue() {
  if (isNavigatingGlobe) {
    scheduleNaturalEarthDetailUpdate(520);
    return;
  }
  const limit = getNaturalEarthTileLoadLimit();
  while (naturalEarthTileLoadActiveCount < limit && naturalEarthTileLoadQueue.length) {
    const entry = naturalEarthTileLoadQueue.shift();
    if (!entry) return;
    const { key, tile } = entry;
    if (window.EarthMapNaturalEarthTileData?.[key]) {
      pendingNaturalEarthTiles.delete(key);
      continue;
    }
    naturalEarthTileLoadActiveCount += 1;
    const script = document.createElement("script");
    script.src = `${NATURAL_EARTH_LAND_DETAILS["10m"].tileBasePath}${tile.file}?v=20260628h`;
    script.async = true;
    script.onload = () => {
      naturalEarthTileLoadActiveCount = Math.max(0, naturalEarthTileLoadActiveCount - 1);
      pendingNaturalEarthTiles.delete(key);
      scheduleNaturalEarthDetailUpdate(180);
      if (!isNaturalEarthTileWorkPending()) runEarthMapBackgroundTaskQueue();
      runWhenIdle(runNaturalEarthTileLoadQueue, 420);
    };
    script.onerror = () => {
      naturalEarthTileLoadActiveCount = Math.max(0, naturalEarthTileLoadActiveCount - 1);
      pendingNaturalEarthTiles.delete(key);
      console.warn(`Natural-Earth-10m-Hierarchie-Tile ${key} konnte nicht geladen werden.`);
      if (!isNaturalEarthTileWorkPending()) runEarthMapBackgroundTaskQueue();
      runWhenIdle(runNaturalEarthTileLoadQueue, 700);
    };
    document.head.appendChild(script);
  }
}

function isNaturalEarthTileWorkPending() {
  return naturalEarthTileLoadActiveCount > 0
    || naturalEarthTileLoadQueue.length > 0
    || pendingNaturalEarthTiles.size > 0
    || Boolean(pendingNaturalEarthTileBuildSignature);
}

function decodeHierarchicalRing(ring, threshold) {
  const decoded = (ring || [])
    .filter((point, index) => index === 0 || index === ring.length - 1 || Number(point?.[2] || 0) >= threshold)
    .map(([lon, lat]) => [lon, lat]);
  if (decoded.length < 4) return [];
  const first = decoded[0];
  const last = decoded[decoded.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) decoded.push(first);
  return decoded;
}

function getRingPlanarArea(ring) {
  if (!Array.isArray(ring) || ring.length < 4) return 0;
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const current = ring[index];
    const next = ring[index + 1];
    area += (current[0] * next[1]) - (next[0] * current[1]);
  }
  return Math.abs(area / 2);
}

function getApproxFeaturePixelMetrics(feature) {
  const bbox = feature?.bbox;
  if (!Array.isArray(bbox) || bbox.length < 4) {
    return { width: Infinity, height: Infinity, area: Infinity };
  }
  const rect = ui.globe.getBoundingClientRect();
  const baseSize = Math.max(1, Math.min(rect.width || 1, rect.height || 1));
  const radius = baseSize * 0.47 * globeZoom;
  const midLat = ((bbox[1] || 0) + (bbox[3] || 0)) / 2;
  const lonScale = Math.max(0.18, Math.cos(midLat * DEG));
  const pxPerDegree = radius * DEG;
  const width = Math.abs(normalizeLonDelta((bbox[2] || 0) - (bbox[0] || 0))) * lonScale * pxPerDegree;
  const height = Math.abs((bbox[3] || 0) - (bbox[1] || 0)) * pxPerDegree;
  return { width, height, area: width * height };
}

function isRenderableSurfaceFeature(feature, outerRing) {
  const metrics = getApproxFeaturePixelMetrics(feature);
  const ringArea = getRingPlanarArea(outerRing);
  const pointCount = Math.max(0, (outerRing?.length || 0) - 1);

  // Oberflächenbudget: Küsten, Inseln, Atolle und Fluss-/Wasser-Ränder sind
  // keine gleichwertigen Punktewolken. Ein Objekt wird erst gezeichnet, wenn
  // seine sichtbare Fläche groß genug ist, um als Oberfläche lesbar zu sein.
  // Dadurch verschwinden winzige Inselgruppen auf niedrigen Zoomstufen, statt
  // mit Minimaldreiecken die Karte und den Hauptthread zu verstopfen.
  const minSide = globeZoom < 2.4 ? 2.4 : globeZoom < 4.2 ? 1.9 : globeZoom < 7 ? 1.35 : 0.75;
  const minArea = globeZoom < 2.4 ? 18 : globeZoom < 4.2 ? 11 : globeZoom < 7 ? 6 : 2.5;
  const maxTinyComplexity = globeZoom < 4.2 ? 14 : globeZoom < 7 ? 22 : 42;
  if (metrics.width < minSide && metrics.height < minSide) return false;
  if (metrics.area < minArea && pointCount <= maxTinyComplexity) return false;
  if (ringArea < 0.00012 && globeZoom < 5.8) return false;
  return true;
}

function decodeHierarchicalFeature(feature, threshold) {
  const polygon = feature?.geometry?.coordinates || [];
  const outer = decodeHierarchicalRing(polygon[0] || [], threshold);
  if (outer.length < 4) return null;
  if (!isRenderableSurfaceFeature(feature, outer)) return null;
  return {
    type: "Feature",
    properties: feature.properties || {},
    bbox: feature.bbox,
    geometry: { type: "Polygon", coordinates: [outer] },
  };
}

function buildNaturalEarth10mTileCollection(tiles) {
  const candidates = [];
  const seenFeatureIds = new Set();
  const collections = [];
  const index = getNaturalEarth10mTileIndex();
  const threshold = getNaturalEarth10mDetailThreshold();
  const globalKey = getNaturalEarthGlobalTile()?.key || index?.global?.key;
  const globalCollection = window.EarthMapNaturalEarthTileData?.[`10m-land-hierarchy-${globalKey}`];
  if (globalCollection?.features?.length) collections.push(globalCollection);
  tiles.forEach((tile) => {
    const collection = window.EarthMapNaturalEarthTileData?.[getNaturalEarth10mTileDataKey(tile)];
    if (collection?.features?.length) collections.push(collection);
  });
  collections.forEach((collection) => {
    collection.features.forEach((feature) => {
      const id = feature.properties?._earthMapFeatureId || `${feature.bbox?.join(",")}-${candidates.length}`;
      if (seenFeatureIds.has(id)) return;
      const decodedFeature = decodeHierarchicalFeature(feature, threshold);
      if (!decodedFeature) return;
      seenFeatureIds.add(id);
      candidates.push({ feature: decodedFeature, area: getApproxFeaturePixelMetrics(feature).area });
    });
  });
  const features = candidates
    .sort((a, b) => b.area - a.area)
    .slice(0, getNaturalEarthSurfaceFeatureBudget())
    .map((candidate) => candidate.feature);
  const collection = {
    type: "FeatureCollection",
    name: `ne_10m_land_hierarchy_zoom_${globeZoom.toFixed(2)}`,
    features,
  };
  collection._earthMapPreparedSurface = createPreparedNaturalEarthSurface(collection);
  collection._earthMapWebglLandVertices = preparedSurfaceToSphereVertices(collection._earthMapPreparedSurface, 1.003);
  collection._earthMapWebglLineVertices = preparedSurfaceToSphereLineVertices(collection._earthMapPreparedSurface, 1.006);
  return collection;
}

async function buildNaturalEarth10mTileCollectionInBatches(tiles, taskContext = {}) {
  const candidates = [];
  const seenFeatureIds = new Set();
  const collections = [];
  const index = getNaturalEarth10mTileIndex();
  const threshold = getNaturalEarth10mDetailThreshold();
  const globalKey = getNaturalEarthGlobalTile()?.key || index?.global?.key;
  const globalCollection = window.EarthMapNaturalEarthTileData?.[`10m-land-hierarchy-${globalKey}`];
  if (globalCollection?.features?.length) collections.push(globalCollection);
  tiles.forEach((tile) => {
    const collection = window.EarthMapNaturalEarthTileData?.[getNaturalEarth10mTileDataKey(tile)];
    if (collection?.features?.length) collections.push(collection);
  });

  let processed = 0;
  for (const collection of collections) {
    for (const feature of collection.features || []) {
      if (taskContext.shouldPause?.()) return null;
      const id = feature.properties?._earthMapFeatureId || `${feature.bbox?.join(",")}-${candidates.length}`;
      if (!seenFeatureIds.has(id)) {
        const decodedFeature = decodeHierarchicalFeature(feature, threshold);
        if (decodedFeature) {
          seenFeatureIds.add(id);
          candidates.push({ feature: decodedFeature, area: getApproxFeaturePixelMetrics(feature).area });
        }
      }
      processed += 1;
      if (processed % 28 === 0) await taskContext.yield?.();
    }
  }
  const features = candidates
    .sort((a, b) => b.area - a.area)
    .slice(0, getNaturalEarthSurfaceFeatureBudget())
    .map((candidate) => candidate.feature);
  const collection = {
    type: "FeatureCollection",
    name: `ne_10m_land_hierarchy_zoom_${globeZoom.toFixed(2)}`,
    features,
  };
  await taskContext.yield?.();
  const preparedSurface = await createPreparedNaturalEarthSurfaceInBatches(collection, taskContext);
  if (!preparedSurface) return null;
  collection._earthMapPreparedSurface = preparedSurface;
  await taskContext.yield?.();
  collection._earthMapWebglLandVertices = preparedSurfaceToSphereVertices(preparedSurface, 1.003);
  await taskContext.yield?.();
  collection._earthMapWebglLineVertices = preparedSurfaceToSphereLineVertices(preparedSurface, 1.006);
  return collection;
}

function getPreparedNaturalEarthSurface(source) {
  if (!source?.features?.length) return null;
  const density = getNaturalEarthSurfaceDensity();
  const signature = [
    source._earthMapRenderSignature || activeNaturalEarthTileSignature || source.name || "natural-earth",
    source.features.length,
    density,
  ].join("|");
  if (naturalEarthSurfaceCache.signature === signature) return naturalEarthSurfaceCache;
  const prepared = source._earthMapPreparedSurface;
  naturalEarthSurfaceCache.signature = signature;
  if (prepared?.fillRings?.length || prepared?.outlineRings?.length) {
    naturalEarthSurfaceCache.fillRings = prepared.fillRings || [];
    naturalEarthSurfaceCache.outlineRings = prepared.outlineRings || [];
    return naturalEarthSurfaceCache;
  }
  const fallback = createPreparedNaturalEarthSurface(source, density);
  naturalEarthSurfaceCache.fillRings = fallback.fillRings;
  naturalEarthSurfaceCache.outlineRings = fallback.outlineRings;
  return naturalEarthSurfaceCache;
}

function featureBboxIntersectsViewport(feature, bounds) {
  const bbox = feature?.bbox || feature?.geometry?.bbox;
  if (!Array.isArray(bbox) || bbox.length < 4 || !bbox.every(Number.isFinite)) return true;
  const latIntersects = bbox[1] <= bounds.maxLat && bbox[3] >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => bbox[0] <= maxLon && bbox[2] >= minLon);
}

function getRenderableNaturalEarthSource(source) {
  if (geoState.detailLevel !== "10m" || source?.type !== "FeatureCollection") return source;
  // Performance-Regel: Die 10m-FeatureCollection ist bereits aus Startfläche
  // plus sichtbaren/bepufferten Tiles gebaut. Eine zweite BBox-Filterung im
  // Renderframe erzeugt neue Objekte, invalidiert vorbereitete Ringe und zwingt
  // den Hauptthread zur erneuten Küstenarbeit. Darum rendert die Anzeige genau
  // die zuletzt installierte, bereits vorbereitete Kollektion.
  return source;
}

function installNaturalEarthDetail(level, geojson) {
  if (!geojson) return;
  activeNaturalEarthSource = geojson;
  pendingNaturalEarthTileBuildSignature = "";
  resetNaturalEarthSurfaceCache();
  geoState.detailLevel = level;
  installLandGeoJson(geojson);
  buildLandSamplesDeferred();
}

function requestNaturalEarthDetailForZoom() {
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m" && isNavigatingGlobe) {
    scheduleNaturalEarthDetailUpdate(720);
    return;
  }

  if (desiredLevel === "10m") {
    const index = getNaturalEarth10mTileIndex();
    if (!index) return;
    const threshold = getNaturalEarth10mDetailThreshold();
    const startupGlobal = threshold >= 0.52 && globeZoom < 1.35
      ? { key: "global-start", file: "ne_10m_land_hierarchy_global_start.js", isGlobal: true }
      : null;
    const tiles = startupGlobal ? [] : getVisibleNaturalEarth10mTiles();
    const globalTile = getNaturalEarthGlobalTile();
    const required = [
      startupGlobal || globalTile,
      ...tiles,
    ].filter(Boolean);
    const loadedTiles = tiles.filter((tile) => {
      const key = getNaturalEarth10mTileDataKey(tile);
      return Boolean(window.EarthMapNaturalEarthTileData?.[key]);
    });
    const loadedRequired = [
      startupGlobal || globalTile,
      ...loadedTiles,
    ].filter((tile) => {
      const key = tile.isGlobal ? `10m-land-hierarchy-${tile.key}` : getNaturalEarth10mTileDataKey(tile);
      return Boolean(window.EarthMapNaturalEarthTileData?.[key]);
    });
    const signature = `hierarchy|${threshold}|${getSurfaceBudgetSignature()}|${loadedRequired.map((tile) => tile.key).sort().join("|")}`;
    if (signature === activeNaturalEarthTileSignature && geoState.detailLevel === "10m" && activeNaturalEarthSource) return;
    if (signature === pendingNaturalEarthTileBuildSignature) return;

    const missing = required.filter((tile) => {
      const key = tile.isGlobal ? `10m-land-hierarchy-${tile.key}` : getNaturalEarth10mTileDataKey(tile);
      return !window.EarthMapNaturalEarthTileData?.[key];
    });

    if (missing.length) {
      queueNaturalEarthTileLoads(missing);
      if (!startupGlobal && !loadedTiles.length) return;
    }

    if (startupGlobal) {
      activeNaturalEarthTileSignature = signature;
      installNaturalEarthDetail("10m", buildNaturalEarth10mTileCollection(tiles));
      scheduleGlobeRender();
      return;
    }
    pendingNaturalEarthTileBuildSignature = signature;
    queueEarthMapBackgroundTask("Natural-Earth-10m-Detailflächen vorbereiten", async (taskContext) => {
      if (taskContext.shouldPause?.()) return;
      const collection = await buildNaturalEarth10mTileCollectionInBatches(loadedTiles, taskContext);
      if (!collection) {
        pendingNaturalEarthTileBuildSignature = "";
        scheduleNaturalEarthDetailUpdate(900);
        return;
      }
      if (taskContext.shouldPause?.()) {
        pendingNaturalEarthTileBuildSignature = "";
        scheduleNaturalEarthDetailUpdate(900);
        return;
      }
      activeNaturalEarthTileSignature = signature;
      pendingNaturalEarthTileBuildSignature = "";
      installNaturalEarthDetail("10m", collection);
      scheduleGlobeRender();
    }, {
      key: `natural-earth-detail-${signature}`,
      priority: 20,
    });
    scheduleGlobeRender();
    return;
  }
  activeNaturalEarthTileSignature = "";
  pendingNaturalEarthTileBuildSignature = "";
  if (desiredLevel === geoState.detailLevel && activeNaturalEarthSource) return;

  const loaded = getLoadedNaturalEarthLand(desiredLevel);
  if (loaded) {
    installNaturalEarthDetail(desiredLevel, loaded);
    return;
  }

  const config = NATURAL_EARTH_LAND_DETAILS[desiredLevel];
  if (!config || pendingNaturalEarthDetail === desiredLevel) return;
  pendingNaturalEarthDetail = desiredLevel;
  const script = document.createElement("script");
  script.src = config.scriptPath;
  script.async = true;
  script.onload = () => {
    pendingNaturalEarthDetail = "";
    const loadedAfterScript = getLoadedNaturalEarthLand(desiredLevel);
    if (loadedAfterScript && getDesiredNaturalEarthDetailLevel() === desiredLevel) {
      installNaturalEarthDetail(desiredLevel, loadedAfterScript);
      scheduleGlobeRender();
    }
  };
  script.onerror = () => {
    pendingNaturalEarthDetail = "";
    console.warn(`Natural-Earth-Detailstufe ${desiredLevel} konnte nicht geladen werden.`);
  };

  const appendScript = () => {
    if (getDesiredNaturalEarthDetailLevel() !== desiredLevel || (desiredLevel === "10m" && isNavigatingGlobe)) {
      pendingNaturalEarthDetail = "";
      scheduleNaturalEarthDetailUpdate(720);
      return;
    }
    document.head.appendChild(script);
  };

  // Performance-Regel: 10m ist ein großer Datensatz und darf nicht während
  // aktiver Navigation in den Hauptthread fallen. Wir starten den Download
  // deshalb erst in einer Ruhephase; niedrigere Detailstufen bleiben direkt.
  if (desiredLevel === "10m") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(appendScript, { timeout: 1800 });
    } else {
      window.setTimeout(appendScript, 900);
    }
  } else {
    appendScript();
  }
}

function scheduleGlobeRender() {
  if (renderFrameId) return;
  renderFrameId = window.requestAnimationFrame(() => {
    renderFrameId = 0;
    syncMapLibreCamera();
    if (!mapLibreEngineState.active) renderGlobe();
  });
}

function scheduleNaturalEarthDetailUpdate(delay = 220) {
  window.clearTimeout(detailLoadTimer);
  detailLoadTimer = window.setTimeout(() => {
    detailLoadTimer = 0;
    requestNaturalEarthDetailForZoom();
  }, delay);
}

function markGlobeNavigationActive() {
  isNavigatingGlobe = true;
  pauseEarthMapBackgroundTasks();
  window.clearTimeout(detailLoadTimer);
  window.clearTimeout(navigationSettledTimer);
  navigationSettledTimer = window.setTimeout(() => {
    isNavigatingGlobe = false;
    runNaturalEarthTileLoadQueue();
    runEarthMapBackgroundTaskQueue();
    scheduleNaturalEarthDetailUpdate(680);
    scheduleGlobeRender();
  }, 360);
}

function getInteractiveNaturalEarthSource() {
  // Interaktionsregel: Während Bewegung bleibt die zuletzt geladene
  // 10m-Ableitung sichtbar. Wir weichen nicht auf fremde 110m/50m-Quellen aus,
  // damit die Reduktion der 10m-Masterdaten prüfbar bleibt.
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m") {
    return geoState.detailLevel === "10m" ? activeNaturalEarthSource : null;
  }
  return null;
}

function sanitizeRing(coordinates) {
  return coordinates
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
}

function getSignedRingArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const current = ring[index];
    const next = ring[index + 1];
    area += (current[0] * next[1]) - (next[0] * current[1]);
  }
  return area / 2;
}

function orientRingForD3(ring, shouldBeClockwise) {
  const cleanRing = sanitizeRing(ring);
  if (cleanRing.length < 4) return cleanRing;
  const isClockwise = getSignedRingArea(cleanRing) < 0;
  return isClockwise === shouldBeClockwise ? cleanRing : [...cleanRing].reverse();
}

function orientPolygonForD3(polygon) {
  if (!Array.isArray(polygon) || !polygon.length) return [];
  // D3s sphärische Polygonfüllung nutzt eine andere Winding-Konvention als
  // RFC-GeoJSON. Außenringe laufen für die sichtbaren Landflächen clockwise,
  // Innenringe gegenläufig. Diese Regel darf nicht global umgedreht werden:
  // sonst füllt D3 das sphärische Komplement, also den Ozean.
  return polygon.map((ring, index) => orientRingForD3(ring, index === 0));
}

function orientGeometryForD3(geometry) {
  if (!geometry) return null;
  if (geometry.type === "Polygon") {
    return { ...geometry, coordinates: orientPolygonForD3(geometry.coordinates || []) };
  }
  if (geometry.type === "MultiPolygon") {
    return { ...geometry, coordinates: (geometry.coordinates || []).map(orientPolygonForD3) };
  }
  if (geometry.type === "GeometryCollection") {
    return { ...geometry, geometries: (geometry.geometries || []).map(orientGeometryForD3).filter(Boolean) };
  }
  return geometry;
}

function orientGeoJsonForD3(geojson) {
  if (!geojson) return geojson;
  if (geojson.type === "FeatureCollection") {
    return {
      ...geojson,
      features: (geojson.features || []).map((feature) => ({
        ...feature,
        geometry: orientGeometryForD3(feature.geometry),
      })),
    };
  }
  if (geojson.type === "Feature") {
    return { ...geojson, geometry: orientGeometryForD3(geojson.geometry) };
  }
  return orientGeometryForD3(geojson);
}

function extractLandRings(geojson) {
  const rings = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  features.forEach((feature) => {
    const geometry = feature?.geometry;
    if (!geometry) return;
    if (geometry.type === "Polygon") {
      const outerRing = sanitizeRing(geometry.coordinates?.[0] || []);
      if (outerRing.length > 2) rings.push(outerRing);
    }
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const outerRing = sanitizeRing(polygon?.[0] || []);
        if (outerRing.length > 2) rings.push(outerRing);
      });
    }
  });
  return rings;
}

async function extractLandRingsInBatches(geojson, taskContext = {}) {
  const rings = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  let processed = 0;
  for (const feature of features) {
    if (taskContext.shouldPause?.()) return null;
    const geometry = feature?.geometry;
    if (geometry?.type === "Polygon") {
      const outerRing = sanitizeRing(geometry.coordinates?.[0] || []);
      if (outerRing.length > 2) rings.push(outerRing);
    }
    if (geometry?.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const outerRing = sanitizeRing(polygon?.[0] || []);
        if (outerRing.length > 2) rings.push(outerRing);
      });
    }
    processed += 1;
    if (processed % 48 === 0) await taskContext.yield?.();
  }
  return rings;
}

function extractLandPolygons(geojson) {
  const polygons = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  features.forEach((feature) => {
    const geometry = feature?.geometry;
    if (!geometry) return;
    if (geometry.type === "Polygon") {
      const rings = (geometry.coordinates || [])
        .map(sanitizeRing)
        .filter((ring) => ring.length > 2);
      if (rings.length) polygons.push(rings);
    }
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const rings = (polygon || [])
          .map(sanitizeRing)
          .filter((ring) => ring.length > 2);
        if (rings.length) polygons.push(rings);
      });
    }
  });
  return polygons;
}

async function extractLandPolygonsInBatches(geojson, taskContext = {}) {
  const polygons = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  let processed = 0;
  const addGeometryPolygons = (geometry) => {
    if (!geometry) return;
    if (geometry.type === "Polygon") {
      const rings = (geometry.coordinates || [])
        .map(sanitizeRing)
        .filter((ring) => ring.length > 2);
      if (rings.length) polygons.push(rings);
    }
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const rings = (polygon || [])
          .map(sanitizeRing)
          .filter((ring) => ring.length > 2);
        if (rings.length) polygons.push(rings);
      });
    }
  };
  for (const feature of features) {
    if (taskContext.shouldPause?.()) return null;
    addGeometryPolygons(feature?.geometry);
    processed += 1;
    if (processed % 80 === 0) await taskContext.yield?.();
  }
  return polygons;
}

function extractBoundaryLineStrings(geojson) {
  const lines = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  features.forEach((feature) => {
    const geometry = feature?.geometry;
    if (!geometry) return;
    if (geometry.type === "LineString") {
      const line = sanitizeRing(geometry.coordinates || []);
      if (line.length > 1) lines.push(line);
    }
    if (geometry.type === "MultiLineString") {
      (geometry.coordinates || []).forEach((rawLine) => {
        const line = sanitizeRing(rawLine || []);
        if (line.length > 1) lines.push(line);
      });
    }
    if (geometry.type === "Polygon") {
      (geometry.coordinates || []).forEach((rawRing) => {
        const line = sanitizeRing(rawRing || []);
        if (line.length > 1) lines.push(line);
      });
    }
    if (geometry.type === "MultiPolygon") {
      (geometry.coordinates || []).forEach((polygon) => {
        (polygon || []).forEach((rawRing) => {
          const line = sanitizeRing(rawRing || []);
          if (line.length > 1) lines.push(line);
        });
      });
    }
  });
  return lines;
}

async function extractBoundaryLineStringsInBatches(geojson, taskContext = {}) {
  const lines = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  let processed = 0;
  const addGeometryLines = (geometry) => {
    if (!geometry) return;
    if (geometry.type === "LineString") {
      const line = sanitizeRing(geometry.coordinates || []);
      if (line.length > 1) lines.push(line);
    }
    if (geometry.type === "MultiLineString") {
      (geometry.coordinates || []).forEach((rawLine) => {
        const line = sanitizeRing(rawLine || []);
        if (line.length > 1) lines.push(line);
      });
    }
    if (geometry.type === "Polygon") {
      (geometry.coordinates || []).forEach((rawRing) => {
        const line = sanitizeRing(rawRing || []);
        if (line.length > 1) lines.push(line);
      });
    }
    if (geometry.type === "MultiPolygon") {
      (geometry.coordinates || []).forEach((polygon) => {
        (polygon || []).forEach((rawRing) => {
          const line = sanitizeRing(rawRing || []);
          if (line.length > 1) lines.push(line);
        });
      });
    }
  };
  for (const feature of features) {
    if (taskContext.shouldPause?.()) return null;
    addGeometryLines(feature?.geometry);
    processed += 1;
    if (processed % 120 === 0) await taskContext.yield?.();
  }
  return lines;
}

function getRingBounds(ring) {
  const lons = ring.map(([lon]) => lon);
  const lats = ring.map(([, lat]) => lat);
  return {
    minLon: Math.max(-180, Math.min(...lons)),
    maxLon: Math.min(180, Math.max(...lons)),
    minLat: Math.max(-88, Math.min(...lats)),
    maxLat: Math.min(88, Math.max(...lats)),
  };
}

function pointInPolygon(lon, lat, polygon) {
  let inside = false;
  for (let index = 0, previousIndex = polygon.length - 1; index < polygon.length; previousIndex = index, index += 1) {
    const [lonA, latA] = polygon[index];
    const [lonB, latB] = polygon[previousIndex];
    const crosses = (latA > lat) !== (latB > lat);
    const atLon = ((lonB - lonA) * (lat - latA)) / ((latB - latA) || 1) + lonA;
    if (crosses && lon < atLon) inside = !inside;
  }
  return inside;
}

function createLandSamples(rings, step = 1.35) {
  const samples = [];
  rings.forEach((ring) => {
    const bounds = getRingBounds(ring);
    const minLon = Math.floor(bounds.minLon / step) * step;
    const maxLon = Math.ceil(bounds.maxLon / step) * step;
    const minLat = Math.floor(bounds.minLat / step) * step;
    const maxLat = Math.ceil(bounds.maxLat / step) * step;
    for (let lon = minLon; lon <= maxLon; lon += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        const sampleLon = lon + step / 2;
        const sampleLat = lat + step / 2;
        if (!pointInPolygon(sampleLon, sampleLat, ring)) continue;
        samples.push({ lon: sampleLon, lat: sampleLat });
      }
    }
  });
  return samples;
}

function installLandGeoJson(geojson) {
  if (hasD3Geo) {
    geoState.sampleGeneration += 1;
    geoState.landRings = [];
    geoState.landSamples = [];
    geoState.samplesReady = true;
    geoState.status = geojson?.features?.length ? "ready" : "empty";
    return;
  }
  const landRings = extractLandRings(geojson);
  geoState.sampleGeneration += 1;
  geoState.landRings = landRings;
  geoState.landSamples = [];
  geoState.samplesReady = false;
  geoState.status = landRings.length ? "ready" : "empty";
}

geoState.status = "loading";

function buildLandSamplesDeferred() {
  if (webglState.ready) {
    geoState.samplesReady = true;
    geoState.landSamples = [];
    return;
  }
  if (geoState.status !== "ready" || geoState.samplesReady) return;
  const rings = [...geoState.landRings];
  const generation = geoState.sampleGeneration;
  let processedRings = 0;
  geoState.landSamples = [];
  geoState.samplesReady = true;
  const processNextRing = () => {
    if (generation !== geoState.sampleGeneration) return;
    const ring = rings.shift();
    if (!ring) {
      renderGlobe();
      return;
    }
    geoState.landSamples.push(...createLandSamples([ring], 1.05));
    processedRings += 1;
    if (processedRings % 10 === 0) renderGlobe();
    window.setTimeout(processNextRing, 0);
  };
  window.setTimeout(processNextRing, 80);
}

let dragState = null;
const activeGlobePointers = new Map();
let pinchState = null;
let rotation = { lon: -18, lat: -8 };
let globeZoom = 1;
const MIN_GLOBE_ZOOM = 1;
const MAX_GLOBE_ZOOM = 180;
let renderFrameId = 0;
let detailLoadTimer = 0;
let navigationSettledTimer = 0;
let isNavigatingGlobe = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLatitudeNavigationLimit() {
  // Navigationsregel: In der vollständig sichtbaren Startkugel verhindert eine
  // moderate Kippgrenze, dass die Erde unnatürlich auf den Kopf fällt. Beim
  // Hineinzoomen wird diese Grenze aber zu einer künstlichen Kartensperre:
  // Skandinavien, Arktis oder Antarktis müssen dann bis fast an den Polrand
  // verschiebbar sein. Deshalb wächst der erlaubte Breitengrad mit dem Zoom.
  const t = clamp((globeZoom - 1) / 5, 0, 1);
  const eased = 1 - ((1 - t) ** 2);
  return 58 + eased * 31.2;
}

function getActiveGlobePointerList() {
  return [...activeGlobePointers.values()];
}

function getPointerDistance(pointerA, pointerB) {
  return Math.hypot(pointerA.x - pointerB.x, pointerA.y - pointerB.y);
}

function beginPinchZoomIfReady() {
  const pointers = getActiveGlobePointerList();
  if (pointers.length < 2) {
    pinchState = null;
    return false;
  }
  const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
  pinchState = {
    startDistance: distance,
    startZoom: globeZoom,
  };
  dragState = null;
  return true;
}

function resetSinglePointerDragFrom(pointer) {
  if (!pointer) {
    dragState = null;
    return;
  }
  dragState = {
    pointerId: pointer.id,
    startX: pointer.x,
    startY: pointer.y,
    startRotation: { ...rotation },
  };
}

function normalizeLonDelta(delta) {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

function densifyRing(points, maxStep = 4) {
  const result = [];
  points.forEach(([lon, lat], index) => {
    const [nextLon, nextLat] = points[(index + 1) % points.length];
    const lonDelta = normalizeLonDelta(nextLon - lon);
    const latDelta = nextLat - lat;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(lonDelta), Math.abs(latDelta)) / maxStep));
    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      result.push([lon + lonDelta * t, lat + latDelta * t]);
    }
  });
  return result;
}

function densifyLine(points, maxStep = 4) {
  if (!Array.isArray(points) || points.length < 2) return Array.isArray(points) ? points : [];
  const result = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const [lon, lat] = points[index];
    const [nextLon, nextLat] = points[index + 1];
    const lonDelta = normalizeLonDelta(nextLon - lon);
    const latDelta = nextLat - lat;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(lonDelta), Math.abs(latDelta)) / maxStep));
    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      result.push([lon + lonDelta * t, lat + latDelta * t]);
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

function toRotatedUnit(lon, lat) {
  const lambda = (lon + rotation.lon) * DEG;
  const phi = lat * DEG;
  // Projektionsregel: Die eigene Canvas-Projektion muss dieselbe vertikale
  // Rotationsrichtung verwenden wie d3.geoOrthographic(). Sonst kleben
  // Projektlayer korrekt an der Maus, während die Basislandmasse gegenläufig
  // kippt.
  const tilt = -rotation.lat * DEG;
  const cosPhi = Math.cos(phi);
  const x0 = cosPhi * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = cosPhi * Math.cos(lambda);
  const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
  return { x: x0, y, z };
}

function projectVector(vector, radius, centerX, centerY) {
  return { x: centerX + radius * vector.x, y: centerY - radius * vector.y, z: vector.z };
}

function project(lon, lat, radius, centerX, centerY) {
  return projectVector(toRotatedUnit(lon, lat), radius, centerX, centerY);
}

function getStableGlobeStrokeWidth(radius, factor, minWidth) {
  // Darstellungsregel: Linien sind Annotationen auf der Karte, keine
  // geografischen Flächen. Ihre Stärke folgt deshalb der Startansicht des
  // aktuellen Fensters und nicht der gezoomten Projektionsskala.
  const fittedRadius = radius / Math.max(1, globeZoom);
  return Math.max(minWidth, fittedRadius * factor);
}

function getThemeMapColor(name, fallback) {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
}

function drawSphere(size, radius, center) {
  // Darstellungsregel: Wasser ist die stabile helle Grundfläche. Frühere
  // Radialverläufe wurden beim tiefen Zoom zu grauen Kartenflächen und ließen
  // Ozean und Kontinente optisch ineinanderlaufen.
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = getContinentalRenderStyle().sea;
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.006);
  ctx.strokeStyle = getThemeMapColor("--sphere-outline", "rgba(154,158,154,.42)");
  ctx.stroke();
}

function createOrthographicProjection(radius, center) {
  return window.d3.geoOrthographic()
    .translate([center.x, center.y])
    .scale(radius)
    .rotate([rotation.lon, rotation.lat])
    .clipAngle(90)
    .precision(0.25);
}

function drawGeographicLayer(radius, center) {
  const renderSource = getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
  if (!hasD3Geo || !renderSource) return false;
  const preparedSurface = getPreparedNaturalEarthSurface(renderSource);
  if (!preparedSurface?.fillRings?.length) return false;
  const style = getContinentalRenderStyle();

  // Renderregel: Die Basislandmasse wird nicht mehr mit D3s sphärischer
  // Polygonfüllung gefüllt. Wasser ist die unveränderliche Basis; Land wird
  // mit unserer eigenen Projektion gefüllt. Horizontgeschnittene Polygone
  // schließen wir über den Globusrand, statt sie ganz weiß zu lassen oder D3
  // wieder das sphärische Komplement füllen zu lassen.
  preparedSurface.fillRings.forEach((ring) => {
    drawVisibleHemisphereFill(ring, radius, center, style.land);
  });

  if (isOsmTopographicBaseMap()) {
    drawTopographicReliefOverlay(preparedSurface.fillRings, radius, center, style);
  }

  drawNaturalEarthLakeLayer(radius, center);

  preparedSurface.outlineRings.forEach((ring) => {
    drawProjectedLine(
      ring,
      radius,
      center,
      style.outline,
      getStableGlobeStrokeWidth(radius, 0.0018, 0.7),
    );
  });

  return true;
}

function scheduleNaturalEarthBoundaryRingPreparation(kind, source) {
  const isAdmin1 = kind === "admin1";
  const ringsKey = isAdmin1 ? "naturalEarthAdmin1BoundaryRings" : "naturalEarthAdmin0BoundaryRings";
  const preparingKey = isAdmin1 ? "naturalEarthAdmin1BoundaryPreparing" : "naturalEarthAdmin0BoundaryPreparing";
  if (state[ringsKey] || state[preparingKey] || !source?.features?.length) return;

  state[preparingKey] = true;
  queueEarthMapBackgroundTask(`Natural-Earth-${isAdmin1 ? "Admin-1" : "Admin-0"}-Grenzlinien vorbereiten`, async (taskContext) => {
    const rings = await extractBoundaryLineStringsInBatches(source, taskContext);
    if (!rings) {
      state[preparingKey] = false;
      if (!taskContext.shouldPause?.()) scheduleNaturalEarthBoundaryRingPreparation(kind, source);
      return;
    }
    state[ringsKey] = rings;
    state[preparingKey] = false;
    scheduleGlobeRender();
  }, {
    key: `natural-earth-boundaries-${kind}`,
    priority: isAdmin1 ? 16 : 18,
  });
}

function getNaturalEarthAdmin1BoundaryRings() {
  if (state.naturalEarthAdmin1BoundaryRings) return state.naturalEarthAdmin1BoundaryRings;
  const source = window.EarthMapNaturalEarthAdmin1Boundaries10m;
  if (!source?.features?.length) return [];
  // Hintergrundregel: Admin-1 ist ein Standard-Grenzlayer, kein Projektobjekt.
  // Für die Anzeige halten wir nur die Linienringe im Speicher; Flächenfüllung
  // bleibt transparent. Die vollständige Geometrie/Metadatenlogik bleibt vom
  // späteren Archiv- und Importpfad getrennt.
  scheduleNaturalEarthBoundaryRingPreparation("admin1", source);
  return [];
}

function getNaturalEarthAdmin0BoundaryRings() {
  if (state.naturalEarthAdmin0BoundaryRings) return state.naturalEarthAdmin0BoundaryRings;
  const boundarySource = window.EarthMapNaturalEarthAdmin0Boundaries10m;
  if (boundarySource?.features?.length) {
    scheduleNaturalEarthBoundaryRingPreparation("admin0", boundarySource);
    return [];
  }
  // Hintergrundregel: Staatsgrenzen sind eine Standard-Annotation auf der
  // Grundkarte. Wenn das vorbereitete Grenzskript noch nicht da ist, zeichnen
  // wir lieber einen Frame ohne diese Annotation, statt synchron aus den
  // Länderpolygonen Ringe zu extrahieren und dadurch die Interaktion zu sperren.
  return [];
}

function scheduleNaturalEarthWaterPreparation(kind, source) {
  const isLake = kind === "lake";
  const polygonsKey = isLake ? "naturalEarthLakePolygons" : "naturalEarthEnclosedSeaPolygons";
  const ringsKey = isLake ? "naturalEarthLakeRings" : "naturalEarthEnclosedSeaRings";
  const preparingKey = isLake ? "naturalEarthLakePreparing" : "naturalEarthEnclosedSeaPreparing";
  if (state[polygonsKey] || state[preparingKey] || !source?.features?.length) return;

  state[preparingKey] = true;
  queueEarthMapBackgroundTask(`Natural-Earth-${isLake ? "Gewässerflächen" : "Binnenmeere"} vorbereiten`, async (taskContext) => {
    const polygons = await extractLandPolygonsInBatches(source, taskContext);
    if (!polygons) {
      state[preparingKey] = false;
      if (!taskContext.shouldPause?.()) scheduleNaturalEarthWaterPreparation(kind, source);
      return;
    }
    state[polygonsKey] = polygons;
    state[ringsKey] = polygons.flat();
    state[preparingKey] = false;
    scheduleGlobeRender();
  }, {
    key: `natural-earth-water-${kind}`,
    priority: isLake ? 17 : 14,
  });
}

function getNaturalEarthLakePolygons() {
  if (state.naturalEarthLakePolygons) return state.naturalEarthLakePolygons;
  const source = window.EarthMapNaturalEarthLakes10m;
  if (!source?.features?.length) return [];
  // Hintergrundregel: Seen sind Teil der physischen Grundkarte. Sie bleiben
  // deshalb strikt von Projektlayern getrennt und übernehmen die Wasserfarbe
  // der aktuell gewählten Grundkarte.
  scheduleNaturalEarthWaterPreparation("lake", source);
  return [];
}

function getNaturalEarthLakeRings() {
  if (state.naturalEarthLakeRings) return state.naturalEarthLakeRings;
  getNaturalEarthLakePolygons();
  return [];
}

function getNaturalEarthEnclosedSeaPolygons() {
  if (state.naturalEarthEnclosedSeaPolygons) return state.naturalEarthEnclosedSeaPolygons;
  const source = window.EarthMapNaturalEarthEnclosedSeas10m;
  if (!source?.features?.length) return [];
  // Datenregel: Natural Earth führt das Kaspische Meer nicht in den Lakes,
  // sondern in geography_marine_polys. Für die Grundkarte behandeln wir solche
  // landumschlossenen Meeresflächen dennoch wie Wasserflächen.
  scheduleNaturalEarthWaterPreparation("enclosed-sea", source);
  return [];
}

function getNaturalEarthEnclosedSeaRings() {
  if (state.naturalEarthEnclosedSeaRings) return state.naturalEarthEnclosedSeaRings;
  getNaturalEarthEnclosedSeaPolygons();
  return [];
}

function getNaturalEarthWaterPolygons() {
  return [
    ...getNaturalEarthLakePolygons(),
    ...getNaturalEarthEnclosedSeaPolygons(),
  ];
}

function getNaturalEarthWaterRings() {
  return [
    ...getNaturalEarthLakeRings(),
    ...getNaturalEarthEnclosedSeaRings(),
  ];
}

function drawNaturalEarthLakeLayer(radius, center) {
  const polygons = getNaturalEarthWaterPolygons();
  if (!polygons.length) return false;
  const style = getContinentalRenderStyle();
  const density = globeZoom > 7 ? 0.42 : globeZoom > 3 ? 0.75 : 1.15;
  const fill = style.sea;
  polygons.forEach((polygon) => {
    drawVisibleHemispherePolygonFill(
      polygon.map((ring) => densifyRing(ring, density)),
      radius,
      center,
      fill,
    );
  });

  const rings = getNaturalEarthWaterRings();
  const stroke = isEarthMapDarkMode()
    ? DARK_MAP_COASTLINE_COLOR
    : "rgba(92,96,94,.22)";
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.001, 0.36);
  rings.forEach((ring) => {
    if (!ring?.length) return;
    drawProjectedLine(densifyLine(ring, density), radius, center, stroke, lineWidth);
  });
  return true;
}

function drawNaturalEarthAdmin0BoundaryLayer(radius, center) {
  const rings = getNaturalEarthAdmin0BoundaryRings();
  if (!rings.length) return false;
  const alpha = globeZoom < 1.35 ? 0.44 : globeZoom < 2.8 ? 0.5 : 0.58;
  const stroke = isEarthMapDarkMode()
    ? DARK_MAP_BOUNDARY_COLOR
    : `rgba(66,72,70,${alpha})`;
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.00155, 0.68);
  const density = globeZoom > 7 ? 0.42 : globeZoom > 3 ? 0.7 : 1.05;
  rings.forEach((ring) => {
    if (!ring?.length) return;
    drawProjectedLine(densifyLine(ring, density), radius, center, stroke, lineWidth);
  });
  return true;
}

function drawNaturalEarthAdmin1BoundaryLayer(radius, center) {
  requestNaturalEarthAdmin1BoundaryLayerForZoom();
  if (globeZoom < NATURAL_EARTH_ADMIN1_BOUNDARY_LAYER_ZOOM) return false;
  if (!state.naturalEarthAdmin1BoundaryLoaded) return false;
  const rings = getNaturalEarthAdmin1BoundaryRings();
  if (!rings.length) return false;
  const alpha = clamp((globeZoom - NATURAL_EARTH_ADMIN1_BOUNDARY_LAYER_ZOOM) / 1.8, 0.18, 0.58);
  const stroke = isEarthMapDarkMode()
    ? DARK_MAP_BOUNDARY_COLOR
    : `rgba(82,88,86,${alpha})`;
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0012, 0.42);
  const density = globeZoom > 9 ? 0.35 : globeZoom > 5 ? 0.55 : 0.9;
  const maxRings = globeZoom < 4.2 ? 1800 : globeZoom < 6.4 ? 3200 : rings.length;
  const stride = rings.length > maxRings ? Math.ceil(rings.length / maxRings) : 1;
  for (let index = 0; index < rings.length; index += stride) {
    const ring = rings[index];
    if (!ring?.length) continue;
    drawProjectedLine(densifyLine(ring, density), radius, center, stroke, lineWidth);
  }
  return true;
}

function drawNaturalEarthCoastlineOverlay(radius, center) {
  const source = getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
  if (!source?.features?.length) return false;
  const preparedSurface = getPreparedNaturalEarthSurface(source);
  const rings = preparedSurface?.outlineRings || [];
  if (!rings.length) return false;
  const style = getContinentalRenderStyle();
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0018, 0.7);
  rings.forEach((ring) => {
    drawProjectedLine(ring, radius, center, style.outline, lineWidth);
  });
  return true;
}

function drawTopographicReliefOverlay(rings, radius, center, style) {
  if (!rings.length) return;
  ctx.save();
  ctx.beginPath();
  let hasClip = false;
  rings.forEach((ring) => {
    if (addVisibleHemisphereRingPath(densifyRing(ring, globeZoom > 7 ? 0.75 : 1.15), radius, center)) hasClip = true;
  });
  if (!hasClip) {
    ctx.restore();
    return;
  }
  ctx.clip("evenodd");

  const shade = ctx.createLinearGradient(center.x - radius * 0.7, center.y - radius * 0.85, center.x + radius * 0.55, center.y + radius * 0.65);
  shade.addColorStop(0, "rgba(255,255,255,.12)");
  shade.addColorStop(0.45, "rgba(255,255,255,0)");
  shade.addColorStop(1, style.shade || "rgba(82,92,86,.07)");
  ctx.fillStyle = shade;
  ctx.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2);

  const contourStep = globeZoom > 7 ? 5 : globeZoom > 3.5 ? 7.5 : 10;
  const maxStep = globeZoom > 7 ? 1.6 : 2.8;
  ctx.strokeStyle = style.contour || "rgba(155,132,82,.22)";
  ctx.lineWidth = getStableGlobeStrokeWidth(radius, 0.0012, 0.42);
  for (let lat = -80; lat <= 80; lat += contourStep) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += maxStep) {
      const wave = Math.sin((lon * 1.7 + lat * 2.2) * DEG) * 0.65 + Math.sin((lon * 0.45 - lat * 3.1) * DEG) * 0.35;
      points.push([lon, clamp(lat + wave, -84, 84)]);
    }
    drawProjectedLine(points, radius, center, ctx.strokeStyle, ctx.lineWidth);
  }
  ctx.restore();
}

function drawProjectBoundaryLayers(radius, center) {
  const project = getActiveProject();
  const items = getVisibleProjectBoundaryItems();
  if (!items.length) return false;
  let drewLayer = false;

  items.forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;

    const color = getMapLayerFillColor(item.display?.color);
    const outlineStyle = getProjectBoundaryOutlineStyle(project, item);
    const outlineColor = outlineStyle && Object.prototype.hasOwnProperty.call(outlineStyle, "strokeColor")
      ? getMapBoundaryColor(outlineStyle.strokeColor)
      : getMapBoundaryColor(item.display?.outlineColor);
    if (drawBoundaryFeatureVector({ type: "FeatureCollection", features }, radius, center, color, outlineColor, outlineStyle)) {
      drewLayer = true;
    }
  });

  return drewLayer;
}

function hasDrawableBoundaryFeature(feature) {
  if (!feature) return false;
  if (feature.type === "FeatureCollection") {
    return Array.isArray(feature.features) && feature.features.some(hasDrawableBoundaryFeature);
  }
  if (feature.type === "Feature") return Boolean(feature.geometry);
  return feature.type === "Polygon" || feature.type === "MultiPolygon";
}

function canRunHeavyMapLayerWork() {
  return state.heavyMapLayerWorkEnabled === true
    && !isNavigatingGlobe
    && !isNaturalEarthTileWorkPending();
}

function scheduleHeavyMapLayerWorkActivation(delay = 2600) {
  window.clearTimeout(state.heavyMapLayerWorkTimer);
  state.heavyMapLayerWorkTimer = window.setTimeout(() => {
    const activate = () => {
      if (isNavigatingGlobe) {
        scheduleHeavyMapLayerWorkActivation(900);
        return;
      }
      state.heavyMapLayerWorkEnabled = true;
      scheduleGlobeRender();
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(activate, { timeout: 1800 });
    } else {
      activate();
    }
  }, delay);
}

function scheduleGearBoxLayerGeometryHydration(layer) {
  const rows = Array.isArray(layer?.table?.rows) ? layer.table.rows : [];
  if (!rows.length || layer._gearBoxGeometryHydrationPending || !canRunHeavyMapLayerWork()) return;
  const now = Date.now();
  if (layer._gearBoxGeometryHydrationLastAttemptAt && now - layer._gearBoxGeometryHydrationLastAttemptAt < 10000) return;
  layer._gearBoxGeometryHydrationPending = true;
  layer._gearBoxGeometryHydrationLastAttemptAt = now;
  const hydrate = async (taskContext = {}) => {
    if (!canRunHeavyMapLayerWork()) {
      layer._gearBoxGeometryHydrationPending = false;
      scheduleHeavyMapLayerWorkActivation(900);
      return;
    }
    try {
      const completed = await ensureGearBoxBoundaryChunksForRowsInBatches(rows, taskContext);
      if (!completed || taskContext.shouldPause?.()) {
        layer._gearBoxGeometryHydrationPending = false;
        layer._gearBoxGeometryHydrationLastAttemptAt = 0;
        scheduleGearBoxLayerGeometryHydration(layer);
        return;
      }
      await taskContext.yield?.();
      rebuildGearBoxDataLayerMatches(layer);
      persistProjects();
      if (!taskContext.shouldPause?.()) {
        scheduleGlobeRender();
      }
    } catch (error) {
      console.warn("Statistik-Geometrien konnten nicht nachgeladen werden.", error);
    } finally {
      layer._gearBoxGeometryHydrationPending = false;
    }
  };
  queueEarthMapBackgroundTask(`Statistik-Geometrien: ${layer.title || layer.id}`, hydrate, {
    key: `gearbox-hydrate-${layer.id}`,
    priority: 8,
  });
}

function getActiveStatisticalDataLayer(project = getActiveProject(), options = {}) {
  if (options.allowHeavyWork !== true && !canRunHeavyMapLayerWork()) {
    const layers = Array.isArray(project?.dataLayers) ? project.dataLayers : [];
    return [...layers].reverse()
      .find((candidate) => candidate?.kind === "gearbox-data-layer"
        && candidate.origin !== "search"
        && candidate.visible !== false
        && Array.isArray(candidate.valueMatches)
        && candidate.valueMatches.some((match) => hasDrawableBoundaryFeature(match?.feature) && match.fill)) || null;
  }
  const layers = Array.isArray(project?.dataLayers) ? project.dataLayers : [];
  const visibleLayers = [...layers].reverse()
    .filter((candidate) => candidate?.kind === "gearbox-data-layer" && candidate.origin !== "search" && candidate.visible !== false);
  for (const layer of visibleLayers) {
    let hasDrawableMatches = Array.isArray(layer.valueMatches)
      && layer.valueMatches.some((match) => hasDrawableBoundaryFeature(match?.feature) && match.fill);
    const hasTableRows = Array.isArray(layer.table?.rows) && layer.table.rows.length;
    if (!hasDrawableMatches && hasTableRows) {
      if (layer._gearBoxGeometryHydrationPending) continue;
      const lastHydrationAttemptAt = Number(layer._gearBoxGeometryHydrationLastAttemptAt) || 0;
      if (lastHydrationAttemptAt && Date.now() - lastHydrationAttemptAt < 10000) continue;
      scheduleGearBoxLayerGeometryHydration(layer);
    }
    if (hasDrawableMatches) return layer;
  }
  return null;
}

function isStatisticalMapActive() {
  return Boolean(getActiveStatisticalDataLayer(getActiveProject(), { allowHeavyWork: false }));
}

function drawStatisticalDataLayer(radius, center) {
  if (isNavigatingGlobe) return false;
  if (isNaturalEarthTileWorkPending()) return false;
  const layer = getActiveStatisticalDataLayer(getActiveProject(), { allowHeavyWork: true });
  if (!layer) return false;
  let drewLayer = false;
  let attempted = 0;
  let drawn = 0;
  const groupedByFill = new Map();
  layer.valueMatches.forEach((match) => {
    if (!hasDrawableBoundaryFeature(match?.feature) || !match.fill) return;
    attempted += 1;
    if (!groupedByFill.has(match.fill)) groupedByFill.set(match.fill, []);
    groupedByFill.get(match.fill).push(match.feature);
  });
  groupedByFill.forEach((features, fill) => {
    const featureCollection = { type: "FeatureCollection", features };
    const cacheKey = getBoundaryFeatureVectorCacheKey(featureCollection);
    const statisticCacheKey = cacheKey || `stat:${layer.id}:${fill}:${features.length}`;
    const preparedPaths = boundaryFeatureVectorPathCache.get(statisticCacheKey);
    if (!preparedPaths) {
      queueEarthMapBackgroundTask(`Statistik-Renderpfade: ${layer.title || layer.id}`, async (taskContext) => {
        const prepared = await prepareBoundaryFeatureVectorPathsInBatches(featureCollection, taskContext);
        if (prepared && !taskContext.shouldPause?.()) {
          if (boundaryFeatureVectorPathCache.size > 320) boundaryFeatureVectorPathCache.clear();
          boundaryFeatureVectorPathCache.set(statisticCacheKey, prepared);
        }
        if (!taskContext.shouldPause?.()) scheduleGlobeRender();
      }, {
        key: `gearbox-render-paths-${statisticCacheKey}`,
        priority: 9,
      });
      return;
    }
    const didDraw = drawPreparedBoundaryFeatureVectorPaths(
      preparedPaths,
      radius,
      center,
      fill,
      "transparent",
      {
        strokeWidth: 0,
        fillMode: "solid",
        fillAlpha: isEarthMapDarkMode() ? 0.9 : 0.76,
        // Statistikflächen können auf hohen Zoomstufen sehr detailreich sein.
        // Die Daten bleiben unverändert; nur die Interpolation des sichtbaren
        // Renderpfads wird für flüssige Bewegung reduziert.
        density: globeZoom > 7 ? 0.95 : globeZoom > 4 ? 1.25 : 1.65,
      },
    );
    if (didDraw) drawn += features.length;
    drewLayer = didDraw || drewLayer;
  });
  layer._lastStatisticDraw = {
    attempted,
    drawn,
    at: Date.now(),
  };
  return drewLayer;
}

function getEarthMapStatisticDebugInfo(project = getActiveProject()) {
  const layers = Array.isArray(project?.dataLayers) ? project.dataLayers : [];
  return layers
    .filter((layer) => layer?.kind === "gearbox-data-layer")
    .map((layer) => {
      const rows = Array.isArray(layer.table?.rows) ? layer.table.rows : [];
      const matches = Array.isArray(layer.valueMatches) ? layer.valueMatches : [];
      const drawableMatches = matches.filter((match) => hasDrawableBoundaryFeature(match?.feature) && match.fill);
      return {
        id: layer.id,
        title: layer.title || layer.name || "Statistik",
        visible: layer.visible !== false,
        rows: rows.length,
        matches: matches.length,
        drawableMatches: drawableMatches.length,
        firstMatch: matches[0] ? {
          boundaryKey: matches[0].boundaryKey,
          value: matches[0].value,
          fill: matches[0].fill,
          hasGeometry: hasDrawableBoundaryFeature(matches[0].feature),
          stable_id: matches[0].stable_id,
        } : null,
        missing: layer.matchPreview?.missing || [],
        hydrationPending: Boolean(layer._gearBoxGeometryHydrationPending),
        lastStatisticDraw: layer._lastStatisticDraw || null,
      };
    });
}

window.getEarthMapStatisticDebugInfo = getEarthMapStatisticDebugInfo;

function drawMapSearchHighlights(radius, center, options = {}) {
  if (isStatisticalMapActive()) return false;
  const highlight = state.mapSearchHighlight;
  const selectedFeatures = Array.isArray(highlight?.selectedFeatures)
    ? highlight.selectedFeatures
    : [highlight?.countryFeature].filter(Boolean);
  const focusFeatures = Array.isArray(highlight?.focusFeatures)
    ? highlight.focusFeatures
    : [highlight?.provinceFeature].filter(Boolean);
  if (!selectedFeatures.length && !focusFeatures.length) return false;
  let drewLayer = false;
  const focusOnly = options.focusOnly === true;
  const contextOnly = options.contextOnly === true;

  // Suchregel: Bei "Region, Staat" ist der Staat der ausgewählte Kontext,
  // die Region ist die besondere Hervorhebung. Beide werden als normale
  // Vektorflächen gezeichnet. Der Kontext liegt unter Grenzen/Küsten, der
  // Fokus wird anschließend ein zweites Mal ganz oben gesetzt, damit er nicht
  // von der Kontextfüllung oder späteren Standardlayern verschluckt wird.
  if (!focusOnly) {
    selectedFeatures.forEach((feature, index) => {
      const color = getMapSearchSelectedAreaColor();
      const outlineColor = getMapSearchSelectedOutlineColor();
      const hatched = index > 0;
      drewLayer = drawBoundaryFeatureVector(
        feature,
        radius,
        center,
        color,
        outlineColor,
        {
          strokeWidth: isEarthMapDarkMode() ? (hatched ? 0.72 : 0) : 0.58,
          fillMode: hatched ? "diagonal-hatch" : "solid",
          fillAlpha: isEarthMapDarkMode() ? 0.84 : 0.66,
          strokeAlpha: isEarthMapDarkMode() ? 0.98 : 0.78,
          hatchAlpha: isEarthMapDarkMode() ? 0.86 : 0.62,
          hatchLineWidth: isEarthMapDarkMode() ? 2 : 1.25,
          hatchSize: isEarthMapDarkMode() ? 14 : 17,
        },
      ) || drewLayer;
    });
  }
  if (!contextOnly) {
    focusFeatures.forEach((feature) => {
      const color = getMapSearchSpecialHighlightColor();
      const outlineColor = getMapSearchSpecialOutlineColor();
      drewLayer = drawBoundaryFeatureVector(
        feature,
        radius,
        center,
        color,
        outlineColor,
        {
          strokeWidth: isEarthMapDarkMode() ? 1.15 : 0.82,
          fillMode: "solid",
          fillAlpha: isEarthMapDarkMode() ? 0.84 : 0.74,
          strokeAlpha: isEarthMapDarkMode() ? 0.98 : 0.9,
        },
      ) || drewLayer;
    });
  }

  return drewLayer;
}

function getProjectBoundaryOutlineStyle(project, item) {
  const boundarySet = item?.boundarySet || null;
  const rank = normalizeProjectRankKey(boundarySet?.rank ?? item?.classification?.rank ?? "");
  return (project?.displaySettings?.rankOutlineStyles || PROJECT_RANK_OUTLINE_DEFAULTS)[rank] || PROJECT_RANK_OUTLINE_DEFAULTS[rank];
}

function getLineDashForStrokeStyle(strokeStyle, lineWidth) {
  const width = Math.max(0.8, Number(lineWidth) || 1);
  if (strokeStyle === "dashed") return [width * 5, width * 3];
  if (strokeStyle === "dotted") return [width * 1.1, width * 2.4];
  if (strokeStyle === "dash_dot") return [width * 5, width * 2.6, width * 1.1, width * 2.6];
  return [];
}

function createDiagonalHatchPattern(color, alpha = 0.86, lineWidth = 2, size = 14) {
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = size;
  patternCanvas.height = size;
  const patternCtx = patternCanvas.getContext("2d");
  if (!patternCtx) return hexToRgba(color, 0.38);
  patternCtx.clearRect(0, 0, size, size);
  patternCtx.strokeStyle = hexToRgba(color, alpha);
  patternCtx.lineWidth = lineWidth;
  patternCtx.lineCap = "round";
  // Suchmarkierungsregel: Bei Aufzählungen bleibt das erste Objekt flächig.
  // Weitere Objekte bekommen eine transparente Schraffur, damit sie als
  // gleichartige, aber sekundäre Treffer lesbar bleiben und die Grundkarte
  // darunter nicht vollständig zugedeckt wird.
  [-size, 0, size].forEach((offset) => {
    patternCtx.beginPath();
    patternCtx.moveTo(offset, size);
    patternCtx.lineTo(offset + size, 0);
    patternCtx.stroke();
  });
  return ctx.createPattern(patternCanvas, "repeat") || hexToRgba(color, 0.38);
}

function getBoundaryFeatureVectorCacheKey(featureCollection) {
  const features = Array.isArray(featureCollection?.features) ? featureCollection.features : [];
  if (!features.length) return "";
  const keys = features.map((feature, index) => {
    const props = feature?.properties || {};
    return feature?.stable_id
      || feature?.id
      || props.stable_id
      || props.iso_3166_2
      || props.adm1_code
      || props.ISO_A3
      || props.ADM0_A3
      || props.wikidata_id
      || `anonymous:${index}`;
  });
  if (keys.some((key) => String(key).startsWith("anonymous:"))) return "";
  return `${features.length}:${keys.join("|")}`;
}

function getPreparedBoundaryFeatureVectorPaths(featureCollection) {
  const cacheKey = getBoundaryFeatureVectorCacheKey(featureCollection);
  if (cacheKey && boundaryFeatureVectorPathCache.has(cacheKey)) {
    return boundaryFeatureVectorPathCache.get(cacheKey);
  }
  const polygons = extractLandPolygons(featureCollection);
  const prepared = { polygons, rings: polygons.flat() };
  if (cacheKey) {
    if (boundaryFeatureVectorPathCache.size > 320) boundaryFeatureVectorPathCache.clear();
    boundaryFeatureVectorPathCache.set(cacheKey, prepared);
  }
  return prepared;
}

async function prepareBoundaryFeatureVectorPathsInBatches(featureCollection, taskContext = {}) {
  const cacheKey = getBoundaryFeatureVectorCacheKey(featureCollection);
  if (cacheKey && boundaryFeatureVectorPathCache.has(cacheKey)) {
    return boundaryFeatureVectorPathCache.get(cacheKey);
  }
  const polygons = await extractLandPolygonsInBatches(featureCollection, taskContext);
  if (!polygons) return null;
  const prepared = { polygons, rings: polygons.flat() };
  if (cacheKey) {
    if (boundaryFeatureVectorPathCache.size > 320) boundaryFeatureVectorPathCache.clear();
    boundaryFeatureVectorPathCache.set(cacheKey, prepared);
  }
  return prepared;
}

function drawPreparedBoundaryFeatureVectorPaths(preparedPaths, radius, center, color, outlineColor = DEFAULT_LAYER_OUTLINE_COLOR, outlineStyle = {}) {
  const { polygons = [], rings = [] } = preparedPaths || {};
  if (!polygons.length || !rings.length) return false;
  const fillAlpha = Number.isFinite(Number(outlineStyle.fillAlpha)) ? clamp(Number(outlineStyle.fillAlpha), 0, 1) : 0.84;
  const strokeAlpha = Number.isFinite(Number(outlineStyle.strokeAlpha)) ? clamp(Number(outlineStyle.strokeAlpha), 0, 1) : 0.98;
  const hatchAlpha = Number.isFinite(Number(outlineStyle.hatchAlpha)) ? clamp(Number(outlineStyle.hatchAlpha), 0, 1) : 0.86;
  const hatchLineWidth = Number.isFinite(Number(outlineStyle.hatchLineWidth)) ? Math.max(0.5, Number(outlineStyle.hatchLineWidth)) : 2;
  const hatchSize = Number.isFinite(Number(outlineStyle.hatchSize)) ? Math.max(8, Number(outlineStyle.hatchSize)) : 14;
  const fillStyle = color
    ? (outlineStyle.fillMode === "diagonal-hatch" ? createDiagonalHatchPattern(color, hatchAlpha, hatchLineWidth, hatchSize) : hexToRgba(color, fillAlpha))
    : "";
  const strokeStyle = outlineColor ? hexToRgba(outlineColor, strokeAlpha) : "";
  const configuredLineWidth = Number(outlineStyle.strokeWidth);
  const lineWidth = Number.isFinite(configuredLineWidth) ? Math.max(0, configuredLineWidth) : getStableGlobeStrokeWidth(radius, 0.0042, 1.15);
  const lineDash = getLineDashForStrokeStyle(normalizeProjectStrokeStyle(outlineStyle.strokeStyle), lineWidth);
  const configuredDensity = Number(outlineStyle.density);
  const density = Number.isFinite(configuredDensity) && configuredDensity > 0
    ? configuredDensity
    : (globeZoom > 7 ? 0.35 : 0.75);

  // Layer-Regel: importierte Länder/Regionen müssen denselben
  // horizontgeschnittenen Vektorpfad nutzen wie die Grundkarte. D3s
  // sphärische Füllung kann bei bestimmten Rotationen das Komplement füllen
  // (ganzer Planet farbig, eigentliche Fläche ausgespart). Diese Funktion
  // hält die Farbebene deshalb explizit an die sichtbare Hemisphäre gebunden.
  if (fillStyle) {
    polygons.forEach((polygon) => {
      drawVisibleHemispherePolygonFill(
        polygon.map((ring) => densifyRing(ring, density)),
        radius,
        center,
        fillStyle,
      );
    });
  }

  if (strokeStyle && lineWidth > 0) {
    rings.forEach((ring) => {
      drawProjectedLine(densifyRing(ring, density), radius, center, strokeStyle, lineWidth, lineDash);
    });
  }

  return Boolean(fillStyle || (strokeStyle && lineWidth > 0));
}

function drawBoundaryFeatureVector(feature, radius, center, color, outlineColor = DEFAULT_LAYER_OUTLINE_COLOR, outlineStyle = {}) {
  const featureCollection = feature?.type === "FeatureCollection" ? feature : { type: "FeatureCollection", features: [feature] };
  return drawPreparedBoundaryFeatureVectorPaths(
    getPreparedBoundaryFeatureVectorPaths(featureCollection),
    radius,
    center,
    color,
    outlineColor,
    outlineStyle,
  );
}

function drawProjectedLine(points, radius, center, strokeStyle, lineWidth, lineDash = []) {
  let drawing = false;
  ctx.beginPath();
  ctx.setLineDash(Array.isArray(lineDash) ? lineDash : []);
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0) {
      drawing = false;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawProjectedFill(points, radius, center, fillStyle) {
  let drawing = false;
  let segmentPoints = 0;
  let filled = false;
  ctx.beginPath();
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0.006) {
      if (segmentPoints > 2) {
        ctx.closePath();
        filled = true;
      }
      drawing = false;
      segmentPoints = 0;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
      segmentPoints = 1;
    } else {
      ctx.lineTo(point.x, point.y);
      segmentPoints += 1;
    }
  });
  if (segmentPoints > 2) {
    ctx.closePath();
    filled = true;
  }
  if (!filled) return;
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function getHorizonIntersection(fromVector, toVector, horizon = 0.0008) {
  const denominator = toVector.z - fromVector.z;
  if (Math.abs(denominator) < 0.000001) return null;
  const t = clamp((horizon - fromVector.z) / denominator, 0, 1);
  const point = normalizeVector({
    x: fromVector.x + (toVector.x - fromVector.x) * t,
    y: fromVector.y + (toVector.y - fromVector.y) * t,
    z: horizon,
  });
  const xyLength = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / xyLength, y: point.y / xyLength, z: 0, horizon: true };
}

function clipRingVectorsToVisibleHemisphere(points, horizon = 0.0008) {
  const source = points
    .slice(0, -1)
    .map(([lon, lat]) => toRotatedUnit(lon, lat));
  if (source.length < 3) return [];

  const clipped = [];
  for (let index = 0; index < source.length; index += 1) {
    const current = source[index];
    const next = source[(index + 1) % source.length];
    const currentInside = current.z >= horizon;
    const nextInside = next.z >= horizon;

    if (currentInside && nextInside) {
      clipped.push(next);
      continue;
    }

    const intersection = getHorizonIntersection(current, next, horizon);
    if (currentInside && !nextInside) {
      if (intersection) clipped.push(intersection);
    } else if (!currentInside && nextInside) {
      if (intersection) clipped.push(intersection);
      clipped.push(next);
    }
  }

  return clipped.filter((vector, index, vectors) => {
    const previous = vectors[index - 1];
    return !previous || Math.hypot(vector.x - previous.x, vector.y - previous.y, vector.z - previous.z) > 0.00001;
  });
}

function drawShortestHorizonArc(fromVector, toVector, radius, center) {
  const startAngle = getVectorCanvasAngle(fromVector);
  const endAngle = getVectorCanvasAngle(toVector);
  const clockwiseDistance = normalizeAngle(endAngle - startAngle);
  const counterClockwise = clockwiseDistance > Math.PI;
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
}

function drawVisibleHemisphereFill(points, radius, center, fillStyle) {
  ctx.beginPath();
  if (!addVisibleHemisphereRingPath(points, radius, center)) return false;
  ctx.fillStyle = fillStyle;
  ctx.fill();
  return true;
}

function addVisibleHemisphereRingPath(points, radius, center) {
  const clipped = clipRingVectorsToVisibleHemisphere(points);
  if (clipped.length < 3) return false;
  clipped.forEach((vector, index) => {
    const previous = clipped[(index - 1 + clipped.length) % clipped.length];
    const point = projectVector(vector, radius, center.x, center.y);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
      return;
    }
    if (previous?.horizon && vector.horizon) {
      drawShortestHorizonArc(previous, vector, radius, center);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  const first = clipped[0];
  const last = clipped[clipped.length - 1];
  if (last?.horizon && first?.horizon) {
    drawShortestHorizonArc(last, first, radius, center);
  } else {
    ctx.closePath();
  }
  return true;
}

function drawVisibleHemispherePolygonFill(rings, radius, center, fillStyle) {
  const usableRings = (rings || []).filter((ring) => ring?.length > 2);
  if (!usableRings.length) return false;
  ctx.beginPath();
  let drewPath = false;
  usableRings.forEach((ring) => {
    if (addVisibleHemisphereRingPath(ring, radius, center)) drewPath = true;
  });
  if (!drewPath) return false;
  ctx.fillStyle = fillStyle;
  // GeoJSON-Polygone können Innenringe enthalten. Die evenodd-Füllregel ist
  // hier die fachliche Geometrieregel: Außenring füllt, Innenringe schneiden
  // aus. Dadurch bleiben Enklaven/ausgesparte Territorien transparent und
  // zeigen die darunterliegende Karte.
  ctx.fill("evenodd");
  return true;
}

function getVectorCanvasAngle(vector) {
  return Math.atan2(-vector.y, vector.x);
}

function normalizeAngle(angle) {
  return (angle + Math.PI * 2) % (Math.PI * 2);
}

function drawLandSampleFill(radius, center, alphaBase = 0.56) {
  if (!geoState.samplesReady || !geoState.landSamples.length) return;
  const dotRadius = Math.max(1.6, getStableGlobeStrokeWidth(radius, 0.0085, 1.6));
  const landColor = getThemeMapColor("--land", "#c4c4c0");
  geoState.landSamples.forEach(({ lon, lat }) => {
    const vector = toRotatedUnit(lon, lat);
    if (vector.z <= 0.012) return;
    const point = projectVector(vector, radius, center.x, center.y);
    const alpha = clamp(alphaBase + vector.z * 0.18, 0.52, 0.78);
    ctx.beginPath();
    ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(landColor, alpha);
    ctx.fill();
  });
}

function ringIsFullyVisible(points, horizonPadding = 0.018) {
  return points.every(([lon, lat]) => toRotatedUnit(lon, lat).z > horizonPadding);
}

function drawGraticule(radius, center) {
  const strokeStyle = "rgba(60,64,63,.26)";
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0022, 0.75);
  for (let lon = -180; lon <= 180; lon += 30) {
    const points = [];
    for (let lat = -84; lat <= 84; lat += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
}

function drawLand(radius, center) {
  if (geoState.status !== "ready") {
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,248,.62)";
    ctx.font = `${Math.max(11, radius * 0.055)}px Source Sans 3, system-ui, sans-serif`;
    ctx.fillText("Geodaten werden vorbereitet", center.x, center.y);
    ctx.restore();
    return;
  }

  geoState.landRings.forEach((ring) => {
    const denseRing = densifyRing(ring, 1.4);
    if (ringIsFullyVisible(denseRing)) {
      drawProjectedFill(denseRing, radius, center, hexToRgba(getContinentalRenderStyle().land, .72));
    }
  });

  if (geoState.samplesReady) {
    const dotRadius = Math.max(1.85, radius * 0.011);
    const landColor = getContinentalRenderStyle().land;
    geoState.landSamples.forEach(({ lon, lat }) => {
      const vector = toRotatedUnit(lon, lat);
      if (vector.z <= 0.01) return;
      const point = projectVector(vector, radius, center.x, center.y);
      const alpha = clamp(0.48 + vector.z * 0.24, 0.44, 0.76);
      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(landColor, alpha);
      ctx.fill();
    });
  }

  geoState.landRings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, 1.2), radius, center, getContinentalRenderStyle().outline, getStableGlobeStrokeWidth(radius, 0.002, 0.7));
  });
}

function drawAtmosphere(size, radius, center) {
  const intensity = Math.max(0, Math.min(1, (2.35 - globeZoom) / 1.35));
  if (intensity <= 0) return;
  const shade = ctx.createRadialGradient(center.x - radius * 0.34, center.y - radius * 0.36, radius * 0.05, center.x, center.y, radius);
  shade.addColorStop(0, `rgba(255,255,255,${0.18 * intensity})`);
  shade.addColorStop(0.38, `rgba(255,255,255,${0.03 * intensity})`);
  shade.addColorStop(0.76, "rgba(0,0,0,0)");
  shade.addColorStop(1, `rgba(80,84,82,${0.16 * intensity})`);
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = shade;
  ctx.fill();
  ctx.lineWidth = Math.max(1, size * 0.004);
  ctx.strokeStyle = getThemeMapColor("--sphere-outline", "rgba(92,96,94,.28)");
  ctx.stroke();
}

function renderGlobe() {
  // Engine-Regel: Sobald MapLibre aktiv ist, darf der alte Canvas-/WebGL-
  // Renderer nicht mehr parallel rechnen. Er ist dann visuell ausgeblendet,
  // würde aber sonst bei jeder Mausbewegung weiterhin Vektorpfade, Gewässer,
  // Statistikflächen und Atmosphäreneffekte vorbereiten — genau der doppelte
  // Renderweg, der die neue Engine trotz schneller Layer ruckelig machte.
  if (mapLibreEngineState.active) return;
  if (renderWebglGlobe()) return;
  const rect = ui.globe.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const baseSize = Math.min(width, height);
  ui.globeCanvas.width = Math.floor(width * dpr);
  ui.globeCanvas.height = Math.floor(height * dpr);
  ui.globeCanvas.style.width = `${width}px`;
  ui.globeCanvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  // Darstellungsregel: Zoom 1 ist immer die vollständig sichtbare Startkugel.
  // Alle höheren Zoomstufen skalieren von diesem fensterabhängigen Fit-Radius
  // aus; dadurch bleibt die kleinste Ansicht auch bei Resize zuverlässig zentriert
  // und vollständig im verfügbaren Renderbereich.
  const radius = baseSize * 0.47 * globeZoom;
  const center = { x: width / 2, y: height / 2 };
  drawSphere(baseSize, radius, center);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  if (shouldRenderContinentalBaseMap()) {
    const usedGeographicProjection = drawGeographicLayer(radius, center);
    if (!usedGeographicProjection) {
      drawLand(radius, center);
    }
    drawMapSearchHighlights(radius, center, { contextOnly: true });
  }
  drawProjectBoundaryLayers(radius, center);
  drawStatisticalDataLayer(radius, center);
  drawMapSearchHighlights(radius, center, { focusOnly: true });
  // Layerregel: Gewässer gehören zur Grundkarte und bleiben sichtbar über
  // thematischen Füllungen; Grenzen/Küsten werden anschließend wieder lesbar
  // darüber gesetzt.
  if (shouldRenderContinentalBaseMap()) drawNaturalEarthLakeLayer(radius, center);
  if (shouldRenderContinentalBaseMap()) drawNaturalEarthAdmin0BoundaryLayer(radius, center);
  drawNaturalEarthAdmin1BoundaryLayer(radius, center);
  if (shouldRenderContinentalBaseMap()) drawNaturalEarthCoastlineOverlay(radius, center);
  if (state.showGraticule) drawGraticule(radius, center);
  drawAtmosphere(baseSize, radius, center);
  ctx.restore();
}

function resetProjectDeleteHold() {
  if (!projectDeleteHoldState) return;
  const { button, frame, pointerId } = projectDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  if (button) {
    button.classList.remove("is-hold-active", "is-hold-ready");
    button.style.removeProperty("--hold-progress");
    if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
      try {
        button.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }
  }
  projectDeleteHoldState = null;
}

function tickProjectDeleteHold() {
  if (!projectDeleteHoldState) return;
  const elapsed = performance.now() - projectDeleteHoldState.startedAt;
  const progress = Math.max(0, Math.min(1, elapsed / PROJECT_DELETE_HOLD_MS));
  projectDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    projectDeleteHoldState.armed = true;
    projectDeleteHoldState.button.classList.add("is-hold-ready");
    projectDeleteHoldState.frame = null;
    return;
  }
  projectDeleteHoldState.frame = requestAnimationFrame(tickProjectDeleteHold);
}

function deleteProjectById(projectId) {
  const index = state.projects.findIndex((project) => project.id === projectId);
  if (index < 0) return;
  state.projects.splice(index, 1);
  if (state.activeProjectId === projectId) {
    state.activeProjectId = "";
  }
  state.openProjectBrowserMenuId = null;
  persistProjects();
  renderWorkspace();
  syncMapLibreSearchHighlight();
  void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
  renderGlobe();
}

function beginProjectDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetProjectDeleteHold();
  const projectId = String(button.dataset.projectId || "").trim();
  if (!projectId) return;
  projectDeleteHoldState = {
    button,
    projectId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null,
  };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  projectDeleteHoldState.frame = requestAnimationFrame(tickProjectDeleteHold);
}

function finishProjectDeleteHold(event) {
  if (!projectDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const { button, projectId } = projectDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && button && (releaseTarget === button || button.contains(releaseTarget)));
  const shouldDelete = projectDeleteHoldState.armed === true && releasedOnButton;
  resetProjectDeleteHold();
  if (shouldDelete) deleteProjectById(projectId);
}

function cancelProjectDeleteHold(event) {
  if (!projectDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetProjectDeleteHold();
}

function resetLayerDeleteHold() {
  if (!layerDeleteHoldState) return;
  const { button, frame, pointerId } = layerDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  if (button) {
    button.classList.remove("is-hold-active", "is-hold-ready");
    button.style.removeProperty("--hold-progress");
    if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
      try {
        button.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }
  }
  layerDeleteHoldState = null;
}

function tickLayerDeleteHold() {
  if (!layerDeleteHoldState) return;
  const elapsed = performance.now() - layerDeleteHoldState.startedAt;
  const progress = Math.max(0, Math.min(1, elapsed / PROJECT_DELETE_HOLD_MS));
  layerDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    layerDeleteHoldState.armed = true;
    layerDeleteHoldState.button.classList.add("is-hold-ready");
    layerDeleteHoldState.frame = null;
    return;
  }
  layerDeleteHoldState.frame = requestAnimationFrame(tickLayerDeleteHold);
}

function deleteLayerById(projectId, layerId) {
  const project = state.projects.find((candidate) => candidate.id === projectId);
  const location = findLibraryItemLocation(project, layerId);
  if (!location) return;
  if (location.item?.locked) return;
  location.items.splice(location.index, 1);
  if (project.activeLibraryItemId === layerId) {
    const siblingItems = location.items;
    project.activeLibraryItemId = siblingItems[Math.max(0, location.index - 1)]?.id || siblingItems[0]?.id || "";
  }
  state.openLayerBrowserMenuId = null;
  persistProjects();
  renderWorkspace();
  renderGlobe();
}

function moveLibraryItem(projectId, layerId, targetSubfolderId = "") {
  const project = state.projects.find((candidate) => candidate.id === projectId);
  const location = findLibraryItemLocation(project, layerId);
  if (!project || !location || location.item?.locked) return;

  if (targetSubfolderId && !(location.folder.subfolders || []).some((subfolder) => subfolder.id === targetSubfolderId)) {
    const sharedTitle = getProjectSubfolderEntries(project).find((entry) => entry.id === targetSubfolderId)?.title || "Unterordner";
    location.folder.subfolders = Array.isArray(location.folder.subfolders) ? location.folder.subfolders : [];
    location.folder.subfolders.push(createLibrarySubfolder(sharedTitle, targetSubfolderId));
  }
  const targetItems = targetSubfolderId
    ? (location.folder.subfolders || []).find((subfolder) => subfolder.id === targetSubfolderId)?.items
    : location.folder.items;
  if (!targetItems || targetItems === location.items) return;

  const [item] = location.items.splice(location.index, 1);
  targetItems.push(item);
  project.activeLibraryItemId = item.id;
  state.openLayerBrowserMenuId = null;
  state.activeSubfolderRef = null;
  persistProjects();
  renderWorkspace();
  renderGlobe();
  openLibraryItemEditor(item);
}

function getLibraryDropTargetFromElement(element) {
  const target = element instanceof Element
    ? element.closest("[data-library-drop-target='true']")
    : null;
  if (!target) return null;
  return {
    projectId: target.dataset.projectId || "",
    folderType: target.dataset.folderType || "",
    subfolderId: target.dataset.subfolderId || "",
  };
}

function isValidLibraryDropTarget(dragged, target) {
  if (!dragged || !target) return false;
  if (dragged.projectId !== target.projectId) return false;
  if (target.folderType && dragged.folderType !== target.folderType) return false;
  if (dragged.subfolderId === target.subfolderId) return false;
  return true;
}

function clearLibraryDropHighlights() {
  document.querySelectorAll(".is-drop-target, .is-drop-invalid").forEach((node) => {
    node.classList.remove("is-drop-target", "is-drop-invalid");
  });
}

function beginLibraryItemDrag(event) {
  const card = event.currentTarget;
  if (!(card instanceof HTMLElement)) return;
  const projectId = card.dataset.projectId || "";
  const layerId = card.dataset.libraryItemId || "";
  const folderType = card.dataset.folderType || "";
  const subfolderId = card.dataset.subfolderId || "";
  const project = state.projects.find((candidate) => candidate.id === projectId);
  const location = findLibraryItemLocation(project, layerId);
  if (!project || !location || location.item?.locked) {
    event.preventDefault();
    return;
  }
  state.draggedLibraryItem = { projectId, layerId, folderType, subfolderId };
  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", layerId);
}

function finishLibraryItemDrag(event) {
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.classList.remove("is-dragging");
  }
  state.draggedLibraryItem = null;
  clearLibraryDropHighlights();
}

function handleLibraryDropTargetDragOver(event) {
  const targetData = getLibraryDropTargetFromElement(event.target);
  const targetElement = event.target instanceof Element
    ? event.target.closest("[data-library-drop-target='true']")
    : null;
  if (!targetElement) return;
  const valid = isValidLibraryDropTarget(state.draggedLibraryItem, targetData);
  if (valid) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  clearLibraryDropHighlights();
  targetElement.classList.toggle("is-drop-target", valid);
  targetElement.classList.toggle("is-drop-invalid", Boolean(state.draggedLibraryItem) && !valid);
}

function handleLibraryDropTargetLeave(event) {
  const targetElement = event.currentTarget;
  if (!(targetElement instanceof HTMLElement)) return;
  if (event.relatedTarget instanceof Node && targetElement.contains(event.relatedTarget)) return;
  targetElement.classList.remove("is-drop-target", "is-drop-invalid");
}

function handleLibraryItemDrop(event) {
  const targetData = getLibraryDropTargetFromElement(event.target);
  if (!isValidLibraryDropTarget(state.draggedLibraryItem, targetData)) return;
  event.preventDefault();
  const dragged = state.draggedLibraryItem;
  state.draggedLibraryItem = null;
  clearLibraryDropHighlights();
  moveLibraryItem(dragged.projectId, dragged.layerId, targetData.subfolderId);
}

function setupLibraryDropTarget(element, project, folderType, subfolderId = "") {
  element.dataset.libraryDropTarget = "true";
  element.dataset.projectId = project.id;
  element.dataset.folderType = folderType;
  element.dataset.subfolderId = subfolderId;
  element.addEventListener("dragover", handleLibraryDropTargetDragOver);
  element.addEventListener("dragleave", handleLibraryDropTargetLeave);
  element.addEventListener("drop", handleLibraryItemDrop);
}

function beginLayerDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetLayerDeleteHold();
  const projectId = String(button.dataset.projectId || "").trim();
  const layerId = String(button.dataset.layerId || "").trim();
  if (!projectId || !layerId) return;
  layerDeleteHoldState = {
    button,
    projectId,
    layerId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null,
  };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  layerDeleteHoldState.frame = requestAnimationFrame(tickLayerDeleteHold);
}

function finishLayerDeleteHold(event) {
  if (!layerDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const { button, projectId, layerId } = layerDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && button && (releaseTarget === button || button.contains(releaseTarget)));
  const shouldDelete = layerDeleteHoldState.armed === true && releasedOnButton;
  resetLayerDeleteHold();
  if (shouldDelete) deleteLayerById(projectId, layerId);
}

function cancelLayerDeleteHold(event) {
  if (!layerDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetLayerDeleteHold();
}

function createProjectCardMenu(project) {
  const shell = document.createElement("div");
  shell.className = "project-card-menu-shell";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "project-card-menu-trigger";
  trigger.setAttribute("aria-label", "Projektaktionen");
  trigger.setAttribute("aria-expanded", state.openProjectBrowserMenuId === project.id ? "true" : "false");
  trigger.innerHTML = "<span class=\"project-card-menu-dots\" aria-hidden=\"true\"></span>";
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    state.openLayerBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openProjectBrowserMenuId = state.openProjectBrowserMenuId === project.id ? null : project.id;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "project-card-menu";
  menu.hidden = state.openProjectBrowserMenuId !== project.id;

  const propertiesButton = document.createElement("button");
  propertiesButton.type = "button";
  propertiesButton.className = "project-card-menu-action";
  propertiesButton.textContent = "Eigenschaften";
  propertiesButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.openProjectBrowserMenuId = null;
    state.activeProjectId = project.id;
    persistProjects();
    rehydrateSavedSearchLayers(project, { persist: true });
    renderProjectBrowser();
    openProjectEditor(project);
  });

  const addSubfolderButton = document.createElement("button");
  addSubfolderButton.type = "button";
  addSubfolderButton.className = "project-card-menu-action";
  addSubfolderButton.textContent = "Unterordner erstellen";
  addSubfolderButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.openProjectBrowserMenuId = null;
    createProjectSubfolder(project);
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "project-card-menu-action project-card-menu-action-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.addEventListener("pointerdown", beginProjectDeleteHold);
  deleteButton.addEventListener("pointerup", finishProjectDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelProjectDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelProjectDeleteHold);

  menu.append(propertiesButton, addSubfolderButton, deleteButton);
  shell.append(trigger, menu);
  return shell;
}

function renderProjectBrowser() {
  const browserNodes = [];
  if (!state.projects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Projekt angelegt. Die Erde oben ist die neutrale Startansicht.";
    browserNodes.push(empty);
  } else {
    browserNodes.push(...state.projects.map((project) => {
      const boundarySet = getActiveBoundarySet(project);
      const boundaryLayers = getLibraryFolderItems(getLibraryFolder(project, "boundary-maps"));
      const boundaryCollections = getLibraryFolderItems(getLibraryFolder(project, "boundary-collections"));
      const projectNodeId = `project:${project.id}`;
      const projectCollapsed = isBrowserNodeCollapsed(projectNodeId);
      const isActiveProject = project.id === state.activeProjectId;
      const card = document.createElement("article");
      card.className = "project-card";
      if (isActiveProject) card.classList.add("is-active");
      card.dataset.projectId = project.id;

      const row = document.createElement("div");
      row.className = "project-browser-row project-row";
      row.dataset.projectId = project.id;
      setupLibraryDropTarget(row, project, "", "");

      const visibility = document.createElement("input");
      visibility.type = "checkbox";
      visibility.className = "browser-visibility-checkbox";
      visibility.checked = isActiveProject;
      visibility.title = isActiveProject ? "Dieses Projekt deaktivieren" : "Dieses Projekt aktivieren";
      visibility.addEventListener("click", (event) => event.stopPropagation());
      visibility.addEventListener("change", () => {
        // Projektregel: Der Haken auf Projektebene ist kein Sichtbarkeitsschalter
        // für Layer. Er wählt maximal ein aktives Earth-Map-Projekt, darf aber
        // auch alle Projekte deaktivieren; dann zeigt EarthMap die neutrale Erde.
        if (!visibility.checked && state.activeProjectId === project.id) {
          state.activeProjectId = "";
        } else if (visibility.checked) {
          state.activeProjectId = project.id;
        }
        state.openProjectBrowserMenuId = null;
        state.openFolderBrowserMenuId = null;
        state.openLayerBrowserMenuId = null;
        resetProjectDeleteHold();
        resetLayerDeleteHold();
        persistProjects();
        rehydrateSavedSearchLayers(getActiveProject(), { persist: true });
        renderWorkspace();
        renderGlobe();
      });

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "browser-tree-toggle";
      toggle.textContent = projectCollapsed ? "▸" : "▾";
      toggle.setAttribute("aria-label", `${project.title} ${projectCollapsed ? "aufklappen" : "zuklappen"}`);
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBrowserNode(projectNodeId);
      });

      const icon = document.createElement("span");
      icon.className = "browser-row-icon browser-row-icon-project";
      icon.style.setProperty("--browser-row-icon-url", `url("${getIconifyPreviewUrl(project.iconName, project.iconColor || "#9a6419", 18)}")`);
      icon.style.color = normalizeColorValue(project.iconColor, "#9a6419") || "#9a6419";
      icon.setAttribute("aria-hidden", "true");

      const main = document.createElement("button");
      main.type = "button";
      main.className = "project-card-main";
      main.dataset.projectId = project.id;
      const title = document.createElement("strong");
      title.textContent = project.title;
      const meta = document.createElement("span");
      const totalMaps = boundaryLayers.length + boundaryCollections.length;
      const dataLayerCount = Array.isArray(project.dataLayers) ? project.dataLayers.length : 0;
      meta.textContent = [
        boundarySet?.label || "ohne Grenzgrundlage",
        `${totalMaps} Karten`,
        dataLayerCount ? `${dataLayerCount} Datenlayer` : "",
        project.status,
      ].filter(Boolean).join(" · ");
      main.append(title, meta);
      row.append(visibility, toggle, icon, main, createProjectCardMenu(project));
      card.append(row);
      if (!projectCollapsed) {
        card.append(createProjectMapTree(project));
      }
      return card;
    }));
  }
  browserNodes.push(createBrowserFooterSpacer(), createNaturalEarthArchiveCard(), createBrowserTrashRow());
  ui.projectBrowserList.replaceChildren(...browserNodes);
}

function getProjectMapFolders(project) {
  return [
    getLibraryFolder(project, "boundary-maps"),
    getLibraryFolder(project, "boundary-collections"),
  ].filter(Boolean);
}

function getProjectDirectMapItems(project) {
  const mapItems = getProjectMapFolders(project)
    .flatMap((folder) => (folder.items || []).map((item) => ({ item, folderType: folder.type })));
  const statisticItems = (project?.dataLayers || [])
    .map((item) => ({ item, folderType: "data-layers" }));
  return [...mapItems, ...statisticItems];
}

function getProjectSubfolderEntries(project) {
  const entries = new Map();
  getProjectMapFolders(project).forEach((folder) => {
    (folder.subfolders || []).forEach((subfolder) => {
      if (!entries.has(subfolder.id)) {
        entries.set(subfolder.id, { id: subfolder.id, title: subfolder.title || "Unterordner" });
      }
    });
  });
  return [...entries.values()];
}

function getProjectSubfolderItems(project, subfolderId) {
  return getProjectMapFolders(project).flatMap((folder) => {
    const subfolder = (folder.subfolders || []).find((candidate) => candidate.id === subfolderId);
    return (subfolder?.items || []).map((item) => ({ item, folderType: folder.type }));
  });
}

function getNaturalEarthAdmin0ArchiveGroups() {
  const engineIndex = getNaturalEarthAdmin0EngineIndex();
  if (engineIndex?.chunks?.length) {
    const overrides = getActiveProject()?.naturalEarthOverrides || {};
    return engineIndex.chunks
      .map((entry) => {
        const archiveKey = entry.stable_id;
        const override = overrides[archiveKey] || {};
        const name = repairLegacyText(override.name || override.boundarySet?.title || entry.title || entry.provider_boundary_id || "Unbenannt");
        return {
          title: name,
          items: [{
            archiveKey,
            name,
            type: repairLegacyText(override.boundarySet?.boundary_type || "Staat / abhängiges Gebiet"),
            iso3: override.boundarySet?.country_iso3 || override.iso3 || entry.country_iso3 || entry.provider_boundary_id || "",
            sovereign: "",
            wikidataId: override.boundarySet?.wikidata_id || override.wikidataId || entry.wikidata_id || "",
          }],
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title, "de"));
  }
  const features = getNaturalEarthCountryDataset().features || [];
  const overrides = getActiveProject()?.naturalEarthOverrides || {};
  const groups = new Map();
  features.forEach((feature) => {
    const properties = feature.properties || {};
    const sovereign = repairLegacyText(properties.SOVEREIGNT || properties.ADMIN || "Unbestimmt");
    if (!groups.has(sovereign)) groups.set(sovereign, []);
    groups.get(sovereign).push(feature);
  });
  return [...groups.entries()]
    .map(([title, items]) => ({
      title,
      iso3: String(items[0]?.properties?.adm0_a3 || items[0]?.properties?.sov_a3 || "").toUpperCase(),
      items: items
        .map((feature) => {
          const properties = feature.properties || {};
          const archiveKey = getNaturalEarthAdmin0ArchiveKey(feature);
          const override = overrides[archiveKey] || {};
          return {
            archiveKey,
            name: repairLegacyText(override.name || override.boundarySet?.title || properties.NAME_EN || properties.NAME || properties.ADMIN || "Unbenannt"),
            type: repairLegacyText(override.boundarySet?.boundary_type || properties.TYPE || "Einheit"),
            iso3: override.boundarySet?.country_iso3 || override.iso3 || properties.ADM0_A3 || properties.ISO_A3 || "",
            sovereign: repairLegacyText(properties.SOVEREIGNT || ""),
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name, "de")),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "de"));
}

function getNaturalEarthAdmin1ArchiveGroups() {
  const features = state.naturalEarthAdmin1Dataset?.features || [];
  const overrides = getActiveProject()?.naturalEarthOverrides || {};
  const groups = new Map();
  features.forEach((feature) => {
    const properties = feature.properties || {};
    const stateTitle = repairLegacyText(properties.admin || properties.geonunit || properties.adm0_a3 || "Unbestimmt");
    if (!groups.has(stateTitle)) groups.set(stateTitle, []);
    groups.get(stateTitle).push(feature);
  });
  return [...groups.entries()]
    .map(([title, items]) => ({
      title,
      items: items
        .map((feature) => {
          const properties = feature.properties || {};
          const archiveKey = getNaturalEarthAdmin1ArchiveKey(feature);
          const override = overrides[archiveKey] || {};
          return {
            archiveKey,
            name: repairLegacyText(override.name || override.boundarySet?.title || properties.name_de || properties.name || properties.name_en || properties.adm1_code || "Unbenannt"),
            type: repairLegacyText(override.boundarySet?.boundary_type || properties.type || properties.type_en || "Gliedstaat / Provinz"),
            iso3: override.boundarySet?.country_iso3 || override.iso3 || properties.adm0_a3 || properties.sov_a3 || "",
            code: properties.iso_3166_2 || properties.adm1_code || "",
            wikidataId: override.boundarySet?.wikidata_id || override.wikidataId || properties.wikidataid || "",
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name, "de")),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "de"));
}

function getNaturalEarthAdmin1ArchiveItemsForState(stateTitle) {
  if (!state.naturalEarthAdmin1Dataset) return [];
  const stateIso3 = getNaturalEarthAdmin0EngineIndex()?.chunks
    ?.find((entry) => repairLegacyText(entry.title || "") === stateTitle)?.country_iso3 || "";
  const matchingGroup = getNaturalEarthAdmin1ArchiveGroups().find((group) => (
    group.title === stateTitle || (stateIso3 && group.iso3 === stateIso3)
  ));
  return matchingGroup?.items || [];
}

function getNaturalEarthAdmin0ArchiveKey(feature) {
  const properties = feature?.properties || {};
  const raw = properties.ADM0_A3 || properties.ISO_A3 || properties.ADM0_A3_US || properties.NAME || properties.ADMIN || "";
  return `natural-earth:10m:admin0:${slugifyBoundaryId(raw, "admin0")}`;
}

function getNaturalEarthAdmin1ArchiveKey(feature) {
  if (feature?.stable_id) return feature.stable_id;
  const properties = feature?.properties || {};
  const raw = properties.iso_3166_2 || properties.adm1_code || properties.name || properties.name_en || "";
  return `natural-earth:10m:admin1:${slugifyBoundaryId(raw, "admin1")}`;
}

function findNaturalEarthAdmin0FeatureByArchiveKey(archiveKey) {
  const loadedEngineFeature = getLoadedNaturalEarthAdmin0EngineFeatures()
    .find((feature) => getNaturalEarthAdmin0ArchiveKey(feature) === archiveKey);
  if (loadedEngineFeature) return loadedEngineFeature;
  return (getNaturalEarthCountryDataset().features || []).find((feature) => getNaturalEarthAdmin0ArchiveKey(feature) === archiveKey) || null;
}

function findNaturalEarthAdmin1FeatureByArchiveKey(archiveKey) {
  for (const dataset of state.naturalEarthAdmin1CountryChunkCache.values()) {
    const match = (dataset?.features || []).find((feature) => getNaturalEarthAdmin1ArchiveKey(feature) === archiveKey);
    if (match) return match;
  }
  const features = state.naturalEarthAdmin1Dataset?.features || window.EarthMapNaturalEarthAdmin1Metadata10m?.features || [];
  return features.find((feature) => getNaturalEarthAdmin1ArchiveKey(feature) === archiveKey) || null;
}

function getNaturalEarthArchiveFeature(datasetId, archiveKey) {
  if (datasetId === "admin_1_states_provinces") return findNaturalEarthAdmin1FeatureByArchiveKey(archiveKey);
  return findNaturalEarthAdmin0FeatureByArchiveKey(archiveKey);
}

function createNaturalEarthArchiveItemDefaults(datasetId, feature) {
  const properties = feature?.properties || {};
  const isAdmin1 = datasetId === "admin_1_states_provinces";
  const archiveKey = isAdmin1 ? getNaturalEarthAdmin1ArchiveKey(feature) : getNaturalEarthAdmin0ArchiveKey(feature);
  const title = isAdmin1
    ? repairLegacyText(properties.name_de || properties.name || properties.name_en || properties.adm1_code || "Unbenannt")
    : repairLegacyText(properties.NAME_EN || properties.NAME || properties.ADMIN || "Unbenannt");
  const iso3 = isAdmin1
    ? String(properties.adm0_a3 || properties.sov_a3 || "").toUpperCase()
    : String(properties.ADM0_A3 || properties.ISO_A3 || "").toUpperCase();
  const providerId = isAdmin1
    ? properties.iso_3166_2 || properties.adm1_code || archiveKey
    : properties.ADM0_A3 || properties.ISO_A3 || archiveKey;
  const wikidataId = normalizeWikidataId(isAdmin1 ? properties.wikidataid : properties.WIKIDATAID);
  const typeLabel = isAdmin1
    ? repairLegacyText(properties.type || properties.type_en || "Gliedstaat / Provinz")
    : repairLegacyText(properties.TYPE || "Staat / abhängiges Gebiet");
  const rank = isAdmin1 ? 2 : 1;
  const versionId = `${archiveKey}@natural-earth-10m-reference`;
  return normalizeLibraryItem({
    id: archiveKey,
    kind: "boundary-map",
    name: title,
    source: "Natural Earth",
    iso3,
    wikidataId,
    adminLevel: isAdmin1 ? "ADM1" : "ADM0",
    detail: "10m",
    license: "Public Domain",
    sourceUrl: isAdmin1
      ? `${EARTHMAP_ENGINE_ADMIN1_BASE}index.json`
      : `${EARTHMAP_ENGINE_ADMIN0_BASE}index.json`,
    importedAt: "system-archive",
    temporalCoverage: {
      label: "gegenwärtiger Natural-Earth-Datensatz",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "",
      outlineColor: DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: {
      provider: "natural-earth-archive",
      dataset: datasetId,
      archiveKey,
    },
    boundarySet: {
      id: archiveKey,
      stable_id: archiveKey,
      version_id: versionId,
      title,
      schema: EARTHMAP_BOUNDARY_SET_SCHEMA,
      provider: "Natural Earth",
      provider_boundary_id: String(providerId || ""),
      boundary_type: "administrative",
      country_iso3: iso3,
      admin_level: isAdmin1 ? "ADM1" : "ADM0",
      wikidata_id: wikidataId,
      review_status: "imported",
      year_represented: "",
      valid_from: "",
      valid_to: null,
      valid_precision: "unknown",
      temporal_status: "undated_reference",
      temporal_note: "Natural Earth wird hier als moderne Referenzgeometrie geführt. Die fachliche Gültigkeit muss bei Bedarf nach Quelle und Zeitraum präzisiert werden.",
      type: isAdmin1 ? "constituent_state" : "state",
      rank,
      sovereignty_status: isAdmin1 ? "non_sovereign" : "",
      relation_to_parent: isAdmin1 ? "administrative_subdivision" : "none",
      parent_id: isAdmin1 ? iso3 : "",
      geometry_scope: "core_territory",
      data_binding: createBoundaryDataBindingDefaults(),
      source: {
        label: "Natural Earth",
        url: "https://www.naturalearthdata.com/",
        accessed_at: "",
      },
      license: {
        id: "public-domain",
        label: "Public Domain",
        url: "https://www.naturalearthdata.com/about/terms-of-use/",
        detail: "Natural Earth public domain map data.",
        compatibility: {
          wikimedia: true,
          openstreetmap: true,
          attribution_required: false,
        },
      },
      features: feature?.geometry ? [{
        id: archiveKey,
        stable_id: archiveKey,
        version_id: versionId,
        name: title,
        wikidata_id: wikidataId,
        parent_id: isAdmin1 ? iso3 : "",
        rank,
        valid_from: "",
        valid_to: null,
        valid_precision: "unknown",
        temporal_status: "undated_reference",
        properties: { ...properties, ziselin_archive_type: typeLabel },
        geometry: feature.geometry,
      }] : [],
    },
    locked: true,
  });
}

function getEditableNaturalEarthArchiveItem(datasetId, archiveKey) {
  const project = getActiveProject();
  const feature = getNaturalEarthArchiveFeature(datasetId, archiveKey);
  if (!project || !feature) return null;
  project.naturalEarthOverrides = project.naturalEarthOverrides || {};
  const defaults = createNaturalEarthArchiveItemDefaults(datasetId, feature);
  const existing = project.naturalEarthOverrides[archiveKey] || {};
  const merged = normalizeLibraryItem({
    ...defaults,
    ...existing,
    display: { ...(defaults.display || {}), ...(existing.display || {}) },
    temporalCoverage: { ...(defaults.temporalCoverage || {}), ...(existing.temporalCoverage || {}) },
    geometryRef: { ...(defaults.geometryRef || {}), ...(existing.geometryRef || {}) },
    boundarySet: {
      ...(defaults.boundarySet || {}),
      ...(existing.boundarySet || {}),
      source: { ...(defaults.boundarySet?.source || {}), ...(existing.boundarySet?.source || {}) },
      license: {
        ...(defaults.boundarySet?.license || {}),
        ...(existing.boundarySet?.license || {}),
        compatibility: {
          ...(defaults.boundarySet?.license?.compatibility || {}),
          ...(existing.boundarySet?.license?.compatibility || {}),
        },
      },
      features: defaults.boundarySet?.features || [],
    },
  });
  project.naturalEarthOverrides[archiveKey] = merged;
  return merged;
}

function getNaturalEarthArchiveGroups(datasetId) {
  if (datasetId === "admin_1_states_provinces") return getNaturalEarthAdmin1ArchiveGroups();
  if (datasetId === "admin_0_countries") return getNaturalEarthAdmin0ArchiveGroups();
  return [];
}

function createNaturalEarthArchiveCard() {
  const archiveNodeId = `archive:${NATURAL_EARTH_ARCHIVE_ID}`;
  const archiveCollapsed = isArchiveBrowserNodeCollapsed(archiveNodeId);
  const groups = getNaturalEarthArchiveGroups("admin_0_countries");
  const featureCount = groups.reduce((sum, group) => sum + group.items.length, 0);

  const card = document.createElement("article");
  card.className = "project-card archive-browser-card";

  const row = document.createElement("div");
  row.className = "project-browser-row archive-browser-row";

  const checkboxSpacer = document.createElement("span");
  checkboxSpacer.className = "browser-visibility-checkbox browser-visibility-spacer";
  checkboxSpacer.setAttribute("aria-hidden", "true");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "browser-tree-toggle";
  toggle.textContent = archiveCollapsed ? "▸" : "▾";
  toggle.setAttribute("aria-label", `Natural-Earth-Archiv ${archiveCollapsed ? "aufklappen" : "zuklappen"}`);
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleArchiveBrowserNode(archiveNodeId);
  });

  const icon = document.createElement("span");
  icon.className = "browser-row-icon browser-row-icon-archive";
  icon.setAttribute("aria-hidden", "true");

  const main = document.createElement("button");
  main.type = "button";
  main.className = "project-card-main";
  main.addEventListener("click", (event) => {
    event.preventDefault();
    toggleArchiveBrowserNode(archiveNodeId);
  });
  const title = document.createElement("strong");
  title.textContent = "Archiv";
  const meta = document.createElement("span");
  meta.textContent = `Natural Earth · ${NATURAL_EARTH_ARCHIVE_DATASETS.length} Datensätze · ${groups.length} Staatsordner · ${featureCount} Einheiten`;
  main.append(title, meta);
  row.append(checkboxSpacer, toggle, icon, main);
  card.append(row);

  if (!archiveCollapsed) {
    const tree = document.createElement("div");
    tree.className = "project-layer-tree archive-browser-tree";

    const datasetList = document.createElement("div");
    datasetList.className = "archive-dataset-list";
    NATURAL_EARTH_ARCHIVE_DATASETS
      .filter((dataset) => dataset.id !== "admin_1_states_provinces")
      .forEach((dataset) => {
      const datasetNodeId = `archive:${NATURAL_EARTH_ARCHIVE_ID}:dataset:${dataset.id}`;
      const isGroupedUnitDataset = dataset.id === "admin_0_countries";
      const datasetCollapsed = isArchiveBrowserNodeCollapsed(datasetNodeId);
      const datasetGroups = getNaturalEarthArchiveGroups(dataset.id);
      const datasetFeatureCount = datasetGroups.reduce((sum, group) => sum + group.items.length, 0);
      const datasetRow = document.createElement("div");
      datasetRow.className = "project-browser-row archive-dataset-row";
      if (isGroupedUnitDataset) datasetRow.classList.add("archive-dataset-row-folder");

      const datasetToggle = document.createElement("button");
      datasetToggle.type = "button";
      datasetToggle.className = "browser-tree-toggle";
      datasetToggle.textContent = isGroupedUnitDataset ? (datasetCollapsed ? "▸" : "▾") : "";
      datasetToggle.disabled = !isGroupedUnitDataset;
      datasetToggle.setAttribute("aria-label", `${dataset.label} ${datasetCollapsed ? "aufklappen" : "zuklappen"}`);
      datasetToggle.addEventListener("click", (event) => {
        if (!isGroupedUnitDataset) return;
        event.preventDefault();
        event.stopPropagation();
        toggleArchiveBrowserNode(datasetNodeId);
      });

      const datasetIcon = document.createElement("span");
      datasetIcon.className = "browser-row-icon browser-row-icon-dataset";
      datasetIcon.setAttribute("aria-hidden", "true");
      const copy = isGroupedUnitDataset ? document.createElement("button") : document.createElement("div");
      copy.className = "project-card-main";
      if (isGroupedUnitDataset) {
        copy.type = "button";
        copy.addEventListener("click", (event) => {
          event.preventDefault();
          toggleArchiveBrowserNode(datasetNodeId);
        });
      }
      const datasetTitle = document.createElement("strong");
      datasetTitle.textContent = dataset.label;
      const datasetMeta = document.createElement("span");
      datasetMeta.textContent = isGroupedUnitDataset && (datasetFeatureCount || dataset.id === "admin_0_countries")
        ? [dataset.detail, `${datasetGroups.length} Staatsordner`, `${datasetFeatureCount} Einheiten`, dataset.status].join(" · ")
        : [dataset.detail, dataset.status].join(" · ");
      copy.append(datasetTitle, datasetMeta);
      datasetRow.append(document.createElement("span"), datasetToggle, datasetIcon, copy);
      datasetList.append(datasetRow);

      if (isGroupedUnitDataset && !datasetCollapsed) {
        const groupList = document.createElement("div");
        groupList.className = "archive-state-folder-list";
        datasetGroups.forEach((group) => {
          const groupNodeId = `archive:${NATURAL_EARTH_ARCHIVE_ID}:dataset:${dataset.id}:state:${group.title}`;
          const admin1NodeId = `${groupNodeId}:admin1:${group.title}`;
          const groupCollapsed = isArchiveBrowserNodeCollapsed(groupNodeId);
          const groupRow = document.createElement("div");
          groupRow.className = "project-browser-row archive-state-folder-row";
          const groupToggle = document.createElement("button");
          groupToggle.type = "button";
          groupToggle.className = "browser-tree-toggle";
          groupToggle.textContent = groupCollapsed ? "▸" : "▾";
          groupToggle.setAttribute("aria-label", `${group.title} ${groupCollapsed ? "aufklappen" : "zuklappen"}`);
          groupToggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleArchiveBrowserNode(groupNodeId);
          });
          const groupIcon = document.createElement("span");
          groupIcon.className = "browser-row-icon browser-row-icon-subfolder";
          groupIcon.setAttribute("aria-hidden", "true");
          const groupCopy = document.createElement("button");
          groupCopy.type = "button";
          groupCopy.className = "project-card-main";
          groupCopy.addEventListener("click", (event) => {
            event.preventDefault();
            toggleArchiveBrowserNode(groupNodeId);
          });
          const groupTitle = document.createElement("strong");
          groupTitle.textContent = group.title;
          const groupMeta = document.createElement("span");
          groupMeta.textContent = `${group.items.length} Einheiten`;
          groupCopy.append(groupTitle, groupMeta);
          groupRow.append(document.createElement("span"), groupToggle, groupIcon, groupCopy);
          groupList.append(groupRow);

          if (!groupCollapsed) {
            const itemList = document.createElement("div");
            itemList.className = "archive-state-item-list";
            group.items.forEach((item) => {
              const itemRow = document.createElement("div");
              itemRow.className = "project-browser-row archive-state-item-row";
              itemRow.classList.toggle("is-active", state.editorMode === "archive-object" && state.activeEditorItemId === item.archiveKey);
              const itemIcon = document.createElement("span");
              itemIcon.className = "browser-row-icon browser-row-icon-layers";
              itemIcon.setAttribute("aria-hidden", "true");
              const itemCopy = document.createElement("button");
              itemCopy.type = "button";
              itemCopy.className = "project-card-main";
              itemCopy.addEventListener("click", (event) => {
                event.preventDefault();
                openNaturalEarthArchiveItemEditor("admin_0_countries", item.archiveKey);
              });
              const itemTitle = document.createElement("strong");
              itemTitle.textContent = item.name;
              const itemMeta = document.createElement("span");
              itemMeta.textContent = [item.type, item.code, item.iso3, item.wikidataId].filter(Boolean).join(" · ");
              itemCopy.append(itemTitle, itemMeta);
              itemRow.append(document.createElement("span"), document.createElement("span"), itemIcon, itemCopy);
              itemList.append(itemRow);
            });
            groupList.append(itemList);

            const admin1Items = getNaturalEarthAdmin1ArchiveItemsForState(group.title);
            const admin1Collapsed = isArchiveBrowserNodeCollapsed(admin1NodeId);
            const admin1FolderRow = document.createElement("div");
            admin1FolderRow.className = "project-browser-row archive-state-folder-row archive-admin1-folder-row";
            const admin1Toggle = document.createElement("button");
            admin1Toggle.type = "button";
            admin1Toggle.className = "browser-tree-toggle";
            admin1Toggle.textContent = admin1Collapsed ? "▸" : "▾";
            admin1Toggle.setAttribute("aria-label", `Gliedstaaten / Provinzen ${admin1Collapsed ? "aufklappen" : "zuklappen"}`);
            admin1Toggle.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleArchiveBrowserNode(admin1NodeId);
            });
            const admin1Icon = document.createElement("span");
            admin1Icon.className = "browser-row-icon browser-row-icon-subfolder";
            admin1Icon.setAttribute("aria-hidden", "true");
            const admin1Copy = document.createElement("button");
            admin1Copy.type = "button";
            admin1Copy.className = "project-card-main";
            admin1Copy.addEventListener("click", (event) => {
              event.preventDefault();
              toggleArchiveBrowserNode(admin1NodeId);
            });
            const admin1Title = document.createElement("strong");
            admin1Title.textContent = "Gliedstaaten / Provinzen";
            const admin1Meta = document.createElement("span");
            if (state.naturalEarthAdmin1Loading && !state.naturalEarthAdmin1Dataset) {
              admin1Meta.textContent = "Natural Earth 10m · wird geladen …";
            } else if (state.naturalEarthAdmin1Error) {
              admin1Meta.textContent = state.naturalEarthAdmin1Error;
            } else if (state.naturalEarthAdmin1Dataset) {
              admin1Meta.textContent = `Natural Earth 10m · ${admin1Items.length} Einheiten`;
            } else {
              admin1Meta.textContent = "Natural Earth 10m · zum Laden öffnen";
            }
            admin1Copy.append(admin1Title, admin1Meta);
            admin1FolderRow.append(document.createElement("span"), admin1Toggle, admin1Icon, admin1Copy);
            groupList.append(admin1FolderRow);

            if (!admin1Collapsed) {
              const admin1ItemList = document.createElement("div");
              admin1ItemList.className = "archive-state-item-list archive-admin1-item-list";
              if (state.naturalEarthAdmin1Loading && !state.naturalEarthAdmin1Dataset) {
                const loadingRow = document.createElement("div");
                loadingRow.className = "project-browser-row archive-state-item-row archive-loading-row";
                const loadingCopy = document.createElement("div");
                loadingCopy.className = "project-card-main";
                const loadingTitle = document.createElement("strong");
                loadingTitle.textContent = "Gliedstaaten und Provinzen werden geladen …";
                const loadingMeta = document.createElement("span");
                loadingMeta.textContent = "Natural Earth 10m · Admin-1";
                loadingCopy.append(loadingTitle, loadingMeta);
                loadingRow.append(document.createElement("span"), document.createElement("span"), document.createElement("span"), loadingCopy);
                admin1ItemList.append(loadingRow);
              } else if (state.naturalEarthAdmin1Error) {
                const errorRow = document.createElement("div");
                errorRow.className = "project-browser-row archive-state-item-row archive-loading-row";
                const errorCopy = document.createElement("div");
                errorCopy.className = "project-card-main";
                const errorTitle = document.createElement("strong");
                errorTitle.textContent = state.naturalEarthAdmin1Error;
                const errorMeta = document.createElement("span");
                errorMeta.textContent = "Bitte später erneut öffnen.";
                errorCopy.append(errorTitle, errorMeta);
                errorRow.append(document.createElement("span"), document.createElement("span"), document.createElement("span"), errorCopy);
                admin1ItemList.append(errorRow);
              } else if (!admin1Items.length) {
                const emptyRow = document.createElement("div");
                emptyRow.className = "project-browser-row archive-state-item-row archive-loading-row";
                const emptyCopy = document.createElement("div");
                emptyCopy.className = "project-card-main";
                const emptyTitle = document.createElement("strong");
                emptyTitle.textContent = "Keine Gliedstaaten / Provinzen hinterlegt";
                const emptyMeta = document.createElement("span");
                emptyMeta.textContent = "Natural Earth 10m · Admin-1";
                emptyCopy.append(emptyTitle, emptyMeta);
                emptyRow.append(document.createElement("span"), document.createElement("span"), document.createElement("span"), emptyCopy);
                admin1ItemList.append(emptyRow);
              } else {
                admin1Items.forEach((item) => {
                  const itemRow = document.createElement("div");
                  itemRow.className = "project-browser-row archive-state-item-row";
                  itemRow.classList.toggle("is-active", state.editorMode === "archive-object" && state.activeEditorItemId === item.archiveKey);
                  const itemIcon = document.createElement("span");
                  itemIcon.className = "browser-row-icon browser-row-icon-layers";
                  itemIcon.setAttribute("aria-hidden", "true");
                  const itemCopy = document.createElement("button");
                  itemCopy.type = "button";
                  itemCopy.className = "project-card-main";
                  itemCopy.addEventListener("click", (event) => {
                    event.preventDefault();
                    openNaturalEarthArchiveItemEditor("admin_1_states_provinces", item.archiveKey);
                  });
                  const itemTitle = document.createElement("strong");
                  itemTitle.textContent = item.name;
                  const itemMeta = document.createElement("span");
                  itemMeta.textContent = [item.type, item.code, item.iso3, item.wikidataId].filter(Boolean).join(" · ");
                  itemCopy.append(itemTitle, itemMeta);
                  itemRow.append(document.createElement("span"), document.createElement("span"), itemIcon, itemCopy);
                  admin1ItemList.append(itemRow);
                });
              }
              groupList.append(admin1ItemList);
            }
          }
        });
        datasetList.append(groupList);
      }
    });
    tree.append(datasetList);
    card.append(tree);
  }

  return card;
}

function createBrowserTrashRow() {
  const row = document.createElement("div");
  row.className = "project-browser-row z-browser-trash-row browser-trash-row";
  const checkboxSpacer = document.createElement("span");
  checkboxSpacer.className = "browser-visibility-checkbox browser-visibility-spacer";
  checkboxSpacer.setAttribute("aria-hidden", "true");
  const toggleSpacer = document.createElement("span");
  toggleSpacer.className = "browser-tree-toggle browser-tree-toggle-spacer";
  toggleSpacer.setAttribute("aria-hidden", "true");
  const icon = document.createElement("span");
  icon.className = "browser-row-icon browser-row-icon-trash";
  icon.setAttribute("aria-hidden", "true");
  const copy = document.createElement("div");
  copy.className = "project-card-main";
  const title = document.createElement("strong");
  title.textContent = "Papierkorb";
  const meta = document.createElement("span");
  meta.textContent = "0 Elemente";
  copy.append(title, meta);
  row.append(checkboxSpacer, toggleSpacer, icon, copy);
  return row;
}

function createBrowserFooterSpacer() {
  const spacer = document.createElement("div");
  spacer.className = "browser-footer-spacer";
  spacer.setAttribute("aria-hidden", "true");
  return spacer;
}

function createProjectSubfolder(project) {
  const folders = getProjectMapFolders(project);
  if (!folders.length) return;
  const existingCount = getProjectSubfolderEntries(project).length;
  const subfolder = createLibrarySubfolder(`Unterordner ${existingCount + 1}`);
  folders.forEach((folder) => {
    folder.subfolders = Array.isArray(folder.subfolders) ? folder.subfolders : [];
    folder.subfolders.push(createLibrarySubfolder(subfolder.title, subfolder.id));
  });
  state.collapsedBrowserNodeIds = [
    ...new Set([
      ...state.collapsedBrowserNodeIds,
      `subfolder:${project.id}:project-layers:${subfolder.id}`,
      ...folders.map((folder) => `subfolder:${project.id}:${folder.type}:${subfolder.id}`),
    ]),
  ];
  persistProjects();
  renderWorkspace();
}

function createProjectMapTree(project) {
  // Browserregel: Einfache und komplexe Karten bleiben intern getrennte
  // Datenzweige, weil Import, Rendern und Eigenschaften unterschiedliche
  // Metadaten brauchen. Sichtbar bildet der Browser aber eine gemeinsame
  // Projektablage ab; den Kartentyp zeigt ausschließlich das Icon der Karte.
  const tree = document.createElement("div");
  tree.className = "project-layer-tree project-map-tree";
  setupLibraryDropTarget(tree, project, "", "");

  const subfolders = getProjectSubfolderEntries(project);
  const directItems = getProjectDirectMapItems(project);

  if (!subfolders.length && !directItems.length) {
    const empty = document.createElement("p");
    empty.className = "library-empty";
    empty.textContent = "Noch keine Karten oder Statistiken hinzugefügt.";
    tree.append(empty);
    return tree;
  }

  if (subfolders.length) {
    const subfolderList = document.createElement("div");
    subfolderList.className = "library-subfolder-list";
    subfolders.forEach((subfolder) => {
      const nodeId = `subfolder:${project.id}:project-layers:${subfolder.id}`;
      const collapsed = isBrowserNodeCollapsed(nodeId);
      const items = getProjectSubfolderItems(project, subfolder.id);
      subfolderList.append(createLibrarySubfolderRow(subfolder, project, "project-layers"));
      if (!collapsed && items.length) {
        const nestedList = document.createElement("div");
        nestedList.className = "library-subfolder-items";
        items.forEach(({ item, folderType }) => {
          nestedList.append(createLibraryItemButton(item, project, folderType, subfolder.id));
        });
        subfolderList.append(nestedList);
      }
    });
    tree.append(subfolderList);
  }

  if (directItems.length) {
    const list = document.createElement("div");
    list.className = "library-item-list";
    directItems.forEach(({ item, folderType }) => {
      list.append(createLibraryItemButton(item, project, folderType, ""));
    });
    tree.append(list);
  }
  return tree;
}

function createProjectLayerTree(project, folderType, options = {}) {
  const folder = getLibraryFolder(project, folderType);
  if (!folder) return document.createDocumentFragment();
  const items = folder.items || [];
  const subfolders = Array.isArray(folder.subfolders) ? folder.subfolders : [];
  const allItems = getLibraryFolderItems(folder);
  const canCreateSubfolders = folderType === "boundary-maps" || folderType === "boundary-collections";
  const nodeId = `${folderType}:${project.id}`;
  const isCollapsed = isBrowserNodeCollapsed(nodeId);
  const layerTree = document.createElement("div");
  layerTree.className = "project-layer-tree";
  const visibleLayerCount = allItems.filter((item) => item.display?.visible !== false).length;
  const row = document.createElement("div");
  row.className = "project-browser-row layer-folder-row";
  row.classList.toggle("has-folder-action", canCreateSubfolders);
  setupLibraryDropTarget(row, project, folderType, "");

  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.className = "browser-visibility-checkbox";
  visibility.checked = !allItems.length || visibleLayerCount === allItems.length;
  visibility.indeterminate = visibleLayerCount > 0 && visibleLayerCount < allItems.length;
  visibility.title = `Alle ${folder.title} ein-/ausblenden`;
  visibility.addEventListener("click", (event) => event.stopPropagation());
  visibility.addEventListener("change", () => {
    allItems.forEach((item) => {
      item.display = item.display || {};
      item.display.visible = visibility.checked;
    });
    persistProjects();
    renderWorkspace();
    renderGlobe();
  });

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "browser-tree-toggle";
  toggle.textContent = isCollapsed ? "▸" : "▾";
  toggle.setAttribute("aria-label", `${folder.title} ${isCollapsed ? "aufklappen" : "zuklappen"}`);
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleBrowserNode(nodeId);
  });

  const icon = document.createElement("span");
  icon.className = `browser-row-icon ${options.iconClass || "browser-row-icon-layers"}`;
  icon.setAttribute("aria-hidden", "true");

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "project-card-main layer-folder-main";
  const folderMeta = [
    `${allItems.length} hinzugefügt`,
    `${visibleLayerCount} sichtbar`,
    subfolders.length ? `${subfolders.length} Unterordner` : "",
  ].filter(Boolean).join(", ");
  copy.innerHTML = `<strong>${folder.title}</strong><span>${folderMeta}</span>`;
  copy.addEventListener("click", (event) => {
    event.preventDefault();
    toggleBrowserNode(nodeId);
  });

  const addSubfolderButton = document.createElement("button");
  addSubfolderButton.type = "button";
  addSubfolderButton.className = "browser-row-action is-add-folder";
  addSubfolderButton.title = `Unterordner in ${folder.title} erstellen`;
  addSubfolderButton.setAttribute("aria-label", `Unterordner in ${folder.title} erstellen`);
  addSubfolderButton.innerHTML = "<span class=\"browser-row-action-glyph\" aria-hidden=\"true\"></span>";
  addSubfolderButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    createProjectLayerSubfolder(project, folderType);
  });

  const menuId = `${project.id}:${folderType}`;
  const menuShell = document.createElement("div");
  menuShell.className = "project-card-menu-shell";

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "project-card-menu-trigger layer-folder-menu-trigger";
  menuButton.setAttribute("aria-label", `${folder.title}-Aktionen`);
  menuButton.setAttribute("aria-expanded", state.openFolderBrowserMenuId === menuId ? "true" : "false");
  menuButton.innerHTML = "<span class=\"project-card-menu-dots\" aria-hidden=\"true\"></span>";
  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    state.openProjectBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    state.openFolderBrowserMenuId = state.openFolderBrowserMenuId === menuId ? null : menuId;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "project-card-menu";
  menu.hidden = state.openFolderBrowserMenuId !== menuId;

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "project-card-menu-action";
  addButton.textContent = "Hinzufügen";
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.openFolderBrowserMenuId = null;
    renderProjectBrowser();
    setEditorTab(folderType === "boundary-collections" ? "collections" : "gearbox");
    if (folderType !== "boundary-collections") ui.boundarySearchInput?.focus();
  });
  menu.append(addButton);
  menuShell.append(menuButton, menu);

  if (canCreateSubfolders) {
    row.append(visibility, toggle, icon, copy, addSubfolderButton, menuShell);
  } else {
    row.append(visibility, toggle, icon, copy, menuShell);
  }
  layerTree.append(row);

  if (isCollapsed) return layerTree;

  if (subfolders.length) {
    const subfolderList = document.createElement("div");
    subfolderList.className = "library-subfolder-list";
    subfolders.forEach((subfolder) => {
      const subfolderNodeId = `subfolder:${project.id}:${folderType}:${subfolder.id}`;
      const subfolderCollapsed = isBrowserNodeCollapsed(subfolderNodeId);
      subfolderList.append(createLibrarySubfolderRow(subfolder, project, folderType));
      if (!subfolderCollapsed && Array.isArray(subfolder.items) && subfolder.items.length) {
        const nestedList = document.createElement("div");
        nestedList.className = "library-subfolder-items";
        subfolder.items.forEach((item) => {
          nestedList.append(createLibraryItemButton(item, project, folderType, subfolder.id));
        });
        subfolderList.append(nestedList);
      }
    });
    layerTree.append(subfolderList);
  }

  if (!allItems.length) {
    const empty = document.createElement("p");
    empty.className = "library-empty";
    empty.textContent = options.emptyText || "Noch keine Karten hinzugefügt.";
    layerTree.append(empty);
    return layerTree;
  }

  const list = document.createElement("div");
  list.className = "library-item-list";
  items.forEach((item) => {
    list.append(createLibraryItemButton(item, project, folderType, ""));
  });
  layerTree.append(list);
  return layerTree;
}

function createProjectLayerSubfolder(project, folderType) {
  const folder = getLibraryFolder(project, folderType);
  if (!folder) return;
  const existingCount = Array.isArray(folder.subfolders) ? folder.subfolders.length : 0;
  const title = `${folder.title} ${existingCount + 1}`;
  folder.subfolders = Array.isArray(folder.subfolders) ? folder.subfolders : [];
  folder.subfolders.push(createLibrarySubfolder(title));
  persistProjects();
  renderWorkspace();
}

function createLibrarySubfolderRow(subfolder, project, folderType) {
  const nodeId = `subfolder:${project.id}:${folderType}:${subfolder.id}`;
  const isCollapsed = isBrowserNodeCollapsed(nodeId);
  const row = document.createElement("div");
  row.className = "project-browser-row library-subfolder-row";
  row.dataset.projectId = project.id;
  row.dataset.folderType = folderType;
  row.dataset.subfolderId = subfolder.id;
  setupLibraryDropTarget(row, project, folderType === "project-layers" ? "" : folderType, subfolder.id);
  row.setAttribute("role", "button");
  row.tabIndex = 0;
  const isActive = state.editorMode === "subfolder"
    && state.activeSubfolderRef?.projectId === project.id
    && state.activeSubfolderRef?.folderType === folderType
    && state.activeSubfolderRef?.subfolderId === subfolder.id;
  row.classList.toggle("is-active", isActive);

  const subfolderItems = folderType === "project-layers"
    ? getProjectSubfolderItems(project, subfolder.id).map((entry) => entry.item)
    : (Array.isArray(subfolder.items) ? subfolder.items : []);
  const visibleItemCount = subfolderItems.filter((item) => item.display?.visible !== false).length;

  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.className = "browser-visibility-checkbox";
  visibility.checked = !subfolderItems.length || visibleItemCount === subfolderItems.length;
  visibility.indeterminate = visibleItemCount > 0 && visibleItemCount < subfolderItems.length;
  visibility.title = `${subfolder.title} ein-/ausblenden`;
  visibility.addEventListener("click", (event) => event.stopPropagation());
  visibility.addEventListener("change", () => {
    subfolderItems.forEach((item) => {
      item.display = item.display || {};
      item.display.visible = visibility.checked;
    });
    persistProjects();
    renderWorkspace();
    renderGlobe();
  });

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "browser-tree-toggle";
  toggle.textContent = isCollapsed ? "▸" : "▾";
  toggle.setAttribute("aria-label", `${subfolder.title} ${isCollapsed ? "aufklappen" : "zuklappen"}`);
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleBrowserNode(nodeId);
  });

  const icon = document.createElement("span");
  icon.className = "browser-row-icon browser-row-icon-subfolder";
  icon.setAttribute("aria-hidden", "true");

  const copy = document.createElement("div");
  copy.className = "project-card-main";
  const title = document.createElement("strong");
  title.textContent = subfolder.title;
  const meta = document.createElement("span");
  meta.textContent = `${subfolderItems.length} Karten`;
  copy.append(title, meta);

  const menuId = `subfolder:${project.id}:${folderType}:${subfolder.id}`;
  const menuShell = document.createElement("div");
  menuShell.className = "project-card-menu-shell";

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "project-card-menu-trigger";
  menuButton.setAttribute("aria-label", `${subfolder.title}-Aktionen`);
  menuButton.setAttribute("aria-expanded", state.openFolderBrowserMenuId === menuId ? "true" : "false");
  menuButton.innerHTML = "<span class=\"project-card-menu-dots\" aria-hidden=\"true\"></span>";
  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    state.openProjectBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    state.openFolderBrowserMenuId = state.openFolderBrowserMenuId === menuId ? null : menuId;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "project-card-menu";
  menu.hidden = state.openFolderBrowserMenuId !== menuId;

  const exportButton = document.createElement("button");
  exportButton.type = "button";
  exportButton.className = "project-card-menu-action";
  exportButton.textContent = "Exportieren";
  exportButton.disabled = !subfolderItems.length;
  exportButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.openFolderBrowserMenuId = null;
    renderProjectBrowser();
    try {
      await exportLibrarySubfolder(project, folderType, subfolder);
    } catch (error) {
      console.error("Unterordner-Export fehlgeschlagen.", error);
      window.alert(`Unterordner-Export fehlgeschlagen: ${error?.message || "unbekannter Fehler"}`);
    }
  });

  menu.append(exportButton);
  menuShell.append(menuButton, menu);

  row.append(visibility, toggle, icon, copy, menuShell);
  return row;
}

function getLayerBrowserDetailLabel(item) {
  const raw = [item?.detail, item?.adminLevel].filter(Boolean).join(" · ");
  const match = raw.match(/\b(?:10m|50m|110m)\b/i);
  return match ? match[0].toLowerCase() : repairLegacyText(item?.detail || "");
}

function getLibraryItemFeatureCount(item) {
  if (Array.isArray(item?.boundarySet?.features)) return item.boundarySet.features.length;
  if (Number.isFinite(item?.boundarySet?.geometryStorage?.featureCount)) return item.boundarySet.geometryStorage.featureCount;
  const features = getRenderableBoundaryFeatures(item);
  return features.length || 1;
}

function isComplexLibraryItem(item) {
  return getLibraryItemFeatureCount(item) > 1;
}

function isStatisticLayerItem(item) {
  return item?.kind === "gearbox-data-layer";
}

function getStatisticLayerDisplayColor(layer) {
  const firstClass = layer?.gearBox?.style?.classes?.[0]?.fill;
  const firstMatch = layer?.valueMatches?.[0]?.fill;
  return normalizeColorValue(firstClass || firstMatch, "#d6ecff") || "#d6ecff";
}

function getDataLayerBrowserTypeLabel(layer) {
  return layer?.origin === "search" ? "Suchkarte" : "Statistik";
}

function isBrowserItemVisible(item) {
  return isStatisticLayerItem(item) ? item.visible !== false : item.display?.visible !== false;
}

function setBrowserItemVisible(item, visible) {
  if (isStatisticLayerItem(item)) {
    item.visible = visible;
    return;
  }
  item.display = item.display || {};
  item.display.visible = visible;
}

function createLibraryItemButton(item, project, folderType = "", currentSubfolderId = "") {
  const button = document.createElement("div");
  button.setAttribute("role", "button");
  button.tabIndex = 0;
  button.className = "library-item-card";
  button.draggable = !item.locked && !isStatisticLayerItem(item);
  button.dataset.projectId = project.id;
  button.dataset.libraryItemId = item.id;
  button.dataset.folderType = folderType;
  button.dataset.subfolderId = currentSubfolderId;
  button.classList.toggle("is-active", item.id === project.activeLibraryItemId);
  button.classList.toggle("is-hidden-layer", !isBrowserItemVisible(item));
  button.style.setProperty("--layer-color", isStatisticLayerItem(item)
    ? getStatisticLayerDisplayColor(item)
    : (normalizeColorValue(item.display?.color, "") || "transparent"));
  button.addEventListener("dragstart", beginLibraryItemDrag);
  button.addEventListener("dragend", finishLibraryItemDrag);

  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.className = "browser-visibility-checkbox";
  visibility.checked = isBrowserItemVisible(item);
  visibility.title = `${item.name} ein-/ausblenden`;
  visibility.addEventListener("click", (event) => event.stopPropagation());
  visibility.addEventListener("change", () => {
    setBrowserItemVisible(item, visibility.checked);
    persistProjects();
    renderWorkspace();
    if (item.origin === "search") syncMapLibreSearchHighlight();
    renderGlobe();
  });

  const typeIcon = document.createElement("span");
  typeIcon.className = isStatisticLayerItem(item)
    ? "browser-row-icon library-item-type-icon browser-row-icon-statistics"
    : isComplexLibraryItem(item)
    ? "browser-row-icon library-item-type-icon browser-row-icon-collections"
    : "library-item-type-spacer";
  typeIcon.setAttribute("aria-hidden", "true");

  const glyph = document.createElement("span");
  glyph.className = "library-item-glyph";
  glyph.setAttribute("aria-hidden", "true");

  const itemTitle = document.createElement("strong");
  itemTitle.textContent = item.name || item.title || "Statistik";
  const itemMeta = document.createElement("span");
  itemMeta.textContent = isStatisticLayerItem(item)
    ? [
        getDataLayerBrowserTypeLabel(item),
        `${item.table?.rows?.length || 0} Werte`,
        `${item.valueMatches?.length || 0} gematcht`,
      ].filter(Boolean).join(" · ")
    : [item.source, getLayerBrowserDetailLabel(item)].filter(Boolean).join(" · ");
  const copy = document.createElement("span");
  copy.className = "library-item-copy";
  copy.append(itemTitle, itemMeta);
  const menuShell = document.createElement("div");
  menuShell.className = "layer-row-menu-shell";
  menuShell.draggable = false;
  menuShell.addEventListener("dragstart", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "layer-row-menu-trigger";
  menuButton.setAttribute("aria-label", `${item.name || item.title || "Statistik"}: Aktionen`);
  menuButton.setAttribute("aria-expanded", state.openLayerBrowserMenuId === item.id ? "true" : "false");
  menuButton.innerHTML = "<span class=\"layer-row-menu-dots\" aria-hidden=\"true\"></span>";
  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetLayerDeleteHold();
    state.openProjectBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openLayerBrowserMenuId = state.openLayerBrowserMenuId === item.id ? null : item.id;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "layer-row-menu";
  menu.hidden = state.openLayerBrowserMenuId !== item.id;

  if (item.locked) {
    const lockedNote = document.createElement("button");
    lockedNote.type = "button";
    lockedNote.className = "project-card-menu-action layer-row-menu-action-disabled";
    lockedNote.textContent = "Standardkarte";
    lockedNote.disabled = true;
    menu.append(lockedNote);
  } else {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "project-card-menu-action project-card-menu-action-delete";
    deleteButton.textContent = "Löschen";
    deleteButton.dataset.projectId = project.id;
    deleteButton.dataset.layerId = item.id;
    deleteButton.addEventListener("pointerdown", beginLayerDeleteHold);
    deleteButton.addEventListener("pointerup", finishLayerDeleteHold);
    deleteButton.addEventListener("pointercancel", cancelLayerDeleteHold);
    deleteButton.addEventListener("lostpointercapture", cancelLayerDeleteHold);
    menu.append(deleteButton);
  }
  menuShell.append(menuButton, menu);
  button.append(visibility, typeIcon, glyph, copy, menuShell);
  return button;
}

function renderLibraryBrowser() {
  if (!ui.libraryBrowserList) return;
  ui.libraryBrowserList.replaceChildren();
}

function renderBoundaryEditor() {
  if (!ui.boundarySummary || !ui.boundaryLevelList) return;
  const project = getActiveProject();
  const boundarySet = getActiveBoundarySet(project);
  if (!project || !boundarySet) {
    ui.boundarySummary.textContent = "Noch kein Earth-Map-Projekt ausgewählt.";
    ui.boundaryLevelList.replaceChildren();
    return;
  }
  ui.boundarySummary.textContent = `${boundarySet.label} ist als Grenzgrundlage dieses Projekts angelegt. Die Detailstufen werden später je nach Zoom automatisch geladen. Das Boundary-Set kann perspektivisch durch andere Geometriebasen ersetzt werden, etwa paläogeografische Rekonstruktionen.`;
  ui.boundaryLevelList.replaceChildren(...(boundarySet.detailStrategy || []).map((level) => {
    const item = document.createElement("div");
    item.className = "boundary-level-item";
    const title = document.createElement("strong");
    title.textContent = level.label;
    const detail = document.createElement("span");
    detail.textContent = `${level.use} · ab Zoom ${level.minZoom} · ${level.path}`;
    item.append(title, detail);
    return item;
  }));
}

function renderBackgroundMapList() {
  if (!ui.backgroundMapList) return;
  const project = getActiveProject();
  if (!project) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Earth-Map-Projekt ausgewählt.";
    ui.backgroundMapList.replaceChildren(empty);
    return;
  }

  const selectedId = normalizeContinentalMapId(project.displaySettings?.continentalMapId || DEFAULT_CONTINENTAL_MAP_ID);
  const cards = getContinentalMapItems(project).map((item) => {
    const card = document.createElement("div");
    card.className = "background-map-card";
    card.classList.toggle("is-active", selectedId === item.id);
    card.dataset.libraryItemId = item.id;

    const copy = document.createElement("span");
    copy.className = "background-map-card-copy";
    const status = item.id === DEFAULT_CONTINENTAL_MAP_ID ? "renderbar" : "vorbereitet";
    copy.innerHTML = `<strong>${item.name}</strong><span>${[item.source, item.detail, status].filter(Boolean).join(" · ")}</span>`;

    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "background-map-settings-button";
    settingsButton.setAttribute("aria-label", `${item.name}: Eigenschaften öffnen`);
    settingsButton.innerHTML = "<span aria-hidden=\"true\"></span>";
    settingsButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      project.activeLibraryItemId = item.id;
      persistProjects();
      openLibraryItemEditor(item);
    });
    card.append(copy, settingsButton);
    return card;
  });

  ui.backgroundMapList.replaceChildren(...cards);
}

function renderObjectEditor() {
  if (state.editorMode === "project") {
    renderProjectEditor();
    return;
  }
  if (state.editorMode === "subfolder") {
    renderSubfolderEditor();
    return;
  }
  renderLayerEditor();
}

function getActiveSubfolderContext() {
  const ref = state.activeSubfolderRef;
  if (!ref) return null;
  const project = state.projects.find((candidate) => candidate.id === ref.projectId) || null;
  const folder = ref.folderType === "project-layers"
    ? { type: "project-layers", title: "Projektkarten", subfolders: getProjectSubfolderEntries(project) }
    : getLibraryFolder(project, ref.folderType);
  const subfolder = (folder?.subfolders || []).find((candidate) => candidate.id === ref.subfolderId) || null;
  return project && folder && subfolder ? { project, folder, subfolder } : null;
}

function renderProjectEditor() {
  const project = getActiveProject();
  if (!ui.layerEditorTitle || !ui.layerEditorSummary || !ui.layerEditorContent || !ui.layerMetaList) return;
  if (!project) {
    ui.layerEditorTitle.textContent = "Kein Projekt ausgewählt";
    ui.layerEditorSummary.textContent = "Lege links ein Earth-Map-Projekt an oder wähle ein vorhandenes Projekt aus.";
    ui.layerEditorContent.hidden = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  const projectEditorId = `project:${project.id}`;
  if (state.activeEditorItemId !== projectEditorId) {
    state.activeEditorItemId = projectEditorId;
    state.activeEditorChapterKey = "";
  }

  ui.layerEditorTitle.textContent = project.title || "Earth-Map-Projekt";
  ui.layerEditorSummary.textContent = "Projektordner mit Name und Icon. Einfache Karten, komplexe Karten und Grenzgrundlagen bleiben eigene Datenebenen.";
  ui.layerEditorContent.hidden = false;
  ui.layerMetaList.className = "structured-editor";
  ui.layerMetaList.replaceChildren(...createProjectEditorSections(project));
}

function renderSubfolderEditor() {
  const context = getActiveSubfolderContext();
  if (!ui.layerEditorTitle || !ui.layerEditorSummary || !ui.layerEditorContent || !ui.layerMetaList) return;
  if (!context) {
    ui.layerEditorTitle.textContent = "Kein Unterordner ausgewählt";
    ui.layerEditorSummary.textContent = "Wähle links im Browser einen Unterordner aus.";
    ui.layerEditorContent.hidden = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  const { project, folder, subfolder } = context;
  const editorId = `subfolder:${project.id}:${folder.type}:${subfolder.id}`;
  if (state.activeEditorItemId !== editorId) {
    state.activeEditorItemId = editorId;
    state.activeEditorChapterKey = "";
  }

  ui.layerEditorTitle.textContent = subfolder.title || "Unterordner";
  ui.layerEditorSummary.textContent = `Unterordner in „${folder.title}“. Hier verwalten wir zunächst den Ordnernamen; Kartenzuordnung folgt als eigener Arbeitsschritt.`;
  ui.layerEditorContent.hidden = false;
  ui.layerMetaList.className = "structured-editor";
  ui.layerMetaList.replaceChildren(...createSubfolderEditorSections(project, folder, subfolder));
}

function renderLayerEditor() {
  const project = getActiveProject();
  const item = getActiveLibraryItem(project);
  if (!ui.layerEditorTitle || !ui.layerEditorSummary || !ui.layerEditorContent || !ui.layerMetaList) return;
  if (!item) {
    ui.layerEditorTitle.textContent = "Keine Karte ausgewählt";
    ui.layerEditorSummary.textContent = "Wähle links in der Projektbibliothek eine Karte aus.";
    ui.layerEditorContent.hidden = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  if (state.activeEditorItemId !== item.id) {
    state.activeEditorItemId = item.id;
    state.activeEditorChapterKey = "";
  }

  ui.layerEditorTitle.textContent = item.name || item.title || "Statistik";
  ui.layerEditorSummary.textContent = getLayerEditorSummary(item);
  ui.layerEditorContent.hidden = false;
  ui.layerMetaList.className = "structured-editor";
  if (isStatisticLayerItem(item)) {
    const activeStatisticTab = state.statisticLayerActiveTab || "properties";
    if (activeStatisticTab === "values") {
      ui.layerMetaList.replaceChildren(createGearBoxValuesTable(item));
    } else if (activeStatisticTab === "csv") {
      ui.layerMetaList.replaceChildren(createStatisticLayerCsvEditor(item));
    } else {
      ui.layerMetaList.replaceChildren(...createStatisticLayerEditorSections(item, project));
    }
    return;
  }
  ui.layerMetaList.replaceChildren(...createLayerEditorSections(item, project));
}

function getLayerEditorSummary(item) {
  if (isStatisticLayerItem(item)) {
    return "Statistikobjekt mit CSV-Werten, Quellen, Matching-Regeln und Kartendarstellung.";
  }
  if (item?.kind === "boundary-collection") {
    return "Komplexe Karte mit referenzierbaren Einzelflächen, Quellen-, Lizenz- und Gültigkeitsdaten.";
  }
  if (item?.kind === "continental-map") {
    return "Hintergrund- und Kontinentalkarte des aktiven Projekts.";
  }
  return "Einfache Karte mit Anzeigeoptionen, Herkunftsdaten und Referenzen.";
}

function createBoundaryVersionId(stableId, validFrom, validTo) {
  const safeStableId = stableId || `boundary:${Date.now()}`;
  const from = validFrom || "undated";
  const to = validTo || "open";
  return `${safeStableId}@${from}..${to}`;
}

function ensureBoundarySetShape(item) {
  if (!item.boundarySet) return null;
  const boundarySet = item.boundarySet;
  boundarySet.schema = boundarySet.schema || EARTHMAP_BOUNDARY_SET_SCHEMA;
  boundarySet.stable_id = boundarySet.stable_id || boundarySet.id || item.id || slugifyBoundaryId(boundarySet.title || item.name || "boundary", "boundary");
  boundarySet.valid_from = boundarySet.valid_from || "";
  boundarySet.valid_to = boundarySet.valid_to || null;
  boundarySet.valid_precision = boundarySet.valid_precision || "unknown";
  boundarySet.temporal_status = boundarySet.temporal_status || (boundarySet.valid_from || boundarySet.valid_to ? "historical" : "undated_reference");
  boundarySet.version_id = boundarySet.version_id || createBoundaryVersionId(boundarySet.stable_id, boundarySet.valid_from, boundarySet.valid_to);
  boundarySet.data_binding = {
    ...createBoundaryDataBindingDefaults(),
    ...(boundarySet.data_binding || {}),
  };
  item.boundarySet.source = item.boundarySet.source || {};
  item.boundarySet.license = item.boundarySet.license || createInternalLicenseMetadata();
  item.boundarySet.license.compatibility = item.boundarySet.license.compatibility || {};
  item.boundarySet.features = Array.isArray(item.boundarySet.features) ? item.boundarySet.features : [];
  item.boundarySet.wikidata_id = normalizeWikidataId(item.boundarySet.wikidata_id || item.wikidataId || "");
  item.boundarySet.type = item.boundarySet.type || item.boundarySet.boundary_type || "";
  item.boundarySet.rank = item.boundarySet.rank == null ? "" : String(item.boundarySet.rank);
  item.boundarySet.sovereignty_status = item.boundarySet.sovereignty_status || "";
  item.boundarySet.constitutional_status = item.boundarySet.constitutional_status || "";
  item.boundarySet.relation_to_parent = item.boundarySet.relation_to_parent || "";
  item.boundarySet.parent_id = item.boundarySet.parent_id || "";
  item.boundarySet.geometry_scope = item.boundarySet.geometry_scope || "";
  item.boundarySet.features.forEach((feature, index) => {
    const featureStableId = feature.stable_id || feature.id || `${boundarySet.stable_id}:feature:${index + 1}`;
    feature.id = feature.id || featureStableId;
    feature.stable_id = featureStableId;
    feature.version_id = feature.version_id || boundarySet.version_id;
    feature.parent_id = feature.parent_id || boundarySet.parent_id || "";
    feature.rank = feature.rank == null || feature.rank === "" ? boundarySet.rank : String(feature.rank);
    feature.sovereignty_status = feature.sovereignty_status || boundarySet.sovereignty_status || "";
    feature.constitutional_status = feature.constitutional_status || boundarySet.constitutional_status || "";
    feature.relation_to_parent = feature.relation_to_parent || boundarySet.relation_to_parent || "";
    feature.valid_from = feature.valid_from || boundarySet.valid_from || "";
    feature.valid_to = feature.valid_to || boundarySet.valid_to || null;
    feature.valid_precision = feature.valid_precision || boundarySet.valid_precision || "unknown";
    feature.temporal_status = feature.temporal_status || boundarySet.temporal_status || "undated_reference";
  });
  return item.boundarySet;
}

function setObjectValue(target, path, value) {
  const parts = path.split(".");
  let cursor = target;
  parts.slice(0, -1).forEach((part) => {
    cursor[part] = cursor[part] && typeof cursor[part] === "object" ? cursor[part] : {};
    cursor = cursor[part];
  });
  cursor[parts.at(-1)] = value;
}

function syncItemFromBoundarySet(item) {
  const boundarySet = item.boundarySet;
  if (!boundarySet) return;
  const featureCount = getLibraryItemFeatureCount(item);
  item.name = repairLegacyText(boundarySet.title || item.name);
  item.source = repairLegacyText(boundarySet.source?.label || item.source);
  item.iso3 = boundarySet.country_iso3 || item.iso3 || "";
  item.wikidataId = normalizeWikidataId(boundarySet.wikidata_id || item.wikidataId || "");
  item.adminLevel = repairLegacyText(boundarySet.admin_level || boundarySet.boundary_type || item.adminLevel || "");
  item.detail = `${featureCount || 0} Einheiten`;
  item.license = repairLegacyText(boundarySet.license?.label || item.license || "");
  item.sourceUrl = boundarySet.source?.url || item.sourceUrl || "";
  item.temporalCoverage = {
    ...(item.temporalCoverage || {}),
    label: [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || boundarySet.year_represented || item.temporalCoverage?.label || "Gültigkeit nicht geprüft",
    from: boundarySet.valid_from || "",
    to: boundarySet.valid_to || "",
  };
}

function getMapClassificationTarget(item, boundarySet) {
  if (boundarySet) return boundarySet;
  item.classification = item.classification || {};
  return item.classification;
}

function persistEditorMutation(item, options = {}) {
  if (item.boundarySet) syncItemFromBoundarySet(item);
  persistProjects();
  if (options.renderBrowser) renderProjectBrowser();
  if (options.renderGlobe) renderGlobe();
  if (ui.layerEditorTitle) ui.layerEditorTitle.textContent = item.name || "Karte";
  if (ui.layerEditorSummary) ui.layerEditorSummary.textContent = getLayerEditorSummary(item);
}

function persistProjectMutation(project, options = {}) {
  project.title = repairLegacyText(project.title || "Earth-Map-Projekt");
  project.iconName = normalizeProjectIconName(project.iconName);
  project.iconColor = normalizeColorValue(project.iconColor, "#9a6419") || "#9a6419";
  project.displaySettings = project.displaySettings || {};
  project.displaySettings = normalizeProjectDisplaySettings(project);
  persistProjects();
  if (options.renderBrowser !== false) renderProjectBrowser();
  if (options.renderGlobe) renderGlobe();
  if (ui.layerEditorTitle) ui.layerEditorTitle.textContent = project.title;
}

function persistSubfolderMutation(project, folder, subfolder, options = {}) {
  subfolder.title = repairLegacyText(subfolder.title || "Unterordner");
  if (folder.type === "project-layers") {
    getProjectMapFolders(project).forEach((mapFolder) => {
      const matching = (mapFolder.subfolders || []).find((candidate) => candidate.id === subfolder.id);
      if (matching) matching.title = subfolder.title;
    });
  }
  persistProjects();
  if (options.renderBrowser !== false) renderProjectBrowser();
  if (ui.layerEditorTitle) ui.layerEditorTitle.textContent = subfolder.title;
  if (ui.layerEditorSummary) {
    ui.layerEditorSummary.textContent = `Unterordner in „${folder.title}“. Hier verwalten wir zunächst den Ordnernamen; Kartenzuordnung folgt als eigener Arbeitsschritt.`;
  }
}

function createEditorSection(title, description = "", options = {}) {
  const key = options.key || slugifyBoundaryId(title);
  const section = document.createElement("section");
  const isOpen = state.activeEditorChapterKey === key;
  section.className = "structured-editor-section";
  section.classList.toggle("is-open", isOpen);
  section.dataset.editorChapter = key;

  const header = document.createElement("button");
  header.type = "button";
  header.className = "structured-editor-section-header";
  header.setAttribute("aria-expanded", String(isOpen));
  header.addEventListener("click", () => {
    state.activeEditorChapterKey = state.activeEditorChapterKey === key ? "" : key;
    renderObjectEditor();
    updateEditorModeView();
  });

  const icon = document.createElement("span");
  icon.className = "structured-editor-section-icon";
  icon.style.setProperty("--section-icon", `url("${options.icon || "https://api.iconify.design/mdi/form-select.svg"}")`);
  icon.setAttribute("aria-hidden", "true");

  const copy = document.createElement("span");
  copy.className = "structured-editor-section-copy";
  const heading = document.createElement("strong");
  heading.textContent = title;
  copy.append(heading);

  const chevron = document.createElement("span");
  chevron.className = "structured-editor-section-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = isOpen ? "▾" : "▸";
  header.append(icon, copy, chevron);

  const body = document.createElement("div");
  body.className = "structured-editor-section-body";
  body.hidden = !isOpen;
  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.className = "structured-editor-section-description";
    descriptionNode.textContent = description;
    body.append(descriptionNode);
  }

  section.append(header, body);
  section.append = (...nodes) => {
    body.append(...nodes);
    return section;
  };
  return section;
}

function createTextInputField(label, value, onChange, options = {}) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const input = document.createElement(options.multiline ? "textarea" : "input");
  if (!options.multiline) input.type = options.type || "text";
  if (!options.multiline && options.min != null) input.min = String(options.min);
  if (!options.multiline && options.max != null) input.max = String(options.max);
  if (!options.multiline && options.step != null) input.step = String(options.step);
  input.value = value ?? "";
  input.placeholder = options.placeholder || "";
  input.readOnly = options.readonly === true;
  input.addEventListener("change", () => onChange(input.value));
  field.append(caption, input);
  return field;
}

function createProjectIconField(project) {
  const body = document.createElement("div");
  body.className = "project-icon-field-body";

  const topRow = document.createElement("div");
  topRow.className = "project-icon-field-top-row";

  const preview = document.createElement("div");
  preview.className = "project-icon-field-preview";
  const icon = document.createElement("img");
  icon.alt = "";
  icon.width = 22;
  icon.height = 22;
  icon.decoding = "async";
  icon.loading = "eager";
  icon.src = getIconifyPreviewUrl(project.iconName, project.iconColor, 24);
  preview.appendChild(icon);

  const actionButton = document.createElement("button");
  actionButton.type = "button";
  actionButton.className = "secondary-button";
  actionButton.textContent = project.iconName ? "Icon ändern" : "Icon hinzufügen";
  actionButton.addEventListener("click", () => {
    const nextIcon = window.prompt("Iconify-Icon eingeben, z. B. mdi:folder oder fluent:globe-24-filled", project.iconName || "mdi:folder");
    if (nextIcon == null) return;
    project.iconName = normalizeProjectIconName(nextIcon);
    persistProjectMutation(project);
    renderObjectEditor();
  });

  topRow.append(preview, actionButton);

  const meta = document.createElement("div");
  meta.className = "project-icon-field-meta";
  const [iconSet = "", ...iconNameParts] = normalizeProjectIconName(project.iconName).split(":");
  meta.textContent = `Quelle: Iconify · Set: ${iconSet || "—"} · Icon: ${iconNameParts.join(":") || project.iconName}`;

  const colorField = createColorPickerField("Iconfarbe", project.iconColor || "#9a6419", (value) => {
    project.iconColor = normalizeColorValue(value, "#9a6419") || "#9a6419";
    persistProjectMutation(project);
    // Farbauswahl-Regel: Der native Color-Picker sendet fortlaufend input-
    // Events. Hier darf der Editor nicht neu gerendert werden, sonst klappt
    // der Picker nach dem ersten Klick zu; aktualisiert werden nur Daten,
    // Browserkarte und die lokale Iconvorschau.
    icon.src = getIconifyPreviewUrl(project.iconName, project.iconColor, 24);
  }, { fallback: "#9a6419" });

  body.append(topRow, meta, colorField);
  return body;
}

function createProjectEditorSections(project) {
  const general = createEditorSection("Allgemein", "Diese Angaben beschreiben den Projektordner im Browser. Einfache und komplexe Karten bleiben davon getrennte Datenebenen.", {
    key: "general",
    icon: "https://api.iconify.design/mdi/folder-outline.svg",
  });
  general.append(
    createTextInputField("Bezeichnung", project.title || "", (value) => {
      project.title = repairLegacyText(value.trim() || "Earth-Map-Projekt");
      persistProjectMutation(project, { renderBrowser: true });
    }),
    createProjectIconField(project),
  );

  const display = createEditorSection("Darstellung", "Diese Werte steuern die Grundkarte des aktiven Projekts. Die Grundkarte ist eine Projekt-Eigenschaft und kein verschiebbares Browserobjekt.", {
    key: "display",
    icon: "https://api.iconify.design/mdi/map-legend.svg",
  });
  const selectedOption = getSelectedContinentalMapOption(project);
  const optionNote = document.createElement("p");
  optionNote.className = "structured-editor-section-description";
  optionNote.textContent = selectedOption?.detail || "";
  const rankStyleList = document.createElement("div");
  rankStyleList.className = "project-rank-style-list";
  const rankStyleHint = document.createElement("p");
  rankStyleHint.className = "structured-editor-field-help";
  rankStyleHint.textContent = "Diese Projektregel bestimmt die Outline aller Kartenobjekte nach ihrem kategorialen Rang. Die Einzelkarte behält ihre eigene Farbe; Dicke und Art der Linie kommen aus dem Projektordner.";
  rankStyleList.append(rankStyleHint);
  project.displaySettings = project.displaySettings || {};
  project.displaySettings.rankOutlineStyles = createDefaultRankOutlineStyles(project.displaySettings.rankOutlineStyles);
  MAP_RANK_CHOICES.filter((choice) => choice.value !== "").forEach((choice) => {
    const rank = choice.value;
    const style = project.displaySettings.rankOutlineStyles[rank] || PROJECT_RANK_OUTLINE_DEFAULTS[rank];
    const row = document.createElement("div");
    row.className = "project-rank-style-row";

    const label = document.createElement("div");
    label.className = "project-rank-style-label";
    const title = document.createElement("strong");
    title.textContent = choice.label;
    const description = document.createElement("span");
    description.textContent = choice.description;
    label.append(title, description);

    row.append(
      label,
      createColorPickerField("Strichfarbe", style.strokeColor, (value) => {
        project.displaySettings = project.displaySettings || {};
        project.displaySettings.rankOutlineStyles = createDefaultRankOutlineStyles(project.displaySettings.rankOutlineStyles);
        project.displaySettings.rankOutlineStyles[rank].strokeColor = value ? normalizeColorValue(value, DEFAULT_LAYER_OUTLINE_COLOR) : "";
        persistProjectMutation(project, { renderGlobe: true });
      }, { fallback: DEFAULT_LAYER_OUTLINE_COLOR }),
      createTextInputField("Strichdicke", style.strokeWidth, (value) => {
        const parsed = Number(value);
        project.displaySettings = project.displaySettings || {};
        project.displaySettings.rankOutlineStyles = createDefaultRankOutlineStyles(project.displaySettings.rankOutlineStyles);
        project.displaySettings.rankOutlineStyles[rank].strokeWidth = Number.isFinite(parsed) && parsed >= 0 ? parsed : PROJECT_RANK_OUTLINE_DEFAULTS[rank].strokeWidth;
        persistProjectMutation(project, { renderGlobe: true });
      }, { type: "number", min: 0, step: 0.1 }),
      createSelectField("Strichart", style.strokeStyle, PROJECT_STROKE_STYLE_CHOICES, (value) => {
        project.displaySettings = project.displaySettings || {};
        project.displaySettings.rankOutlineStyles = createDefaultRankOutlineStyles(project.displaySettings.rankOutlineStyles);
        project.displaySettings.rankOutlineStyles[rank].strokeStyle = normalizeProjectStrokeStyle(value);
        persistProjectMutation(project, { renderGlobe: true });
      }),
    );
    rankStyleList.append(row);
  });
  display.append(
    createSelectField("Kontinentalkarte", normalizeContinentalMapId(project.displaySettings?.continentalMapId || DEFAULT_CONTINENTAL_MAP_ID), getContinentalMapChoices(project), (value) => {
      project.displaySettings = project.displaySettings || {};
      project.displaySettings.continentalMapId = normalizeContinentalMapId(value);
      persistProjectMutation(project, { renderBrowser: true, renderGlobe: true });
      renderBackgroundMapList();
      renderObjectEditor();
    }),
    optionNote,
    rankStyleList,
  );
  return [general, display];
}

function createSubfolderEditorSections(project, folder, subfolder) {
  const general = createEditorSection("Allgemein", "Diese Angaben beschreiben nur diesen Unterordner. Der Hauptordner und die enthaltenen Karten bleiben eigene Objekte.", {
    key: "general",
    icon: "https://api.iconify.design/mdi/folder-outline.svg",
  });
  general.append(
    createTextInputField("Ordnername", subfolder.title || "", (value) => {
      subfolder.title = repairLegacyText(value.trim() || "Unterordner");
      persistSubfolderMutation(project, folder, subfolder, { renderBrowser: true });
    }),
    createTextInputField("Übergeordneter Ordner", folder.title || "", () => {}, { readonly: true }),
  );
  return [general];
}

function createColorPickerField(label, value, onChange, options = {}) {
  const field = document.createElement("label");
  field.className = "z-color-choice-field structured-editor-color-field";
  const caption = document.createElement("span");
  caption.className = "z-color-choice-label";
  caption.textContent = label;

  const controls = document.createElement("div");
  controls.className = "z-color-choice-surface layer-color-controls";
  const input = document.createElement("input");
  input.type = "color";
  input.className = "z-color-choice-native";
  const initialColor = normalizeColorValue(value, "");
  const fallbackColor = normalizeColorValue(options.fallback || DEFAULT_LAYER_FILL_COLOR, DEFAULT_LAYER_FILL_COLOR);
  let lastColor = initialColor || fallbackColor;
  input.value = initialColor || fallbackColor;
  input.setAttribute("aria-label", `${label}: freie Farbe wählen`);
  controls.style.setProperty("--z-color-current", lastColor);

  const codeInput = document.createElement("input");
  codeInput.type = "text";
  codeInput.className = "z-color-choice-code";
  codeInput.value = initialColor;
  codeInput.placeholder = options.fallback || DEFAULT_LAYER_FILL_COLOR;
  codeInput.autocomplete = "off";
  codeInput.spellcheck = false;
  codeInput.setAttribute("aria-label", `${label}: Farbcode`);

  const setEmptyState = (active) => {
    resetButton?.classList.toggle("is-active", active);
    resetButton?.setAttribute("aria-pressed", String(active));
    customButton?.classList.toggle("is-empty", active);
    codeInput.placeholder = active ? "transparent" : options.fallback || DEFAULT_LAYER_FILL_COLOR;
  };

  const applyColorValue = (rawValue, { normalizeOnInvalid = false } = {}) => {
    const normalized = normalizeColorValue(rawValue, "");
    if (!normalized) {
      if (normalizeOnInvalid) codeInput.value = "";
      return false;
    }
    lastColor = normalized;
    input.value = normalized;
    codeInput.value = normalized;
    controls.style.setProperty("--z-color-current", normalized);
    setEmptyState(false);
    onChange(normalized);
    return true;
  };

  const applyEmptyValue = () => {
    codeInput.value = "";
    controls.style.setProperty("--z-color-current", lastColor || fallbackColor);
    setEmptyState(true);
    onChange("");
  };

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "z-color-choice-button z-color-choice-reset-button";
  resetButton.setAttribute("aria-label", `${label}: Farbe entfernen`);
  resetButton.setAttribute("aria-pressed", initialColor ? "false" : "true");
  const resetIcon = document.createElement("span");
  resetIcon.className = "z-color-choice-button-icon";
  resetIcon.setAttribute("aria-hidden", "true");
  resetButton.append(resetIcon);
  resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (codeInput.value.trim()) applyEmptyValue();
    else applyColorValue(lastColor || fallbackColor);
  });

  const customButton = document.createElement("button");
  customButton.type = "button";
  customButton.className = "z-color-choice-button z-color-choice-custom-button";
  customButton.setAttribute("aria-label", `${label}: individuelle Farbe wählen`);
  const customIcon = document.createElement("span");
  customIcon.className = "z-color-choice-button-icon";
  customIcon.setAttribute("aria-hidden", "true");
  customButton.append(customIcon);
  customButton.addEventListener("click", (event) => {
    event.preventDefault();
    input.click();
  });

  input.addEventListener("input", () => {
    applyColorValue(input.value);
  });
  codeInput.addEventListener("input", () => {
    applyColorValue(codeInput.value);
  });
  codeInput.addEventListener("change", () => {
    applyColorValue(codeInput.value, { normalizeOnInvalid: true });
  });

  const paletteButton = document.createElement("button");
  paletteButton.type = "button";
  paletteButton.className = "z-color-choice-button z-color-choice-palette-button color-picker-button";
  paletteButton.setAttribute("aria-label", `${label}: Projektfarben wählen`);
  const paletteIcon = document.createElement("span");
  paletteIcon.className = "z-color-choice-button-icon color-picker-icon";
  paletteIcon.setAttribute("aria-hidden", "true");
  paletteButton.append(paletteIcon);

  const palette = document.createElement("div");
  palette.className = "z-color-choice-palette color-palette layer-color-palette";
  palette.hidden = true;

  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    paletteButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("mousedown", handleDocumentPointerDown, true);
  };

  function handleDocumentPointerDown(event) {
    if (controls.contains(event.target)) return;
    closePalette();
  }

  const renderPalette = () => {
    const colors = collectProjectPaletteColors(getActiveProject(), [input.value, options.fallback]);
    if (!colors.length) {
      const note = document.createElement("p");
      note.className = "z-color-choice-empty palette-empty";
      note.textContent = "Noch keine Projektfarben.";
      palette.replaceChildren(note);
      return;
    }
    palette.replaceChildren(...colors.map((color) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "z-color-choice-swatch color-swatch";
      swatch.style.setProperty("--z-color-swatch", color);
      swatch.setAttribute("aria-label", `Farbe ${color}`);
      swatch.classList.toggle("is-active", normalizeColorValue(input.value) === color);
      swatch.addEventListener("click", (event) => {
        event.preventDefault();
        applyColorValue(color);
        closePalette();
      });
      return swatch;
    }));
  };

  paletteButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (palette.hidden) {
      renderPalette();
      palette.hidden = false;
      paletteButton.setAttribute("aria-expanded", "true");
      document.addEventListener("mousedown", handleDocumentPointerDown, true);
    } else {
      closePalette();
    }
  });

  setEmptyState(!initialColor);
  controls.append(caption, codeInput, input, resetButton, customButton, paletteButton, palette);
  field.append(controls);
  return field;
}

function createSelectField(label, value, choices, onChange, options = {}) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const select = document.createElement("select");
  const normalizedChoices = [...choices];
  if (value && !normalizedChoices.some((choice) => choice.value === value)) {
    normalizedChoices.push({ value, label: `Importierter Wert · ${value}` });
  }
  normalizedChoices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.label;
    select.append(option);
  });
  select.value = value || choices[0]?.value || "";
  const help = document.createElement("p");
  help.className = "structured-editor-field-help";
  const updateHelp = () => {
    const choice = normalizedChoices.find((candidate) => candidate.value === select.value);
    help.textContent = choice?.description || options.help || "";
    help.hidden = !help.textContent;
  };
  select.addEventListener("change", () => {
    updateHelp();
    onChange(select.value);
  });
  updateHelp();
  field.append(caption, select, help);
  return field;
}

function getIso3CountryChoices() {
  const features = getNaturalEarthCountryDataset()?.features || [];
  const choices = features
    .map((feature) => ({
      value: getNaturalEarthIso3(feature),
      label: `${getNaturalEarthIso3(feature)} · ${getNaturalEarthCountryName(feature)}`,
    }))
    .filter((choice) => choice.value)
    .sort((a, b) => a.label.localeCompare(b.label, "de"));
  return [{ value: "", label: "—" }, ...choices];
}

function createSearchableSelectField(label, value, choices, onChange) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const input = document.createElement("input");
  const list = document.createElement("datalist");
  const listId = `list-${slugifyBoundaryId(label)}-${Math.random().toString(36).slice(2, 8)}`;
  list.id = listId;
  input.setAttribute("list", listId);
  input.value = value || "";
  choices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.label = choice.label;
    option.textContent = choice.label;
    list.append(option);
  });
  input.addEventListener("change", () => onChange(input.value.trim()));
  field.append(caption, input, list);
  return field;
}

function getBoundaryLevelChoices() {
  return [
    { value: "", label: "—" },
    { value: "ADM0", label: "ADM0 · Staat / Land" },
    { value: "ADM1", label: "ADM1 · Bundesland / Region" },
    { value: "ADM2", label: "ADM2 · Kreis / Bezirk" },
    { value: "ADM3", label: "ADM3 · Gemeindeebene / Unterbezirk" },
    { value: "ADM4", label: "ADM4 · lokale Verwaltungsebene" },
    { value: "ADM5", label: "ADM5 · feinste Verwaltungsebene" },
    { value: "electoral_district", label: "Wahlkreis" },
    { value: "municipality", label: "Gemeinde" },
    { value: "continent", label: "Kontinent / Landfläche" },
    { value: "coastline", label: "Küstenlinie" },
    { value: "custom", label: "Benutzerdefiniert" },
  ];
}

function createCheckboxField(label, checked, onChange) {
  const field = document.createElement("label");
  field.className = "structured-editor-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked === true;
  input.addEventListener("change", () => onChange(input.checked));
  const caption = document.createElement("span");
  caption.textContent = label;
  field.append(input, caption);
  return field;
}

function createLayerEditorSections(item) {
  const boundarySet = ensureBoundarySetShape(item);
  const classificationTarget = getMapClassificationTarget(item, boundarySet);
  const sections = [];
  const availableChapterKeys = new Set(["display", "identity", "classification", "source", "time"]);
  if (boundarySet) availableChapterKeys.add("features");
  if (state.activeEditorChapterKey && !availableChapterKeys.has(state.activeEditorChapterKey)) {
    state.activeEditorChapterKey = "";
  }

  const display = createEditorSection("Anzeige", "Diese Werte steuern, wie die Karte im aktiven Projekt erscheint.", {
    key: "display",
    icon: "https://api.iconify.design/mdi/eye-outline.svg",
  });
  display.append(
    createColorPickerField("Anzeigefarbe", item.display && Object.prototype.hasOwnProperty.call(item.display, "color") ? item.display.color : DEFAULT_LAYER_FILL_COLOR, (value) => {
      item.display = item.display || {};
      item.display.color = value ? normalizeColorValue(value, DEFAULT_LAYER_FILL_COLOR) : "";
      persistEditorMutation(item, { renderBrowser: true, renderGlobe: true });
    }, { fallback: DEFAULT_LAYER_FILL_COLOR }),
    createColorPickerField("Outline-Farbe", item.display && Object.prototype.hasOwnProperty.call(item.display, "outlineColor") ? item.display.outlineColor : DEFAULT_LAYER_OUTLINE_COLOR, (value) => {
      item.display = item.display || {};
      item.display.outlineColor = value ? normalizeColorValue(value, DEFAULT_LAYER_OUTLINE_COLOR) : "";
      persistEditorMutation(item, { renderGlobe: true });
    }, { fallback: DEFAULT_LAYER_OUTLINE_COLOR }),
    createTextInputField("Titel im Browser", item.name || "", (value) => {
      item.name = repairLegacyText(value);
      if (boundarySet) boundarySet.title = item.name;
      persistEditorMutation(item, { renderBrowser: true });
    }),
    createCheckboxField("Sichtbar", item.display?.visible !== false, (checked) => {
      item.display = item.display || {};
      item.display.visible = checked;
      persistEditorMutation(item, { renderBrowser: true, renderGlobe: true });
    }),
  );
  sections.push(display);

  const identity = createEditorSection("Identität", "Stabile IDs, Typen und Codes. Diese Werte sind wichtig für spätere Tabellenzuordnung.", {
    key: "identity",
    icon: "https://api.iconify.design/mdi/identifier.svg",
  });
  if (boundarySet) {
    identity.append(
      createTextInputField("Boundary-Set-ID", boundarySet.id || "", (value) => {
        boundarySet.id = slugifyBoundaryId(value, boundarySet.id || "boundary-set");
        item.geometryRef = { ...(item.geometryRef || {}), boundarySetId: boundarySet.id };
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Stable-ID", boundarySet.stable_id || "", (value) => {
        boundarySet.stable_id = slugifyBoundaryId(value, boundarySet.stable_id || boundarySet.id || "boundary");
        boundarySet.version_id = boundarySet.version_id || createBoundaryVersionId(boundarySet.stable_id, boundarySet.valid_from, boundarySet.valid_to);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Version-ID", boundarySet.version_id || "", (value) => {
        boundarySet.version_id = repairLegacyText(value.trim());
        persistEditorMutation(item);
      }),
      createTextInputField("Wikidata-ID", boundarySet.wikidata_id || "", (value) => {
        boundarySet.wikidata_id = normalizeWikidataId(value);
        item.wikidataId = boundarySet.wikidata_id;
        persistEditorMutation(item, { renderBrowser: true });
      }, { placeholder: "Q…" }),
      createSelectField("Kartentyp", boundarySet.boundary_type || "unknown", [
        { value: "unknown", label: "Unbestimmt" },
        { value: "administrative", label: "Administrative Grenzen" },
        { value: "electoral_districts", label: "Wahlkreise" },
        { value: "municipalities", label: "Gemeinden" },
        { value: "historical_boundaries", label: "Historische Grenzen" },
        { value: "other", label: "Andere" },
      ], (value) => {
        boundarySet.boundary_type = value;
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSearchableSelectField("Land ISO-3", boundarySet.country_iso3 || "", getIso3CountryChoices(), (value) => {
        boundarySet.country_iso3 = value.trim().toUpperCase();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSelectField("Ebene", boundarySet.admin_level || "", getBoundaryLevelChoices(), (value) => {
        boundarySet.admin_level = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Provider", boundarySet.provider || "", (value) => {
        boundarySet.provider = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Provider-ID", boundarySet.provider_boundary_id || "", (value) => {
        boundarySet.provider_boundary_id = repairLegacyText(value);
        persistEditorMutation(item);
      }),
      createSelectField("Review-Status", boundarySet.review_status || "imported", [
        { value: "imported", label: "Importiert" },
        { value: "normalized", label: "Normalisiert" },
        { value: "reviewed", label: "Geprüft" },
        { value: "canonical", label: "Kanonisch" },
        { value: "blocked", label: "Gesperrt" },
      ], (value) => {
        boundarySet.review_status = value;
        persistEditorMutation(item);
      }),
    );
  } else {
    identity.append(
      createTextInputField("Layer-ID", item.id || "", () => {}, { readonly: true }),
      createTextInputField("Typ", item.kind || "", () => {}, { readonly: true }),
      createTextInputField("Wikidata-ID", item.wikidataId || "", (value) => {
        item.wikidataId = normalizeWikidataId(value);
        persistEditorMutation(item, { renderBrowser: true });
      }, { placeholder: "Q…" }),
      createSearchableSelectField("ISO-3", item.iso3 || "", getIso3CountryChoices(), (value) => {
        item.iso3 = value.trim().toUpperCase();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSelectField("Ebene", item.adminLevel || "", getBoundaryLevelChoices(), (value) => {
        item.adminLevel = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Detail", item.detail || "", (value) => {
        item.detail = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(identity);

  const classification = createEditorSection("Kategorisierung", "Diese Werte beschreiben die Rolle der Geometrie im politischen, rechtlichen oder historischen Ordnungsmodell. Sie helfen später bei Suche, Filterung, Tabellenzuordnung und Darstellung.", {
    key: "classification",
    icon: "https://api.iconify.design/mdi/shape-outline.svg",
  });
  const classificationAssistantHint = document.createElement("p");
  classificationAssistantHint.className = "structured-editor-field-help structured-editor-assistant-hint";
  classificationAssistantHint.innerHTML = `Zur Einordnung kann der <a href="https://chatgpt.com/g/g-6a4781e83c5c8191be9ad53cead4f189-earthmap-gebietsklassifizierer" target="_blank" rel="noopener noreferrer">EarthMap-Gebietsklassifizierer</a> helfen.`;
  const relationToParent = classificationTarget.relation_to_parent || "";
  const parentIdField = relationToParent && relationToParent !== "none"
    ? createTextInputField("Parent-ID", classificationTarget.parent_id || "", (value) => {
      classificationTarget.parent_id = value.trim();
      persistEditorMutation(item, { renderBrowser: true });
    }, { placeholder: "z. B. boundary-set-id oder Objekt-ID" })
    : null;
  classification.append(
    classificationAssistantHint,
    createSelectField("Typ", classificationTarget.type || "", MAP_TYPE_CHOICES, (value) => {
      classificationTarget.type = value;
      if (boundarySet) boundarySet.boundary_type = value || boundarySet.boundary_type || "unknown";
      persistEditorMutation(item, { renderBrowser: true });
    }),
    createSelectField("Rang", classificationTarget.rank == null ? "" : String(classificationTarget.rank), MAP_RANK_CHOICES, (value) => {
      classificationTarget.rank = value === "" ? "" : Number(value);
      persistEditorMutation(item, { renderBrowser: true });
    }),
    createSelectField("Souveränitätsstatus", classificationTarget.sovereignty_status || "", SOVEREIGNTY_STATUS_CHOICES, (value) => {
      classificationTarget.sovereignty_status = value;
      persistEditorMutation(item, { renderBrowser: true });
    }),
    createSelectField("Konstitutioneller Status", classificationTarget.constitutional_status || "", CONSTITUTIONAL_STATUS_CHOICES, (value) => {
      classificationTarget.constitutional_status = value;
      persistEditorMutation(item, { renderBrowser: true, renderGlobe: true });
    }),
    createSelectField("Beziehung zum Parent", classificationTarget.relation_to_parent || "", RELATION_TO_PARENT_CHOICES, (value) => {
      classificationTarget.relation_to_parent = value;
      if (!value || value === "none") classificationTarget.parent_id = "";
      persistEditorMutation(item, { renderBrowser: true });
      renderObjectEditor();
    }),
    ...(parentIdField ? [parentIdField] : []),
    createSelectField("Geometrischer Geltungsbereich", classificationTarget.geometry_scope || "", GEOMETRY_SCOPE_CHOICES, (value) => {
      classificationTarget.geometry_scope = value;
      persistEditorMutation(item, { renderBrowser: true });
    }),
  );
  sections.push(classification);

  const source = createEditorSection("Quelle und Lizenz", "Diese Felder entscheiden später, ob eine Karte nur intern nutzbar oder veröffentlichungsfähig ist.", {
    key: "source",
    icon: "https://api.iconify.design/material-symbols/source-notes-outline.svg",
  });
  if (boundarySet) {
    source.append(
      createTextInputField("Quelle", boundarySet.source.label || "", (value) => {
        boundarySet.source.label = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Quell-URL", boundarySet.source.url || "", (value) => {
        boundarySet.source.url = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Abrufdatum", boundarySet.source.accessed_at || "", (value) => {
        boundarySet.source.accessed_at = value.trim();
        persistEditorMutation(item);
      }, { type: "date" }),
      createTextInputField("Lizenz-ID", boundarySet.license.id || "", (value) => {
        boundarySet.license.id = repairLegacyText(value);
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenz", boundarySet.license.label || "", (value) => {
        boundarySet.license.label = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Lizenz-URL", boundarySet.license.url || "", (value) => {
        boundarySet.license.url = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenzhinweis", boundarySet.license.detail || "", (value) => {
        boundarySet.license.detail = repairLegacyText(value);
        persistEditorMutation(item);
      }, { multiline: true }),
      createCheckboxField("Wikimedia-kompatibel", boundarySet.license.compatibility.wikimedia === true, (checked) => {
        boundarySet.license.compatibility.wikimedia = checked;
        persistEditorMutation(item);
      }),
      createCheckboxField("OpenStreetMap-kompatibel", boundarySet.license.compatibility.openstreetmap === true, (checked) => {
        boundarySet.license.compatibility.openstreetmap = checked;
        persistEditorMutation(item);
      }),
      createCheckboxField("Namensnennung erforderlich", boundarySet.license.compatibility.attribution_required === true, (checked) => {
        boundarySet.license.compatibility.attribution_required = checked;
        persistEditorMutation(item);
      }),
    );
  } else {
    source.append(
      createTextInputField("Quelle", item.source || "", (value) => {
        item.source = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Referenz", item.sourceUrl || "", (value) => {
        item.sourceUrl = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenz", item.license || "", (value) => {
        item.license = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(source);

  const time = createEditorSection("Zeit und Gültigkeit", "Gültigkeiten helfen später, historische oder politische Boundary-Sets korrekt zu wählen.", {
    key: "time",
    icon: "https://api.iconify.design/mdi/calendar-clock-outline.svg",
  });
  if (boundarySet) {
    time.append(
      createTextInputField("Repräsentiertes Jahr", boundarySet.year_represented || "", (value) => {
        boundarySet.year_represented = value.trim();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Gültig seit", boundarySet.valid_from || "", (value) => {
        boundarySet.valid_from = value.trim();
        persistEditorMutation(item, { renderBrowser: true });
      }, { type: "date" }),
      createTextInputField("Gültig bis", boundarySet.valid_to || "", (value) => {
        boundarySet.valid_to = value.trim() || null;
        persistEditorMutation(item, { renderBrowser: true });
      }, { type: "date" }),
      createSelectField("Genauigkeit", boundarySet.valid_precision || "unknown", [
        { value: "day", label: "Tag" },
        { value: "month", label: "Monat" },
        { value: "year", label: "Jahr" },
        { value: "range", label: "Zeitraum" },
        { value: "unknown", label: "Unbekannt" },
      ], (value) => {
        boundarySet.valid_precision = value;
        persistEditorMutation(item);
      }),
      createSelectField("Zeitstatus", boundarySet.temporal_status || "undated_reference", [
        { value: "current", label: "Aktuell" },
        { value: "historical", label: "Historisch" },
        { value: "undated_reference", label: "Undatierte Referenz" },
        { value: "working", label: "Arbeitsfassung" },
        { value: "unknown", label: "Unbekannt" },
      ], (value) => {
        boundarySet.temporal_status = value;
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Zeitnotiz", boundarySet.temporal_note || "", (value) => {
        boundarySet.temporal_note = repairLegacyText(value);
        persistEditorMutation(item);
      }),
    );
  } else {
    time.append(
      createTextInputField("Zeitspanne", item.temporalCoverage?.label || "", (value) => {
        item.temporalCoverage = { ...(item.temporalCoverage || {}), label: repairLegacyText(value) };
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(time);

  if (boundarySet) {
    const content = createEditorSection("Einzelflächen", "Die Geometrien bleiben erhalten; hier prüfen wir zunächst Identität, Namen und Wikidata-Bezüge.", {
      key: "features",
      icon: "https://api.iconify.design/mdi/vector-polygon.svg",
    });
    const unitList = document.createElement("div");
    unitList.className = "boundary-feature-list";
    const featureCount = getLibraryItemFeatureCount(item);
    const listedFeatures = boundarySet.features?.length
      ? boundarySet.features
      : (state.boundarySetFeatureCache.get(boundarySet.geometryStorage?.key) || []);
    if (!listedFeatures.length && boundarySet.geometryStorage?.provider === "indexeddb") {
      requestArchivedBoundarySetFeatures(item);
      const note = document.createElement("p");
      note.className = "empty-state";
      note.textContent = `${featureCount} Einheiten sind im EarthMap-Archiv gespeichert und werden geladen.`;
      unitList.append(note);
    }
    listedFeatures.slice(0, 80).forEach((feature) => {
      const row = document.createElement("div");
      row.className = "boundary-feature-row";
      const title = document.createElement("strong");
      title.textContent = feature.name || feature.id;
      const meta = document.createElement("span");
      meta.textContent = [feature.id, feature.wikidata_id].filter(Boolean).join(" · ") || "ohne ID";
      row.append(title, meta);
      unitList.append(row);
    });
    if (featureCount > 80) {
      const note = document.createElement("p");
      note.className = "empty-state";
      note.textContent = `Weitere ${featureCount - 80} Einheiten sind importiert, werden hier aber aus Performancegründen nicht vollständig gelistet.`;
      unitList.append(note);
    }
    content.append(unitList);
    sections.push(content);
  }

  return sections;
}

function persistStatisticLayerMutation(layer, options = {}) {
  layer.title = repairLegacyText(layer.title || layer.name || "Statistik");
  layer.name = layer.title;
  rebuildGearBoxDataLayerMatches(layer);
  persistProjects();
  if (options.renderBrowser !== false) renderProjectBrowser();
  if (options.renderGlobe !== false) renderGlobe();
  if (ui.layerEditorTitle) ui.layerEditorTitle.textContent = layer.title;
  if (ui.layerEditorSummary) ui.layerEditorSummary.textContent = getLayerEditorSummary(layer);
}

function createStatisticStyleDraftFromLayer(layer) {
  const style = layer?.gearBox?.style || {};
  return {
    styleMode: style.mode || "manual",
    autoColorMode: style.auto_color_mode || "palette",
    baseColor: style.base_color || "#2166ac",
    lightnessMin: style.lightness_min ?? 32,
    lightnessMax: style.lightness_max ?? 84,
    classes: Array.isArray(style.classes) && style.classes.length
      ? style.classes.map((entry) => ({
        from: entry.from == null ? "" : String(entry.from),
        to: entry.to == null ? "" : String(entry.to),
        fill: entry.fill || "#d6ecff",
      }))
      : [{ from: "0", to: "100", fill: "#d6ecff" }],
  };
}

function syncStatisticStyleDraftToLayer(layer, styleDraft) {
  const toStoredBoundary = (value) => {
    const parsed = parseGearBoxNumber(value);
    return parsed == null ? null : parsed;
  };
  layer.gearBox = layer.gearBox || {};
  layer.gearBox.style = {
    ...(layer.gearBox.style || {}),
    mode: styleDraft.styleMode || "manual",
    auto_color_mode: styleDraft.autoColorMode || "palette",
    base_color: styleDraft.baseColor || "#2166ac",
    lightness_min: Number(styleDraft.lightnessMin) || 32,
    lightness_max: Number(styleDraft.lightnessMax) || 84,
    classes: getGearBoxClassesForDraft(styleDraft).map((entry) => ({
      from: toStoredBoundary(entry.from),
      to: toStoredBoundary(entry.to),
      fill: normalizeColorValue(entry.fill, "#d6ecff") || "#d6ecff",
    })),
  };
}

function createStatisticPropertySections(target, mode = "draft") {
  const isLayer = mode === "layer";
  const draft = isLayer ? createStatisticStyleDraftFromLayer(target) : target;
  const headers = isLayer
    ? (target.table?.headers || [])
    : (target.matchPreview?.headers || []);
  const gearBox = isLayer ? (target.gearBox || {}) : null;
  if (isLayer) {
    gearBox.join = gearBox.join || {};
    gearBox.values = Array.isArray(gearBox.values) && gearBox.values.length ? gearBox.values : [{}];
    target.gearBox = gearBox;
  }
  const rerenderLayerEditor = () => {
    persistStatisticLayerMutation(target);
    renderObjectEditor();
  };
  const availableChapterKeys = new Set(["statistic-general", "statistic-matching", "statistic-display", "statistic-diagnostics"]);
  if (state.activeEditorChapterKey && !availableChapterKeys.has(state.activeEditorChapterKey)) {
    state.activeEditorChapterKey = "";
  }
  const objectLabel = isLayer && target.origin === "search" ? "Suchkarte" : "Statistik";

  const general = createEditorSection("Allgemein", `Diese ${objectLabel} ist ein eigenes Browserobjekt. Sie speichert Werte, Quellen, Join-Regeln und Darstellung, aber keine eigene Geometriewahrheit.`, {
    key: "statistic-general",
    icon: "https://api.iconify.design/mdi/chart-box-outline.svg",
  });
  general.append(
    createTextInputField("Titel im Browser", isLayer ? (target.title || target.name || "") : target.title, (value) => {
      if (isLayer) {
        target.title = repairLegacyText(value || "Statistik");
        rerenderLayerEditor();
      } else {
        target.title = repairLegacyText(value || "Statistik");
      }
    }),
    createTextInputField("Boundary-Set-Version", isLayer ? (gearBox.target_boundary_set?.version_id || "") : target.targetBoundarySetVersionId, (value) => {
      if (isLayer) {
        gearBox.target_boundary_set = gearBox.target_boundary_set || {};
        gearBox.target_boundary_set.version_id = repairLegacyText(value);
        rerenderLayerEditor();
      } else {
        target.targetBoundarySetVersionId = repairLegacyText(value);
      }
    }),
    ...(isLayer ? [
      createCheckboxField("Sichtbar", target.visible !== false, (checked) => {
        target.visible = checked;
        rerenderLayerEditor();
      }),
      createTextInputField("Layer-ID", target.id || "", () => {}, { readonly: true }),
      createTextInputField("Zeilen", String(target.table?.rows?.length || 0), () => {}, { readonly: true }),
      createTextInputField("Gematcht", String(target.valueMatches?.length || 0), () => {}, { readonly: true }),
    ] : []),
  );

  const matching = createEditorSection("Matching", "Diese Angaben erklären EarthMap, wie CSV-Zeilen an Boundaries andocken.", {
    key: "statistic-matching",
    icon: "https://api.iconify.design/mdi/link-variant.svg",
  });
  const matchingActions = document.createElement("div");
  matchingActions.className = "gearbox-actions";
  if (isLayer) {
    const hydrateButton = document.createElement("button");
    hydrateButton.type = "button";
    hydrateButton.className = "secondary-button";
    hydrateButton.textContent = "Geometrien laden und neu matchen";
    hydrateButton.addEventListener("click", async () => {
      hydrateButton.disabled = true;
      hydrateButton.setAttribute("aria-busy", "true");
      try {
        await ensureGearBoxBoundaryChunksForRows(target.table?.rows || []);
        rebuildGearBoxDataLayerMatches(target);
        persistProjects();
        renderProjectBrowser();
        renderObjectEditor();
        renderGlobe();
      } finally {
        hydrateButton.disabled = false;
        hydrateButton.removeAttribute("aria-busy");
      }
    });
    matchingActions.append(hydrateButton);
  }
  matching.append(
    ...(isLayer ? [matchingActions] : []),
    createSelectField("Tabellenschlüssel", isLayer ? (gearBox.join.table_key || "") : target.tableKey, headers.map((header) => ({ value: header, label: header })), (value) => {
      if (isLayer) {
        gearBox.join.table_key = value;
        rerenderLayerEditor();
      } else {
        target.tableKey = value;
        evaluateGearBoxDraft(target);
        renderGearBoxPanel();
      }
    }, { help: "CSV-Spalte, die auf eine Boundary gematcht wird." }),
    createSelectField("Boundary-Feld", isLayer ? (gearBox.join.boundary_key || "stable_id") : target.boundaryKey, getGearBoxBoundaryChoices(), (value) => {
      if (isLayer) {
        gearBox.join.boundary_key = value || "stable_id";
        rerenderLayerEditor();
      } else {
        target.boundaryKey = value;
        evaluateGearBoxDraft(target);
        renderGearBoxPanel();
      }
    }),
    createSelectField("Wertspalte", isLayer ? (gearBox.values[0].table_key || "") : target.valueKey, headers.map((header) => ({ value: header, label: header })), (value) => {
      if (isLayer) {
        gearBox.values[0].table_key = value;
        rerenderLayerEditor();
      } else {
        target.valueKey = value;
        evaluateGearBoxDraft(target);
        renderGearBoxPanel();
      }
    }),
  );

  const display = createEditorSection("Darstellung", "Diese Werte steuern, wie Wertebereiche auf der Karte eingefärbt werden.", {
    key: "statistic-display",
    icon: "https://api.iconify.design/mdi/palette-outline.svg",
  });
  if (isLayer && target.origin === "search") {
    const searchMode = target.gearBox?.style?.search_result_mode !== false;
    display.append(createCheckboxField("Darstellung wie Suchergebnis", searchMode, (checked) => {
      target.gearBox = target.gearBox || {};
      target.gearBox.style = target.gearBox.style || {};
      target.gearBox.style.search_result_mode = checked;
      persistStatisticLayerMutation(target);
      renderObjectEditor();
      renderGlobe();
    }));
  }
  display.append(createGearBoxStyleEditor(draft, isLayer ? {
    onChange: (styleDraft) => {
      syncStatisticStyleDraftToLayer(target, styleDraft);
      persistStatisticLayerMutation(target);
      renderObjectEditor();
    },
  } : undefined));
  return isLayer ? [general, matching, display, createStatisticLayerDiagnosticsSection(target)] : [general, matching, display];
}

function createStatisticLayerEditorSections(layer) {
  return createStatisticPropertySections(layer, "layer");
}

function createStatisticLayerDiagnosticsSection(layer) {
  const section = createEditorSection("Diagnose", "Diese Übersicht zeigt, ob CSV-Werte, Boundary-Matches, Geometrien und Farben wirklich zusammenfinden.", {
    key: "statistic-diagnostics",
    icon: "https://api.iconify.design/mdi/stethoscope.svg",
  });
  const rows = Array.isArray(layer.table?.rows) ? layer.table.rows : [];
  const matches = Array.isArray(layer.valueMatches) ? layer.valueMatches : [];
  const drawable = matches.filter((match) => hasDrawableBoundaryFeature(match?.feature) && match.fill);
  const first = matches[0] || null;
  const uniqueBoundaryKeys = new Set(matches.map((match) => String(match.boundaryKey || "").trim()).filter(Boolean));
  const uniqueFeatureKeys = new Set(matches.map((match) => {
    const props = match?.feature?.properties || {};
    return String(match?.stable_id || match?.featureId || props.iso_3166_2 || props.adm1_code || props.wikidataid || "").trim();
  }).filter(Boolean));
  const uniqueFills = new Set(matches.map((match) => String(match.fill || "").trim()).filter(Boolean));
  const lastDraw = layer._lastStatisticDraw || {};
  const table = document.createElement("div");
  table.className = "layer-meta-table";
  [
    ["Tabellenzeilen", rows.length],
    ["Matches", matches.length],
    ["Zeichnungsfähige Matches", drawable.length],
    ["Eindeutige Boundary-Keys", uniqueBoundaryKeys.size || "—"],
    ["Eindeutige Feature-Keys", uniqueFeatureKeys.size || "—"],
    ["Eindeutige Farben", uniqueFills.size || "—"],
    ["Erster Boundary-Key", first?.boundaryKey || "—"],
    ["Erster Wert", first?.value ?? "—"],
    ["Erste numerische Lesung", first?.numericValue ?? "—"],
    ["Erste Farbe", first?.fill || "—"],
    ["Erste Geometrie vorhanden", first ? (hasDrawableBoundaryFeature(first.feature) ? "ja" : "nein") : "—"],
    ["Zuletzt gezeichnet", Number.isFinite(lastDraw.drawn) ? `${lastDraw.drawn} von ${lastDraw.attempted}` : "—"],
    ["Hydrierung läuft", layer._gearBoxGeometryHydrationPending ? "ja" : "nein"],
    ["Geladene ADM1-Länderchunks", state.naturalEarthAdmin1CountryChunkCache.size || "—"],
    ["Fehlende Beispiele", layer.matchPreview?.missing?.length ? layer.matchPreview.missing.join(", ") : "—"],
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "layer-meta-row";
    const key = document.createElement("span");
    key.textContent = label;
    const val = document.createElement("strong");
    val.textContent = String(value);
    row.append(key, val);
    table.append(row);
  });
  section.append(table);
  return section;
}

function createStatisticLayerCsvEditor(layer) {
  const section = createEditorSection("CSV-Code", "Hier liegt der Rohcode der importierten Statistik. Änderungen werden in die Wertetabelle übernommen und neu gematcht.", {
    key: "statistic-csv",
    icon: "https://api.iconify.design/mdi/code-json.svg",
  });
  const actions = document.createElement("div");
  actions.className = "gearbox-actions";
  const check = document.createElement("button");
  check.type = "button";
  check.className = "secondary-button";
  check.textContent = "Matching prüfen";
  check.addEventListener("click", async () => {
    check.disabled = true;
    check.setAttribute("aria-busy", "true");
    try {
      await ensureGearBoxBoundaryChunksForRows(layer.table?.rows || []);
      rebuildGearBoxDataLayerMatches(layer);
      persistProjects();
      renderProjectBrowser();
      renderObjectEditor();
      renderGlobe();
    } finally {
      check.disabled = false;
      check.removeAttribute("aria-busy");
    }
  });
  actions.append(check);
  section.append(
    actions,
    createTextInputField("CSV-Code", layer.table?.raw || serializeDelimitedRows(layer.table?.headers || [], layer.table?.rows || [], layer.table?.delimiter || ";"), (value) => {
      layer.table = layer.table || {};
      layer.table.raw = value;
      const parsed = parseDelimitedRows(value, layer.table.delimiter || ";", layer.table.hasHeader !== false);
      layer.table.headers = parsed.headers;
      layer.table.rows = parsed.rows;
      rebuildGearBoxDataLayerMatches(layer);
      persistProjects();
      renderProjectBrowser();
      renderGlobe();
    }, { multiline: true }),
  );
  return section;
}

function renderCollectionImportEditor() {
  if (!ui.collectionImportTitle || !ui.collectionImportSummary || !ui.collectionImportContent || !ui.collectionImportMetaList) return;
  const pending = state.pendingBoundarySetImport;
  if (!pending?.boundarySet) {
    ui.collectionImportTitle.textContent = "Keine Sammlung geladen";
    ui.collectionImportSummary.textContent = "Importiere eine komplexe Karte, um Quelle, Lizenz, Einheiten und Kompatibilität zu prüfen.";
    ui.collectionImportContent.hidden = true;
    ui.collectionImportMetaList.replaceChildren();
    if (ui.addCollectionToProjectButton) ui.addCollectionToProjectButton.disabled = true;
    return;
  }

  const boundarySet = pending.boundarySet;
  ui.collectionImportTitle.textContent = boundarySet.title || pending.fileName || "komplexe Karte";
  ui.collectionImportSummary.textContent = `${boundarySet.features?.length || 0} Einheiten · ${boundarySet.boundary_type || "Typ ungeklärt"} · ${boundarySet.review_status || "imported"}`;
  ui.collectionImportContent.hidden = false;
  if (ui.addCollectionToProjectButton) ui.addCollectionToProjectButton.disabled = false;
  const rows = [
    ["Datei", pending.fileName || "—"],
    ["Schema", boundarySet.schema || "—"],
    ["ID", boundarySet.id || "—"],
    ["Stable-ID", boundarySet.stable_id || "—"],
    ["Version-ID", boundarySet.version_id || "—"],
    ["Typ", boundarySet.boundary_type || "—"],
    ["ISO-3", boundarySet.country_iso3 || "—"],
    ["Einheiten", String(boundarySet.features?.length || 0)],
    ["Quelle", boundarySet.source?.label || "—"],
    ["Lizenz", boundarySet.license?.label || "—"],
    ["Wikimedia", boundarySet.license?.compatibility?.wikimedia === true ? "kompatibel" : "nicht geprüft/Nein"],
    ["OpenStreetMap", boundarySet.license?.compatibility?.openstreetmap === true ? "kompatibel" : "nicht geprüft/Nein"],
    ["Gültigkeit", [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || "nicht geprüft"],
    ["Zeitstatus", boundarySet.temporal_status || "—"],
  ];
  ui.collectionImportMetaList.replaceChildren(...rows.flatMap(([term, description]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = description;
    return [dt, dd];
  }));
}

function createEmptyGearBoxDraft() {
  return {
    schema: EARTHMAP_GEARBOX_SCHEMA,
    id: `gearbox-${Date.now()}`,
    title: "Neue Statistik",
    activeTab: "editor",
    csvCode: "",
    delimiter: ";",
    hasHeader: true,
    targetBoundarySetVersionId: getActiveBoundarySet(getActiveProject())?.version_id || "",
    tableKey: "",
    boundaryKey: "stable_id",
    valueKey: "",
    valueType: "number",
    valueUnit: "",
    classes: [
      { from: "0", to: "100", fill: "#d6ecff" },
    ],
    styleMode: "manual",
    autoColorMode: "palette",
    baseColor: "#2166ac",
    lightnessMin: 32,
    lightnessMax: 84,
    sourceLabel: "",
    sourceUrl: "",
    matchPreview: null,
  };
}

function ensureGearBoxDraft() {
  if (!state.gearBoxDraft) state.gearBoxDraft = createEmptyGearBoxDraft();
  return state.gearBoxDraft;
}

function parseDelimitedRows(text, delimiter = ";", hasHeader = true) {
  const source = String(text || "")
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/^```(?:csv|tsv)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  if (!source) return { headers: [], rows: [] };
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => String(value).trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((value) => String(value).trim())) rows.push(row);
  if (!rows.length) return { headers: [], rows: [] };
  const headers = hasHeader
    ? rows[0].map((value, index) => String(value || `Spalte ${index + 1}`).trim())
    : rows[0].map((_, index) => `Spalte ${index + 1}`);
  const dataRows = hasHeader ? rows.slice(1) : rows;
  return {
    headers,
    rows: dataRows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))),
  };
}

function serializeDelimitedRows(headers = [], rows = [], delimiter = ";") {
  const escapeCell = (value) => {
    const text = String(value ?? "");
    if (text.includes(delimiter) || /["\r\n]/.test(text)) {
      return `"${text.replace(/"/g, "\"\"")}"`;
    }
    return text;
  };
  return [
    headers.map(escapeCell).join(delimiter),
    ...rows.map((row) => headers.map((header) => escapeCell(row?.[header] ?? "")).join(delimiter)),
  ].join("\n");
}

function getValueByPath(source, path) {
  if (!path) return "";
  return String(path).split(".").reduce((cursor, part) => {
    if (cursor == null) return "";
    return cursor[part];
  }, source);
}

function parseGearBoxNumber(value) {
  const raw = String(value ?? "").trim();
  const numberLike = raw.replace(/\s+/g, "").match(/[-+]?\d+(?:[.,]\d+)?/u)?.[0] || "";
  const normalized = numberLike.replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function hexToRgbParts(hex, fallback = "#2166ac") {
  const color = normalizeColorValue(hex, fallback) || fallback;
  const intValue = Number.parseInt(color.slice(1), 16);
  return {
    red: (intValue >> 16) & 255,
    green: (intValue >> 8) & 255,
    blue: intValue & 255,
  };
}

function rgbToHex(red, green, blue) {
  return `#${[red, green, blue].map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;
  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    hue = max === r
      ? (g - b) / delta + (g < b ? 6 : 0)
      : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4;
    hue /= 6;
  }
  return { hue, saturation, lightness };
}

function hslToHex(hue, saturation, lightness) {
  const hueToRgb = (p, q, t) => {
    let next = t;
    if (next < 0) next += 1;
    if (next > 1) next -= 1;
    if (next < 1 / 6) return p + (q - p) * 6 * next;
    if (next < 1 / 2) return q;
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
    return p;
  };
  if (saturation === 0) {
    const gray = lightness * 255;
    return rgbToHex(gray, gray, gray);
  }
  const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  return rgbToHex(
    hueToRgb(p, q, hue + 1 / 3) * 255,
    hueToRgb(p, q, hue) * 255,
    hueToRgb(p, q, hue - 1 / 3) * 255,
  );
}

function getGearBoxAutoPaletteColors(count) {
  const palette = ["#d6ecff", "#b8d8f0", "#8ebfdf", "#5f9dcc", "#2166ac", "#173f73"];
  if (count <= palette.length) return palette.slice(0, count);
  return Array.from({ length: count }, (_, index) => palette[Math.min(palette.length - 1, Math.floor(index * palette.length / count))]);
}

function getGearBoxClassesForDraft(draft) {
  const rawClasses = Array.isArray(draft.classes) && draft.classes.length ? draft.classes : [{ from: "0", to: "100", fill: "#d6ecff" }];
  if (draft.styleMode !== "automatic") return rawClasses;
  if (draft.autoColorMode === "lightness") {
    const { red, green, blue } = hexToRgbParts(draft.baseColor || "#2166ac");
    const hsl = rgbToHsl(red, green, blue);
    const min = clamp(Number(draft.lightnessMin) || 32, 0, 100) / 100;
    const max = clamp(Number(draft.lightnessMax) || 84, 0, 100) / 100;
    return rawClasses.map((entry, index) => {
      const t = rawClasses.length <= 1 ? 1 : index / (rawClasses.length - 1);
      const lightness = max + (min - max) * t;
      return { ...entry, fill: hslToHex(hsl.hue, hsl.saturation, lightness) };
    });
  }
  const palette = getGearBoxAutoPaletteColors(rawClasses.length);
  return rawClasses.map((entry, index) => ({ ...entry, fill: palette[index] || entry.fill || "#d6ecff" }));
}

function parseGearBoxRangeBoundary(value, fallback) {
  if (value === "" || value == null) return fallback;
  const number = parseGearBoxNumber(value);
  return number == null ? fallback : number;
}

function normalizeGearBoxClassFill(value) {
  return normalizeColorValue(value, "#d6ecff") || "#d6ecff";
}

function getGearBoxClassForValue(value, classes) {
  const number = parseGearBoxNumber(value);
  if (number == null) return null;
  return classes.find((entry) => {
    const from = parseGearBoxRangeBoundary(entry.from, -Infinity);
    const to = parseGearBoxRangeBoundary(entry.to, Infinity);
    return number >= from && number <= to;
  }) || null;
}

function getActiveGearBoxDataLayer(project = getActiveProject()) {
  const layers = Array.isArray(project?.dataLayers) ? project.dataLayers : [];
  return [...layers].reverse().find((layer) => layer?.kind === "gearbox-data-layer") || null;
}

function getBoundaryFeatureCandidatesForGearBox() {
  const project = getActiveProject();
  const items = getAllProjectLibraryItems(project);
  const features = [];
  items.forEach((item) => {
    const boundarySet = item?.boundarySet;
    if (!boundarySet) return;
    const listedFeatures = boundarySet.features?.length
      ? boundarySet.features
      : (state.boundarySetFeatureCache.get(boundarySet.geometryStorage?.key) || []);
    listedFeatures.forEach((feature) => {
      features.push({ item, boundarySet, feature });
    });
  });
  (getNaturalEarthCountryDataset()?.features || []).forEach((archiveFeature) => {
    const item = createNaturalEarthArchiveItemDefaults("admin_0_countries", archiveFeature);
    const boundarySet = item.boundarySet;
    (boundarySet?.features || []).forEach((feature) => {
      features.push({ item, boundarySet, feature });
    });
  });
  // Admin-1-Geometrien liegen aus Performancegründen nicht global im Speicher,
  // sondern werden pro Staat/ISO-3-Chunk geladen. Für GearBox-Matching dürfen
  // deshalb nicht nur die leichten Metadaten betrachtet werden: erst geladene
  // Chunks enthalten die eigentlichen Polygone, die später eingefärbt werden.
  state.naturalEarthAdmin1CountryChunkCache.forEach((dataset) => {
    (dataset?.features || []).forEach((archiveFeature) => {
      const item = createNaturalEarthArchiveItemDefaults("admin_1_states_provinces", archiveFeature);
      const boundarySet = item.boundarySet;
      (boundarySet?.features || []).forEach((feature) => {
        features.push({ item, boundarySet, feature });
      });
    });
  });
  (state.naturalEarthAdmin1Dataset?.features || window.EarthMapNaturalEarthAdmin1Metadata10m?.features || []).forEach((archiveFeature) => {
    const item = createNaturalEarthArchiveItemDefaults("admin_1_states_provinces", archiveFeature);
    const boundarySet = item.boundarySet;
    (boundarySet?.features || []).forEach((feature) => {
      features.push({ item, boundarySet, feature });
    });
  });
  return features;
}

function getGearBoxBoundaryChoices() {
  return [
    { value: "stable_id", label: "stable_id" },
    { value: "version_id", label: "version_id" },
    { value: "id", label: "id" },
    { value: "name", label: "name" },
    { value: "wikidata_id", label: "wikidata_id" },
    { value: "properties.AGS", label: "properties.AGS" },
    { value: "properties.ISO_A3", label: "properties.ISO_A3" },
    { value: "properties.ADM0_A3", label: "properties.ADM0_A3" },
    { value: "properties.iso_3166_2", label: "properties.iso_3166_2" },
  ];
}

function getPreferredGearBoxTableKey(headers = []) {
  const lowered = new Map(headers.map((header) => [String(header).toLowerCase(), header]));
  return lowered.get("boundary_key")
    || lowered.get("stable_id")
    || lowered.get("iso_3166_2")
    || lowered.get("wikidata_id")
    || lowered.get("iso3")
    || lowered.get("boundary_label")
    || headers[0]
    || "";
}

function getPreferredGearBoxValueKey(headers = [], tableKey = "") {
  const lowered = new Map(headers.map((header) => [String(header).toLowerCase(), header]));
  return lowered.get("value")
    || lowered.get("wert")
    || headers.find((header) => header !== tableKey && !/^source_/i.test(header) && !/^(unit|boundary_label|boundary_key|iso3|iso_3166_2|wikidata_id|parent_key|valid_at|aggregation_method)$/i.test(header))
    || "";
}

function getGearBoxRowValue(row, key) {
  if (!row || !key) return "";
  if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
  const normalizedKey = String(key).toLowerCase();
  const actualKey = Object.keys(row).find((candidate) => String(candidate).toLowerCase() === normalizedKey);
  return actualKey ? row[actualKey] : "";
}

function addGearBoxMatchKey(keys, value) {
  addEarthMapBoundaryMatchKey(keys, value);
}

function getGearBoxFeatureMatchKeys(feature) {
  return getEarthMapBoundaryMatchKeys(feature);
}

function getGearBoxRowMatchKeys(row, preferredTableKey = "") {
  const keys = new Set();
  const specificValues = [
    getGearBoxRowValue(row, preferredTableKey),
    getGearBoxRowValue(row, "boundary_key"),
    getGearBoxRowValue(row, "stable_id"),
    getGearBoxRowValue(row, "version_id"),
    getGearBoxRowValue(row, "id"),
    getGearBoxRowValue(row, "wikidata_id"),
    getGearBoxRowValue(row, "iso_3166_2"),
    getGearBoxRowValue(row, "boundary_label"),
    getGearBoxRowValue(row, "name"),
  ];
  specificValues.forEach((value) => addGearBoxMatchKey(keys, value));
  // Statistik-Join-Regel: ISO3/Parent-Key beschreiben häufig nur den
  // übergeordneten Staat. Wenn bereits ein konkreter Boundary-Key vorhanden ist,
  // darf der Parent-Key nicht als gleichwertiger Treffer genutzt werden.
  if (!specificValues.some((value) => normalizeSearchText(value))) {
    [
      getGearBoxRowValue(row, "iso3"),
      getGearBoxRowValue(row, "parent_key"),
      getGearBoxRowValue(row, "adm0_a3"),
      getGearBoxRowValue(row, "ADM0_A3"),
    ].forEach((value) => addGearBoxMatchKey(keys, value));
  }
  return keys;
}

function getGearBoxRowIso3Candidates(row) {
  const direct = [
    getGearBoxRowValue(row, "iso3"),
    getGearBoxRowValue(row, "parent_key"),
    getGearBoxRowValue(row, "adm0_a3"),
    getGearBoxRowValue(row, "ADM0_A3"),
  ]
    .map((value) => String(value || "").trim().toUpperCase())
    .filter((value) => /^[A-Z]{3}$/.test(value));
  const iso2Candidates = [
    getGearBoxRowValue(row, "iso_3166_2"),
    getGearBoxRowValue(row, "boundary_key"),
  ]
    .map((value) => String(value || "").trim().toUpperCase().match(/^([A-Z]{2})-/)?.[1] || "")
    .filter(Boolean);
  const iso2ToIso3 = new Map((getNaturalEarthCountryDataset()?.features || []).map((feature) => {
    const props = feature?.properties || {};
    return [String(props.ISO_A2 || props.WB_A2 || "").toUpperCase(), String(props.ADM0_A3 || props.ISO_A3 || "").toUpperCase()];
  }));
  const engineIndex = getNaturalEarthAdmin0EngineIndex();
  if (engineIndex?.chunks?.length) {
    engineIndex.chunks.forEach((entry) => {
      const iso2 = String(entry.country_iso2 || "").toUpperCase();
      const iso3 = String(entry.country_iso3 || entry.provider_boundary_id || "").toUpperCase();
      if (iso2 && iso3) iso2ToIso3.set(iso2, iso3);
    });
  }
  const inferred = iso2Candidates
    .map((iso2) => iso2ToIso3.get(iso2))
    .filter((value) => /^[A-Z]{3}$/.test(value || ""));
  const fromAdmin1Index = [];
  const admin1Index = getNaturalEarthAdmin1EngineIndex();
  if (admin1Index?.feature_index?.length) {
    const rowKeys = getGearBoxRowMatchKeys(row, "");
    admin1Index.feature_index.forEach((entry) => {
      const entryKeys = new Set();
      [
        entry.stable_id,
        entry.version_id,
        entry.provider_boundary_id,
        entry.iso_3166_2,
        entry.adm1_code,
        entry.wikidata_id,
        entry.title,
        ...(Array.isArray(entry.match_keys) ? entry.match_keys : []),
      ].forEach((value) => addGearBoxMatchKey(entryKeys, value));
      for (const key of rowKeys) {
        if (entryKeys.has(key) && /^[A-Z]{3}$/.test(entry.country_iso3 || "")) {
          fromAdmin1Index.push(entry.country_iso3);
          break;
        }
      }
    });
  }
  return [...new Set([...direct, ...inferred, ...fromAdmin1Index])];
}

function getGearBoxRowBoundarySearchTerms(row) {
  return [
    getGearBoxRowValue(row, "boundary_key"),
    getGearBoxRowValue(row, "stable_id"),
    getGearBoxRowValue(row, "iso_3166_2"),
    getGearBoxRowValue(row, "wikidata_id"),
    getGearBoxRowValue(row, "boundary_label"),
    getGearBoxRowValue(row, "name"),
    getGearBoxRowValue(row, "label"),
  ]
    .map((value) => repairLegacyText(value).trim())
    .filter(Boolean);
}

function getGearBoxRowCountrySearchTerms(row) {
  return [
    getGearBoxRowValue(row, "iso3"),
    getGearBoxRowValue(row, "parent_key"),
    getGearBoxRowValue(row, "country"),
    getGearBoxRowValue(row, "country_label"),
    getGearBoxRowValue(row, "admin"),
    getGearBoxRowValue(row, "adm0"),
  ]
    .map((value) => repairLegacyText(value).trim())
    .filter(Boolean);
}

const FRENCH_REGION_TO_DEPARTMENT_ISO3166 = {
  "FR-ARA": ["FR-01", "FR-03", "FR-07", "FR-15", "FR-26", "FR-38", "FR-42", "FR-43", "FR-63", "FR-69", "FR-73", "FR-74"],
  "FR-BFC": ["FR-21", "FR-25", "FR-39", "FR-58", "FR-70", "FR-71", "FR-89", "FR-90"],
  "FR-BRE": ["FR-22", "FR-29", "FR-35", "FR-56"],
  "FR-COR": ["FR-2A", "FR-2B"],
  "FR-CVL": ["FR-18", "FR-28", "FR-36", "FR-37", "FR-41", "FR-45"],
  "FR-GES": ["FR-08", "FR-10", "FR-51", "FR-52", "FR-54", "FR-55", "FR-57", "FR-67", "FR-68", "FR-88"],
  "FR-HDF": ["FR-02", "FR-59", "FR-60", "FR-62", "FR-80"],
  "FR-IDF": ["FR-75", "FR-77", "FR-78", "FR-91", "FR-92", "FR-93", "FR-94", "FR-95"],
  "FR-NAQ": ["FR-16", "FR-17", "FR-19", "FR-23", "FR-24", "FR-33", "FR-40", "FR-47", "FR-64", "FR-79", "FR-86", "FR-87"],
  "FR-NOR": ["FR-14", "FR-27", "FR-50", "FR-61", "FR-76"],
  "FR-OCC": ["FR-09", "FR-11", "FR-12", "FR-30", "FR-31", "FR-32", "FR-34", "FR-46", "FR-48", "FR-65", "FR-66", "FR-81", "FR-82"],
  "FR-PAC": ["FR-04", "FR-05", "FR-06", "FR-13", "FR-83", "FR-84"],
  "FR-PACA": ["FR-04", "FR-05", "FR-06", "FR-13", "FR-83", "FR-84"],
  "FR-PDL": ["FR-44", "FR-49", "FR-53", "FR-72", "FR-85"],
  "FR-GF": ["FR-GF"],
  "FR-GUA": ["FR-GP"],
  "FR-GP": ["FR-GP"],
  "FR-LRE": ["FR-RE"],
  "FR-RE": ["FR-RE"],
  "FR-MAY": ["FR-YT"],
  "FR-YT": ["FR-YT"],
  "FR-MQ": ["FR-MQ"],
  "FR-MTQ": ["FR-MQ"],
};

function getFrenchRegionCompositeEntryForRow(row, preferredTableKey = "") {
  const rowCodes = [
    getGearBoxRowValue(row, preferredTableKey),
    getGearBoxRowValue(row, "boundary_key"),
    getGearBoxRowValue(row, "iso_3166_2"),
  ]
    .map((value) => String(value || "").trim().toUpperCase())
    .filter(Boolean);
  const regionCode = rowCodes.find((code) => FRENCH_REGION_TO_DEPARTMENT_ISO3166[code]);
  if (!regionCode) return null;
  const dataset = state.naturalEarthAdmin1CountryChunkCache?.get("FRA");
  if (!dataset?.features?.length) return null;
  const departmentCodes = new Set(FRENCH_REGION_TO_DEPARTMENT_ISO3166[regionCode]);
  const features = dataset.features.filter((feature) => departmentCodes.has(String(feature?.properties?.iso_3166_2 || "").toUpperCase()));
  if (!features.length) return null;
  const feature = {
    type: "FeatureCollection",
    id: `natural-earth:10m:admin1-composite:${regionCode.toLowerCase()}`,
    stable_id: regionCode,
    name: getGearBoxRowValue(row, "boundary_label") || regionCode,
    properties: {
      iso_3166_2: regionCode,
      source_level: "ADM1-composite-from-departments",
      member_count: features.length,
    },
    features,
  };
  return { item: null, boundarySet: null, feature };
}

function findLoadedAdmin1ChunkEntryForRow(row, preferredTableKey = "") {
  const compositeEntry = getFrenchRegionCompositeEntryForRow(row, preferredTableKey);
  if (compositeEntry) return compositeEntry;
  const rowKeys = new Set(getGearBoxRowMatchKeys(row, preferredTableKey));
  if (!rowKeys.size || !state.naturalEarthAdmin1CountryChunkCache?.size) return null;
  for (const dataset of state.naturalEarthAdmin1CountryChunkCache.values()) {
    for (const feature of dataset?.features || []) {
      if (!hasDrawableBoundaryFeature(feature)) continue;
      const featureKeys = getGearBoxFeatureMatchKeys(feature);
      for (const key of rowKeys) {
        if (featureKeys.has(key)) {
          return { item: null, boundarySet: null, feature };
        }
      }
    }
  }
  return null;
}

function inferGearBoxIso3CandidatesFromNames(row) {
  const iso3s = new Set();
  getGearBoxRowCountrySearchTerms(row).forEach((term) => {
    const directIso = String(term || "").trim().toUpperCase();
    if (/^[A-Z]{3}$/.test(directIso)) {
      iso3s.add(directIso);
      return;
    }
    const country = findNaturalEarthCountryFeature(term);
    const iso = getNaturalEarthIso3(country).toUpperCase();
    if (/^[A-Z]{3}$/.test(iso)) iso3s.add(iso);
  });

  const metadataFeatures = getNaturalEarthAdmin1MetadataFeatures();
  getGearBoxRowBoundarySearchTerms(row).forEach((term) => {
    const match = findBestFeatureMatch(
      metadataFeatures,
      (props, feature) => getNaturalEarthAdmin1SearchValues(props, feature),
      term,
    );
    const iso = getNaturalEarthAdmin1CountryIso3(match);
    if (/^[A-Z]{3}$/.test(iso)) iso3s.add(iso);
  });
  return [...iso3s];
}

async function ensureGearBoxBoundaryChunksForRows(rows = []) {
  await ensureNaturalEarthSearchBaseLoaded();
  const iso3s = new Set();
  rows.forEach((row) => {
    getGearBoxRowIso3Candidates(row).forEach((iso3) => iso3s.add(iso3));
  });
  await loadNaturalEarthAdmin1Dataset();
  rows.forEach((row) => {
    getGearBoxRowIso3Candidates(row).forEach((iso3) => iso3s.add(iso3));
    inferGearBoxIso3CandidatesFromNames(row).forEach((iso3) => iso3s.add(iso3));
  });
  if (!iso3s.size) return;
  await Promise.all([...iso3s].map((iso3) => loadNaturalEarthAdmin1CountryChunk(iso3)));
}

async function ensureGearBoxBoundaryChunksForRowsInBatches(rows = [], taskContext = {}) {
  await ensureNaturalEarthSearchBaseLoaded();
  if (taskContext.shouldPause?.()) return false;
  const iso3s = new Set();
  rows.forEach((row) => {
    getGearBoxRowIso3Candidates(row).forEach((iso3) => iso3s.add(iso3));
  });
  await loadNaturalEarthAdmin1Dataset();
  if (taskContext.shouldPause?.()) return false;
  rows.forEach((row) => {
    getGearBoxRowIso3Candidates(row).forEach((iso3) => iso3s.add(iso3));
    inferGearBoxIso3CandidatesFromNames(row).forEach((iso3) => iso3s.add(iso3));
  });
  for (const iso3 of iso3s) {
    if (taskContext.shouldPause?.()) return false;
    await loadNaturalEarthAdmin1CountryChunk(iso3);
    await taskContext.yield?.();
  }
  return true;
}

function createEarthMapBoundaryIndex(boundaryFeatures = [], preferredBoundaryKey = "") {
  const index = new Map();
  boundaryFeatures.forEach((entry) => {
    const keys = getGearBoxFeatureMatchKeys(entry.feature);
    addGearBoxMatchKey(keys, getValueByPath(entry.feature, preferredBoundaryKey));
    keys.forEach((key) => {
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(entry);
    });
  });
  return index;
}

function createGearBoxBoundaryIndex(boundaryFeatures = [], preferredBoundaryKey = "") {
  return createEarthMapBoundaryIndex(boundaryFeatures, preferredBoundaryKey);
}

function findEarthMapBoundaryEntryByKeys(keys, boundaryIndex, options = {}) {
  const requireDrawable = options.requireDrawable === true;
  for (const key of keys) {
    const matches = boundaryIndex.get(key);
    if (matches?.length) {
      const drawable = matches.find((match) => hasDrawableBoundaryFeature(match.feature));
      if (drawable) return drawable;
      if (!requireDrawable) return matches[0];
    }
  }
  return null;
}

function findGearBoxBoundaryEntryForRow(row, boundaryIndex, preferredTableKey = "", options = {}) {
  const indexedEntry = findEarthMapBoundaryEntryByKeys(getGearBoxRowMatchKeys(row, preferredTableKey), boundaryIndex, options);
  if (indexedEntry) return indexedEntry;
  const loadedAdmin1Entry = findLoadedAdmin1ChunkEntryForRow(row, preferredTableKey);
  if (loadedAdmin1Entry) return loadedAdmin1Entry;
  return null;
}

function getGearBoxLayerClasses(layer) {
  const classes = Array.isArray(layer?.gearBox?.style?.classes) && layer.gearBox.style.classes.length
    ? layer.gearBox.style.classes
    : [{ from: 0, to: 100, fill: "#d6ecff" }];
  return classes.map((entry) => ({
    ...entry,
    from: entry.from == null ? "" : String(entry.from),
    to: entry.to == null ? "" : String(entry.to),
    fill: normalizeGearBoxClassFill(entry.fill),
  }));
}

function rebuildGearBoxDataLayerMatches(layer) {
  if (!layer?.table) return layer;
  const rows = Array.isArray(layer.table.rows) ? layer.table.rows : [];
  const headers = Array.isArray(layer.table.headers) ? layer.table.headers : [];
  const gearBox = layer.gearBox || {};
  const tableKey = gearBox.join?.table_key || getPreferredGearBoxTableKey(headers);
  const boundaryKey = gearBox.join?.boundary_key || "stable_id";
  const valueKey = gearBox.values?.[0]?.table_key || getPreferredGearBoxValueKey(headers, tableKey);
  const classes = getGearBoxLayerClasses(layer);
  const boundaryIndex = createGearBoxBoundaryIndex(getBoundaryFeatureCandidatesForGearBox(), boundaryKey);
  layer.valueMatches = rows.flatMap((row) => {
    const entry = findGearBoxBoundaryEntryForRow(row, boundaryIndex, tableKey, { requireDrawable: true });
    const value = getGearBoxRowValue(row, valueKey);
    const classEntry = getGearBoxClassForValue(value, classes);
    if (!entry || !classEntry) return [];
    return [{
      boundaryKey: getGearBoxRowValue(row, tableKey) || getGearBoxRowValue(row, "boundary_key") || "",
      featureId: entry.feature.id || entry.feature.stable_id || entry.feature.properties?.iso_3166_2 || entry.feature.properties?.adm1_code || "",
      stable_id: entry.feature.stable_id || entry.feature.properties?.iso_3166_2 || entry.feature.properties?.adm1_code || "",
      value,
      numericValue: parseGearBoxNumber(value),
      fill: normalizeGearBoxClassFill(classEntry.fill),
      source: {
        label: getGearBoxRowValue(row, "source_label") || "",
        url: getGearBoxRowValue(row, "source_url") || "",
        accessed_at: getGearBoxRowValue(row, "source_accessed_at") || "",
        note: getGearBoxRowValue(row, "source_note") || "",
      },
      feature: entry.feature,
    }];
  });
  layer.matchPreview = {
    ...(layer.matchPreview || {}),
    headers,
    rowCount: rows.length,
    boundaryCount: getBoundaryFeatureCandidatesForGearBox().length,
    matched: layer.valueMatches.length,
    missing: rows
      .filter((row) => !findGearBoxBoundaryEntryForRow(row, boundaryIndex, tableKey, { requireDrawable: true }))
      .slice(0, 12)
      .map((row) => getGearBoxRowValue(row, tableKey) || getGearBoxRowValue(row, "boundary_label") || getGearBoxRowValue(row, "boundary_key") || "—"),
  };
  return layer;
}

function evaluateGearBoxDraft(draft = ensureGearBoxDraft()) {
  const parsed = parseDelimitedRows(draft.csvCode, draft.delimiter || ";", draft.hasHeader !== false);
  const tableKey = draft.tableKey || getPreferredGearBoxTableKey(parsed.headers);
  const boundaryKey = draft.boundaryKey || "stable_id";
  const boundaryFeatures = getBoundaryFeatureCandidatesForGearBox();
  const boundaryIndex = createGearBoxBoundaryIndex(boundaryFeatures, boundaryKey);
  let matched = 0;
  const missing = [];
  parsed.rows.forEach((row) => {
    if (findGearBoxBoundaryEntryForRow(row, boundaryIndex, tableKey, { requireDrawable: true })) matched += 1;
    else if (missing.length < 12) missing.push(getGearBoxRowValue(row, tableKey) || getGearBoxRowValue(row, "boundary_label") || getGearBoxRowValue(row, "boundary_key") || "—");
  });
  draft.tableKey = tableKey;
  if (!draft.valueKey) draft.valueKey = getPreferredGearBoxValueKey(parsed.headers, tableKey);
  draft.matchPreview = {
    headers: parsed.headers,
    rowCount: parsed.rows.length,
    boundaryCount: boundaryFeatures.length,
    matched,
    missing,
  };
  return draft.matchPreview;
}

function buildGearBoxFromDraft(draft = ensureGearBoxDraft()) {
  return {
    schema: EARTHMAP_GEARBOX_SCHEMA,
    id: draft.id || `gearbox-${Date.now()}`,
    title: draft.title || "Statistik",
    target_boundary_set: {
      version_id: draft.targetBoundarySetVersionId || getActiveBoundarySet(getActiveProject())?.version_id || "",
    },
    input: {
      format: "csv",
      has_header: draft.hasHeader !== false,
      delimiter: draft.delimiter || ";",
      encoding: "utf-8",
    },
    join: {
      table_key: draft.tableKey || "",
      boundary_key: draft.boundaryKey || "stable_id",
      normalization: { trim: true, casefold: true, remove_diacritics: true },
    },
    values: [{
      id: slugifyBoundaryId(draft.valueKey || "value", "value"),
      table_key: draft.valueKey || "",
      label: draft.valueKey || "Wert",
      type: draft.valueType || "number",
      unit: draft.valueUnit || "",
    }],
    style: {
      value_id: slugifyBoundaryId(draft.valueKey || "value", "value"),
      mode: draft.styleMode || "manual",
      auto_color_mode: draft.autoColorMode || "palette",
      base_color: draft.baseColor || "#2166ac",
      lightness_min: Number(draft.lightnessMin) || 32,
      lightness_max: Number(draft.lightnessMax) || 84,
      classes: getGearBoxClassesForDraft(draft).map((entry) => ({
        from: entry.from === "" ? null : Number(entry.from),
        to: entry.to === "" ? null : Number(entry.to),
        fill: entry.fill || "",
      })),
    },
    source: {
      label: draft.sourceLabel || "",
      url: draft.sourceUrl || "",
      accessed_at: new Date().toISOString().slice(0, 10),
    },
  };
}

function ensureActiveProjectForDataImport() {
  let project = getActiveProject();
  if (project) return project;
  project = normalizeProject(createEarthMapProject("EarthMap Datenprojekt"));
  state.projects.push(project);
  state.activeProjectId = project.id;
  return project;
}

function createGearBoxDataLayerFromDraft(draft = ensureGearBoxDraft()) {
  const parsed = parseDelimitedRows(draft.csvCode, draft.delimiter || ";", draft.hasHeader !== false);
  const preview = evaluateGearBoxDraft(draft);
  const classes = getGearBoxClassesForDraft(draft);
  const boundaryKey = draft.boundaryKey || "stable_id";
  const tableKey = draft.tableKey || getPreferredGearBoxTableKey(parsed.headers);
  const valueKey = draft.valueKey || getPreferredGearBoxValueKey(parsed.headers, tableKey);
  const boundaryIndex = createGearBoxBoundaryIndex(getBoundaryFeatureCandidatesForGearBox(), boundaryKey);
  const valueMatches = parsed.rows.flatMap((row) => {
    const entry = findGearBoxBoundaryEntryForRow(row, boundaryIndex, tableKey, { requireDrawable: true });
    const value = getGearBoxRowValue(row, valueKey);
    const classEntry = getGearBoxClassForValue(value, classes);
    if (!entry || !classEntry) return [];
    return [{
      boundaryKey: getGearBoxRowValue(row, tableKey),
      featureId: entry.feature.id || entry.feature.stable_id || entry.feature.properties?.iso_3166_2 || entry.feature.properties?.adm1_code || "",
      stable_id: entry.feature.stable_id || entry.feature.properties?.iso_3166_2 || entry.feature.properties?.adm1_code || "",
      value,
      numericValue: parseGearBoxNumber(value),
      fill: normalizeGearBoxClassFill(classEntry.fill),
      source: {
        label: getGearBoxRowValue(row, "source_label") || "",
        url: getGearBoxRowValue(row, "source_url") || "",
        accessed_at: getGearBoxRowValue(row, "source_accessed_at") || "",
        note: getGearBoxRowValue(row, "source_note") || "",
      },
      feature: entry.feature,
    }];
  });
  return normalizeDataLayer({
    id: `data-layer-${slugifyBoundaryId(draft.title || "gearbox")}-${Date.now()}`,
    kind: "gearbox-data-layer",
    title: draft.title || "Statistikdaten",
    importedAt: new Date().toISOString(),
    gearBox: buildGearBoxFromDraft(draft),
    table: {
      format: "csv",
      delimiter: draft.delimiter || ";",
      hasHeader: draft.hasHeader !== false,
      headers: parsed.headers,
      rows: parsed.rows,
      raw: draft.csvCode || "",
    },
    valueMatches,
    matchPreview: preview,
  });
}

async function importGearBoxCsvDraftToProject() {
  const draft = ensureGearBoxDraft();
  if (!String(draft.csvCode || "").trim()) {
    window.alert("Bitte zuerst CSV-Code einfügen oder eine CSV/TSV-Datei laden.");
    return;
  }
  const project = ensureActiveProjectForDataImport();
  const parsed = parseDelimitedRows(draft.csvCode, draft.delimiter || ";", draft.hasHeader !== false);
  await ensureGearBoxBoundaryChunksForRows(parsed.rows);
  const layer = createGearBoxDataLayerFromDraft(draft);
  if (!layer.valueMatches.length) {
    evaluateGearBoxDraft(draft);
    renderGearBoxPanel();
    window.alert("Die Werte wurden noch nicht importiert, weil keine Tabellenzeile einer Karte zugeordnet werden konnte. Bitte Matching-Felder und Boundary-Schlüssel prüfen.");
    return;
  }
  project.dataLayers = Array.isArray(project.dataLayers) ? project.dataLayers : [];
  project.dataLayers.push(layer);
  project.activeLibraryItemId = layer.id;
  state.gearBoxDraft = {
    ...draft,
    id: `gearbox-${Date.now()}`,
    title: draft.title,
    activeTab: "values",
    csvCode: "",
    matchPreview: null,
  };
  state.gearBoxModeAction = "work";
  renderEditorTabs();
  if (!persistProjects()) {
    window.alert("Der Datenlayer wurde im aktuellen Projekt angelegt, konnte aber nicht dauerhaft gespeichert werden. Bitte Browser-Speicher prüfen.");
  }
  renderWorkspace();
  renderGlobe();
}

function getGearBoxAdminLevelChoices() {
  return [
    { value: "ADM0", label: "ADM0 · Staaten / abhängige Gebiete", description: "Geeignet für Tabellen auf Staatenebene, z. B. ISO-3, ADM0_A3 oder Ländernamen." },
    { value: "ADM1", label: "ADM1 · Gliedstaaten / Provinzen", description: "Geeignet für Bundesländer, Provinzen, Kantone oder States, z. B. ISO-3166-2." },
    { value: "ADM2", label: "ADM2 · Kreise / Bezirke", description: "Geeignet für Kreise, Départements, Bezirke oder Counties; oft mit amtlichen Regionalschlüsseln." },
    { value: "ADM3", label: "ADM3 · Gemeinden / lokale Ebene", description: "Geeignet für Gemeinden oder kleinteilige lokale Verwaltungseinheiten." },
    { value: "electoral_district", label: "Wahlkreise", description: "Geeignet für Wahlkreis- oder Stimmbezirksdaten." },
    { value: "custom", label: "Benutzerdefiniert", description: "Für historische, thematische oder selbst definierte Boundary-Sets." },
  ];
}

function getGearBoxAdminLevelPromptHint(level) {
  const choice = getGearBoxAdminLevelChoices().find((entry) => entry.value === level);
  const joinHint = level === "ADM0"
    ? "Nutze bevorzugt ISO-3, ADM0_A3, stable_id oder Wikidata-ID."
    : level === "ADM1"
      ? "Nutze bevorzugt ISO-3166-2, stable_id, parent_id + Name oder Wikidata-ID."
      : level === "electoral_district"
        ? "Nutze bevorzugt amtliche Wahlkreisnummern, stable_id oder eindeutige Wahlkreisnamen mit Parent-Bezug."
        : "Nutze bevorzugt amtliche Schlüssel, stable_id, parent_id + Name oder Wikidata-ID.";
  return `${choice?.label || level}. ${choice?.description || ""} ${joinHint}`.trim();
}

function normalizeGearBoxScopeList(scopeText = "") {
  return String(scopeText || "")
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function getGearBoxScopePromptHint(scopeText = "") {
  const entries = normalizeGearBoxScopeList(scopeText);
  if (!entries.length) {
    return "Kein Geltungsbereich angegeben. Ermittle den fachlich passenden Geltungsbereich aus dem Nutzerwunsch und dokumentiere ihn im Feld target_boundary_set.scope.";
  }
  return `Geltungsbereich: ${entries.join(", ")}. Komma und Semikolon sind hier ausschließlich Aufzählungstrenner und haben keine Hierarchie- oder Fokuslogik. Erfasse Werte nur für diese genannten Staaten, Organisationen oder Gebietsräume, soweit die Quelle dafür Daten enthält.`;
}

function buildGearBoxGenerationPrompt(requestText = "", adminLevel = state.gearBoxPromptAdminLevel || "ADM0", scopeText = state.gearBoxPromptScope || "") {
  return `Du erstellst für EarthMap ein CSV-Datenblatt, das anschließend über die GearBox an Boundary-Sets gekoppelt wird.

Ziel:
- Eine externe CSV-/TSV-/JSON-Tabelle soll an ein vorhandenes Boundary-Set gekoppelt werden.
- Speichere keine Geometrien.
- Speichere keine zweite Boundary-Wahrheit.
- Erzeuge konkrete Tabellenwerte, die EarthMap über eine eindeutige Karten-ID oder einen eindeutigen geografischen Schlüssel matchen kann.
- Jeder Datenpunkt muss eigene Quellenfelder besitzen. Eine globale Quellenangabe reicht nicht.
- Nutze für jeden Datenpunkt die jeweils belastbarste verfügbare Quelle. Bevorzuge amtliche Statistikdatenbanken, Primärdaten, API-Endpunkte, herunterladbare Tabellen oder fachlich einschlägige Originalveröffentlichungen.
- Verwende keineswegs aus Bequemlichkeit nur eine einzige Quelle für alle Datenpunkte, wenn für einzelne Boundaries bessere, aktuellere oder genauere Quellen verfügbar sind.
- Für alle angefragten Boundaries müssen Werte angegeben werden. Die CSV soll keine Auswahl, keine Stichprobe und keine bloße Rangliste sein.
- Die Daten sollen auf diesem administrativen Level dargestellt werden: ${getGearBoxAdminLevelPromptHint(adminLevel)}
- ${getGearBoxScopePromptHint(scopeText)}
- Wenn die Quelle Werte auf einer feineren Ebene enthält als im EarthMap-Projekt Kartenmaterial vorhanden ist, aggregiere diese feineren Werte auf die verfügbare Ebene. Nutze dafür zunächst den arithmetischen Durchschnitt aller betroffenen Werte und dokumentiere diese Verdichtung unter aggregation.
- Nutze keine journalistischen Kurzmeldungen, Ranglisten oder Extremwertmeldungen als vollständige Datengrundlage, wenn eine eigentliche Datentabelle existiert.
- Wenn eine Quelle nur Beispiele, Minimum/Maximum oder ausgewählte Regionen nennt, gib keine scheinbar vollständige Tabelle aus. Notiere dann außerhalb des Codeblocks knapp, dass die Quelle für eine vollständige Kartierung nicht ausreicht.
- Verwende für ADM0 bevorzugt ISO-3, ADM0_A3, stable_id oder Wikidata-ID.
- Verwende für ADM1 bevorzugt ISO-3166-2, stable_id, Wikidata-ID oder den exakten Namen der Natural-Earth-ADM1-Einheit.
- Verwende NUTS-Codes nur, wenn ausdrücklich ein NUTS-Boundary-Set vorhanden oder angefordert ist. NUTS-1/2/3 ist nicht automatisch identisch mit ADM1.
- Wenn du Eurostat-Daten nutzt, greife nach Möglichkeit auf die vollständige Eurostat-Datentabelle/API zu, nicht nur auf einen Eurostat-Newsartikel.
- Erfinde keine Zuordnung zwischen NUTS-Regionen und ADM1-Grenzen. Aggregiere oder mappe nur, wenn die Zuordnung aus einer belastbaren Quelle eindeutig hervorgeht.

Nutzerwunsch:
${requestText || "Erstelle ein CSV-Datenblatt mit geografischem Schlüssel, numerischem Wert und Quellenangaben pro Datenpunkt."}

CSV-Regeln:
- Gib die CSV ausschließlich in einem Markdown-Codeblock aus.
- Verwende Semikolon als Trennzeichen.
- Verwende eine Kopfzeile.
- Werte müssen maschinenlesbar sein: Dezimalzahlen mit Punkt oder Komma, aber ohne Prozentzeichen im Wertefeld.
- Wenn du aggregierst, kennzeichne die Zeile mit aggregation_method=arithmetic_mean und erkläre knapp, welche feineren Werte einbezogen wurden.
- Erzeuge für jede angefragte Boundary genau eine Datenzeile, sofern nicht ausdrücklich mehrere Werte/Zeitpunkte angefordert wurden.
- Lasse keine angefragte Boundary aus. Wenn ein Wert in der belastbarsten Quelle fehlt, recherchiere eine alternative belastbare Quelle statt die Boundary zu überspringen.
- Füge pro Datenpunkt mindestens diese Quellenfelder hinzu:
  - source_label: Kurzbeleg oder Institution/Publikation
  - source_url: konkrete URL, DOI oder leer, falls keine URL existiert
  - source_accessed_at: Abrufdatum im Format YYYY-MM-DD, falls online
  - source_note: knapper Hinweis zur konkreten Herleitung, Aggregation oder Tabellenspalte

Pflichtspalten der CSV:
- boundary_key: eindeutiger Schlüssel, der später gegen stable_id, ISO-Code, AGS, ISO-3166-2, Wikidata-ID oder einen anderen Boundary-Schlüssel gematcht werden kann. Bei ADM1 möglichst ISO-3166-2 oder stable_id, nicht NUTS, sofern kein NUTS-Boundary-Set vorliegt.
- boundary_label: menschlich lesbarer Name der Gebietseinheit
- value: darzustellender numerischer Wert
- unit: Einheit des Wertes, z. B. %, Einwohner, Stimmen, Indexpunkte
- source_label
- source_url
- source_accessed_at
- source_note

Empfohlene Zusatzspalten:
- wikidata_id
- iso3
- iso_3166_2
- parent_key
- valid_at
- aggregation_method

Beispielstruktur:
\`\`\`csv
boundary_key;boundary_label;value;unit;source_label;source_url;source_accessed_at;source_note;wikidata_id;iso3;iso_3166_2;parent_key;valid_at;aggregation_method
DEU;Deutschland;42.1;%;Beispielquelle;https://example.org/table;2026-07-11;Wert direkt aus Tabelle 1;Q183;DEU;;;2024;
\`\`\`

Gib außerhalb des Codeblocks höchstens eine kurze Notiz aus, falls Annahmen oder Aggregationen fachlich unsicher sind.`;
}

function createGearBoxStyleEditor(draft, options = {}) {
  const notifyChange = () => {
    if (typeof options.onChange === "function") {
      options.onChange(draft);
      return;
    }
    renderGearBoxPanel();
    scheduleGlobeRender();
  };
  if (!Array.isArray(draft.classes) || !draft.classes.length) {
    draft.classes = [{ from: "0", to: "100", fill: "#d6ecff" }];
  }
  const section = document.createElement("div");
  section.className = "gearbox-style-editor";
  const title = document.createElement("h4");
  title.textContent = "Darstellung";
  const description = document.createElement("p");
  description.className = "structured-editor-field-help";
  description.textContent = "Lege fest, welche Wertebereiche wie auf der Karte markiert werden.";
  section.append(title, description);
  section.append(
    createSelectField("Farbzuweisung", draft.styleMode || "manual", [
      { value: "manual", label: "Manuell" },
      { value: "automatic", label: "Automatisch" },
    ], (value) => {
      draft.styleMode = value;
      notifyChange();
    }),
  );
  if (draft.styleMode === "automatic") {
    section.append(
      createSelectField("Automatik", draft.autoColorMode || "palette", [
        { value: "palette", label: "Vordefinierte Farben" },
        { value: "lightness", label: "Grundfarbe mit Helligkeitsabständen" },
      ], (value) => {
        draft.autoColorMode = value;
        notifyChange();
      }),
    );
    if (draft.autoColorMode === "lightness") {
      section.append(
        createColorPickerField("Grundfarbe", draft.baseColor || "#2166ac", (value) => {
          draft.baseColor = normalizeColorValue(value, "#2166ac") || "#2166ac";
          notifyChange();
        }, { fallback: "#2166ac" }),
        createTextInputField("Hellste Version", draft.lightnessMax ?? 84, (value) => {
          draft.lightnessMax = clamp(Number(value) || 84, 0, 100);
          notifyChange();
        }, { type: "range", min: 0, max: 100, step: 1 }),
        createTextInputField("Dunkelste Version", draft.lightnessMin ?? 32, (value) => {
          draft.lightnessMin = clamp(Number(value) || 32, 0, 100);
          notifyChange();
        }, { type: "range", min: 0, max: 100, step: 1 }),
      );
    }
  }
  const classList = document.createElement("div");
  classList.className = "gearbox-class-list";
  const classes = getGearBoxClassesForDraft(draft);
  classes.forEach((entry, index) => {
    const sourceEntry = draft.classes[index] || entry;
    const row = document.createElement("div");
    row.className = "gearbox-class-row";
    row.append(
      createTextInputField("Von", sourceEntry.from ?? "", (value) => {
        draft.classes[index].from = value.trim();
        notifyChange();
      }, { type: "number", step: "any" }),
      createTextInputField("Bis", sourceEntry.to ?? "", (value) => {
        draft.classes[index].to = value.trim();
        notifyChange();
      }, { type: "number", step: "any" }),
    );
    if (draft.styleMode === "manual") {
      row.append(createColorPickerField("Farbe", sourceEntry.fill || "#d6ecff", (value) => {
        draft.classes[index].fill = normalizeColorValue(value, "#d6ecff") || "#d6ecff";
        notifyChange();
      }, { fallback: "#d6ecff" }));
    } else {
      const swatch = document.createElement("div");
      swatch.className = "gearbox-class-swatch";
      swatch.style.background = entry.fill || "#d6ecff";
      swatch.textContent = entry.fill || "—";
      row.append(swatch);
    }
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary-button gearbox-class-remove";
    remove.textContent = "Entfernen";
    remove.disabled = draft.classes.length <= 1;
    remove.addEventListener("click", () => {
      draft.classes.splice(index, 1);
      notifyChange();
    });
    row.append(remove);
    classList.append(row);
  });
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button";
  add.textContent = "Wertebereich hinzufügen";
  add.addEventListener("click", () => {
    const last = draft.classes.at(-1) || { from: "0", to: "100", fill: "#d6ecff" };
    draft.classes.push({ from: last.to || "", to: "", fill: "#7db7e8" });
    notifyChange();
  });
  section.append(classList, add);
  return section;
}

function createGearBoxPromptPanel() {
  const panel = document.createElement("section");
  panel.className = "gearbox-style-editor";
  const title = document.createElement("h4");
  title.textContent = "Statistik generieren";
  const request = createTextInputField("Auftrag an die KI", state.gearBoxPromptRequest || "", (value) => {
    state.gearBoxPromptRequest = value;
  }, { multiline: true, placeholder: "Welche Tabelle soll auf welche Boundaries gemappt werden?" });
  const adminLevel = createSelectField("Administratives Level", state.gearBoxPromptAdminLevel || "ADM0", getGearBoxAdminLevelChoices(), (value) => {
    state.gearBoxPromptAdminLevel = value;
    state.gearBoxGeneratedPrompt = "";
    state.gearBoxPromptCopied = false;
    renderGearBoxPanel();
  }, { help: "Legt fest, auf welcher Boundary-Ebene die Daten später dargestellt werden sollen." });
  const scope = createTextInputField("Geltungsbereich", state.gearBoxPromptScope || "", (value) => {
    state.gearBoxPromptScope = repairLegacyText(value);
    state.gearBoxGeneratedPrompt = "";
    state.gearBoxPromptCopied = false;
    renderGearBoxPanel();
  }, { placeholder: "z. B. Deutschland, Österreich; Schweiz oder EU, NATO" });
  const scopeInput = scope.querySelector("input");
  scopeInput?.setAttribute("list", "mapSearchOptions");
  scopeInput?.addEventListener("input", () => populateMapSearchOptions(scopeInput.value));
  const prompt = createTextInputField("Prompt", state.gearBoxGeneratedPrompt || "", (value) => {
    state.gearBoxGeneratedPrompt = value;
  }, { multiline: true, readonly: Boolean(state.gearBoxGeneratedPrompt) });
  const actions = document.createElement("div");
  actions.className = "gearbox-actions";
  const generate = document.createElement("button");
  generate.type = "button";
  generate.className = "secondary-button";
  generate.textContent = "Prompt generieren";
  generate.addEventListener("click", () => {
    state.gearBoxGeneratedPrompt = buildGearBoxGenerationPrompt(state.gearBoxPromptRequest, state.gearBoxPromptAdminLevel, state.gearBoxPromptScope);
    state.gearBoxPromptCopied = false;
    renderGearBoxPanel();
  });
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "secondary-button";
  copy.textContent = state.gearBoxPromptCopied ? "Prompt kopiert" : "Prompt kopieren";
  copy.disabled = !state.gearBoxGeneratedPrompt;
  copy.addEventListener("click", async () => {
    await navigator.clipboard?.writeText(state.gearBoxGeneratedPrompt || "");
    state.gearBoxPromptCopied = true;
    renderGearBoxPanel();
  });
  const csv = document.createElement("button");
  csv.type = "button";
  csv.className = "secondary-button";
  csv.textContent = "CSV-Code einfügen";
  csv.addEventListener("click", () => {
    state.gearBoxModeAction = "work";
    ensureGearBoxDraft().activeTab = "csv";
    renderEditorTabs();
    renderGearBoxPanel();
    updateEditorModeView();
  });
  actions.append(generate, copy, csv);
  panel.append(title, request, adminLevel, scope, prompt, actions);
  return panel;
}

function createGearBoxCreatePanel() {
  const panel = document.createElement("section");
  panel.className = "gearbox-style-editor";
  const title = document.createElement("h4");
  title.textContent = "Statistik erstellen";
  const description = document.createElement("p");
  description.className = "structured-editor-field-help";
  description.textContent = "Lege eine Statistik aus bereits vorhandenem CSV-Code an. Im nächsten Schritt fügst du den Code ein, prüfst das Matching und importierst die Werte in das aktive Projekt.";
  const actions = document.createElement("div");
  actions.className = "gearbox-actions";
  const csv = document.createElement("button");
  csv.type = "button";
  csv.className = "secondary-button";
  csv.textContent = "CSV-Code einfügen";
  csv.addEventListener("click", () => {
    state.gearBoxModeAction = "work";
    state.gearBoxWorkSource = "create";
    ensureGearBoxDraft().activeTab = "csv";
    renderEditorTabs();
    renderGearBoxPanel();
    updateEditorModeView();
  });
  actions.append(csv);
  panel.append(title, description, actions);
  return panel;
}

function syncGearBoxLayerAfterTableEdit(layer, { rerender = false } = {}) {
  if (!layer?.table) return;
  const headers = Array.isArray(layer.table.headers) ? layer.table.headers : [];
  const rows = Array.isArray(layer.table.rows) ? layer.table.rows : [];
  layer.table.raw = serializeDelimitedRows(headers, rows, layer.table.delimiter || ";");
  rebuildGearBoxDataLayerMatches(layer);
  persistProjects();
  renderProjectBrowser();
  updateMapSearchAvailability();
  renderGlobe();
  if (rerender) renderGearBoxPanel();
}

function getGearBoxVisibleValueHeaders(headers = []) {
  const normalized = new Set(headers.map((header) => String(header).toLowerCase()));
  const hasSourceLabel = normalized.has("source_label");
  const hiddenTechnicalHeaders = new Set([
    "stable_id",
    "feature_id",
    "version_id",
    "provider_boundary_id",
    "iso3",
    "iso_3166_2",
    "adm1_code",
    "wikidata_id",
  ]);
  return headers.filter((header) => {
    const key = String(header).toLowerCase();
    return !hiddenTechnicalHeaders.has(key)
      && !(hasSourceLabel && ["source_url", "source_accessed_at", "source_note", "archive_url"].includes(key));
  });
}

function getGearBoxValueHeaderLabel(header) {
  return String(header).toLowerCase() === "source_label" ? "source" : header;
}

function createGearBoxValuesTable(layer) {
  const panel = document.createElement("div");
  panel.className = "gearbox-values-table-panel";

  const title = document.createElement("div");
  title.className = "gearbox-values-table-title";
  const meta = document.createElement("span");
  const rows = Array.isArray(layer?.table?.rows) ? layer.table.rows : [];
  const matches = Array.isArray(layer?.valueMatches) ? layer.valueMatches.length : 0;
  meta.textContent = `${rows.length} Zeilen · ${matches} gematcht`;
  title.append(meta);

  const hint = document.createElement("p");
  hint.className = "structured-editor-field-help";
  hint.textContent = "Änderungen an Werten oder Quellen werden direkt in den Datenlayer übernommen und auf der Karte neu dargestellt.";

  const tableWrap = document.createElement("div");
  tableWrap.className = "gearbox-values-table-wrap";
  const table = document.createElement("table");
  table.className = "gearbox-values-table";
  const headers = Array.isArray(layer?.table?.headers) && layer.table.headers.length
    ? layer.table.headers
    : ["boundary_key", "boundary_label", "value", "unit", "source_label", "source_url", "source_accessed_at", "source_note"];
  layer.table.headers = headers;
  layer.table.rows = rows;
  const visibleHeaders = getGearBoxVisibleValueHeaders(headers);

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = getGearBoxValueHeaderLabel(header);
    headRow.append(th);
  });
  const actionHead = document.createElement("th");
  actionHead.textContent = "";
  headRow.append(actionHead);
  thead.append(headRow);

  const tbody = document.createElement("tbody");
  rows.forEach((rowData, rowIndex) => {
    const tr = document.createElement("tr");
    visibleHeaders.forEach((header) => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = header === "source_url" ? "url" : "text";
      input.value = rowData?.[header] ?? "";
      input.placeholder = header;
      input.addEventListener("change", () => {
        rowData[header] = input.value.trim();
        syncGearBoxLayerAfterTableEdit(layer);
      });
      if (String(header).toLowerCase() === "boundary_key") {
        td.className = "gearbox-boundary-key-cell";
        td.append(createBoundaryKeyInputControl(input, rowData, layer, rowIndex, header));
      } else if (String(header).toLowerCase() === "source_label") {
        td.className = "gearbox-source-cell";
        td.append(createSourceInputControl(input, rowData, layer, rowIndex, header));
      } else {
        td.append(input);
      }
      if (header === "source_url" && rowData?.[header]) {
        const link = document.createElement("a");
        link.className = "gearbox-value-source-open";
        link.href = rowData[header];
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "öffnen";
        td.append(link);
      }
      tr.append(td);
    });

    const actionCell = document.createElement("td");
    actionCell.className = "gearbox-values-row-actions";
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "secondary-button";
    addButton.textContent = "+";
    addButton.title = "Zeile darunter hinzufügen";
    addButton.addEventListener("click", () => {
      const nextRow = Object.fromEntries(headers.map((header) => [header, ""]));
      rows.splice(rowIndex + 1, 0, nextRow);
      syncGearBoxLayerAfterTableEdit(layer, { rerender: true });
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary-button";
    removeButton.textContent = "×";
    removeButton.title = "Zeile entfernen";
    removeButton.addEventListener("click", () => {
      rows.splice(rowIndex, 1);
      if (!rows.length) rows.push(Object.fromEntries(headers.map((header) => [header, ""])));
      syncGearBoxLayerAfterTableEdit(layer, { rerender: true });
    });
    actionCell.append(addButton, removeButton);
    tr.append(actionCell);
    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrap.append(table);

  const actions = document.createElement("div");
  actions.className = "gearbox-actions";
  const addRow = document.createElement("button");
  addRow.type = "button";
  addRow.className = "secondary-button";
  addRow.textContent = "Zeile hinzufügen";
  addRow.addEventListener("click", () => {
    rows.push(Object.fromEntries(headers.map((header) => [header, ""])));
    syncGearBoxLayerAfterTableEdit(layer, { rerender: true });
  });
  const rebuild = document.createElement("button");
  rebuild.type = "button";
  rebuild.className = "secondary-button";
  rebuild.textContent = "Matching neu prüfen";
  rebuild.addEventListener("click", () => {
    syncGearBoxLayerAfterTableEdit(layer, { rerender: true });
  });
  actions.append(addRow, rebuild);

  panel.append(title, hint, tableWrap, actions);
  return panel;
}

function createGearBoxDraftValuesTable(draft = ensureGearBoxDraft()) {
  const parsed = parseDelimitedRows(draft.csvCode, draft.delimiter || ";", draft.hasHeader !== false);
  const panel = document.createElement("div");
  panel.className = "gearbox-values-table-panel";

  const title = document.createElement("div");
  title.className = "gearbox-values-table-title";
  const heading = document.createElement("strong");
  heading.textContent = "Wertetabelle";
  const meta = document.createElement("span");
  meta.textContent = parsed.rows.length
    ? `${parsed.rows.length} Zeilen · noch nicht importiert`
    : "Noch keine CSV-Werte geladen";
  title.append(heading, meta);

  if (!parsed.headers.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Füge im Tab „CSV-Code“ Werte ein oder lade eine CSV-Datei, dann erscheint hier die bearbeitbare Wertetabelle.";
    panel.append(title, empty);
    return panel;
  }

  const headers = parsed.headers;
  const rows = parsed.rows.length ? parsed.rows : [Object.fromEntries(headers.map((header) => [header, ""]))];
  const visibleHeaders = getGearBoxVisibleValueHeaders(headers);
  const persistRows = () => {
    draft.csvCode = serializeDelimitedRows(headers, rows, draft.delimiter || ";");
    evaluateGearBoxDraft(draft);
  };

  const tableWrap = document.createElement("div");
  tableWrap.className = "gearbox-values-table-wrap";
  const table = document.createElement("table");
  table.className = "gearbox-values-table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = getGearBoxValueHeaderLabel(header);
    headRow.append(th);
  });
  const actionHead = document.createElement("th");
  actionHead.textContent = "";
  headRow.append(actionHead);
  thead.append(headRow);

  const tbody = document.createElement("tbody");
  rows.forEach((rowData, rowIndex) => {
    const tr = document.createElement("tr");
    visibleHeaders.forEach((header) => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = header === "source_url" ? "url" : "text";
      input.value = rowData?.[header] ?? "";
      input.placeholder = header;
      input.addEventListener("change", () => {
        rowData[header] = input.value.trim();
        persistRows();
      });
      if (String(header).toLowerCase() === "boundary_key") {
        td.className = "gearbox-boundary-key-cell";
        td.append(createBoundaryKeyInputControl(input, rowData, null, rowIndex, header));
      } else if (String(header).toLowerCase() === "source_label") {
        td.className = "gearbox-source-cell";
        td.append(createSourceInputControl(input, rowData, null, rowIndex, header));
      } else {
        td.append(input);
      }
      if (header === "source_url" && rowData?.[header]) {
        const link = document.createElement("a");
        link.className = "gearbox-value-source-open";
        link.href = rowData[header];
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "öffnen";
        td.append(link);
      }
      tr.append(td);
    });
    const actionCell = document.createElement("td");
    actionCell.className = "gearbox-values-row-actions";
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "secondary-button";
    addButton.textContent = "+";
    addButton.title = "Zeile darunter hinzufügen";
    addButton.addEventListener("click", () => {
      rows.splice(rowIndex + 1, 0, Object.fromEntries(headers.map((header) => [header, ""])));
      persistRows();
      renderGearBoxPanel();
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary-button";
    removeButton.textContent = "×";
    removeButton.title = "Zeile entfernen";
    removeButton.addEventListener("click", () => {
      rows.splice(rowIndex, 1);
      if (!rows.length) rows.push(Object.fromEntries(headers.map((header) => [header, ""])));
      persistRows();
      renderGearBoxPanel();
    });
    actionCell.append(addButton, removeButton);
    tr.append(actionCell);
    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrap.append(table);

  const actions = document.createElement("div");
  actions.className = "gearbox-actions";
  const addRow = document.createElement("button");
  addRow.type = "button";
  addRow.className = "secondary-button";
  addRow.textContent = "Zeile hinzufügen";
  addRow.addEventListener("click", () => {
    rows.push(Object.fromEntries(headers.map((header) => [header, ""])));
    persistRows();
    renderGearBoxPanel();
  });
  const check = document.createElement("button");
  check.type = "button";
  check.className = "secondary-button";
  check.textContent = "Matching prüfen";
  check.addEventListener("click", async () => {
    check.disabled = true;
    check.setAttribute("aria-busy", "true");
    await ensureGearBoxBoundaryChunksForRows(rows);
    persistRows();
    renderGearBoxPanel();
  });
  const importValues = document.createElement("button");
  importValues.type = "button";
  importValues.className = "secondary-button";
  importValues.textContent = "Werte importieren";
  importValues.addEventListener("click", async () => {
    importValues.disabled = true;
    importValues.setAttribute("aria-busy", "true");
    try {
      persistRows();
      await importGearBoxCsvDraftToProject();
    } finally {
      importValues.disabled = false;
      importValues.removeAttribute("aria-busy");
    }
  });
  actions.append(addRow, check, importValues);
  panel.append(title, tableWrap, actions);
  return panel;
}

function createGearBoxDraftPropertySections(draft = ensureGearBoxDraft()) {
  return createStatisticPropertySections(draft, "draft");
}

function renderGearBoxPanel() {
  if (!ui.gearBoxWorkspace) return;
  const mode = state.gearBoxModeAction || "";
  ui.gearBoxCreateButton?.classList.toggle("is-active", mode === "create");
  ui.gearBoxGenerateButton?.classList.toggle("is-active", mode === "generate");
  ui.gearBoxCsvCodeButton?.classList.toggle("is-active", mode === "csv");
  ui.gearBoxWorkspace.replaceChildren();

  if (!mode) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Wähle „Statistik erstellen“ oder „Statistik generieren“. Die Arbeits-Tabs öffnen sich erst, wenn CSV-Code eingefügt werden soll.";
    ui.gearBoxWorkspace.append(empty);
    return;
  }

  if (mode === "create") {
    ui.gearBoxWorkspace.append(createGearBoxCreatePanel());
    return;
  }

  if (mode === "generate") {
    ui.gearBoxWorkspace.append(createGearBoxPromptPanel());
    return;
  }

  const draft = ensureGearBoxDraft();
  if (mode === "csv") draft.activeTab = "csv";
  const panel = document.createElement("div");
  panel.className = "gearbox-panel";

  if (draft.activeTab === "editor") {
    panel.append(...createGearBoxDraftPropertySections(draft));
  } else if (draft.activeTab === "values") {
    const hasDraftRows = Boolean(String(draft.csvCode || "").trim());
    const activeLayer = getActiveGearBoxDataLayer();
    if (hasDraftRows) {
      panel.append(createGearBoxDraftValuesTable(draft));
    } else if (activeLayer) {
      rebuildGearBoxDataLayerMatches(activeLayer);
      panel.append(createGearBoxValuesTable(activeLayer));
    } else {
      panel.append(createGearBoxDraftValuesTable(draft));
    }
  } else {
    const actions = document.createElement("div");
    actions.className = "gearbox-actions";
    const importButton = document.createElement("button");
    importButton.type = "button";
    importButton.className = "secondary-button";
    importButton.textContent = "CSV/JSON-Datei laden";
    importButton.addEventListener("click", () => ui.gearBoxCsvFileInput?.click());
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "secondary-button";
    checkButton.textContent = "Matching prüfen";
    checkButton.addEventListener("click", async () => {
      checkButton.disabled = true;
      checkButton.setAttribute("aria-busy", "true");
      const parsed = parseDelimitedRows(draft.csvCode, draft.delimiter || ";", draft.hasHeader !== false);
      await ensureGearBoxBoundaryChunksForRows(parsed.rows);
      evaluateGearBoxDraft(draft);
      renderGearBoxPanel();
    });
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "secondary-button";
    saveButton.textContent = "Werte importieren";
    saveButton.addEventListener("click", async () => {
      saveButton.disabled = true;
      saveButton.setAttribute("aria-busy", "true");
      try {
        await importGearBoxCsvDraftToProject();
      } finally {
        saveButton.disabled = false;
        saveButton.removeAttribute("aria-busy");
      }
    });
    actions.append(importButton, checkButton, saveButton);
    panel.append(actions);
    panel.append(createTextInputField("CSV-Code", draft.csvCode, (value) => {
      draft.csvCode = value;
      evaluateGearBoxDraft(draft);
      renderGearBoxPanel();
    }, { multiline: true, placeholder: "ags;wert\n13003;8,4" }));
  }

  const preview = draft.matchPreview || evaluateGearBoxDraft(draft);
  const summary = document.createElement("p");
  summary.className = "gearbox-match-summary";
  summary.textContent = `${preview.matched} von ${preview.rowCount} Tabellenzeilen gematcht · ${preview.boundaryCount} Boundary-Features im Projekt verfügbar.`;
  panel.append(summary);
  if (preview.missing?.length) {
    const missing = document.createElement("p");
    missing.className = "structured-editor-field-help";
    missing.textContent = `Nicht getroffen: ${preview.missing.join(", ")}`;
    panel.append(missing);
  }
  ui.gearBoxWorkspace.append(panel);
}

function renderWorkspace() {
  renderProjectBrowser();
  renderLibraryBrowser();
  renderBoundaryEditor();
  renderBackgroundMapList();
  renderObjectEditor();
  renderCollectionImportEditor();
  renderGearBoxPanel();
  updateEditorModeView();
  updateMapSearchAvailability();
}

function getEditorTabForLibraryItem(item) {
  if (item?.kind === "boundary-collection") return "collections";
  if (item?.kind === "continental-map") return "background";
  return "gearbox";
}

function updateEditorModeView() {
  const activeTab = state.activeEditorTab;
  const objectMode = state.editorMode === "object" || state.editorMode === "archive-object";
  const projectMode = state.editorMode === "project";
  const subfolderMode = state.editorMode === "subfolder";
  const propertiesMode = objectMode || projectMode || subfolderMode;
  const statisticWorkspaceMode = state.editorMode === "tool" && activeTab === "gearbox" && Boolean(state.gearBoxModeAction);
  if (ui.editorBackButton) ui.editorBackButton.hidden = !(propertiesMode || statisticWorkspaceMode);
  document.querySelectorAll(".single-map-tool-section").forEach((section) => {
    section.hidden = false;
  });
  document.querySelectorAll(".collection-tool-section").forEach((section) => {
    section.hidden = false;
  });
  if (ui.mapObjectEditor) {
    const item = getActiveLibraryItem();
    const subfolderContext = getActiveSubfolderContext();
    const targetPanel = document.querySelector(`[data-editor-panel="${propertiesMode ? "properties" : activeTab}"]`);
    const canShowProjectEditor = projectMode && targetPanel;
    const canShowLayerEditor = objectMode && item && targetPanel;
    const canShowSubfolderEditor = subfolderMode && subfolderContext && targetPanel;
    const canShowObjectEditor = canShowProjectEditor || canShowLayerEditor || canShowSubfolderEditor;
    ui.mapObjectEditor.hidden = !canShowObjectEditor;
    if (canShowObjectEditor && ui.mapObjectEditor.parentElement !== targetPanel) {
      targetPanel.appendChild(ui.mapObjectEditor);
    }
  }
}

function setEditorTab(tabName, options = {}) {
  state.editorMode = options.mode || "tool";
  state.activeEditorTab = (state.editorMode === "object" || state.editorMode === "archive-object" || state.editorMode === "project" || state.editorMode === "subfolder") ? "properties" : tabName;
  if (state.editorMode === "tool") state.previousToolEditorTab = state.activeEditorTab;
  renderEditorTabs();
  document.querySelectorAll("[data-editor-tab]").forEach((tab) => {
    const statisticKey = String(tab.dataset.editorTab || "").replace(/^statistic-/, "");
    const isActive = tab.dataset.editorTab?.startsWith("statistic-")
      ? state.activeEditorTab === "gearbox" && statisticKey === (ensureGearBoxDraft().activeTab || "editor")
      : tab.dataset.editorTab === state.activeEditorTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-editor-panel]").forEach((panel) => {
    const isActive = panel.dataset.editorPanel === state.activeEditorTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
  updateEditorModeView();
}

function openLibraryItemEditor(item = getActiveLibraryItem()) {
  state.activeSubfolderRef = null;
  state.activeArchiveItem = null;
  state.previousToolEditorTab = getEditorTabForLibraryItem(item) || state.previousToolEditorTab || "gearbox";
  setEditorTab("properties", { mode: "object" });
  renderObjectEditor();
  updateEditorModeView();
}

async function openNaturalEarthArchiveItemEditor(datasetId, archiveKey) {
  if (datasetId === "admin_0_countries" && !findNaturalEarthAdmin0FeatureByArchiveKey(archiveKey)) {
    const entry = getNaturalEarthAdmin0EngineEntryByArchiveKey(archiveKey);
    if (entry) await loadNaturalEarthAdmin0EngineFeature(entry);
  } else if (datasetId === "admin_1_states_provinces" && !findNaturalEarthAdmin1FeatureByArchiveKey(archiveKey)) {
    await loadNaturalEarthAdmin1EngineIndex();
    const entry = getNaturalEarthAdmin1FeatureIndexEntry(archiveKey);
    if (entry?.country_iso3) await loadNaturalEarthAdmin1CountryChunk(entry.country_iso3);
  }
  const item = getEditableNaturalEarthArchiveItem(datasetId, archiveKey);
  if (!item) return;
  state.activeSubfolderRef = null;
  state.activeArchiveItem = item;
  state.activeEditorItemId = archiveKey;
  state.activeEditorChapterKey = state.activeEditorChapterKey || "";
  state.previousToolEditorTab = "background";
  setEditorTab("properties", { mode: "archive-object" });
  renderProjectBrowser();
  renderObjectEditor();
  updateEditorModeView();
}

function openProjectEditor(project = getActiveProject()) {
  if (!project) return;
  state.activeSubfolderRef = null;
  state.activeArchiveItem = null;
  state.activeEditorItemId = `project:${project.id}`;
  state.activeEditorChapterKey = state.activeEditorChapterKey || "";
  state.previousToolEditorTab = "background";
  setEditorTab("properties", { mode: "project" });
  renderObjectEditor();
  updateEditorModeView();
}

function openSubfolderEditor(project, folderType, subfolderId) {
  if (!project || !folderType || !subfolderId) return;
  const folder = folderType === "project-layers"
    ? { type: "project-layers", title: "Projektkarten", subfolders: getProjectSubfolderEntries(project) }
    : getLibraryFolder(project, folderType);
  const subfolder = (folder?.subfolders || []).find((candidate) => candidate.id === subfolderId);
  if (!folder || !subfolder) return;
  state.activeProjectId = project.id;
  state.activeSubfolderRef = { projectId: project.id, folderType, subfolderId };
  state.activeArchiveItem = null;
  state.activeEditorItemId = `subfolder:${project.id}:${folderType}:${subfolderId}`;
  state.activeEditorChapterKey = state.activeEditorChapterKey || "";
  state.previousToolEditorTab = "gearbox";
  setEditorTab("properties", { mode: "subfolder" });
  renderProjectBrowser();
  renderObjectEditor();
  updateEditorModeView();
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeGermanSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchNeedles(value) {
  const raw = String(value || "").trim();
  return [...new Set([
    normalizeSearchText(raw),
    normalizeGermanSearchText(raw),
  ].filter(Boolean))];
}

function getNaturalEarthSearchValues(props) {
  return [
    props.NAME_DE, props.NAME, props.ADMIN, props.NAME_LONG, props.SOVEREIGNT,
    props.FORMAL_DE, props.FORMAL_EN, props.NAME_EN, props.NAME_FR, props.NAME_ES,
    props.NAME_ALT, props.ABBREV, props.POSTAL,
    props.ISO_A2, props.ISO_A2_EH, props.ISO_A3, props.ISO_A3_EH, props.ADM0_A3,
  ].map(repairLegacyText);
}

function getNaturalEarthCountryName(feature) {
  return repairLegacyText(feature?.properties?.NAME_DE
    || feature?.properties?.NAME
    || feature?.properties?.ADMIN
    || feature?.properties?.NAME_LONG
    || "Unbenanntes Land");
}

function getNaturalEarthIso3(feature) {
  const props = feature?.properties || {};
  return props.ISO_A3_EH || props.ISO_A3 || props.ADM0_A3 || "";
}

function getNaturalEarthWikidataId(feature) {
  const props = feature?.properties || {};
  return normalizeWikidataId(props.WIKIDATAID || props.WIKIDATA || props.wikidata_id || props.wikidata || "");
}

function getNaturalEarthAdmin0EngineSearchValues(entry = {}) {
  return [
    entry.stable_id,
    entry.version_id,
    entry.title,
    entry.provider_boundary_id,
    entry.country_iso3,
    entry.country_iso2,
    entry.wikidata_id,
    ...(Array.isArray(entry.match_keys) ? entry.match_keys : []),
  ].map(repairLegacyText);
}

function searchNaturalEarthAdmin0EngineIndex(query) {
  const needles = getSearchNeedles(query);
  const index = getNaturalEarthAdmin0EngineIndex();
  if (!index?.chunks?.length || !needles.length) return [];
  return index.chunks
    .map((entry) => ({
      entry,
      score: scoreSearchValues(getNaturalEarthAdmin0EngineSearchValues(entry), needles),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || String(a.entry.title).localeCompare(String(b.entry.title), "de"))
    .slice(0, 8)
    .map(({ entry }) => ({
      id: `earthmap-engine-${entry.stable_id}`,
      name: repairLegacyText(entry.title || entry.provider_boundary_id || "Unbenanntes Land"),
      source: "Natural Earth",
      level: "ADM0 · Land",
      detail: "10m · Engine Boundary-Set-v1 · lokale Grunddaten",
      license: "Public Domain",
      iso3: entry.country_iso3 || entry.provider_boundary_id || "",
      wikidataId: entry.wikidata_id || "",
      datasetDetail: "10m",
      datasetUrl: `${EARTHMAP_ENGINE_ADMIN0_BASE}index.json`,
      importStatus: "bereit",
      stableId: entry.stable_id,
    }));
}

function searchNaturalEarthCountries(query) {
  const needles = getSearchNeedles(query);
  const engineResults = searchNaturalEarthAdmin0EngineIndex(query);
  if (engineResults.length) return engineResults;
  const dataset = getNaturalEarthCountryDataset();
  const features = dataset.features;
  if (!needles.length) return [];
  return features
    .filter((feature) => {
      const props = feature.properties || {};
      const haystack = getNaturalEarthSearchValues(props)
        .flatMap(getSearchNeedles)
        .join(" ");
      return needles.some((needle) => haystack.includes(needle));
    })
    .slice(0, 8)
    .map((feature) => ({
      id: `natural-earth-${getNaturalEarthIso3(feature) || getNaturalEarthCountryName(feature)}`,
      name: getNaturalEarthCountryName(feature),
      source: "Natural Earth",
      level: "ADM0 · Land",
      detail: `${dataset.label} · lokale Grunddaten`,
      license: "Public Domain",
      iso3: getNaturalEarthIso3(feature),
      wikidataId: getNaturalEarthWikidataId(feature),
      datasetDetail: dataset.detail,
      datasetUrl: dataset.sourceUrl,
      importStatus: "bereit",
    }));
}

function scoreSearchValues(values, needles) {
  const normalizedValues = values
    .filter(Boolean)
    .flatMap(getSearchNeedles);
  if (!normalizedValues.length || !needles.length) return 0;
  let score = 0;
  normalizedValues.forEach((value) => {
    const tokens = value.split(" ").filter(Boolean);
    needles.forEach((needle) => {
      if (!needle || !value) return;
      if (value === needle) score = Math.max(score, 100);
      else if (tokens.includes(needle)) score = Math.max(score, 86);
      else if (value.startsWith(needle)) score = Math.max(score, 72);
      // Suchregel: Kurze Kürzel wie USA, EU, UK oder UN dürfen nicht als
      // zufällige Binnenzeichenfolge in langen Wörtern gewinnen. "USA" soll
      // die Vereinigten Staaten finden, nicht "zUSAmmenarbeit". Unscharfe
      // Binnen-Treffer sind darum erst bei längeren Suchbegriffen erlaubt.
      else if (needle.length >= 4 && value.includes(needle)) score = Math.max(score, 44);
    });
  });
  return score;
}

function findBestFeatureMatch(features, getValues, query) {
  const needles = getSearchNeedles(query);
  if (!features?.length || !needles.length) return null;
  return features
    .map((feature) => ({ feature, score: scoreSearchValues(getValues(feature?.properties || {}, feature), needles) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.feature || null;
}

function findNaturalEarthCountryFeature(query) {
  return findBestFeatureMatch(
    getNaturalEarthCountryDataset().features,
    (props) => getNaturalEarthSearchValues(props),
    query,
  );
}

async function findNaturalEarthCountryFeatureAsync(query) {
  await ensureNaturalEarthSearchBaseLoaded();
  const index = getNaturalEarthAdmin0EngineIndex();
  if (index?.chunks?.length) {
    const needles = getSearchNeedles(query);
    const entry = index.chunks
      .map((candidate) => ({
        candidate,
        score: scoreSearchValues(getNaturalEarthAdmin0EngineSearchValues(candidate), needles),
      }))
      .filter((candidate) => candidate.score > 0)
      .sort((a, b) => b.score - a.score || String(a.candidate.title).localeCompare(String(b.candidate.title), "de"))[0]?.candidate || null;
    if (entry) {
      const feature = await loadNaturalEarthAdmin0EngineFeature(entry);
      if (feature) return feature;
    }
  }
  return findNaturalEarthCountryFeature(query);
}

async function getNaturalEarthCountryFeatureByIso3Async(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  await ensureNaturalEarthSearchBaseLoaded();
  const entry = getNaturalEarthAdmin0EngineEntryByIso3(normalizedIso3);
  if (entry) {
    const feature = await loadNaturalEarthAdmin0EngineFeature(entry);
    if (feature) return feature;
  }
  return getNaturalEarthCountryFeatureByIso3(normalizedIso3);
}

async function findMapSearchUnionFeature(query) {
  const union = MAP_SEARCH_UNION_ALIASES
    .map((candidate) => ({
      union: candidate,
      score: scoreSearchValues(candidate.names, getSearchNeedles(query)),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.union || null;
  if (!union) return null;
  const unionIso3 = [...new Set([
    ...union.iso3,
    ...(union.id === "european-union"
      ? MAP_SEARCH_ADMIN0_RELATION_OVERRIDES
        .filter((relation) => relation.applies_to?.eu_scope === true)
        .map((relation) => String(relation.child_iso3 || "").toUpperCase())
      : []),
  ].filter(Boolean))];
  const features = (await Promise.all(unionIso3.map(async (iso3) => {
    const feature = await getNaturalEarthCountryFeatureByIso3Async(iso3);
    const relation = MAP_SEARCH_ADMIN0_RELATION_OVERRIDES.find((candidate) => (
      candidate.applies_to?.eu_scope === true
      && String(candidate.child_iso3 || "").toUpperCase() === String(iso3 || "").toUpperCase()
    ));
    return relation ? applyMapSearchBoundaryClassification(feature, relation) : feature;
  }))).filter(Boolean);
  if (!features.length) return null;
  return {
    type: "FeatureCollection",
    properties: { name: union.names[0], id: union.id, iso3: unionIso3 },
    features,
  };
}

async function findMapSearchCountryAliasFeature(query) {
  const alias = MAP_SEARCH_COUNTRY_ALIASES
    .map((candidate) => ({
      alias: candidate,
      score: scoreSearchValues(candidate.names, getSearchNeedles(query)),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.alias || null;
  return alias ? getNaturalEarthCountryFeatureByIso3Async(alias.iso3) : null;
}

async function fetchJsonWithTimeout(url, timeoutMs = 7200) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "force-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

function beginWikidataMapSearchLoading() {
  wikidataMapSearchLoadingCount += 1;
}

function endWikidataMapSearchLoading() {
  wikidataMapSearchLoadingCount = Math.max(0, wikidataMapSearchLoadingCount - 1);
}

async function findWikidataEntityId(query) {
  const search = encodeURIComponent(String(query || "").trim());
  if (!search) return "";
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${search}&language=de&uselang=de&format=json&origin=*`;
  const data = await fetchJsonWithTimeout(url);
  const first = (data?.search || []).find((entry) => /^Q\d+$/.test(entry.id));
  return first?.id || "";
}

async function resolveWikidataMapSearchTerm(query) {
  const cacheKey = normalizeSearchText(query);
  if (!cacheKey) return null;
  if (wikidataMapSearchCache.has(cacheKey)) return wikidataMapSearchCache.get(cacheKey);

  const promise = (async () => {
    beginWikidataMapSearchLoading();
    try {
      const qid = await findWikidataEntityId(query);
      if (!qid) return null;
      // Wikidata-Regel: Für lebendige Verbände fragen wir nicht manuell
      // kuratierte Listen ab, sondern lesen Staaten über P463 (Mitglied von)
      // und mappen deren ISO-3-Code (P298) auf unsere lokalen Natural-Earth-
      // Geometrien. Wenn der Suchtreffer selbst ein Staat ist, liefert P298
      // direkt dessen Fläche.
      const sparql = `
        SELECT ?kind ?iso3 WHERE {
          { wd:${qid} wdt:P298 ?iso3. BIND("country" AS ?kind) }
          UNION
          { ?country wdt:P463 wd:${qid}; wdt:P298 ?iso3. BIND("member" AS ?kind) }
        }
      `;
      const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql)}`;
      const data = await fetchJsonWithTimeout(url, 9000);
      const bindings = data?.results?.bindings || [];
      const countryIso = bindings.find((binding) => binding.kind?.value === "country")?.iso3?.value || "";
      if (countryIso) {
        const feature = await getNaturalEarthCountryFeatureByIso3Async(countryIso);
        return feature ? { kind: "country", feature, wikidataId: qid } : null;
      }
      const iso3 = [...new Set(bindings
        .filter((binding) => binding.kind?.value === "member")
        .map((binding) => String(binding.iso3?.value || "").toUpperCase())
        .filter(Boolean))];
      const features = (await Promise.all(iso3.map(getNaturalEarthCountryFeatureByIso3Async))).filter(Boolean);
      if (!features.length) return null;
      return {
        kind: "union",
        wikidataId: qid,
        feature: {
          type: "FeatureCollection",
          properties: { name: String(query || qid), id: qid, iso3, source: "Wikidata" },
          features,
        },
      };
    } catch (error) {
      console.warn("Wikidata-Suche konnte nicht aufgelöst werden.", error);
      return null;
    } finally {
      endWikidataMapSearchLoading();
    }
  })();

  wikidataMapSearchCache.set(cacheKey, promise);
  return promise;
}

function getNaturalEarthAdmin1SearchValues(props, feature = null) {
  return [
    feature?.stable_id, feature?.version_id, feature?.id, feature?.name, feature?.wikidata_id,
    props.name_de, props.name, props.name_en, props.name_local, props.name_alt,
    props.woe_name, props.gn_name, props.gns_name, props.admin, props.geonunit,
    props.iso_3166_2, props.adm1_code, props.postal, props.code_hasc, props.wikidataid,
    ...(Array.isArray(feature?.match_tokens) ? feature.match_tokens : []),
  ].map(repairLegacyText);
}

function getNaturalEarthAdmin1Name(feature) {
  const props = feature?.properties || {};
  return repairLegacyText(props.name_de || props.name || props.name_en || props.name_local || "Unbenannte Region");
}

function getNaturalEarthAdmin1CountryIso3(feature) {
  const props = feature?.properties || {};
  return String(props.adm0_a3 || props.sov_a3 || "").toUpperCase();
}

function createEarthMapBoundaryEntry(kind, feature, meta = {}) {
  if (!feature) return null;
  const props = feature.properties || {};
  const isAdmin1 = kind === "admin1" || Boolean(props.iso_3166_2 || props.ISO3166_2 || props.adm1_code);
  const iso3 = isAdmin1 ? getNaturalEarthAdmin1CountryIso3(feature) : getNaturalEarthIso3(feature).toUpperCase();
  const stableId = String(
    feature.stable_id
    || props._ziselinBoundarySetStableId
    || props.iso_3166_2
    || props.adm1_code
    || props.ISO_A3
    || props.ADM0_A3
    || props.wikidataid
    || feature.id
    || "",
  );
  return {
    kind,
    feature,
    level: isAdmin1 ? "ADM1" : kind === "union" ? "union" : "ADM0",
    stableId,
    iso3,
    wikidataId: normalizeWikidataId(
      feature.wikidata_id
      || props.wikidataid
      || props.WIKIDATAID
      || props.WIKIDATA
      || "",
    ),
    label: repairLegacyText(
      meta.label
      || feature.name
      || props.name_de
      || props.name
      || props.NAME_DE
      || props.NAME
      || props.ADMIN
      || stableId
      || "",
    ),
    source: meta.source || props._ziselinEngineSource || "natural-earth",
  };
}

function addEarthMapBoundaryMatchKey(keys, value) {
  const normalized = normalizeSearchText(value);
  if (normalized) keys.add(normalized);
}

function getEarthMapBoundaryMatchKeys(feature, preferredPath = "") {
  const props = feature?.properties || {};
  const keys = new Set();
  const isAdmin1Feature = Boolean(props.iso_3166_2 || props.ISO3166_2 || props.adm1_code);
  [
    getValueByPath(feature, preferredPath),
    feature?.stable_id,
    feature?.version_id,
    feature?.id,
    feature?.name,
    feature?.wikidata_id,
    props._ziselinBoundarySetStableId,
    props.AGS,
    props.ags,
    props.ISO_A2,
    props.ISO_A3,
    props.ADM0_A3,
    props.iso_3166_2,
    props.ISO3166_2,
    props.adm1_code,
    props.wikidataid,
    props.WIKIDATAID,
    props.name,
    props.name_de,
    props.name_en,
    props.NAME,
    props.NAME_DE,
    props.NAME_EN,
    props.ADMIN,
  ].forEach((value) => addEarthMapBoundaryMatchKey(keys, value));
  // Architekturregel: Parent-Schlüssel sind Kontext, keine Identität der
  // Einzelfläche. Sonst matcht z.B. jedes deutsche Bundesland über "DEU" auf
  // dieselbe Fläche und Statistik/Suche/Browser laufen auseinander.
  if (!isAdmin1Feature) {
    [props.adm0_a3, props.admin, props.geonunit, props.SOVEREIGNT].forEach((value) => addEarthMapBoundaryMatchKey(keys, value));
  }
  if (Array.isArray(feature?.match_tokens)) {
    feature.match_tokens.forEach((value) => addEarthMapBoundaryMatchKey(keys, value));
  }
  return keys;
}

function getMapSearchFeatureIso3(entry) {
  if (!entry) return "";
  if (entry.kind === "admin1") return getNaturalEarthAdmin1CountryIso3(entry.feature);
  if (entry.kind === "country") return getNaturalEarthIso3(entry.feature).toUpperCase();
  return "";
}

function getMapSearchAdmin0RelationOverridesForParent(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  if (!normalizedIso) return [];
  return MAP_SEARCH_ADMIN0_RELATION_OVERRIDES.filter((entry) => (
    String(entry.parent_iso3 || "").toUpperCase() === normalizedIso
    && entry.applies_to?.search_parent_context !== false
  ));
}

function getMapSearchAssociatedIso3s(iso3) {
  const normalizedIso = String(iso3 || "").toUpperCase();
  return [...new Set([
    normalizedIso,
    ...getMapSearchAdmin0RelationOverridesForParent(normalizedIso)
      .filter((entry) => entry.applies_to?.search_parent_display !== false)
      .map((entry) => String(entry.child_iso3 || "").toUpperCase()),
  ].filter(Boolean))];
}

function applyMapSearchBoundaryClassification(feature, relation = null) {
  if (!feature || !relation?.classification) return feature;
  const classification = relation.classification;
  const cloned = {
    ...feature,
    properties: {
      ...(feature.properties || {}),
      ziselin_type: classification.type || feature.properties?.ziselin_type || "",
      ziselin_rank: classification.rank ?? feature.properties?.ziselin_rank ?? "",
      ziselin_sovereignty_status: classification.sovereignty_status || feature.properties?.ziselin_sovereignty_status || "",
      ziselin_constitutional_status: classification.constitutional_status || feature.properties?.ziselin_constitutional_status || "",
      ziselin_relation_to_parent: classification.relation_to_parent || feature.properties?.ziselin_relation_to_parent || "",
      ziselin_parent_id: classification.parent_id || relation.parent_iso3 || feature.properties?.ziselin_parent_id || "",
      ziselin_geometry_scope: classification.geometry_scope || feature.properties?.ziselin_geometry_scope || "",
    },
    classification: {
      ...(feature.classification || {}),
      ...classification,
    },
    relation_to_parent: classification.relation_to_parent || feature.relation_to_parent || "",
    parent_id: classification.parent_id || relation.parent_iso3 || feature.parent_id || "",
  };
  return cloned;
}

async function createMapSearchCountryBoundaryEntry(feature, meta = {}) {
  const entry = createEarthMapBoundaryEntry("country", feature, meta);
  if (!entry) return null;
  const iso = getNaturalEarthIso3(feature).toUpperCase();
  const relations = getMapSearchAdmin0RelationOverridesForParent(iso)
    .filter((relation) => relation.applies_to?.search_parent_display !== false);
  if (relations.length) {
    entry.associatedFeatures = (await Promise.all(relations.map(async (relation) => {
      const associatedFeature = await getNaturalEarthCountryFeatureByIso3Async(relation.child_iso3);
      return applyMapSearchBoundaryClassification(associatedFeature, relation);
    }))).filter(Boolean);
  }
  return entry;
}

function getMapSearchEntryRenderFeatures(entry) {
  if (!entry) return [];
  return [
    entry.feature,
    ...(Array.isArray(entry.associatedFeatures) ? entry.associatedFeatures : []),
  ].filter(Boolean);
}

function getMapSearchContextIso3Set(entry) {
  if (!entry) return new Set();
  if (entry.kind === "union") return new Set((entry.feature?.properties?.iso3 || []).map((iso) => String(iso).toUpperCase()));
  const iso = getMapSearchFeatureIso3(entry);
  return new Set(getMapSearchAssociatedIso3s(iso));
}

function getMapSearchAdmin1Id(feature) {
  const props = feature?.properties || {};
  return String(props.adm1_code || props.iso_3166_2 || props.wikidataid || "").toUpperCase();
}

function isMapSearchFocusInsideContext(focus, contextEntries) {
  if (!contextEntries.length) return true;
  return contextEntries.some((context) => {
    if (context.kind === "union") {
      const focusIso = getMapSearchFeatureIso3(focus);
      return Boolean(focusIso) && getMapSearchContextIso3Set(context).has(focusIso);
    }
    if (context.kind === "country") {
      const focusIso = getMapSearchFeatureIso3(focus);
      return Boolean(focusIso) && getMapSearchContextIso3Set(context).has(focusIso);
    }
    if (context.kind === "admin1") {
      return focus.kind === "admin1" && getMapSearchAdmin1Id(focus.feature) === getMapSearchAdmin1Id(context.feature);
    }
    return false;
  });
}

async function findNaturalEarthAdmin1Feature(query, countryFeature = null) {
  const countryIso = getNaturalEarthIso3(countryFeature).toUpperCase();
  if (countryIso) {
    const dataset = await loadNaturalEarthAdmin1CountryChunk(countryIso);
    const features = dataset?.features || [];
    if (!features.length) return null;
    return findBestFeatureMatch(
      features,
      (props, feature) => getNaturalEarthAdmin1SearchValues(props, feature),
      query,
    );
  }

  const metadataFeatures = getNaturalEarthAdmin1MetadataFeatures();
  if (!metadataFeatures.length) await loadNaturalEarthAdmin1Dataset();
  const metadataMatch = findBestFeatureMatch(
    getNaturalEarthAdmin1MetadataFeatures(),
    (props, feature) => getNaturalEarthAdmin1SearchValues(props, feature),
    query,
  );
  const inferredIso = getNaturalEarthAdmin1CountryIso3(metadataMatch);
  if (!inferredIso) return null;
  const dataset = await loadNaturalEarthAdmin1CountryChunk(inferredIso);
  const scopedFeatures = dataset?.features || [];
  if (!scopedFeatures.length) return null;
  return findBestFeatureMatch(
    scopedFeatures,
    (props, feature) => getNaturalEarthAdmin1SearchValues(props, feature),
    query,
  );
}

async function resolveEarthMapBoundaryTerm(query, options = {}) {
  const trimmed = String(query || "").trim();
  if (!trimmed) return null;
  await ensureNaturalEarthSearchBaseLoaded();
  const contextEntries = Array.isArray(options.contextEntries) ? options.contextEntries : [];
  if (options.focus && contextEntries.length) {
    const countryAliasFeature = await findMapSearchCountryAliasFeature(trimmed);
    if (countryAliasFeature) return createMapSearchCountryBoundaryEntry(countryAliasFeature);
    const countryFeature = await findNaturalEarthCountryFeatureAsync(trimmed);
    if (countryFeature) return createMapSearchCountryBoundaryEntry(countryFeature);
    // Gemeinsame Resolver-Regel: Die rechte Seite einer Suchrelation ist
    // Kontext. "Montana; NAFTA" sucht daher zuerst Admin-1 in allen Staaten
    // des Bündnisses; "Bayern; Deutschland" sucht im Deutschland-Chunk.
    for (const context of contextEntries) {
      if (context.kind === "country") {
        const admin1Feature = await findNaturalEarthAdmin1Feature(trimmed, context.feature);
        if (admin1Feature) return createEarthMapBoundaryEntry("admin1", admin1Feature);
      }
      if (context.kind === "union") {
        const iso3s = Array.isArray(context.feature?.properties?.iso3) ? context.feature.properties.iso3 : [];
        for (const iso3 of iso3s) {
          const countryFeature = await getNaturalEarthCountryFeatureByIso3Async(iso3);
          if (!countryFeature) continue;
          const admin1Feature = await findNaturalEarthAdmin1Feature(trimmed, countryFeature);
          if (admin1Feature) return createEarthMapBoundaryEntry("admin1", admin1Feature);
        }
      }
    }
  }
  if (options.includeUnions !== false) {
    const unionFeature = await findMapSearchUnionFeature(trimmed);
    if (unionFeature) return createEarthMapBoundaryEntry("union", unionFeature, { label: unionFeature.properties?.name || trimmed });
  }
  const countryAliasFeature = await findMapSearchCountryAliasFeature(trimmed);
  if (countryAliasFeature) return createMapSearchCountryBoundaryEntry(countryAliasFeature);
  const countryFeature = await findNaturalEarthCountryFeatureAsync(trimmed);
  if (countryFeature) return createMapSearchCountryBoundaryEntry(countryFeature);
  const provinceFeature = await findNaturalEarthAdmin1Feature(trimmed);
  if (provinceFeature) return createEarthMapBoundaryEntry("admin1", provinceFeature);
  const wikidataFeature = await resolveWikidataMapSearchTerm(trimmed);
  if (wikidataFeature) return createEarthMapBoundaryEntry(wikidataFeature.kind, wikidataFeature.feature, { label: trimmed, source: "wikidata" });
  return null;
}

async function resolveMapSearchTerm(query) {
  return resolveEarthMapBoundaryTerm(query);
}

async function resolveMapSearchFocusTerm(query, contextEntries = []) {
  const trimmed = String(query || "").trim();
  if (!trimmed) return null;
  return resolveEarthMapBoundaryTerm(trimmed, { focus: true, contextEntries });
}

async function resolveMapSearchTermList(rawList, options = {}) {
  const terms = String(rawList || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const entries = await Promise.all(terms.map((term) => (
    options.focus
      ? resolveMapSearchFocusTerm(term, options.contextEntries || [])
      : resolveMapSearchTerm(term)
  )));
  return entries.filter(Boolean);
}

function getMapSearchOptionLabelForAdmin1Feature(feature) {
  const country = getNaturalEarthCountryFeatureByIso3(getNaturalEarthAdmin1CountryIso3(feature));
  const countryName = country ? getNaturalEarthCountryName(country) : repairLegacyText(feature?.properties?.admin || "");
  return [getNaturalEarthAdmin1Name(feature), countryName].filter(Boolean).join("; ");
}

function getMapSearchOptionCache() {
  if (mapSearchOptionCache) return mapSearchOptionCache;
  if (!ui.mapSearchOptions) return;
  const engineIndex = getNaturalEarthAdmin0EngineIndex();
  const countryOptions = engineIndex?.chunks?.length
    ? engineIndex.chunks
      .map((entry) => repairLegacyText(entry.title || entry.provider_boundary_id || ""))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "de"))
    : getNaturalEarthCountryDataset().features
      .map((feature) => getNaturalEarthCountryName(feature))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "de"));
  const admin1Options = getNaturalEarthAdmin1MetadataFeatures().flatMap((feature) => {
    const solo = getNaturalEarthAdmin1Name(feature);
    const scoped = getMapSearchOptionLabelForAdmin1Feature(feature);
    return [solo, scoped].filter(Boolean);
  });
  const unionOptions = MAP_SEARCH_UNION_ALIASES.flatMap((union) => union.names.slice(0, 3));
  const countryAliasOptions = MAP_SEARCH_COUNTRY_ALIASES.flatMap((alias) => alias.names.slice(0, 3));
  mapSearchOptionCache = [...new Set([...unionOptions, ...countryAliasOptions, ...countryOptions, ...admin1Options])]
    .map((value) => ({ value, needles: getSearchNeedles(value) }))
    .sort((a, b) => a.value.localeCompare(b.value, "de"));
  return mapSearchOptionCache;
}

function populateMapSearchOptions(query = "") {
  if (!ui.mapSearchOptions) return;
  const needles = getSearchNeedles(query);
  if (!needles.length) {
    ui.mapSearchOptions.replaceChildren();
    return;
  }
  if (!getNaturalEarthAdmin0EngineIndex()?.chunks?.length && !earthMapLazyAssetPromises.has("earthmap-engine-natural-earth-admin0-index")) {
    void loadNaturalEarthAdmin0EngineIndex().then(() => {
      mapSearchOptionCache = null;
      populateMapSearchOptions(ui.mapSearchInput?.value || "");
    });
  }
  if (!getNaturalEarthAdmin1EngineIndex()?.feature_index?.length && !earthMapLazyAssetPromises.has("earthmap-engine-natural-earth-admin1-index")) {
    void loadNaturalEarthAdmin1Dataset().then(() => {
      mapSearchOptionCache = null;
      populateMapSearchOptions(ui.mapSearchInput?.value || "");
    });
  }
  const matches = getMapSearchOptionCache()
    .filter((option) => needles.some((needle) => option.needles.some((value) => value.startsWith(needle) || value.includes(needle))))
    .slice(0, 28);
  ui.mapSearchOptions.replaceChildren(...matches.map(({ value }) => {
    const option = document.createElement("option");
    option.value = value;
    return option;
  }));
}

function getMapSearchSelectedAreaColor() {
  return isEarthMapDarkMode() ? DARK_MAP_SELECTED_COLOR : LIGHT_MAP_SELECTED_COLOR;
}

function getMapSearchSelectedOutlineColor() {
  return isEarthMapDarkMode() ? DARK_MAP_SELECTED_COLOR : LIGHT_MAP_SELECTED_OUTLINE_COLOR;
}

function getMapSearchSpecialHighlightColor() {
  return isEarthMapDarkMode() ? DARK_MAP_SPECIAL_HIGHLIGHT_COLOR : LIGHT_MAP_SPECIAL_HIGHLIGHT_COLOR;
}

function getMapSearchSpecialOutlineColor() {
  return isEarthMapDarkMode() ? DARK_MAP_SPECIAL_HIGHLIGHT_COLOR : LIGHT_MAP_SPECIAL_OUTLINE_COLOR;
}

function hasSavableMapSearchHighlight() {
  const highlight = state.mapSearchHighlight;
  const query = String(ui.mapSearchInput?.value || highlight?.query || "").trim();
  if (!query || isStatisticalMapActive()) return false;
  return Boolean(highlight && (
    (Array.isArray(highlight.selectedFeatures) && highlight.selectedFeatures.length)
    || (Array.isArray(highlight.focusFeatures) && highlight.focusFeatures.length)
  ));
}

function syncSaveSearchLayerButton() {
  if (!ui.saveSearchLayerButton) return;
  const visible = hasSavableMapSearchHighlight();
  ui.saveSearchLayerButton.hidden = !visible;
  ui.saveSearchLayerButton.classList.toggle("is-hidden", !visible);
  ui.saveSearchLayerButton.setAttribute("aria-hidden", visible ? "false" : "true");
  ui.saveSearchLayerButton.tabIndex = visible ? 0 : -1;
}

function clearMapSearchHighlight() {
  state.mapSearchHighlight = null;
  ui.mapSearchInput?.classList.remove("has-search-error");
  ui.mapSearchInput?.removeAttribute("title");
  syncSaveSearchLayerButton();
  syncMapLibreSearchHighlight();
  void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
  scheduleGlobeRender();
}

function updateMapSearchAvailability() {
  if (!ui.mapSearchInput) return;
  const blocked = isStatisticalMapActive();
  ui.mapSearchInput.disabled = blocked;
  ui.mapSearchInput.placeholder = blocked
    ? "Suche während Statistikdarstellung deaktiviert"
    : "Staat, Region, Bündnis suchen";
  ui.mapSearchInput.title = blocked
    ? "Die Suche ist blockiert, solange ein statistischer Datenlayer dargestellt wird."
    : "";
  ui.mapSearchInput.classList.toggle("is-search-blocked", blocked);
  if (blocked) {
    state.mapSearchHighlight = null;
    ui.mapSearchOptions?.replaceChildren();
    syncMapLibreSearchHighlight();
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
  }
  syncSaveSearchLayerButton();
}

function ensureActiveProjectForSearchSave() {
  let project = getActiveProject();
  if (project) return project;
  const title = window.prompt("Bezeichnung des neuen EarthMap-Projekts", "Suchergebnisse");
  if (title == null) return null;
  const normalizedTitle = repairLegacyText(title).trim();
  if (!normalizedTitle) return null;
  project = normalizeProject(createEarthMapProject(normalizedTitle));
  state.projects.push(project);
  state.activeProjectId = project.id;
  return project;
}

function showEarthMapFeedback(message, { tone = "success", timeout = 3200 } = {}) {
  if (!message) return;
  const existing = document.querySelector(".earthmap-feedback-toast");
  existing?.remove();
  const toast = document.createElement("div");
  toast.className = `earthmap-feedback-toast is-${tone}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;
  document.body.append(toast);
  window.setTimeout(() => {
    toast.classList.add("is-hiding");
    window.setTimeout(() => toast.remove(), 220);
  }, timeout);
}

function getSearchLayerBoundaryKey(feature, index) {
  return getReadableBoundaryKey(feature, `search-boundary-${index + 1}`);
}

function getSearchLayerBoundaryLabel(feature, index) {
  const props = feature?.properties || {};
  const isAdmin1 = isNaturalEarthAdmin1Feature(feature);
  return repairLegacyText(
    isAdmin1 ? getNaturalEarthAdmin1Name(feature) : ""
    || getNaturalEarthCountryName(feature)
    || feature?.name
    || props.name_de
    || props.name
    || props.NAME_DE
    || props.NAME
    || `Region ${index + 1}`,
  );
}

function getSearchLayerBoundaryLevel(feature) {
  if (isNaturalEarthAdmin1Feature(feature)) return "ADM1";
  const props = feature?.properties || {};
  if (Array.isArray(props.iso3)) return "union";
  return "ADM0";
}

function getReadableBoundaryKey(feature, fallback = "") {
  const props = feature?.properties || {};
  const isAdmin1 = isNaturalEarthAdmin1Feature(feature);
  if (isAdmin1) {
    return String(
      props.iso_3166_2
      || props.ISO3166_2
      || props.adm1_code
      || feature?.wikidata_id
      || props.wikidataid
      || props.WIKIDATAID
      || feature?.stable_id
      || feature?.id
      || fallback
      || "",
    );
  }
  const iso3 = getNaturalEarthIso3(feature).toUpperCase();
  return String(
    iso3
    || props.ISO_A3
    || props.ADM0_A3
    || feature?.wikidata_id
    || props.wikidataid
    || props.WIKIDATAID
    || feature?.stable_id
    || feature?.id
    || fallback
    || "",
  );
}

function getBoundaryTechnicalDetails(rowData = {}, layer = null, rowIndex = -1) {
  const boundaryKey = getGearBoxRowValue(rowData, "boundary_key");
  const match = Array.isArray(layer?.valueMatches)
    ? (layer.valueMatches[rowIndex]
      || layer.valueMatches.find((candidate) => normalizeSearchText(candidate?.boundaryKey) === normalizeSearchText(boundaryKey))
      || null)
    : null;
  let feature = match?.feature || null;
  if (!feature && boundaryKey) {
    const boundaryIndex = createGearBoxBoundaryIndex(getBoundaryFeatureCandidatesForGearBox(), "stable_id");
    feature = findGearBoxBoundaryEntryForRow(rowData, boundaryIndex, "boundary_key", { requireDrawable: false })?.feature || null;
  }
  const props = feature?.properties || {};
  const stableId = match?.stable_id || getGearBoxRowValue(rowData, "stable_id") || feature?.stable_id || props._ziselinBoundarySetStableId || "";
  const featureId = match?.featureId || getGearBoxRowValue(rowData, "feature_id") || feature?.id || "";
  const isAdmin1 = feature ? isNaturalEarthAdmin1Feature(feature) : String(getGearBoxRowValue(rowData, "level")).toUpperCase() === "ADM1";
  const iso3 = isAdmin1
    ? getNaturalEarthAdmin1CountryIso3(feature)
    : getNaturalEarthIso3(feature).toUpperCase();
  return [
    ["Sichtbarer Boundary-Key", boundaryKey],
    ["Bezeichnung", getGearBoxRowValue(rowData, "boundary_label") || feature?.name || props.name_de || props.NAME_DE || props.name || props.NAME],
    ["Ebene", getGearBoxRowValue(rowData, "level") || (isAdmin1 ? "ADM1" : "ADM0")],
    ["Stable-ID", stableId],
    ["Feature-ID", featureId],
    ["Version-ID", getGearBoxRowValue(rowData, "version_id") || feature?.version_id || props.version_id || props._ziselinVersionId],
    ["Provider-ID", getGearBoxRowValue(rowData, "provider_boundary_id") || props.provider_boundary_id || props.iso_3166_2 || props.ISO3166_2 || props.adm1_code || props.ISO_A3 || props.ADM0_A3],
    ["ISO-3", getGearBoxRowValue(rowData, "iso3") || iso3],
    ["ISO-3166-2", props.iso_3166_2 || props.ISO3166_2 || getGearBoxRowValue(rowData, "iso_3166_2")],
    ["ADM1-Code", getGearBoxRowValue(rowData, "adm1_code") || props.adm1_code],
    ["Wikidata-ID", feature?.wikidata_id || props.wikidataid || props.WIKIDATAID || getGearBoxRowValue(rowData, "wikidata_id")],
    ["Quelle", props._ziselinEngineSource || feature?.source || getGearBoxRowValue(rowData, "source_label") || "Natural Earth"],
  ].map(([label, value]) => [label, repairLegacyText(value == null ? "" : String(value)).trim() || "—"]);
}

function openBoundaryKeyDetailsDialog(rowData = {}, layer = null, rowIndex = -1) {
  const details = getBoundaryTechnicalDetails(rowData, layer, rowIndex);
  const dialog = document.createElement("dialog");
  dialog.className = "boundary-key-details-dialog";

  const title = document.createElement("h3");
  title.textContent = "Boundary-Key: technische Details";
  const intro = document.createElement("p");
  intro.textContent = "Der sichtbare Schlüssel bleibt lesbar. Diese Übersicht zeigt die technischen Referenzen, über die EarthMap die Kartenfläche eindeutig zuordnet.";

  const list = document.createElement("dl");
  list.className = "boundary-key-details-list";
  details.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    if (label === "Wikidata-ID" && /^Q\d+$/i.test(value)) {
      const link = document.createElement("a");
      link.href = `https://www.wikidata.org/wiki/${value.toUpperCase()}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = value.toUpperCase();
      dd.append(link);
    } else {
      dd.textContent = value;
    }
    list.append(dt, dd);
  });

  const close = document.createElement("button");
  close.type = "button";
  close.className = "secondary-button";
  close.textContent = "Schließen";
  close.addEventListener("click", () => dialog.close());

  dialog.append(title, intro, list, close);
  dialog.addEventListener("close", () => dialog.remove());
  document.body.append(dialog);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.alert(details.map(([label, value]) => `${label}: ${value}`).join("\n"));
}

function getSourceTechnicalDetails(rowData = {}, layer = null, rowIndex = -1) {
  const match = Array.isArray(layer?.valueMatches) ? layer.valueMatches[rowIndex] : null;
  const source = match?.source || {};
  return [
    ["Quellenlabel", getGearBoxRowValue(rowData, "source_label") || source.label],
    ["URL", getGearBoxRowValue(rowData, "source_url") || source.url],
    ["Archiv-URL", getGearBoxRowValue(rowData, "archive_url") || source.archive_url],
    ["Abgerufen am", getGearBoxRowValue(rowData, "source_accessed_at") || getGearBoxRowValue(rowData, "accessed_date") || source.accessed_at],
    ["Quellenhinweis", getGearBoxRowValue(rowData, "source_note") || source.note],
    ["Boundary-Key", getGearBoxRowValue(rowData, "boundary_key") || match?.boundaryKey],
    ["Datensatz", layer?.title || layer?.name],
  ].map(([label, value]) => [label, repairLegacyText(value == null ? "" : String(value)).trim() || "—"]);
}

function openSourceDetailsDialog(rowData = {}, layer = null, rowIndex = -1) {
  const details = getSourceTechnicalDetails(rowData, layer, rowIndex);
  const dialog = document.createElement("dialog");
  dialog.className = "boundary-key-details-dialog source-details-dialog";

  const title = document.createElement("h3");
  title.textContent = "Quelle: Details";
  const intro = document.createElement("p");
  intro.textContent = "Die Wertetabelle zeigt nur das Quellenlabel. Hier stehen die vollständigen Quelleninformationen, die im Datensatz erhalten bleiben.";

  const list = document.createElement("dl");
  list.className = "boundary-key-details-list source-details-list";
  details.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    if (/^https?:\/\//i.test(value)) {
      const link = document.createElement("a");
      link.href = value;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = value;
      dd.append(link);
    } else {
      dd.textContent = value;
    }
    list.append(dt, dd);
  });

  const close = document.createElement("button");
  close.type = "button";
  close.className = "secondary-button";
  close.textContent = "Schließen";
  close.addEventListener("click", () => dialog.close());

  dialog.append(title, intro, list, close);
  dialog.addEventListener("close", () => dialog.remove());
  document.body.append(dialog);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.alert(details.map(([label, value]) => `${label}: ${value}`).join("\n"));
}

function createBoundaryKeyInputControl(input, rowData, layer, rowIndex, fieldName = "boundary_key") {
  const wrap = document.createElement("div");
  wrap.className = "gearbox-boundary-key-control";
  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "boundary-key-details-button";
  detailsButton.title = "Boundary-Key-Details anzeigen";
  detailsButton.setAttribute("aria-label", "Boundary-Key-Details anzeigen");
  const icon = document.createElement("span");
  icon.className = "boundary-key-details-icon";
  icon.setAttribute("aria-hidden", "true");
  detailsButton.append(icon);
  detailsButton.addEventListener("click", () => {
    rowData[fieldName] = input.value.trim();
    openBoundaryKeyDetailsDialog(rowData, layer, rowIndex);
  });
  wrap.append(input, detailsButton);
  return wrap;
}

function createSourceInputControl(input, rowData, layer, rowIndex, fieldName = "source_label") {
  const wrap = document.createElement("div");
  wrap.className = "gearbox-source-control";
  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "boundary-key-details-button source-details-button";
  detailsButton.title = "Quell-Details anzeigen";
  detailsButton.setAttribute("aria-label", "Quell-Details anzeigen");
  const icon = document.createElement("span");
  icon.className = "boundary-key-details-icon";
  icon.setAttribute("aria-hidden", "true");
  detailsButton.append(icon);
  detailsButton.addEventListener("click", () => {
    rowData[fieldName] = input.value.trim();
    openSourceDetailsDialog(rowData, layer, rowIndex);
  });
  wrap.append(input, detailsButton);
  return wrap;
}

function getSearchLayerBoundaryMetadata(feature, fallbackIndex = 0) {
  const props = feature?.properties || {};
  const isAdmin1 = isNaturalEarthAdmin1Feature(feature);
  const iso3 = isAdmin1
    ? getNaturalEarthAdmin1CountryIso3(feature)
    : (Array.isArray(props.iso3) ? props.iso3.join(", ") : getNaturalEarthIso3(feature).toUpperCase());
  const iso31662 = props.iso_3166_2 || props.ISO3166_2 || "";
  const providerBoundaryId = props.provider_boundary_id
    || iso31662
    || props.adm1_code
    || props.ISO_A3
    || props.ADM0_A3
    || getReadableBoundaryKey(feature, `search-boundary-${fallbackIndex + 1}`);
  return {
    stable_id: feature?.stable_id || props._ziselinBoundarySetStableId || providerBoundaryId || "",
    feature_id: feature?.id || "",
    version_id: feature?.version_id || props.version_id || props._ziselinVersionId || "",
    provider_boundary_id: providerBoundaryId || "",
    iso3: iso3 || "",
    iso_3166_2: iso31662 || "",
    adm1_code: props.adm1_code || "",
    wikidata_id: normalizeWikidataId(feature?.wikidata_id || props.wikidataid || props.WIKIDATAID || props.wikidata_id || ""),
  };
}

function enrichSearchResultRowFromFeature(row, feature, index = 0) {
  if (!row || !feature) return false;
  const metadata = getSearchLayerBoundaryMetadata(feature, index);
  let changed = false;
  Object.entries(metadata).forEach(([key, value]) => {
    if (!row[key] && value) {
      row[key] = value;
      changed = true;
    }
  });
  if (!row.boundary_key) {
    row.boundary_key = getSearchLayerBoundaryKey(feature, index);
    changed = true;
  }
  if (!row.boundary_label) {
    row.boundary_label = getSearchLayerBoundaryLabel(feature, index);
    changed = true;
  }
  if (!row.level) {
    row.level = getSearchLayerBoundaryLevel(feature);
    changed = true;
  }
  return changed;
}

function ensureSearchResultTechnicalHeaders(layer) {
  if (!layer?.table) return;
  const technicalHeaders = ["stable_id", "feature_id", "version_id", "provider_boundary_id", "iso3", "iso_3166_2", "adm1_code", "wikidata_id"];
  layer.table.headers = Array.isArray(layer.table.headers) ? layer.table.headers : [];
  technicalHeaders.forEach((header) => {
    if (!layer.table.headers.includes(header)) layer.table.headers.push(header);
  });
}

function createSearchResultDataLayerFromHighlight(highlight) {
  const selectedFeatures = Array.isArray(highlight?.selectedFeatures) ? highlight.selectedFeatures : [];
  const focusFeatures = Array.isArray(highlight?.focusFeatures) ? highlight.focusFeatures : [];
  const expandFeatureEntries = (feature, role, fill, outline) => {
    const features = feature?.type === "FeatureCollection" ? feature.features || [] : [feature].filter(Boolean);
    return features
      .filter((candidate) => candidate?.geometry)
      .map((candidate) => ({ feature: candidate, role, fill, outline }));
  };
  const entries = [
    ...focusFeatures.flatMap((feature) => expandFeatureEntries(feature, "focus", getMapSearchSpecialHighlightColor(), getMapSearchSpecialOutlineColor())),
    ...selectedFeatures.flatMap((feature, index) => expandFeatureEntries(
      feature,
      index === 0 ? "context" : "context_hatched",
      getMapSearchSelectedAreaColor(),
      getMapSearchSelectedOutlineColor(),
    )),
  ];
  if (!entries.length) return null;

  const headers = [
    "boundary_key",
    "boundary_label",
    "role",
    "level",
    "value",
    "unit",
    "source_label",
    "source_url",
    "source_accessed_at",
    "source_note",
    "stable_id",
    "feature_id",
    "version_id",
    "provider_boundary_id",
    "iso3",
    "iso_3166_2",
    "adm1_code",
    "wikidata_id",
  ];
  const rows = entries.map((entry, index) => ({
    boundary_key: getSearchLayerBoundaryKey(entry.feature, index),
    boundary_label: getSearchLayerBoundaryLabel(entry.feature, index),
    role: entry.role,
    level: getSearchLayerBoundaryLevel(entry.feature),
    value: "",
    unit: "",
    source_label: entry.feature?.properties?._earthMapSearchSource || "EarthMap-Suche",
    source_url: "",
    source_accessed_at: new Date().toISOString().slice(0, 10),
    source_note: repairLegacyText(highlight?.query || ""),
    ...getSearchLayerBoundaryMetadata(entry.feature, index),
  }));
  const valueMatches = entries.map((entry, index) => ({
    boundaryKey: rows[index].boundary_key,
    featureId: rows[index].feature_id || entry.feature.id || entry.feature.stable_id || rows[index].boundary_key,
    stable_id: rows[index].stable_id || entry.feature.stable_id || entry.feature.properties?._ziselinBoundarySetStableId || rows[index].boundary_key,
    value: "",
    numericValue: null,
    fill: normalizeColorValue(entry.fill, getMapSearchSelectedAreaColor()) || getMapSearchSelectedAreaColor(),
    outline: normalizeColorValue(entry.outline, getMapSearchSelectedOutlineColor()) || getMapSearchSelectedOutlineColor(),
    role: entry.role,
    source: {
      label: rows[index].source_label,
      url: "",
      accessed_at: rows[index].source_accessed_at,
      note: rows[index].source_note,
    },
    feature: entry.feature,
  }));
  const titleBase = repairLegacyText(highlight?.query || "Suchergebnis");
  return normalizeDataLayer({
    id: `search-layer-${slugifyBoundaryId(titleBase, "suchergebnis")}-${Date.now()}`,
    kind: "gearbox-data-layer",
    origin: "search",
    title: titleBase,
    importedAt: new Date().toISOString(),
    gearBox: {
      schema: EARTHMAP_GEARBOX_SCHEMA,
      title: titleBase,
      target_boundary_set: {
        version_id: getActiveBoundarySet(getActiveProject())?.version_id || "",
      },
      input: { format: "search", has_header: true, delimiter: ";", encoding: "utf-8" },
      join: { table_key: "boundary_key", boundary_key: "stable_id", normalization: { trim: true, casefold: true, remove_diacritics: true } },
      values: [{ id: "value", table_key: "value", label: "Wert", type: "number", unit: "" }],
      style: {
        value_id: "value",
        mode: "manual",
        search_result_mode: true,
        classes: [
          { from: null, to: null, fill: getMapSearchSelectedAreaColor() },
        ],
      },
      source: { label: "EarthMap-Suche", url: "", accessed_at: new Date().toISOString().slice(0, 10) },
    },
    table: {
      format: "csv",
      delimiter: ";",
      hasHeader: true,
      headers,
      rows,
      raw: serializeDelimitedRows(headers, rows, ";"),
    },
    valueMatches,
    matchPreview: {
      headers,
      rowCount: rows.length,
      boundaryCount: rows.length,
      matched: valueMatches.length,
      missing: [],
    },
  });
}

function rebuildSearchResultDataLayerMatches(layer) {
  if (!layer?.table) return layer;
  const rows = Array.isArray(layer.table.rows) ? layer.table.rows : [];
  ensureSearchResultTechnicalHeaders(layer);
  let rowsEnriched = false;
  const boundaryIndex = createGearBoxBoundaryIndex(getBoundaryFeatureCandidatesForGearBox(), "stable_id");
  layer.valueMatches = rows.flatMap((row, index) => {
    const entry = findGearBoxBoundaryEntryForRow(row, boundaryIndex, "boundary_key", { requireDrawable: true });
    if (!entry) return [];
    rowsEnriched = enrichSearchResultRowFromFeature(row, entry.feature, index) || rowsEnriched;
    const role = row.role || "context";
    const isFocus = role === "focus";
    const fill = isFocus ? getMapSearchSpecialHighlightColor() : getMapSearchSelectedAreaColor();
    const outline = isFocus ? getMapSearchSpecialOutlineColor() : getMapSearchSelectedOutlineColor();
    return [{
      boundaryKey: row.boundary_key || "",
      featureId: entry.feature.id || entry.feature.stable_id || row.boundary_key || `search-${index}`,
      stable_id: entry.feature.stable_id || entry.feature.properties?._ziselinBoundarySetStableId || row.boundary_key || "",
      value: row.value || "",
      numericValue: parseGearBoxNumber(row.value),
      fill,
      outline,
      role,
      source: {
        label: row.source_label || "EarthMap-Suche",
        url: row.source_url || "",
        accessed_at: row.source_accessed_at || "",
        note: row.source_note || "",
      },
      feature: entry.feature,
    }];
  });
  layer.matchPreview = {
    ...(layer.matchPreview || {}),
    headers: layer.table.headers || [],
    rowCount: rows.length,
    matched: layer.valueMatches.length,
    missing: rows
      .filter((row) => !layer.valueMatches.some((match) => match.boundaryKey === row.boundary_key))
      .slice(0, 12)
      .map((row) => row.boundary_key || row.boundary_label || "—"),
  };
  if (rowsEnriched) {
    layer.table.raw = serializeDelimitedRows(layer.table.headers || [], rows, layer.table.delimiter || ";");
  }
  return layer;
}

function getSearchResultRowIdentifierCandidates(row) {
  const rawValues = [
    getGearBoxRowValue(row, "boundary_key"),
    getGearBoxRowValue(row, "stable_id"),
    getGearBoxRowValue(row, "feature_id"),
    getGearBoxRowValue(row, "version_id"),
    getGearBoxRowValue(row, "provider_boundary_id"),
    getGearBoxRowValue(row, "iso3"),
    getGearBoxRowValue(row, "iso_3166_2"),
    getGearBoxRowValue(row, "adm1_code"),
    getGearBoxRowValue(row, "wikidata_id"),
    getGearBoxRowValue(row, "boundary_label"),
  ];
  return [...new Set(rawValues
    .flatMap((value) => String(value || "").split(/[,\s]+/))
    .map((value) => repairLegacyText(value).trim())
    .filter(Boolean))];
}

function getSearchResultRowEngineMatchKeys(row) {
  const keys = new Set(getGearBoxRowMatchKeys(row, "boundary_key"));
  getSearchResultRowIdentifierCandidates(row).forEach((value) => addGearBoxMatchKey(keys, value));
  return keys;
}

async function createAdmin0SearchResultEntryFromEngineEntry(entry, taskContext = {}) {
  if (!entry) return null;
  const feature = await loadNaturalEarthAdmin0EngineFeature(entry);
  await taskContext.yield?.();
  if (!feature || !hasDrawableBoundaryFeature(feature)) return null;
  return { item: createNaturalEarthArchiveItemDefaults("admin_0_countries", feature), boundarySet: null, feature };
}

async function findAdmin0SearchResultEntryForRow(row, taskContext = {}) {
  if (taskContext.shouldPause?.()) return null;
  await loadNaturalEarthAdmin0EngineIndex();
  const candidates = getSearchResultRowIdentifierCandidates(row);
  const normalizedCandidates = new Set(candidates.map((value) => normalizeSearchText(value)).filter(Boolean));

  // Suchkarten speichern technische Engine-IDs. Diese sind nach einem Reload
  // die verlässlichste Referenz und müssen vor Namens-/Statistik-Fallbacks
  // geprüft werden, damit Kontextflächen wie EU-Mitglieder wieder eindeutig
  // an die korrekten Admin-0-Geometrien andocken.
  for (const candidate of candidates) {
    if (taskContext.shouldPause?.()) return null;
    const byArchiveKey = getNaturalEarthAdmin0EngineEntryByArchiveKey(candidate);
    const entry = byArchiveKey || (/^[A-Z]{3}$/.test(candidate.toUpperCase())
      ? getNaturalEarthAdmin0EngineEntryByIso3(candidate)
      : null);
    const resolved = await createAdmin0SearchResultEntryFromEngineEntry(entry, taskContext);
    if (resolved) return resolved;
  }

  const engineIndex = getNaturalEarthAdmin0EngineIndex();
  const indexEntry = (engineIndex?.chunks || []).find((entry) => {
    const entryKeys = new Set();
    [
      entry.stable_id,
      entry.version_id,
      entry.provider_boundary_id,
      entry.country_iso3,
      entry.country_iso2,
      entry.wikidata_id,
      entry.title,
      ...(Array.isArray(entry.match_keys) ? entry.match_keys : []),
    ].forEach((value) => addGearBoxMatchKey(entryKeys, value));
    for (const key of normalizedCandidates) {
      if (entryKeys.has(key)) return true;
    }
    return false;
  });
  const resolvedFromIndex = await createAdmin0SearchResultEntryFromEngineEntry(indexEntry, taskContext);
  if (resolvedFromIndex) return resolvedFromIndex;

  const iso3s = candidates
    .map((value) => value.toUpperCase())
    .filter((value) => /^[A-Z]{3}$/.test(value));
  for (const iso3 of [...new Set(iso3s)]) {
    if (taskContext.shouldPause?.()) return null;
    const fallbackFeature = getNaturalEarthCountryFeatureByIso3(iso3);
    if (fallbackFeature && hasDrawableBoundaryFeature(fallbackFeature)) {
      return { item: createNaturalEarthArchiveItemDefaults("admin_0_countries", fallbackFeature), boundarySet: null, feature: fallbackFeature };
    }
  }
  return null;
}

async function findAdmin1SearchResultEntryForRow(row, taskContext = {}) {
  if (taskContext.shouldPause?.()) return null;
  await loadNaturalEarthAdmin1Dataset();
  if (taskContext.shouldPause?.()) return null;
  const iso3s = new Set(getGearBoxRowIso3Candidates(row));
  const admin1Index = getNaturalEarthAdmin1EngineIndex();
  const rowKeys = getSearchResultRowEngineMatchKeys(row);
  if (admin1Index?.feature_index?.length) {
    admin1Index.feature_index.forEach((entry) => {
      const entryKeys = new Set();
      [
        entry.stable_id,
        entry.version_id,
        entry.provider_boundary_id,
        entry.iso_3166_2,
        entry.adm1_code,
        entry.wikidata_id,
        entry.title,
        ...(Array.isArray(entry.match_keys) ? entry.match_keys : []),
      ].forEach((value) => addGearBoxMatchKey(entryKeys, value));
      for (const key of rowKeys) {
        if (entryKeys.has(key) && /^[A-Z]{3}$/.test(entry.country_iso3 || "")) {
          iso3s.add(entry.country_iso3);
          break;
        }
      }
    });
  }

  for (const iso3 of iso3s) {
    if (taskContext.shouldPause?.()) return null;
    await loadNaturalEarthAdmin1CountryChunk(iso3);
    await taskContext.yield?.();
    const loadedEntry = findLoadedAdmin1ChunkEntryForRow(row, "boundary_key");
    if (loadedEntry) return loadedEntry;
  }
  return null;
}

async function findSearchResultBoundaryEntryForRow(row, index = 0, taskContext = {}) {
  if (taskContext.shouldPause?.()) return null;
  await ensureNaturalEarthSearchBaseLoaded();
  if (taskContext.shouldPause?.()) return null;

  const level = String(getGearBoxRowValue(row, "level") || "").toUpperCase();
  const shouldTryAdmin1 = level === "ADM1"
    || Boolean(getGearBoxRowValue(row, "iso_3166_2"))
    || Boolean(getGearBoxRowValue(row, "adm1_code"));

  if (shouldTryAdmin1) {
    const admin1Entry = await findAdmin1SearchResultEntryForRow(row, taskContext);
    if (admin1Entry) return admin1Entry;
  } else {
    const admin0Entry = await findAdmin0SearchResultEntryForRow(row, taskContext);
    if (admin0Entry) return admin0Entry;
  }

  const rowKeys = getSearchResultRowEngineMatchKeys(row);
  const countryFeatures = (getNaturalEarthCountryDataset()?.features || []);
  for (const archiveFeature of countryFeatures) {
    const item = createNaturalEarthArchiveItemDefaults("admin_0_countries", archiveFeature);
    const boundarySet = item.boundarySet;
    const features = boundarySet?.features || [];
    for (const feature of features) {
      const featureKeys = getGearBoxFeatureMatchKeys(feature);
      for (const key of rowKeys) {
        if (featureKeys.has(key) && hasDrawableBoundaryFeature(feature)) {
          return { item, boundarySet, feature };
        }
      }
    }
  }

  return null;
}

function createSearchResultValueMatchFromEntry(row, entry, index = 0) {
  if (!entry?.feature) return null;
  enrichSearchResultRowFromFeature(row, entry.feature, index);
  const role = row.role || "context";
  const isFocus = role === "focus";
  return {
    boundaryKey: row.boundary_key || "",
    featureId: row.feature_id || entry.feature.id || entry.feature.stable_id || row.boundary_key || `search-${index}`,
    stable_id: row.stable_id || entry.feature.stable_id || entry.feature.properties?._ziselinBoundarySetStableId || row.boundary_key || "",
    value: row.value || "",
    numericValue: parseGearBoxNumber(row.value),
    fill: isFocus ? getMapSearchSpecialHighlightColor() : getMapSearchSelectedAreaColor(),
    outline: isFocus ? getMapSearchSpecialOutlineColor() : getMapSearchSelectedOutlineColor(),
    role,
    source: {
      label: row.source_label || "EarthMap-Suche",
      url: row.source_url || "",
      accessed_at: row.source_accessed_at || "",
      note: row.source_note || "",
    },
    feature: entry.feature,
  };
}

function scheduleSearchResultLayerHydration(layer, options = {}) {
  if (!layer || layer._searchGeometryHydrationPending || layer._searchGeometryHydrationQueued) return;
  const rows = Array.isArray(layer.table?.rows) ? layer.table.rows : [];
  if (!rows.length) return;
  ensureSearchResultTechnicalHeaders(layer);
  layer._searchGeometryHydrationQueued = true;
  const delay = Number.isFinite(Number(options.delay)) ? Math.max(0, Number(options.delay)) : 3200;
  window.setTimeout(() => {
    layer._searchGeometryHydrationQueued = false;
    if (layer._searchGeometryHydrationPending) return;
    layer._searchGeometryHydrationPending = true;
    queueEarthMapBackgroundTask(`Suchkarte-Geometrien: ${layer.title || layer.id}`, async (taskContext) => {
    let paused = false;
    try {
      const matches = [];
      const previousDrawableMatches = Array.isArray(layer.valueMatches)
        ? layer.valueMatches.filter((match) => hasDrawableBoundaryFeature(match?.feature))
        : [];
      const mergeWithPreviousDrawableMatches = () => {
        const byKey = new Map();
        previousDrawableMatches.forEach((match) => {
          const key = normalizeSearchText(match?.boundaryKey || match?.stable_id || match?.featureId || "");
          if (key && !byKey.has(key)) byKey.set(key, match);
        });
        matches.forEach((match) => {
          const key = normalizeSearchText(match?.boundaryKey || match?.stable_id || match?.featureId || "");
          if (key) byKey.set(key, match);
        });
        return rows.flatMap((row) => {
          const rowKeys = getSearchResultRowEngineMatchKeys(row);
          for (const key of rowKeys) {
            const match = byKey.get(key);
            if (match) return [match];
          }
          return [];
        });
      };
      layer._searchHydrationLastRunAt = Date.now();
      for (let index = 0; index < rows.length; index += 1) {
        if (taskContext.shouldPause?.()) {
          paused = true;
          break;
        }
        const row = rows[index];
        const existing = (layer.valueMatches || []).find((match) => (
          normalizeSearchText(match?.boundaryKey) === normalizeSearchText(row.boundary_key)
          && hasDrawableBoundaryFeature(match?.feature)
        ));
        if (existing) {
          matches.push(existing);
          continue;
        }
        const entry = await findSearchResultBoundaryEntryForRow(row, index, taskContext);
        if (taskContext.shouldPause?.()) {
          paused = true;
          break;
        }
        const match = createSearchResultValueMatchFromEntry(row, entry, index);
        if (match) matches.push(match);
        if (index % 3 === 2 || index === rows.length - 1) {
          layer.valueMatches = mergeWithPreviousDrawableMatches();
          layer.matchPreview = {
            ...(layer.matchPreview || {}),
            headers: layer.table.headers || [],
            rowCount: rows.length,
            matched: layer.valueMatches.length,
            missing: rows
              .filter((candidate) => !layer.valueMatches.some((matchCandidate) => matchCandidate.boundaryKey === candidate.boundary_key))
              .slice(0, 12)
              .map((candidate) => candidate.boundary_key || candidate.boundary_label || "—"),
          };
          layer.table.raw = serializeDelimitedRows(layer.table.headers || [], rows, layer.table.delimiter || ";");
          syncMapLibreSearchHighlight({ syncAdmin1: false });
          scheduleGlobeRender();
          await taskContext.yield?.();
          if (taskContext.shouldPause?.()) {
            paused = true;
            break;
          }
        }
      }
      layer.valueMatches = paused ? mergeWithPreviousDrawableMatches() : matches.slice();
      layer._searchHydrationLastMatched = layer.valueMatches.length;
      layer._searchHydrationLastMissing = Math.max(0, rows.length - layer.valueMatches.length);
      layer._searchHydrationLastMissingExamples = rows
        .filter((candidate) => !layer.valueMatches.some((matchCandidate) => matchCandidate.boundaryKey === candidate.boundary_key))
        .slice(0, 8)
        .map((candidate) => candidate.boundary_key || candidate.stable_id || candidate.boundary_label || "—");
      if (!paused && !taskContext.shouldPause?.()) {
        syncMapLibreSearchHighlight({ syncAdmin1: false });
        scheduleGlobeRender();
        persistProjects();
        orderMapLibreReadableBoundaryLayers();
      }
    } finally {
      layer._searchGeometryHydrationPending = false;
      if (paused) {
        layer._searchHydrationPausedAt = Date.now();
        scheduleSearchResultLayerHydration(layer, { delay: 900 });
      }
    }
    }, {
      key: `search-layer-hydrate-${layer.id}`,
      priority: 2,
    });
  }, delay);
}

function rehydrateSavedSearchLayers(project = getActiveProject(), options = {}) {
  const layers = (project?.dataLayers || [])
    .filter((layer) => layer?.kind === "gearbox-data-layer" && layer.origin === "search" && layer.visible !== false);
  if (!layers.length) return false;
  let changed = false;
  layers.forEach((layer) => {
    const hasRows = Array.isArray(layer.table?.rows) && layer.table.rows.length;
    const hasDrawableMatches = (layer.valueMatches || []).some((match) => hasDrawableBoundaryFeature(match?.feature));
    // Start-/Refresh-Regel: gespeicherte Suchkarten dürfen den ersten Globus
    // nicht blockieren. Ihre Geometrien werden deshalb nicht synchron gegen
    // die Boundary-Indizes rekonstruiert, sondern erst im Leerlauf hydratisiert.
    if (hasRows && (!hasDrawableMatches || (layer.valueMatches || []).length < layer.table.rows.length)) {
      scheduleSearchResultLayerHydration(layer);
    } else if (hasDrawableMatches && options.refreshExisting === true) {
      const beforeMatches = Array.isArray(layer.valueMatches) ? layer.valueMatches.length : 0;
      const beforeRaw = layer.table?.raw || "";
      rebuildSearchResultDataLayerMatches(layer);
      changed = changed
        || beforeMatches !== (layer.valueMatches || []).length
        || beforeRaw !== (layer.table?.raw || "");
    }
  });
  if (changed && options.persist !== false) persistProjects();
  syncMapLibreSearchHighlight();
  scheduleGlobeRender();
  return changed;
}

function saveCurrentMapSearchToProject() {
  const highlight = state.mapSearchHighlight;
  if (!highlight || (!highlight.selectedFeatures?.length && !highlight.focusFeatures?.length)) {
    window.alert("Es gibt kein Suchergebnis, das gespeichert werden kann.");
    return;
  }
  const project = ensureActiveProjectForSearchSave();
  if (!project) return;
  const layer = createSearchResultDataLayerFromHighlight(highlight);
  if (!layer) {
    window.alert("Das Suchergebnis konnte nicht als Karte gespeichert werden.");
    return;
  }
  project.dataLayers = Array.isArray(project.dataLayers) ? project.dataLayers : [];
  project.dataLayers.push(layer);
  project.activeLibraryItemId = layer.id;
  state.editorMode = "properties";
  state.previousToolEditorTab = "gearbox";
  state.statisticLayerActiveTab = "properties";
  state.activeEditorChapterKey = "statistic-display";
  persistProjects();
  renderWorkspace();
  renderGlobe();
  syncSaveSearchLayerButton();
  showEarthMapFeedback(`${layer.table.rows.length} Boundaries wurden im Projekt „${project.title || "EarthMap"}“ gespeichert.`);
}

function collectFeatureCoordinates(geojson, coordinates = []) {
  if (!geojson) return coordinates;
  if (geojson.type === "FeatureCollection") {
    (geojson.features || []).forEach((feature) => collectFeatureCoordinates(feature, coordinates));
    return coordinates;
  }
  if (geojson.type === "Feature") {
    collectFeatureCoordinates(geojson.geometry, coordinates);
    return coordinates;
  }
  if (geojson.type === "GeometryCollection") {
    (geojson.geometries || []).forEach((geometry) => collectFeatureCoordinates(geometry, coordinates));
    return coordinates;
  }
  if (geojson.type === "Point" && Array.isArray(geojson.coordinates)) {
    coordinates.push(geojson.coordinates);
    return coordinates;
  }
  if (geojson.type === "MultiPoint" || geojson.type === "LineString") {
    (geojson.coordinates || []).forEach((point) => coordinates.push(point));
    return coordinates;
  }
  if (geojson.type === "MultiLineString" || geojson.type === "Polygon") {
    (geojson.coordinates || []).forEach((ring) => (ring || []).forEach((point) => coordinates.push(point)));
    return coordinates;
  }
  if (geojson.type === "MultiPolygon") {
    (geojson.coordinates || []).forEach((polygon) => {
      (polygon || []).forEach((ring) => (ring || []).forEach((point) => coordinates.push(point)));
    });
  }
  return coordinates;
}

function getGeoJsonCoordinateCenter(geojson) {
  const points = collectFeatureCoordinates(geojson)
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]));
  if (!points.length) return null;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  points.forEach(([lon, lat]) => {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });
  if (![minLon, maxLon, minLat, maxLat].every(Number.isFinite)) return null;
  return {
    lon: normalizeLongitude((minLon + maxLon) / 2),
    lat: clamp((minLat + maxLat) / 2, -84, 84),
  };
}

function orientGlobeToSearchResult(focusEntries, contextEntries, fallbackEntries) {
  const targetEntry = focusEntries[0] || contextEntries[0] || fallbackEntries[0] || null;
  const center = getGeoJsonCoordinateCenter(targetEntry?.feature);
  if (!center) return;
  // Suchinteraktion: Eine gefundene Fläche muss nach der Suche sichtbar sein.
  // Bei "Texas; Vereinigte Staaten" liegt Texas sonst auf der Rückseite der
  // aktuellen Kugelrotation und wirkt fälschlich wie ein nicht erkannter Fokus.
  const latitudeLimit = getLatitudeNavigationLimit();
  if (mapLibreEngineState.active) {
    // MapLibre arbeitet mit einem echten Kartenmittelpunkt. Die Suche darf
    // deshalb nur den Mittelpunkt verschieben, aber den aktuellen Zoom nicht
    // verändern; genau dieser Zoom bleibt in syncMapLibreCamera() erhalten.
    rotation.lon = center.lon;
    rotation.lat = clamp(center.lat, -latitudeLimit, latitudeLimit);
    syncMapLibreCamera();
    return;
  }
  rotation.lon = -center.lon;
  rotation.lat = clamp(-center.lat, -latitudeLimit, latitudeLimit);
}

async function applyMapSearchQuery(rawQuery) {
  const startedAt = performance.now();
  if (isStatisticalMapActive()) {
    state.mapSearchHighlight = null;
    ui.mapSearchOptions?.replaceChildren();
    updateMapSearchAvailability();
    syncMapLibreSearchHighlight();
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
    scheduleGlobeRender();
    return;
  }
  const requestSerial = ++mapSearchRequestSerial;
  const query = String(rawQuery || "").trim();
  if (!query) {
    clearMapSearchHighlight();
    return;
  }
  const hasRelationSeparator = query.includes(";");
  const [focusExpression = "", contextExpression = ""] = hasRelationSeparator
    ? query.split(";")
    : ["", query];

  // Suchsyntax:
  //   links vom Semikolon = Fokus/Hervorhebung (rot)
  //   rechts vom Semikolon = Kontext/Auswahlfläche (creme)
  //   Kommata bleiben innerhalb beider Seiten reine Aufzählungstrenner.
  // Wenn rechts ein Kontext steht, werden linke Fokusobjekte nur dann rot
  // gesetzt, wenn sie zu mindestens einem Kontextobjekt gehören. Dadurch
  // bleibt z. B. "Vereinigtes Königreich; EU" fachlich sichtbar falsch:
  // Die EU wird markiert, das Vereinigte Königreich aber nicht hervorgehoben.
  const contextEntries = await resolveMapSearchTermList(contextExpression);
  const rawFocusEntries = await resolveMapSearchTermList(focusExpression, { focus: true, contextEntries });
  const focusEntries = rawFocusEntries.filter((entry) => isMapSearchFocusInsideContext(entry, contextEntries));
  const fallbackEntries = !hasRelationSeparator && !contextEntries.length
    ? await resolveMapSearchTermList(query)
    : [];

  if (requestSerial !== mapSearchRequestSerial) return;

  if (!contextEntries.length && !focusEntries.length && !fallbackEntries.length) {
    state.mapSearchHighlight = null;
    mapLibreEngineState.searchResolveMs = performance.now() - startedAt;
    syncSaveSearchLayerButton();
    ui.mapSearchInput?.classList.add("has-search-error");
    ui.mapSearchInput?.setAttribute("title", "Keine passende Karte im lokalen Natural-Earth-Archiv gefunden.");
    void syncMapLibreAdmin1LayerForSearch({ includeViewport: true });
    scheduleGlobeRender();
    return;
  }

  ui.mapSearchInput?.classList.remove("has-search-error");
  ui.mapSearchInput?.removeAttribute("title");
  state.mapSearchHighlight = {
    query,
    selectedFeatures: contextEntries.length
      ? contextEntries.flatMap(getMapSearchEntryRenderFeatures)
      : fallbackEntries.flatMap(getMapSearchEntryRenderFeatures),
    focusFeatures: focusEntries.flatMap(getMapSearchEntryRenderFeatures),
  };
  mapLibreEngineState.searchResolveMs = performance.now() - startedAt;
  syncSaveSearchLayerButton();
  orientGlobeToSearchResult(focusEntries, contextEntries, fallbackEntries);
  syncMapLibreSearchHighlight();
  scheduleGlobeRender();
}

function slugifyBoundaryId(value, fallback = "boundary") {
  return String(value || fallback)
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96) || fallback;
}

function getFeatureDisplayName(feature, index) {
  const props = feature?.properties || {};
  return repairLegacyText(
    props.name
    || props.NAME
    || props.Name
    || props.GEN
    || props.label
    || props.WKR_NAME
    || props.wahlkreis_name
    || props.Wahlkreis
    || `Einheit ${index + 1}`,
  );
}

function getFeatureStableId(feature, index, setId) {
  const props = feature?.properties || {};
  return String(
    feature?.id
    || props.id
    || props.ID
    || props.iso_3166_2
    || props.ISO3166_2
    || props.ags
    || props.AGS
    || props.WKR_NR
    || props.wahlkreis_nr
    || `${setId}-${index + 1}`,
  );
}

function getImportedFeatureWikidataId(feature) {
  const props = feature?.properties || {};
  return normalizeWikidataId(
    feature?.wikidata_id
    || feature?.wikidataId
    || props.wikidata_id
    || props.wikidata
    || props.WIKIDATA
    || props.WIKIDATAID
    || props.wikidataid
    || "",
  );
}

function getImportedFeatureIso3(feature) {
  const props = feature?.properties || {};
  return String(
    props.iso3
    || props.ISO3
    || props.ISO_A3
    || props.ADM0_A3
    || props.adm0_a3
    || "",
  ).trim().toUpperCase();
}

function createImportedBoundaryFeature(feature, index, boundarySet) {
  const name = getFeatureDisplayName(feature, index);
  const stableId = String(getFeatureStableId(feature, index, boundarySet.stable_id || boundarySet.id));
  const featureVersionId = feature.version_id || createBoundaryVersionId(stableId, boundarySet.valid_from, boundarySet.valid_to);
  const wikidataId = getImportedFeatureWikidataId(feature);
  const iso3 = getImportedFeatureIso3(feature);
  const matchTokens = [
    stableId,
    featureVersionId,
    name,
    wikidataId,
    iso3,
    feature.properties?.iso_3166_2,
    feature.properties?.ISO3166_2,
    feature.properties?.ags,
    feature.properties?.AGS,
    feature.properties?.WKR_NR,
    feature.properties?.wahlkreis_nr,
  ].map((token) => normalizeSearchText(token)).filter(Boolean);

  return {
    ...feature,
    type: "Feature",
    id: String(feature.id || stableId),
    stable_id: stableId,
    version_id: featureVersionId,
    name,
    wikidata_id: wikidataId,
    identifiers: {
      ...(feature.identifiers || {}),
      ...(iso3 ? { iso3 } : {}),
    },
    names: {
      ...(feature.names || {}),
      de: feature.names?.de || name,
    },
    aliases: Array.isArray(feature.aliases) ? feature.aliases.map(repairLegacyText) : [],
    match_tokens: Array.from(new Set([...(Array.isArray(feature.match_tokens) ? feature.match_tokens.map(repairLegacyText) : []), ...matchTokens])),
    parent_id: feature.parent_id || boundarySet.parent_id || "",
    rank: feature.rank == null || feature.rank === "" ? boundarySet.rank : String(feature.rank),
    sovereignty_status: feature.sovereignty_status || feature.classification?.sovereignty_status || boundarySet.sovereignty_status || "",
    constitutional_status: feature.constitutional_status || feature.classification?.constitutional_status || feature.properties?.constitutional_status || feature.properties?.ziselin_constitutional_status || boundarySet.constitutional_status || "",
    relation_to_parent: feature.relation_to_parent || feature.classification?.relation_to_parent || boundarySet.relation_to_parent || "",
    valid_from: feature.valid_from || boundarySet.valid_from || "",
    valid_to: feature.valid_to || boundarySet.valid_to || null,
    valid_precision: feature.valid_precision || boundarySet.valid_precision || "unknown",
    temporal_status: feature.temporal_status || boundarySet.temporal_status || "undated_reference",
    source_ref: feature.source_ref || boundarySet.source?.label || "",
    geometry: feature.geometry,
    properties: feature.properties || {},
  };
}

function getFileExtension(fileName = "") {
  const match = String(fileName).toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function getXmlChildrenByLocalName(node, localName) {
  return [...(node?.children || [])].filter((child) => child.localName === localName);
}

function getFirstXmlText(node, localName) {
  const match = node?.getElementsByTagNameNS?.("*", localName)?.[0]
    || node?.getElementsByTagName?.(localName)?.[0];
  return repairLegacyText(match?.textContent?.trim() || "");
}

function parseKmlCoordinateText(text) {
  const coordinates = String(text || "")
    .trim()
    .split(/\s+/)
    .map((tuple) => {
      const [lon, lat] = tuple.split(",").map(Number);
      return Number.isFinite(lon) && Number.isFinite(lat) ? [lon, lat] : null;
    })
    .filter(Boolean);
  if (coordinates.length < 3) return [];
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) coordinates.push([...first]);
  return coordinates;
}

function parseKmlPolygon(polygonNode) {
  const rings = [];
  const outer = polygonNode.getElementsByTagNameNS("*", "outerBoundaryIs")?.[0]
    || polygonNode.getElementsByTagName("outerBoundaryIs")?.[0];
  const outerCoordinates = outer?.getElementsByTagNameNS?.("*", "coordinates")?.[0]?.textContent
    || outer?.getElementsByTagName?.("coordinates")?.[0]?.textContent
    || "";
  const outerRing = parseKmlCoordinateText(outerCoordinates);
  if (outerRing.length >= 4) rings.push(outerRing);

  const innerBoundaries = [
    ...polygonNode.getElementsByTagNameNS("*", "innerBoundaryIs"),
    ...polygonNode.getElementsByTagName("innerBoundaryIs"),
  ];
  [...new Set(innerBoundaries)].forEach((inner) => {
    const innerCoordinates = inner.getElementsByTagNameNS?.("*", "coordinates")?.[0]?.textContent
      || inner.getElementsByTagName?.("coordinates")?.[0]?.textContent
      || "";
    const innerRing = parseKmlCoordinateText(innerCoordinates);
    if (innerRing.length >= 4) rings.push(innerRing);
  });

  return rings.length ? rings : null;
}

function readKmlExtendedData(placemark) {
  const props = {};
  const dataNodes = [
    ...placemark.getElementsByTagNameNS("*", "Data"),
    ...placemark.getElementsByTagName("Data"),
  ];
  [...new Set(dataNodes)].forEach((dataNode) => {
    const name = dataNode.getAttribute("name");
    const value = getFirstXmlText(dataNode, "value");
    if (name && value) props[name] = value;
  });
  const simpleDataNodes = [
    ...placemark.getElementsByTagNameNS("*", "SimpleData"),
    ...placemark.getElementsByTagName("SimpleData"),
  ];
  [...new Set(simpleDataNodes)].forEach((dataNode) => {
    const name = dataNode.getAttribute("name");
    const value = repairLegacyText(dataNode.textContent?.trim() || "");
    if (name && value) props[name] = value;
  });
  return props;
}

function kmlToGeoJson(kmlText, fileName = "kartensammlung.kml") {
  const parser = new DOMParser();
  const documentXml = parser.parseFromString(kmlText, "application/xml");
  if (documentXml.getElementsByTagName("parsererror").length) {
    throw new Error("Die KML-Datei konnte nicht als XML gelesen werden.");
  }
  const placemarks = [
    ...documentXml.getElementsByTagNameNS("*", "Placemark"),
    ...documentXml.getElementsByTagName("Placemark"),
  ];
  const features = [...new Set(placemarks)].map((placemark, index) => {
    const polygons = [...new Set([
      ...placemark.getElementsByTagNameNS("*", "Polygon"),
      ...placemark.getElementsByTagName("Polygon"),
    ])].map(parseKmlPolygon).filter(Boolean);
    if (!polygons.length) return null;
    const properties = {
      ...readKmlExtendedData(placemark),
      name: getFirstXmlText(placemark, "name") || `Einheit ${index + 1}`,
      description: getFirstXmlText(placemark, "description"),
    };
    return {
      type: "Feature",
      properties,
      geometry: polygons.length === 1
        ? { type: "Polygon", coordinates: polygons[0] }
        : { type: "MultiPolygon", coordinates: polygons },
    };
  }).filter(Boolean);

  return {
    type: "FeatureCollection",
    name: fileName.replace(/\.[^.]+$/, ""),
    features,
  };
}

function findZipEndOfCentralDirectory(view) {
  for (let offset = view.byteLength - 22; offset >= Math.max(0, view.byteLength - 66000); offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) return offset;
  }
  return -1;
}

async function inflateRawZipEntry(bytes) {
  if (!("DecompressionStream" in window)) {
    throw new Error("ZIP/KMZ benötigt Deflate-Dekompression. Dieser Browser unterstützt sie nicht.");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function extractKmlTextFromKmz(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder("utf-8");
  const eocdOffset = findZipEndOfCentralDirectory(view);
  if (eocdOffset < 0) throw new Error("Die KMZ-Datei enthält kein lesbares ZIP-Verzeichnis.");
  const entryCount = view.getUint16(eocdOffset + 10, true);
  let cursor = view.getUint32(eocdOffset + 16, true);

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const fileNameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localHeaderOffset = view.getUint32(cursor + 42, true);
    const fileName = decoder.decode(new Uint8Array(arrayBuffer, cursor + 46, fileNameLength));
    cursor += 46 + fileNameLength + extraLength + commentLength;
    if (!fileName.toLowerCase().endsWith(".kml")) continue;

    if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) throw new Error("Die KMZ-Datei enthält einen beschädigten KML-Eintrag.");
    const localNameLength = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = new Uint8Array(arrayBuffer, dataOffset, compressedSize);
    const data = method === 0 ? compressed : method === 8 ? await inflateRawZipEntry(compressed) : null;
    if (!data) throw new Error(`KMZ-Kompressionsmethode ${method} wird noch nicht unterstützt.`);
    return decoder.decode(data);
  }

  throw new Error("In der KMZ-Datei wurde keine KML-Datei gefunden.");
}

async function readZipEntries(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const utf8Decoder = new TextDecoder("utf-8");
  const eocdOffset = findZipEndOfCentralDirectory(view);
  if (eocdOffset < 0) throw new Error("Die ZIP-Datei enthält kein lesbares ZIP-Verzeichnis.");
  const entryCount = view.getUint16(eocdOffset + 10, true);
  let cursor = view.getUint32(eocdOffset + 16, true);
  const entries = [];

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const fileNameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localHeaderOffset = view.getUint32(cursor + 42, true);
    const fileName = utf8Decoder.decode(new Uint8Array(arrayBuffer, cursor + 46, fileNameLength));
    cursor += 46 + fileNameLength + extraLength + commentLength;
    if (!fileName || fileName.endsWith("/") || fileName.toLowerCase().startsWith("__macosx/")) continue;

    if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) throw new Error("Die ZIP-Datei enthält einen beschädigten Eintrag.");
    const localNameLength = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = new Uint8Array(arrayBuffer, dataOffset, compressedSize);
    const data = method === 0 ? compressed : method === 8 ? await inflateRawZipEntry(compressed) : null;
    if (!data) throw new Error(`ZIP-Kompressionsmethode ${method} wird noch nicht unterstützt.`);
    entries.push({ name: fileName, lowerName: fileName.toLowerCase(), bytes: data });
  }

  return entries;
}

function getZipEntryBaseName(entryName = "") {
  return String(entryName)
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .toLowerCase() || "";
}

function findMatchingZipEntry(entries, baseName, extension) {
  const suffix = `.${extension.toLowerCase()}`;
  return entries.find((entry) => getZipEntryBaseName(entry.name) === baseName && entry.lowerName.endsWith(suffix))
    || entries.find((entry) => entry.lowerName.endsWith(suffix));
}

function getTextDecoder(label) {
  try {
    return new TextDecoder(label);
  } catch (_) {
    return new TextDecoder("utf-8");
  }
}

function decodeDbfText(bytes) {
  return getTextDecoder("windows-1252").decode(bytes).replace(/\0/g, "").trim();
}

function parseDbfValue(rawValue, field) {
  const value = repairLegacyText(rawValue);
  if (!value) return "";
  if (field.type === "N" || field.type === "F") {
    const numeric = Number(value.replace(",", "."));
    return Number.isFinite(numeric) ? numeric : value;
  }
  if (field.type === "L") {
    if (/^[YyTtJj1]/.test(value)) return true;
    if (/^[NnFf0]/.test(value)) return false;
    return value;
  }
  if (field.type === "D" && /^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  return value;
}

function parseDbf(arrayBuffer) {
  const bytes = arrayBuffer instanceof Uint8Array ? arrayBuffer : new Uint8Array(arrayBuffer);
  if (bytes.length < 33) return [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const recordCount = view.getUint32(4, true);
  const headerLength = view.getUint16(8, true);
  const recordLength = view.getUint16(10, true);
  const fields = [];

  for (let offset = 32; offset + 32 <= headerLength && bytes[offset] !== 0x0d; offset += 32) {
    const nameBytes = bytes.slice(offset, offset + 11);
    const nullIndex = nameBytes.indexOf(0);
    const cleanNameBytes = nullIndex >= 0 ? nameBytes.slice(0, nullIndex) : nameBytes;
    const name = decodeDbfText(cleanNameBytes);
    if (!name) continue;
    fields.push({
      name,
      type: String.fromCharCode(bytes[offset + 11] || 67).toUpperCase(),
      length: bytes[offset + 16] || 0,
    });
  }

  const records = [];
  for (let index = 0; index < recordCount; index += 1) {
    const recordOffset = headerLength + index * recordLength;
    if (recordOffset + recordLength > bytes.length) break;
    if (bytes[recordOffset] === 0x2a) {
      records.push(null);
      continue;
    }
    const record = {};
    let fieldOffset = recordOffset + 1;
    fields.forEach((field) => {
      const raw = decodeDbfText(bytes.slice(fieldOffset, fieldOffset + field.length));
      record[field.name] = parseDbfValue(raw, field);
      fieldOffset += field.length;
    });
    records.push(record);
  }
  return records;
}

function signedRingArea(ring) {
  let sum = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    sum += (x1 * y2) - (x2 * y1);
  }
  return sum / 2;
}

function pointIsInRing(point, ring) {
  const [lon, lat] = point;
  let inside = false;
  for (let index = 0, previousIndex = ring.length - 1; index < ring.length; previousIndex = index, index += 1) {
    const [lonA, latA] = ring[index];
    const [lonB, latB] = ring[previousIndex];
    if (((latA > lat) !== (latB > lat)) && lon < ((lonB - lonA) * (lat - latA)) / ((latB - latA) || Number.EPSILON) + lonA) {
      inside = !inside;
    }
  }
  return inside;
}

function closeShapefileRing(ring) {
  const clean = ring.filter(([lon, lat]) => Number.isFinite(lon) && Number.isFinite(lat));
  if (clean.length < 3) return [];
  const first = clean[0];
  const last = clean[clean.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) clean.push([...first]);
  return clean.length >= 4 ? clean : [];
}

function shapefileRingsToGeometry(rings) {
  const normalizedRings = rings.map(closeShapefileRing).filter((ring) => ring.length >= 4);
  if (!normalizedRings.length) return null;
  const ringInfos = normalizedRings.map((ring) => ({ ring, area: signedRingArea(ring), holes: [] }));
  const hasClockwiseOuterRings = ringInfos.some((info) => info.area < 0);
  const outers = ringInfos.filter((info) => (hasClockwiseOuterRings ? info.area < 0 : info.area > 0));
  const holes = ringInfos.filter((info) => !outers.includes(info));

  // Shapefiles kodieren Polygonteile meist über Ringrichtung: Außenringe
  // clockwise, Löcher counter-clockwise. Wir erhalten diese fachliche Ebene,
  // fallen aber auf getrennte Polygone zurück, falls ein Datensatz diese
  // Konvention nicht sauber einhält.
  if (!outers.length) {
    const polygons = normalizedRings.map((ring) => [ring]);
    return polygons.length === 1
      ? { type: "Polygon", coordinates: polygons[0] }
      : { type: "MultiPolygon", coordinates: polygons };
  }

  holes.forEach((hole) => {
    const samplePoint = hole.ring[0];
    const target = outers.find((outer) => pointIsInRing(samplePoint, outer.ring));
    if (target) target.holes.push(hole.ring);
    else outers.push({ ring: hole.ring, area: hole.area, holes: [] });
  });

  const polygons = outers.map((outer) => [outer.ring, ...outer.holes]);
  return polygons.length === 1
    ? { type: "Polygon", coordinates: polygons[0] }
    : { type: "MultiPolygon", coordinates: polygons };
}

function parseShpPolygonRecord(view, offset, contentBytes) {
  if (contentBytes < 44) return null;
  const shapeType = view.getInt32(offset, true);
  if (shapeType === 0) return null;
  if (![5, 15, 25].includes(shapeType)) return null;
  const numParts = view.getInt32(offset + 36, true);
  const numPoints = view.getInt32(offset + 40, true);
  if (numParts <= 0 || numPoints <= 0) return null;
  const partsOffset = offset + 44;
  const pointsOffset = partsOffset + numParts * 4;
  if (pointsOffset + numPoints * 16 > offset + contentBytes) return null;
  const parts = [];
  for (let partIndex = 0; partIndex < numParts; partIndex += 1) {
    parts.push(view.getInt32(partsOffset + partIndex * 4, true));
  }
  parts.push(numPoints);

  const rings = [];
  for (let partIndex = 0; partIndex < numParts; partIndex += 1) {
    const start = parts[partIndex];
    const end = parts[partIndex + 1];
    const ring = [];
    for (let pointIndex = start; pointIndex < end; pointIndex += 1) {
      const pointOffset = pointsOffset + pointIndex * 16;
      ring.push([view.getFloat64(pointOffset, true), view.getFloat64(pointOffset + 8, true)]);
    }
    if (ring.length >= 3) rings.push(ring);
  }
  return shapefileRingsToGeometry(rings);
}

function parseShpToGeoJson(shpBytes, dbfRecords = [], fileName = "kartensammlung.shp") {
  const bytes = shpBytes instanceof Uint8Array ? shpBytes : new Uint8Array(shpBytes);
  if (bytes.length < 100) throw new Error("Die SHP-Datei ist zu klein oder beschädigt.");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.getInt32(0, false) !== 9994) throw new Error("Die Datei ist keine gültige ESRI-Shapefile-Geometriedatei.");
  const mainShapeType = view.getInt32(32, true);
  if (![5, 15, 25].includes(mainShapeType)) {
    throw new Error("Der erste Shapefile-Import unterstützt derzeit Polygon-Shapefiles. Punkte und Linien folgen später.");
  }

  const features = [];
  let cursor = 100;
  let recordIndex = 0;
  while (cursor + 8 <= bytes.length) {
    const contentBytes = view.getInt32(cursor + 4, false) * 2;
    const contentOffset = cursor + 8;
    if (contentBytes <= 0 || contentOffset + contentBytes > bytes.length) break;
    const geometry = parseShpPolygonRecord(view, contentOffset, contentBytes);
    if (geometry) {
      const properties = dbfRecords[recordIndex] || {};
      features.push({
        type: "Feature",
        properties,
        geometry,
      });
    }
    recordIndex += 1;
    cursor = contentOffset + contentBytes;
  }

  return {
    type: "FeatureCollection",
    name: fileName.replace(/\.[^.]+$/, ""),
    features,
  };
}

function shapefileProjectionIsSupported(prjText = "") {
  if (!prjText.trim()) return true;
  const normalized = prjText
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ");
  return normalized.includes("WGS 1984")
    || normalized.includes("WGS 84")
    || normalized.includes("EPSG 4326")
    || normalized.includes("CRS84")
    || normalized.includes("GCS WGS 1984");
}

async function shapefileZipToGeoJson(arrayBuffer, fileName = "kartensammlung.zip") {
  const entries = await readZipEntries(arrayBuffer);
  const shpEntry = entries.find((entry) => entry.lowerName.endsWith(".shp"));
  if (!shpEntry) throw new Error("Im ZIP wurde keine .shp-Datei gefunden.");
  const baseName = getZipEntryBaseName(shpEntry.name);
  const dbfEntry = findMatchingZipEntry(entries, baseName, "dbf");
  const prjEntry = findMatchingZipEntry(entries, baseName, "prj");
  const cpgEntry = findMatchingZipEntry(entries, baseName, "cpg");
  const prjText = prjEntry ? new TextDecoder("utf-8").decode(prjEntry.bytes) : "";
  if (prjText && !shapefileProjectionIsSupported(prjText)) {
    throw new Error("Dieses Shapefile nutzt offenbar nicht WGS84/EPSG:4326. EarthMap importiert es erst, wenn eine Reprojektion ergänzt ist.");
  }
  const dbfRecords = dbfEntry ? parseDbf(dbfEntry.bytes) : [];
  const geoJson = parseShpToGeoJson(shpEntry.bytes, dbfRecords, shpEntry.name || fileName);
  geoJson.name = fileName.replace(/\.[^.]+$/, "");
  geoJson.ziselinImport = {
    format: "ESRI Shapefile",
    sourceFile: fileName,
    shpFile: shpEntry.name,
    dbfFile: dbfEntry?.name || "",
    prjFile: prjEntry?.name || "",
    cpgFile: cpgEntry?.name || "",
    projection: prjText ? "WGS84/CRS84 erkannt" : "keine .prj-Datei im ZIP; Koordinaten als WGS84 interpretiert",
  };
  return geoJson;
}

async function readBoundaryImportFile(file) {
  const extension = getFileExtension(file.name);
  if (extension === "kml") {
    return normalizeImportedBoundarySet(kmlToGeoJson(await file.text(), file.name), file.name);
  }
  if (extension === "kmz") {
    const kmlText = await extractKmlTextFromKmz(await file.arrayBuffer());
    return normalizeImportedBoundarySet(kmlToGeoJson(kmlText, file.name), file.name);
  }
  if (extension === "zip") {
    return normalizeImportedBoundarySet(await shapefileZipToGeoJson(await file.arrayBuffer(), file.name), file.name);
  }
  if (extension === "shp") {
    throw new Error("Bitte Shapefiles als ZIP importieren, damit .shp, .dbf und .prj gemeinsam erhalten bleiben.");
  }
  const raw = JSON.parse(await file.text());
  return normalizeImportedBoundarySet(raw, file.name);
}

function createInternalLicenseMetadata() {
  return {
    id: "unknown-internal-use-only",
    label: "Lizenz ungeklärt · nur intern nutzbar",
    url: "",
    detail: "Die Lizenz wurde beim Import nicht eindeutig erkannt. Vor Veröffentlichung oder Weitergabe muss sie geprüft werden.",
    source: "",
    compatibility: {
      wikimedia: false,
      openstreetmap: false,
      commercial_use: false,
      share_alike_required: false,
      attribution_required: true,
    },
  };
}

function geoJsonToFeatureCollection(raw, fileName = "kartensammlung.geojson") {
  const baseName = fileName.replace(/\.[^.]+$/, "") || "GeoJSON";
  if (raw?.type === "FeatureCollection" && Array.isArray(raw.features)) {
    return {
      ...raw,
      features: raw.features.filter((feature) => feature?.type === "Feature" && feature.geometry),
    };
  }
  if (raw?.type === "Feature" && raw.geometry) {
    return {
      type: "FeatureCollection",
      name: raw.properties?.name || raw.properties?.NAME || baseName,
      ziselinImport: raw.ziselinImport,
      features: [raw],
    };
  }
  if (raw?.type === "GeometryCollection" && Array.isArray(raw.geometries)) {
    return {
      type: "FeatureCollection",
      name: raw.name || baseName,
      ziselinImport: raw.ziselinImport,
      features: raw.geometries
        .filter(Boolean)
        .map((geometry, index) => ({
          type: "Feature",
          properties: { name: `${baseName} ${index + 1}` },
          geometry,
        })),
    };
  }
  const geometryTypes = new Set(["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"]);
  if (geometryTypes.has(raw?.type)) {
    return {
      type: "FeatureCollection",
      name: raw.name || baseName,
      ziselinImport: raw.ziselinImport,
      features: [{
        type: "Feature",
        properties: { name: raw.name || baseName },
        geometry: raw,
      }],
    };
  }
  if (Array.isArray(raw)) {
    const features = raw
      .flatMap((entry, index) => {
        const normalizedEntry = entry && typeof entry === "object"
          ? geoJsonToFeatureCollection({ ...entry, name: entry.name || `${baseName} ${index + 1}` }, fileName)
          : null;
        return normalizedEntry?.features || [];
      })
      .filter(Boolean);
    return { type: "FeatureCollection", name: baseName, features };
  }
  return null;
}

function normalizeImportedBoundarySet(raw, fileName = "kartensammlung.geojson") {
  if (!raw || typeof raw !== "object") throw new Error("Die Datei enthält kein lesbares JSON-Objekt.");
  if (raw.schema === EARTHMAP_BOUNDARY_SET_SCHEMA && Array.isArray(raw.features)) {
    const stableId = raw.stable_id || raw.id || slugifyBoundaryId(raw.title || fileName.replace(/\.[^.]+$/, "") || "boundary-set");
    const validFrom = raw.valid_from || "";
    const validTo = raw.valid_to || null;
    const boundarySet = {
      ...raw,
      schema: EARTHMAP_BOUNDARY_SET_SCHEMA,
      id: raw.id || stableId,
      stable_id: stableId,
      version_id: raw.version_id || createBoundaryVersionId(stableId, validFrom, validTo),
      title: repairLegacyText(raw.title || fileName.replace(/\.[^.]+$/, "") || "Importierte komplexe Karte"),
      provider: repairLegacyText(raw.provider || "manual-import"),
      review_status: raw.review_status || "imported",
      boundary_type: raw.boundary_type || "unknown",
      constitutional_status: raw.constitutional_status || raw.classification?.constitutional_status || "",
      valid_from: validFrom,
      valid_to: validTo,
      valid_precision: raw.valid_precision || "unknown",
      temporal_status: raw.temporal_status || (validFrom || validTo ? "historical" : "undated_reference"),
      data_binding: {
        ...createBoundaryDataBindingDefaults(),
        ...(raw.data_binding || {}),
      },
      source: raw.source || {
        label: "Importiertes Ziselin-Boundary-Set",
        url: "",
        accessed_at: new Date().toISOString(),
      },
      license: raw.license || createInternalLicenseMetadata(),
      wikidata_id: normalizeWikidataId(raw.wikidata_id || raw.wikidataId || ""),
      features: [],
    };
    boundarySet.features = raw.features
      .filter((feature) => feature?.geometry)
      .map((feature, index) => createImportedBoundaryFeature(feature, index, boundarySet));
    return boundarySet;
  }

  const geoJson = geoJsonToFeatureCollection(raw, fileName);
  if (!geoJson || !Array.isArray(geoJson.features)) {
    throw new Error("Bitte gültiges GeoJSON oder ein Ziselin-Boundary-Set-v1 importieren.");
  }

  const baseName = fileName.replace(/\.[^.]+$/, "");
  const setId = `import-${slugifyBoundaryId(baseName)}-${Date.now()}`;
  const stableId = `manual:${slugifyBoundaryId(baseName || "boundary-set")}`;
  const importedAt = new Date().toISOString();
  const importMetadata = geoJson.ziselinImport || raw.ziselinImport || {};
  const validFrom = importMetadata.valid_from || importMetadata.validFrom || "";
  const validTo = importMetadata.valid_to || importMetadata.validTo || null;
  const sourceFormat = repairLegacyText(importMetadata.format || "GeoJSON");
  const boundarySet = {
    schema: EARTHMAP_BOUNDARY_SET_SCHEMA,
    id: setId,
    stable_id: stableId,
    version_id: createBoundaryVersionId(stableId, validFrom, validTo),
    title: repairLegacyText(baseName || "Importierte komplexe Karte"),
    description: `Aus ${sourceFormat} importierte komplexe Karte. Metadaten, Lizenz und Wikidata-IDs sollten im nächsten Schritt geprüft und ergänzt werden.`,
    provider: "manual-import",
    provider_boundary_id: "",
    wikidata_id: normalizeWikidataId(raw.wikidata_id || raw.wikidataId || raw.properties?.wikidata_id || raw.properties?.WIKIDATA || ""),
    boundary_type: "unknown",
    constitutional_status: importMetadata.constitutional_status || "",
    country_iso3: "",
    admin_level: "",
    year_represented: "",
    valid_from: validFrom,
    valid_to: validTo,
    valid_precision: importMetadata.valid_precision || "unknown",
    temporal_status: importMetadata.temporal_status || (validFrom || validTo ? "historical" : "undated_reference"),
    temporal_note: "Beim Import automatisch angelegt. Der Gültigkeitszeitraum muss fachlich geprüft und gegebenenfalls präzisiert werden.",
    data_binding: createBoundaryDataBindingDefaults(),
    source: {
      label: repairLegacyText(importMetadata.source_label || importMetadata.sourceLabel || `Manueller ${sourceFormat}-Import`),
      url: importMetadata.source_url || importMetadata.sourceUrl || "",
      accessed_at: importedAt,
      source_data_update_date: importMetadata.source_data_update_date || importMetadata.sourceDataUpdateDate || "",
      build_date: importMetadata.build_date || importMetadata.buildDate || "",
    },
    license: {
      ...createInternalLicenseMetadata(),
      ...(importMetadata.license || {}),
    },
    review_status: "imported",
    features: [],
  };
  boundarySet.features = geoJson.features
    .filter((feature) => feature?.geometry)
    .map((feature, index) => createImportedBoundaryFeature({
      ...feature,
      properties: {
        ...(feature.properties || {}),
        ...(importMetadata.format ? { ziselin_import_format: importMetadata.format } : {}),
      },
    }, index, boundarySet));
  return boundarySet;
}

function createBoundaryCollectionItem(boundarySet, fileName = "") {
  const featureCount = boundarySet.features?.length || boundarySet.geometryStorage?.featureCount || 0;
  return normalizeLibraryItem({
    id: `collection-${slugifyBoundaryId(boundarySet.id || boundarySet.title || fileName)}-${Date.now()}`,
    kind: "boundary-collection",
    name: repairLegacyText(boundarySet.title || fileName || "komplexe Karte"),
    source: repairLegacyText(boundarySet.source?.label || boundarySet.provider || "Import"),
    iso3: boundarySet.country_iso3 || "",
    wikidataId: normalizeWikidataId(boundarySet.wikidata_id || ""),
    adminLevel: repairLegacyText(boundarySet.admin_level || boundarySet.boundary_type || "Boundary-Set"),
    detail: `${featureCount} Einheiten`,
    license: repairLegacyText(boundarySet.license?.label || "Lizenz ungeklärt"),
    sourceUrl: boundarySet.source?.url || "",
    temporalCoverage: {
      label: [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || boundarySet.year_represented || "Gültigkeit nicht geprüft",
      from: boundarySet.valid_from || "",
      to: boundarySet.valid_to || "",
    },
    display: {
      visible: true,
      color: "#d9dc8c",
      outlineColor: DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: {
      provider: "ziselin-geo-archive",
      schema: EARTHMAP_BOUNDARY_SET_SCHEMA,
      boundarySetId: boundarySet.id,
    },
    boundarySet,
  });
}

async function importBoundarySetFile(file) {
  try {
    const boundarySet = await readBoundaryImportFile(file);
    if (!boundarySet.features.length) throw new Error("Die komplexe Karte enthält keine importierbaren Geometrien.");
    state.pendingBoundarySetImport = {
      fileName: file.name,
      importedAt: new Date().toISOString(),
      boundarySet,
    };
    renderCollectionImportEditor();
    setEditorTab("collections");
  } catch (error) {
    console.error("Komplexe Karte konnte nicht geladen werden.", error);
    window.alert(`Komplexe Karte konnte nicht geladen werden: ${error?.message || "unbekannter Fehler"}`);
  }
}

async function openBoundarySetImportFolderPicker() {
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        id: "earthmap-imports",
        multiple: false,
        excludeAcceptAllOption: false,
        types: [{
          description: "EarthMap Kartenimporte",
          accept: {
            "application/geo+json": [".geojson"],
            "application/json": [".json"],
            "application/vnd.google-earth.kml+xml": [".kml"],
            "application/vnd.google-earth.kmz": [".kmz"],
            "application/zip": [".zip"],
          },
        }],
      });
      if (!handle) return;
      await importBoundarySetFile(await handle.getFile());
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
      console.warn("EarthMap Importordner-Picker konnte nicht geöffnet werden.", error);
    }
  }
  ui.boundarySetImportInput?.click();
}

async function addPendingBoundarySetToProject() {
  const project = getActiveProject();
  const folder = getLibraryFolder(project, "boundary-collections");
  if (!project || !folder) {
    window.alert("Bitte zuerst ein Earth-Map-Projekt anlegen oder aktivieren.");
    return;
  }
  const pending = state.pendingBoundarySetImport;
  if (!pending?.boundarySet) {
    window.alert("Bitte zuerst eine komplexe Karte importieren.");
    return;
  }
  try {
    const boundarySet = pending.boundarySet;
    const geometryStorage = await saveBoundarySetFeaturesToArchive(boundarySet);
    const lightweightBoundarySet = {
      ...boundarySet,
      geometryStorage,
      features: [],
    };
    const item = createBoundaryCollectionItem(lightweightBoundarySet, pending.fileName);
    folder.items.push(item);
    project.activeLibraryItemId = item.id;
    state.openFolderBrowserMenuId = null;
    if (!persistProjects()) {
      folder.items = folder.items.filter((candidate) => candidate.id !== item.id);
      project.activeLibraryItemId = "";
      throw new Error("Die Metadaten konnten nicht im Browser-Projektindex gespeichert werden. Die Geometrien liegen bereits im EarthMap-Archiv; bitte Projektindex prüfen.");
    }
    state.pendingBoundarySetImport = null;
    renderWorkspace();
    renderGlobe();
    openLibraryItemEditor(item);
  } catch (error) {
    console.error("Komplexe Karte konnte nicht übernommen werden.", error);
    window.alert(`Komplexe Karte konnte nicht übernommen werden: ${error?.message || "unbekannter Fehler"}`);
  }
}

function createLayerItemFromSearchResult(result) {
  const isNaturalEarth = result.source === "Natural Earth";
  const dataset = getNaturalEarthCountryDataset();
  const detail = result.datasetDetail || dataset.detail;
  return normalizeLibraryItem({
    id: `layer-${result.source.toLowerCase().replace(/\W+/g, "-")}-${result.iso3 || result.id}-${Date.now()}`,
    kind: "boundary-map",
    name: result.name,
    source: result.source,
    iso3: result.iso3,
    wikidataId: normalizeWikidataId(result.wikidataId || ""),
    adminLevel: result.level,
    detail: result.detail,
    license: result.license,
    sourceUrl: isNaturalEarth ? (result.datasetUrl || dataset.sourceUrl) : "",
    temporalCoverage: {
      label: "gegenwärtige Natural-Earth-Grundkarte",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: DEFAULT_LAYER_FILL_COLOR,
      outlineColor: DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: isNaturalEarth
      ? { provider: "natural-earth", detail, dataset: "admin_0_countries", iso3: result.iso3 }
      : null,
  });
}

async function addBoundaryLayerFromSearchResult(result) {
  const project = getActiveProject();
  const folder = getLibraryFolder(project, "boundary-maps");
  if (!project || !folder) return;
  if (result.source === "Natural Earth" && result.stableId) {
    const entry = getNaturalEarthAdmin0EngineEntryByArchiveKey(result.stableId);
    if (entry) await loadNaturalEarthAdmin0EngineFeature(entry);
  }
  const item = createLayerItemFromSearchResult(result);
  const duplicate = getLibraryFolderItems(folder).find((candidate) => (
    candidate.source === item.source
    && candidate.iso3 === item.iso3
    && candidate.adminLevel === item.adminLevel
    && candidate.detail === item.detail
  ));
  const activeItem = duplicate || item;
  if (!duplicate) folder.items.push(item);
  project.activeLibraryItemId = activeItem.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
  openLibraryItemEditor(activeItem);
}

function createBoundarySearchCard(result) {
  const card = document.createElement("article");
  card.className = "search-result-card";
  const head = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = result.name;
  const meta = document.createElement("span");
  meta.textContent = `${result.source} · ${result.level} · ${result.detail}`;
  head.append(title, meta);

  const license = document.createElement("p");
  license.textContent = `Lizenz/Status: ${result.license} · ${result.importStatus}`;

  const action = document.createElement("button");
  action.type = "button";
  action.className = "secondary-button";
  action.textContent = "Hinzufügen";
  action.title = result.apiUrl || "In die Projektbibliothek übernehmen.";
  action.addEventListener("click", () => { void addBoundaryLayerFromSearchResult(result); });

  card.append(head, license, action);
  return card;
}

async function renderBoundarySearchResults() {
  const query = ui.boundarySearchInput?.value?.trim() || "";
  const useNaturalEarth = Boolean(document.getElementById("sourceNaturalEarth")?.checked);
  if (!query) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Bitte Suchbegriff eingeben.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  if (useNaturalEarth) await ensureNaturalEarthSearchBaseLoaded();
  const results = useNaturalEarth ? searchNaturalEarthCountries(query) : [];
  if (!results.length) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Keine Natural-Earth-Treffer gefunden. Tipp: Auch ISO-3-Codes wie DEU, FRA oder BRA funktionieren.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  ui.boundarySearchResults.replaceChildren(...results.map(createBoundarySearchCard));
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
ui.themeToggleButton?.addEventListener("click", toggleTheme);
ui.saveSearchLayerButton?.addEventListener("click", saveCurrentMapSearchToProject);
ui.exportProjectButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  setExportMenuOpen(ui.exportProjectButton.getAttribute("aria-expanded") !== "true");
});
ui.exportMenu?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-export-format]") : null;
  if (!button) return;
  handleExportFormat(button.dataset.exportFormat);
});
let viewDrawerDrag = null;
ui.viewToolsDrawerTab?.addEventListener("pointerdown", (event) => {
  viewDrawerDrag = {
    pointerId: event.pointerId,
    startY: event.clientY,
    moved: false,
  };
  ui.viewToolsDrawerTab.setPointerCapture?.(event.pointerId);
});
ui.viewToolsDrawerTab?.addEventListener("pointermove", (event) => {
  if (!viewDrawerDrag || viewDrawerDrag.pointerId !== event.pointerId) return;
  const deltaY = event.clientY - viewDrawerDrag.startY;
  if (Math.abs(deltaY) < 10) return;
  viewDrawerDrag.moved = true;
  if (deltaY < -18) setViewToolsDrawerOpen(true);
  if (deltaY > 18) setViewToolsDrawerOpen(false);
});
ui.viewToolsDrawerTab?.addEventListener("pointerup", (event) => {
  if (!viewDrawerDrag || viewDrawerDrag.pointerId !== event.pointerId) return;
  const wasDrag = viewDrawerDrag.moved;
  viewDrawerDrag = null;
  if (!wasDrag) setViewToolsDrawerOpen(!state.viewToolsDrawerOpen);
});
ui.viewToolsDrawerTab?.addEventListener("pointercancel", () => {
  viewDrawerDrag = null;
});
ui.graticuleToggle?.addEventListener("click", () => setGraticuleVisible(state.showGraticule !== true));
ui.admin1Toggle?.addEventListener("click", () => setAdmin1BoundariesVisible(state.showAdmin1Boundaries !== true));
ui.projectionToggle?.addEventListener("click", toggleMapProjectionMode);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setExportMenuOpen(false);
    setViewToolsDrawerOpen(false);
    setBrowserActionsMenuOpen(false);
    if (state.openLayerBrowserMenuId) {
      state.openLayerBrowserMenuId = null;
      resetLayerDeleteHold();
      renderProjectBrowser();
    }
    if (state.openProjectBrowserMenuId) {
      state.openProjectBrowserMenuId = null;
      resetProjectDeleteHold();
      renderProjectBrowser();
    }
    if (state.openFolderBrowserMenuId) {
      state.openFolderBrowserMenuId = null;
      renderProjectBrowser();
    }
  }
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".export-control")) return;
  if (event.target instanceof Element && event.target.closest(".app-view-drawer")) return;
  if (event.target instanceof Element && event.target.closest(".project-card-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".layer-row-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".browser-actions-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".earthmap-search-wrap")) return;
  setExportMenuOpen(false);
  setViewToolsDrawerOpen(false);
  setMapSearchInfoOpen(false);
  setBrowserActionsMenuOpen(false);
  if (state.openLayerBrowserMenuId) {
    state.openLayerBrowserMenuId = null;
    resetLayerDeleteHold();
    renderProjectBrowser();
  }
  if (state.openProjectBrowserMenuId) {
    state.openProjectBrowserMenuId = null;
    resetProjectDeleteHold();
    renderProjectBrowser();
  }
  if (state.openFolderBrowserMenuId) {
    state.openFolderBrowserMenuId = null;
    renderProjectBrowser();
  }
});

ui.editorBackButton?.addEventListener("click", () => {
  if (state.editorMode === "tool" && state.activeEditorTab === "gearbox" && state.gearBoxModeAction) {
    state.gearBoxModeAction = null;
    ensureGearBoxDraft().activeTab = "editor";
    setEditorTab("gearbox", { mode: "tool" });
    renderGearBoxPanel();
    return;
  }
  setEditorTab(state.previousToolEditorTab || "background", { mode: "tool" });
});

ui.gearBoxCreateButton?.addEventListener("click", () => {
  state.gearBoxModeAction = "create";
  state.gearBoxWorkSource = "create";
  ensureGearBoxDraft().activeTab = "editor";
  renderEditorTabs();
  renderGearBoxPanel();
  updateEditorModeView();
});
ui.gearBoxGenerateButton?.addEventListener("click", () => {
  state.gearBoxModeAction = "generate";
  state.gearBoxWorkSource = "generate";
  ensureGearBoxDraft().activeTab = "editor";
  renderEditorTabs();
  renderGearBoxPanel();
  updateEditorModeView();
});
ui.gearBoxCsvCodeButton?.addEventListener("click", () => {
  state.gearBoxModeAction = "work";
  ensureGearBoxDraft().activeTab = "csv";
  renderEditorTabs();
  renderGearBoxPanel();
  updateEditorModeView();
});
ui.gearBoxCsvFileInput?.addEventListener("change", async () => {
  const file = ui.gearBoxCsvFileInput.files?.[0];
  ui.gearBoxCsvFileInput.value = "";
  if (!file) return;
  const draft = ensureGearBoxDraft();
  const extension = getFileExtension(file.name);
  const text = await file.text();
  if (extension === "json") {
    const parsed = JSON.parse(text);
    if (parsed?.schema === EARTHMAP_GEARBOX_SCHEMA) {
      draft.title = repairLegacyText(parsed.title || draft.title);
      draft.targetBoundarySetVersionId = parsed.target_boundary_set?.version_id || draft.targetBoundarySetVersionId;
      draft.delimiter = parsed.input?.delimiter || draft.delimiter;
      draft.hasHeader = parsed.input?.has_header !== false;
      draft.tableKey = parsed.join?.table_key || draft.tableKey;
      draft.boundaryKey = parsed.join?.boundary_key || draft.boundaryKey;
      draft.valueKey = parsed.values?.[0]?.table_key || draft.valueKey;
      draft.valueType = parsed.values?.[0]?.type || draft.valueType;
      draft.valueUnit = parsed.values?.[0]?.unit || draft.valueUnit;
      draft.sourceLabel = parsed.source?.label || draft.sourceLabel;
      draft.sourceUrl = parsed.source?.url || draft.sourceUrl;
    } else {
      draft.csvCode = text;
    }
  } else {
    draft.delimiter = extension === "tsv" ? "\t" : draft.delimiter || ";";
    draft.csvCode = text;
  }
  draft.activeTab = "csv";
  state.gearBoxModeAction = "work";
  evaluateGearBoxDraft(draft);
  renderEditorTabs();
  renderGearBoxPanel();
  updateEditorModeView();
});

ui.boundarySearchButton?.addEventListener("click", renderBoundarySearchResults);
ui.boundarySearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") renderBoundarySearchResults();
});
function setMapSearchInfoOpen(open) {
  ui.mapSearchInfoPopup?.toggleAttribute("hidden", !open);
  ui.mapSearchInfoButton?.setAttribute("aria-expanded", open ? "true" : "false");
}

ui.mapSearchInfoButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setMapSearchInfoOpen(ui.mapSearchInfoPopup?.hasAttribute("hidden") ?? true);
});
ui.mapSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    clearTimeout(mapSearchDebounceTimer);
    void applyMapSearchQuery(ui.mapSearchInput.value);
  }
  if (event.key === "Escape") {
    if (!ui.mapSearchInfoPopup?.hasAttribute("hidden")) {
      setMapSearchInfoOpen(false);
      return;
    }
    ui.mapSearchInput.value = "";
    populateMapSearchOptions("");
    clearMapSearchHighlight();
  }
});
ui.mapSearchInput?.addEventListener("change", () => {
  clearTimeout(mapSearchDebounceTimer);
  populateMapSearchOptions(ui.mapSearchInput.value);
  void applyMapSearchQuery(ui.mapSearchInput.value);
});
ui.mapSearchInput?.addEventListener("input", () => {
  populateMapSearchOptions(ui.mapSearchInput.value);
  if (!ui.mapSearchInput.value.trim()) {
    clearTimeout(mapSearchDebounceTimer);
    clearMapSearchHighlight();
    return;
  }
  // Kleine Bedienhilfe: Bei freien Eingaben suchen wir nicht aggressiv bei
  // jedem Tastendruck, aber nach einer kurzen Pause. Enter bleibt der präzise
  // Weg für bewusst gesetzte Suchbegriffe.
  clearTimeout(mapSearchDebounceTimer);
  mapSearchDebounceTimer = setTimeout(() => {
    void applyMapSearchQuery(ui.mapSearchInput.value);
  }, MAP_SEARCH_INPUT_DEBOUNCE_MS);
});
ui.mapSearchInput?.addEventListener("focus", () => {
  populateMapSearchOptions(ui.mapSearchInput.value);
});

ui.openWorkspaceButton.addEventListener("click", () => setWorkspaceMode("details"));
ui.openWorkspaceButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setWorkspaceMode("details");
  }
});
ui.returnPreviewButton.addEventListener("click", () => setWorkspaceMode("preview"));
ui.fullscreenButton?.addEventListener("pointerup", (event) => {
  event.stopPropagation();
});
ui.fullscreenButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  void toggleFullscreen();
});
document.addEventListener("fullscreenchange", updateFullscreenButtonState);
ui.browserActionsMenuButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setBrowserActionsMenuOpen(!state.browserActionsMenuOpen);
});
document.querySelectorAll("[data-layout-cycle-button]").forEach((button) => {
  button.addEventListener("click", cycleDetailsLayoutMode);
});
ui.newProjectButton?.addEventListener("click", () => {
  setBrowserActionsMenuOpen(false);
  const project = normalizeProject(createEarthMapProject());
  state.projects.push(project);
  state.activeProjectId = project.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
});
ui.importBoundarySetButton?.addEventListener("click", () => {
  setBrowserActionsMenuOpen(false);
  ui.boundarySetImportInput?.click();
});
ui.importBoundarySetFromFolderButton?.addEventListener("click", () => {
  setBrowserActionsMenuOpen(false);
  openBoundarySetImportFolderPicker();
});
ui.boundarySetImportInput?.addEventListener("change", async () => {
  const file = ui.boundarySetImportInput.files?.[0];
  ui.boundarySetImportInput.value = "";
  if (!file) return;
  await importBoundarySetFile(file);
});
ui.addCollectionToProjectButton?.addEventListener("click", addPendingBoundarySetToProject);
ui.projectBrowserList.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".project-card-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".browser-visibility-checkbox")) return;
  if (event.target instanceof Element && event.target.closest(".browser-row-action")) return;
  const layerCard = event.target.closest("[data-library-item-id]");
  if (layerCard) {
    const projectCard = layerCard.closest("[data-project-id]");
    const project = state.projects.find((candidate) => candidate.id === projectCard?.dataset.projectId) || getActiveProject();
    if (!project) return;
    state.activeProjectId = project.id;
    project.activeLibraryItemId = layerCard.dataset.libraryItemId || "";
    state.openProjectBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    persistProjects();
    renderWorkspace();
    renderGlobe();
    openLibraryItemEditor(project.activeLibraryItemId ? getActiveLibraryItem(project) : null);
    return;
  }
  const subfolderRow = event.target.closest("[data-subfolder-id]");
  if (subfolderRow) {
    const project = state.projects.find((candidate) => candidate.id === subfolderRow.dataset.projectId) || getActiveProject();
    const folderType = subfolderRow.dataset.folderType || "";
    const subfolderId = subfolderRow.dataset.subfolderId || "";
    if (!project || !folderType || !subfolderId) return;
    state.openProjectBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    persistProjects();
    openSubfolderEditor(project, folderType, subfolderId);
    renderGlobe();
    return;
  }
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  state.activeProjectId = card.dataset.projectId;
  state.openProjectBrowserMenuId = null;
  state.openFolderBrowserMenuId = null;
  state.openLayerBrowserMenuId = null;
  resetProjectDeleteHold();
  resetLayerDeleteHold();
  persistProjects();
  rehydrateSavedSearchLayers(getActiveProject(), { persist: true });
  renderWorkspace();
  openProjectEditor(getActiveProject());
});
ui.projectBrowserList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const targetRow = event.target instanceof Element
    ? event.target.closest("[data-library-item-id], [data-subfolder-id]")
    : null;
  if (!targetRow) return;
  event.preventDefault();
  targetRow.click();
});
ui.libraryBrowserList?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-library-item-id]");
  if (!card) return;
  const project = getActiveProject();
  if (!project) return;
  project.activeLibraryItemId = card.dataset.libraryItemId || "";
  persistProjects();
  renderWorkspace();
  renderGlobe();
  openLibraryItemEditor(getActiveLibraryItem(project));
});

ui.globe.addEventListener("pointerdown", (event) => {
  markGlobeNavigationActive();
  activeGlobePointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });
  if (!beginPinchZoomIfReady()) {
    resetSinglePointerDragFrom(activeGlobePointers.get(event.pointerId));
  }
  ui.globe.setPointerCapture?.(event.pointerId);
});

ui.globe.addEventListener("pointermove", (event) => {
  if (activeGlobePointers.has(event.pointerId)) {
    activeGlobePointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });
  }
  if (pinchState && activeGlobePointers.size >= 2) {
    markGlobeNavigationActive();
    const pointers = getActiveGlobePointerList();
    const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
    const zoomFactor = distance / Math.max(1, pinchState.startDistance);
    globeZoom = clamp(pinchState.startZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
    const latitudeLimit = getLatitudeNavigationLimit();
    rotation.lat = clamp(rotation.lat, -latitudeLimit, latitudeLimit);
    scheduleGlobeRender();
    scheduleNaturalEarthDetailUpdate(980);
    return;
  }
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  markGlobeNavigationActive();
  // Bedienregel: Dragging orientiert sich an der sichtbaren Kugeloberfläche,
  // nicht an einer festen Grad-pro-Pixel-Konstante. Ein Maus-Pixel wird aus dem
  // aktuellen Projektionsradius in Rotationsgrade übersetzt; dadurch läuft die
  // Karte bei kleinem Zoom nicht voraus und bleibt im Tiefzoom nah an der Hand.
  const rect = ui.globe.getBoundingClientRect();
  const baseSize = Math.max(1, Math.min(rect.width || 1, rect.height || 1));
  const radius = Math.max(1, baseSize * 0.47 * globeZoom);
  const degreesPerPixel = 1.22 / (radius * DEG);
  const lonLatitudeFactor = 1 / Math.max(0.38, Math.cos(rotation.lat * DEG));
  const latitudeLimit = getLatitudeNavigationLimit();
  rotation.lon = dragState.startRotation.lon - (event.clientX - dragState.startX) * degreesPerPixel * lonLatitudeFactor;
  rotation.lat = clamp(dragState.startRotation.lat + (event.clientY - dragState.startY) * degreesPerPixel, -latitudeLimit, latitudeLimit);
  scheduleGlobeRender();
});

ui.globe.addEventListener("wheel", (event) => {
  event.preventDefault();
  markGlobeNavigationActive();
  const zoomFactor = Math.exp(-event.deltaY * 0.0014);
  globeZoom = clamp(globeZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
  const latitudeLimit = getLatitudeNavigationLimit();
  rotation.lat = clamp(rotation.lat, -latitudeLimit, latitudeLimit);
  scheduleGlobeRender();
  scheduleNaturalEarthDetailUpdate(980);
}, { passive: false });

["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
  ui.globe.addEventListener(type, (event) => {
    activeGlobePointers.delete(event.pointerId);
    if (activeGlobePointers.size >= 2) {
      beginPinchZoomIfReady();
    } else if (activeGlobePointers.size === 1) {
      pinchState = null;
      resetSinglePointerDragFrom(getActiveGlobePointerList()[0]);
    } else {
      pinchState = null;
      dragState = null;
    }
    markGlobeNavigationActive();
    scheduleNaturalEarthDetailUpdate(760);
  });
});

window.addEventListener("resize", () => {
  setDetailsLayoutMode(state.detailsLayoutMode);
  mapLibreEngineState.map?.resize?.();
  syncMapLibreCamera();
  scheduleGlobeRender();
});
setTheme(getStoredTheme(), false);
syncViewToolsControls();
setViewToolsDrawerOpen(false);
populateMapSearchOptions();
renderWorkspace();
initializeMapLibreEnginePilot();
rehydrateSavedSearchLayers(getActiveProject(), { persist: true });
renderGlobe();
scheduleNaturalEarthDetailUpdate(window.matchMedia?.("(max-width: 760px)")?.matches ? 900 : 40);
scheduleNaturalEarthBackgroundAssets();
scheduleHeavyMapLayerWorkActivation(window.matchMedia?.("(max-width: 760px)")?.matches ? 4200 : 2600);
if (!hasD3Geo) buildLandSamplesDeferred();

