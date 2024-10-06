import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../Auth/firebase';


function AddQuestions() {
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [keywords, setKeywords] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {

        const keywordArray = keywords.split(',').map(keyword => keyword.trim());

        e.preventDefault();
        try {
            await addDoc(collection(db, "knowledgeBase"), {
                category: category,
                question: question,
                answer: answer,
                keywords: keywordArray
            });
            Swal.fire(
                'Record Added!',
                'Your record has been successfully added.',
                'success'
            ).then(() => {
                navigate('/viewRecord');
            });
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while adding the record.',
                'error'
            );
        }
    }

    return (
        <div >
            <Nev />
            <div className='profilecontent'>
                <div className="Noticecontainer">
                    <h2 class="form_topic">Add New Record</h2>
                    <div className="input_container">
                        <form onSubmit={submit}>

                            <label htmlFor="category" className="input_col">Category:</label>
                            <select id="category" name="category" required onChange={(a) => setCategory(a.target.value)}>
                                <option value="">Select</option>
                                <option value="Order">Ordering Process</option>
                                <option value="Delivery">Delivery Process</option>
                                <option value="Payment">Payment Process</option>
                                <option value="Return & Refund">Return & Refund Process</option>
                                <option value="Product">Product Information</option>
                            </select>

                            <label htmlFor="question">Question:</label>
                            <textarea
                                id="question"
                                name="question"
                                rows="4" cols="50"
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            >
                            </textarea>

                            <label htmlFor="answer">Answer:</label>
                            <textarea
                                id="answer"
                                name="answer"
                                rows="4" cols="50"
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            >
                            </textarea>

                            <label htmlFor="answer">Keywords:</label> <p>Seperate keyword by commas</p>
                            <input
                                type="text"
                                id="keywords"
                                name="keywords"
                                onChange={(e) => setKeywords(e.target.value)}
                                style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
                                required
                            />

                            <div className="button-group">
                                <button className="addNoticebutton" type="submit">Add Record</button>
                                <Link to="/viewRecord" className="cancelbutton_CN">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuestions;
