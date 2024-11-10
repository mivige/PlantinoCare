# DB Analysis

The *PlantinoCare* project is a system designed to monitor plant health by reading various environmental data. This data is made available to users via a user-friendly web interface for easy monitoring.

The collected plant data needs to be archived for a specific period to create graphs representing the variation of values within a given interval.

The system will receive plant data continuously (every 10 seconds). The data collected for each plant includes temperature, light exposure, CO2 levels, and soil moisture. Additionally, the timestamp for each reading is stored, which is used to generate the graphs.

Values can be categorized as optimal, excessive, or insufficient, and different plants have different recommended values for these parameters.

---

## Assumptions

- **Temperature**: Stored as `DECIMAL(5,2)` because if temperatures are above 999.99°C the last of your problems is plant monitoring.
- **Light Exposure**: Stored as `DECIMAL(6,2)` to support a wide range of values in Lux.
- **CO2 Levels**: Stored as `DECIMAL(6,2)`, sufficient to capture typical CO2 levels in ppm.
- **Soil Moisture**: Stored as `DECIMAL(7,2)` to allow for precise moisture measurements.
- **`info` Table**: Stores plant-specific information, including recommended environmental parameters (optimal ranges).
- **`averages` Table**: Stores hourly average data to reduce the size of the dataset and improve performance.

---

## Data Schema

| Entity   | Attribute Name   | Type           | Description                           |
|----------|------------------|----------------|---------------------------------------|
| **datas**| idDataset        | INT(10) UNSIGNED | Primary Key                         |
|          | temp             | DECIMAL(5,2)    | Temperature reading (°C)             |
|          | light            | DECIMAL(6,2)    | Light exposure (Lux)                 |
|          | co2              | DECIMAL(6,2)    | CO2 level (ppm)                      |
|          | mois             | DECIMAL(7,2)    | Soil moisture                        |
|          | recordTime       | DATETIME        | Timestamp of the reading             |
|          | FK_idInfo        | INT(10) UNSIGNED | Foreign Key linking to `info` table  |
| **info** | idInfo           | INT(10) UNSIGNED | Primary Key                         |
|          | nome             | VARCHAR(100)    | Plant name                           |
|          | minTemp          | DECIMAL(5,2)    | Minimum temperature                  |
|          | maxTemp          | DECIMAL(5,2)    | Maximum temperature                  |
|          | minLight         | DECIMAL(6,2)    | Minimum light exposure               |
|          | maxLight         | DECIMAL(6,2)    | Maximum light exposure               |
|          | minCo2           | DECIMAL(6,2)    | Minimum CO2 level                    |
|          | maxCo2           | DECIMAL(6,2)    | Maximum CO2 level                    |
|          | minMois          | DECIMAL(7,2)    | Minimum soil moisture                |
|          | maxMois          | DECIMAL(7,2)    | Maximum soil moisture                |
| **averages** | idAvg        | INT(10) UNSIGNED | Primary Key                         |
|             | temp          | DECIMAL(5,2)    | Hourly average temperature           |
|             | light         | DECIMAL(6,2)    | Hourly average light exposure        |
|             | co2           | DECIMAL(6,2)    | Hourly average CO2 level             |
|             | mois          | DECIMAL(7,2)    | Hourly average soil moisture         |
|             | startRecordTime | DATETIME        | Start timestamp for averaging period |
|             | endRecordTime   | DATETIME        | End timestamp for averaging period   |
|             | FK_idInfo       | INT(10) UNSIGNED | Foreign Key linking to `info` table  |

---

## E/R Model

![E-R](../img/E-R.png)

---

## Physical Model 

```SQL
CREATE DATABASE plantino;

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
```
