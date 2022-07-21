const express = require("express");
require('dotenv').config();

const server = express();
const db = require("./database/index");


server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }))

const port = process.env.PORT

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) => {
    res.render("index.html", { title: "" });
});

server.get("/create-point", (req, res) => {
    res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

server.get("/search-result", (req, res) => {
    const search = req.query.search

    if (search == "") {
        return res.render("search-result.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-result.html", { places: rows, total: total })
    });
});

server.listen(port,()=> console.log(`Api Started at PORT:${port}`));