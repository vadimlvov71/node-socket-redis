import { Server } from 'socket.io';
import express from 'express';
import cors from "cors";
import { createServer } from 'http';
import { createClient } from 'redis';
import config from './config/config.json' assert {type: 'json'};
//import {getKeys, getUserNames} from './helpers/service.cjs';
import service from './helpers/service.cjs';

const REDIS_HOST = 'redis://redis';
//const REDIS_PORT = 6379; // Default Redis port
const REDIS_PORT = config.REDIS_PORT;
const SOCKET_PORT = config.SOCKET_PORT;

const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
    cors: {
        reconnection: false,
        autoConnect: false,
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials:true
    }
});

////
app.use(cors());
app.get('/get_users', (req, res) => {
     service.getKeys(client, "user*", 100)
    
    .then((keys) => {
        console.log('keys:::');
        //console.log(keys);
        return service.getUserNames(client, status, keys)
    })
    .catch((err) => {
        console.log('err');
        console.log(err);
    })
    .then((users) => {
        res.send(users)
    })
    
})
const client = createClient({  url: REDIS_HOST, port: REDIS_PORT });
client.on('error', err => console.log('Redis Client Error', err));
client.connect();


var socketConnection = {}
let status = "online"
let keys;
//io.disconnect(0);
/*io.close();
*/
/*
io.close(() => {
    console.log('Process terminated')
  })
  */

let userConnection = {};
io.on('connection', (socket) => { 
    socketConnection[socket.id] = socket;
    //process.exit(0);
    socket.on("init", async(data) => {
        //console.log("init:");
        //console.log(data);
        userConnection[data.user_id] = data.socketId
        //userConnection
    })
    //socket.removeAllListeners(); 
    console.log("socket_id: " + socket.id);
       
      
    socket.on("message", async(data) => {
        console.log("message");
        console.log(data);
        //let user = await client.hGetAll('user:' + data.user_id);
        //data.firstName = user.firstName;
        //data.lastName = user.lastName;
        let usersArray = [userConnection[1], userConnection[2]];
        console.log('userConnection::::');
        console.log(userConnection);
        console.log('usersArray::::');
        console.log(usersArray);
        console.log(`Received message: ${data.text}`);
        //socket.emit("response_user_id_1", data);
        //socket.emit("response_user_id_2", data);
        //socket.broadcast.emit("messageResponse", data);
       
        socket.broadcast.to(usersArray).emit("messageResponse", data);
        //socket.broadcast.to(userConnection[1]).emit("messageResponse", data);
        socket.emit("messageResponse", data);
    });
});


server.listen(SOCKET_PORT, () => {
    console.log('Example app listening on port;' + SOCKET_PORT);
    
}); 
io.on("disconnect", () => {
    delete socketConnection[socket.id];
    console.log("disconnect"); // undefined
});
/*
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  })
*/
/*
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
*/

  