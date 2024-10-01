import React from 'react';
import '../screen/navbar.css'
// import profile from './navbar_images/Profile.png'
// import wallet from './navbar_images/Wallet.png'
// import logout from './navbar_images/Logout.png'
import { auth } from './Auth/firebase';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Nav() {

    async function logout(){
        try{
            await auth.signOut();
            toast.success('Logout Successfully!');
            Navigate('/');
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    } 


  return (
    <div>
       <div className='sidenavbar'>                
                <ul className='sidenavbarul'>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/home'>Dashboard</a>
                    </li>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/invendashboad'>Store Management</a>
                    </li>
                    <li>
                        {/* <img  alt='order' className='navimage'/> */}
                        <a href='/invoice'>Invoice</a>
                    </li>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/payview'>Payment</a>
                    </li>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/feedbackView'>Feedback</a>
                    </li>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/delivery'>Delivery Schedule</a>
                    </li>
                   
                    <br/><br/><br/><br/>
                    <li className='logoutsq'>
                        {/* <img  alt='logout' className='navimage'/> */}
                        <div className='logoutbtn' onClick={logout}><div className='logouttxt'>Logout</div></div>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default Nav
