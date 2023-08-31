import React,{useContext} from 'react'
import ItemCollection from './ItemCollection';
import Modal from './Modal';



function Home(props) {

  return (
    <div style={{ marginTop: "40px" }}>
      <div className='container '>
        <Modal/>
        <ItemCollection showAlert={props.showAlert}/>
      </div>

    </div>
  )
}

export default Home
