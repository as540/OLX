import React,{useContext,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ItemContext from '../Context/item/ItemContext'
import Description from './Description'

const DescFetch = () => {
    const {itembyID,fetchItembyID}=useContext(ItemContext)
    // const [item,setItem]=useState({})
    const [ownerDetails,setOwnerDetails]=useState({})
    const params=useParams()
    const id=params.id;
    const fetch=async()=>{
        await fetchItembyID(id)
        console.log(itembyID)
        // setItem(itembyID)
    }
    useEffect(()=>{
        fetch()
        // setOwnerDetails(item.ownerDetails)
    },[itembyID.length])
    
    if(itembyID.length!==0){
        return (
            <Description itembyID={itembyID} />
          )
    }
    else{
        return(
            <></>
        )
    }
  
}

export default DescFetch