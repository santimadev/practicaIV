const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let Student = new Schema({

    name:{
        
        type:String,
        required: true,
    },

    surname:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        default: Date.now,
    },

});

module.exports=mongoose.model("Student",Student);