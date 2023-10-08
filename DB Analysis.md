# DB Analysis
The project *PlantinoCare* is a system that allows reading of datas about the health state of a plant, to make them available to the user, with the scope of monitoring, in a user-friendly web interface.
The plant datas need to be archived for a certain amount of time, with the final scope of creating a graph representing the values variation in a specified interval.

It's necessary to create a database that receive the plant datas from a client (continuously, every 10 seconds).

The datas that will be provided for each plant are: temperature, light exposure, co2 and soil moisture. It will be also necessary to save date and time of the aquisition for the previously mentioned graph creation.

The values can be in optimal, excessive or insufficient levels. Different plants have different reccomended values. 

---
## Ipotesys
- The temperature, measured in Celsius, will be considered a type decimal(5,2). Because, if the temperature will exceed a 3-digit integer, measuring it will be the last of your problems.
- The light exposure, measured in Lux, will be considered a type decimal(6,2), values more than necessary for the use case.
- The CO2 lever, measured in ppm, will be considered a type decimal(6,2), values more than necessary for the use case.
- The soil moisture will be considered a type decimal(7,2).
- The 'info' table will be a typological table, containing the info regarding the optimal dataset, an ID to identify uniquely the plant and the name.
- The 'average' table will contain the hour-by-hour average datas. Every time a dataset is added to the 'average' table, the datas used to make the averages from the 'datas' table will be deleted. This is to contain the number of records that we get by doing a reading every 10 seconds (in a year we would get 3.153.600 entries for each plant, saving only the averages we get only 8766 entries per year).

---
## Data scheme

| Entity  | Attribute Name | Type | Description|
| -------- | -------- | -------- | -------- |
| datas | idDataset | INT(10) | PK, UNSIGNED|
|  | temp | DECIMAL(5,2) | |
|  | light | DECIMAL(6,2) | |
|  | co2 | DECIMAL(6,2) | |
|  | mois | DECIMAL(7,2) | |
|  | recordTime | DATETIME | |
|  | FK_idInfo | INT(10) | FK, UNSIGNED |
| info  | idInfo(PK) | INT(10) | PK, UNSIGNED|
|  | nome | VARCHAR(100) | |
|  | minTemp | DECIMAL(5,2) | |
|  | maxTemp | DECIMAL(5,2) | |
|  | minLight | DECIMAL(6,2) | |
|  | maxLight | DECIMAL(6,2) | |
|  | minCo2 | DECIMAL(6,2) | |
|  | maxCo2 | DECIMAL(6,2) | |
|  | minMois | DECIMAL(7,2) | |
|  | maxMois | DECIMAL(7,2) | |
| averages | idAvg | INT(10) | PK, UNSIGNED|
|  | temp | DECIMAL(5,2) | |
|  | light | DECIMAL(6,2) | |
|  | co2 | DECIMAL(6,2) | |
|  | mois | DECIMAL(7,2) | |
|  | startRecordTime | DATETIME | |
|  | endRecordTime | DATETIME | |
|  | FK_idInfo | INT(10) | FK, UNSIGNED |

---
## E/R Model 
![E-R](Excalidraw/E-R.excalidraw.png)

---
## Logic Model
![E-R](Excalidraw/Logic.excalidraw.png)

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
