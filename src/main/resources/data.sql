-- Converted from sfm2025.sql to match your schema (Removed accents from columns)

INSERT INTO tanar (ID, Nev) VALUES
        (1, 'Gipsz Jakab'),
       (2, 'Dr. Hát Izsák'),
       (3, 'Kemény Szilárd'),
       (4, 'Dr. Fekete Barna'),
       (5, 'Dr. Szabó Ilona'),
       (6, 'Dr. Fehér Piroska');

INSERT INTO terem (ID, Emelet, Teremszam, Gepterem, Nagyterem)
VALUES (1, 0, 1, 0, 1),
       (2, 0, 2, 0, 0),
       (3, 0, 3, 0, 0),
       (4, 0, 4, 0, 0),
       (5, 0, 5, 0, 0),
       (6, 0, 8, 0, 0),
       (7, 0, 9, 0, 0),
       (8, 0, 0, 0, 1),
       (9, 1, 101, 0, 1),
       (10, 1, 102, 0, 0),
       (11, 1, 103, 0, 0),
       (12, 1, 104, 0, 0),
       (13, 1, 105, 1, 0),
       (14, 1, 106, 1, 0),
       (15, 1, 107, 0, 0),
       (16, 2, 201, 0, 1),
       (17, 2, 202, 0, 0),
       (18, 2, 203, 0, 0),
       (19, 2, 204, 0, 0),
       (20, 2, 205, 0, 0),
       (21, 2, 206, 0, 0),
       (22, 2, 207, 0, 0),
       (23, 3, 310, 1, 0),
       (24, 3, 311, 1, 0),
       (25, 3, 312, 1, 0),
       (26, 3, 320, 1, 0),
       (27, 3, 321, 1, 0),
       (28, 3, 322, 1, 0),
       (29, 3, 323, 1, 0),
       (30, 3, 324, 1, 0),
        (31, 1, 108, 0, 0);


INSERT INTO targy (ID, Nev, Felev)
VALUES (1, 'Operációs rendszerek PTI', 1),
       (2, 'Elektronika', 1),
       (3, 'Programozás mérnököknek 2', 3),
       (4, 'Assembly Programozás', 5),
       (5, 'Rendszerközeli programozás', 4),
       (6, 'Matematika Mérnököknek 2', 2);

INSERT INTO tanitja (ID, TargyID, TanarID)
VALUES (1, 2, 6),
       (2, 3, 4),
       (3, 1, 1),
       (4, 5, 3),
       (5, 6, 5),
       (6, 4, 2);

INSERT INTO foglalas (ID, TeremID, TargyID, Esemeny, KezdIdo, VegIdo)
VALUES (1, 1, 3, NULL, '2025-11-19 12:00:00', '2025-11-19 14:00:00'),
       (2, 3, 5, NULL, '2025-12-12 10:00:00', '2025-12-12 12:00:00');