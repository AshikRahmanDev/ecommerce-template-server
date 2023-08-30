const express = require('express');
const { userCollection } = require('../utils/dbConnect');

const router = express.Router()

// get all cart
router.get("/",async(req,res)=>{
  const email = req.query?.email
  const filter= {email:email}
  const user = await userCollection.findOne(filter)
  if(user?.cart){
    return res.send(user?.cart)
  }else{
    res.send([])
  }
  
})

// add to cart
router.post("/add",async(req,res)=>{
    const email=req.query.email
    const query={email:email}
    const {_id,name,price,picture}=req.body
    const user = await userCollection.findOne(query)
    const options = { upsert: true };
    const newCart = {
        productId:_id,
        name,
        picture,
        name,
        price
    }
    // for existing cart
    if(user?.cart){
      const preCart = user?.cart
      const isExist = preCart.filter((product)=>product.productId=== _id)
        if(isExist.length===1){
          return res.send({
            status:"success",
            message:"Allredy Exist",
          })
        }
        const updateDoc = {
          $set: {
            cart: [...preCart,newCart]
          },
        };
        const result = await userCollection.updateOne(query,updateDoc,options)
        res.send(result)
    }else{
    const updateDoc = {
        $set: {
          cart: [newCart]
        },
      };
    const result = await userCollection.updateOne(query,updateDoc,options)
    res.send(result)
    }
    
})

// delete form cart 
router.put("/delete/:id",async(req,res)=>{
  const id = req.params.id
  const email = req.query.email;
  const query = {email:email}
  const options = { upsert: true };
  const user = await userCollection.findOne(query)
  const preCart=user?.cart
  const newCart = preCart.filter(cart=> cart.productId != id)
  const updateDoc = {
    $set: {
      cart: [...newCart]
    },
  };
  const result = await userCollection.updateOne(query,updateDoc,options)
  res.send(result)
})

module.exports = router