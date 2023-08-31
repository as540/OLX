import React, { useState } from "react";
import axios from 'axios'
import { Card, Form, Button, Container, FloatingLabel } from "react-bootstrap";
export default function NewItem() {
  const [itemData, setItemData] = useState({ category: '', brand: '', description: '', price: '', buyingdate: '' })
  const [image, setImage] = useState(null);
  let formData = new FormData();
  const submitHandler = (e) => {
    e.preventDefault()
    formData.append('brand', itemData.brand);
    formData.append('description', itemData.description);
    formData.append('price', parseInt(itemData.price));
    formData.append('buyingDate', itemData.buyingdate);
    formData.append('Image', image);
    axios({
      method: "post",
      url: `https://campus-olx-iitg.onrender.com/api/item/newItem/${itemData.category}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", 'auth-token': localStorage.getItem('token') },
    })
      .then(function (response) {
        //handle success
        console.log(response.status);

      })
      .catch(function (response) {
        //handle error
        console.log(response.status);
      });
    setItemData({ category: '', brand: '', description: '', price: '', buyingdate: '' })
    setImage(null)
  }
  const onChangeHandler = (e) => {
    e.preventDefault()
    setItemData({ ...itemData, [e.target.name]: e.target.value })
  }
  const imageHandler = (e) => {
    setImage(e.target.files[0])
    // console.log(e.target.files);
  }
  return (
    <Container style={{ marginLeft:"300px"}}>
      <div className="container-xl px-4 mt-4">
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">New Post</div>
            <div className="card-body">
              <form>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select name='category' value={itemData.category} onChange={onChangeHandler}>
                        <option>Choose</option>
                        <option>Automobiles</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Sports</option>
                        <option>Musics</option>
                        <option>Houses</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" required>
                      <Form.Label>Brand</Form.Label>
                      <Form.Control type="text" name='brand' value={itemData.brand} placeholder="brand" onChange={onChangeHandler} />
                    </Form.Group>
                  </div>

                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <Form.Group className="mb-3" required>
                      <Form.Label>Original Buying Data</Form.Label>
                      <Form.Control type="date" name='buyingdate' value={itemData.buyingdate} placeholder="date" onChange={onChangeHandler} />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3" required>
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="text" name='price' value={itemData.price} placeholder="Price" onChange={onChangeHandler} />
                    </Form.Group>
                  </div>

                </div>


                <div className="row gx-3 mb-3">


                  <FloatingLabel controlId="floatingTextarea2" label="Description">
                    <Form.Control
                      as="textarea"
                      style={{ height: '100px' }}
                      name='description' value={itemData.description} placeholder="desctiption" onChange={onChangeHandler}
                    />
                  </FloatingLabel>

                  
                </div>


                <div className="row gx-3 mb-3">
                  <Form.Group className="mb-3" required>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name='image' onChange={imageHandler} placeholder="date" />
                  </Form.Group>
                </div>
                <Button variant="primary" type="submit" onClick={submitHandler}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container >
  );
}







{/* 
      <Form onSubmit={submitHandler}>
        {/* <Form.Group className="mb-3" required>
          <Form.Label>Category </Form.Label>
          <Form.Control type="text" placeholder="category" value={itemData.category} name='category' onChange={onChangeHandler}/>
        </Form.Group> */}
//   <Form.Group className="mb-3">
//     <Form.Label>Category</Form.Label>
//     <Form.Select name='category' value={itemData.category} onChange={onChangeHandler}>
//       <option>Choose</option>
//       <option>Automobiles</option>
//       <option>Electronics</option>
//       <option>Books</option>
//       <option>Sports</option>
//       <option>Musics</option>
//       <option>Houses</option>
//     </Form.Select>
//   </Form.Group>
//   <Form.Group className="mb-3" required>
//     <Form.Label>Brand</Form.Label>
//     <Form.Control type="text" name='brand' value={itemData.brand} placeholder="brand" onChange={onChangeHandler}/>
//   </Form.Group>
//   <Form.Group className="mb-3" required>
//     <Form.Label>Description</Form.Label>
//     <Form.Control type="text" name='description' value={itemData.description} placeholder="desctiption" onChange={onChangeHandler}/>
//   </Form.Group>
//   <Form.Group className="mb-3" required>
//     <Form.Label>Price</Form.Label>
//     <Form.Control type="number" name='price' value={itemData.price} placeholder="price in Rs" onChange={onChangeHandler}/>
//   </Form.Group>
//   <Form.Group className="mb-3" required>
//     <Form.Label>Original Buying Data</Form.Label>
//     <Form.Control type="date" name='buyingdate' value={itemData.buyingdate} placeholder="date" onChange={onChangeHandler}/>
//   </Form.Group>
//   <Form.Group className="mb-3" required>
//     <Form.Label>Image</Form.Label>
//     <Form.Control type="file" name='image' onChange={imageHandler} placeholder="date" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form >
{/* <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card> */}
    // </div > * /}