# Changelog

## 0.8.0 – 2026-09-12

- TMDB-Suche direkt in den Dialog zum Anlegen und Bearbeiten von Filmen integriert.
- Ausgewählte Treffer übernehmen Titel, Jahr, Laufzeit, Regie, Genres, Beschreibung, Cover, FSK und verfügbare YouTube-Trailer.
- Bereits hinterlegte Film-Speicherlinks bleiben bei der Metadatenübernahme erhalten.
- TMDB-Verknüpfung wird am Film gespeichert; der API Read Access Token bleibt ausschließlich lokal.
- Vorhandener TMDB-Token aus Time Map wird nach Möglichkeit automatisch übernommen.

## 0.7.0 – 2026-09-12

- Programmordner in `atlas/videothek` umbenannt.
- JavaScript-, Stylesheet-, Import-, Manifest- und Favicon-Dateien technisch auf „Videothek“ umgestellt.
- Interne Namensräume, Speicherkennungen, Exportformat und Werkzeugnamen entsprechend umbenannt.
- Bestehende lokale Daten und ältere Projektexporte werden automatisch übernommen.

## 0.6.7 – 2026-09-12

- App-Bezeichnung durchgängig in „Videothek“ geändert.
- Bezeichnung in der App, der Atlas-Übersicht und allen sichtbaren Hinweisen aktualisiert.
- Bestehende Speicher- und Importdaten bleiben aus Kompatibilitätsgründen lesbar.

## 0.6.6 – 2026-09-12

- Suchfeld in der Kopfzeile größer und visuell präsenter gestaltet.
- Eigenes dezentes Suchsymbol, fein abgestufte Fläche und Schatten ergänzt.
- Ruhigen Akzentzustand bei Tastatur- und Mauseingabe beibehalten.

## 0.6.5 – 2026-09-12

- Zahnrad-/Eigenschaftsknopf oben rechts entfernt.
- Archive bleiben über die gleichnamige Hauptnavigation erreichbar.

## 0.6.4 – 2026-09-12

- Mehr Abstand zwischen Kopfzeile und Genrebereich geschaffen.
- Dezenten Schalter zum Ein- und Ausblenden der vollständigen Genreliste ergänzt.
- Beim Ausblenden wird ein aktiver Genrefilter neutral zurückgesetzt.

## 0.6.3 – 2026-09-12

- Vogel-Icon in der Kopfzeile auf die appübergreifende Atlas-Größe von 48 × 48 Pixeln gebracht.
- Auf schmalen Ansichten wird das Icon wie in den anderen Apps auf 44 × 44 Pixel verkleinert.

## 0.6.2 – 2026-09-12

- Genre-Chips verkleinert und mit automatischem Zeilenumbruch versehen.
- Genrebereich im geschlossenen Zustand auf drei Zeilen begrenzt.
- Zusätzliche Genres lassen sich nach unten aus- und wieder einklappen.

## 0.6.1 – 2026-09-12

- Projektauswahl und Titelanzahl dynamisch an der rechten Kante des letzten Covers der ersten Reihe ausgerichtet.
- Ausrichtung reagiert auf Fenstergröße, Suche, Filter und Projektwechsel.

## 0.6.0 – 2026-09-12

- Verwaltungsmodus von „Maschinenraum“ in „Archive“ umbenannt.
- Projekte und Playlisten als gleichwertige Archivbereiche angelegt.
- Playlisten können erstellt, ausgewählt und gelöscht werden.

## 0.5.7 – 2026-09-12

- Titelanzahl über der Projektauswahl angeordnet.
- Titelanzahl und Auswahlmenü an einer gemeinsamen rechten Kante ausgerichtet.

## 0.5.6 – 2026-09-11

- Projektauswahl aus dem dominanten Kopfbereich entfernt.
- Projektauswahl kompakt rechts neben der Titelanzahl angeordnet.

## 0.5.5 – 2026-09-11

- Automatische Trailer-Wiedergabe im Cover wieder entfernt.
- Fokusdarstellung der Suchleiste auf eine einzelne, ruhige Kontur reduziert.
- Rechts überlagerndes Suchsymbol und Rechtschreibmarkierung in der Filmsuche entfernt.

## 0.5.4 – 2026-09-11

- Trailer-Vorschau auf Filmcovern ergänzt.
- Trailer starten nach dem Puffern beim Mouseover stumm und stoppen beim Verlassen des Covers.
- Direkte Videolinks sowie YouTube- und Vimeo-Links werden unterstützt.
- YouTube-Vorschau mit Player-Steuerung und expliziter Herkunftskennung stabilisiert.
- Fehlerseiten des Videoplayers werden nicht mehr über dem Filmcover eingeblendet.

## 0.5.3 – 2026-09-11

- Trailer-Link als eigene Filmeigenschaft ergänzt.
- Trailer direkt aus der Filmdetailansicht aufrufbar.
- Trailer-Feld bleibt in exportierten und importierten Projekten erhalten.

## 0.5.2 – 2026-09-11

- Kompakte Covergröße der Suchergebnisse einheitlich auf den gesamten Entdecken-Katalog übertragen.
- Dynamische Größenänderung zwischen Hauptanzeige und Suche entfernt.

## 0.5.1 – 2026-09-11

- Großen Projekttitel im Entdecken-Modus entfernt und Projektauswahl verdichtet.
- Gestaltung vollständig auf eine klare serifenlose Typografie umgestellt.
- Filmcover mit einem dezenteren, wertigen Schatten versehen.
- Kompakte Covergrößen werden nur während einer aktiven Suche verwendet; der normale Katalog bleibt großzügiger.
- Farbflächen und Oberflächen weiter beruhigt und neutralisiert.

## 0.5.0 – 2026-09-11

- Videothek als helle, wohnliche Arthouse-Edition neu gestaltet.
- Farbwelt auf Elfenbein, Tinte, Burgunder und dezentes Messing umgestellt.
- Filmkarten, Navigation, Maschinenraum, Tabellen, Menüs und Dialoge in ein gemeinsames redaktionelles System überführt.
- Fokuszustände, Touchgrößen und reduzierte Bewegung verbessert.

## 0.4.8 – 2026-09-11

- Einstellige Stundenangaben wie `1:42:30` werden ohne Validierungsfehler akzeptiert.
- Führende Nullen bei der Stundenanzeige sind optional und werden beim Speichern entfernt.

## 0.4.7 – 2026-09-11

- Laufzeiteingabe von Minuten auf das Raster `hh:mm:ss` umgestellt.
- Bestehende numerische Minutenwerte werden beim Bearbeiten automatisch umgerechnet.

## 0.4.6 – 2026-09-11

- Projektspalte und Projektbestand im Maschinenraum unabhängig scrollbar gemacht.
- Auf schmalen, gestapelten Ansichten bleibt der natürliche Seitenscroll erhalten.

## 0.4.5 – 2026-09-11

- Standardprojekt „Filmarchiv“ geleert.
- Die vier ursprünglichen Demofilme werden bei unverändertem Altbestand einmalig entfernt; eigene Einträge bleiben erhalten.

## 0.4.4 – 2026-09-11

- Projektauswahl im Entdecken-Modus um „Alle Projekte“ ergänzt und als Standard festgelegt.
- Suche, Genre-Filter und Filmdetails arbeiten nun projektübergreifend.

## 0.4.3 – 2026-09-11

- Große Bühne für den ersten Film aus dem Entdecken-Modus entfernt.
- Der Katalog beginnt nun unmittelbar mit Projektwahl, Filtern und Filmkarten.

## 0.4.2 – 2026-09-11

- Redundante Titelbeschriftung innerhalb der Cover im Entdecken-Modus entfernt.

## 0.4.1 – 2026-09-11

- Jede Projektzeile besitzt nun ein eigenes Drei-Punkte-Menü mit „Löschen“.
- Vor dem Löschen werden Projektname und Filmzahl bestätigt; das letzte verbleibende Projekt ist geschützt.

## 0.4.0 – 2026-09-11

- Projektspalte verbreitert und Projektbestand kompakter begrenzt.
- Projektaktionen in ein Drei-Punkte-Menü neben der Überschrift verschoben.
- „Projekt hinzufügen“ als ausgeschriebene Schaltfläche unter der Projektliste ergänzt.
- Für Copy-Paste-Titel ohne übertragene URL wird ein deutlich gekennzeichneter YouTube-Suchlink erzeugt.

## 0.3.0 – 2026-09-11

- Copy-Paste-Import für vollständig kopierte Google-/YouTube-Bibliotheksseiten ergänzt.
- Bereinigung typischer Navigations- und Statuszeilen sowie Dublettenerkennung umgesetzt.
- Kontrollierbare Vorschau mit Auswahl einzelner erkannter Titel vor dem Import ergänzt.

## 0.2.0 – 2026-09-11

- Stapelimport für Google-TV-/YouTube-Bibliotheken als CSV oder JSON ergänzt.
- Flexible Feldzuordnung für deutsche und englische Exportspalten umgesetzt.
- Dublettenerkennung und Importbericht ergänzt.
- Jeder Bibliotheksimport erzeugt ein eigenes Videothek-Projekt mit Herkunftsangaben.

## 0.1.0 – 2026-09-11

- Erste Videothek-Version mit Streaming-Ansicht und Maschinenraum.
- Lokale Projekt- und Filmverwaltung ergänzt.
- JSON-Import und -Export für einzelne Projekte umgesetzt.
- Bearbeitbare Film-, Cover- und Speicherlinks ergänzt.

