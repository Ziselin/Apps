# Ziselin – UI-Symbole

Dieser Ordner enthält die zentralen, app-neutralen Symbolvorlagen des Ziselin-UI-Systems. Funktional gleiche Aktionen verwenden projektweit dasselbe Symbol; Apps zeichnen dafür keine eigenen Varianten nach.

## Bestand

- `settings.svg` – Einstellungen; Material Design Icons `cog-outline` von Pictogrammers, Apache-2.0-Lizenz, lokal gespeichert für den Offline-Betrieb.

Die Symbole werden vorzugsweise über die Klassen in `assets/ui/buttons.css` eingebunden. Farbe und Größe werden dabei durch `currentColor` und die Variable `--z-button-icon-size` an die jeweilige Oberfläche angepasst.
