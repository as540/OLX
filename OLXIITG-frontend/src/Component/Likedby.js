import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Likedby = () => {
    const params = useParams();
    const navigate = useNavigate();


    const id = params.id;
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const url = `https://campus-olx-iitg.onrender.com/api/item/getLikedBy/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token') // yokrn
            }
        })
            const json = await response.json()
            setUsers(json)
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchUsers();
        }

    }, [users.length]);


    if(localStorage.getItem('token')){
        if (users.length === 0) {
            return <></>;
        }
    
    
        return (
            <div className="row gx-3 mb-3" style={{margin:"auto"}}>
                {users.map((user, i)=>{
                    return(
                        <div className="col-md-3 my-2">
                        <Card style={{ width: '18rem',borderRadius:"25px",borderColor:"black" }} >
                            <Card.Img variant="top" src="http://bootdey.com/img/Content/avatar/avatar1.png" style={{borderRadius:"25px"}}/>
                            <Card.Body>
                                <Card.Title style={{fontWeight:"bold",fontSize: "15px"}}>{user.email}</Card.Title>
                                <Button variant="primary"><Link to={`/userprof/${user._id}`} style={{color:"white"}}>See Profile</Link></Button>
                            </Card.Body>
                        </Card>
                    </div>
                    )
                })}
            </div>
    
        )
    }else{
        return(<div className="container-xl mx-10" ><h1>Not Authorized</h1></div>)
    }
}

export default Likedby
