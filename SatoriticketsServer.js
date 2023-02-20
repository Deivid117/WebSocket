class SatoriticketsServer{
    constructor() {
        this.path = "/satoritickets"
        const serverPath = "http://localhost:5002/"
        const websocket = require("ws")
        this.wss = new websocket.Server({noServer: true, clientTracking: true})
        console.log(this.wss.clients)
        var wss2 = this.wss
        this.wss.on("connection", (ws, req) => {
            ws.user = req.headers.user
            console.log("Usuario conectado " + ws.user)
            //console.log(this.wss.clients)
            ws.on("message", function incoming(message){
                console.log("Mensaje recibido " + message)
                wss2.clients.forEach(function each(client){
                    //console.log(client.user)
                    //console.log("Receiver "+ JSON.parse(message)['receiverId'])
                    if(client.user == JSON.parse(message)['receiverId'] ){
                        //console.log("entró " + client.user)
                        client.send(JSON.stringify({
                            "sender_id" :  JSON.parse(message)['senderId'],
                            "receiver_id": JSON.parse(message)['receiverId'],
                            "content" : JSON.parse(message)['content'],
                            "chat_id" : JSON.parse(message)['chatId']
                        }))
                    }
                })
            })
        })
    }
}

module.exports = SatoriticketsServer