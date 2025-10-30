import React, { useState } from 'react'
import Taggrid from '../components/Taggrid';
import axios from 'axios';
import { useEffect } from 'react';
import SnippetCard from '../components/SnippetCard';
import ViewSnippet from '../components/ViewSnippet';
import EditSnippet from '../components/EditSnippet';
import AddSnippet from '../components/AddSnippet';
import TagList from '../components/TagList';
import { Ellipsis, PlusIcon } from 'lucide-react';
import ConfirmDelete from '../components/ConfirmDelete';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SnippetFilter from '../components/Search';
import { ToastContainer } from 'react-toastify';
import { X } from 'lucide-react';
const Home = () => {
  const [expanded, setexpanded] = useState(false)
  const [deleteSnip, setdeleteSnip] = useState(null)
  const [addSnip, setaddSnip] = useState(false)
  const [viewSnip, setviewSnip] = useState(null)
  const [Snippets, setSnippets] = useState([])
  const [tags, settags] = useState([])
  const [editSnip, seteditSnip] = useState(null)
  const [loader, setloader] = useState(false)
  const [FilteredTags, setFilteredTags] = useState([])
  const [query, setquery] = useState('')
  const fetchSnippets = async() => {
      if(FilteredTags.length>0 || query.trim()!='')
      {
        const res = await axios.post("https://codecache-830q.onrender.com/user/snippets/filteredSnippets",{query,FilteredTags},{withCredentials:true})
        const data = res.data.snippets;
        setSnippets(data);
        console.log(Snippets);
      }
      else{
        const res= await axios.get("https://codecache-830q.onrender.com/user/snippets/userSnippets");
        const data = res.data.snippets;
        setSnippets(data);
        console.log(Snippets);
      }
    }
    const fetchtags = async() => {
      const res=await axios.get("https://codecache-830q.onrender.com/user/snippets/gettags");
      console.log(res.data.tags);
      settags(res.data.tags);
    }
    useEffect(() => {
      fetchSnippets();
    }, [FilteredTags,query])
    
  useEffect(() => {
    const loadHome = async()=>{
      setloader(true);
      await fetchtags();
      await fetchSnippets();
      setloader(false);
    }
    loadHome();
    console.log("Home useEffect called");
    console.log(Snippets);  
    console.log(tags);  
  }, [])
  return (
    <div>
      <Navbar/>
      <SnippetFilter setquery={setquery} fetchSnippets={fetchSnippets}/>
      <ToastContainer/>
      {loader && <Loader/>}
      {deleteSnip && <ConfirmDelete snippet_id={deleteSnip} setdeleteSnip={setdeleteSnip} fetchSnippets={fetchSnippets} fetchtags={fetchtags} setloader={setloader}/>}
      {addSnip && <AddSnippet setaddSnip={setaddSnip} fetchSnippets={fetchSnippets} fetchtags={fetchtags} setloader={setloader}/>}
      {viewSnip && <ViewSnippet code={viewSnip} setviewSnip={setviewSnip} fetchSnippets={fetchSnippets} fetchtags={fetchtags} setloader={setloader}/>}
      {editSnip && <EditSnippet Snippet={editSnip} seteditSnip={seteditSnip} fetchSnippets={fetchSnippets} fetchtags={fetchtags} setloader={setloader}/>}
      <div className='flex flex-col lg:flex-row justify-between'>
      <div>
      <div className='lg:text-2xl text-xl text-gray-700 pl-5 lg:pl-10'>Filter by tags:</div>
      <div className='flex flex-wrap lg:pl-10 pl-5'>
         {
          (expanded)?
         tags.map((tag)=><TagList key={tag} tagName={tag} FilteredTags={FilteredTags} setFilteredTags={setFilteredTags}/>)
         :
         tags.slice(0,6).map((tag)=><TagList key={tag} tagName={tag} FilteredTags={FilteredTags} setFilteredTags={setFilteredTags}/>)
        }
      </div>
      </div>
      <div className='flex lg:gap-2 mx-4'>
        {
          FilteredTags.length>0 && 
          <button onClick={()=>{setFilteredTags([])}} className='h-[40px] text-white bg-black p-3 rounded-full text-lg font-medium mx-2 my-5 lg:m-5 cursor-pointer hover:scale-101 hover:shadow-2xl hover:border transition-transform hover:border-gray-400 flex gap-2 items-center justify-center'>
            Clear All <X/>
          </button>
        }
        {
          tags.length>6 && 
          <button onClick={()=>{setexpanded(!expanded)}} className='h-[40px] text-white bg-black p-3 rounded-full text-lg font-medium m-5 cursor-pointer hover:scale-101 hover:shadow-2xl hover:border transition-transform hover:border-gray-400'>
            {expanded? "Show Less" : `Show ${tags.length - 6} More`}
          </button>
        }
      </div>
      </div>
      <div className='flex flex-col flex-wrap md:flex-row items-center justify-center md:justify-start'>
        {
          (Snippets.length===0)?(<p className='text-3xl font-semibold m-10'>No Snippets Found!</p>):(Snippets.map((snippet)=><SnippetCard key={snippet.id} snippet={snippet} setviewSnip={setviewSnip} seteditSnip={seteditSnip} setdeleteSnip={setdeleteSnip}/>))
        }
      </div>
      <div onClick={()=>{
        if(viewSnip || editSnip || deleteSnip)
        {
          return;
        }else
        {
          setaddSnip(true)
          document.body.classList.add("overflow-hidden")
        }


      }} className='cursor-pointer fixed flex items-center justify-center bottom-5 right-5 lg:bottom-15 lg:right-20 w-15 h-15 z-50 bg-black text-white rounded-full font-medium hover:shadow-2xl hover:border hover:border-2 hover:border-gray-400 hover:scale-110'>
        <PlusIcon className='text-white font-medium'/>
      </div>
    </div>
  )
}

export default Home
