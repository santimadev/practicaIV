const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let Student = new Schema({

    client:{
        type:String,
        required: true,
    },

    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    notas: [
        {
            id: String,
            title: String,
            describe: String,
        }
    ]

});

module.exports=mongoose.model("Student",Student);