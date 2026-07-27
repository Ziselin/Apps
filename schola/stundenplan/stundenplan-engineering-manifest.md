# Stundenplan Engineering Manifest

Dieses Manifest hält die fachlichen und technischen Regeln der Schola-App „Stundenplan“ fest. Es ergänzt die allgemeinen Architekturregeln um Anforderungen an Schuljahre, Kalenderschichten, Stundenpläne und deren Quellen.

## 1. Ein Projektordner bündelt Kalenderschichten

- Ein Projektordner ist die fachliche Einheit eines Stundenplanprojekts.
- Ferien, individuelle Projekte, klassenbezogene Projekttage und spätere Stundenplandaten bleiben getrennte Kalenderschichten.
- Die Kalenderansicht wird aus den aktiven Schichten erzeugt; sie ist nicht selbst die Datenquelle.
- Export und Stundenbilanz müssen aus denselben normalisierten Projektdaten reproduzierbar erzeugt werden können.

## 2. Das Schuljahr bestimmt den Kalenderzeitraum

- Ein Schuljahr wird intern mit Anfangs- und Endjahr gespeichert und in der Oberfläche verkürzt angezeigt, zum Beispiel `2026/27`.
- Der sichtbare Kalenderzeitraum wird künftig aus den tatsächlichen Grenzen des ausgewählten Schuljahres abgeleitet.
- Zeiträume und Einzeltage bleiben als maschinenlesbare Datumswerte erhalten.

## 3. Ferienimporte werden fachlich geprüft

- Ferien werden nach Bundesland, Schulart und Schuljahr abgefragt.
- Filter- und Gruppenzuordnungen externer APIs werden nicht ungeprüft als fachlich korrekt übernommen.
- Die zuständige amtliche Landesquelle ist die Prüfreferenz; Aggregatoren und APIs sind technische Lieferanten, nicht die autoritative Wahrheit.
- Beim Import bleiben Anbieter, Original-ID, Abrufzeitpunkt, Bundesland, Schulart, Schuljahr und amtliche Referenz erhalten.
- Belegte Abweichungen werden bei der Normalisierung korrigiert und mit Originaldatensatz, amtlicher Referenz, Korrekturgrund und Prüfdatum dokumentiert.

### Bekannter Prüffall Mecklenburg-Vorpommern 2026/27

- Das Bildungsministerium Mecklenburg-Vorpommern weist den 26. und 27. November 2026 ausschließlich als zusätzliche feststehende Ferientage für berufliche Schulen aus.
- OpenHolidays ordnet diese beiden Datensätze derzeit sowohl `DE-MV-ABS` als auch `DE-MV-BBS` zu.
- Beim Import für allgemeinbildende Schulen müssen diese beiden Tage deshalb ausgeschlossen werden.
- Beim Import für berufliche Schulen bleiben sie erhalten.

## 4. Auswahl und Übernahme bleiben getrennt

- Änderungen an Bundesland, Schulart oder Schuljahr laden automatisch eine überprüfbare Ferienvorschau.
- Die Vorschau verändert die aktive Kalenderansicht noch nicht.
- Erst „Einstellungen übernehmen“ schreibt die ausgewählten Daten in die aktive Kalenderschicht und aktualisiert den Kalender.
- Bereits übernommene Kalenderdaten bleiben bis zu diesem Commit-Schritt stabil.
