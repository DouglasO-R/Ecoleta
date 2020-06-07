const express = require("express");
const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req,res) => {
    res.render("index.html", {title: ""});
});

server.get("/create-point", (req,res) => {
    res.render("create-point.html");
});

server.get("/search-result", (req,res) => {
    res.render("search-result.html");
});

server.listen(3000);