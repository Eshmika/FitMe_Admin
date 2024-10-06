import { Routes, Route, Navigate } from 'react-router-dom';

import {Toaster} from 'react-hot-toast';

import Login from './screen/Auth/Login';
import Register from './screen/Auth/Register';
import Home from './screen/home';
import Insertstore from './screen/Inventory/addstore';
import Invendashboad from './screen/Inventory/invendashboad';
import UpdateStore from './screen/Inventory/updatestore';
import PayView from './screen/Pay/StViewOnline';
import EditOnline from './screen/Pay/StEditOnline';
import Invoice from './screen/Pay/invoice';
// import FeedbackView from './screen/Feedback/viewFeedback';
import DeliveryView from './screen/Delivery/delivery';
import UpdateDelivery from './screen/Delivery/UpdateDelivery'

import AddQuestions from './screen/Feedback/AddQuestions';
import ViewQuestions from './screen/Feedback/ViewQuestions';
import UpdateQuestions from './screen/Feedback/UpdateQuestions';
import ViewFeedback from './screen/Feedback/ViewFeedback';
import CusInquries from './screen/Feedback/CusInquiries';
import SolveCusInquries from './screen/Feedback/SolveCusInquiries';

import { auth } from './screen/Auth/firebase';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser]= useState();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
     setUser(user);
    });
  });
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path="/" element={ user ? <Navigate to="/invendashboad"/> : <Login /> } />  
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/insertstore" element={ <Insertstore /> } /> 
      <Route path="/invendashboad" element={ <Invendashboad /> } /> 
      <Route path="/updatestore/:id" element={ <UpdateStore /> } />
      <Route path="/payview" element={ <PayView /> } />
      <Route path= '/editonline/:id' element = {<EditOnline/>} />
      <Route path="/invoice" element={ <Invoice /> } />
      {/* <Route path="/feedbackView" element={ <FeedbackView /> } /> */}
      <Route path="/delivery" element={ <DeliveryView /> } />
      <Route path="/updateDelivery/:id" element={ <UpdateDelivery /> } />
      <Route path="/viewRecord" element={ <ViewQuestions/> } />
      <Route path="/addRecord" element={ <AddQuestions/> } />
      <Route path="/updateRecord/:id" element={ <UpdateQuestions/> } />
      <Route path="/viewFeedback" element={ <ViewFeedback/> } />
      <Route path="/cusInquries" element={ <CusInquries/> } />
      <Route path="/solveCusInquries/:id" element={ <SolveCusInquries/> } />
    </Routes>    
    </>
  );
}

export default App;
