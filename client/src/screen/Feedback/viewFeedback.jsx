import React, { useEffect, useState } from 'react';
import Nev from '../Nav';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../Auth/firebase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Import autotable plugin for table generation in PDF

function ViewFeedback() {
    const [feedback, setFeedback] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');

    // Fetch feedback from Firestore
    const getFeedback = async () => {
        const response = await getDocs(collection(db, "Feedback"));
        const feedbackList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedback(feedbackList);
    }

    useEffect(() => {
        getFeedback();
    }, []);

    // Format date to 'DD-MM-YYYY'
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Function to generate the PDF report
    const generateReport = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Customer Feedback Report', 14, 22);

        const filteredFeedback = feedback.filter((feedbackItem) => {
            if (searchCategory === '' || searchCategory === 'all') {
                return true;
            }
            return feedbackItem.category.toLowerCase().includes(searchCategory.toLowerCase());
        });

        // Add the feedback data to the PDF
        const tableColumn = ["Category", "User", "Comment", "Rate", "Submitted Date"];
        const tableRows = [];

        filteredFeedback.forEach(feedbackItem => {
            const feedbackData = [
                feedbackItem.category,
                feedbackItem.email,
                feedbackItem.idea,
                feedbackItem.rating,
                formatDate(feedbackItem.date)
            ];
            tableRows.push(feedbackData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('feedback_report.pdf');
    };

    return (
        <div>
            <Nev />
            <div className='profilecontent'>
                <h1>Customer Feedback</h1>
                
                <div className='cusSearchBar'>
                    <label htmlFor="category" className="cusSearchBar_label">Search By Category:</label>
                    <select id="search" name="search" onChange={(a) => setSearchCategory(a.target.value)} className='cusSearchBar_input'>
                        <option value="">All</option>
                        <option value="Ordering">Ordering Process</option>
                        <option value="Delivery">Delivery Process</option>
                        <option value="Payment">Payment Process</option>
                        <option value="Return & Refund">Return & Refund Process</option>
                        <option value="Service">Service</option>
                    </select>
                </div>

                {/* Add button to generate report */}
                <div>
                    <button onClick={generateReport} className='cusBtn1'>Generate Report</button>
                </div>

                <div>
                    <table className='cusTable'>
                        <thead>
                            <tr className='cusTableHeader'>
                                <th>Category</th>
                                <th>User</th>
                                <th>Comment</th>
                                <th>Rate</th>
                                <th>Submitted Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback
                                .filter((feedbackItem) => {
                                    // If searchCategory is empty (i.e., "All" is selected), return all records
                                    if (searchCategory === '' || searchCategory === 'all') {
                                        return true;
                                    }
    
                                    // Otherwise, perform a case-insensitive match on the category
                                    return feedbackItem.category.toLowerCase().includes(searchCategory.toLowerCase());
                                })
                                .map((feedbackItem) => (
                                    <tr className='cusTableDataRow' key={feedbackItem.id}>
                                        <td className='cusTableData'>{feedbackItem.category}</td>
                                        <td className='cusTableData'>{feedbackItem.email}</td>
                                        <td className='cusTableData'>{feedbackItem.idea}</td>
                                        <td className='cusTableData'>{feedbackItem.rating}</td>
                                        <td className='cusTableData'>{formatDate(feedbackItem.date)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewFeedback;
