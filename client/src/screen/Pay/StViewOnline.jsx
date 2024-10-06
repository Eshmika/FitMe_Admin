import React, { useEffect, useState } from 'react';
import './stviewonline.css';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import jsPDF from 'jspdf';  
import 'jspdf-autotable';

function StViewOnline() {
  const [payments, setPayments] = useState([]);
  const navigator = useNavigate();

  const getPaymentdetails = async () => {
    const response = await getDocs(collection(db, "payment")); 
    const paymentList = response.docs.map(doc =>({ id: doc.id, ...doc.data() }));
    setPayments(paymentList);
  }  

  useEffect(() => {
    getPaymentdetails();
  }, []);


  const handleDelete = async (id) => {
    try {
        await deleteDoc(doc(db, "payment", id));        
    } catch (error) {
        console.error(error);        
    }
  }  


  const handleSubmit = (id) => {
    Swal.fire({
      title: "Delete Payment",
      text: "Are you sure you want to delete the Payment Record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Call handleDelete function with payment ID
        Swal.fire({
          title: "Payment is Deleted",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Changes are Canceled",
          icon: "error",
        });
      }
    });
  };

  const handleClick2 = () => {
    toast.loading('Payment is Deleting...', {
      style: {
        background: 'black',
        color: '#ffffff',
        borderRadius: '10px',
        border: '2px solid #ffffff',
      },
    });

    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Payment is Deleted!', {
          style: {
            background: '#28a745',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #ffffff',
          },
          duration: 1000,
          iconTheme: {
            primary: '#ffffff',
            secondary: '#28a745',
          },
        });
        setTimeout(() => {
          navigator('/invendashboad');
        }, 2500);
      }, 2500);
    }, 2800);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Username", "Payment Type", "Card Holder Name", "Card Number", "Expire Date", "Security Code", "Date", "Item Name", "Total Price"];
    const tableRows = [];
  
    // Calculate payment counts for card and cash payments
    const paymentCounts = {
      card: payments.filter(payment => payment.paymentType === 'Card').length,
      cash: payments.filter(payment => payment.paymentType === 'cash').length,
    };
  
    // Gather payment data
    payments.forEach(payment => {
      const paymentData = [
        payment.username,
        payment.paymentType,
        payment.cardHolderName,
        payment.cardNumber,
        payment.expireDate,
        payment.ccv,
        payment.date,
        payment.itemname,
        payment.totalprice
      ];
      tableRows.push(paymentData);
    });
  
    // Set the title at the top of the document
    doc.setFontSize(16);
    doc.text("FitMe Virtual Dressing Room\nPayments Report", doc.internal.pageSize.getWidth() / 2, 16, { align: 'center' });
  
    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25, // Starts the table below the title
    });
  
    // Add payment statistics below the table
    doc.setFontSize(12);
    const statisticsStartY = doc.autoTable.previous.finalY + 10; // Position after the table
    doc.text(`Total Card Payments: ${paymentCounts.card}`, 14, statisticsStartY);
    doc.text(`Total Cash Payments: ${paymentCounts.cash}`, 14, statisticsStartY + 10);
    
    // Save the PDF
    doc.save('payment_records.pdf');
  };
  
  return (
    <div>
      <Nev/>
      <Toaster />
      <div className='bodyvo'>
        <h1 className='h1vo'><br />Payments</h1>
        <button type="submit" name="online" className="buttonvo1">Online</button> <br />
        <button className="buttonvo2" onClick={generatePDF}>Generate the Report</button>
        {/* <Link to={'/viewbank'} >
          <button type="submit" name="bank" className="buttonvo2">Bank</button>
        </Link>
        <br />
        <Link to={'/viewcash'} >
          <button type="submit" name="cash" className="buttonvo3">Cash</button>
        </Link> */}
        <br />
        <div className="tbl-headervo">
          <table className='tablevo'>
            <thead>
              <tr>
                <th className='thvo'>Username</th>
                <th className='thvo'>Payment Type</th>
                <th className='thvo'>Card Holder Name</th>                
                <th className='thvo'>Card Number</th>
                <th className='thvo'>Expire Date</th>
                <th className='thvo'>Security Code</th>
                <th className='thvo'>Date</th>
                <th className='thvo'>Item Name</th>                
                <th className='thvo'>Total Price</th>                
                {/* <th className='thvo'>Status</th> */}
                {/* <th className='thvo'>Action</th> */}
                <th className='thvo'></th>
                <th className='thvo'></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvo">
          <table className='tablevo'>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className='tdvo'>{payment.username}</td>
                  <td className='tdvo'>{payment.paymentType}</td>
                  <td className='tdvo'>{payment.cardHolderName}</td>                  
                  <td className='tdvo'>{payment.cardNumber}</td>
                  <td className='tdvo4'>{payment.expireDate}</td>
                  <td className='tdvo5'>{payment.ccv}</td>
                  <td className='tdvo'>{payment.date}</td>
                  <td className='tdvo'>{payment.itemname}</td>                 
                  <td className='tdvo'>{payment.totalprice}</td>
                  {/* <td className='tdvo' style={{ color: payment.status === 'Approved' ? 'green' : payment.status === 'Rejected' ? 'red' : payment.status === 'Pending' ? 'blue' : 'inherit' }}>{payment.status}</td> */}
                  {/* <td className='tdvo'>
                    {payment.status !== 'Approved' && payment.status !== 'Rejected' ? (
                      <Link to={`/cancelonline/${payment._id}`} >
                        <input className="buttonvo4" type="button" name="cancel" value="Cancel" />
                      </Link>
                    ) : (
                      <input className="buttonvo7" type="button" name="cancel" value="Cancel" disabled />
                    )}
                  </td> */}
                  <td className='tdvo'>
                    <Link to={`/editonline/${payment.id}`} >
                      <input className="buttonvo5" type="button" name="edit" value="Edit" />
                    </Link>
                  </td>
                  <td className='tdvo'>
                    <input className="buttonvo6" type="button" name="delete" value="Delete" onClick={() => handleSubmit(payment.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StViewOnline;
