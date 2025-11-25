-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 25. 13:42
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `sfm2025`
--
CREATE DATABASE IF NOT EXISTS `sfm2025` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `sfm2025`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglalás`
--

CREATE TABLE `foglalás` (
  `ID` int(10) NOT NULL,
  `TeremID` int(10) NOT NULL,
  `TárgyID` int(10) NOT NULL,
  `Esemény` varchar(255) DEFAULT NULL,
  `KezdIdő` datetime NOT NULL,
  `VégIdő` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `foglalás`
--

INSERT INTO `foglalás` (`ID`, `TeremID`, `TárgyID`, `Esemény`, `KezdIdő`, `VégIdő`) VALUES
(1, 1, 3, NULL, '2025-11-19 12:00:00', '2025-11-19 14:00:00'),
(2, 3, 5, NULL, '2025-12-12 10:00:00', '2025-12-12 12:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanár`
--

CREATE TABLE `tanár` (
  `ID` int(10) NOT NULL,
  `Név` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tanár`
--

INSERT INTO `tanár` (`ID`, `Név`) VALUES
(1, 'Gipsz Jakab'),
(2, 'Dr. Hát Izsák'),
(3, 'Kemény Szilárd'),
(4, 'Dr. Fekete Barna'),
(5, 'Dr. Szabó Ilona'),
(6, 'Dr. Fehér Piroska');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanítja`
--

CREATE TABLE `tanítja` (
  `ID` int(10) NOT NULL,
  `TárgyID` int(10) NOT NULL,
  `TanárID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tanítja`
--

INSERT INTO `tanítja` (`ID`, `TárgyID`, `TanárID`) VALUES
(1, 2, 6),
(2, 3, 4),
(3, 1, 1),
(4, 5, 3),
(5, 6, 5),
(6, 4, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `terem`
--

CREATE TABLE `terem` (
  `ID` int(10) NOT NULL,
  `Emelet` int(1) DEFAULT NULL,
  `Teremszám` int(3) NOT NULL,
  `Gépterem` tinyint(1) NOT NULL,
  `Nagyterem` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `terem`
--

INSERT INTO `terem` (`ID`, `Emelet`, `Teremszám`, `Gépterem`, `Nagyterem`) VALUES
(1, 0, 1, 0, 1),
(2, 2, 201, 0, 1),
(3, 1, 106, 1, 0),
(4, 1, 102, 0, 0),
(5, 3, 310, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tárgy`
--

CREATE TABLE `tárgy` (
  `ID` int(10) NOT NULL,
  `Név` varchar(255) NOT NULL,
  `Félév` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tárgy`
--

INSERT INTO `tárgy` (`ID`, `Név`, `Félév`) VALUES
(1, 'Operációs rendszerek PTI', 1),
(2, 'Elektronika', 1),
(3, 'Programozás mérnököknek 2', 3),
(4, 'Assembly Programozás', 5),
(5, 'Rendszerközeli programozás', 4),
(6, 'Matematika Mérnököknek 2', 2);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `foglalás`
--
ALTER TABLE `foglalás`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `TeremID` (`TeremID`),
  ADD KEY `TárgyID` (`TárgyID`);

--
-- A tábla indexei `tanár`
--
ALTER TABLE `tanár`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `tanítja`
--
ALTER TABLE `tanítja`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `TárgyID` (`TárgyID`),
  ADD KEY `TanárID` (`TanárID`);

--
-- A tábla indexei `terem`
--
ALTER TABLE `terem`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- A tábla indexei `tárgy`
--
ALTER TABLE `tárgy`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `foglalás`
--
ALTER TABLE `foglalás`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `tanár`
--
ALTER TABLE `tanár`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `tanítja`
--
ALTER TABLE `tanítja`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `terem`
--
ALTER TABLE `terem`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `tárgy`
--
ALTER TABLE `tárgy`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `foglalás`
--
ALTER TABLE `foglalás`
  ADD CONSTRAINT `foglalás_ibfk_1` FOREIGN KEY (`TeremID`) REFERENCES `terem` (`ID`),
  ADD CONSTRAINT `foglalás_ibfk_2` FOREIGN KEY (`TárgyID`) REFERENCES `tárgy` (`ID`);

--
-- Megkötések a táblához `tanítja`
--
ALTER TABLE `tanítja`
  ADD CONSTRAINT `tanítja_ibfk_1` FOREIGN KEY (`TárgyID`) REFERENCES `tárgy` (`ID`),
  ADD CONSTRAINT `tanítja_ibfk_2` FOREIGN KEY (`TanárID`) REFERENCES `tanár` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
