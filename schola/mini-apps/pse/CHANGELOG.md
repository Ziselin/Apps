# Changelog – Periodensystem

Alle wesentlichen Änderungen an der Mini-App werden in dieser Datei dokumentiert.

## Unveröffentlicht

### Organisiert

- Die beiden app-spezifischen Werkzeuge zur Aktualisierung und Prüfung der Phasendaten liegen nun manifestkonform unter `schola/mini-apps/pse/tools/`; ihre relativen Datenpfade wurden an den neuen Ort angepasst.
- Der Einstellungsbutton verwendet nun die zentrale, offline verfügbare Symbolvorlage aus `assets/ui/icons` statt einer app-spezifisch gezeichneten Variante.

### Korrigiert

- Die Herkunftsansicht bewahrt wieder die vertraute Position von Kürzel, Ordnungszahl und Elementname innerhalb jeder Kachel.
- Fremde Kachelmetadaten wie Atommasse oder Radioaktivitätssymbol werden in der Herkunftsansicht ausgeblendet, damit die Farbanteile eindeutig lesbar bleiben.
- Das Radioaktivitätssymbol ist nun so hoch wie die Ordnungszahl, liegt mit ihr auf einer gemeinsamen horizontalen Mittelachse und besitzt nach oben und rechts denselben Randabstand.
- Das Radioaktivitätssymbol folgt nun eigenen horizontalen und vertikalen Kollisionsregeln: Es wird rechtzeitig und einheitlich ausgeblendet, ohne dabei vorzeitig die Ordnungszahlen zu entfernen.
- Ordnungszahl und Radioaktivitätssymbol skalieren nun auch bei abnehmender Fensterhöhe fließend bis zu ihrer gemeinsamen Mindestgröße; die bestehende Skalierung über die Fensterbreite bleibt erhalten.
- Die Kollisionsprüfung der Elementnamen erfolgt nach Breitenänderungen in einem stabilen zweiten Layoutdurchlauf. Namen verschwinden dadurch nicht mehr willkürlich, und das Kürzel wechselt ohne zusätzliche Höhenänderung an die richtige Position zurück.
- Die Schriftgröße der Elementnamen richtet sich nun nach der tatsächlichen Kachelhöhe statt nach der Fensterbreite. Ein breiteres Fenster kann den Namen daher nicht mehr innerhalb einer höhenbegrenzten Kachel künstlich vergrößern und ausblenden.

### Hinzugefügt

- Fachansicht „Ursprung der Elemente“ ergänzt. Jede Kachel zeigt die prozentualen Beiträge kosmischer Nukleosyntheseprozesse als gestapelte Farbflächen; Legende, dynamische Überschrift und exakte Anteile im Tooltip sind enthalten.
- Herkunftsdatensatz für alle 118 Elemente offline hinterlegt. Grundlage sind die Daten von Jennifer A. Johnson und die CC-BY-SA-3.0-Visualisierung von Cmglee; für Elemente oberhalb Lawrencium wird künstliche Synthese ausgewiesen.
- Orbitalformen zu einem interaktiven Orbital-Labor erweitert: drehbare dreidimensionale Punktwolke, stufenlose Überblendung zur Wahrscheinlichkeitsgrenzfläche, einstellbares Wahrscheinlichkeitsniveau, einblendbare Knoten, verschiebbare Schnittansicht und start-/stoppbare Rotation.
- Didaktischer Hinweis und eigener Rückweg zu den Fachdaten ergänzt; die Punktwolke wird ausdrücklich als Verteilung möglicher Messorte und nicht als Elektronenbahn erklärt.
- Schalenwahl für Orbitalformen ergänzt. Zulässige Hauptquantenzahlen hängen vom Orbitaltyp ab; die Ansicht benennt konkrete Orbitale, skaliert ihre schematische Ausdehnung und zeigt die Zahl radialer Knoten.
- „Orbitalformen“ als dritte Atomdarstellung ergänzt: einzeln wählbare s-, drei p- und fünf d-Orbitale mit Achsen, farblich getrennten Phasen und fachlicher Einordnung als schematische Wahrscheinlichkeitsgrenzflächen.
- Orbitalmodell als zweite Atomdarstellung ergänzt. Das Kästchenschema wird aus der vollständigen Elektronenkonfiguration erzeugt und verteilt Elektronen nach Pauli-Prinzip und Hundscher Regel.
- Die große Elementkachel der Einzelansicht lässt sich per Klick in ein Bohrsches Schalenmodell umschalten; die Schalenbesetzung wird aus der hinterlegten Elektronenkonfiguration berechnet. Ein zweiter Klick stellt die Kachel wieder her.
- Die Modellansicht vergrößert die Abbildung am bisherigen Kachelplatz und ersetzt die Faktentabelle rechts durch eine erweiterbare Modellauswahl mit „Bohrsches Atommodell“ als erster Darstellung.

- Vollständiges Periodensystem mit 118 auswählbaren Elementen angelegt.
- Farbliche Elementkategorien mit beschrifteter Legende ergänzt.
- Große Einzelansicht mit grundlegenden Elementdaten umgesetzt.
- Direkten Aufruf eines Elements über Symbol oder Ordnungszahl ermöglicht.
- Responsive, horizontal verschiebbare Darstellung für kleine Bildschirme ergänzt.
- Eigenes Icon, Manifest und lokal gespeicherte PubChem-Fachdaten angelegt.
- Einstellungsdialog mit getrennten Bereichen für Form und fachliche Darstellung ergänzt.
- Umschaltbare Kurz- und Langbahndarstellung sowie Ansichten für Elementfamilien, Aggregatzustand und Halbmetalle umgesetzt.
- Weitere gewünschte Fachdarstellungen als klar gekennzeichnete Datenmodule vorbereitet.
- Bedingungsleiste für die Aggregatzustandsansicht mit Temperatur, Druck und Rücksetzung auf durchschnittliche Erdoberflächenbedingungen ergänzt.
- Lokale PubChem-Phasendaten ergänzt und Aggregatzustände bei Temperaturänderungen dynamisch neu berechnet; Siedepunkte werden druckabhängig über ein transparent gekennzeichnetes Clausius-Clapeyron-/Trouton-Näherungsmodell angepasst.
- Helium als druckabhängigen Quantenflüssigkeits-Sonderfall ergänzt: Der nur unter hohem Druck relevante Schmelzpunkt wird im Vakuum nicht mehr fälschlich angewendet.
- Helium-4-Grenze auf rund 25,3 bar präzisiert, alle 118 Phasendatensätze systematisch plausibilisiert und Kohlenstoff sowie Arsen unterhalb ihrer Tripelpunktdrücke als Sublimationsfälle behandelt.
- Bisherige Halbmetallansicht durch zwei EduChem-orientierte Klassifikationen ersetzt: Metalle/Halbmetalle/Nichtmetalle sowie eine detaillierte Elementfamilienansicht einschließlich Seltener Erden, Lanthanoiden, Actinoiden, Platin- und Münzmetallen.
- Frühere Kategorienfarbgebung als eigene „Herkömmliche Darstellung“ wiederhergestellt und erneut als Standardansicht festgelegt; gespeicherte Einstellungen aus der vorherigen Semantik werden migriert.
- Lanthanoide in der erweiterten Elementfamilienansicht durch weiße Typografie innerhalb der grünen Seltene-Erden-Gruppe differenziert.
- EduChem-orientierte Darstellungen „Bausteine des Menschen“ und „Bausteine des Lebens“ mit getrennten biologischen Bedeutungsstufen, eigenen Legenden und vollständiger Elementzuordnung aktiviert.

### Behoben

- Rücksprung aus der Elementansicht stabilisiert: Die Kollisionsmessung läuft nicht mehr am verborgenen Periodensystem und wird nach dem Sichtbarwerden mit aktuellen Kachelmaßen wiederholt. Dadurch bleiben Detailangaben und passende Symbolgröße erhalten.
- Unbeabsichtigtes Hochspringen des Bohrschen Atommodells beim Überfahren mit der Maus entfernt; das Hover-Feedback bleibt auf die Elementkachel begrenzt.

- Elementdaten werden nun auch beim direkten lokalen Öffnen ohne Webserver geladen.
- Lanthanoide und Actinoide in die vorgesehenen vollständigen Rasterzeilen verschoben; die schmale Trennzeile bleibt frei.
- Seitliches Abschneiden des Periodensystems behoben: Spaltenzwischenräume werden in der responsiven Breitenberechnung berücksichtigt; bei Erreichen der Mindestkachelgröße bleibt das vollständige Raster horizontal scrollbar.
- Aggregatzustandsansicht mit eigener, kompakter Höhenberechnung versehen, damit PSE, Legende sowie Temperatur- und Drucksteuerung gemeinsam in das Fenster passen.
- Abgeschnittene Gruppennummern in kleinen Fenstern behoben: Die Kopfzeile besitzt nun eine zur Legendenschrift passende Mindesthöhe und vertikale Zentrierung.
- Überlaufen und seitliches Verschieben der Langbahndarstellung in sehr breiten Fenstern behoben; Spaltenbreiten werden nun aus der tatsächlichen PSE-Containerbreite statt aus der gesamten Fensterbreite berechnet.
- Verbleibenden symmetrischen Vollbildversatz beseitigt: Der PSE-Container folgt nun über die gesamte Fensterbreite den stabilen Innenkanten der App und endet nicht mehr bei einer separaten 1500-Pixel-Grenze.
- Höhenbedingtes Zusammenziehen der Langbahn ohne wandernde Außenkanten gelöst: Ausschließlich in der Langbahn wird überschüssige Breite zwischen den Spalten verteilt, während erste und letzte Gruppe an den App-Innenkanten verankert bleiben; die Kurzform bleibt kompakt zentriert.

### Hinzugefügt

- Drei logarithmisch abgestufte Häufigkeitsansichten für Massenanteile in Erdhülle, gesamter Erde und Ozeanen nach den EduChem-Referenzdarstellungen ergänzt.
- Häufigkeitsdaten als eigenständigen, offline verfügbaren Datensatz mit Quellenangaben abgelegt; nicht belastbar quantifizierte Elemente werden neutral ausgewiesen.
- Stoffdatenansichten „Dichte“ und „Jahr der Entdeckung“ auf Grundlage des offiziellen PubChem-PSE-Datensatzes aktiviert.
- Dichte in sieben Größenstufen und Entdeckungszeit in historischen Abschnitten visualisiert; exakte Werte erscheinen zusätzlich in der Element-Einzelansicht.
- Entdeckungsansicht um eine zeilenbreite Zeitleiste von der Antike bis heute ergänzt: Bereits bekannte, neu hinzukommende und noch unentdeckte Elemente werden bei jedem historischen Schritt unterschieden.
- Entdeckungsansicht erhält wie die Aggregatzustandsansicht eine eigene Höhenreserve für Regler, Legende und Statusanzeige.
- Elektronische Ansichten für Elektronegativität nach Pauling, Allred–Rochow und Mulliken sowie für den spezifischen elektrischen Widerstand aktiviert.
- Vergleichbare Elektronegativitäts-Farbskalen und eine logarithmische Widerstandsskala ergänzt; fehlende Fachwerte bleiben neutral gekennzeichnet.
- Formale Kacheloption „Atommasse“ oder „Radioaktivität“ ergänzt; bei gewählter Radioaktivität erscheint für Elemente ohne stabiles Isotop ein Trefoil-Symbol oben rechts.
- Unvollständig wirkendes, konstruiertes Radioaktivitäts-SVG durch das vollständige standardisierte Trefoil-Zeichen mit sicherem Kachelabstand ersetzt.
- Systemschriftabhängige Ersatzglyphe wieder entfernt und durch ein symmetrisches, fontunabhängiges Trefoil-SVG aus drei identischen Segmenten ersetzt.
- Abgeschnittene Kacheloption im Einstellungsdialog behoben: Alle Einstellungssektionen verwenden nun einen gemeinsamen Scrollbereich zwischen stabiler Kopf- und Fußzeile.
- Einstellungskapitel „Kachel“ eingeführt und um die Namenswahl „Deutsch“ oder „Originalname“ ergänzt; historische Symbolnamen wie Ferrum, Cuprum, Argentum und Aurum werden aus einem separaten IUPAC-basierten Datensatz geladen.
- Originalnamensansicht auf alle 118 Elemente vervollständigt: Internationale Symbolnamen wie Hydrogen, Carbon, Nitrogen und Oxygen ergänzen die historischen Sonderformen; nur identische Schreibweisen verwenden weiterhin den bereits vorhandenen Namen.

### Geändert

- Kopfzeile der Gesamtansicht neu hierarchisiert: „Periodensystem“ steht als feste Dachbezeichnung, darunter erscheint dynamisch der Titel der jeweils gewählten fachlichen Darstellung.
- Orbitalformen visuell an die Qualität des Bohrschen Modells angeglichen: größere Volumenkörper, räumliche Farbverläufe, kräftigere Konturen, dezente Tiefenwirkung, ruhigere Achsen und klar ausgesparte radiale Knotenzonen.
- Orbitalbesetzung gestalterisch grundlegend beruhigt: vollständig geschlossene innere Niveaus erscheinen als Edelgaskern, während die relevanten Außenniveaus mit großzügigen Kästchen, kräftiger Typografie und klarer vertikaler Hierarchie dargestellt werden.
- Orbitalbesetzung didaktisch und visuell überarbeitet: größere Einzelkästchen, rote α- und blaue β-Spinpfeile, Bezeichnungen jedes einzelnen Orbitals sowie eine kompakte Spinlegende ergänzt.
- UX-Überarbeitung der Einzelansicht: Faktentabelle in Grunddaten, Stoffeigenschaften und chemisches Verhalten gegliedert, Referenzbedingungen ergänzt und fachlich zusammengehörige Angaben neu geordnet.
- Mobile Faktentabelle unter 480 px auf eine Spalte umgestellt, Elementkachel verkleinert sowie Typografie und Zeilenumbrüche langer Werte verbessert.
- Fokusführung beim Öffnen und Schließen einer Elementansicht sowie Beschriftung der Zurück-Navigation barriereärmer gestaltet.
- Symbolangabe der Einzelansicht um Sprachkürzel und den Namen ergänzt, von dem das Elementsymbol abgeleitet ist, beispielsweise „Ag (lat. Argentum)“.
- Element-Einzelansicht neu geordnet: doppelte Namensüberschrift entfernt, große Überschrift auf „Element [Ordnungszahl]“ umgestellt und Atommasse in die Faktentabelle verschoben.
- Faktentabelle für Sek I/II um Elektronenkonfiguration, Oxidationszahlen, Pauling-Elektronegativität, Radioaktivität und die Halbwertszeit des jeweils langlebigsten bekannten Isotops ergänzt.

- Doppelten Einführungstitel und Bedienhinweis oberhalb des PSE entfernt.
- Gesamtansicht an die verfügbare Monitorgröße angepasst; Elementkacheln reduzieren ihre Details stufenweise und zeigen auf Telefonen nur noch die Symbole.
- Standardkacheln leicht hochformatig gestaltet, Beschriftungen zentriert sowie Ordnungszahl und Atommasse in einer betonten Kopfzeile angeordnet.
- Legende unterhalb des Periodensystems zentriert ausgerichtet.
- Atommasse bei Platzkonflikten dynamisch zunächst auf eine aufgerundete ganze Zahl reduziert und bei fortbestehender Kollision ausgeblendet; der vollständige Wert bleibt in der Einzelansicht erhalten.
- Vertikale Detailreduktion vereinheitlicht: Bei knapper Höhe verschwinden zunächst alle Elementnamen und erst bei weiterem Platzmangel Ordnungszahlen und Atommassen im gesamten Raster.
- Symbolgröße kontinuierlich an die Kachelhöhe gekoppelt und den sprunghaften Wechsel zum kompakten Modus beseitigt.
- Festen Rasterwechsel bei 700 Pixeln entfernt und Abstände, Kachelform sowie Typografie über Breite und Höhe kontinuierlich skalierbar gemacht.
- Ordnungszahlen ab gleicher Schriftgröße parallel zu den Elementsymbolen skaliert und Kopfangaben bereits vor einer sichtbaren Symbolkollision ausgeblendet.
- Verfrühtes Ausblenden der Ordnungszahlen beim responsiven Verkleinern behoben; die Kollisionsmessung arbeitet nun ohne animierte Zwischenpositionen.
- Responsive Detailstufen fest geordnet: Kopfangaben können erst nach den Elementnamen ausgeblendet werden und erscheinen bei weiterem Verkleinern nicht erneut.
- Legende auf allen Bildschirmgrößen erhalten, mit automatischem Zeilenumbruch und vertikalem Scrollen bei unzureichender Fensterhöhe.
- Höhenbedingte Mindestgröße für Kacheln und Typografie eingeführt; bei niedrigeren Fenstern bleibt die kompakte Darstellung lesbar und die Seite wird scrollbar.
- Elementsymbole in der Minimalkachel vergrößert, mit sicherem seitlichem Rand sowie exakter horizontaler und vertikaler Zentrierung.
- Vergrößerung der Elementsymbole in Kompaktkacheln von der fehleranfälligen Grenzwertabfrage gelöst und als robuste Mindesttypografie umgesetzt.
- Kompakte Elementsymbole dürfen nun bis zu 90 Prozent der Kachelbreite nutzen.
- Schriftgröße der Kompaktkacheln direkt an die berechneten Kachelmaße gekoppelt; breiteste Elementsymbole nutzen den vorgesehenen Innenraum nun tatsächlich aus.
- Vergrößerungslogik auf die reine Symbolstufe begrenzt; vollständige und mittlere Kacheln verwenden wieder ihre ursprüngliche Typografie.
- Spaltennummern typografisch auf die Schriftgröße der Legende angehoben.
- Element-Einzelansicht typografisch nachgeschärft: Ordnungszahl auf exakt dieselbe responsive Schriftgröße wie den horizontal zentrierten Elementnamen gesetzt.

## 0.1.0 – 2026-08-14

### Stand

- Erste funktionsfähige Fassung der PSE-Mini-App.
