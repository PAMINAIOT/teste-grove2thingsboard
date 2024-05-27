// AT Command Send
function sendAtCmd (cmd: string) {
    serial.writeString("" + cmd + "\u000D\u000A")
}
grove.setupWifi(
SerialPin.C17,
SerialPin.C16,
BaudRate.BaudRate115200,
"komsomolsk",
"vikaschnika"
)
if (grove.wifiOK()) {
    basic.showIcon(IconNames.Heart)
}
// Konfiguration des ThingsBoard-Servers
let serverAddress = "77.244.104.128:9090"
let accessToken = "wV0EikPcEMHcE3u3zvgI"
function sendDataToThingsboard(data: any) {
    const payload = JSON.stringify(data);
    const request = `POST /api/v1/${accessToken}/telemetry HTTP/1.1\r\nHost: ${serverAddress}\r\nContent-Type: application/json\r\nContent-Length: ${payload.length}\r\n\r\n${payload}`;

    sendAtCmd("AT+CIPSEND" + request);
}
const dataToSend = {
    temperature: 60
    //humidity: 50,
    //pressure: 1013
};
sendAtCmd("AT+CIPSTART=\"TCP\",\"paminasogo.ddns.net\",9090")
sendDataToThingsboard(dataToSend);
sendAtCmd("AT+CIPCLOSE")
