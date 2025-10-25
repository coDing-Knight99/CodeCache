import React from 'react'

const TagList = ({tagName,FilteredTags,setFilteredTags}) => {
  const isSelected = ()=>{
    return  FilteredTags.includes(tagName)
  }
  return (
    <div onClick={async()=>{
      if(FilteredTags.includes(tagName))
        {
          await setFilteredTags(FilteredTags => FilteredTags.filter(Tag => Tag!=tagName));
          console.log(FilteredTags)
        }
        else
          {
          await setFilteredTags([...FilteredTags,tagName]);
          console.log(FilteredTags)
      }
    }} className={`border border-2 border-gray-300 p-2 rounded-2xl m-2 hover:scale-105 cursor-pointer font-bold transition-all text-lg hover:shadow-2xl ${isSelected()?"bg-black text-white":""}`}>
      <p>{tagName}</p>
    </div>
  )
}

export default TagList
