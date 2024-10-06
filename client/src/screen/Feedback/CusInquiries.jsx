import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nev from '../Nav';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import './CusSupportStyles.css';

function CusInquiries() {

    const [records, setRecords] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');

    const getRecords = async () => {
        const response = await getDocs(collection(db, "UserConcerns"));
        const recordsList = response.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(record => record.status !== 'matched');
        setRecords(recordsList);
    }

    useEffect(() => {
        getRecords();
    }, []);

    return (
        <div>
            <Nev />
            <ul className='cusSupNav'>
                <li className='cusSupNavItem'><a href="/viewRecord">Knowledge Base</a></li>
                <li className='cusSupNavItem'><a className="active" href="#">User Concerns</a></li>
            </ul>
            <div className='pageContent'>
                <h1>Customer Inquiries</h1>

                <div className='cusSearchBar'>
                    <label htmlFor="category" className="cusSearchBar_label">Search By Status:</label>
                    <select id="search" name="search" onChange={(a) => setSearchCategory(a.target.value)} className='cusSearchBar_input'>
                        <option value="">All</option>
                        <option value="not resolved">Not Resolved</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <div>
                    <table className='cusTable'>
                        <thead>
                            <tr className='cusTableHeader'>
                                <th>User</th>
                                <th>Date</th>
                                <th>Inquiry</th>
                                <th>Reply</th>
                                <th>Status</th>
                                <th>Action</th> {/* Added Action column */}
                            </tr>
                        </thead>
                        <tbody>
                            {records
                                .filter((record) => {
                                    // If "All" is selected, show all records
                                    if (searchCategory === '' || searchCategory === 'all') {
                                        return true;
                                    }

                                    // Perform exact match on the status
                                    return record.status.toLowerCase() === searchCategory.toLowerCase();
                                })
                                .map((record) => (
                                    <tr className='cusTableDataRow' key={record.id}>
                                        <td className='cusTableData'>{record.email}</td>
                                        <td className='cusTableData'>{record.date}</td>
                                        <td className='cusTableData'>{record.userQuestion}</td>
                                        <td className='cusTableData'>{record.matchedAnswer}</td>
                                        <td className='cusTableData'>{record.status}</td>
                                        <td className='cusTableData'>
                                            {/* Conditionally render the button if status is 'not resolved' */}
                                            {record.status.toLowerCase() === 'not resolved' && (
                                                <Link to={`/solveCusInquries/${record.id}`}>
                                                    <button className="cusAction"><i class="fa-regular fa-circle-check fa-xl"></i></button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CusInquiries;
