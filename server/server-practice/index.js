const http = require("http");
const port = 9000;

const data = function (req,res){
    res.end("this is my server's exam ...");
}

const server = http.createServer(data);

server.listen(port,(req,res) => {
    console.log("Server is running on port " + port);
})

// cls command for clear