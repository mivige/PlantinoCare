# -*- coding: utf-8 -*-
"""
Created on Sun Oct  1 11:24:04 2023

@author: mivige
"""

import mysql.connector
import serial
import time
from datetime import datetime

# Connection to DB
plantinoDB = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="plantino"
)

# Opening serial port
ser = serial.Serial()
ser.port = 'COM6'
ser.open()

# Making a cursor point to the DB
cursor = plantinoDB.cursor()

# Infinite loop
while (True):
	
	# Loop 360 times: every record takes us 10 seconds to be written, 
	# 360 * 10 seconds = 3600 seconds = 1 hour
	for i in range (360):
		
		# Copying datas from the serial port to a table
		
		# SQL query
		sql = "INSERT INTO datas (temp, light, co2, mois, recordTime, FK_idInfo) VALUES (%s, %s, %s, %s, %s, %s)"
		
		# Reading a line of Bytes from the serial port
		datas = ser.readline()
		# Converting Byte Strings into unicode strings
		val = tuple((datas.decode()).split(','))
		
		# Reading current date and time
		currTime = datetime.now()
		
		# Inserting all values into one string
		val += (currTime.strftime("%Y/%m/%d %H:%M:%S"), '1')
	
		# Giving all the query to the cursor
		cursor.execute(sql, val)
	
		# Executing the query
		plantinoDB.commit()
		
		# Wait before re-entering the loop
		time.sleep(2)
	
	# Copying average values in another table
	
	# SQL query
	sql = "INSERT INTO averages (temp, light, co2, mois, startRecordTime, endRecordTime, FK_idInfo) SELECT AVG(temp), AVG(light), AVG(co2), AVG(mois), MIN(recordTime), MAX(recordTime), AVG(FK_idInfo) FROM datas WHERE FK_idInfo=1;"

	# Giving all the query to the cursor
	cursor.execute(sql)

	# Executing the query
	plantinoDB.commit()
	
	# Deleting copied datas from the datas table
	
	# SQL query
	sql = "DELETE FROM datas WHERE FK_idInfo=1"

	# Giving all the query to the cursor
	cursor.execute(sql)

	# Executing the query
	plantinoDB.commit()

# In reality this will never be executed but it will give you an error if you don't write it
ser.close()
