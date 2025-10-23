import React from 'react'

const Taggrid = ({tagName,index}) => {
  return (
    <div className={`border border-2 border-gray-300 p-2 rounded-2xl m-2 hover:scale-105 cursor-pointer ${(index===0)?"bg-black text-white":""} font-bold transition-all text-lg hover:shadow-2xl `}>
      <p>{tagName}</p>
    </div>
  )
}

export default Taggrid
