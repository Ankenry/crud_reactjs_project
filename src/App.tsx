import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Create from './Pages/Create/Create';
import Read from './Pages/Read/Read';
// import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Update from './Pages/Update/Update';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/read/:id' element={<Read/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
