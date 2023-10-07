SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


CREATE DATABASE plantino;

-- Table to contain all info about "safe" values for a specific plant
CREATE TABLE info (
  idInfo int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(100) NOT NULL,
  minTemp decimal(5,2) NOT NULL,
  maxTemp decimal(5,2) NOT NULL,
  minLight decimal(6,2) NOT NULL,
  maxLight decimal(6,2) NOT NULL,
  minCo2 decimal(6,2) NOT NULL,
  maxCo2 decimal(6,2) NOT NULL,
  minMois decimal(7,2) NOT NULL,
  maxMois decimal(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table to contain all datas read from the serial port
CREATE TABLE datas (
  idDataset int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  temp decimal(5,2) DEFAULT NULL,
  light decimal(6,2) DEFAULT NULL,
  co2 decimal(6,2) DEFAULT NULL,
  mois decimal(7,2) DEFAULT NULL,
  recordTime datetime NOT NULL,
  FK_idInfo int(10) UNSIGNED NOT NULL,
  FOREIGN KEY (FK_idInfo) REFERENCES info (idInfo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserting safe values for a basil, the plant that we'll be using for this case
INSERT INTO info (nome, minTemp, maxTemp, minLight, maxLight, minCo2, maxCo2, minMois, maxMois)
VALUES ('basil', 20, 25, 800, 1500, 800, 1500, 300, 700);

-- Table to contain average value updated every hour
CREATE TABLE averages (
  idAvg int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  temp decimal(5,2) DEFAULT NULL,
  light decimal(6,2) DEFAULT NULL,
  co2 decimal(6,2) DEFAULT NULL,
  mois decimal(7,2) DEFAULT NULL,
  startRecordTime datetime NOT NULL,
  endRecordTime datetime NOT NULL,
  FK_idInfo int(10) UNSIGNED NOT NULL,
  FOREIGN KEY (FK_idInfo) REFERENCES info (idInfo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
