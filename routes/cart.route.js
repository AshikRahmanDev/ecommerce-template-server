const express = require('express');

const router = express.Router()

router.post("/add",async(req,res)=>{
    res.send({status:"success"})
})

module.exports = router