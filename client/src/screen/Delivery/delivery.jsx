import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nev from '../Nav';

import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';

function Delivery() {  // Renamed to uppercase 'Delivery'
  const [deliveryData, setDeliveryData] = useState([]);  // Renamed 'Delivery' state variable to avoid confusion
  const [searchDelivery, setSearchDelivery] = useState('');

  // Fetch delivery details from Firestore
  const getDeliveryDetails = async () => {
    const response = await getDocs(collection(db, "Delivery")); 
    const deliveryList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDeliveryData(deliveryList);  // Update state
  };

  useEffect(() => {
    getDeliveryDetails();
  }, []);

  // Delete a delivery item
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Delivery", id));
      Swal.fire(
        'Delivery Deleted!',
        'The delivery has been successfully deleted.',
        'success'
      ).then(() => {
        getDeliveryDetails();  // Refresh the delivery list
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

  return (
    <div>
      <Nev />
      <div className='profilecontent'>
        <h1>Store Management</h1>
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

        <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
          <table className='searchtablemainmanager'>
            <tr className='searchtablemainmanagerheader'>
              <th>Name</th>
              <th>Item</th>
              <th>Street</th>
              <th>Lane</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Province</th>
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
                <td className='searchtabledata'>{delivery.street}</td>
                <td className='searchtabledata'>{delivery.lane}</td>
                <td className='searchtabledata'>{delivery.city}</td>
                <td className='searchtabledata'>{delivery.postalCode}</td>
                <td className='searchtabledata'>{delivery.province}</td>
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
      </div>
    </div>
  );
}

export default Delivery;  // Make sure the export matches the component name
