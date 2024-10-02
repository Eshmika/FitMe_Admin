import React, { useState, useEffect } from 'react';
import './home.css';
import Nev from './Nav';
import { auth, db } from './Auth/firebase';
import { doc, getDoc } from '@firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const navigate = useNavigate();
    const [admindetails, setAdmindetails] = useState(null);

    const getAdmindetails = async () => {
        auth.onAuthStateChanged(async (admin) => {
            if (admin) {
                const docRef = doc(db, "admin_details", admin.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAdmindetails(docSnap.data());
                } else {
                    toast.error('Admin details not found');
                }
            } else {
                toast.error('User is not logged in');
            }
        });
    };

    useEffect(() => {
        getAdmindetails();
    }, []);
    
    return (
        <div>
        <Nev/>
            <div className='profilecontent'>  
                Welcome {admindetails?.name}<br/>
                Admin Dashboard                
            </div>
        </div>
    );
}

export default Dashboard;
