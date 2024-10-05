import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Nev from '../Nav';
import './invendash.css'
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { db, imagedb } from '../Auth/firebase';
import { deleteObject, ref } from 'firebase/storage';
import jsPDF from 'jspdf';  
import 'jspdf-autotable';

function Invendashboad() {

    const [products, setProducts] = useState([]);   
    const [searchproduct, setSearchProduct] = useState('');

    const getProductdetails = async () => {
        const response = await getDocs(collection(db, "products")); 
        const productList = response.docs.map(doc =>({ id: doc.id, ...doc.data() }));
        setProducts(productList);
    }  

    useEffect(() => {
        getProductdetails();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        try {
            if(imageUrl){
                const imageRef = ref(imagedb, imageUrl);
                await deleteObject(imageRef);
            }

            await deleteDoc(doc(db, "products", id));
            Swal.fire(
                'Product Deleted!',
                'The product has been successfully deleted.',
                'success'
            ).then(() => {
                getProductdetails();
            });
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while deleting the product.',
                'error'
            );
        }
    }   

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Name", "Code", "Category", "Subcategory", "Brand", "Size", "Color", "Material", "Price", "Stock"];
        const tableRows = [];

        products.filter((product) => {
            return searchproduct.toLowerCase() === '' ? product : product.name.toLowerCase().includes(searchproduct);
        }).forEach(product => {
            const productData = [
                product.name,
                product.code,
                product.category,
                product.subcategory,
                product.brand,
                product.size,
                product.color,
                product.material,
                product.price,
                product.stock
            ];
            tableRows.push(productData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 25,
        });

        doc.setFontSize(16);
        doc.text("FitMe Virtual Dressing Room\nProduct Inventory Report", doc.internal.pageSize.getWidth() / 2, 16, { align: 'center' });
        doc.save('product_inventory.pdf');
    };   

  return (
    <div>
        <Nev/>
        <div className='profilecontent'>
            <h1>Store Management</h1>
            <table>
                <tr>                
                    <td>          
                        <Link to={'/insertstore'}><button className='btnedit' type="submit">Add Store</button> </Link>
                    </td>  
                    <td>          
                        <button className='btnedit2' onClick={generatePDF}>Generate the Report</button>
                    </td>             
                </tr>
            </table>  

            <table>
                <tr>
                    <td class="searchbarcol">
                        <input type="text" id="search" name="search" placeholder="Search product name..." class="searchbar" onChange={(e)=> setSearchProduct(e.target.value)}/>
                    </td>

                </tr>
            </table>   

            <div style={{ maxHeight: '480px', overflowY: 'scroll' }}>
                <table className='searchtablemainmanager'>
                    <tr className='searchtablemainmanagerheader'>
                        <th>Name</th>
                        <th>Product Image</th>
                        <th>Code</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Brand</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Material</th>
                        <th>Price (Rs.)</th>
                        <th>Stock</th> 
                        <th>Update</th>
                        <th>Delete</th>            
                    </tr>
                    {products.filter((product) => {
                        return searchproduct.toLowerCase() === '' ? product : product.name.toLowerCase().includes(searchproduct)
                    }).map((product) => (
                        <tr className='searchtablemainadmindata'>
                            <td className='searchtabledata'>{product.name}</td>
                            <td className='searchtabledata'>
                                <img src={product.imageUrl} alt={product.name} style={{ width: '80px', height: '80px' }} /> 
                            </td>
                            <td className='searchtabledata'>{product.code}</td>
                            <td className='searchtabledata'>{product.category}</td>
                            <td className='searchtabledata'>{product.subcategory}</td>
                            <td className='searchtabledata'>{product.brand}</td>
                            <td className='searchtabledata'>{product.size}</td>
                            <td className='searchtabledata'>{product.color}</td>
                            <td className='searchtabledata'>{product.material}</td>
                            <td className='searchtabledata'>{product.price}</td>
                            <td className='searchtabledata'>{product.stock}</td>
                            
                            <td>
                                <Link to={`/updatestore/${product.id}`}>
                                    <button className='btnupdate' >Update</button>                                       
                                </Link>
                            </td>
                            <td>
                                <button className='btndelete' onClick={() => handleDelete(product.id, product.imageUrl)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </table>    
            </div>   
        </div>      
        
    </div>
  )
}

export default Invendashboad
