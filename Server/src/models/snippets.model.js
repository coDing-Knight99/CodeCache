import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Snippet = sequelize.define('Snippet',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    code:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    language:{
        type:DataTypes.STRING,
    },
    description:{
        type:DataTypes.TEXT,
    },
    tags:{
        type:DataTypes.STRING,
    }
},{
    timestamps:true,
}
);

export default Snippet;