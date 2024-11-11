/* The method used to read values from sensors
 * and how to convert them in the desired 
 * measurement unit depends on how you physically
 * connect the sensors to the board for the former,
 * and the instructions provided from your specific
 * sensor's datasheet / from the manufacturer's website
 * for the latter.
*/

float temp=0;
float light=0;
float carb=0;
float mos=0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  for(int i=0; i<5; i++)
  {

    /*
    * Note that the argument of analogRead is
    * the name / number of the board's analog to
    * digital input pin, which may be different
    * among boards.
    */

    temp+=analogRead(0);
    light+=analogRead(1);
    carb+=analogRead(2);
    mos+=analogRead(5);
  }

  temp=temp/5;
  light=light/5;
  carb=carb/5;
  mos=mos/5;

  Serial.print(temp*(5/10.24));
  Serial.print(",");

  Serial.print(light);
  Serial.print(",");
  
  Serial.print(carb);
  Serial.print(",");
  
  Serial.println(mos);
  delay(10000);
}
