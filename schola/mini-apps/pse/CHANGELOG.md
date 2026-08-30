# Changelog – Periodensystem

Alle wesentlichen Änderungen an der Mini-App werden in dieser Datei dokumentiert.

## Unveröffentlicht

### Ergänzt

- Ein Drei-Punkte-Menü im Kopfbereich kopiert die stabile ID der aktuell gewählten Darstellung in die Zwischenablage und bestätigt den Vorgang direkt in der App.
- Kleine Kachelbeschriftungen verwenden die lokal gebündelte Source Sans 3 und werden beim Überfahren nicht mehr mitskaliert, damit sie auch auf dunklen Ansichten klar gerastert bleiben.
- Bei schmalen Fenstern bleiben Ordnungszahl und Elementname sichtbar; die Kollisionsprüfung verkleinert Namen zunächst behutsam und blendet sie erst aus, wenn auch die kompakte Stufe nicht passt.
- Elementnamen sind in allen Fenstergrößen besser lesbar; lange Namen werden innerhalb der Kachel mit einem Auslassungszeichen gekürzt.
- Die Kacheloption „Radioaktivität und Aggregatzustand“ ergänzt oberhalb des Radioaktivitätssymbols kompakte Zeichen für fest, flüssig, gasförmig und unbekannt.
- In der eigenen Aggregatzustandsansicht bleibt das zusätzliche Zustandssymbol verborgen, da dort bereits die Kachelfarbe den Zustand codiert.
- Die Kollisionsprüfung der Kachelmetadaten berücksichtigt nur noch die tatsächlich konkurrierende Ordnungszahl, sodass Zustands- und Radioaktivitätssymbole nicht irrtümlich rasterweit ausgeblendet werden.
- Die Aggregatzustandsansicht erkennt überkritische Fluide, wenn Temperatur und Druck über einem vollständig hinterlegten NIST-Kritikpunkt liegen; dokumentiert sind Wasserstoff, Helium, Stickstoff, Sauerstoff, Chlor, Argon, Krypton und Xenon.
- Unbekannte Aggregatzustände bleiben ohne Fragezeichen; fehlt das Zustandssymbol oder wird es in der Aggregatzustandsansicht bewusst ausgelassen, rückt ein vorhandenes Radioaktivitätssymbol an die erste Position.
- Das Gassymbol skaliert Punktgröße und Abstände nun mit der Kachelhöhe und bleibt dadurch auch in kleinen Darstellungen kompakt.
- Die kleinen Aggregatzustandssymbole beziehen sich fest auf 25 °C und 1 bar; nur die eigene Aggregatzustandsansicht reagiert weiterhin auf frei gewählte Temperatur- und Druckwerte.
- Der frühere Erdoberflächen-Mittelwert wurde durch einen eindeutig beschrifteten Standardbedingungen-Knopf für 25 °C und 1 bar ersetzt.
- Temperatur und Druck stehen in der Aggregatzustandsansicht nun untereinander mit vorangestellter Feldbezeichnung, gekoppeltem Schieberegler und einem platzsparenden Reload-Symbol für die Standardwerte.
- Manuell eingegebene Temperatur- und Druckwerte dürfen den jeweiligen Sliderbereich überschreiten und werden dennoch vollständig berechnet; nur der Regler bleibt dabei am Bereichsende stehen.
- Feste Zahlenfeldbreiten verhindern Layoutsprünge bei langen Werten. Separate Maximalfelder steuern die Sliderbereiche; das Reload-Symbol stellt Standardbedingungen und voreingestellte Maxima gemeinsam wieder her.
- Die Einheitenknöpfe in den linken Wertefeldern öffnen nach oben und schalten Temperatur zwischen °C, K und °F sowie Druck zwischen hPa und bar um, ohne die intern gespeicherten SI-nahen Rechenwerte zu verändern.
- Bei exakt 0 hPa wird Sublimation unterhalb des hinterlegten Schmelzpunkts nicht mehr als „unbekannt“, sondern mit gleich breiten Streifen aus Feststoff- und Gasfarbe dargestellt; Legende und Fachinformation erläutern die Modellgrenze.
- Die Phasenslider füllen auch in schmalen Fenstern ihre gesamte responsive Grid-Spalte und schließen ohne eine zusätzliche viewportabhängige Lücke an die Maximalfelder an.
- Die Häufigkeitsansichten enthalten nun ein Bulk-Moon-PSE für den gesamten Mond. Es verwendet dieselben logarithmischen Massenanteilsfarben wie die Erde und dokumentiert modellbasierte Werte aus Taylor und McLennan.

### Organisiert

- Das zentrale App-Icon bildet nun eine vollständige Helium-Elementkachel mit Ordnungszahl, Atommasse, Symbol und Namen ab und bleibt die gemeinsame Referenz für Schola-Hauptseite und Classroom Screen.
- Die beiden app-spezifischen Werkzeuge zur Aktualisierung und Prüfung der Phasendaten liegen nun manifestkonform unter `schola/mini-apps/pse/tools/`; ihre relativen Datenpfade wurden an den neuen Ort angepasst.
- Der Einstellungsbutton verwendet nun die zentrale, offline verfügbare Symbolvorlage aus `assets/ui/icons` statt einer app-spezifisch gezeichneten Variante.

### Korrigiert

- Die vier Konturen des neuen Orbitalformen-Icons bleiben nun auch in der kompakten Kopfzeilenfassung vollständig geschlossen; zusätzlicher Innenabstand und eine leicht kräftigere, gerundete SVG-Kontur verhindern offene Enden durch Rasterung.
- Die Orbitalanimation wird nicht mehr an den Kanten des Modellcontainers abgeschnitten. Eine transparente fenstergroße Zeichenfläche lässt die Punktwolke im Hintergrund weiterlaufen, während Kern, Achsen, Maßstab und Interaktionsbereich fest am bisherigen Modellcontainer verankert bleiben.
- Die manuelle Rotation der Orbitalformen folgt nun horizontal und vertikal der Greifbewegung der Maus beziehungsweise des Fingers; die zuvor vertauschten Bewegungsrichtungen wurden korrigiert.
- Die Titeltypografie der normalen und der modellbasierten Elementansicht ist nun vollständig vereinheitlicht: identische responsive Schriftgröße, Zeilenhöhe und Einzeiligkeit. Auf Desktop erhält die Infospalte zusätzlichen Raum ausschließlich nach rechts, sodass auch „Element 118“ regulär vollständig passt, ohne den korrigierten linken Titelanker zu verschieben oder auf eine Ellipse zurückzugreifen.
- Den verbleibenden horizontalen Titelsprung beim Umschalten beseitigt: Die normale Faktenansicht übernimmt nun exakt das bereits richtige Spaltenraster der Modellansicht. Modellüberschriften bleiben durch eine spaltengebundene responsive Schriftgröße und eine sichere Einzeilenbegrenzung vollständig in einer Zeile.
- Die Überschrift „Element …“ liegt nun außerhalb des Scrollbereichs der Infospalte und bleibt beim Scrollen der Orbitalsteuerungen dauerhaft sichtbar. Normale Einzelansicht und Modellansicht teilen sich denselben Bühnen- und Titelanker, sodass die Überschrift auch beim Umschalten zwischen Elementkachel und Modell nicht mehr springt.
- Die Infospalte der Atommodelle klebt nicht mehr am Fensterrand. Modell und Information liegen nun in einer gemeinsam zentrierten Bühne mit stabilem Außenabstand; „Element …“ behält beim Wechsel zwischen Bohrmodell, Orbitalbesetzung und Orbitalformen exakt denselben oberen Anker. Mittlere Breiten nutzen eine kontrollierte Überlagerung innerhalb der Bühne, kleine Ansichten eine klare Stapelung.
- Überlaufende Orbitalmodelle in mittleren Desktopfenstern behoben: Die Modellgröße bleibt erhalten, während Darstellung und rechte Steuerung dieselbe auf das Fenster begrenzte Fläche nutzen und sich bei Bedarf kontrolliert überlagern.
- Leere Info- und Einstellungsbuttons beim direkten lokalen Öffnen behoben: Die zentralen Symbolmasken sind nun ohne blockierbaren SVG-Unterabruf vollständig in der gemeinsamen UI-Vorlage verfügbar.
- Die Herkunftsansicht bewahrt wieder die vertraute Position von Kürzel, Ordnungszahl und Elementname innerhalb jeder Kachel.
- Fremde Kachelmetadaten wie Atommasse oder Radioaktivitätssymbol werden in der Herkunftsansicht ausgeblendet, damit die Farbanteile eindeutig lesbar bleiben.
- Das Radioaktivitätssymbol ist nun so hoch wie die Ordnungszahl, liegt mit ihr auf einer gemeinsamen horizontalen Mittelachse und besitzt nach oben und rechts denselben Randabstand.
- Das Radioaktivitätssymbol folgt nun eigenen horizontalen und vertikalen Kollisionsregeln: Es wird rechtzeitig und einheitlich ausgeblendet, ohne dabei vorzeitig die Ordnungszahlen zu entfernen.
- Ordnungszahl und Radioaktivitätssymbol skalieren nun auch bei abnehmender Fensterhöhe fließend bis zu ihrer gemeinsamen Mindestgröße; die bestehende Skalierung über die Fensterbreite bleibt erhalten.
- Die Kollisionsprüfung der Elementnamen erfolgt nach Breitenänderungen in einem stabilen zweiten Layoutdurchlauf. Namen verschwinden dadurch nicht mehr willkürlich, und das Kürzel wechselt ohne zusätzliche Höhenänderung an die richtige Position zurück.
- Die Schriftgröße der Elementnamen richtet sich nun nach der tatsächlichen Kachelhöhe statt nach der Fensterbreite. Ein breiteres Fenster kann den Namen daher nicht mehr innerhalb einer höhenbegrenzten Kachel künstlich vergrößern und ausblenden.

### Hinzugefügt

- Die Elementansicht besitzt oben links nun eine zusammengehörige Navigations-Toolbar mit zwei getrennten Zielen: „Zurück“ erscheint ausschließlich innerhalb einer verfolgten Edelgaskern-Kette und führt zum vorherigen Element; „Periodensystem“ bleibt dauerhaft sichtbar und öffnet direkt die Übersicht. Beide Aktionen erhalten eigene Linienicons, klare Fokus-/Hoverzustände und eine kollisionsfreie mobile Anordnung.
- Die fachlich uneindeutige horizontale Einrückung von s-, p-, d- und f-Unterniveaus wurde entfernt. Sämtliche Reihen besitzen nun denselben Ausgangspunkt; allein die Vertikale bildet die Energieordnung ab.
- Abgekürzte Edelgaskerne in der Orbitalbesetzung sind nun navigierbare Buttons. Sie öffnen die Orbitalbesetzung des genannten Edelgases; ein kontextbezogener Rückweg führt zum zuvor betrachteten Element. Direkte Links unterstützen dafür `model=orbital`.
- Die Phasenlegende der Orbitalformen steht nun direkt unter der Visualisierung. Deren Beschreibung nennt Orbital und Element; der bisherige Hinweis „ziehen zum Drehen“ wurde entfernt.
- Die Orbitalbesetzung wurde zu einem großformatigen Orbital-Energiediagramm ausgebaut: Energieachse, gestaffelte Unterniveaus, Besetzungsquoten, hervorgehobene Außenzone, Grundzustandskonfiguration, kompakte Regelkarten und eine schrittweise Auffüllanimation nutzen nun die gesamte Modell- und Infobühne.
- Eine didaktische Notiz unter Orbitalform und Schalenwahl erklärt die Besetzungspunkte: Sie beziehen sich auf die Grundzustandskonfiguration des neutralen Atoms; eine fehlende Markierung bedeutet „unbesetzt“, nicht „nicht existent“.

- Bohrsches Atommodell um eine Schalenübersicht im Infobereich ergänzt: tatsächliche Besetzung, theoretische Maximalkapazität `2n²` und dezente Füllanzeige stehen nun direkt unter dem Elementtitel; die redundante Besetzungszeile unter der Modellgrafik entfällt.
- Modellauswahl in ein kompaktes Dropdown hinter dem Button „Modelle“ oben rechts in der übergeordneten Kopfzeile verschoben; sie ist damit strukturell von der Infospalte getrennt. Bestehende Modell-Icons und aktive Kennzeichnung bleiben erhalten.
- Kontextabhängigen Informationsdialog ergänzt. Ein zentrales Info-Symbol öffnet zur aktiven PSE-Darstellung Erläuterungen der physikalischen Grundlage, chemischen Bedeutung, mathematischen Formeln und fachlichen Modellgrenzen.
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

- Das bisher stilistisch abweichende, farbige Icon der Orbitalformen wurde durch ein monochromes schematisches 3d-Orbital mit vier Lappen und Kernpunkt ersetzt. Es folgt nun derselben Linien- und Größenlogik wie die Icons für Bohrmodell und Orbitalbesetzung.
- Das redundante Textelement „Lernidee:“ vor den Reglererklärungen wurde entfernt; die didaktischen Hinweise beginnen nun unmittelbar mit ihrem Inhalt.
- Die Regler des Orbital-Labors wurden didaktisch beschriftet: Darstellungsform, eingeschlossener Anteil und Schnittebene erklären jeweils ihre Lernidee und Modellgrenze. Der Anteilsregler hebt nun tatsächlich 50 bis 99 Prozent einer aus der wasserstoffähnlichen `|ψ|²`-Verteilung erzeugten Modellstichprobe hervor; außerhalb liegende Messorte bleiben blass sichtbar.
- Die bisherigen frei geformten Orbitalpunktwolken wurden durch deterministisch erzeugte wasserstoffähnliche Verteilungen ersetzt. Radialfunktionen, Laguerre-Polynome, reelle s-/p-/d-Winkelgestalten, Phasenwechsel und radiale Knoten bestimmen nun die Darstellung; die Oberfläche grenzt das Modell ausdrücklich von exakten Mehrelektronenrechnungen ab.
- Orbitalformen und Bohrsches Modell teilen nun dieselbe zentrierte Modellbühne sowie einen grafisch identischen, schematischen Atomkern mit Elementsymbol. Die Orbitaldarstellung bleibt fachlich korrekt als Wahrscheinlichkeitsverteilung vom Bohrschen Bahnmodell getrennt; es werden keine falschen Schalenradien auf Orbitale übertragen.
- Die Diagrammachsen der Orbitalformen übernehmen nun exakt die dunkelgrüne Linienfarbe und Strichstärke der Kernkontur.
- Koordinatenachsen, Kernkontur und sämtliche radialen Knotenkreise beziehen ihre Strichstärke nun ausdrücklich aus demselben Linienwert des Bohrschen Modells.
- Die Strichstärke wird dabei wie im vergrößerten Bohr-SVG mit dem Modellmaßstab skaliert. Dadurch entsprechen nun auch Kernkontur und Linien des Canvas-Modells optisch – nicht nur numerisch – der Bohr-Darstellung.
- Die Orbitalpunktwolke wird anhand ihrer projizierten Tiefe vor und hinter dem Kern gestaffelt. Vordergrundpunkte überlagern den Kern nun sichtbar und verankern ihn räumlich innerhalb des Orbitals.
- Die Kernfläche der Orbitalformen verwendet nun neutral die Hintergrundfarbe statt der jeweiligen PSE-Kategoriefarbe; das Bohrsche Modell behält seine farbliche Zuordnung.
- Die Modellauswahl in der Elementkopfzeile folgt nun der Schola-Formsprache als kompakter Toolbar-Select: Icon und Kurzname zeigen das aktive Modell, ein gezeichnetes Chevron ersetzt das uneinheitliche Textzeichen und das zusammenhängende Dropdown kennzeichnet die Auswahl mit einem Haken. Fokuszustände, Fokusführung nach der Auswahl und mobile Touch-Ziele wurden zugleich verbessert.

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
