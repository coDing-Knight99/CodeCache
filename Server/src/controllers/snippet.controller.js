import asyncHandler from "../utility/asynchandler.js";
import tag from "../models/tags.model.js";
import SnippetTag from "../models/snippettag.js";
import Snippet from "../models/snippets.model.js";
import { Op } from "sequelize";
const associateTag = async(tagName,s_id)=>{
    let existingTag = await tag.findOne({where:{name:tagName}});
            if(!existingTag){
                existingTag = await tag.create({name:tagName});
            }
            if(!existingTag)
            {
                return res.status(401).json({message:"Error creating tag"});
            }   
            const newSnippetTag = await SnippetTag.create({snippet_id:s_id,tag_id:existingTag.id});
}

const createSnippet = async(req,res)=>{
    try{
        console.log(req.user);
        console.log(req.cookies.AccessToken);
    const {title,code,language,description,tags} = req.body;
    const user=req.user;
    if(!user)
    {
        return res.status(401).json({message:"User not logged in"});
    }
    const user_id=user.id;
    if(!user_id)
    {
        return res.status(401).json({message:"Unauthorized request"});
    }
    const newSnippet = await  Snippet.create({user_id,title,code,language,description,tags});
    if(!newSnippet)
        {
            return res.status(401).json({message:"Error creating Snippet"});
        }
        const s_id = newSnippet.id;
        for(const t of tags.split(','))
        {
            await associateTag(t,s_id);
        }
    return res.status(200).json({newSnippet,message:"New Snippet Added"});
}catch(error){
    console.error("Error creating snippet:", error);
    return res.status(500).json({message:"Internal Server Error"});
}};

const deleteSnippet = asyncHandler(async(req,res)=>{
    try{
        console.log(req.user)
        const {snippet_id} = req.body;
        if(!snippet_id)
        {
            return res.status(401).json({message:"Snippet Id should be provided"});
        }
        const snippet = await Snippet.findByPk(snippet_id);
        if(!snippet)
        {
            return res.status(404).json({message:"Snippet Not Found"});
        }
        await snippet.destroy();
        const snippetTags = await SnippetTag.findAll({where:{snippet_id}});
        snippetTags.map(async(s)=>{
            await s.destroy();
        }) 
        return res.status(200).json({message:"Snippet Deleted Successfully"});
    }catch(error)
    {
        return res.status(500).json({message:"Error deleting Snippet at Server Side",cause:error})
    }
});

const getUserSnippets = asyncHandler(async(req,res)=>{
    const user=req.user;
    if(!user)
    {
        return res.status(401).json({message:"User not logged in"});
    }
    const user_id=user.id;
    if(!user_id)
    {
        return res.status(401).json({message:"Unauthorized request"});
    }
    const snippets = await Snippet.findAll({where:{user_id}});
    return res.status(200).json({snippets});
});

const updateSnippet = asyncHandler(async(req,res)=>{
    console.log(req.user)
    const {snippet_id,title,code,language,description,newtags} = req.body;
    if(!snippet_id)
    {
        return res.status(401).json({message:"Snippet Id not provided"});
    }
    const snippet = await Snippet.findByPk(snippet_id);
    if(!snippet)
    {
        return res.status(404).json({message:"Snippet Not Found"});
    } 
    snippet.title=title;
    snippet.code=code;
    snippet.language=language;
    snippet.description=description;
    console.log({
        title,description,language,code,newtags
    })
    const oldTags = await SnippetTag.findAll({where:{snippet_id}});
    oldTags.map(async(t)=>{
        await t.destroy()
    })
    for(const t of newtags.split(','))
        {
            await associateTag(t,snippet_id);
        }
        snippet.tags=newtags
    await snippet.save();
    return res.status(200).json({snippet,message:"Snippet Updated Successfully"});
});

    const gettags = asyncHandler(async(req,res)=>{
        const user=req.user;
        const user_id=user.id;
        const snippets = await Snippet.findAll({where:{user_id}});
        let tagSet = new Set();
        snippets.forEach((snippet)=>{
            const tagsArray = snippet.tags.split(',');
            tagsArray.forEach((tag)=>{
                tagSet.add(tag.trim());
            });
        });
        const tags = Array.from(tagSet);
        return res.status(200).json({tags});
    })

    const getFilteredSnippets = asyncHandler(async(req,res)=>{
        try{

            const query = req.body.query || "";
            const FilteredTags = req.body.FilteredTags || [];
            const user_id = req.user.id;
            // const Allsnippets =await Snippet.findAll({where:{user_id}});
        let where = { user_id };
        if(query.trim()!=="")
        {
            where={
                ...where,
                [Op.or]: [
                {title:{[Op.like]:`%${query}%`}},
                {description:{[Op.like]:`%${query}%`}},
                {code:{[Op.like]:`%${query}%`}}
            ],
        };
        }
        let snippets =  await Snippet.findAll({where});
        if(FilteredTags.length>0){
            snippets = snippets.filter(snippet => 
                snippet.tags.split(',').map(tag=>tag.trim()).some(tag => FilteredTags.includes(tag))
            );
        }
        return res.status(200).json({snippets});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Error applying Filters"});
    }
    })

export {createSnippet,deleteSnippet,getUserSnippets,updateSnippet,gettags,getFilteredSnippets};