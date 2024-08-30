import React from 'react'
import Products from './components/Products'
import { Route, Routes } from 'react-router-dom';
import './index.css';  
import Product from './components/Product';

const App = () => {
  return (
<>

<Routes>
  <Route path='/' element={<Products/>}/>
  <Route path='/products/:id' element={<Product/>}/>

</Routes>

</>
  )
}

export default App
