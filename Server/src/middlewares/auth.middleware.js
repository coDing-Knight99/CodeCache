import asynchandler from "../utility/asynchandler.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.AccessToken;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    const decodedToken = await jwt.verify(token, process.env.Access_Token_Secret);
    const user = await User.findByPk(decodedToken.id);
    if(!user){
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
    req.user=user;
    next(); 
}

export default verifyJWT;