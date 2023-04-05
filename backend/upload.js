const express =require('express')

const app =express()
const bcrypt = require('bcrypt');
const schema = require('./imageSchema')
const regiSch=require('./SchemRegister')
app.get('/',async (req,res)=>{
    try {
        const find = await schema.find()
        return res.status(200).json(find)
    } catch (error) {
        return res.status(404).json(error.message) 
    }
})
app.post('/',async(req,res)=>{
    try {
        console.log(req.body)
        const add = await schema.create(req.body)
        return res.status(201).json('success')
    } catch (error) {
        return res.status(404).json(error.message) 
    }
})

app.post('/del/:id', async (req,res)=>{
    try {
        const find =await schema.findOne({_id:req.params.id})
        console.log(find)
        console.log(req.body)
        const find2 =await regiSch.findOne({Email:req.body.d})
        console.log(find2)
        const data =await bcrypt.compare(req.body.password, find2.password);
        if(data){
            const deleting = await schema.deleteOne({_id:req.params.id}) 
            return res.status(200).json('success')
        }else{
            return res.status(401).json('invalid password')
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
})
module.exports=app