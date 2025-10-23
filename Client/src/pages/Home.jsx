import React, { useState } from 'react'
import Taggrid from '../components/taggrid';
import axios from 'axios';
import { useEffect } from 'react';
import SnippetCard from '../components/SnippetCard';
import ViewSnippet from '../components/ViewSnippet';
import EditSnippet from '../components/EditSnippet';
import AddSnippet from '../components/AddSnippet';
import TagList from '../components/TagList';
import { PlusIcon } from 'lucide-react';
import ConfirmDelete from '../components/ConfirmDelete';
const Home = () => {
  // const tags=["JavaScript","Python","React","NodeJS","Express","MongoDB","SQL","HTML","CSS","Django","Flask","Java","C++","C#","Ruby","PHP"];
  const [deleteSnip, setdeleteSnip] = useState(null)
  const [addSnip, setaddSnip] = useState(false)
  const [viewSnip, setviewSnip] = useState(null)
  const [Snippets, setSnippets] = useState([])
  const [tags, settags] = useState([])
  const [editSnip, seteditSnip] = useState(null)
  useEffect(() => {
    const fetchtags = async() => {
      const res=await axios.get("http://localhost:3000/user/snippets/gettags");
      console.log(res.data.tags);
      settags(res.data.tags);
    }
    const fetchSnippets = async() => {
      const res= await axios.get("http://localhost:3000/user/snippets/userSnippets");
      const data = res.data.snippets;
      setSnippets(data);
      console.log(data);
    }
    fetchtags();
    fetchSnippets();
    console.log("Home useEffect called");
    console.log(Snippets);  
    console.log(tags);  
  }, [])
  return (
    <div>
      {deleteSnip && <ConfirmDelete snippet_id={deleteSnip} setdeleteSnip={setdeleteSnip}/>}
      {addSnip && <AddSnippet setaddSnip={setaddSnip}/>}
      {viewSnip && <ViewSnippet code={viewSnip} setviewSnip={setviewSnip}/>}
      {editSnip && <EditSnippet Snippet={editSnip} seteditSnip={seteditSnip}/>}
      <div>
      <div className='text-2xl text-gray-700 pl-10'>Filter by tags:</div>
      <div className='flex flex-wrap pl-10'>
         {tags.map((tag)=><TagList key={tag} tagName={tag}/>)}
      </div>
      </div>
      <div className='flex flex-col flex-wrap md:flex-row items-center justify-center md:justify-start'>
        {
          (Snippets.length===0)?(<p className='text-3xl font-semibold m-10'>No Snippets Added Yet!</p>):(Snippets.map((snippet)=><SnippetCard key={snippet.id} snippet={snippet} setviewSnip={setviewSnip} seteditSnip={seteditSnip} setdeleteSnip={setdeleteSnip}/>))
        }
      </div>
      <div onClick={()=>{
        setaddSnip(true)
        document.body.classList.add("overflow-hidden")
      }} className='cursor-pointer fixed flex items-center justify-center bottom-15 right-20 w-15 h-15 z-50 bg-black text-white rounded-full font-medium hover:shadow-2xl hover:border hover:border-2 hover:border-gray-400 hover:scale-110'>
        <PlusIcon className='text-white font-medium'/>
      </div>
    </div>
  )
}

export default Home
