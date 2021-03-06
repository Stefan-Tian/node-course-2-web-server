const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 4268;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance");
})

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screanIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home",{
    pageTitle: "Home Page",
    message: "Welcome to the home page!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errMessage: "You shouldn't be here!!!"
  });
});

app.listen(port, () => {
  console.log(`Succefully connected to localhost:${port}`);
});
