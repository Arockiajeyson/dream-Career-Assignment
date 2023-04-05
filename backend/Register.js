const express =require('express')
const bcrypt = require('bcrypt');
const app =express()

const Shema =require('./SchemRegister')

app.post('/',async (req,res)=>{
    try {
        console.log(req.body)
        const find =await Shema.findOne({Email:req.body.Email})
        console.log(find)
        if(find) {
            return res.json('failed')
        }
        else{
            const hashing =await bcrypt.hash(req.body.password, 10);
            req.body.password =hashing
            console.log(hashing)
            const storingDb =await Shema.create(req.body)
            storingDb.save()
            return res.json('Successful')
        }
    } catch (error) {
       return res.json(error.message)
    }
})

module.exports=app