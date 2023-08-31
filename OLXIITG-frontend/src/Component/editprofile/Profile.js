import React,{useEffect,useContext,useState} from 'react'
import Editprofile from './Editprofile'
import AuthContext from '../../Context/authentication/AuthContext'

export default function Profile(props) {
    const context=useContext(AuthContext)
    const [user,setUser] = useState([]);


    const fetchuser=async ()=>{
      const url=`https://campus-olx-iitg.onrender.com/api/auth/getuser`
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': "application/json",
              'auth-token':localStorage.getItem('token') // yokrn
          }
      })
      const json= await response.json()
      setUser(json)
    }

    
    useEffect(()=>{
        fetchuser()
    },[user.length])
  if(user.length!==0){
    return (
      <Editprofile user={user} showAlert={props.showAlert}></Editprofile>
    )
  }
  else{
    <></>
  }
}
