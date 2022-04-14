var express = require("express");
const cors = require("cors");
const {stderr} = require("process");

var mongoose = require('mongoose');
const Student = require("./models/Student");
// const Student = require("./models/Student");
var mongoDB = 'mongodb+srv://santiago:canoli@cluster0.eglic.mongodb.net/studentsDatabase?retryWrites=true&w=majority'
var db = mongoose.connection


var app= express();
app.use(express.json());
app.use(cors());


app.use("/users",require("./routes/users"));
app.use("/login",require("./routes/login"));
app.use("/note",require("./routes/note"));

// INSERT
// app.get('/create', async (req, res) => {
//     const student = new Student({ name: 'Santiago', surname: 'Marcano' });
//     try {
//         await student.save()
//         res.send('OK')
//     } catch (err) {
//         res.send(err)
//     }
// })


app.listen(5000,function(req,res){
    console.log("Listen 5000\n");
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
});

