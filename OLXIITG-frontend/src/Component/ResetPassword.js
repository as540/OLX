import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword(props) {

    const navigate=useNavigate();

    const [em,setEm]=useState({
        email:""
    })

    const emailChangeHandler=(event)=>{
        setEm({...em,[event.target.name]:event.target.value});
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const url = "https://campus-olx-iitg.onrender.com/api/auth/resetpassword-email";
        const data = {
            email: em.email,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)

        })
        if(response.status === 200){
            props.showAlert("success","Password Resetting Email Sent To The Email Id.",3000);
        }
        else{
            props.showAlert("danger","Email Id Is Not Registered.",3000);
        }
    }
    return (
        <div className='container' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "30%", height: "60%", borderRadius: "8px", display: "flex", flexDirection: "column", marginTop: "50px", alignContent: "center", justifyContent: "center", margin: "70px", paddingBottom: "10px", boxShadow: "-15px -15px 4px -3px rgba(115,113,113,0.6)", backgroundColor: "rgb(101,107,255)", position: "relative" }}>
                <i
                    className="fa fa-times"
                    aria-hidden="true"
                    style={{ position: "absolute", fontSize: "20px", cursor: "pointer", top: "10px", right: "10px" }}
                    onClick={() => {
                        navigate("/");
                    }}>
                </i>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px", padding: "9px" }}>
                    <img src={require("../Images/OLXlogo.png")} alt="OLX" style={{ width: "30%", height: "30%" }} />
                </div>
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onSubmit={formSubmitHandler}>
                    <div style={{ paddingBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>
                        <label htmlFor="email">Register to continue</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <input name="email" required="true" type="email" id="email" placeholder="Email" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} value={em.email} onChange={emailChangeHandler} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <button className='btn btn-dark' type='submit' >Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
