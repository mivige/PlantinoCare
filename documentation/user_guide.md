# User Guide for *PlantinoCare*

Welcome to *PlantinoCare*! This guide will walk you through setting up and using the project. The system is designed to monitor and automate plant care by reading sensor data, storing it in a database, and displaying it on a web interface. The project includes several components: Arduino code, middleware for data handling, a MySQL database, a front-end web application, and automation scripts for controlling the plant’s environment (e.g., watering, lighting).

## Project Overview

The *PlantinoCare* system helps monitor plant health through environmental data collection, such as temperature, light exposure, CO2 levels, and soil moisture. The data is captured by an Arduino-based system, then processed and stored in a MySQL database. A web interface allows users to view real-time data and historical trends. Additionally, automation scripts enable actions like watering and adjusting light exposure.

## Folder Structure

### 1. `src/`
The `src/` directory contains all the code for the project, organized into different folders for various components.

#### 1.1. `arduino/`  
This folder contains the Arduino code used to collect sensor data and send it to the middleware.
- **`main.ino`**: The main Arduino script that reads sensor data (e.g., temperature, light, CO2, and soil moisture) and outputs it to the serial port.

#### 1.2. `middleware/`  
The middleware is responsible for reading sensor data from the Arduino, processing it, and storing it in a MySQL database.
- **`middleware.py`**: This Python script reads data from the Arduino’s serial output, processes it, and stores it in the database. It should be constantly running while the Arduino is active.

#### 1.3. `database/`  
This folder contains the SQL schema and setup scripts for the MySQL database.
- **`schema.sql`**: SQL file for creating the necessary tables (`datas`, `averages`, and `info`) in the database and inserting the first row of basil-specific data into the `info` table.
- **`sample_data.sql`**: SQL file for importing sample data (`datas`, `averages`, and `info`) in the database. *The data are mostly dated 2023-10-16.*

#### 1.4. `frontend/`  
The front-end folder contains the HTML, CSS, PHP, and JavaScript files for the web interface that displays real-time and historical data.
- **`index.html`**: The main webpage that displays live data from the plant sensors.
- **`plantinoChart.html`**: A page that shows historical data and graphs.
- **`css/`**: The styles for the web interface, ensuring it is user-friendly and responsive.
- **`js/`**: JavaScript that fetches and displays historical data for graphing.
- **`php/`**: PHP files to connect to the database and obtain data.

#### 1.5. `docs/`  
This folder contains documentation files for the project, including high-level overviews and presentation materials.
- **`user_guide.md`**: This file.
- **`DB Analysis.md`**: A database structure deep-dive.

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
1. **Arduino IDE** for uploading code to the microcontroller.
2. **Python 3.x** with necessary libraries.
3. **MySQL** or **MariaDB** to store plant data.

### 1. Set up the Arduino
1. Navigate to the `src/arduino/` folder and open `main.ino` in the Arduino IDE.
2. Connect your Arduino board and upload the code. 
3. Connect your sensors to the Arduino, make sure to follow the wiring scheme or change the pins in the code. The code will read data from the connected sensors (e.g., temperature, light, CO2, soil moisture) and send the readings to the serial port.

### 2. Set up the Middleware
1. Install the required Python libraries by running:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure the `middleware.py` script to read data from the serial port and insert it into your MySQL database.
   - Ensure the script is set up to listen to the correct serial port (check the Arduino connection).
   - The script will process the incoming data and insert it into the `datas` table of your database.

### 3. Set up the MySQL Database
1. Open `src/database/schema.sql` and run the SQL script in your MySQL server to create the necessary tables (`datas`, `averages`, and `info`).
2. The `info` table will store plant-specific data (e.g., ideal temperature and light conditions). The script will insert an initial record for a plant (e.g., basil).
3. Ensure the `FK_idInfo` foreign key in the `datas` table correctly links to the `info` table, so each reading is associated with a specific plant.

### 4. Set up the Web Front-End
0. You need to launch a web server, for example Apache contained in [XAMPP](https://www.apachefriends.org/index.html).
1. Open `src/frontend/index.html` in your browser to view the live data display.
2. The web page will automatically fetch the latest data from the MySQL database and display it in real-time.
3. Change to the `History` page to visualize historical data in graph form. It will show how various environmental factors (temperature, light, etc.) have changed over time.

---

## How It Works

1. **Arduino Code**: The Arduino continuously collects data from the connected sensors and sends it to the computer via serial communication.
2. **Middleware**: The Python script reads data from the serial port, processes it, and stores it in the MySQL database.
3. **Database**: The data is stored in the `datas` table, while hourly averages are stored in the `averages` table. The `info` table holds the ideal plant parameters.
4. **Web Interface**: The front-end fetches data from the database and displays it to the user in real-time or as a graph.

---

## Running the System

1. Upload the Arduino code to your microcontroller.
2. Start the Python middleware script to collect and store sensor data.
3. Open the web interface in your browser to monitor the data.

---

## Troubleshooting

- **Arduino not sending data**: Ensure that the Arduino is properly connected and that the correct port is selected in the Arduino IDE.
- **Middleware script not working**: Check that all dependencies are installed and the MySQL server is running.
- **Data not appearing in the web interface**: Verify that the Python script is correctly inserting data into the database and that the front-end is correctly querying the database.

---

## License

This project is licensed under the [GPL-2.0 License](../LICENSE).

---

## Conclusion

*PlantinoCare* is a powerful system for monitoring plant care using sensor data. With the combined capabilities of Arduino, Python, MySQL, and a web interface, it offers a complete solution for plant health monitoring and management.