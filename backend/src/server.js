import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

dotenv.config();

const app = express()

app.get('/',(req,res)=>{
    res.send("App server is running")
})

app.use('/api/auth', authRoute)
app.use("/api/mess",messageRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})