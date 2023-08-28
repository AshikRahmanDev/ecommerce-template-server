const express = require('express');
const { sliderCollection } = require('../utils/dbConnect');

const router = express.Router()

router.get("/",async(req,res)=>{
    const query = {}
    const result= await sliderCollection.find(query).toArray()
    res.send(result)
})

module.exports = router