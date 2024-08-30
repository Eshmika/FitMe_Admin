import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';

import StudentLogin from './screen/Auth/Login';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path="/" element={ <StudentLogin /> } />  

    </Routes>    
    </>
  );
}

export default App;
