import React, { useEffect } from 'react'
import { useContext } from 'react'
import ItemContext from '../Context/item/ItemContext'
import Item from './Item'
import AuthContext from '../Context/authentication/AuthContext';
function ItemCollection(props) {

  const context=useContext(ItemContext);
  const contextauth = useContext(AuthContext);
  const{showLoginAlert,setLoginAlert} = contextauth;
  const {items,fetchItem}=context;
  const getItem=async ()=>{
    await fetchItem()
  }
  useEffect(()=>{
    getItem()
  },[])

  if(showLoginAlert){
    props.showAlert("success","Successfully Logged In",3000);
    setLoginAlert(false);
  }
  return (
    
    <div className='container'>
      <div className='row my-4'>
          {
            items.map((item,i)=>{
              return (
              <Item item={item} del={false} key={i} showAlert={props.showAlert}/>
              );
            })
          }
      </div>
    </div>
  )
}

export default ItemCollection
