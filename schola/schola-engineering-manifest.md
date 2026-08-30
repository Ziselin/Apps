# Schola Engineering Manifest

## Präambel

Schola bündelt digitale Werkzeuge für Unterricht, Leistungsbewertung und schulische Organisation. Die Anwendungen teilen eine ruhige, konsistente Bedien- und Gestaltungssprache und richten sich an den praktischen Einsatz im schulischen Alltag.

Dieses Manifest hält die gemeinsamen Regeln des Projekts Schola fest. Es gilt für Classroom Screen, Noten und Stundenplan und ergänzt das Ziselin-Organisationsmanifest.

## Stellung in der Manifestordnung

Dieses Manifest konkretisiert die projektweiten Regeln für den Kompetenzbereich Schola. Es besitzt keine Regelungskompetenz für Atlas oder andere Ziselin-Projekte. Die Manifestdateien der einzelnen Schola-Apps regeln deren besondere fachliche Anforderungen. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt und nicht stillschweigend überschrieben.

## Projektstruktur

- Die Schola-Apps liegen unter `schola/classroom`, `schola/noten`, `schola/stundenplan` und `schola/stoffverteilung`; eigenständig nutzbare Mini-Apps liegen unter `schola/mini-apps`.
- Das Schola-Projektmanifest liegt direkt unter `schola/schola-engineering-manifest.md`.
- App-spezifische Dateien und Hilfsprogramme bleiben in der jeweiligen App.
- Appübergreifende UI-Vorlagen werden aus `assets/ui` eingebunden und nicht in Schola-Appordnern dupliziert.
- Das aus TimeMap abgeleitete Hauptmenü ist die verbindliche Schola-Vorlage; Struktur und Bedienlogik bleiben einheitlich, Inhalte werden appbezogen formuliert.

## Gemeinsame Schola-Grundsätze

- Schola-Apps verwenden ein zusammengehöriges Appsystem und orientieren sich an gemeinsamen Navigations-, Darstellungs- und Interaktionsmustern.
- Fachlogik bleibt in der zuständigen App; gemeinsam nutzbare UI- und Austauschmuster werden zentral geführt.
- Exporte müssen die für eine spätere Wiederherstellung erforderlichen fachlichen Zustände sichern.
- Neue projektweite Schola-Regeln werden in diesem Manifest dokumentiert; app-spezifische Regeln gehören in das jeweilige App-Manifest.

## Mini-Apps

- Die Schola-Hauptseite zeigt vollständige Apps und eigenständig erreichbare Mini-Apps gemeinsam auf einer Seite. Haupt-Apps stehen in einem eigenen Abschnitt oben, Mini-Apps in gleicher Kachelform direkt darunter.
- Einen Umschalter oder getrennte Sammlungsseiten für Mini-Apps gibt es nicht. Suche und Navigation erfassen beide Abschnitte gemeinsam.
- Mini-Apps sind eigenständige fachliche Einheiten mit eigenem Manifest und Changelog. Sie können allein oder eingebettet in Schola- und später gegebenenfalls Atlas-Apps ausgeführt werden.
- Eine Mini-App besitzt genau eine fachliche Implementierung. Einbettungen dürfen Host-spezifische Oberflächen ergänzen, aber keine unabhängigen Kopien der Mini-App-Logik führen.
- Eigenständige Mini-App-Ansichten zeigen nur die für Steuerung und Funktion erforderliche Oberfläche und keinen Browser-/Editor-Arbeitsbereich einer einbettenden App.
- Die Mini-Apps-Sammlung der Schola-Hauptseite ist der verbindliche Katalog und die visuelle Referenz für Mini-App-Namen und -Icons. Einbettende Apps verwenden dieselben zentral unter `assets` geführten Icondateien; sie bilden diese Symbole nicht lokal oder per CSS nach.

## Icon-Gestaltung

- Alle Schola-App-Icons bilden eine zusammengehörige Familie und werden als reduzierte, flächige SVG-Grafiken angelegt.
- Das gemeinsame Grundformat ist eine quadratische Zeichenfläche mit `viewBox="0 0 128 128"` und einer stark abgerundeten Hintergrundfläche (`rx="28"`).
- Die verbindlichen Grundfarben der bestehenden Icon-Familie sind warmes Off-White `#eeeee7` für den Hintergrund, helles Off-White `#f8f8f3` für innere Flächen und dunkles Schola-Grün `#213633` für Konturen, Zeichen und Schrift.
- Konturen verwenden grundsätzlich eine kräftige, gleichmäßige Linienführung von `4` Einheiten. Abweichungen, etwa `5` Einheiten für kleine tragende Details, sind nur zulässig, wenn sie die Lesbarkeit bei kleiner Darstellung verbessern.
- Linienenden und Ecken werden weich beziehungsweise abgerundet gestaltet. Die Formsprache bleibt ruhig, geometrisch und ohne dekorative Effekte, Verläufe oder fotografische Elemente.
- Jedes Icon verwendet ein einzelnes, unmittelbar verständliches Bildmotiv für die jeweilige App. Details werden auf das für die Wiedererkennbarkeit notwendige Maß begrenzt.
- Typografie innerhalb eines Icons verwendet `Arial, Helvetica, sans-serif` und das dunkle Schola-Grün. Text wird nur eingesetzt, wenn er selbst das zentrale Bildzeichen ist.
- Neue oder überarbeitete Icons müssen auch in kleiner App-Darstellung klar erkennbar sein und hinsichtlich Randabständen, optischem Gewicht und Motivgröße neben den bestehenden Schola-Icons ausgewogen wirken.
- App-spezifische Akzentfarben sind möglich, dürfen die gemeinsame Grundpalette und Formsprache jedoch nicht verdrängen. Eine Erweiterung der projektweiten Icon-Farbwelt wird zuerst in diesem Manifest dokumentiert.
