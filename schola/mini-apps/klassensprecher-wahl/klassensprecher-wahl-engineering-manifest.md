# Klassensprecher-Wahl Engineering Manifest

Die MiniApp führt eine Klasse schrittweise durch Information, Wahlvorbereitung, Kandidaturen, geheime Stimmabgabe, Auszählung und Ergebnisannahme.

## Fachliche Regeln

- Die Wahl ist grundsätzlich geheim; eine offene Abstimmung per Handzeichen ist nur mit Einverständnis aller anwesenden Wahlberechtigten zulässig.
- Kandidaturen werden erst nach Zustimmung der vorgeschlagenen Person zugelassen.
- Der Wahlausschuss besteht mindestens aus Wahlleitung und Schriftführung; Kandidierende dürfen ihm nicht angehören.
- Bei der ersten Wahlversammlung muss mindestens die Hälfte der Wahlberechtigten anwesend sein. Eine einmal wiederholte Wahlversammlung kann unabhängig von der Anwesenheitszahl durchgeführt werden.
- Klassensprecher und Stellvertretung werden getrennt gewählt; die gewählte Sprecherperson steht für die Stellvertretung nicht mehr zur Verfügung.
- Gewählt ist, wer die meisten gültigen Stimmen erhält. Nur bei Stimmengleichheit findet zwischen den Gleichplatzierten eine Stichwahl statt; bei erneutem Gleichstand entscheidet das Los der Wahlleitung.
- Sieger werden ausschließlich aus der Auszählung abgeleitet. Die gewählte Person wird grün, Stichwahlkandidierende werden gelb und eine Überschreitung der Anwesenheitszahl wird rot markiert und blockiert den Fortgang.
- Ungültige Stimmen werden in jedem Wahlgang getrennt erfasst.
- Die MiniApp erfasst ausschließlich Auszählungsergebnisse, niemals individuelle Wahlentscheidungen.
- Zustände werden nur lokal im Browser gespeichert. Wahlzettel sind anonyme Druckansichten.

## Gestaltung und Einbettung

- Die eigenständige Ansicht folgt der gemeinsamen Schola-Farb-, Karten- und Navigationssprache.
- Das zentrale Icon liegt unter `assets/klassensprecher-wahl-icon.svg`.
- Druckansichten sind auf A4 ausgelegt und verwenden mindestens 9 pt Schriftgröße. Die App berechnet aus der benötigten Listenhöhe automatisch, ob 12, 10, 8, 6, 4 oder 2 Wahlzettel auf eine Seite passen, und nutzt die höchste passende Belegung.
- Der Abschluss erzeugt eine Wahlniederschrift mit Wahlberechtigten, Anwesenheit, Wahlform, Auszählungen, Gewählten, Annahme sowie Unterschriften von Wahlleitung und Schriftführung. Die Namensliste der Anwesenden wird als Anlage geführt.
- Das Protokoll steht als Kurzform mit Kandidatenanzahl, Gewinner und Stimmenanteil sowie als Langform mit allen Kandidatennamen und Auszählungstabellen zur Verfügung.
