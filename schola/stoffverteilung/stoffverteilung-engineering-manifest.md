# Stoffverteilung Engineering Manifest

## Aufgabe

Stoffverteilung ist eine Schola-Hauptapp für die kompetenzorientierte Jahresplanung. Sie liest einen Stundenplan-Projektordner über dessen stabile Kalender-ID (`SP1:<Projekt-ID>`) und erzeugt daraus getrennte Fachpläne je Klasse oder Kurs.

## Fachliche Regeln

- Grundlage sind tatsächliche Unterrichtstermine, nicht pauschale Wochenkontingente. Stundenplanversionen, A/B-Wochen, epochaler Unterricht, Schuljahresgrenzen und schulbezogene Ferien werden berücksichtigt.
- Ferien und schulfreie Tage bleiben im zeitlichen Verlauf sichtbar, erhöhen aber nicht das Stundenbudget.
- Jede Unterrichtszeile trennt Thema, Kompetenzerwartung, Umsetzung/Material und Diagnose/Leistung. Ein Status dokumentiert Plan und Wirklichkeit.
- Ein Plan kann eine Rahmenplanquelle, ein Jahresziel und eine frei wählbare Planungsreserve führen. Rahmenplan-Stundenangaben sind Orientierung, nicht automatisch bindende Einzelstundenvorgaben.
- Kalenderdaten bleiben Eigentum von Stundenplan. Stoffverteilung speichert ausschließlich ihre Planungsdaten unter `schola-stoffverteilung-plans-v1` und kann sie reproduzierbar als JSON exportieren.

## Fachliche Herleitung

- KMK-Bildungsstandards richten Unterricht auf den langfristigen und schrittweisen Kompetenzerwerb aus; Inhalte dienen als Weg zur Kompetenzentwicklung.
- Rahmenpläne Mecklenburg-Vorpommerns weisen verbindliche Themen, Inhalte, Kompetenzen, Orientierungsstunden und Umsetzungshinweise aus. Die Themenreihenfolge ist empfehlend; in aktuellen Fachplänen belegen die Themen typischerweise ungefähr 80 Prozent der verfügbaren Unterrichtszeit und lassen pädagogischen Gestaltungsspielraum.
- Daher führt die App Kompetenzen und Inhalte gemeinsam, hält eine Reserve vor und trennt Sollplanung vom dokumentierten Status.

## Weiterentwicklung

Künftige Importe amtlicher Rahmenpläne benötigen eine versionierte Profilstruktur mit Bundesland, Schulart, Fach, Jahrgang, Gültigkeit, Fundstelle und originaler Gliederung. Automatische Zuordnungen dürfen Vorschläge sein, nicht stillschweigend verbindliche Fachentscheidungen.
