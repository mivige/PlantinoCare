/*
    Author: MiViGe
    Created: 01-03-2023 (DD-MM-YYYY)
    Last Update: 11-09-2023 (DD-MM-YYYY)

    DISCLAIMER: All the formulas to convert the values given by the sensors are specific to the sensors we used,
                using different sensors you'll have to change those formulas.

    !THIS CODE SHOULD BE CONTINUOUSLY RUNNING ON THE ARDUINO BOARD!
*/
// File to setup Arduino

// Declaration of global variables
float temp=0;
float light=0;
float carb=0;
float mos=0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Reading five times and making an average from that readings
  for(int i=0; i<5; i++)
  {
    temp+=analogRead(0);
    light+=analogRead(1); //Range da 7 a 10
    carb+=analogRead(2);
    mos+=analogRead(5);
  }
  temp=temp/5;
  light=light/5;
  carb=carb/5;
  mos=mos/5;

  // Print results to the serial converting the values in the unit of measure that we'll be using
  Serial.print(temp*(5/10.24));
  Serial.print(",");
  Serial.print(light);
  Serial.print(",");
  Serial.print(carb);
  Serial.print(",");
  Serial.println(mos);
  delay(10000);
}
