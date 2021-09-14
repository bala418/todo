const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
let workItems = [];
let day = date.getDate();


app.get("/", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.render("list", { listTitle: day, newListItems: items });
    // res.send();
});

app.post("/", function (req, res) {


    console.log(req.body);
    let item = req.body.newItem;
    console.log(item);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {


        items.push(item);
        // res.render("list", { newListItem: item });
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    console.log(item);
    workItems.push(item);
    res.redirect("/");

})

app.get("/about", function (req, res) {
    res.render("about");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});