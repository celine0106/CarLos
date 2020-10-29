# CarLos

CarLos ist ein Autoforum für das Kaufen und Verkaufen von Gebrauchtwagen.
Nach einer erfolgreichen Registrierung und dem Login ist es den Nutzern möglich auf der Startseite alle angebotenen Gebrauchtwagen einzusehen. Unter dem Menüpunkt "Meine Angebote" ist es den Nutzern ebenfalls möglich Inserate von Gebrauchtwagen einzustellen und unter dem Menüpunkt "Profil" können Nutzer angegebene Daten zu sich bearbeiten.

## Team

* Evelyn Stoll
* Johanna Gröll
* Celine Stock

## Quick Start

```
* git clone https://github.com/celine0106/CarLos
* npm install
* carlos.sql in MySQL importieren
* .env file mit dem Inhalt DB_PASSWORD="" in Visual Studio Code anlegen 
* MySQL starten
* node server.js in der Command Line eingeben 
* http://localhost:5100/views/logInIndex im Browser öffnen
```

## Architektur

Die Web-Anwendung teilt sich in die Berreiche Frontend, Backend und Datenbank auf.

### Frontend

Im Frontend wurden die grafischen Benutzeroberflächen gestaltet. Hierbei wurde auf HTML, CSS, JavaScript und Bootstrap zurückgegriffen. Für das Styling mit CSS wurden für jede Benutzeroberfläche CSS-Dateien angelegt, welche in die dazugehörigen HTML-Index Dateien importiert wurden. 
Die Navigationsleiste wurde auch als extra HTML-Index Datei angelegt. Dazu haben wir uns entschlossen, da diese in jeder Benutzeroberfläche vorhanden ist und wir sie somit in die HTML-Index Dateien der Benutzeroberflächen lediglich importieren und nicht immer extra codieren mussten.
In der Anwendung wurden ebenfalls Icons eingebaut welche mit Bootstrap realisiert wurden, weshalb in den dazugehörigen HTML-Index Dateien Boostrap importiert wurde. Mit Bootstrap war das einfügen von Icons sehr leicht zu realsieren und es gab für jede Funktion das passende Icon welches schnell im Internet zu finden war, weshalb wir uns hier für Bootstrap entschieden haben.
Die Gestaltung der Benutzeroberflächen wurde durch eigenbaute Funktionen mit JavaScript verschönert. Zum einen wurde die Toogle-Bar auf der Login-Seite mit JavaScript gestaltet, die Modal Fenster, welche sich unter dem Menüpunkt "Meine Angebote" beim Klicken auf den Plus-Button und beim Klicken auf das Stift-Symbol öffnen und ebenfalls bei dem Menüpunkt Profil, bei welchem sich das Stift-Symbol zu einem Hacken-Smybol verändert.
Das Frontend beinhaltet neben der Gestaltung der Benutzeroberflächen auch die Verknüpfung zum Backend.
Hier wurden vom Frontend angeforderte Daten über Fetch-API bei dem Backend angefragt.

### Backend 

Im Backend findet der Austausch mit der Datenbank statt. Hier werden Daten aus der Datenbank geholt aber auch Daten zur Datenbank hinzugefügt bzw. gelöscht. Für diesen Client-Server Transport haben wir uns für JSON entschieden. Hierbei findet man eine REST-API wieder mit CRUD-Operation.
Die Create-Operation findet man in dem Menüpunkt "Meine Angebote" wieder. Hier lassen sich durch das Klicken auf den Plus-Button neue Angebote anlegen.
Die Read-Operation findet man auf der Startseite, in dem Menüpunkt "Meine Angebote" und unter dem Profil wieder. Hier werden jeweils die passenden Daten aus der Datenbank geholt. Die Startseite ermöglicht hierbei noch eine gefiltertet Abfrage der Datenbank.
Die Update-Operation findet man unter dem Menüpunkt "Meine Angebote" und "Profil" wieder. Hier können jeweils durch das Klicken auf das Stift-Symbol anglegte Daten geändert werden.
Die Delete-Operation findet man unter dem Menüpukt "Meine Angebote" wieder. Hier können durch das Klicken auf das Papierkorb-Symbol angelegte Datensätze löschen werden.

### Datenbank 

Die Datenbank wird über MySQL angelegt und beinhaltet alle gespeicherten Datensätze der Anwendung. 
Die Datenbank ist aufgebaut durch 2 Tabellen. Die Benutzer Tabelle, in der registrierte Benutzer hinterlegt sind und die Angebot Tabelle, in der angelegte Angebote gepseichert sind.
Beim erstmaligen importieren der Datenbank befinden sich ebenfalls schon Testdaten in der Datenbank.

![ERD](../views/DB-Modell_CarLos.jpg)





