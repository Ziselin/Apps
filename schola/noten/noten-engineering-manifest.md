# Noten Engineering Manifest

## Präambel

Noten ist eine Schola-App zur nachvollziehbaren Erfassung, Berechnung und Darstellung schulischer Bewertungen und der dafür benötigten Bewertungsmodelle.

Dieses Manifest regelt den spezifischen Kompetenzbereich der Schola-App Noten. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest.

## Zuständigkeit

Noten verantwortet seine fachliche Bewertungs-, Berechnungs- und Darstellungslogik sowie die dazugehörigen Datenmodelle und Bedienabläufe.

## Organisationsregeln

- App-spezifischer Code und ausschließlich von Noten verwendete Ressourcen bleiben im Ordner `schola/noten`.
- Appübergreifende UI-Vorlagen werden aus `assets/ui` eingebunden und nicht lokal dupliziert.
- Neue fachliche oder organisatorische Noten-Regeln werden in diesem Manifest dokumentiert.
- Erkannte Konflikte mit übergeordneten Manifesten werden vor einer Implementierungsänderung gemeinsam geklärt.
