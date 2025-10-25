import React from 'react'
import { XIcon } from 'lucide-react'
import { Editor } from '@monaco-editor/react'
const ViewSnippet = ({code,setviewSnip}) => {
  return (
    <div onClick={()=>{
        setviewSnip(null)
        document.body.classList.remove("overflow-hidden")
    }} className='fixed inset-0 z-50 flex justify-center items-center bg-gray-800/40'>
        <div className='absolute top-[10%] right-[15%]'>
            <XIcon onClick={()=>{
                setviewSnip(null)
                document.body.classList.remove("overflow-hidden")
            }} className='text-black cursor-pointer text-2xl font-medium'/>
        </div>
      <div onClick={(e)=>{e.stopPropagation()}} className="h-[75%] w-[95%] lg:w-[50%] rounded-2xl shadow-lg p-6 overflow-y-auto">
        <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                options={{
                fontSize: 20,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                automaticLayout:true,
                readOnly:true
                }}
                />
      </div>
    </div>
  )
}

export default ViewSnippet
