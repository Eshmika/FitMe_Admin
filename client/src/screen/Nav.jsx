import React from 'react';
import '../screen/navbar.css'
// import profile from './navbar_images/Profile.png'
// import wallet from './navbar_images/Wallet.png'
// import logout from './navbar_images/Logout.png'
import axios from 'axios'

function Nav() {

    const handleDeletetoken = () => {
        axios.get('/logout').then(res => {
            console.log(res);
            window.location.href = '/';
        }).catch(err => console.log(err));
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
                        <a href='/test'>Order</a>
                    </li>
                    <li>
                        {/* <img alt='inventory' className='navimage'/> */}
                        <a href='/payview'>Payment</a>
                    </li>
                   
                    <br/><br/><br/><br/>
                    <li className='logoutsq'>
                        {/* <img  alt='logout' className='navimage'/> */}
                        <div className='logoutbtn' onClick={handleDeletetoken}><div className='logouttxt'>Logout</div></div>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default Nav
