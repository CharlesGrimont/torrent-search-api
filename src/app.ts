//imports
import TorrentSearchApi from"../index.js";
import express from "express";
import Server from "./server";
const credentials = require("../credentials.json");

//express
const app = express();
const port = 3000;
var isRunning = undefined;
let server = new Server();

let init = async ()=>{
  isRunning = await server.initYggProvider();
}
init();



// routes
app.get('/', (req, res) => {
    let html = '<div><h1>Welcome to backend-torrent</h1> available routes are: <a href="http://localhost:3000/search">search</a></div>';
    let icon = isRunning == undefined ? '<span style="color:blue">&#10052; STARTING</span>' : isRunning == true ? '<span style="color:green">&#10003; READY</span>' : '<span style="color:red">&#10007; ERORED</span>'
    html += '<div><h2>Status</h2> <ul><li>Ygg Torrent:  '+icon+' </li></ul> </div>'
    res.send(html);
   
});


app.get('/search', async (req, res) => {
    const query = req.query["name"];
    if(query != undefined){
      let torrents = await server.query(query)
      res.json(torrents);
    }
    else{
      res.send("you must specify query parameters search");
    }
    
    
});



app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});