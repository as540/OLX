import React,{ useState,useEffect, useContext} from 'react'
import {useNavigate,Link} from "react-router-dom"
import AuthContext from '../Context/authentication/AuthContext'
import ItemContext from '../Context/item/ItemContext'
import {Card,Button} from "react-bootstrap"

const AllUsers = () => {

    const [users,setUsers] = useState([]);

    const fetchUsers = async () => {
        const url = `https://campus-olx-iitg.onrender.com/admin/users`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('admin-token') // yokrn
            }
        })
        const json = await response.json()
        setUsers(json)
    }

    useEffect(() => {
        fetchUsers();

    }, [users.length]);


    if(localStorage.getItem("admin-token")){
        if(users.length !== 0){
            return (
                <div className="row gx-3 mb-3" style={{ margin: "auto" }}>
                    {users.map((user, i) => {
                        return (
                            <div className="col-md-3 my-2" key={i}>
                                <Card style={{ width: '18rem', borderRadius: "25px", borderColor: "black" }} >
                                    <Card.Img variant="top" src="http://bootdey.com/img/Content/avatar/avatar1.png" style={{ borderRadius: "25px" }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontWeight: "bold", fontSize: "15px" }}>{user.email}</Card.Title>
                                        <Button variant="primary"><Link to={`/admin-userprof/${user._id}`} style={{ color: "white" }}>See Profile</Link></Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>
        
            )
        }else{
            return(<></>)
        }
    }else{
        return(<div className="container-xl mx-10" ><h1>Not Authorized</h1></div>)
    }
}

export default AllUsers
