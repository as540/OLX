import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'

const AdminItemCard = (props) => {
    const {item,showAlert} = props;
    const[banText,setBanText] = useState("");

    const banItem = async () => {
        const url = `https://campus-olx-iitg.onrender.com/admin/banItem/${item._id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('admin-token')
            }
        })
        // console.log(response.status);
        // return response.status;
        // console.log(json)
    }

    const handleBan = async()=>{
        await banItem();
        if(banText === "Unbanned Item"){
            setBanText("Ban Item");   
            props.showAlert("success","Item Un-Banned Successfully",3000)
        }
        else{
            setBanText("Unbanned Item");   
            props.showAlert("success","Item Banned Successfully",3000)
        }
    }


    useEffect(()=>{
        
            if(item.is_banned){
                setBanText("Unbanned Item");
            }
            else{
                setBanText("Ban Item")
            }
    },[])

    return (
        <div className="card my-4" style={{ borderRadius: "25px", borderColor: "black", borderWidth: "2px" }}>
            <img src={`https://campus-olx-iitg.onrender.com/${item.img_address}`} alt="Denim Jeans" style={{ width: "100%", paddingTop: "5px", borderRadius: "25px" }} />

            <h2 className="price my-2">Rs. {item.price}</h2>
            <p>{item.description.slice(0, 100)}...</p>
            <div className="row gx-3 mb-3">
                <div className="col-md-6 my-2"><button style={{ borderRadius: "25px", width: "75%" }}><Link to={`/admin/item/desc/${item._id}`} style={{ color: "white" }}>Description</Link></button></div>
                {/* <div className="col-md-6 my-2"><button style={{ borderRadius: "25px", width: "75%" }} > </button></div> */}
                <div className="col-md-6 my-2"><button style={{ borderRadius: "25px", width: "75%" }} onClick={handleBan}>{banText}</button></div>
            </div>
        </div>
    )
}

export default AdminItemCard
