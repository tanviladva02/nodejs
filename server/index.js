 const http = require("http"); // step-1

 // port - response port par avshe , 65536 local ports are available in laptop

 const port = 8020; //step-2
 const fs = require("fs");

 const reqresData = (req,res) => {
      console.log(req);
      const log = `${Date.now()}:new req received\n`;
      fs.appendFile("log.txt",log,(err,data) => {
         res.end("this is my first server");
      })
    res.end("this is my first server"); //step-5
 }

 const server = http.createServer(reqresData) //step-3

 server.listen(port , (req,res) => {
    console.log("Server is running at port" , port) //step-4
 });