import React, { useContext, useState,useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import DoneIcon from '@mui/icons-material/Done';
// import DeleteIcon from '@mui/icons-material/Delete';
import ItemContext from "../Context/item/ItemContext";
import './item.css'
function Item(props) {
  const navigate = useNavigate();
  const { item,del } = props;
  const {deleteItem,likeItem}=useContext(ItemContext)
  const [isLiked,setLiked] = useState(false);
  
  const [imageUrl, setImageUrl] = useState(
    "https://campus-olx-iitg.onrender.com/" + item.img_address
  );
  const getisLiked=async ()=>{
    const url=`https://campus-olx-iitg.onrender.com/api/item/isLiked/${item._id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'auth-token':localStorage.getItem('token') // yokrn
        }
    })
    if(response.status === 200){
      setLiked(true);
    }
    else if(response.status === 403){
      setLiked(false);
    }
    
  }

  useEffect(() => {
    getisLiked();
  }, []);
  
  // console.log(imageUrl)
  const onClickLikeHandler= async()=>{
    const x = await likeItem(item._id);

    if(x == 403){
      props.showAlert("danger","Cannot Like You Own Items.",3000)
    }
    if(isLiked==true){
      setLiked(false);
    }
    else{
      setLiked(true);
    }
  }
  const onClickHandler=()=>{
    deleteItem(item._id)
    // props.deleteTheItem(item._id);
  }
  
  return (
    <div className="card my-4" style={{borderRadius: "25px",borderColor: "black",borderWidth: "2px"}}>
      <img src={imageUrl} alt="Denim Jeans" style={{width:"100%",paddingTop:"5px",borderRadius: "25px"}} />
      
      <h2 className="price my-2">Rs. {item.price}</h2>
      <p>{item.description.slice(0,100)}...</p>
      <div className="row gx-3 mb-3">
      {localStorage.getItem('admin-token') === null?<div className="col-md-6 my-2"><button style={{borderRadius: "25px",width:"75%"}}><Link to={`/description/${item._id}`} style={{color: "white"}}>Description</Link></button></div>:<div className="my-2"><button style={{ borderRadius: "25px", width: "75%" }}><Link to={`/admin/item/desc/${item._id}`} style={{ color: "white" }}>Description</Link></button></div>}
          {localStorage.getItem('admin-token') === null && <div className="col-md-6 my-2">
            {!del ? <button className="my-2" style={{borderRadius: "25px",width:"75%"}} onClick={onClickLikeHandler} variant="primary">
            {isLiked==true?"Dislike":"Like"}
          </button>:<button className="col-md-6 my-2" style={{borderRadius: "25px",width:"75%"}} onClick={onClickHandler} variant="primary">
            Delete
          </button>}      
          </div>}
      </div>
      <div className="row gx-3 mb-3">
          <div className="col-md-6">
            {props.isuser ? <button className="my-2" style={{borderRadius: "25px",width:"75%"}}  variant="primary">
            <Link to={`/update-item/${item._id}`} style={{color:"white"}}>Update</Link>
          </button>:<></>}
          </div>

          
            {props.isuser ? <div className="col-md-6 my-2"><button style={{borderRadius: "25px",width:"75%"}}><Link to={`/likedby/${item._id}`} style={{color: "white"}}>Liked By</Link></button></div>:<></>}
          
      </div>
    </div>
  );
}

export default Item;




// <Card
//       className="mx-2 my-2"
//       style={{ padding: "5px", width: "18rem", border: "1px black solid" }}
//     >
//       <Card.Img
//         style={{ width: "100%", maxHeight: "200px" }}
//         variant="top"
//         src={imageUrl}
//       />
//       <Card.Body style={{ marginbottom: "0px" }}>
//         <Card.Title>Rs {item.price}</Card.Title>
//         <Card.Text>{item.description}</Card.Text>
//         <Button variant="primary">
//           <Link to={`/description/${item._id}`}>Description</Link>
//         </Button>
//         {!del &&  <Button className="mx-2" onClick={onClickLikeHandler} variant="primary">
//           Like
//         </Button>}
//         {del &&  <Button className="mx-2" onClick={onClickHandler} variant="primary">
//           Delete
//         </Button>}
        
//       </Card.Body>
//     </Card>