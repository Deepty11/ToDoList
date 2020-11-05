const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
var _ = require('lodash');
const date = require(__dirname + "/date.js");

// const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// var listOfTasks = ["Go roaming around", "Eat food", "Play Piano", "Listen to song", "Finish up due works"];
// var works = [];
mongoose.connect("mongodb://localhost:27017/ToDoList", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const taskSchema = {
    name: String

}
const taskModel = mongoose.model("TASK", taskSchema);
const task1 = new taskModel({
    name: "Buying foods"
});
const task2 = new taskModel({
    name: "Cooking food"
});
const task3 = new taskModel({
    name: "Eating food"
});

const taskArray = [task1, task2, task3];

const listSchema = {
    name: String,
    items: [taskSchema]
}
const listModel = mongoose.model("LIST", listSchema);

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
let dateOfToday = date.getDate();
let today = date.getDay();
app.use(express.static("public"));
app.get("/", function(req, res) {

    taskModel.find({}, function(err, elements) {
        if (elements.length == 0) {
            taskModel.insertMany(taskArray, function(err) {
                if (err) {
                    console.log("err");
                } else {
                    console.log("added successfully!");

                }
                res.redirect("/");

            });
        } else {
            res.render('list', { listTitle: dateOfToday, ListOfTasks: elements }); //date() = parenthesis to call the fucntion described in date.js

        }

    });

});

app.get("/:param", function(req, res) {
    const param = _.capitalize(req.params.param);
    listModel.findOne({ name: param }, function(err, result) {
        if (!result) {
            const list1 = new listModel({
                name: param,
                items: taskArray
            });
            list1.save();
            res.redirect("/" + param);

        } else {
            res.render('list', { listTitle: result.name, ListOfTasks: result.items });

        }
    });
});

app.post("/", function(req, res) {
    let task = req.body.task;
    let btnTitle = req.body.list;
    const newTask = new taskModel({
        name: task
    });
    console.log(btnTitle);
    if (btnTitle === dateOfToday) {
        let task = req.body.task;
        // listOfTasks.push(task);
        newTask.save();
        res.redirect("/");

    } else {

        listModel.findOne({ name: btnTitle }, function(err, result) {
            const itemList = result.items;
            itemList.push(newTask);
            listModel.updateOne({ name: btnTitle }, { items: itemList }, function(err, result) {
                if (!err) {
                    console.log("updated to " + btnTitle + " List");
                }
                res.redirect("/" + btnTitle);
            });
        });


    }

});
app.post("/delete", function(req, res) {
    const deletedTask = req.body.checkbox;
    const listTitle = req.body.title;
    console.log(deletedTask);
    if (listTitle === dateOfToday) {
        taskModel.deleteOne({ name: deletedTask }, function(err, event) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted!");
            }
            res.redirect("/");

        });
    } else {
        listModel.findOneAndUpdate({ name: listTitle }, { $pull: { items: { name: deletedTask } } }, function(err, foundResult) {
            if (!err) {
                res.redirect("/" + listTitle);
            }
        });

    }


});
app.listen(3000, function() {
    console.log("Server started at 3000 port");
});