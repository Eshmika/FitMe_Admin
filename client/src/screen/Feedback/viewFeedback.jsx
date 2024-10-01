import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nev from '../Nav';
import './stviewonline.css';

function viewFeedback() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/getallfeedback')
    .then((res) => setReviews(res.data))
    .catch((err) => {
        console.log(err);
    })
}, [])


  return (
    <div class="bodyvo">
            <h1 className='h1vo'>Customer Reviews</h1>
     <div className="tbl-headervo">     
	    <table className='tablevo'>
              <thead>
                <tr>
                  <th className='thvo'> Product </th>
                  <th className='thvo'> Customer </th>
                  <th className='thvo'> Date </th>
                  <th className='thvo'> Feedback </th>
                  <th className='thvo'> Rating </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id}>
                    <td className='tdvo'>{review.product}</td>
                    <td className='tdvo'>{review.customername}</td>
                    <td className='tdvo'>{review.submitdate}</td>
                    <td className='tdvo'>{review.comment}</td>
                    <td className='tdvo'>{review.rate}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            </div>  
        </div>
  );
}

export default viewFeedback;
