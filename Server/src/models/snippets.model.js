import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Snippet = sequelize.define('Snippet',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
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
},{
    timestamps:true,
}
);

export default Snippet;