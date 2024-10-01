// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Swal from 'sweetalert2';
// import Nev from '../Nav';
// import './invendash.css'

// function invendashboad() {

//     const [product, setProduct] = useState([]);   
//     const [searchproduct, setSearchProduct] = useState('');

//     useEffect(() => {
//         axios.get('/getallproduct')
//         .then((res) => setProduct(res.data))
//         .catch((err) => {
//             console.log(err);
//         })
//     }, [])

//   return (
//     <div>
//         <Nev/>
//         <div className='profilecontent'>
//             <h1>Store Management</h1>
//             <table>
//                 <tr>                
//                     <td>          
//                         <Link to={'/insertstore'}><button className='btnedit' type="submit">Add Store</button> </Link>
//                     </td>             
//                 </tr>
//             </table>  

//             <table>
//                 <tr>
//                     <td class="searchbarcol">
//                         <input type="text" id="search" name="search" placeholder="Search product name..." class="searchbar" onChange={(e)=> setSearchProduct(e.target.value)}/>
//                     </td>

//                 </tr>
//             </table>   

//             <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
//                 <table className='searchtablemainmanager'>
//                     <tr className='searchtablemainmanagerheader'>
//                         <th>Name</th>
//                         <th>Code</th>
//                         <th>Category</th>
//                         <th>Subcategory</th>
//                         <th>Brand</th>
//                         <th>Size</th>
//                         <th>Color</th>
//                         <th>Material</th>
//                         <th>Price</th>
//                         <th>Stock</th>             
//                     </tr>
//                     {product.filter((product) => {
//                         return searchproduct.toLowerCase() === '' ? product : product.name.toLowerCase().includes(searchproduct)
//                     }).map((product) => (
//                         <tr className='searchtablemainadmindata'>
//                             <td className='searchtabledata'>{product.name}</td>
//                             <td className='searchtabledata'>{product.code}</td>
//                             <td className='searchtabledata'>{product.category}</td>
//                             <td className='searchtabledata'>{product.subcategory}</td>
//                             <td className='searchtabledata'>{product.brand}</td>
//                             <td className='searchtabledata'>{product.size}</td>
//                             <td className='searchtabledata'>{product.color}</td>
//                             <td className='searchtabledata'>{product.material}</td>
//                             <td className='searchtabledata'>{product.price}</td>
//                             <td className='searchtabledata'>{product.stock}</td>
                            
//                             <td>
//                                 <Link to={`/updatestore/${product.code}`}>
//                                     <button className='btnupdate' >Update</button>                                       
//                                 </Link>
//                             </td>
//                             {/* <td><button className='btndelete' onClick={(e) => studentDelete(student._id)}>Delete</button></td> */}
//                         </tr>
//                     ))}

//                 </table>    
//             </div>   
//         </div>      
        
//     </div>
//   )
// }

// export default invendashboad
