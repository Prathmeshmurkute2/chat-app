import express from "express"

const router = express.Router();

router.get("/login",(req,res)=>{
    res.send("this is a login page")

})

export default router 