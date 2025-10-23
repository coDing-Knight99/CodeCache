import React from 'react'
import { Copy, PenIcon, Trash2Icon } from 'lucide-react'
import Taggrid from './taggrid'

const SnippetCard = ({ snippet,setviewSnip,seteditSnip,setdeleteSnip }) => {
  const tags = snippet.tags.split(',')

  return (
    <div className="flex flex-col w-[90%] lg:w-[45%] border rounded-2xl m-5 p-5 lg:m-10 lg:p-10 hover:scale-101 transition-transform hover:shadow-xl bg-white">
      
      <div className="flex justify-between mb-4">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold line-clamp-2">
            {snippet.title}
          </p>
          <p className="text-gray-600 text-lg line-clamp-2">
            {snippet.description}
          </p>
        </div>
        <ul className="flex gap-4 items-start">
          <li onClick={()=>{
            try{
                navigator.clipboard.writeText(snippet.code)
                alert("Copied to Clipboard")
            }catch(error)
            {
                console.log("Error Copying to Clipboard",error)
            }
          }} className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-200'><Copy /></li>
          <li onClick={()=>{seteditSnip(snippet)
            document.body.classList.add("overflow-hidden")
          }} className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-200'><PenIcon /></li>
          <li onClick={()=>{
            setdeleteSnip(snippet.id)
            document.body.classList.add("overflow-hidden")
          }} className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-200'><Trash2Icon className=" text-red-500" /></li>
        </ul>
      </div>

      <div onClick={()=>{
            console.log("I was clicked")
            setviewSnip(snippet.code)
            document.body.classList.add("overflow-hidden")
            }} className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-2xl p-4 mb-4 overflow-hidden">
        <p  className=" font-mono text-lg line-clamp-1">
          {snippet.code}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tagName, index) => (
          <Taggrid key={index} tagName={tagName.trim()} index={index} />
        ))}
      </div>
    </div>
  )
}

export default SnippetCard
