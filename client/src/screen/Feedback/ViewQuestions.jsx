import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import './CusSupportStyles.css';

function ViewQuestions() {

    const [records, setRecords] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');

    const getRecords = async () => {
        const response = await getDocs(collection(db, "knowledgeBase"));
        const recordsList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecords(recordsList);
    }

    useEffect(() => {
        getRecords();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "knowledgeBase", id));
            Swal.fire(
                'Record Deleted!',
                'The record has been successfully deleted.',
                'success'
            ).then(() => {
                getRecords();
            });
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while deleting the record.',
                'error'
            );
        }
    }


    return (
        <div>
            <Nev />
            <ul className='cusSupNav'>
                <li className='cusSupNavItem'><a class="active" href="#">Knowledge Base</a></li>
                <li className='cusSupNavItem'><a href="/cusInquries"> User Concerns </a></li>
            </ul>
            <div className='pageContent'>
                <h1>Knowledge Base</h1>
                <table>
                    <tr>
                        <td>
                            <Link to={'/addRecord'}><button className='cusBtn' type="submit">Add Record</button> </Link>
                        </td>
                    </tr>
                </table>

                <div className='cusSearchBar'>
                    <label htmlFor="category" className="cusSearchBar_label">Search By Category:</label>
                    <select id="search" name="search" onChange={(a) => setSearchCategory(a.target.value)} className='cusSearchBar_input'>
                        <option value="">All</option>
                        <option value="order">Ordering Process</option>
                        <option value="delivery">Delivery Process</option>
                        <option value="payment">Payment Process</option>
                        <option value="return">Return & Refund Process</option>
                        <option value="product">Product Information</option>
                    </select>

                </div>

                <div>
                    <table className='cusTable'>
                        <tr className='cusTableHeader'>
                            <th>Category</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Keywords</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {records
                            .filter((record) => {
                                console.log("Selected Category:", searchCategory);  // Debugging output
                                console.log("Record Category:", record.category);   // Debugging output

                                // If searchCategory is empty (i.e., "All" is selected), return all records
                                if (searchCategory === '' || searchCategory === 'all') {
                                    return true;
                                }

                                // Otherwise, perform a case-insensitive match on the category
                                return record.category.toLowerCase().includes(searchCategory.toLowerCase());
                            })
                            .map((record) => (
                                <tr className='cusTableDataRow' key={record.id}>
                                    <td className='cusTableData'>{record.category}</td>
                                    <td className='cusTableData'>{record.question}</td>
                                    <td className='cusTableData'>{record.answer}</td>
                                    <td className='cusTableData'>{record.keywords.join(', ')}</td>

                                    <td className='cusTableData'>
                                        <Link to={`/updateRecord/${record.id}`}>
                                            <button className='cusAction' ><i class="fa-solid fa-pen-to-square fa-xl"></i></button>
                                        </Link>
                                    </td>
                                    <td className='cusTableData'>
                                        <button className='cusAction' onClick={() => handleDelete(record.id)}><i class="fa-solid fa-trash fa-xl"></i></button>
                                    </td>
                                </tr>
                            ))}


                    </table>
                </div>
            </div>

        </div>
    )
}

export default ViewQuestions
