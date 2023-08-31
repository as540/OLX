import React,{useState, useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import {Form,Container} from 'react-bootstrap'
const AdminUserProf = (props) => {
    const params = useParams();
    const id = params.id;

    const [items, setItem] = useState([]);
    const [banText,setBanText] = useState("");

    const getLikedByItem = async () => {
        const url = `https://campus-olx-iitg.onrender.com/admin/getuser/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('admin-token')
            }
        })

        const json = await response.json();
        setItem(json);
    }

    const banUser = async ()=>{
        const url = `https://campus-olx-iitg.onrender.com/admin/banuser/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('admin-token')
            }
        })

        return (response.status);
    }


    const handleBanUser = async (e)=>{
        const x = await banUser();
        if(x === 200){
            if(banText === "Un-ban"){
                props.showAlert("success","User Un-banned Successfully.",3000);
                setBanText("Ban");
            }else{
                props.showAlert("success","User Banned Successfully.",3000);
                setBanText("Un-ban");
            }
        }
        else{
            props.showAlert("danger","Error.");
        }
    }


    useEffect(() => {
        getLikedByItem();
        if(items.length !== 0){
            items[0].is_banned ? setBanText("Un-ban"): setBanText("Ban")
        }
    }, [items.length])


    if (items.length === 0) {
        return (<></>);
    }
// 
    return (
        <Container>
            <div className="container-xl px-4 mt-4 my-4">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0" style={{ "borderRadius": "25px", width: "100%" }}>
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4" style={{ "borderRadius": "25px", width: "90%" }}>
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>

                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName"> name</label>
                                            <input className="form-control" name="name" id="inputFirstName" type="text" placeholder="Enter your first name" value={items[0].name} disabled/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                            <input className="form-control" name="email" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={items[0].email} disabled />
                                        </div>

                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                            <input className="form-control" name="contact" id="inputPhone" type="tel" placeholder="Enter your phone number" value={items[0].contact}  disabled/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">Hostel</label>
                                            <input className="form-control" name="contact" id="inputPhone" type="tel" placeholder="Enter your phone number" value={items[0].hostel}  disabled/>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <button className="btn btn-primary" type="button" style={{ borderRadius: "25px" }}  onClick={handleBanUser}>{banText}</button>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-primary" type="button" style={{ borderRadius: "25px" }}> <Link to="/admin/allusers" style={{color: "white"}}>Back</Link></button>
                      </div>
                    </div>
                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminUserProf
