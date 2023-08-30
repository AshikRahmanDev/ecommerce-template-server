const express = require('express');
const { sliderCollection } = require('../utils/dbConnect');
const { ObjectId } = require('mongodb');

const router = express.Router()

router.get("/",async(req,res)=>{
    const query = {}
    const result= await sliderCollection.find(query).toArray()
    res.send(result)
})

// get slider by id
router.get("/:id",async(req,res)=>{
    const id = req.params.id
    const query={_id: new ObjectId(id)}
    const result = await sliderCollection.findOne(query)
    res.send(result)
})
// update slider
router.put("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const body = req.body
    const {title,productId,slogan,img}=body
    const filter = {_id:new ObjectId(id)}
    const options = { upsert: true };
    
    const updateDoc = {
        $set: {
            title,
            id: productId,
            slogan,
            img,
        },
      };
    const result = await sliderCollection.updateOne(filter,updateDoc,options)
    res.send(result)
})

module.exports = router