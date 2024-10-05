import React, { useState } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nev from '../Nav';
import { addDoc, collection } from '@firebase/firestore';
import { db, imagedb } from '../Auth/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


function CreateStore() {
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
    const [image, setImage] = useState(null); 
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const handleImagechange = (e) => {
        setImage(e.target.files[0]);
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (image) {
                const storageRef = ref(imagedb, "productsimages/" + image.name);
                const uploadTask = uploadBytesResumable(storageRef, image);
    
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                        console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                        console.error(error);
                        Swal.fire('Error!', 'An error occurred while uploading the image.', 'error');
                    }, 
                    async () => {
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

                        await addDoc(collection(db, "products"), {
                            name: name,
                            code: code,
                            category: category,
                            subcategory: subcategory,
                            brand: brand,
                            size: size,
                            color: color,
                            material: material,
                            price: price,
                            stock: stock,
                            imageUrl: imageUrl
                        });
    
                        Swal.fire('Product Added!', 'Your product has been successfully added.', 'success')
                        .then(() => {
                            navigate('/invendashboad');
                        });
                    }
                );
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while adding the product.',
                'error'
            );
        }
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
                                <option value="Dresses">Dresses</option>
                                <option value="Hoodies">Hoodies</option>
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
                                <option value="Polyester">Polyester</option>
                                <option value="Linen">Linen</option>
                                <option value="Silk">Silk</option>
                                <option value="Velvet">Velvet</option>
                                <option value="Wool">Wool</option>
                            </select>

                            <label htmlFor="price">Price:</label>
                            <input type="number" name="price" placeholder="Enter price" step="0.01" onChange={(e) => setPrice(e.target.value)} required />

                            <label htmlFor="stock">Quantity in Stock:</label>
                            <input type="number" name="stock" placeholder="Enter quantity in stock" onChange={(e) => setStock(e.target.value)} required />

                            <div>
                                <label htmlFor="productimage">Product Image:</label>
                                <input type="file" name="productimage" onChange={handleImagechange} required />
                            </div>

                            {uploadProgress && (
                                <div>
                                    <label>Upload Progress:</label>
                                    <progress value={uploadProgress} max="100" />
                                    <span>{Math.round(uploadProgress)}%</span>
                                </div>
                            )}

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

export default CreateStore;
