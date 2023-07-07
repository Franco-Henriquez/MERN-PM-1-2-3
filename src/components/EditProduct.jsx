import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

const EditProduct = (props) => {
    const {id} = useParams();
    console.log(id)

    const [product, setProduct] = useState({
        title:'',
        price:'',
        description:''
    })
    const changeHandler = (e) => {
        setProduct({...product, [e.target.name]:e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // using patch instead of put because from a security perspective, it feels safer (in my opinion)
        // is this best practice??
        axios.patch(`http://localhost:8000/api/editProduct/${id}`, product)
            .then((response) => {
                console.log('AXIOS API PUT RESPONSE: ',response);
            })
            .catch((err) => {
                console.log('AXIOS API PUT ERROR: ',err);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
            console.log('AXIOS API GET RESPONSE: ',response);
            setProduct(response.data.product);
            })
            .catch((err) => {
            console.log('AXIOS API GET ERROR: ',err);
            })
    },[])
    // return doesn't like being without atleast 1 html element
    return(
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text" name="title" onChange={changeHandler} value={product.title}/>
                </div>
                <div className="form-group">
                    <label>Price: </label>
                    <input type="number" name="price" onChange={changeHandler} value={product.price}/>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" name="description" onChange={changeHandler} value={product.description}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit Changes</button>
            </form>
        </div>
    )
}

export default EditProduct;