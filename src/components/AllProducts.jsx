import axios from 'axios';
import React, {useEffect} from 'react';
import {BrowserRouter, Link, Routes, Route, useNavigate} from 'react-router-dom'

const AllProducts = (props) => {
  //here we set up a constant that can store the api data
  const {productList, setProductList} = props; //set as empty array since our api reponse will contain a list of key pairs

  // here we set up an axios api request to GET all product details
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((response) => {
            console.log('AXIOS API RESPONSE: ',response);
            //.data.users are the object names within the array
            //data is a standard axios object
            //users is specific to what the controller in our server shows as a json response
            //res.json({ users: allDaUsers })
            setProductList(response.data.products);
            })
            .catch((err) => {
            console.log('AXIOS API ERROR: ',err);
            })
    },[])
    const deleteHandler = (id) => {
        console.log(id)
        
        // using patch instead of put because from a security perspective, it feels safer (in my opinion)
        // is this best practice??
        axios.delete(`http://localhost:8000/api/deleteProduct/${id}`)
            .then((response) => {
                console.log('AXIOS API DELETE RESPONSE: ',response);
                const updatedProductList = productList.filter((product) => product._id !== id);
                setProductList(updatedProductList);
            })
            .catch((err) => {
                console.log('AXIOS API DELETE ERROR: ',err);
            })

    }
    // return doesn't like being without atleast 1 html element
    return(
        <div>
            <h2>All Products:</h2>
        {
          //we take the product that was initially saved using useState
          //and we map it - map allows us to grab an array and iterate through using arrow functions
            productList.map((product) => (
            //IMPORTANT NOTE: we can only have one parent html element
            //when using map (maybe it's an arrow function thing or a return thing?)
            //-----
            //REMINDER: use ._id when working with MongoDB
            //simply because that's what the ID field is called
            
            <div key={product._id}>
                <p>--------------------------------------</p>
                {/* link can only be used within the built-in component BrowerRouter */}
                {/* Except here because this component is being imported to App.js which already has a router */}
                <Link to={'/products/'+product._id}><p>{product.title}</p></Link>
                <Link className="btn btn-primary" to={'/edit/'+product._id}>Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
            </div>
            ))
        }
        </div>
    )
}

export default AllProducts;