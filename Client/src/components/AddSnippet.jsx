import React from 'react';
import { useRef,useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { XIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AddSnippet = ({setaddSnip,fetchSnippets,fetchtags,setloader}) => {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [language, setlanguage] = useState('');
    const [tags, settags] = useState('');
    const [code, setcode] = useState('')
    const editorRef = useRef(null)
    const handleEditorMount = (editor,monaco)=>{
        editorRef.current=editor
    }
    const isFormValid = title.trim()!='' && description.trim()!='' && language.trim()!='' && tags.trim()!='' && code.trim()!='';
    const handleAdd = async()=>{
        try{
            const res = await axios.post("https://codecache-830q.onrender.com/user/snippets/create",{title,description,language,code,tags})
            toast("Snippet Added Successfully!",{className:"font-bold text-lg"})
            const data = res.data;
            await fetchSnippets();
            await fetchtags();
            console.log(data)
        }
        catch(error)
        {
            console.error("Error adding new Snippet",error)
        }
    }
  return (
    <div onClick={()=>{
        setaddSnip(false)
        document.body.classList.remove("overflow-hidden")
    }} className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800/40">
      <div onClick={(e)=>{e.stopPropagation()}} className="h-[75%] w-[95%] lg:w-[50%] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
        <div className='flex justify-between'>
        <div className='pb-10'>
            <p className='lg:text-3xl text-2xl font-medium'>Add New Snippet</p>
            <p className='lg:text-2xl text-xl text-gray-500 pt-2'>Create a new code snippet with tags</p>
        </div>
        <div onClick={()=>{
                setaddSnip(false)
                document.body.classList.remove("overflow-hidden")
                console.log("I was Clicked")
            }} className='cursor-pointer flex items-center justify-center lg:h-8 lg:w-8 h-5 w-5 rounded-xl hover:border hover:border-2 hover-border-gray-200'>
            <XIcon className='text-gray-600'/>
        </div>
        </div>
        <div className=''>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Title</label>
                <input onChange={(e)=>{settitle(e.target.value)}} type="text" id="title" placeholder='e.g. React useState hook' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Description</label>
                <input onChange={(e)=>{setdescription(e.target.value)}} type="text" id="description" placeholder='Brief description of the snippet' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Language</label>
                <input onChange={(e)=>{setlanguage(e.target.value)}} type="text" id="language" placeholder='e.g., JavaScript, Python, CSS' className='w-full text-gray-600 lg:text-2xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Code</label>
                <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
                <Editor
                id="code"
                height="100%"
                defaultLanguage="javascript"
                defaultValue=''
                theme="vs-dark"
                onMount={handleEditorMount}
                onChange={(value)=>{
                    setcode(value||'')
                }}
                options={{
                fontSize: 20,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                automaticLayout:true
                }}
                />
                </div>
                <label htmlFor="" className='text-2xl font-medium'>Tags</label>
                <input onChange={(e)=>{settags(e.target.value)}} type="text" id="tags" placeholder='e.g., react, hooks, state (comma-seperated)' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                   <div className='flex justify-end'>
                    <button onClick={()=>{
                        setaddSnip(false)
                        document.body.classList.remove("overflow-hidden")
                    }} className='cursor-pointer flex items-center justify-center h-15 w-35 text-xl lg:text-2xl my-5 mx-3 py-5 px-3 border border-gray-300 rounded-2xl hover:bg-gray-400 font-medium'>Cancel</button>
                    <button onClick={async()=>{
                        setloader(true);
                        await handleAdd();
                        setloader(false);
                        setaddSnip(false);
                        document.body.classList.remove("overflow-hidden")
                    }} disabled={isFormValid?false:true} className={`cursor-pointer ${isFormValid?"hover:bg-gray-900":"bg-gray-700"} flex items-center justify-center h-15 w-60 text-xl lg:text-2xl my-5 mx-3 py-5 px-3 border rounded-2xl text-white bg-black font-medium `}>Add Snippet</button>
                   </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddSnippet;
