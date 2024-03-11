const fs = require("fs")

var data = fs.readFileSync("./db.json", "utf-8")
data = JSON.parse(data)
data.push("hello")
console.log(data)
fs.appendFileSync("./db.json", JSON.stringify(data))