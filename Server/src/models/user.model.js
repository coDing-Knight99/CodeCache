import { DataTypes } from "sequelize";
import sequelize from "../db/db.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },  
    email:{
        type:DataTypes.STRING,
        allowNull:false,   
        unique:true,
    },
    password:{
        type:DataTypes.STRING,  
        allowNull:false,
    },
    refreshToken:{
        type:DataTypes.TEXT,
    },
},{
    timestamps:true,
});

User.beforeSave(async (user) => {
    if(user.changed('password')) 
    user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.isPasswordValid = async function(password){
    return await bcrypt.compare(password, this.password);
}

User.prototype.generateAccessToken = function(){
    return jwt.sign({
        id:this.id,
        fullname:this.fullname,
        username:this.username,
        email:this.email,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1d'
    }
)
}

User.prototype.generateRefreshToken = function(){
    return jwt.sign({
        id:this.id,     
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'7d'
    }
)
}   
export default User;