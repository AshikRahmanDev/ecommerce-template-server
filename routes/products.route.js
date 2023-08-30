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
// get all products
router.get("/home", async(req,res)=>{
    const query ={}
    const result = await productsCollection.find(query).limit(6).toArray()
    res.send(result)
})
// get products by brand name
router.get("/category/:category",async(req,res)=>{
    const category = req.params.category;
    const query = {category:category}
    const result =await productsCollection.find(query).toArray()
    res.send(result)
})
// get product by id
router.get("/:id", async(req,res)=>{
    const id = req.params.id;
    const query={_id: new ObjectId(id)};
    const result= await productsCollection.findOne(query);
    res.send(result)
})

// add product
router.post("/create",async(req,res)=>{
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.send(result)
})

// delete product
router.delete("/delete/:id",async(req,res)=>{
    const id = req?.params?.id;
    if(id){
        const query= {_id: new ObjectId(id)}
        const email = req?.query?.email;
        const result = await productsCollection.deleteOne(query)
        return res.send(result)
    }
    return res.send({status:"faild"})
})

// updateProduct
router.put("/update/:id",async(req,res)=>{
    const id = req.params.id
    const product = req.body;
    const {brand,category,color,description,discountPrice,image,name,price,specification,stock}=product;
    const filter = {_id:new ObjectId(id)}
    const options = { upsert: true };
    
    const updateDoc = {
        $set: {
          brand,
          category,
          color,
          description,
          discountPrice,
          picture: image,
          name,
          price,
          specification,
          stock
        },
      };
    const result = await productsCollection.updateOne(filter,updateDoc,options)
    res.send(result)
})
module.exports = router