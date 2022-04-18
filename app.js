/**
 * Alxa Software (a javascript library)
 *      by Swordax Sy
 * Alxa is a multi-task simple lightweight JavaScript library with pre-written codes
 * and functions, simple but time-consuming functions to write, to make
 * JavaScript coding easier on developers.
 *
 * Github Repo: https://github.com/SwordaxSy/AlxaJS
 *
 * Swordax Info
 *      - github: https://github.com/SwordaxSy
 *      - discord: Swordax#5756
 *      - at: @swordax.sy
 *      - website: https://swordax.netlify.app/
 *
 * © Swordax 2022 -> Present
 */

// set up
const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
dotenv.config();

// app variables
const PORT = process.env.PORT || process.env.port || 3000;
const latestVersion = "1.0.0";

// app routes (get)
app.get("/", (req, res) => {
    res.render("home", { page: "home" });
});
app.get("/about", (req, res) => {
    res.render("about", { page: "about" });
});
app.get("/download", (req, res) => {
    res.render("download", { page: "download", latestVersion });
});
app.get("/docs", (req, res) => {
    res.render("docs", { page: "docs" });
});

// download alxa library
app.get("/downloadalxa/:version/:type", (req, res) => {
    const { version, type } = req.params;
    const path = `./src/Alxa-${version}${type == "min" ? ".min" : ""}.js`;
    res.download(path);
});

// listen to server requests
app.listen(PORT);
