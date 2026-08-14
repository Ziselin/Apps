# TypeMap Engineering Manifest

## Präambel

TypeMap dient der strukturierten Bearbeitung und Darstellung von Texten. Die App verbindet Dokumenteigenschaften, stabile IDs, HTML-Ausgabe und die Übergabe gerenderter Texte an andere Anwendungen.

Dieses Manifest regelt den spezifischen Kompetenzbereich der App TypeMap. Es ergänzt das Ziselin-Organisationsmanifest und das Atlas-Projektmanifest.

## Zuständigkeit

TypeMap verantwortet Textstruktur, Textdarstellung, Dokumenteigenschaften, stabile Dokument-IDs sowie Export und Übergabe gerenderter Texte an andere Apps.

## Organisationsregeln

- App-spezifischer Code und ausschließlich von TypeMap verwendete Ressourcen bleiben im Ordner `atlas/typemap`.
- Appübergreifende UI-Vorlagen werden aus `assets/ui` eingebunden und nicht lokal dupliziert.
- Appübergreifende Dokument-IDs bleiben allgemein benannt und dürfen nicht an einen einzelnen Verbraucher gekoppelt werden.
- Neue fachliche oder organisatorische TypeMap-Regeln werden in diesem Manifest dokumentiert.
- Erkannte Konflikte mit übergeordneten Manifesten werden vor einer Implementierungsänderung gemeinsam geklärt.
