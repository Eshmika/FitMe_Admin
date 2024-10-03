import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import jsPDF from 'jspdf';  // For PDF generation
import 'jspdf-autotable';   // Import the autoTable plugin for tables in PDF
import './delivery.css'

function Delivery() {
  const [deliveryData, setDeliveryData] = useState([]);
  const [searchDelivery, setSearchDelivery] = useState('');

  const getDeliveryDetails = async () => {
    const response = await getDocs(collection(db, "Delivery"));
    const deliveryList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDeliveryData(deliveryList);
  };

  useEffect(() => {
    getDeliveryDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Delivery", id));
      Swal.fire(
        'Delivery Deleted!',
        'The delivery has been successfully deleted.',
        'success'
      ).then(() => {
        getDeliveryDetails();
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error!',
        'An error occurred while deleting the delivery.',
        'error'
      );
    }
  };

  // Generate PDF report for "Delivered" deliveries
  const generatePDF = () => {
    const doc = new jsPDF();
    const shippedData = deliveryData.filter(delivery => delivery.deliveryStatus === 'Pending');

    doc.text('Pending Deliveries Report', 20, 10);

    const tableData = shippedData.map((delivery, index) => [
      index + 1,
      delivery.name,
      delivery.item,
      `${delivery.street}, ${delivery.lane}, ${delivery.city}, ${delivery.province}, ${delivery.postalCode}`,
      delivery.phoneNo,
      delivery.preferredDate,
      delivery.preferredTime,
      delivery.addNote,
    ]);

    doc.autoTable({
      head: [['#', 'Name', 'Item', 'Address', 'Phone', 'Date', 'Time', 'Note']],
      body: tableData,
    });

    doc.save('Pending_deliveries_report.pdf');
  };

  

     // Generate PDF report for "Pending" deliveries
  const generatePDFDelivered = () => {
    const doc = new jsPDF();
    const shippedData = deliveryData.filter(delivery => delivery.deliveryStatus === 'Pending');

    doc.text('Shipped Deliveries Report', 20, 10);

    const tableData = shippedData.map((delivery, index) => [
      index + 1,
      delivery.name,
      delivery.item,
      `${delivery.street}, ${delivery.lane}, ${delivery.city}, ${delivery.province}, ${delivery.postalCode}`,
      delivery.phoneNo,
      delivery.preferredDate,
      delivery.preferredTime,
      delivery.addNote,
    ]);

    doc.autoTable({
      head: [['#', 'Name', 'Item', 'Address', 'Phone', 'Date', 'Time', 'Note']],
      body: tableData,
    });

    doc.save('shipped_deliveries_report.pdf');
  };



  return (
    <div>
      <Nev />
      <div className='profilecontent'>
        <h1>Delivery Shcedule Management</h1>
        <table>
          <tr>
            <td className="searchbarcol">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search Delivery name..."
                className="searchbar"
                onChange={(e) => setSearchDelivery(e.target.value)}
              />
            </td>
          </tr>
        </table>

     

        <div style={{ maxHeight: '220px', overflowY: 'scroll', marginTop: '20px' }}>
          <table className='searchtablemainmanager'>
            <tr className='searchtablemainmanagerheader'>
              <th>Name</th>
              <th>Item</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Preferred Date</th>
              <th>Preferred Time</th>
              <th>Note</th>
              <th>Delivery Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {deliveryData.filter((delivery) => {
              return searchDelivery.toLowerCase() === ''
                ? delivery
                : delivery.name.toLowerCase().includes(searchDelivery.toLowerCase());
            }).map((delivery) => (
              <tr className='searchtablemainadmindata' key={delivery.id}>
                <td className='searchtabledata'>{delivery.name}</td>
                <td className='searchtabledata'>{delivery.item}</td>
                <td className='searchtabledata'>{delivery.street} ,{delivery.lane} , {delivery.city} , {delivery.province} ,{delivery.postalCode} </td>
                <td className='searchtabledata'>{delivery.phoneNo}</td>
                <td className='searchtabledata'>{delivery.preferredDate}</td>
                <td className='searchtabledata'>{delivery.preferredTime}</td>
                <td className='searchtabledata'>{delivery.addNote}</td>
                <td className='searchtabledata'>{delivery.deliveryStatus}</td>
                <td>
                  <Link to={`/updateDelivery/${delivery.id}`}>
                    <button className='btnupdate'>Update</button>
                  </Link>
                </td>
                <td>
                  <button className='btndelete' onClick={() => handleDelete(delivery.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>

          {/* Report generation buttons Pending */}
          <div style={{ marginTop: '20px' }}>
          <button onClick={generatePDF} className="btnreport">Generate Pending Items Report</button>
         
        </div>

          {/* Report generation buttons Delivered*/}
          <div style={{ marginTop: '20px' }}>
          <button onClick={generatePDFDelivered} className="btnreport">Generate Delivered Items Report</button>
        
        </div>
      </div>

       
    </div>

    
  );

  
}





export default Delivery;


