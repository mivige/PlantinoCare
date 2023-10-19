// Temperatura 20 - 25C
// Luce >1000 Lux
// Carbonio 800 - 1500 ppm
// Umidità 300 - 700 

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
    temp+=analogRead(0);
    light+=analogRead(1); //Range da 7 a 10
    carb+=analogRead(2);
    mos+=analogRead(5);
  }
  temp=temp/5;
  light=light/5;
  carb=carb/5;
  mos=mos/5;

  //Serial.println("Temperatura: ");
  Serial.print(temp*(5/10.24));
  Serial.print(",");
  //Serial.println("Luce: ");
  Serial.print(light);
  Serial.print(",");
  //Serial.println("Carbonio: ");
  Serial.print(carb);
  Serial.print(",");
  //Serial.println("Umidità: ");
  Serial.println(mos);
  //Serial.println("----------");
  delay(10000);
}
