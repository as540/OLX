import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ItemContext from '../Context/item/ItemContext'
import Item from './Item'

function Itembycategory() {

  const context=useContext(ItemContext);
  const params=useParams()
  const category=params.category
  const {itembycategory,fetchByCategory}=context;
  const [itembycat,setitemcat]=useState([]);

  
  useEffect(()=>{
    
    fetchByCategory(category)
    console.log(itembycategory)
    
  },[category])

  if(itembycategory.length === 0){
    return <></>
  }
  return (
    <div className='container'>
      <div className='row my-4'>
          {
            itembycategory.map((item)=>{
              return (
              <Item item={item} del={false} key={item.id}/>
              );
            })
          }
      </div>
    </div>
  )
}

export default Itembycategory
