import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';


function StudentRegister() {
  const navigate = useNavigate();

  // Function to get the current year
  function getCurrentYear() {
    return new Date().getFullYear().toString().slice(-2); // Get last two digits of the current year
  }

  // Function to generate a random 6-digit number
  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 6-digit number
  }

  // Function to generate a student ID
  function generateStudentId() {
    const year = getCurrentYear(); // Get last two digits of the current year
    const randomNumber = generateRandomNumber(); // Get random 6-digit number
    return `AID${year}${randomNumber}`; // Concatenate SID, year, and random number
  }

  const [data, setData] = useState({
    name: '',
    email: '',
    username: '',    
    password: '',
    repassword: ''  ,
  });


  const registerStudent = async (e) => {
    e.preventDefault();
    try{       
      if (data.password !== data.repassword) {
        toast.error('Passwords do not match');
        return;
      }else{
        const { name, email, username, password } = data;
        await createUserWithEmailAndPassword(auth, email, password);
        const admin = auth.currentUser;
        if(admin){
          await setDoc(doc(db, "admin_details", admin.uid), {
            name: name,
            email: admin.email,
            username: username,            
          });

        }
        
        toast.success("Register Successfully!");
        navigate('/login');        
      }      
    }catch(error){
      console.log(error);
    }
  }

  return (
    <main>
      <div className="mainlogin">
        <div className="loginphoto">
        </div>
        <div className="login">
          <p className="wel">Welcome to FitMe Admin Portal</p>
          <div class="loginmid">
            <form onSubmit={registerStudent}>
              <div className="username">
                <label htmlFor="name" className="logintxt">FULL NAME</label><br/>
                <input type="text" id="name" name="name" placeholder="Enter your full name" className="loginbox" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>                        
              </div>  
              <div className="username">
                <label htmlFor="email" className="logintxt">EMAIL</label><br/>
                <input type="email" id="email" name="email" placeholder="Enter your email" className="loginbox" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
              </div>
              <div className="username">
                <label htmlFor="username" className="logintxt">USERNAME</label><br/>
                <input type="text" id="username" name="username" placeholder="Enter your username" className="loginbox" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
              </div>   
              <div className="username">
                <label htmlFor="password" className="logintxt">PASSWORD</label><br/>
                <input type="password" id="password" name="password" placeholder="Enter your password" className="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
              </div>
              <div className="username">
                <label htmlFor="repassword" className="logintxt">RE-ENTER PASSWORD</label><br/>
                <input type="password" id="repassword" name="repassword" placeholder="Enter your password again" className="loginbox" value={data.repassword} onChange={(e) => setData({...data, repassword: e.target.value})}/>
              </div>
              <br/>
              <button type="submit" className='btnloging'> SIGN UP</button>
              <a href='/'><p className="register">Already have an Account? <b>Log IN</b></p></a>
            </form>
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default StudentRegister;
