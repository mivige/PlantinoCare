/*
    Author: Michele Gentile 
    Collaborators: Andrea De Nardis & Samuele Triveri
    Created: 01-03-2023 (DD-MM-YYYY)
    Last Update: 11-09-2023 (DD-MM-YYYY)

    DISCLAIMER: All the formulas to convert the values given by the sensors are specific to the sensors we used,
                using different sensors you'll have to change those formulas.

    !THIS CODE SHOULD BE CONTINUOUSLY RUNNING ON THE ARDUINO BOARD!
*/

float temp=0;
float light=0;
float carb=0;
float mos=0;

void setup() {
  Serial.begin(9600);
}

void loop() {

  // We take the average values from 5 reading
  
  for(int i=0; i<5; i++)
  {
    temp+=analogRead(0);
    light+=analogRead(1); //Range from 7 to 10
    carb+=analogRead(2);
    mos+=analogRead(5);
  }
  temp=temp/5;
  light=light/5;
  carb=carb/5;
  mos=mos/5;

  // Temperature
  Serial.print(temp*(5/10.24));
  Serial.print(",");
  // Light
  Serial.print(light);
  Serial.print(",");
  // Carbon Dioxide
  Serial.print(carb);
  Serial.print(",");
  // Soil Moisture
  Serial.println(mos);
  delay(10000);
}
