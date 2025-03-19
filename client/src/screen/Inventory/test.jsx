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
    const [type, setType] = useState('');
    const [hospital, setHospital] = useState('');
    const [available, setAvailable] = useState('');
    const [price, setPrice] = useState('');
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
                const storageRef = ref(imagedb, "Doctors/" + image.name);
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

                        await addDoc(collection(db, "Doctors"), {
                            doctor_name: name,
                            doctor_type: type,     
                            hospital: hospital,
                            availability: available,                         
                            Price: price,                
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

                            <label htmlFor="pname">Name:</label>
                            <input type="text" name="pname" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} required />

                            <label htmlFor="ptype">Type:</label>
                            <input type="text" name="ptype" placeholder="Enter product type" onChange={(e) => setType(e.target.value)} required />

                            <label htmlFor="hospital">Hospital:</label>
                            <input type="text" name="hospital" placeholder="Enter hospital" onChange={(e) => setHospital(e.target.value)} required />

                            <label htmlFor="available">Availability:</label>
                            <input type="text" name="available" placeholder="Enter availability" onChange={(e) => setAvailable(e.target.value)} required />

                            <label htmlFor="price">Price:</label>
                            <input type="text" name="price" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} required />

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
