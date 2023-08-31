import { useNavigate } from "react-router-dom"
import React, { useState, useContext } from "react";
import AuthContext from '../Context/authentication/AuthContext';
import ItemContext from "../Context/item/ItemContext";

function Login(props) {

    const [loginCred, setLoginCred] = useState({
        email: "",
        password: ""
    })

    const authContext = useContext(AuthContext);
    const { setLoginAlert, showPassAlert, setPassAlert } = authContext;



    const onChangeHandler = (event) => {
        setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
    }

    const Navigate = useNavigate();

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        const url = "https://campus-olx-iitg.onrender.com/api/auth/login";
        const data = {
            email: loginCred.email,
            password: loginCred.password,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })

        console.log(response.status);
        const json = await response.json()
        if (response.status === 200) {
            setLoginCred({
                email: "",
                password: ""
            });
            localStorage.setItem('token', json.token)
            setLoginAlert(true);
            Navigate("/");
        }
        else if (response.status === 402) {
            props.showAlert("danger", "Invalid Email", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
        else if (response.status === 403) {
            props.showAlert("danger", "Invalid Password", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
        else if (response.status === 401) {
            props.showAlert("danger", "You are banned. Contact admin.", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
    }


    const adminLoginSubmitHandler = async (event) => {
        event.preventDefault();
        const url = "https://campus-olx-iitg.onrender.com/admin/login";
        const data = {
            email: loginCred.email,
            password: loginCred.password,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })

        console.log(response.status);
        const json = await response.json()
        if (response.status === 200) {
            setLoginCred({
                email: "",
                password: ""
            });
            localStorage.setItem('admin-token', json.token)
            setLoginAlert(true);
            Navigate("/");
        }
        else if (response.status === 404) {
            props.showAlert("danger", "Not Admin", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
        else if (response.status === 403) {
            props.showAlert("danger", "Invalid Password", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
        else if (response.status === 401) {
            props.showAlert("danger", "You are banned. Contact admin.", 4000);
            setLoginCred({
                email: loginCred.email,
                password: ""
            });
        }
    }


    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        navigate("/sign-up");
    }

    if (showPassAlert) {
        props.showAlert("success", "Password Changed Successfully", 3000);
        setPassAlert(false);
    }

    console.log("isadmin = ",props.isadmin)
    if (props.isadmin === false) {
        return (
            <div className='container' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "30%", height: "60%", borderRadius: "8px", display: "flex", flexDirection: "column", marginTop: "50px", alignContent: "center", justifyContent: "center", margin: "70px", paddingBottom: "10px", boxShadow: "-15px -15px 4px -3px rgba(115,113,113,0.6)", backgroundColor: "rgb(101,107,255)", position: "relative" }}>
                    <i
                        style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", fontSize: "20px" }}
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={() => {
                            navigate("/");
                        }}>

                    </i>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px", padding: "9px" }}>
                        <img src={require("../Images/OLXlogo.png")} alt="OLX" style={{ width: "30%", height: "30%" }} />
                    </div>
                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onSubmit={loginSubmitHandler}>
                        <div style={{ paddingBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>
                            <label htmlFor="email">User Login</label>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <input name="email" value={loginCred.email} required={true} type="email" id="email" placeholder="Email" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onChangeHandler} />
                            <input name="password" value={loginCred.password} type="password" required={true} placeholder='Password' style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onChangeHandler} />
                            <p
                                style={{ marginX: "auto", color: "white", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/admin/login")
                                }} >
                                Admin Login? Click Here
                            </p>
                            <p
                                style={{ marginX: "auto", color: "white", cursor: "pointer" }}
                                onClick={handleRegister} >
                                Have not account? Register
                            </p>
                            <p
                                style={{ marginX: "auto", color: "white", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/reset-password")
                                }} >
                                Forget Password ?
                            </p>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <button className='btn btn-dark' type='submit'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='container' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "30%", height: "60%", borderRadius: "8px", display: "flex", flexDirection: "column", marginTop: "50px", alignContent: "center", justifyContent: "center", margin: "70px", paddingBottom: "10px", boxShadow: "-15px -15px 4px -3px rgba(115,113,113,0.6)", backgroundColor: "rgb(101,107,255)", position: "relative" }}>
                    <i
                        style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", fontSize: "20px" }}
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={() => {
                            navigate("/");
                        }}>

                    </i>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px", padding: "9px" }}>
                        <img src={require("../Images/OLXlogo.png")} alt="OLX" style={{ width: "30%", height: "30%" }} />
                    </div>
                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onSubmit={adminLoginSubmitHandler}>
                        <div style={{ paddingBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>
                            <label htmlFor="email">Admin Login</label>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <input name="email" value={loginCred.email} required={true} type="email" id="email" placeholder="Email" style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onChangeHandler} />
                            <input name="password" value={loginCred.password} type="password" required={true} placeholder='Password' style={{ margin: "8px", padding: "5px", width: "80%", borderRadius: "5px" }} onChange={onChangeHandler} />
                            <p
                                style={{ marginX: "auto", color: "white", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/login")
                                }} >
                                User Login? Click Here
                            </p>
                            <p
                                style={{ marginX: "auto", color: "white", cursor: "pointer" }}>
                                Forgot Password? Contact Admin
                            </p>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <button className='btn btn-dark' type='submit'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login
