import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nev from '../Nav';
import Swal from 'sweetalert2';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../Auth/firebase';

function UpdateQuestions() {

    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [keywords, setKeywords] = useState('');
    const [category, setCategory] = useState('');
    const { id } = useParams();

    const getRecords = useCallback(async () => {
        try {
            const response = await getDoc(doc(db, "knowledgeBase", id));
            if (response.exists()) {
                setQuestion(response.data().question);
                setAnswer(response.data().answer);
                setKeywords(response.data().keywords.join(', '));
                setCategory(response.data().category);
            } else {
                console.log("No such data found!");
            }
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        getRecords();
    }, [id, getRecords]);



    const updateRecord = async (e) => {
        e.preventDefault();
        const keywordArray = keywords.split(',').map(keyword => keyword.trim());
        try {
            await updateDoc(doc(db, "knowledgeBase", id), {
                category: category,
                question: question,
                answer: answer,
                keywords: keywordArray
            });
            Swal.fire(
                'Record Updated!',
                'The record has been successfully updated.',
                'success'
            ).then(() => {
                navigate('/viewRecord');
            });

        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while updating the record.',
                'error'
            );

        }
    };



    return (
        <main>
            <Nev />
            <div className='profilecontent'>
                <div className="Noticecontainer">
                    <h2 class="form_topic">Update Product</h2>
                    <div className="input_container">
                        <form onSubmit={updateRecord}>

                            <label htmlFor="category" className="input_col">Category:</label>
                            <select 
                               id="category" 
                               name="category"
                               value={category} 
                               required 
                               onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select</option>
                                <option value="order">Ordering Process</option>
                                <option value="delivery">Delivery Process</option>
                                <option value="payment">Payment Process</option>
                                <option value="return">Return & Refund Process</option>
                                <option value="product">Product Information</option>
                            </select>

                            <label htmlFor="question">Question:</label>
                            <textarea
                                id="question"
                                name="question"
                                rows="4" cols="100"
                                value={question} 
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            >
                            </textarea>

                            <label htmlFor="answer">Answer:</label>
                            <textarea
                                id="answer"
                                name="answer"
                                rows="4" cols="100"
                                value={answer} 
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            >
                            </textarea>

                            <label htmlFor="answer">Keywords:</label> <p>Seperate keyword by commas</p>
                            <input
                                type="text"
                                id="keywords"
                                name="keywords"
                                value={keywords} 
                                onChange={(e) => setKeywords(e.target.value)}
                                style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
                            />

                            <div className="button-group">
                                <button className="addNoticebutton" type="submit">Save</button>
                                <Link to="/viewRecord" className="cancelbutton_CN">Cancel</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default UpdateQuestions
