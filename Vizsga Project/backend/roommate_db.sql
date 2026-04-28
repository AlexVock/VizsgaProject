-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 17. 11:13
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
-- Adatbázis: `roommate_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bevasarlo_lista`
--

CREATE TABLE `bevasarlo_lista` (
  `id` int(11) NOT NULL,
  `csoport_id` int(11) DEFAULT NULL,
  `termek_nev` varchar(255) NOT NULL,
  `megvasarolva` tinyint(1) DEFAULT 0,
  `hozzaadta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `kod` varchar(10) NOT NULL,
  `letrehozo_id` int(11) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `csoportok`
--

INSERT INTO `csoportok` (`id`, `nev`, `kod`, `letrehozo_id`, `datum`) VALUES
(1, 'asd', 'VVIEFS', 1, '2026-01-21 12:30:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoport_tagok`
--

CREATE TABLE `csoport_tagok` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `csoport_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `profil_szin` varchar(7) DEFAULT '#007bff',
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `csoport_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `email`, `jelszo`, `profil_szin`, `letrehozva`, `csoport_id`) VALUES
(1, 'asd', 'asd@gmail.com', '$2y$10$8qmCjOb2yiy2GgY5Rpjs8.uBdjmMt2dkrzlUf7LJUGRfPFddEas1a', '#007bff', '2026-01-21 11:37:12', 1),
(2, 'Alex', 'email@email.com', '$2y$10$8h4r1GmjlBv354pz6/3DReVVQjNiFZZUi1yrRHCosjulvcGERethe', '#007bff', '2026-01-21 11:43:36', 1),
(3, 'alex', 'alex@gmail.com', '$2y$10$0alORQ15mk6OSpfDkcq8DOKRhIGJG01ehfRcPg4TukwLUTPfWkBqS', '#007bff', '2026-01-21 11:51:27', NULL),
(7, 'Teszt1', 'teszt@gmail.com', '$2y$10$ElBUyWAl6IdahbqLy06SSO5dw0O9i.x6CrMIW0Hnla/E28NQc46ce', '#007bff', '2026-01-21 11:56:28', NULL),
(8, '222', '22@gmail.com', '$2y$10$CJWUCTHwQZqOLS9CuoVQBum.T1GipsSYvr9DMuAzvCO4NgFormo4y', '#007bff', '2026-01-21 12:37:34', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `penzugyek`
--

CREATE TABLE `penzugyek` (
  `id` int(11) NOT NULL,
  `csoport_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `megnevezes` varchar(255) NOT NULL,
  `osszeg` int(11) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp(),
  `kategoria` varchar(50) DEFAULT 'Egyéb'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `penzugyek`
--

INSERT INTO `penzugyek` (`id`, `csoport_id`, `felhasznalo_id`, `megnevezes`, `osszeg`, `datum`, `kategoria`) VALUES
(1, 1, 1, 'asd', 222, '2026-01-21 12:02:40', 'Egyéb'),
(2, 1, 1, '2223', 2323, '2026-01-21 12:04:52', 'Egyéb'),
(4, 1, 1, 'McDonald''s', 12456, '2026-01-21 12:13:13', 'Élelmiszer'),
(5, 1, 1, 'Ház', 125673, '2026-01-21 12:13:30', 'Lakbér'),
(6, 1, 2, 'qqq2222', 222, '2026-01-21 12:30:44', 'Élelmiszer');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teendok`
--

CREATE TABLE `teendok` (
  `id` int(11) NOT NULL,
  `csoport_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `feladat` varchar(255) NOT NULL,
  `kesz` tinyint(1) DEFAULT 0,
  `datum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `teendok`
--

INSERT INTO `teendok` (`id`, `csoport_id`, `felhasznalo_id`, `feladat`, `kesz`, `datum`) VALUES
(1, 1, 1, 'feas', 0, '2026-01-21 12:04:44');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int(11) NOT NULL,
  `csoport_id` int(11) DEFAULT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `szoveg` text DEFAULT NULL,
  `kuldve` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bevasarlo_lista`
--
ALTER TABLE `bevasarlo_lista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `csoport_id` (`csoport_id`);

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `csoport_tagok`
--
ALTER TABLE `csoport_tagok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `csoport_id` (`csoport_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `penzugyek`
--
ALTER TABLE `penzugyek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `teendok`
--
ALTER TABLE `teendok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `csoport_id` (`csoport_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bevasarlo_lista`
--
ALTER TABLE `bevasarlo_lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `csoport_tagok`
--
ALTER TABLE `csoport_tagok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `penzugyek`
--
ALTER TABLE `penzugyek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `teendok`
--
ALTER TABLE `teendok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bevasarlo_lista`
--
ALTER TABLE `bevasarlo_lista`
  ADD CONSTRAINT `bevasarlo_lista_ibfk_1` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`id`);

--
-- Megkötések a táblához `csoport_tagok`
--
ALTER TABLE `csoport_tagok`
  ADD CONSTRAINT `csoport_tagok_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `csoport_tagok_ibfk_2` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`id`);

--
-- Megkötések a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD CONSTRAINT `uzenetek_ibfk_1` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`id`),
  ADD CONSTRAINT `uzenetek_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
