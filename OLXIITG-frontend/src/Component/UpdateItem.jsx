import React, { useState, useEffect } from 'react';
import { Form, Container, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams,Link } from 'react-router-dom';
import axios from 'axios';


const UpdateItem = (props) => {
    const [image, setImage] = useState(null);
    function reverse(str, start, end) {
        // Temporary variable
        // to store character
        let temp;


        while (start <= end) {
            // Swapping the first
            // and last character
            temp = str[start];
            str[start] = str[end];
            str[end] = temp;
            start++;
            end--;
        }
    }
    // Function to reverse words
    function reverseWords(s) {
        // Reversing individual words as
        // explained in the first step
        s = s.split("");
        let start = 0;
        for (let end = 0; end < s.length; end++) {
            // If we see a space, we
            // reverse the previous
            // word (word between
            // the indexes start and end-1
            // i.e., s[start..end-1]
            if (s[end] == ' ') {
                reverse(s, start, end);
                start = end + 1;
            }
        }
        // Reverse the last word
        reverse(s, start, s.length - 1);

        // Reverse the entire String
        reverse(s, 0, s.length - 1);
        return s.join("");
    }

    const params = useParams();
    const id = params.id;

    const [count,setCount] = useState(0);



    const [item, setItem] = useState([]);

    const [itemData, setItemData] = useState({ category: '', brand: '', description: '', price: '', buyingdate: '' })

    const fetchDetails = async () => {
        const url = `https://campus-olx-iitg.onrender.com/api/item/getItem/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token') // yokrn
            }
        })
        const json = await response.json()
        setItem(json)
    }



    const onChangeHandler = (e) => {
        e.preventDefault()
        setItemData({ ...itemData, [e.target.name]: e.target.value })
    }

    let formData = new FormData();
    const submitHandler = (e) => {
        e.preventDefault()
        formData.append('brand', itemData.brand);
        formData.append('description', itemData.description);
        formData.append('price', parseInt(itemData.price));
        formData.append('buyingDate', itemData.buyingdate);
        formData.append('Image', image);
        axios({
            method: "patch",
            url: `https://campus-olx-iitg.onrender.com/api/item/editItem/${id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data", 'auth-token': localStorage.getItem('token') },
        })
            .then(function (response) {
                //handle success
                console.log(response.status);
                if(response.status === 200){
                    props.showAlert("success","Item Updated Successfully",3000);
                    setCount(count+1);
                }
                else{
                    props.showAlert("danger","Error",3000);
                }

            })
            .catch(function (response) {
                //handle error
                console.log(response.status);
            });
        
        setImage(null)
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])
        // console.log(e.target.files);
    }


    useEffect(() => {
        fetchDetails();
        if (item.length > 0) {
            const x = reverseWords(item[0].originalBuyingDate);
            setItemData({ category: item[0].category, brand: item[0].brand, description: item[0].description, price: item[0].price, buyingdate: x })
        }
    }, [item.length,count]);


    if (item.length === 0) {
        return <></>
    }

    return (
        <Container >
            <div class="container-xl px-4 mt-4" >
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mb-4 mb-xl-0" style={{ borderRadius: "25px", borderColor: "black", borderWidth: "2px" }}>
                            <div class="card-header">Item Image</div>
                            <div class="card-body text-center">
                                <img class="img-account-profile mb-2" style={{ width: "auto", height: "210px", borderRadius: "25px", borderColor: "black", borderWidth: "2px", marginRight: "10px"}} src={`https://campus-olx-iitg.onrender.com/${item[0].img_address}`} alt="" />
                                <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                {/* <button class="btn btn-primary" type="button">Upload new image</button> */}
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8" >
                        <div class="card mb-4" style={{ borderRadius: "25px", borderColor: "black", borderWidth: "2px" }}>
                            <div class="card-header">Item Details</div>
                            <div class="card-body">
                                <form>
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
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
                                        <div class="col-md-6">
                                            <Form.Group className="mb-3" required>
                                                <Form.Label>Brand</Form.Label>
                                                <Form.Control type="text" name='brand' value={itemData.brand} placeholder="brand" onChange={onChangeHandler} />
                                            </Form.Group>
                                        </div>

                                    </div>

                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <Form.Group className="mb-3" required>
                                                <Form.Label>Original Buying Data</Form.Label>
                                                <Form.Control type="date" name='buyingdate' value={itemData.buyingdate} placeholder="date" onChange={onChangeHandler} />
                                            </Form.Group>
                                        </div>

                                        <div class="col-md-6">
                                            <Form.Group className="mb-3" required>
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="text" name='price' value={itemData.price} placeholder="Price" onChange={onChangeHandler} />
                                            </Form.Group>
                                        </div>

                                    </div>

                                    <div class="row gx-3 mb-3">
                                        <Form.Group className="mb-3" required>
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" name='image' placeholder="Image" onChange={imageHandler}/>
                                        </Form.Group>
                                    </div>


                                    <div class="row gx-3 mb-3">


                                        <FloatingLabel label="Description">
                                            <Form.Control
                                                as="textarea"
                                                style={{ height: '250px' }}
                                                name='description' value={itemData.description} placeholder="desctiption" onChange={onChangeHandler}
                                            />
                                        </FloatingLabel>

                                    </div>

                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <Button variant="primary" type="submit" style={{ borderRadius: "25px" }} onClick={submitHandler}>
                                                Submit
                                            </Button>
                                        </div>
                                        <div class="col-md-6">
                                            <Button variant="primary" type="submit" style={{ borderRadius: "25px" }}>
                                                <Link to="/allitemsposted" style={{color:"white"}}>Cancel</Link>
                                            </Button>
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

export default UpdateItem;
