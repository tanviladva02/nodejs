const http = require("http");
const fs = require("fs");
const port = 9000;

const data = function (req, res) {
    // res.end("this is my server's exam ...");
    console.log(req.url);
    let fileName = "";
    switch (req.url) {
        case "/":
            fileName = "./index.html";
            break;
        case "/home":
            fileName = "./home.html"
            break;
    }

    fs.readFile(fileName, (err, result) => {
        // console.log(fileName);
        if (!err) {
            res.end(result);
        }

    })
}

const server = http.createServer(data);

server.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
})
