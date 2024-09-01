import React, { useEffect, useState } from 'react';
import axios from 'axios';

function viewFeedback() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/getallpay')
    .then((res) => setReviews(res.data))
    .catch((err) => {
        console.log(err);
    })
}, [])


  return (
    <div class="d-flex justify-content-center">
            <h1>Customer Reviews</h1>
            
	    <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col"> Product </th>
                  <th scope="col"> Customer </th>
                  <th scope="col"> Date </th>
                  <th scope="col"> Feedback </th>
                  <th scope="col"> Rating </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id}>
                    <td> {review.customer} </td>
                    <td> {review.product} </td>
                    <td> {review.comment} </td>
                    <td> {review.rating} </td>
                    <td> {new Date(review.date).toLocaleDateString()} </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
  );
}

export default viewFeedback;
