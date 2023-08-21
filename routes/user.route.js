const express = require("express");
const { ObjectId } = require("mongodb");
const { userCollection } = require("../utils/dbConnect");


const router =express.Router()

router.post("/addUser", async(req,res)=>{
    const user = req.body ||{}
    const userData={
        ...user,
        role:"user"
    }
    const query = {email:user?.email}
    const isUserExist= await userCollection.findOne(query) || null;
    if(isUserExist){
        return;
    }
    const result = await userCollection.insertOne(userData)
    res.send(result)
})

router.get("/", async(req,res)=>{
    try {
        const email = req.query.email;
        if(email){
            const query = {email}
            const result = await userCollection.findOne(query) || []
            res.send(result)
        }else{
            console.log("hit");
            res.send({
            status:true,
            message:"no user found"

        })
        }
    } catch (error) {
        console.log("hit");
        res.send({
        status:true,
        message:"no user found"

        })
    }
})

router.get("/all",async(req,res)=>{
    const query = {}
    const result = await userCollection.find(query).toArray()
    res.send(result)
})

module.exports = router 