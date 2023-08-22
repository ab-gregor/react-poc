import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import data from './data.json';
import styles from './AdminScreen.module.css'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import {Select,MenuItem} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
const AdminScreen = () => {
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false); // State to control the add product form visibility

    const handleTypeClick = (typeId) => {
        const filteredProducts = data.products.filter(p => p.typeId === typeId);
        setProducts(filteredProducts);
        setSelectedType(typeId);
    };
    useEffect(() => {
        
        }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setType(product.typeId);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
    };

    const handleSubmitEdit = async () => {
        try {
            const updatedProduct = {
                id: selectedProduct.id,
                typeId: Number(type),
                name,
                price,
                image,
                description
            };
            await axios.put(`http://localhost:5000/products/${selectedProduct.id}`, updatedProduct);
            setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
            setSelectedProduct(null);
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    const handleAddProduct = async () => {
        const newProduct = {
            id:Date.now() + Math.floor(Math.random() * 10000),
            typeId: Number(type),
            name,
            price: Number(price),
            image,
            description
        };
        console.log(newProduct.typeId)

        try {
            const response = await axios.post('http://localhost:5000/products', newProduct);
            if (response.status === 201) {
                setProducts(prev => [...prev, response.data]); // Add the new product to the list
                setIsAdding(false);  // Close the Add Product form
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div>
            <div className={styles.adminHeading}>
            <h2>Admin Screen</h2>
            </div>


            {!selectedType ? (
                <div>
                <h4>Select a category to add,delete or edit products</h4>
                <div className={styles.categoryContainer}>
                    
                    {data.productTypes.map(type => (
                        <div key={type.id} >
                            <div onClick={() => handleTypeClick(type.id)} className={styles.categoryCard}>
                            <img className={styles.categoryImage}src={require(`../assets/${type.image}`)} alt={type.name} />
                            {type.name}
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <div>
                    {products.map(product => (
                        <div key={product.id}>
                            <h4>{product.name}</h4>
                            <Button onClick={() => handleDelete(product.id)} variant="outlined" startIcon={<DeleteIcon />} size='small' color='error'>Delete</Button>
                            <Button onClick={() => handleEdit(product)} variant="contained" startIcon={<EditIcon />} size='small'>Edit</Button>
                        </div>
                    ))}

                    {selectedProduct && (
                        <div>
                            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                            <select value={type} onChange={e => setType(e.target.value)}>
                                {data.productTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                            <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
                            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
                            <button onClick={handleSubmitEdit}>Submit Edit</button>
                        </div>
                    )}
                    <br/><br/>
                    <Button onClick={() => setIsAdding(true)} color='success' size='large' variant='contained' startIcon={<AddIcon />}>Add Product</Button>
                               
                    {isAdding && (
                        <div className={styles.AddForm}>
                            <TextField value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                            <Select labelId="demo-simple-select-standard-label" value={type} onChange={e => setType(e.target.value)} label="type" >
            
                                {data.productTypes.map(type => (
                                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                ))}
                            </Select>
                            <TextField value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                            <TextField value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
                            <TextField value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" multiline/>
                            <Button onClick={handleAddProduct}color='success' size='small' variant='contained' startIcon={<AddIcon />}>Add Product</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminScreen;
