import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { selectProduct } from '../../../redux/slice/productSlice';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './AddProduct.module.scss';

const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phone" },
]

//// for add Product
const initialProduct = {
    name: '',
    imageURL: '',
    price: '',
    category: '',
    brand: '',
    desc: '',
}

const AddProduct = () => {
    /// Edit logic  start.
    const { id } = useParams();
    /// For dividing edit and add
    const detectForm = (id, f1, f2) => {
        if (id === 'add') {
            return f1;
        }
        return f2;
    }
    //// for edit product
    const products = useSelector(selectProduct);
    const productEdit = products.find(item => item.id === id);

    const [product, setProduct] = useState(() => {
        const newState = detectForm(id, { ...initialProduct }, productEdit ? productEdit : "")
        return newState;
    })

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product, [name]: value,
        })
    }
    ///// for image in firebase
    const [uploadProgress, setUploadProgress] = useState(0)
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        ////// Image send to firebase
        const storageRef = ref(storage, `eShop/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        /////// Upload progress bar and URL
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProduct({ ...product, imageURL: downloadURL });
                    toast.success('Image upload successfully');
                });
            }
        );
    }
    /////// add function
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            addDoc(collection(db, "products"), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate(),
            });

            setIsLoading(false);
            toast.success('Product upload successful');
            setProduct({
                ...initialProduct,
            })
            setUploadProgress(0);
            navigate('/admin/all-products');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    ////Edit function
    const editProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);
        ///for delete image after change the image
        if (product.imageURL !== productEdit.imageURL) {
            const imageRef = ref(storage, productEdit.imageURL);
            deleteObject(imageRef);
        }

        ///// For Edit product
        try {
            setDoc(doc(db, "products", id), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: productEdit.createdAt,
                editedAt: Timestamp.now().toDate(),
            });

            setIsLoading(false);
            toast.success('Product edited successfully');
            navigate('/admin/all-products');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.product}>
                <h2>{detectForm(id, 'Add New Product', 'Edit product')}</h2>
                <Card cardClass={styles.card}>
                    <form onSubmit={detectForm(id, handleSubmit, editProduct)}>
                        <label>Product name:</label>
                        <input
                            type="text"
                            placeholder='Product name'
                            required
                            name='name'
                            value={product.name}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label>Product image:</label>
                        <Card cardClass={styles.group}>
                            <div className={styles.progress}>
                                {
                                    uploadProgress === 0 ? null : (

                                        <div className={styles['progress-bar']} style={{ width: `${uploadProgress}%` }}>
                                            {uploadProgress < 100 ? `Uploading ${uploadProgress.toFixed(0)}%` : `Upload complete ${uploadProgress}%`}
                                        </div>
                                    )
                                }

                            </div>
                            <input type="file" name="image" onChange={(e) => handleImageChange(e)} />
                            {
                                product.imageURL === '' ? null : (
                                    <input type="text" required placeholder='Image URL' name='imageURL' value={product.imageURL} disabled />
                                )
                            }
                        </Card>

                        <label>Product Price:</label>
                        <input
                            type="number"
                            placeholder='Product price'
                            required
                            name='price'
                            value={product.price}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label>Product category:</label>
                        <select name="category" value={product.category} required onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled>
                                -- choose product category
                            </option>
                            {
                                categories.map(cat => {
                                    return (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <label>Product Company/Brand:</label>
                        <input
                            type="text"
                            placeholder='Product brand'
                            required
                            name='brand'
                            value={product.brand}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label>Product Description:</label>
                        <textarea name="desc" value={product.desc} onChange={(e) => handleInputChange(e)} required cols="30" rows="10"></textarea>
                        <button type='submit' className='--btn --btn-primary'>{detectForm(id, 'Save Product', 'Edit product')}</button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default AddProduct;