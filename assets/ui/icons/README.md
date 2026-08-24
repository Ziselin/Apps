# Ziselin – UI-Symbole

Dieser Ordner enthält die zentralen, app-neutralen Symbolvorlagen des Ziselin-UI-Systems. Funktional gleiche Aktionen verwenden projektweit dasselbe Symbol; Apps zeichnen dafür keine eigenen Varianten nach.

## Bestand

- `settings.svg` – Einstellungen; Material Design Icons `cog-outline` von Pictogrammers, Apache-2.0-Lizenz, lokal gespeichert für den Offline-Betrieb.
- `information.svg` – Informationen; Material Design Icons `information-outline` von Pictogrammers, Apache-2.0-Lizenz, lokal gespeichert für den Offline-Betrieb.

Die Symbole werden vorzugsweise über die Klassen in `assets/ui/buttons.css` eingebunden. Farbe und Größe werden dabei durch `currentColor` und die Variable `--z-button-icon-size` an die jeweilige Oberfläche angepasst. Für den Betrieb über `file://` enthält die CSS-Vorlage zusätzlich eingebettete Masken derselben Pfade; so muss der Browser keine lokale SVG-Unterressource nachladen.

Die Symbole `menu.svg`, `menu-projects.svg`, `menu-help.svg`, `menu-data.svg` und `menu-description.svg` gehören zur zentralen Hauptmenüvorlage in `assets/ui/app-menu.css` und `assets/ui/app-menu.js`.
