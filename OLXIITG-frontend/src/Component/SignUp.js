import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function SignUp(props) {


    const [em, setEm] = useState({ name: "", email: "" ,phone: ""})

    const emailChangeHandler = async (event) => {
        setEm({ ...em, [event.target.name]: event.target.value })
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const url = "https://campus-olx-iitg.onrender.com/api/auth/createuser";
        const data = {
            name: em.name,
            email: em.email,
            contact: em.phone 
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)

        })
        console.log(response);
        if(response.status === 401){
            props.showAlert("danger","Email Id Already Existed.",4000);
            setEm({ name: em.name, email: "" ,phone: em.phone});
        }
        else if(response.status === 200){
            props.showAlert("success",`Confirmation Email Sent To ${em.email}`,"3000");
            setEm({ name: "", email: "" ,phone: ""});
        }
        else if(response.status === 402){
            props.showAlert("danger",`Phone Number Already registered`,"5000");
        }
    }


    const navigate = useNavigate();
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
                        <input name="name" required="true" type="text" id="name" placeholder="Name" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={emailChangeHandler} value={em.name} />
                        <input name="phone" required="true" type="text" id="phone" placeholder="Phone" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={emailChangeHandler} value={em.phone} />
                        <p style={{ marginX: "auto", color: "white", cursor: "pointer" }}
                            onClick={() => {
                                navigate("/login")
                            }}

                        >
                            Have an account? Login
                        </p>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <button className='btn btn-dark' type='submit' >Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
