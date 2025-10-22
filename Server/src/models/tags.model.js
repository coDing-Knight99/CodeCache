import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const tag = sequelize.define('Tag',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    }},{
        timestamps:false,
    }
);

export default tag; 