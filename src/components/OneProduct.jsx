import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom'

const OneProduct = (props) => {
    const {id} = useParams();
    //here we set up a constant that can store the api data in states
    const [product, setProduct] = useState({}); //set as empty array since our api reponse will contain a list of key pairs
    const navigate = useNavigate(); //this makes it easier to navigate without a click action with Link


  // here we set up an axios api request
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
            console.log('AXIOS API RESPONSE: ',response);
            //.data.users are the object names within the array
            //data is a standard axios object
            //users is specific to what the controller in our server shows as a json response
            //res.json({ users: allDaUsers })
            setProduct(response.data.product);
            })
            .catch((err) => {
            console.log('AXIOS API ERROR: ',err);
            })
    },[])
    const deleteHandler = () => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/deleteProduct/${id}`)
            .then((response) => {
                console.log('AXIOS API DELETE RESPONSE: ',response);
                navigate("/products");
            })
            .catch((err) => {
                console.log('AXIOS API DELETE ERROR: ',err);
            })

    }
    // return doesn't like being without atleast 1 html element
    return(
        <div>
            <h2>Product Info</h2>
            {/* <h1>Welcome to the Products Manager app</h1>
            <Link to={'/createProduct/form'}>Add a Product</Link> */}
        {
            
            <div key={product._id}>
                <p>--------------------------------------</p>
                <p>Title: {product.title}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                {/* no need to pass id as we have it set as a global const and this is a single product */}
                <Link className="btn btn-danger" onClick={deleteHandler}>Delete</Link>
            </div>
            
        }
        </div>
    )
}

export default OneProduct;