import React, {useState} from 'react';
import axios from 'axios';

const CreateProduct = (props) => {
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
        axios.post('http://localhost:8000/api/newProduct', product)
            .then((response) => {
                console.log('AXIOS API RESPONSE: ',response);
            })
            .catch((err) => {
                console.log('AXIOS API ERROR: ',err);
            })
    }
    // return doesn't like being without atleast 1 html element
    return(
        <div>
            <h2>Add a Product</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text" name="title" onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <label>Price: </label>
                    <input type="number" name="price" onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" name="description" onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default CreateProduct;