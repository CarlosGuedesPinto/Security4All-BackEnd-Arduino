void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}
int i=255;
void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(i);
  delay(1000); // poll every 100ms
}
