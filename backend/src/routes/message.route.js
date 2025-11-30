import express from 'express'

const router = express.Router()

router.get('/message',(req,res)=>{
    res.send("message is getting")
})

export default router