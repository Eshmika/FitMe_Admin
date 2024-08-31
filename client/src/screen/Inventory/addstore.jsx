import React, { useState } from 'react';
import './Style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nev from '../Nav';


function CreateNotice() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');    
    const navigate = useNavigate();


    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createproduct', {
            name: name,
            code: code,
            category: category,
            subcategory: subcategory,
            brand: brand,
            size: size,
            color: color,
            material: material,
            price: price,
            stock: stock
           
        }).then(res => {
            console.log('Success');
            Swal.fire(
                'Product Added!',
                'Your product has been successfully added.',
                'success'
            ).then(() => {
                navigate('/invendashboad');
            });
        }).catch(err => {
            console.error(err);
            Swal.fire(
                'Error!',
                'An error occurred while adding the product.',
                'error'
            );
        });
    }

    return (
        <div >
            <Nev/>
            <div className='profilecontent'>
                <div className="Noticecontainer">
                    <h2 class="form_topic">Add Product</h2>
                    <div className="input_container">
                        <form onSubmit={submit}>

                            <label htmlFor="pname">Product Name:</label>
                            <input type="text" name="pname" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} required />

                            <label htmlFor="pcode">Product Code:</label>
                            <input type="text" name="pcode" placeholder="Enter product code" onChange={(e) => setCode(e.target.value)} required />

                            <label htmlFor="category" className="input_col">Category:</label>
                            <select id="category" name="category" required onChange={(a) => setCategory(a.target.value)}>
                                <option value="">Select</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>

                            <label htmlFor="subcategory" className="input_col">Subcategory:</label>
                            <select id="subcategory" name="subcategory" required onChange={(a) => setSubcategory(a.target.value)}>
                                <option value="">Select</option>
                                <option value="T-shirts">T-shirts</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Footwear">Dresses</option>
                            </select>

                            <label htmlFor="brand">Brand:</label>
                            <input type="text" name="brand" placeholder="Enter brand" onChange={(e) => setBrand(e.target.value)} required />

                            <label htmlFor="size" className="input_col">Size:</label>
                            <select id="size" name="size" required onChange={(a) => setSize(a.target.value)}>
                                <option value="">Select</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>                            

                            <label htmlFor="color">Color:</label>
                            <input type="text" name="color" placeholder="Enter Color" onChange={(e) => setColor(e.target.value)} required />

                            <label htmlFor="material" className="input_col">Material:</label>
                            <select id="material" name="material" required onChange={(a) => setMaterial(a.target.value)}>
                                <option value="">Select</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Denim">Denim</option>
                                <option value="Leather">Leather</option>
                                <option value="Linen">Linen</option>
                                <option value="Silk">Silk</option>
                                <option value="Velvet">Velvet</option>
                                <option value="Wool">Wool</option>
                            </select>

                            <label htmlFor="price">Price:</label>
                            <input type="text" name="price" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} required />

                            <label htmlFor="stock">Quantity in Stock:</label>
                            <input type="text" name="stock" placeholder="Enter quantity in stock" onChange={(e) => setStock(e.target.value)} required />


                            <div className="button-group">
                                <button className="addNoticebutton" type="submit">Add Product</button>
                                <Link to="/invendashboad" className="cancelbutton_CN">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default CreateNotice;
