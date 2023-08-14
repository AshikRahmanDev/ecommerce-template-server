const express = require("express");
const { ObjectId } = require("mongodb");
const { productsCollection } = require("../utils/dbConnect");


const router =express.Router()
// get all products
router.get("/", async(req,res)=>{
    const query ={}
    const result = await productsCollection.find(query).toArray()
    res.send(result)
})
// get products by brand name
router.get("/category/:category",async(req,res)=>{
    const category = req.params.category
    const query = {category:category}
    console.log(query)
    const result =await productsCollection.find(query).toArray()
    console.log(result.length)
    res.send(result)
})
// get product by id
router.get("/:id", async(req,res)=>{
    const id = req.params.id
    const query={_id: new ObjectId(id)}
    const result= await productsCollection.findOne(query)
    res.send(result)
})

module.exports = router