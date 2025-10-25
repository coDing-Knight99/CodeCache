import React from 'react';
import { useRef,useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { XIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
const EditSnippet = ({Snippet,seteditSnip,fetchSnippets,fetchtags,setloader}) => {
  const [title, settitle] = useState(Snippet.title);
      const [description, setdescription] = useState(Snippet.description);
      const [language, setlanguage] = useState(Snippet.language);
      const [tags, settags] = useState(Snippet.tags);
      const [code, setcode] = useState(Snippet.code);
  const editorRef = useRef(null)
  const handleEditorMount = (editor,monaco)=>{
    editorRef.current=editor
  }
  const isFormValid = title.trim()!='' && description.trim()!='' && language.trim()!='' && tags.trim()!='' && code.trim()!='';
  const handleEdit = async()=>{
    try{
      const snippet_id=Snippet.id;
      console.log({snippet_id,title,code,language,description,tags})
      const res = await axios.put("http://localhost:3000/user/snippets/update",{snippet_id:snippet_id,title:title,code:code,language:language,description:description,newtags:tags})
      await fetchSnippets();
      await fetchtags();

      const data = res.data
      toast("Snippet Updated Successfully!",{className:"font-bold text-lg"})
      console.log(data) 
    }catch(error){
      console.error("Error Updating Snippet",error)
    }
  }
  return (
    <div onClick={()=>{
                seteditSnip(null)
                document.body.classList.remove("overflow-hidden")
            }} className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800/40">
      <div onClick={(e)=>{e.stopPropagation()}} className="h-[75%] w-[95%] lg:w-[50%] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
        <div className='flex justify-between'>
        <div className='pb-10'>
            <p className='lg:text-3xl text-2xl font-medium'>Edit Snippet</p>
            <p className='lg:text-2xl text-xl text-gray-500 pt-2'>Update your Code Snippet Details</p>
        </div>
        <div onClick={()=>{
                seteditSnip(null)
                document.body.classList.remove("overflow-hidden")
            }} className='cursor-pointer flex items-center justify-center lg:h-8 lg:w-8 h-5 w-5 rounded-xl hover:border hover:border-2 hover-border-gray-200'>
            <XIcon  className='text-gray-600 '/>
        </div>
        </div>
        <div className=''>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-2xl font-medium'>Title</label>
                <input onChange={(e)=>{settitle(e.target.value)}} type="text" id='title' defaultValue={Snippet.title} placeholder='e.g. React useState hook' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor=""  className='lg:text-2xl text-xl font-medium'>Description</label>
                <input onChange={(e)=>{setdescription(e.target.value)}} type="text" id='description' defaultValue={Snippet.description} placeholder='Brief description of the snippet' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Language</label>
                <input onChange={(e)=>{setlanguage(e.target.value)}} type="text" id='language' defaultValue={Snippet.language} placeholder='e.g., JavaScript, Python, CSS' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Code</label>
                <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
                <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={Snippet.code}
                theme="vs-dark"
                onMount={handleEditorMount}
                onChange={(value)=>{setcode(value||'')}}
                options={{
                fontSize: 20,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                automaticLayout:true
                }}
                />
                </div>
                <label htmlFor="" className='lg:text-2xl text-xl font-medium'>Tags</label>
                <input onChange={(e)=>{settags(e.target.value)}} type="text" id='tags' defaultValue={Snippet.tags} placeholder='e.g., react, hooks, state (comma-seperated)' className='w-full text-gray-600 lg:text-2xl text-xl lg:pl-10 pl-5 pr-4 lg:py-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-3 focus:ring-blue-500 
                   focus:border-blue-500 focus:shadow-blue-500 transition-all ' />
                   <div className='flex justify-end'>
                    <button onClick={()=>{
                        seteditSnip(null)
                        document.body.classList.remove("overflow-hidden")
                    }} className='cursor-pointer flex items-center justify-center h-15 w-35 text-xl lg:text-2xl my-5 mx-3 py-5 px-3 border border-gray-300 rounded-2xl hover:bg-gray-400 font-medium'>Cancel</button>
                    <button onClick={async()=>{
                      setloader(true);
                      await handleEdit();
                      setloader(false);
                        seteditSnip(null)
                        document.body.classList.remove("overflow-hidden")
                    }} disabled={isFormValid?false:true} className={`cursor-pointer ${isFormValid?"hover:bg-gray-900":"bg-gray-700"} flex items-center justify-center h-15 w-50 text-xl lg:text-2xl my-5 mx-3 py-5 px-3 border rounded-2xl text-white bg-black font-medium `}>Update Snippet</button>
                   </div>
                   
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;
