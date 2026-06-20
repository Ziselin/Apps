# Sourcerer – Projektplan

## Projektbeschreibung

Sourcerer ist der zukünftige Ingest- und Transformationsagent für die ATLAS-Bibliothek. Er sammelt digitale Quellen aus definierten Beständen, erschließt ihre technische und semantische Struktur, ergänzt belegbare Metadaten und überführt die Ergebnisse in ein einheitliches ATLAS-Datenpaket.

TypeMap bleibt davon getrennt: Dort werden Dokumentmodell, Darstellung, manuelle Bearbeitung und Qualitätsanforderungen praktisch erprobt. Sourcerer automatisiert später die wiederkehrenden Arbeitsschritte, die sich aus diesen Erfahrungen ableiten lassen.

Der Agent soll nicht frei improvisieren, sondern mit begrenzten Werkzeugen, überprüfbaren Regeln und spezialisierten Modellen arbeiten. Eindeutige Fälle können automatisch verarbeitet werden. Unsichere, widersprüchliche oder rechtlich unklare Fälle werden gekennzeichnet und einer menschlichen Prüfung zugeführt.

## Projektziel

Sourcerer soll einen kontrollierbaren Arbeitsablauf bereitstellen, der:

1. Quellen aus erlaubten lokalen oder externen Beständen übernimmt,
2. EPUB, HTML, PDF und verwandte Formate technisch zerlegt,
3. vorhandene Metadaten und Dokumentstrukturen ausliest,
4. Kapitel, Paratexte, Fußnoten, Paginierung und weitere semantische Einheiten erkennt,
5. OCR- und Konvertierungsartefakte bereinigt,
6. bibliografische Angaben mit Herkunftsnachweisen zusammenführt,
7. Rechteinformationen sammelt und später mit dem Kontor abgleicht,
8. ein validiertes ATLAS-Paket erzeugt,
9. Unsicherheiten und Transformationsentscheidungen nachvollziehbar protokolliert,
10. freigegebene Datensätze in eine Bibliothek übergibt.

## Abgrenzung

### TypeMap

- Editor und visuelle Werkbank
- Erprobung des ATLAS-Dokumentmodells
- manuelle Korrektur und Qualitätskontrolle
- Rendering und Exporte
- Referenzimplementierung für gewünschte Semantik und Typografie

### Sourcerer

- automatisierte Quellenaufnahme
- technische und semantische Transformation
- Orchestrierung von Regeln, Werkzeugen und Spezialmodellen
- Validierung, Provenienz und Prüflisten
- Übergabe an Bibliothek und Kontor

### Kontor

- autoritative Instanz für Rechte, Policies und Freigaben
- Bewertung konkreter Nutzungshandlungen
- Verwaltung veränderlicher Rechteinformationen

## Leitprinzipien

- **Struktur vor KI:** Vorhandene EPUB-, HTML- oder PDF-Strukturen werden zuerst deterministisch ausgewertet.
- **Spezialisierung statt Universalmodell:** Kleine Modelle entscheiden eng umrissene Aufgaben.
- **Keine stillen Vermutungen:** Jede unsichere Zuordnung erhält Konfidenz, Begründung und Prüfstatus.
- **Provenienz:** Jede übernommene oder abgeleitete Information bleibt auf ihre Quelle zurückführbar.
- **Reproduzierbarkeit:** Transformationen werden versioniert und können erneut ausgeführt werden.
- **Idempotenz:** Dieselbe Quelle soll bei gleicher Pipeline-Version dasselbe Ergebnis liefern.
- **Originaltreue:** Der Quelltext bleibt von normalisierten und semantisch angereicherten Ebenen unterscheidbar.
- **Menschliche Freigabe:** Kritische oder uneindeutige Ergebnisse werden nicht automatisch publiziert.
- **Lokale Ausführbarkeit:** Wo sinnvoll, sollen Werkzeuge und Spezialmodelle ohne Cloud-Zwang laufen können.
- **Austauschbarkeit:** Modelle und Anbieter werden über klar definierte Schnittstellen angebunden.

## Zielarchitektur

```text
Quellenbestand
    │
    ▼
Collector ──► Download, Prüfsumme, Provenienz
    │
    ▼
Formatadapter ──► EPUB / HTML / PDF / MOBI / weitere Formate
    │
    ▼
Deterministische Extraktion
    │             ├─ Metadaten
    │             ├─ Inhaltsverzeichnis / Spine
    │             ├─ Text und Medien
    │             └─ vorhandene Seiten- und Fußnotenmarker
    ▼
Semantische Pipeline
    │             ├─ Strukturklassifikation
    │             ├─ Metadatenzuordnung
    │             ├─ Paratext- und Fußnotenerkennung
    │             ├─ OCR-/Artefaktprüfung
    │             └─ Rechteindikatoren
    ▼
Validator ──► Regeln, Konfidenzen, Konflikte, Prüfliste
    │
    ▼
ATLAS-Paket
    ├─ content.json
    ├─ source.json
    ├─ policy-reference.json
    ├─ provenance.json
    ├─ assets/
    └─ validation-report.json
    │
    ├─► TypeMap zur Sichtprüfung
    ├─► Kontor zur Rechteprüfung
    └─► Bibliothek nach Freigabe
```

Die endgültige Aufteilung der ATLAS-Dateien wird erst festgeschrieben, nachdem sie in TypeMap ausreichend erprobt wurde.

## Geplante Spezialmodelle

Spezialmodelle werden nur eingesetzt, wenn Regeln und vorhandene Quelldaten keine verlässliche Entscheidung liefern.

### Strukturklassifikator

Ordnet Dokumentteile beispielsweise als Titel, Kapitel, Unterkapitel, Vorwort, Einleitung, Haupttext, Anhang, Register oder Impressum ein.

### Metadaten-Zuordner

Unterscheidet unter anderem Autor, Herausgeber, Übersetzer, institutionellen Urheber, Verlag, Erscheinungsort, Ausgabe und Originaltitel.

### Fußnoten- und Anmerkungsmodell

Verknüpft Verweise und Definitionen und unterscheidet Fußnoten, Endnoten, Marginalien und redaktionelle Anmerkungen.

### Paginierungsmodell

Unterscheidet Druckpaginierung, PDF-Seitenzählung, römische Vorseiten und unpaginierte Bereiche.

### Artefakt- und OCR-Prüfer

Erkennt verdächtige Worttrennungen, Zeichenverwechslungen, Zeilenbruchartefakte und semantisch unplausible OCR-Ergebnisse.

### Rechteindikator-Klassifikator

Extrahiert nur belegbare Hinweise wie Lizenzvermerke, Copyright-Angaben, Erscheinungsdaten und Rechteinhaber. Er fällt keine endgültige Rechteentscheidung; diese Aufgabe verbleibt beim Kontor.

## Roadmap

### Phase 0 – Anforderungen aus TypeMap sichern

Ziel: Das gegenwärtige Experimentierwissen in testbare Spezifikationen überführen.

- ATLAS-Kernobjekte und Feldbedeutungen dokumentieren
- Beispiele für Kapitel, Paratexte, Fußnoten und Paginierung sammeln
- erwünschte und fehlerhafte Transformationen als Testfälle sichern
- Trennung zwischen Inhalts-, Quellen-, Provenienz- und Policy-Daten festlegen
- Mindestanforderungen für einen bibliotheksfähigen Datensatz bestimmen

**Ergebnis:** Versionierte ATLAS-Arbeitsspezifikation mit Referenzbeispielen.

### Phase 1 – Deterministischer EPUB-Ingest

Ziel: EPUB ohne KI technisch vollständig und nachvollziehbar erschließen.

- EPUB-Container öffnen und validieren
- OPF-Metadaten, Manifest und Spine auslesen
- EPUB-2-NCX und EPUB-3-Navigation verarbeiten
- XHTML-Inhalte in Lesereihenfolge übernehmen
- Überschriftenhierarchie, Links, Fußnoten und Medien erhalten
- CSS nur auswerten, wenn es semantische Hinweise liefert
- Kapitelgrenzen aus Navigation, Spine und Überschriften ableiten
- Provenienz für jedes extrahierte Segment speichern
- vorläufiges ATLAS-Paket erzeugen

**Ergebnis:** Reproduzierbarer EPUB-zu-ATLAS-Konverter für strukturell saubere EPUBs.

### Phase 2 – Validierung und menschliche Prüfschleife

Ziel: Fehler sichtbar machen, bevor KI-Entscheidungen ergänzt werden.

- Schema- und Konsistenzvalidierung implementieren
- Konflikte zwischen OPF, Navigation und Inhalt erkennen
- Konfidenz- und Prüfstatusmodell definieren
- Prüfliste für fehlende oder widersprüchliche Daten erzeugen
- Übergabe an TypeMap für Sichtprüfung ermöglichen
- Korrekturen strukturiert als Trainings- und Evaluationsdaten speichern

**Ergebnis:** Kontrollierter Ingest mit nachvollziehbaren Warnungen und Korrekturdatensatz.

### Phase 3 – Weitere Formatadapter

Ziel: Die gemeinsame Pipeline von einzelnen Quellformaten entkoppeln.

- HTML-/Webquellen-Adapter
- PDF-Adapter mit eingebetteter Textebene
- OCR-Adapter für bildbasierte PDFs
- MOBI/AZW-Import über einen normalisierten Zwischenadapter
- einheitliches Segment- und Provenienzmodell für alle Formate

**Ergebnis:** Formatunabhängige Ingest-Pipeline mit gemeinsamen Validierungsregeln.

### Phase 4 – Erste Spezialmodelle

Ziel: Nur die häufigsten verbleibenden Unsicherheiten automatisieren.

- Korrekturdaten aus Phase 2 auswerten
- Aufgaben nach Häufigkeit, Risiko und Automatisierbarkeit priorisieren
- Strukturklassifikator als erstes Modell trainieren oder feinabstimmen
- feste Ein-/Ausgabeschemata und Konfidenzgrenzen definieren
- regelbasierte Baseline gegen das Modell vergleichen
- Modellentscheidungen protokollieren und rückgängig machbar halten
- bei niedriger Konfidenz stets menschliche Prüfung verlangen

**Ergebnis:** Erstes austauschbares Spezialmodell mit messbarem Vorteil gegenüber Regeln.

### Phase 5 – Agent und Werkzeugorchestrierung

Ziel: Quellenbestände mit kontrollierten Arbeitsaufträgen verarbeiten.

- Werkzeugkatalog mit expliziten Berechtigungen definieren
- Collector, Adapter, Modelle, Validator und Exporter orchestrieren
- Arbeitsaufträge, Warteschlangen und Wiederholungsregeln implementieren
- Ressourcen-, Zeit- und Mengenlimits einbauen
- Fehlerzustände ohne Datenverlust fortsetzbar machen
- Audit-Log für jeden Arbeitsschritt führen
- Trockenlauf ohne Bibliotheksübergabe anbieten

**Ergebnis:** Sourcerer-Agent, der begrenzte Bestände selbständig transformieren kann.

### Phase 6 – Kontor- und Bibliotheksintegration

Ziel: Validierte Ergebnisse regelkonform freigeben und ablegen.

- stabile Text- und Quellenidentitäten vergeben
- Kontor-Referenzen und Policy-Anfragen integrieren
- Rechte-Snapshots von autoritativen Entscheidungen trennen
- Freigabeprozess und Rollenmodell definieren
- versionierte Übergabe an die Bibliothek implementieren
- Aktualisierungen, Dubletten und ersetzte Fassungen behandeln

**Ergebnis:** Nachvollziehbarer Weg von der Quelle bis zum freigegebenen Bibliotheksobjekt.

### Phase 7 – Skalierung und Modellportfolio

Ziel: Qualität und Durchsatz anhand realer Bestände erhöhen.

- zusätzliche Spezialmodelle nur nach belegtem Bedarf entwickeln
- aktive Lernschleifen aus menschlichen Korrekturen etablieren
- Modell- und Pipeline-Versionen vergleichbar evaluieren
- Dubletten- und Werkerkennung ergänzen
- verteilte Verarbeitung und lokale Modellserver prüfen
- Qualitätsberichte je Bestand und Quelle erstellen

**Ergebnis:** Skalierbare, messbar verbesserbare Produktionspipeline.

## Priorisierte To-do-Liste

### Jetzt in TypeMap vorbereiten

- [ ] ATLAS-Inhaltsmodell anhand echter Dokumente weiter erproben
- [ ] Kapitel, Unterkapitel und Paratexte eindeutig modellieren
- [ ] Fußnoten, Endnoten und Originalpaginierung als getrennte Semantik sichern
- [ ] bibliografische Felder und Quellenarten vervollständigen
- [ ] Provenienz pro Dokument und später pro Segment vorsehen
- [ ] Unsicherheits- und Prüfstatusfelder entwerfen
- [ ] Beispiele für korrekte und fehlerhafte EPUB-Übernahmen sammeln
- [ ] manuelle Korrekturen so speichern, dass sie später als Trainingsdaten dienen können

### Sourcerer-MVP

- [ ] eigenes Sourcerer-Projekt und Modulgrenzen anlegen
- [ ] ATLAS-Arbeitsschema versionieren
- [ ] EPUB-Testkorpus mit unterschiedlichen Verlagen und EPUB-Versionen zusammenstellen
- [ ] EPUB-Container-, OPF-, Manifest-, Spine- und Navigationsparser implementieren
- [ ] XHTML-zu-ATLAS-Transformation implementieren
- [ ] Kapitelheuristik aus Navigation, Spine und Überschriften bauen
- [ ] Metadaten-Mapping mit Herkunftsnachweis implementieren
- [ ] Validierungsbericht und Prüfliste erzeugen
- [ ] ATLAS-Ausgabe in TypeMap importierbar machen
- [ ] automatisierte Referenztests einrichten

### Nach dem MVP

- [ ] Korrekturen aus TypeMap strukturiert zurückführen
- [ ] regelbasierte Baseline messen
- [ ] ersten Strukturklassifikator spezifizieren
- [ ] Trainings-, Validierungs- und Testdaten trennen
- [ ] Modelladapter für lokale und externe Inferenz definieren
- [ ] Konfidenzschwellen und Eskalationsregeln festlegen
- [ ] PDF-, HTML- und MOBI-Adapter ergänzen
- [ ] Rechteindikatoren erfassen und Kontor-Schnittstelle vorbereiten
- [ ] Agentenlauf mit Warteschlange, Limits und Audit-Log entwickeln
- [ ] kontrollierte Bibliotheksübergabe implementieren

## MVP-Abnahmekriterien

Der erste Sourcerer-MVP gilt als erfolgreich, wenn er:

- ein valides EPUB ohne Cloud-Dienst öffnen kann,
- Metadaten, Lesereihenfolge und Navigation nachvollziehbar extrahiert,
- Kapitel und Unterkapitel bei strukturell sauberen EPUBs korrekt übernimmt,
- Text, Fußnoten, Links und Originalmedien nicht stillschweigend verliert,
- für jede wichtige Angabe ihre Herkunft dokumentiert,
- Konflikte und Unsicherheiten sichtbar ausweist,
- ein versioniertes ATLAS-Paket erzeugt,
- dieses Paket ohne manuelle Umformung in TypeMap geöffnet werden kann,
- bei erneuter Verarbeitung dasselbe Ergebnis produziert.

## Qualitätsmetriken

- Anteil korrekt erkannter Kapitelgrenzen
- Genauigkeit der Kapitelrollen und Hierarchie
- Vollständigkeit bibliografischer Metadaten
- Quote verlorener oder duplizierter Textsegmente
- Genauigkeit der Fußnotenverknüpfung
- Anteil automatisch akzeptierter gegenüber manuell geprüften Fällen
- Zahl unerkannter Konflikte
- Reproduzierbarkeit zwischen Pipeline-Läufen
- Bearbeitungszeit und Rechenaufwand je Quelle

## Nächste konkrete Entscheidung

Vor dem Bau des Sourcerer sollte in TypeMap festgelegt werden, wie ein Kapitel, ein Paratext, eine Fußnote und ihre jeweilige Provenienz im ATLAS-Kernmodell repräsentiert werden. Diese vier Strukturen bilden die erste stabile Übergabefläche zwischen TypeMap und Sourcerer.
