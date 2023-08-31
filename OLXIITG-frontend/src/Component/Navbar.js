import React from 'react'
// to load image in react use img src={require('/images/image-name.png')}
import { useState, useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/authentication/AuthContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"


function Navbar() {
    const dropDownRef = useRef();
    const Navigate = useNavigate();
    const context = useContext(AuthContext);
    const { setModalState } = context;

    const handleLogout = () => {
        if(localStorage.getItem('token')!==null){
            localStorage.removeItem('token');
        }else{
            localStorage.removeItem('admin-token');
        }
        
        Navigate("/login");
    }

    const loginHandler = () => {
        setModalState(true);
    }

    const [searchState, setSearchState] = useState(true);
    const toggleHandler = () => {
        if (searchState === true) {
            setSearchState(false);
        }
        if (searchState === false) {
            setSearchState(true);
        }
    }

    return (
        <>
            <nav className="fixed-top navbar navbar-expand-lg bg-light py-3" style={{ boxShadow: "2px 2px 2px #a0acb84a" }}>
                <div className="container-fluid container">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../Images/OLXlogo.png")} width="48" height="27" className="d-inline-block align-top" alt="OLX-logo" />
                    </Link>
                    <button onClick={toggleHandler} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <button type="button" className="btn btn-outline" style={{ border: "2px solid #002f34" }}> <i className="fa fa-search pe-3" aria-hidden="true"></i><input type="text" value={'pakistan'} placeholder="Search city,area or location.." style={{ border: "none", outline: "none" }} /></button>

                        <button type="button" className="btn btn-outline ms-3" style={{ border: "2px solid #002f34" }}> <input type="text" placeholder="Find Cars,Mobile Phones and more..." style={{ border: "none", outline: "none" }} /><i className="fa fa-search ps-3" aria-hidden="true"></i></button> */}

                            <form className={`d-flex`} role="search">





                                {searchState &&
                                    <div className='d-flex'>

                                        {/*for  location bar */}
                                        <div style={{ cursor: "pointer" }} className="dropdown dropright">
                                            <div className='d-flex' style={{ border: "2px solid black", borderRadius: "3px", height: "50px", width: "300px" }} id="dropdownMenuButton" data-bs-toggle="dropdown" >
                                                <i className="fa fa-search my-auto ms-2 me-1" aria-hidden="true" />
                                                <button style={{ border: "none", outline: "none", width: "100%", backgroundColor: "white" }} className="me-2" type="button" placeholder="Search city,area or location.." aria-label="Search" >Choose Hostel or location</button>
                                                <i className='fas fa-angle-down my-auto me-2' style={{ fontSize: "24px", cursor: "pointer" }}></i>
                                            </div>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to="#">Disang</Link>
                                                <Link className="dropdown-item" to="#">Umiam</Link>
                                                <Link className="dropdown-item" to="#">Kapili</Link>
                                            </div>
                                        </div>

                                        {/* for products search bar */}
                                        <div className='d-flex ms-3' style={{ border: "2px solid black", borderRadius: "3px", height: "50px", width: "600px" }} >
                                            <input style={{ border: "none", outline: "none", width: "100%" }} className="me-2 ms-2" type="search" placeholder="Find Cars,Mobile Phones and more..." aria-label="Search" />
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "black", height: "100%", width: "50px", color: "white", borderRadius: "3px", fontSize: "24px", cursor: "pointer" }}>
                                            <i className="fa fa-search  " aria-hidden="true" />
                                        </div>
                                    </div>
                                }



                                {!searchState &&
                                    <div className='d-flex flex-column mt-2'>

                                        {/*for  location bar */}
                                        <div style={{ cursor: "pointer" }} className="dropdown dropright">
                                            <div className='d-flex' style={{ border: "2px solid black", borderRadius: "3px", height: "50px", width: "300px" }} id="dropdownMenuButton" data-bs-toggle="dropdown" >
                                                <i className="fa fa-search my-auto ms-2 me-1" aria-hidden="true" style={{ cursor: "pointer" }} />
                                                <button style={{ border: "none", outline: "none", width: "100%", backgroundColor: "white" }} className="me-2" type="button" placeholder="Search city,area or location.." aria-label="Search" >Choose Hostel or location</button>
                                                <i className='fas fa-angle-down my-auto me-2' style={{ fontSize: "24px", cursor: "pointer" }}></i>
                                            </div>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to="#">Disang</Link>
                                                <Link className="dropdown-item" to="#">Umiam</Link>
                                                <Link className="dropdown-item" to="#">Kapili</Link>
                                            </div>
                                        </div>

                                        {/* for products search bar */}
                                        <div className='d-flex flex-row mt-2'>
                                            <div className='d-flex ' style={{ border: "2px solid black", borderRadius: "3px", height: "50px", width: "100%" }} >
                                                <input style={{ border: "none", outline: "none", width: "100%" }} className="me-2 ms-2" type="search" placeholder="Find Cars,Mobile Phones and more..." aria-label="Search" />
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "black", height: "100%", width: "50px", color: "white", borderRadius: "3px", fontSize: "24px", cursor: "pointer" }}>
                                                <i className="fa fa-search  " aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </form>
                        </ul>

                    </div>
                    <div className='d-flex justify-content-center align-items-center ms-3 mx-3'>
                        <h5>English</h5>
                    </div>

                    {(localStorage.getItem('token') == null && localStorage.getItem('admin-token') == null) && <div className='d-flex justify-content-center align-items-center ms-3'>
                        <button className='btn mx-4' style={{ textDecoration: "underline", outline: "none", border: "none" }} onClick={loginHandler}><h5>Login</h5></button>
                    </div>}
                    {localStorage.getItem('token') !== null && <div className='d-flex justify-content-center align-items-center ms-3 mx-4'>
                        <button className='btn btn-outline-primary ' style={{ borderRadius: '30px', boxShadow: "2px 2px 2px blue" }} >
                            <div style={{ fontSize: "20px" }} className='d-flex justify-content-center align-items-center'>
                                <i className="fa fa-plus me-1" aria-hidden="true"></i>
                                <Link to='/newitem'>Sell</Link>
                            </div>
                        </button>
                    </div>}

                    {(localStorage.getItem('token') !== null || localStorage.getItem('admin-token') !== null)  && <><DropdownButton id="dropdown-basic-button" title="Profile" ref={dropDownRef} style={{ borderRadius: '30px', boxShadow: "2px"}}>
                        {(localStorage.getItem('token') !== null || localStorage.getItem('admin-token') !== null) && <Link className="dropdown-item my-1" style={{ textDecoration: "underline", outline: "none", border: "none" }} to="/edit-profile" ><h5>Profile</h5></Link>}
                        {localStorage.getItem('token') !== null && <Link className="dropdown-item my-1" style={{ textDecoration: "underline", outline: "none", border: "none" }} to="/allitemsposted" ><h5>All Items Posted</h5></Link>}
                        {localStorage.getItem('token') !== null &&<Link className="dropdown-item my-1"style={{ textDecoration: "underline", outline: "none", border: "none" }} to="/likeditem" ><h5>Activity</h5></Link>}
                        {localStorage.getItem('admin-token') !== null &&<Link className="dropdown-item my-1"style={{ textDecoration: "underline", outline: "none", border: "none" }} to="/admin/allusers" ><h5>All Users</h5></Link>}
                        {localStorage.getItem('admin-token') !== null &&<Link className="dropdown-item my-1"style={{ textDecoration: "underline", outline: "none", border: "none" }} to="/admin/allitems" ><h5>All Items</h5></Link>}
                        {(localStorage.getItem('token') !== null || localStorage.getItem('admin-token') !== null) &&<button className='dropdown-item btn my-1' style={{ textDecoration: "underline", outline: "none", border: "none" }} onClick={handleLogout}><h5>LogOut</h5></button>}
                    </DropdownButton></>
                    }
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar
