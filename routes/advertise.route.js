const express = require('express');

const router = express.Router()

router.post("/create",async(req,res)=>{
    const body=req.body
    console.log(body)
})


module.exports = router