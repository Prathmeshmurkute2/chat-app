import { generateToken } from '../config/token.config.js';
import { senderWelcomeEmail } from '../Emails/emailHandlers.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { ENV } from '../config/env.js';


export const signup = async(req,res)=>{
    const { name, email , password } = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({ message:"All feilds are required" })
        }

        if(password.length < 6 ){
            return res.status(400).json({ message: "Password must be 6 character"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format" })
        }

        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(400).json({ message:"User already exist " })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        if(newUser){
            generateToken(newUser._id,res)

           const saveUser= await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                name: newUser.name,
                email:newUser.email,
                ProfilePic: newUser.ProfilePic,
            })

            //todo : send a welcome email to user
            try{
                await senderWelcomeEmail(saveUser.email, saveUser.name, ENV.CLIENT_URL)
            }catch(error){
                console.error("Failed to send welcome email:",error);
            }

        }else{
            res.status(400).json({ message:"Invalid user data"})
        }
    }
    catch(error){
        console.log("Error in signup controller",error)
        res.status(500).json({ message:"Internal server error"})
    }
}


export const login = async(req,res)=>{
    const { email , password } = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({ message:"All feild are required" })
        }

        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message:"User not found" })
        }

        generateToken()
    }
    catch(error){
        console.log("Error in login page",error);
        res.status(500).json({ message:"Internal server error"})
    }
}