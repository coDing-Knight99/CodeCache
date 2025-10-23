import React from 'react';
import { useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { XIcon } from 'lucide-react';
import axios from 'axios';

const AddSnippet = ({setaddSnip}) => {
    const editorRef = useRef(null)
    const handleEditorMount = (editor,monaco)=>{
        editorRef.current=editor
    }
    const handleAdd = async()=>{
        let title = document.getElementById("title");
        title=title.value
        console.log(title)
        const description = document.getElementById("description").value;
        console.log(description)
        const language = document.getElementById("language").value;
        console.log(language)
        const code = editorRef.current.getValue();
        console.log(code)
        const tags = document.getElementById("tags").value;
        console.log(tags)
        try{
            const res = await axios.post("http://localhost:3000/user/snippets/create",{title,description,language,code,tags})
            const data = res.data;
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
      <div onClick={(e)=>{e.stopPropagation()}} className="h-[75%] w-[75%] lg:w-[50%] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
        <div className='flex justify-between'>
        <div className='pb-10'>
            <p className='text-3xl font-medium'>Add New Snippet</p>
            <p className='text-2xl text-gray-500 pt-2'>Create a new code snippet with tags</p>
        </div>
        <div onClick={()=>{
                setaddSnip(false)
                document.body.classList.remove("overflow-hidden")
                console.log("I was Clicked")
            }} className='cursor-pointer flex items-center justify-center h-8 w-8 rounded-xl hover:border hover:border-2 hover-border-gray-200'>
            <XIcon className='text-gray-600'/>
        </div>
        </div>
        <div className=''>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-2xl font-medium'>Title</label>
                <input type="text" id="title" placeholder='e.g. React useState hook' className='w-full text-gray-600 text-2xl pl-10 pr-4 py-4 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='text-2xl font-medium'>Description</label>
                <input type="text" id="description" placeholder='Brief description of the snippet' className='w-full text-gray-600 text-2xl pl-10 pr-4 py-4 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='text-2xl font-medium'>Language</label>
                <input type="text" id="language" placeholder='e.g., JavaScript, Python, CSS' className='w-full text-gray-600 text-2xl pl-10 pr-4 py-4 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='text-2xl font-medium'>Code</label>
                <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
                <Editor
                id="code"
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Start typing your code..."
                theme="vs-dark"
                onMount={handleEditorMount}
                options={{
                fontSize: 20,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                automaticLayout:true
                }}
                />
                </div>
                <label htmlFor="" className='text-2xl font-medium'>Tags</label>
                <input type="text" id="tags" placeholder='e.g., react, hooks, state (comma-seperated)' className='w-full text-gray-600 text-2xl pl-10 pr-4 py-4 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                   <div className='flex justify-end'>
                    <button onClick={()=>{
                        setaddSnip(false)
                        document.body.classList.remove("overflow-hidden")
                    }} className='cursor-pointer flex items-center justify-center h-15 w-35 text-2xl my-5 mx-3 py-5 px-3 border border-gray-300 rounded-2xl hover:bg-gray-400 font-medium'>Cancel</button>
                    <button onClick={()=>{
                        handleAdd();
                        setaddSnip(false)
                    }} className='cursor-pointer flex items-center justify-center h-15 w-50 text-2xl my-5 mx-3 py-5 px-3 border rounded-2xl text-white bg-black font-medium hover:bg-gray-900'>Add Snippet</button>
                   </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddSnippet;
