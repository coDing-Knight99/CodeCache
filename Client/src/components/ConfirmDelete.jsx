import React from 'react'

const ConfirmDelete = ({snippet_id,setdeleteSnip}) => {
  return (
    <div onClick={()=>{
        setdeleteSnip(null)
        document.body.classList.remove("overflow-hidden")
    }} className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800/40">
      <div onClick={(e)=>{e.stopPropagation()}} className="h-[30%] w-[45%] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
        <div className='p-5 flex flex-col gap-2'>
            <p className='text-3xl font-medium'>Delete Snippet</p>
            <p className='text-2xl text-gray-500'>Are you sure you want to delete this snippet? This action cannot be undone.</p>
        </div>
        <div className='flex justify-end'>
                    <button onClick={()=>{
                        setdeleteSnip(null)
                        document.body.classList.remove("overflow-hidden")
                    }} className='cursor-pointer flex items-center justify-center h-15 w-35 text-2xl my-3 mx-3 py-5 px-3 border border-gray-300 rounded-2xl hover:bg-gray-400 font-medium'>Cancel</button>
                    <button className='cursor-pointer flex items-center justify-center h-15 w-35 text-2xl my-3 mx-3 py-3 px-3 border rounded-2xl text-white bg-black font-medium hover:bg-gray-900'>Delete</button>
                   </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
