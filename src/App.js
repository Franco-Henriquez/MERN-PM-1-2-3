import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import AllProducts from './components/AllProducts';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';

// useEffect is used to talk to the API, it's an axios component
// useState is used to store data in memory from the api to a const (constant)

// IMPORT COMPONENTS NEEDED FOR COOL STUFF
import CreateProduct from './components/CreateProduct';

function App() {
  const [product, setProduct] = useState([]);
  // The return is that will appear in our html page
  // and everything that's NOT HTML needs to be placed in {} brackets
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Welcome to Product Manager</h1>
      <Link to={'/'}> Home </Link>
      <Link to={'/products'}> Products </Link>
      
        <Routes>
          <Route path='/' element={<CreateProduct/>}/>
          <Route path='/products' element={<AllProducts productList={product} setProductList={setProduct}/>} />
          <Route path='/products/:id' element={<OneProduct/>}/>
          <Route path='/edit/:id' element={<EditProduct/>}/>
          {/* <Route path='/delete/:id' element={<DeleteProduct/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
