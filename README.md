# Name

CarLos

# Beschreibung

Dies ist eine Autoforum-Website für das Verkaufen und Kaufen eines Autos
Um diese Seite nutzen zu können erfolgt als erster Schritt eine Registrierung
Alle Autos, welche zum Kauf bereitstehen, werden auf der Startseite aufgelistet. Die Liste kann ebenfalls gefiltert werden.
Die Autos die Verkauft werden sollen sind unter dem Menüpunkt meine Angebote anzulegen. Die Verkauften Autos können jederzeit von dem Ersteller bearbeitet oder gelöscht werden.

# Team

<ul>
<li>Evelyn Stoll</li>
<li>Johanna Gröll</li>
<li>Celine Stock</li>
</ul>

# Quick Start

```phyton 
git clone https://github.com/celine0106/CarLos
npm init
npm install express
npm install mysql2
npm install express-session
```
Um die Datenbank nutzen zu können muss zusätzlich in XAMPP eine Datenbank mit den Namen carlos angelegt werden. In diese ist dann die SQL-Datei carlos.sql zu importieren. 
Um ein Passwort für die Datenbank festzulegen muss innerhalb dieses Projekts ein .env file angelegt werden mit dem Inhalt DB_PASSWORD=""
Um nun die Anwendun starten zu können müssen folgende Schritte gemacht werden:
```phyton
<ol>
<li>node server.js</li>
<li>http://localhost:5100<li>
</ol>
```
