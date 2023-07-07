import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

const DeleteProduct = (props) => {
    const {id} = useParams();
    console.log(id)
    const [product, setProduct] = useState({}); //set as empty array since our api reponse will contain a list of key pairs

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
            console.log('AXIOS API RESPONSE: ',response);
            setProduct(response.data.product);
            })
            .catch((err) => {
            console.log('AXIOS API ERROR: ',err);
            })
    },[])
    return(
        <div>
            <h2>Product Info</h2>
            <div key={product._id}>
                <p>--------------------------------------</p>
                <p>Title: {product.title}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
            </div>
        </div>
    )
}

export default DeleteProduct;