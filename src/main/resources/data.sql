INSERT INTO tanar (ID, Nev) VALUES
(1, 'Gipsz Jakab'),
(2, 'Dr. Hát Izsák'),
(3, 'Kemény Szilárd'),
(4, 'Dr. Fekete Barna'),
(5, 'Dr. Szabó Ilona'),
(6, 'Dr. Fehér Piroska');

INSERT INTO terem (ID, Emelet, Teremszam, Gepterem, Nagyterem) VALUES
(1, 0, 1, FALSE, TRUE),
(2, 0, 2, FALSE, TRUE),
(3, 0, 3, FALSE, FALSE),
(4, 0, 4, FALSE, FALSE),
(5, 0, 5, FALSE, FALSE),
(6, 0, 6, FALSE, FALSE),
(7, 0, 8, FALSE, FALSE),
(8, 0, 9, FALSE, FALSE);

INSERT INTO targy (ID, Nev, Felev) VALUES
(1, 'Operációs rendszerek PTI', 1),
(2, 'Elektronika', 1),
(3, 'Programozás mérnököknek 2', 3),
(4, 'Assembly Programozás', 5),
(5, 'Rendszerközeli programozás', 4),
(6, 'Matematika Mérnököknek 2', 2);

INSERT INTO tanitja (ID, TargyID, TanarID) VALUES
(1, 2, 6),
(2, 3, 4),
(3, 1, 1),
(4, 5, 3),
(5, 6, 5),
(6, 4, 2);

INSERT INTO `foglalas` (`ID`, `TeremID`, `TargyID`, `Esemeny`, `KezdIdo`, `VegIdo`) VALUES
(1, 1, 3, NULL, '2025-11-19 12:00:00', '2025-11-19 14:00:00'),
(2, 3, 5, NULL, '2025-12-12 10:00:00', '2025-12-12 12:00:00');