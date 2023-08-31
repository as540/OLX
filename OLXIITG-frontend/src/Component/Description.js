import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import {useParams} from 'react-router-dom'
import { Card,Button,Container} from 'react-bootstrap'
import ItemContext from '../Context/item/ItemContext'
import './description.css'
export default function Description(props) {
    const {itembyID} = props;
    // console.log(item.ownerDetails)
  return (
    <>
    <Container>
    <Card style={{alignItems:"center"}} className="my-3">
  <Card.Img variant="top" style={{width:"175%",height:"auto","border-radius": "25px"}} src={`https://campus-olx-iitg.onrender.com/${itembyID[0].img_address}`} />

    </Card>
    <div className='row my-4'>
    <Card style={{width:"75%",height:"auto","border-radius": "25px"}}>
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
    <Card style={{width:"75%",height:"auto","border-radius": "25px"}}>
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
