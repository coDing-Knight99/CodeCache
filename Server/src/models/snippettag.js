import { DataTypes } from "sequelize";
import sequelize from "../db";

const SnippetTag = sequelize.define('SnippetTag',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    }, 
    snippet_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true,
    },
    tag_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true,
    },
},{
    timestamps:false,
}
);

export default SnippetTag;