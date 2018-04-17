const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const port = 9000;


const users = [];
let currentPeople;
// app.use("/",express.static(__dirname,"/src"));

app.get("/*",(req,res,next) => {
    res.sendFile(path.resolve(__dirname,"index.html"));
})

io.on("connection",(socket) => {
    console.log("a sb login");

    socket.on("login",(name) => {
        if(users.indexOf(name) !== -1){
            socket.emit("nameDup")
        }else{
            users.push(name);
            currentPeople = name;
            socket.emit("loginSuccess");//发送给当前请求的req客户端；
            io.sockets.emit("peoLogin",{name:name,num:users.length});//发送给所有人，包括发送者
        }
    })
    socket.on("sendMsg",(msg) => {
        console.log(msg)
        io.sockets.emit("sbSendMsg",msg);
    })
})
server.listen(port,(error) => {
    if(!error){
        console.log("hi");
    }
})