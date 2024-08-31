import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './commoncomponents/navbar/navbar';
import Homescreen from './pages/homescreen/homescreen';
import Footer from './commoncomponents/footer/footer';
import Billing from './commoncomponents/invoice/Billing';
import axios from 'axios';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/billing' element={<Billing/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
