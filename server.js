const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const multer  = require('multer');
const fs = require('fs');



let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage}).single('file');


app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.get("/filelist", (req, res) => {
    let road = fs.readdirSync(path.join(__dirname, "files"));

road = road.map(file => {
  return "./files/" + file; 
});

    res.json(road);
});
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        
    console.log(req.file.filename);    
    res.json({url: "./files/" + req.file.filename});    
  })
});

const server = http.createServer(app);
server.listen(5600, () => {
  console.log("- server running");
});