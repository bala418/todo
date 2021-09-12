const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

var items = [];

app.get("/", function (req, res) {
    res.set('Content-Type', 'text/html');
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { kindOfDay: day, newListItems: items });
    // res.send();
});

app.post("/", function (req, res) {
    var item = req.body.newItem;
    console.log(item);
    items.push(item);
    // res.render("list", { newListItem: item });
    res.redirect("/");
});

app.listen(3000, function (req, res) {
    console.log("Listening on port 3000");
});