import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';

import Login from './screen/Auth/Login';
import Register from './screen/Auth/Register';
import Home from './screen/home';
import Insertstore from './screen/Inventory/addstore';
import Invendashboad from './screen/Inventory/invendashboad';
import UpdateStore from './screen/Inventory/updatestore';
import PayView from './screen/Pay/StViewOnline';
import Invoice from './screen/Pay/invoice';
import FeedbackView from './screen/Feedback/viewFeedback';
import DeliveryView from './screen/Delivery/delivery'
import { auth } from './screen/Auth/firebase';
import { useEffect, useState } from 'react';



axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const {user, setUser}= useState();
  useEffect(() => {
    auth.onAuthStateChanged((admin) => {
        setUser(admin);
    })
  })
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path="/" element={ <Login /> } />  
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/insertstore" element={ <Insertstore /> } /> 
      <Route path="/invendashboad" element={ <Invendashboad /> } /> 
      <Route path="/updatestore/:id" element={ <UpdateStore /> } />
      <Route path="/payview" element={ <PayView /> } />
      <Route path="/invoice" element={ <Invoice /> } />
      <Route path="/feedbackView" element={ <FeedbackView /> } />
      <Route path="/delivery" element={ <DeliveryView /> } />



         

    </Routes>    
    </>
  );
}

export default App;
