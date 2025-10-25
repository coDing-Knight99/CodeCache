import User from "../models/user.model.js";
import asynchandler from "../utility/asynchandler.js";    
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async(user_id)=>{
    try{
    const user = await User.findByPk(user_id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
    }catch(error){
        console.error("Error generating tokens:", error);
        throw new Error("Token Generation Failed");
    }
}

export const registerUser =
    asynchandler(
    async (req, res, next) => {
        const { username, email, password,fullname } = req.body;
        if(!username || !email || !password || !fullname) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ where: { [Op.or]:[{username},{email}] } });
        if (existingUser) { 
            return res.status(400).json({ message: 'Username or Email already exists' });
        }   
        const newUser = await User.create({ username, email, password, fullname });
        const createdUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            fullname: newUser.fullname
        };
        if(!createdUser){
            return res.status(500).json({ message: 'User registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully', user: createdUser });
    })       


    export const loginUser =  asynchandler(async(req,res,next) => {
        const {username,password}=req.body;
        if(!username||!password)
            return res.status(500).json({message:"All Fields are Required"})
        const user = await User.findOne({where: {username}});
        if(!user)
        {
            return res.status(401).json({message:"User does not exists"});
        }
        const isPasswordCorrect = await user.isPasswordValid(password); 
        if(!isPasswordCorrect)
        {
            return res.status(401).json({message:"Incorrect Password"});
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user.id);
        const loggedInUser = {
            id:user.id,
            username:user.username,
            email:user.email,
            fullname:user.fullname
        };
        if(!loggedInUser)
        {
            return res.status(500).json({message:"User Login Failed"})
        }
        const options={
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/'
        }
        return res.status(200).cookie("RefreshToken",refreshToken,options).cookie("AccessToken",accessToken,options).json({
            message:"User logged in successfully",User_info:user
        })
    })

    export const logoutUser = asynchandler(async(req,res,next)=>{
        const loginUser = await User.findByPk(req.user.id)
        loginUser.refreshToken="";
        console.log(loginUser)
        await loginUser.save();
        const options={
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/'
        }
        res.status(200).clearCookie("RefreshToken",options).clearCookie("AccessToken",options).json(
            {message:"User Logged Out Successfully"}
        )
    })

    export const loginStatus = asynchandler(async(req,res)=>{
        const refreshToken = req.cookies.RefreshToken;
        if(!refreshToken){
            return res.status(200).json({isLogin:false});
        }
        try{
            const decodedToken = await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            return res.status(200).json({isLogin:true});
        }catch(error){
            return res.status(200).json({isLogin:false});
        }
    })
    

    
