import React, { useState, useEffect, useContext } from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import { useParams } from "react-router-dom";


const AdminItemDesc = () => {

    const params = useParams();
    const [itembyID, setItemById] = useState([]);
    const id = params.id;

    const fetchItem = async () => {
        const url = `https://campus-olx-iitg.onrender.com/admin/getItem/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('admin-token')
            }
        })
        // console.log(response.status);
        const json = await response.json()
        // console.log(json)
        setItemById(json);
    }


    useEffect(()=>{
        fetchItem();
    },[itembyID.length])


    if(itembyID.length === 0){
        return(<></>);
    }
    return (
        <>
            <Container>
                <Card style={{ alignItems: "center" }} className="my-4">
                    <Card.Img variant="top" style={{ width: "175%", height: "auto", "border-radius": "25px" }} src={`https://campus-olx-iitg.onrender.com/${itembyID[0].img_address}`} />

                </Card>
                <div className='row my-4'>
                    <Card style={{ width: "75%", height: "auto", "border-radius": "25px" }} className="my-4">
                        <Card.Header as="h3">{itembyID[0].category}</Card.Header>

                        <Card.Body>
                            <Card.Title><h3>{itembyID[0].brand}</h3></Card.Title>
                            <Card.Text>
                                {itembyID[0].description}
                            </Card.Text>
                            <Card.Text>
                                Original Buying Date:- {itembyID[0].originalBuyingDate}
                            </Card.Text>
                            <Card.Text>
                                Posted on:- {itembyID[0].creation_date}
                            </Card.Text>
                            <Button variant="primary">Rs {itembyID[0].price}</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "75%", height: "auto", "border-radius": "25px" }}>
                        <Card.Header as="h5">Seller Details</Card.Header>

                        <Card.Body>
                            <Card.Title><h2>{itembyID[0].ownerDetails.owner}</h2></Card.Title>
                            <Card.Text>
                                Email: {itembyID[0].ownerDetails.ownerEmail}
                            </Card.Text>
                            <Card.Text>
                                Contact :- {itembyID[0].ownerDetails.contact}
                            </Card.Text>
                            <Card.Text>
                                Hostel :- {itembyID[0].ownerDetails.hostel}
                            </Card.Text>


                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default AdminItemDesc
