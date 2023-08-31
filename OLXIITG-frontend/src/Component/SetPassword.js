import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';


function SetPassword(props) {

    const params = useParams();
    const token = params.token;


    const [passCred, setPassCred] = useState({
        password: "",
        Cpassword: ""
    })

    const onchange = (event) => {
        setPassCred({ ...passCred, [event.target.name]: event.target.value })
    }

    const isSame = () => {
        if (passCred.password === passCred.Cpassword || passCred.Cpassword.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const passwordSubmitHandler = async (event) => {
        event.preventDefault();
        const url = `https://campus-olx-iitg.onrender.com/api/auth/confirm-email/${token}`;
        const data = {
            password: passCred.password,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)

        })

        const status = response.status;
        console.log("success");
        console.log(response.status);
        if (response.status === 200) {
            props.showAlert("success", "Password Set Successfully", 3000);
            setTimeout(() => {
                navigate("/login")
            }, 3000);
            setPassCred({
                password: "",
                Cpassword: ""
            })
        }

        else if (response.status === 400) {
            props.showAlert("danger", "Link Already Used.", 3000);
            setPassCred({
                password: "",
                Cpassword: ""
            })
        }
        // for 400 link already used
    }



    const navigate = useNavigate();
    return (
        <div>
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
                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onSubmit={passwordSubmitHandler}>
                        <div style={{ paddingBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>
                            <label htmlFor="password">Set Password</label>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <input name="password" required="true" type="password" id="password" placeholder="password" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onchange} value={passCred.password} />
                            <input name="Cpassword" required="true" type="text" placeholder="Confirm password" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onchange} value={passCred.Cpassword} />
                            {!isSame() && <p style={{ color: "white" }} >Password and confirm password does not match!</p>}
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <button className='btn btn-dark' type='submit' >Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetPassword
