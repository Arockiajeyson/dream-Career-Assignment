const mongoose =require('mongoose')

const schema = new mongoose.Schema({
    lable:{type:String},
    photo:{type:String}
})
const modelDream = mongoose.model('DreamIm',schema)

module.exports =modelDream