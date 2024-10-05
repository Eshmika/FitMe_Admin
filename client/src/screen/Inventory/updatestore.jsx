import React, { useCallback, useEffect, useState } from 'react'
import './Style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nev from '../Nav';
import Swal from 'sweetalert2';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db, imagedb } from '../Auth/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function UpdateStore() {

    const navigate = useNavigate();
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
    const [oldImageUrl, setOldImageUrl] = useState(''); 
    const [newImage, setNewImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { id } = useParams();  

    const getProductdetails = useCallback(async () => {
        try {
            const response = await getDoc(doc(db, "products", id));
            if (response.exists()) {
                setName(response.data().name);
                setCode(response.data().code);
                setCategory(response.data().category);
                setSubcategory(response.data().subcategory);
                setBrand(response.data().brand);
                setSize(response.data().size);
                setColor(response.data().color);
                setMaterial(response.data().material);
                setPrice(response.data().price);
                setStock(response.data().stock);
                setOldImageUrl(response.data().imageUrl);
            } else {
                console.log("No such data found!");
            }
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        getProductdetails();
    }, [id, getProductdetails]);


    const updateProduct = async (e) => {
        e.preventDefault(); 
        let imageUrl = oldImageUrl;

        if (newImage) {
            const storageRef = ref(imagedb, "productsimages/" + newImage.name);
            const uploadTask = uploadBytesResumable(storageRef, newImage);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while uploading the image.',
                        'error'
                    );
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    imageUrl = downloadURL;
                    await saveProduct(imageUrl);
                }
            );
        } else {
            await saveProduct(imageUrl);
        }
    };

    const saveProduct = async (imageUrl) => {
        try {
            await updateDoc(doc(db, "products", id),{
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
            Swal.fire(
                'Product Updated!',
                'The product has been successfully updated.',
                'success'
            ).then(() => {
                navigate('/invendashboad');
            });
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'An error occurred while updating the product.',
                'error'
            );
        }
    }; 

  return (
    <main>
        <Nev/>
        <div className='profilecontent'>
            <div className="Noticecontainer">
                <h2 class="form_topic">Update Product</h2>
                <div className="input_container">
                    <form onSubmit={updateProduct}>

                        <label htmlFor="pname">Product Name:</label>
                        <input type="text" name="pname" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label htmlFor="pcode">Product Code:</label>
                        <input type="text" name="pcode" placeholder="Enter product code" value={code} onChange={(e) => setCode(e.target.value)} required />

                        <label htmlFor="category" className="input_col">Category:</label>
                        <select id="category" name="category" required value={category} onChange={(a) => setCategory(a.target.value)}>
                            <option value="">Select</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>

                        <label htmlFor="subcategory" className="input_col">Subcategory:</label>
                        <select id="subcategory" name="subcategory" required value={subcategory} onChange={(a) => setSubcategory(a.target.value)}>
                            <option value="">Select</option>
                            <option value="T-shirts">T-shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Dresses">Dresses</option>
                        </select>

                        <label htmlFor="brand">Brand:</label>
                        <input type="text" name="brand" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />

                        <label htmlFor="size" className="input_col">Size:</label>
                        <select id="size" name="size" required value={size} onChange={(a) => setSize(a.target.value)}>
                            <option value="">Select</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>                            

                        <label htmlFor="color">Color:</label>
                        <input type="text" name="color" placeholder="Enter Color" value={color} onChange={(e) => setColor(e.target.value)} required />

                        <label htmlFor="material" className="input_col">Material:</label>
                        <select id="material" name="material" required value={material} onChange={(a) => setMaterial(a.target.value)}>
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
                        <input type="text" name="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required />

                        <label htmlFor="stock">Quantity in Stock:</label>
                        <input type="text" name="stock" placeholder="Enter quantity in stock" value={stock} onChange={(e) => setStock(e.target.value)} required />

                        <label htmlFor="oldImage">Current Image:</label>
                        {oldImageUrl && <img src={oldImageUrl} alt="Current Product" style={{ width: '200px', height: 'auto' }} />}

                        <label htmlFor="newImage">Upload New Image (optional):</label>
                        <input type="file" name="newImage" onChange={(e) => setNewImage(e.target.files[0])} />

                        {newImage && (
                            <div>
                                <label>Upload Progress:</label>
                                <progress value={uploadProgress} max="100" />
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                        )}

                        <div className="button-group">
                            <button className="addNoticebutton" type="submit">Update Product</button>
                            <Link to="/invendashboad" className="cancelbutton_CN">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )
}

export default UpdateStore
