import React,{useContext,useEffect} from 'react'
import ItemContext from '../../Context/item/ItemContext';
import Item from '../Item';

export default function LikedItem() {
 const context=useContext(ItemContext);
    const {userLikedItems,fetchlikedItem}=context;
    const getItem=async ()=>{
    await fetchlikedItem()
    console.log(userLikedItems)
    }
    useEffect(()=>{
    getItem()
    
    },[userLikedItems.length])
    
    if(userLikedItems.length!==0){
        return (
            <div className='container'>
            <div className='row my-4'>
                {
                  userLikedItems.map((item)=>{
                    return (
                    <Item item={item} del={false} key={item.id} />
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
