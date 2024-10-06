import React, { useCallback, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './steditonline.css';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../Auth/firebase';


function StEditOnline() {

  const {id} = useParams();  
  const[username,setUsername] = useState('');
  const[paymenttype,setPaymenttype] = useState('');
  const[cardname,setCardname] = useState('');
  const[cardnumber,setCardnumber] = useState('');
  const[expiredate,setExpiredate] = useState(''); 
  const[securitycode,setSecuritycode] = useState('');
  const[date,setDate] = useState('');
  const[itemname,setItemname] = useState('');
  const[totalprice,setTotalprice] = useState('');
   
  const navigator = useNavigate();

  const getPaymentdetails = useCallback(async () => {
    try {
        const response = await getDoc(doc(db, "payment", id));
        if (response.exists()) {
            setUsername(response.data().username);
            setPaymenttype(response.data().paymentType);
            setCardname(response.data().cardHolderName);
            setCardnumber(response.data().cardNumber);
            setSecuritycode(response.data().ccv);
            setExpiredate(response.data().expireDate);
            setDate(response.data().date);
            setItemname(response.data().itemname);
            setTotalprice(response.data().totalprice);
        } else {
            console.log("No such data found!");
        }
      } catch (error) {
          console.error(error);
      }
  }, [id]);

  useEffect(() => {
      getPaymentdetails();
  }, [id, getPaymentdetails]);

  const update = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "payment", id), {
        username: username,
        paymentType: paymenttype,       
        cardHolderName: cardname,
        cardNumber: cardnumber,
        ccv: securitycode,
        expireDate: expiredate,
        date: date,
        itemname: itemname,
        totalprice: totalprice,        
      })
    } catch (error) {
      console.error(error);      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Update Payment",
      text: "Are you sure you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        update(e); // Call submit function if result is confirmed
        Swal.fire({
          title: "Changes are Updated",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Changes are Canceled",
          icon: "error",
        });
        // Call submit function even if result is canceled
      }
    });
  };
  
  

  const handleClick2 = () => {
    toast.loading('Changes are saving...', {
      style: {
        background: 'black', // Customize the background color
        color: '#ffffff', // Customize the text color
        borderRadius: '10px', // Add border radius
        border: '2px solid #ffffff', // Add border
      },
    });
  
    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Payment is Updated!', {
          style: {
            background: '#28a745', // Green background color
            color: '#ffffff', // White text color
            borderRadius: '10px', // Rounded corners
            border: '2px solid #ffffff', // White border
          },
          duration: 2000, // Display duration in milliseconds (3 seconds)
          iconTheme: {
            primary: '#ffffff', // White icon color
            secondary: '#28a745', // Green icon color
          },
        });
        setTimeout(() => {
          navigator('/payview');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  const handleCancel = () => {
    navigator('/payview');
  }
  
  return (
    <div>
     <Nev/>
       <div>
       <Toaster/>
      <div className="bodyeon">
        
            <h1 className="eonh1"><br></br>Edit Payment</h1>
            <div className="containereon">
            <form className="payeon" 
            onSubmit={handleSubmit}
            >

            <h2 className="eonh2"><br></br>Payment Details</h2><br/>

              <label htmlFor="an" className="labeleon2">Username</label>
              <input type="text" name="uname" placeholder="Enter Username"  required className="texteon2" value={username} onChange={(e)=>setUsername(e.target.value)}/> <br /><br />

              <label htmlFor="an" className="labeleon2">Payment Type</label>
              <input type="text" name="ptype" placeholder="Enter Payment Type" required className="texteon2" value={paymenttype} onChange={(e)=>setPaymenttype(e.target.value)}/> <br /><br />

              {/* <label htmlFor="an" className="labeleon2">Card Holder Name</label>
              <input type="text" name="cname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="texteon2" value={cardname} onChange={(e)=>setCardname(e.target.value)}/> <br /><br />

              <label htmlFor="an" className="labeleon2">Card Number</label><br />
              <input type="text" name="cnum" placeholder="xxxxxxxxxx" pattern="^\d{16}$" required className="texteon3" value={cardnumber} onChange={(e)=>setCardnumber(e.target.value)} /> <br /><br />

              <label htmlFor="tda" className="labeleon2">Expire Date</label><br/>              
              <input type="text" name="exdate" placeholder="(MM/YY)" pattern="(0[1-9]|1[0-2])\/\d{2}" required className="texteon3" value={expiredate} onChange={(e)=>setExpiredate(e.target.value)}/> <br /><br />

              <label htmlFor="cno" className="labeleon2">Security Code</label><br/>
              <input type="text" name="scode" placeholder="***" pattern="^\d{3}$" required className="texteon3" value={securitycode} onChange={(e)=>setSecuritycode(e.target.value)} /><br /><br /> */}

              <label htmlFor="cno" className="labeleon2">Date</label><br/>
              <input type="text" name="date" required className="texteon3" value={date} onChange={(e)=>setDate(e.target.value)} /><br /><br />

              <label htmlFor="cno" className="labeleon2">Item Name</label><br/>
              <input type="text" name="iname" placeholder="Enter Item Name" required className="texteon3" value={itemname} onChange={(e)=>setItemname(e.target.value)} /><br /><br />

              <label htmlFor="cno" className="labeleon2">Total Price</label><br/>
              <input type="text" name="tprice" placeholder="Rs.0.00" required className="texteon3" value={totalprice} onChange={(e)=>setTotalprice(e.target.value)} /><br /><br />


              <div className="containereon4"> 
                  <button type="submit" name="submit" className="buttoneon3">Save</button>
                  <button type="submit" name="submit" className="buttoneon4" 
                  onClick={handleCancel}
                  >Cancel</button>
              </div>                    
      </form>
                
            </div>
        </div>
    </div>


    </div>
  )
}

export default StEditOnline
