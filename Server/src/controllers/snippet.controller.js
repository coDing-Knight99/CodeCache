import asyncHandler from "../utility/asynchandler.js";
import tag from "../models/tags.model.js";
import SnippetTag from "../models/snippettag.js";
import Snippet from "../models/snippets.model.js";
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
    const {title,code,language,description,tags} = req.body;
    const user=req.user;
    if(!user)
    {
        res.status(401).json({message:"User not logged in"});
    }
    const user_id=user.id;
    if(!user_id)
    {
        res.status(401).json({message:"Unauthorized request"});
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
});

const getUserSnippets = asyncHandler(async(req,res)=>{
    const user=req.user;
    if(!user)
    {
        res.status(401).json({message:"User not logged in"});
    }
    const user_id=user.id;
    if(!user_id)
    {
        res.status(401).json({message:"Unauthorized request"});
    }
    const snippets = await Snippet.findAll({where:{user_id}});
    return res.status(200).json({snippets});
});

const updateSnippet = asyncHandler(async(req,res)=>{
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
    snippet.title=title||snippet.title;
    snippet.code=code||snippet.code;
    snippet.language=language||snippet.language;
    snippet.description=description||snippet.description;
    const oldTags = await SnippetTag.findAll({where:{snippet_id}});
    oldTags.map(async(t)=>{
        await t.destroy()
    })
    for(const t of newtags.split(','))
        {
            await associateTag(t,snippet_id);
        }
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

export {createSnippet,deleteSnippet,getUserSnippets,updateSnippet,gettags};