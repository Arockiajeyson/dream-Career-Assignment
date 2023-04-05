const mongoose =require('mongoose')

const dataSch =new mongoose.Schema({
    Email:{type:String},
    password:{type:String}
})

const mode =mongoose.model("dreamD",dataSch)

module.exports=mode