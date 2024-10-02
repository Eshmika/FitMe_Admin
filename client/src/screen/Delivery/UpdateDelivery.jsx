import React, { useCallback, useEffect, useState } from 'react'
// import './Style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nev from '../Nav';
import Swal from 'sweetalert2';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../Auth/firebase';

function UpdateDelivery() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [item, setItem] = useState('');
    const [street, setStreet] = useState('');
    const [lane, setLane] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setCode] = useState('');
    const [province, setProvince] = useState('');
    const [phoneNo, setPhone] = useState('');
    const [preferredDate, setDate] = useState('');
    const [preferredTime, setTime] = useState('');
    const [addNote, setNote] = useState('');
    const [deliveryStatus, setStatus] = useState(''); 

    const { id } = useParams();  

    const getDeliveryDetails = useCallback(async () => {
        try {
            const response = await getDoc(doc(db, "Delivery", id));
            if (response.exists()) {
                setName(response.data().name);
                setItem(response.data().item);
                setStreet(response.data().street);
                setLane(response.data().lane);
                setCity(response.data().city);
                setCode(response.data().postalCode);
                setProvince(response.data().province);
                setPhone(response.data().phoneNo);
                setDate(response.data().preferredDate);
                setTime(response.data().preferredTime);
                setNote(response.data().addNote);
                setStatus(response.data().deliveryStatus);
            } else {
                console.log("No such data found!");
            }
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        getDeliveryDetails();
    }, [id, getDeliveryDetails]);



    const updateDelivery = async (e) => {
        e.preventDefault(); 
       try {
            await updateDoc(doc(db, "Delivery", id),{
                name:name,
                item:item,
                street:street,
                lane:lane,
                city:city,
                postalCode:postalCode,
                province:province,
                phoneNo:phoneNo,
                preferredDate:preferredDate,
                preferredTime:preferredTime,
                addNote:addNote,
                deliveryStatus:deliveryStatus
               
            });
            Swal.fire(
                'Delivery Updated!',
                'The Delivery has been successfully updated.',
                'success'
            ).then(() => {
                navigate('/delivery');
            });                       
        
       } catch (error) {
           console.error(error);
           Swal.fire(
               'Error!',
               'An error occurred while updating the delivery.',
               'error'
           );
        
       }
    };

    

  return (
    <main>
            <Nev/>
            <div className='profilecontent'>
                <div className="Noticecontainer">
                    <h2 class="form_topic">Update Delivery</h2>
                    <div className="input_container">
                    <form onSubmit={updateDelivery}>
    <label htmlFor="pname">Customer Name:</label>
    <input type="text" name="name" placeholder="Enter customer name" value={name} onChange={(e) => setName(e.target.value)} required />

    <label htmlFor="item">Item:</label>
    <input type="text" name="item" placeholder="Enter item" value={item} onChange={(e) => setItem(e.target.value)} required />

    <label htmlFor="street">Street:</label>
    <input type="text" name="street" placeholder="Enter street" value={street} onChange={(e) => setStreet(e.target.value)} required />

    <label htmlFor="lane">Lane:</label>
    <input type="text" name="lane" placeholder="Enter lane" value={lane} onChange={(e) => setLane(e.target.value)} required />

    <label htmlFor="city">City:</label>
    <input type="text" name="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required />

    <label htmlFor="postalCode">Postal Code:</label>
    <input type="text" name="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setCode(e.target.value)} required />

    <label htmlFor="province">Province:</label>
    <input type="text" name="province" placeholder="Enter province" value={province} onChange={(e) => setProvince(e.target.value)} required />

    <label htmlFor="phoneNo">Phone Number:</label>
    <input type="text" name="phoneNo" placeholder="Enter phone number" value={phoneNo} onChange={(e) => setPhone(e.target.value)} required />

    <label htmlFor="preferredDate">Preferred Date:</label>
    <input type="date" name="preferredDate" placeholder="Enter date" value={preferredDate} onChange={(e) => setDate(e.target.value)} required />

    <label htmlFor="preferredTime">Preferred Time:</label>
    <input type="time" name="preferredTime" placeholder="Enter time" value={preferredTime} onChange={(e) => setTime(e.target.value)} required />

    <label htmlFor="addNote">Add Note:</label>
    <input type="text" name="addNote" placeholder="Enter note" value={addNote} onChange={(e) => setNote(e.target.value)} required />

    <label htmlFor="deliveryStatus">Delivery Status:</label>
    <input type="text" name="deliveryStatus" placeholder="Enter status" value={deliveryStatus} onChange={(e) => setStatus(e.target.value)} required />

    <div className="button-group">
        <button className="addNoticebutton" type="submit">Update Delivery</button>
        <Link to="/delivery" className="cancelbutton_CN">Cancel</Link>
    </div>
</form>

                    </div>
                </div>
            </div>
        </main>
  )
}

export default UpdateDelivery
