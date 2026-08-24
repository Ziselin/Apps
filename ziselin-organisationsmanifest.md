# Ziselin – Organisationsmanifest

## Präambel

Ziselin ist der gemeinsame Entwicklungsraum für miteinander verwandte digitale Werkzeuge. Die Projekte Atlas und Schola bündeln Anwendungen für Wissensarbeit, Darstellung, Unterricht und schulische Organisation in einer konsistenten technischen und gestalterischen Umgebung.

## Zweck

Dieses Manifest beschreibt verbindliche organisatorische Regeln für das gesamte Ziselin-Projekt. Es gilt für alle Apps, Teilprojekte und gemeinsam verwendeten Ressourcen im Hauptordner `Ziselin`.

## Grundregeln

1. **App-spezifische Dateien bleiben in der jeweiligen App.**
   Quellcode, Styles und Ressourcen, die ausschließlich von einer App verwendet werden, liegen in deren App-Ordner.

2. **Gemeinsam verwendete Bestandteile werden zentral abgelegt.**
   Komponenten, Gestaltungsmuster und Ressourcen, die von mehreren Apps verwendet werden können, dürfen nicht als voneinander unabhängige Kopien in App-Ordnern geführt werden.

3. **UI-Templates und Vorlagen gehören nach `assets/ui`.**
   Wiederverwendbare Bedienoberflächen, Komponentenstile, Dialog-, Menü-, Button- und Exportvorlagen werden ausschließlich unter `assets/ui` gespeichert. App-Ordner enthalten nur die Einbindung und die app-spezifische Konfiguration dieser Vorlagen.

4. **Vorhandene Vorlagen werden vor Neuanlagen geprüft.**
   Bevor ein neues UI-Muster angelegt wird, ist zu prüfen, ob unter `assets/ui` bereits eine geeignete Vorlage existiert und erweitert werden kann.

5. **Gemeinsame Vorlagen bleiben app-neutral.**
   Namen, Klassen und Grundlogik zentraler Vorlagen dürfen nicht unnötig an eine einzelne App gekoppelt sein. App-spezifische Texte, Daten und Aktionen werden bei der Einbindung ergänzt.

6. **Keine unbemerkten Duplikate.**
   Wird ein app-spezifischer Bestandteil zu einer gemeinsamen Vorlage, wird die ursprüngliche lokale Kopie entfernt und jede betroffene Referenz auf den zentralen Pfad umgestellt.

7. **Änderungen an gemeinsamen Vorlagen werden übergreifend geprüft.**
   Anpassungen unter `assets/ui` müssen auf mögliche Auswirkungen auf alle einbindenden Apps geprüft werden.

8. **Dateinamen beschreiben Funktion statt Herkunft.**
   Gemeinsame Dateien werden nach ihrem Zweck benannt, beispielsweise `export-template.css`, nicht nach der App, in der sie zuerst entstanden sind.

9. **Manifeste ergänzen sich.**
   Spezifische Engineering-Manifeste einzelner Apps oder Teilprojekte bleiben gültig. Bei organisatorischen Widersprüchen gilt dieses Manifest für die projektweite Ablagestruktur.

10. **Projekte besitzen einen gemeinsamen Projektordner.**
    Die Apps eines Projekts werden als Unterordner in dessen Projektordner geführt. Das Projektmanifest liegt direkt im Projektordner. Für Atlas gilt `atlas/{earthmap,sourcerer,timemap,typemap}` mit `atlas/atlas-engineering-manifest.md`; für Schola gilt `schola/{classroom,noten,stundenplan}` sowie `schola/mini-apps/{…}` für eigenständig nutzbare Mini-Apps. App-spezifische Hilfsprogramme liegen bei ihrer App. Ein allgemeiner Sammelordner `docs` wird nicht für Projektmanifeste verwendet.

11. **Jede Einzelapp führt ein eigenes Changelog.**
    Im Stammordner jeder App liegt eine Markdown-Datei `CHANGELOG.md`. Sie protokolliert funktionale, gestalterische, technische und organisatorische Änderungen in knapper, chronologischer Form. Zusammengehörige Änderungen eines Funktionsbereichs werden in einem gemeinsamen Eintrag gebündelt; einzelne Arbeitsschritte und kleinteilige Korrekturfolgen werden nicht separat aufgelistet. Neue Einträge werden im selben Arbeitszusammenhang wie die Änderung ergänzt.

12. **App-Versionen werden im Changelog gepflegt.**
    Die Versionsnummer folgt grundsätzlich dem Schema `MAJOR.MINOR.PATCH`: `PATCH` für Korrekturen, `MINOR` für neue oder merklich erweiterte Funktionen und `MAJOR` für nicht rückwärtskompatible grundlegende Umbauten. Bis zur ersten stabilen Veröffentlichung beginnen Apps bei Version `0.1.0`. Nach einer veröffentlichten Version wird die Nummerierung mit der vorgesehenen nächsten Version fortgesetzt; noch nicht abgeschlossene Änderungen werden an dieser Stelle als `Unveröffentlicht` gekennzeichnet. Innerhalb einer Version werden Änderungen nach Arbeitstag gruppiert und in absteigender Datumsfolge dokumentiert.

13. **Manifeste beginnen mit einer Präambel.**
    Direkt nach dem Titel enthält jedes Projekt- und App-Manifest eine kurze Präambel. Sie beschreibt Zweck, Charakter und Ausrichtung des zugehörigen Projekts beziehungsweise Produkts, wird bei der Anlage eines neuen Manifests automatisch ergänzt und im weiteren Entwicklungsverlauf angepasst, sobald sich Zweck, Zielgruppe oder wesentlicher Funktionsumfang verändern.

14. **Umfangreiche lokale Datensätze werden von gewöhnlichen Veröffentlichungen getrennt.**
    Große Rohdaten, Provider-Spiegelungen und generierte Geometriearchive, die für die vollständige Offline-Installation benötigt werden, werden nicht unbemerkt mit regulären App-Änderungen veröffentlicht. Projektweite Ausschlüsse werden nachvollziehbar in `.gitignore` dokumentiert. Kleine Quell-, Katalog-, Index- und Steuerdateien werden davon getrennt bewertet. Veröffentlichungen werden gezielt zusammengestellt; ein pauschales Hinzufügen aller Dateien ist kein zulässiger Standardablauf.

15. **Gleiche Aktionen verwenden gleiche zentrale Symbole.**
    Für funktional identische Aktionen wird projektweit dieselbe Symbolvorlage aus `assets/ui/icons` verwendet. App-spezifisch nachgezeichnete Varianten und externe Laufzeitabrufe sind zu vermeiden. Ein abweichendes Symbol wird nur verwendet, wenn die Funktion fachlich abweicht oder die Abweichung ausdrücklich vereinbart wurde. Zentrale CSS-Einbindungen müssen zusätzlich beim direkten lokalen Öffnen über `file://` funktionieren und dürfen dafür keinen vom Browser blockierbaren Unterabruf voraussetzen.

## Aktuelle zentrale UI-Vorlagen

- `assets/ui/export-template.css` – gemeinsame Darstellung von Exportbutton, Exportmenü und Dateiformat-Auswahl
- `assets/ui/buttons.css` – gemeinsame Buttonzustände sowie die Einbindung zentraler UI-Symbole
- `assets/ui/app-menu.css` und `assets/ui/app-menu.js` – gemeinsames Hauptmenü nach dem TimeMap-Muster mit app-spezifisch befüllbaren Akkordeonbereichen
- `assets/ui/icons/settings.svg` – gemeinsames Symbol für Einstellungen
- `assets/ui/icons/information.svg` – gemeinsames Symbol für kontextbezogene Informationen

## Manifestordnung und Zuständigkeiten

1. **Manifeste bilden eine Normenhierarchie.**
   Das Ziselin-Organisationsmanifest regelt die projektweite Organisation. Bereichs- und Architekturmanifeste konkretisieren gemeinsame fachliche oder technische Grundsätze. App-Manifeste regeln ihren jeweiligen spezifischen Kompetenzbereich.

2. **Die speziellere Regel gilt innerhalb ihres Kompetenzbereichs.**
   Ein App-Manifest darf eine allgemeine Regel für die besonderen Anforderungen seiner App konkretisieren. Es darf eine höherrangige organisatorische Regel nicht stillschweigend außer Kraft setzen.

3. **Kompetenz geht vor bloßer Dateinähe.**
   Projektweite Ablage, gemeinsame Ressourcen und appübergreifende Standards werden im Hauptmanifest geregelt. Fachlogik, Datenmodelle und besondere Bedienregeln einer App werden in deren App-Manifest geregelt.

4. **Jede App besitzt ein eigenes Manifest.**
   Neue Apps werden zusammen mit einem App-Manifest angelegt. Das Manifest beschreibt mindestens Zweck, Zuständigkeit, Verhältnis zu übergeordneten Manifesten und die bereits vereinbarten app-spezifischen Regeln.

5. **Organisatorische Absprachen werden dokumentiert.**
   Wenn im Arbeitsprozess Regeln zur Struktur, Ablage, Benennung, Wiederverwendung oder Zuständigkeit vereinbart werden, sind die betroffenen Manifeste im selben Arbeitszusammenhang anzupassen.

6. **Manifestkonflikte werden vor Änderungen besprochen.**
   Wird ein Widerspruch zwischen einer gewünschten Änderung und einem geltenden Manifest erkannt, darf er nicht durch eine stillschweigende oder blinde Korrektur aufgelöst werden. Der Konflikt, die betroffenen Regeln und mögliche Lösungen werden zuerst gemeinsam erörtert.

7. **Regeländerungen bleiben ausdrücklich.**
   Eine Abweichung in einer einzelnen Implementierung ändert kein Manifest. Eine bestehende Regel wird erst geändert, wenn die Änderung ausdrücklich vereinbart und im zuständigen Manifest dokumentiert wurde.

8. **Dauerhafte Gesprächsergebnisse werden automatisch dokumentiert.**
   Organisationsregeln, wiederkehrende Darstellungsregeln und grundlegende Regeln zur App-Logik, die im gemeinsamen Arbeitsprozess entwickelt oder bestätigt werden, werden ohne zusätzliche Aufforderung im zuständigen Manifest hinterlegt. Flüchtige Einzelkorrekturen werden nur aufgenommen, wenn aus ihnen eine wiederverwendbare oder dauerhaft maßgebliche Regel entsteht.

9. **Die Dokumentation folgt der Zuständigkeit.**
   Projektweite Regeln werden im Ziselin-Organisationsmanifest dokumentiert. Appübergreifende technische Regeln gehören in das zuständige Architektur- oder Bereichsmanifest. App-spezifische Darstellungs- und Logikregeln gehören in das jeweilige App-Manifest. Falls mehrere Ebenen betroffen sind, werden die Regeln aufeinander abgestimmt dokumentiert.

10. **Alle Manifeste sind Markdown-Dateien.**
    Manifeste werden ausschließlich im Markdown-Format mit der Dateiendung `.md` geführt, damit sie unmittelbar lesbar, schnell auffindbar und durch User einfach prüfbar bleiben.

11. **Relevante Manifeste werden vor Änderungen herangezogen.**
    Vor strukturellen, gestalterischen oder die App-Logik betreffenden Änderungen werden das Ziselin-Organisationsmanifest und die für den betroffenen Bereich oder die betroffene App zuständigen Manifeste geprüft. Dadurch dienen die Dateien als dauerhaftes Projektgedächtnis und nicht nur als nachträgliche Dokumentation.

## Projektweite Engineering-Grundsätze

- Fachliche Daten und Darstellung bleiben getrennt; Metadaten werden nicht stillschweigend zu Formatierungsregeln.
- Externe Daten werden in dokumentierte interne Formate normalisiert. Herkunft, Lizenz, Abrufzeitpunkt, Gültigkeit und Review-Status bleiben als Provenienz erhalten.
- Stabile IDs haben für Referenzen und Matching Vorrang vor veränderlichen Anzeigenamen.
- Zeitliche Gültigkeit wird als maschinenlesbare Facheigenschaft geführt und nicht nur in Dateinamen dargestellt.
- Wiederkehrende UI-Elemente werden aus zentralen Vorlagen abgeleitet und geben sichtbares Feedback für Hover-, Aktiv-, Lade- und Übernahmezustände.
- Änderungen dürfen keine stillen Datenverluste erzeugen. Nicht mehr sichtbare, aber weiterhin relevante Informationen bleiben rekonstruierbar.
- Performance, Diagnosefähigkeit und verständliche Kommentare zu Architekturentscheidungen sind Bestandteile der Implementierung und keine nachträglichen Ergänzungen.

## Verbindlicher Veröffentlichungsablauf

1. **Remote-Stand zuerst prüfen.**
   Vor einer Veröffentlichung werden Branch, Upstream und möglicher Rückstand gegenüber `origin/main` geprüft. Fremde Remote-Änderungen werden kontrolliert und konfliktfrei übernommen, bevor ein neuer Commit entsteht.

2. **Arbeitsstand vollständig sichten.**
   Geänderte, neue, gelöschte und ignorierte Dateien werden getrennt betrachtet. Große Dateien, generierte Daten und fachfremde Änderungen dürfen nicht durch pauschales Hinzufügen in ein Veröffentlichungspaket geraten.

3. **Fachlich geschlossene Pakete bilden.**
   Vorgemerkt werden nur Dateien, die zum ausdrücklich benannten Änderungsumfang gehören. Gleichzeitig vorhandene Arbeiten an anderen Apps oder Datensätzen bleiben außerhalb des Commits.

4. **Vor dem Commit prüfen.**
   In angemessenem Umfang werden Syntax, Datenvollständigkeit, lokale Abhängigkeiten, Dateigrößen, Diff-Qualität, mögliche Zugangsdaten und die sichtbare App-Funktion kontrolliert. Bekannte fachliche Datenlücken werden von technischen Fehlern unterschieden und transparent benannt.

5. **Änderung nachvollziehbar protokollieren.**
   App-Änderungen werden im zuständigen `CHANGELOG.md` dokumentiert. Der Commit erhält einen knappen, inhaltlich beschreibenden Titel und eine datenschutzfreundliche Autorenidentität.

6. **Push benötigt ausdrückliche Freigabe.**
   Ein lokaler Commit berechtigt nicht automatisch zum Hochladen. Jeder Push nach GitHub und jeder dadurch ausgelöste Online-Deploy erfolgt erst nach einer ausdrücklichen Freigabe des Users.

7. **Deploy vollständig verifizieren.**
   Nach dem Push werden der Remote-Commit, der GitHub-Pages-Build, Custom Domain und HTTPS sowie die öffentlich bereitgestellte App geprüft. Eine Veröffentlichung gilt erst dann als abgeschlossen, wenn der vorgesehene Commit online fehlerfrei ausgeliefert wird.

8. **Offline-Daten bleiben geschützt.**
   Umfangreiche EarthMap-Geometrien und andere ausdrücklich lokale Datenbestände werden niemals pauschal veröffentlicht. Änderungen an Online-Indizes dürfen keine Dateien voraussetzen, die durch die Veröffentlichungsregeln ausgeschlossen sind.

## Manifestbestand

- `atlas/atlas-engineering-manifest.md` – Projekt Atlas
- `atlas/earthmap/earthmap-engineering-manifest.md` – EarthMap
- `atlas/sourcerer/sourcerer-engineering-manifest.md` – Sourcerer
- `atlas/timemap/timemap-engineering-manifest.md` – TimeMap
- `atlas/typemap/typemap-engineering-manifest.md` – TypeMap
- `schola/schola-engineering-manifest.md` – Projekt Schola
- `schola/classroom/classroom-engineering-manifest.md` – Classroom Screen
- `schola/noten/noten-engineering-manifest.md` – Noten
- `schola/stundenplan/stundenplan-engineering-manifest.md` – Stundenplan
- `schola/mini-apps/timer/timer-engineering-manifest.md` – Timer
- `schola/mini-apps/pse/pse-engineering-manifest.md` – Periodensystem
