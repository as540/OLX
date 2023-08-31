import React,{useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Form,Container} from 'react-bootstrap'
const UserProf = () => {
    const params = useParams();
    const id = params.id;

    const [items, setItem] = useState([]);

    const getLikedByItem = async () => {
        const url = `https://campus-olx-iitg.onrender.com/api/auth/getuser/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = await response.json();
        setItem(json);
    }


    useEffect(() => {
        getLikedByItem();
    }, [items.length])


    if (items.length === 0) {
        return (<></>);
    }
// 
    return (
        <Container>
            <div class="container-xl px-4 mt-4 my-4">
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mb-4 mb-xl-0" style={{ "border-radius": "25px", width: "100%" }}>
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                <img class="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="card mb-4" style={{ "border-radius": "25px", width: "90%" }}>
                            <div class="card-header">Account Details</div>
                            <div class="card-body">
                                <form>

                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputFirstName"> name</label>
                                            <input class="form-control" name="name" id="inputFirstName" type="text" placeholder="Enter your first name" value={items[0].name} disabled/>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input class="form-control" name="email" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={items[0].email} disabled />
                                        </div>

                                    </div>
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputPhone">Phone number</label>
                                            <input class="form-control" name="contact" id="inputPhone" type="tel" placeholder="Enter your phone number" value={items[0].contact}  disabled/>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputPhone">Hostel</label>
                                            <input class="form-control" name="contact" id="inputPhone" type="tel" placeholder="Enter your phone number" value={items[0].hostel}  disabled/>
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

export default UserProf
