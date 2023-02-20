const url = require('url');
const http = require('http');
const server = http.createServer();
const satoriticketsServer = require('./SatoriticketsServer')
const satoriticketsWss = new satoriticketsServer()

server.on("upgrade", function upgrade(request, socket, head){
    satoriticketsWss.wss.handleUpgrade(request, socket, head, function done(ws){
        satoriticketsWss.wss.emit("connection", ws, request)
    })
})

server.listen(5002)
console.log("Server listening")
server.on('request', (request, response) => {
    response.end('<html><body><h1>Satori WebSocket Response</h1></body></html>');
});