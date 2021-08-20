const express = require("express");
const app = express();
const http=require("http").createServer(app);
const PORT=process.env.PORT||3000;
const io=require("socket.io")(http);

app.use(express.static(__dirname+ "/public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/index.html");
});

io.on("connection",(socket)=>{
    //console.log("connected");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",(msg))
    })
});
http.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
});
