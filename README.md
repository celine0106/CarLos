# Projektname

CarLos

## Beschreibung

CarLos ist eine Autoforum-Website für das Verkaufen und Kaufen von Autos.
Um diese Seite nutzen zu können erfolgt als erster Schritt eine Registrierung
Alle Autos, welche zum Kauf bereitstehen, werden auf der Startseite aufgelistet. Die Liste kann ebenfalls gefiltert werden.
Die Autos die verkauft werden sollen sind unter dem Menüpunkt meine Angebote anzulegen. Die Verkauften Autos können jederzeit von dem Ersteller bearbeitet oder gelöscht werden.

## Team

* Evelyn Stoll
* Johanna Gröll
* Celine Stock

## Quick Start

```
* git clone https://github.com/celine0106/CarLos
* npm init
* npm install express
* npm install mysql2
* npm install express-session
* npm install express-fileupload
```
Um die Datenbank nutzen zu können muss zusätzlich in XAMPP eine Datenbank mit den Namen carlos angelegt werden. In diese ist dann die SQL-Datei carlos.sql zu importieren. 
Um ein Passwort für die Datenbank festzulegen muss innerhalb dieses Projekts ein .env file angelegt werden mit dem Inhalt DB_PASSWORD=""
Um nun die Anwendung starten zu können müssen folgende Schritte gemacht werden:
```
* node server.js
* http://localhost:5100
```

## Architektur

In diesem Projekt wurde HTML, CSS, Bootstrap und Javascript verwendet.

