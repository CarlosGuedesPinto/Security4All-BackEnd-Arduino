const express = require("express");
const serveStatic = require("serve-static")
const path = require("path");
require("dotenv").config()

const app = express();
app.use("/", serveStatic(path.join(__dirname, 'dist')))
console.log(process.env.PORT)
app.listen(process.env.PORT || 8003, () => {
    console.log("Frontend-Company Running")
})
