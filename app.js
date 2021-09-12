const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", function (req, res) {
    res.set('Content-Type', 'text/html');
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    res.render("list", { kindOfDay: day, newListItems: items });
    // res.send();
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(item);
    items.push(item);
    // res.render("list", { newListItem: item });
    res.redirect("/");
});

app.listen(3000, function (req, res) {
    console.log("Listening on port 3000");
});