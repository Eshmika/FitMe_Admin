import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Nev from './Nav';



function Dashboard() {
    
    return (
        <div>
        <Nev/>
            <div className='profilecontent'>           
                Admin Dashboard
            </div>
        </div>
    );
}

export default Dashboard;
