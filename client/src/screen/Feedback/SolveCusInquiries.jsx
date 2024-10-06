import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import './CusSupportStyles.css';
import Nev from '../Nav';

function SolveCusInquries() {
    const { id } = useParams(); // Get the record ID from the URL
    const navigate = useNavigate(); // To redirect after submission

    const [record, setRecord] = useState(null);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the selected record based on ID
    const getRecord = async () => {
        try {
            const recordRef = doc(db, "UserConcerns", id);
            const recordSnap = await getDoc(recordRef);
            if (recordSnap.exists()) {
                setRecord(recordSnap.data());
                setLoading(false);
            } else {
                console.log("No such record found!");
            }
        } catch (error) {
            console.error("Error fetching the record:", error);
        }
    };

    useEffect(() => {
        getRecord();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reply.trim()) {
            alert("Please enter a reply.");
            return;
        }

        try {
            const recordRef = doc(db, "UserConcerns", id);
            // Update the record with the reply and change status to 'resolved'
            await updateDoc(recordRef, {
                matchedAnswer: reply,
                status: "resolved"
            });
            // alert("Reply submitted and status updated to 'resolved'.");
            navigate('/cusInquries'); // Redirect to inquiries page after submission
        } catch (error) {
            console.error("Error updating the record:", error);
        }
    };

    return (
        <div >
            <Nev />
            <div className='profilecontent'>
                <div className="Noticecontainer">
                    <h2 class="form_topic">Resolve Inquiry</h2>
                    <div className="input_container">

                        {record && (
                            <div className='solveContainer'>
                                <div className='solveQuestion'>
                                    <h3>Inquiry:</h3>
                                    <p>{record.userQuestion}</p>
                                </div>

                                <form onSubmit={handleSubmit} className='solveForm'>
                                    <label htmlFor="reply" className='solveLabel'>Your Reply:</label>
                                    <textarea
                                        id="reply"
                                        name="reply"
                                        rows="4"
                                        className='solveInput'
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        placeholder="Enter your reply here..."
                                    ></textarea>

                                    <button type="submit" className="addNoticebutton">Submit Reply</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolveCusInquries;
