-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 11. Okt 2020 um 12:57
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `carlos`
--
CREATE DATABASE `carlos`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `angebot`
--
USE `carlos`;
CREATE TABLE `angebot` (
  `ID` int(10) NOT NULL,
  `Preis` double(8,2) NOT NULL,
  `Kilometer` int(6) NOT NULL,
  `Ort` varchar(40) NOT NULL,
  `Erstzulassung` int(4) NOT NULL,
  `Bild` varchar(60) NOT NULL,
  `Beschreibung` varchar(300) NOT NULL,
  `Autor` varchar(40) NOT NULL,
  `Marke` varchar(20) NOT NULL,
  `Modell` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `angebot`
--

INSERT INTO `angebot` (`ID`, `Preis`, `Kilometer`, `Ort`, `Erstzulassung`, `Bild`, `Beschreibung`, `Autor`, `Marke`, `Modell`) VALUES
(1, 5000.89, 60000, 'Stuttgart', 1998, 's', 'snfwNF', 'AD', 'AD', 'AD'),
(2, 5000.89, 60000, 'Stuttgart', 1998, 's', 'snfwNF', 'AD', 'AD', 'AD');


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--
USE `carlos`;
CREATE TABLE `benutzer` (
  `benutzername` varchar(40) NOT NULL,
  `passwort` varchar(30) NOT NULL,
  `vorname` varchar(30) NOT NULL,
  `nachname` varchar(30) NOT NULL,
  `telefon` int(20) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`benutzername`, `passwort`, `vorname`, `nachname`, `telefon`, `email`) VALUES
('d', 'd', 'd', 'd', 1, 'eirjwerj3e33@ds'),
('testbenutzername', 'test123', 'test', 'testN', 73456789, 'test@testmail.de');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `angebot`
--
ALTER TABLE `angebot`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`benutzername`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `angebot`
--
ALTER TABLE `angebot`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
