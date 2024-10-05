import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './Login.css';
// import loginimg from './photos/studentlogin.png'
// import logofull from './photos/logofull.png'
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from './firebase';

function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginAdmin = async (e) => {
    e.preventDefault();
    try{
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successfully!');
      navigate('/invendashboad');
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <main>
      <div class="mainlogin">
        <div class="loginphoto">
          {/* <img src={loginimg} alt='loginimage' class='loginimg' /> */}
        </div>
        <div class="login">
          {/* <img src={logofull} alt='loginimage' /> */}
          <p class="wel">Welcome to FitMe Admin Portal</p>
          <div class="loginmid">
            <form class="login" onSubmit={loginAdmin}>
                    <div class="username">
                    <label for="username" class="logintxt">EMAIL</label><br/>
                    <input type="email" id="email" name="email" placeholder="Enter your email" class="loginbox" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                    </div>    
                    <div class="username">
                    <label for="password" class="logintxt">PASSWORD</label><br/>
                    <input type="password" id="password" name="password" placeholder="Enter your password" class="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                    </div>   
                <a href='/studentforgetpassword'><p class="forget">Forgot Password?<br/></p></a>          
                <button type="submit" className='btnloging'>LOGIN</button>
                <a href='/register'><p class="register">Admin <b>REGISTER</b></p></a>
            </form>
          </div>  
        </div>
      </div>
      
    </main>
  )
}

export default AdminLogin
