# Timer Engineering Manifest

## Präambel

Timer ist eine eigenständig erreichbare Schola-Mini-App zur sichtbaren Strukturierung von Arbeitszeit. Sie verbindet mehrere farbcodierte Phasen mit einer optionalen NTA-Zusatzzeit und kann sowohl allein als auch eingebettet in andere Ziselin-Anwendungen genutzt werden.

## Stellung in der Manifestordnung

Dieses Manifest regelt den spezifischen Kompetenzbereich der Mini-App Timer. Es ergänzt das Ziselin-Organisationsmanifest und das Schola-Projektmanifest. Erkannte Widersprüche werden vor einer Implementierungsänderung gemeinsam geklärt.

## Grundregeln

- Timer wird als eigenständige Mini-App entwickelt und ist nicht fachlich an den Classroom Screen gebunden.
- Der eigenständige Zugang und eingebettete Ansichten verwenden dieselbe Timer-Implementierung; unabhängige Kopien der Logik sind unzulässig.
- Einbettende Apps dürfen Darstellung, Positionierung und Zustandsübergabe anpassen, ohne die fachliche Zeit-, Phasen- und NTA-Logik zu duplizieren.
- Die eigenständige Ansicht benötigt keinen Browser-/Editor-Arbeitsbereich und konzentriert sich auf Steuerung und Funktionalität des Timers.
- Einstellungen und laufende Zustände müssen grundsätzlich speicher- und zwischen zulässigen Einbettungen austauschbar bleiben.
