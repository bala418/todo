const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://bala418:pi2Nr6x3sXILWrnq@cluster0.wbg5h.mongodb.net/todolistdb"
);

const itemSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const Item = mongoose.model("Item", itemSchema);

const List = mongoose.model("List", listSchema);

const t1 = new Item({
  name: "Explore AI/ML",
});
const t2 = new Item({
  name: "Web Development Certifications",
});
const t3 = new Item({
  name: "         Grandmaster at Codeforces ",
});

const defaultItems = [t1, t2, t3];

const t4 = new Item({
  name: "Welcome to your to do list!",
});

const defaultItems2 = [t4];

app.get("/", function (req, res) {
  Item.find((err, items) => {
    if (items.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
        }
      });
      res.redirect("/");
    } else {
      if (err) {
        console.log(err);
      } else {
        res.render("list", { listTitle: "Today", newListItems: items });
      }
    }
  });
  res.set("Content-Type", "text/html");
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.deleteOne({ _id: checkedItemId }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      (err, foundList) => {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.get("/:customListName", (req, res) => {
  console.log("hi", req.params.customListName);
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems2,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(process.env.PORT, function () {
  console.log("Server is running on port 3000");
});
