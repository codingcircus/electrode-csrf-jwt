"use strict";

const Boom = require("boom");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const csrfMiddleware = require("../").expressMiddleware;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine(".html", exphbs({extname: ".html"}));
app.set("view engine", "html");
app.set("views", __dirname + "/templates");

const options = {
  secret: "shhhhh",
  expiresIn: 60
};

app.use(csrfMiddleware(options));

app.get("/", function (req, res) {
  res.render("index", {message: "hi", jwt: req.jwt});
});

app.post("/", (req, res) => {
  res.render("message", {message: req.body.message});
});

app.listen("3000", () => {
  console.log("Example server running at: http//localhost:3000");
});