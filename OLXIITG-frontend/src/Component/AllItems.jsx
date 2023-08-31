import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminItemCard from "./AdminItemCard"

const AllItems = (props) => {

    const [items, setItems] = useState([]);
    

    const fetchItem = async (id) => {
        const url = `https://campus-olx-iitg.onrender.com/admin/allitems`
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
        setItems(json);
    }

    


    


    useEffect(() => {
        fetchItem();
    }, [items.length])


    if (localStorage.getItem('admin-token')) {
        if (items.length !== 0) {
            return (

                <div className='container'>
                    <div className='row my-4'>
                        {items.map((item, i) => {
                            return (
                                <AdminItemCard key={i} item={item} showAlert={props.showAlert}/>
                            );
                        })}
                    </div>
                </div>

            )
        } else {
            return (<></>);
        }
    } else {
        return (<div className="container-xl mx-10" ><h1>Not Authorized</h1></div>)
    }
}

export default AllItems
