const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const date = require(__dirname + "/date.js");

// const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var listOfTasks = ["Go roaming around", "Eat food", "Play Piano", "Listen to song", "Finish up due works"];
var works = [];

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    let dateOfToday = date.getDate();
    let today = date.getDay();


    res.render('list', { listTitle: dateOfToday, ListOfTasks: listOfTasks }); //date() = parenthesis to call the fucntion described in date.js


});
app.get("/work", function(req, res) {

    res.render('list', { listTitle: "Works", ListOfTasks: works });

});
app.post("/", function(req, res) {
    let task = req.body.task;
    let btnTitle = req.body.list;
    console.log(btnTitle);
    if (btnTitle === "Works") {
        let work = req.body.task;
        works.push(work);
        res.redirect("/work");

    } else {
        let task = req.body.task;
        listOfTasks.push(task);
        res.redirect("/");

    }

});
app.listen(3000, function() {
    console.log("Server started at 3000 port");
});