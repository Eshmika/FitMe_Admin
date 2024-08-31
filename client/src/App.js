import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';

import Login from './screen/Auth/Login';
import Register from './screen/Auth/Register';
import Home from './screen/home';
import Insertstore from './screen/Inventory/addstore';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path="/" element={ <Login /> } />  
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/insertstore" element={ <Insertstore /> } />     

    </Routes>    
    </>
  );
}

export default App;
