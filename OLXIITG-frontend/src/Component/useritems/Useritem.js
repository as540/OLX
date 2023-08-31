import React from 'react'
import { useContext,useEffect } from 'react';
import ItemContext from '../../Context/item/ItemContext';
import Item from '../Item';
import { Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Useritem() {
    const context=useContext(ItemContext);
    const {userItems,fetchUserItems}=context;
    const getItem=async ()=>{
    await fetchUserItems()
    console.log(userItems)
    }
    useEffect(()=>{
    getItem()
    
    },[userItems.length])
    
    if(userItems.length!==0){
        return (
            <div className='container'>
            <div className='row my-4'>
                {
                  userItems.map((item)=>{
                    return (
                    <Item item={item} del={true} key={item.id} isuser={true}/>
                    );
                  })
                }
            </div>
          </div>
        )
      }
      else{
        <></>
      }
}
