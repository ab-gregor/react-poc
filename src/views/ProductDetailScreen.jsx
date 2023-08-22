import React from 'react';
import { useParams } from 'react-router-dom';
import data from './data.json';
import { useCart } from '../contexts/CartContext';
import Header from '../components/HeaderHome';
import styles from './ProductDetailScreen.module.css';
import { Button } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  console.log(productId)
  const product = data.products.find(p => p.id.toString() === productId);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <>
    <Header></Header>
    <div className={styles.outerContainer}>
      
      <div className={styles.productDetailsContainer}>
        <div className={styles.imageContainer}>
      <img className={styles.productImage}src={require(`../assets/${product.image}`)} alt={product.name} />
      <Button variant="contained" size="large" color="success"onClick={() => addToCart(product)}><ShoppingCartRoundedIcon/>Add to Cart</Button>
      </div>
      <div className={styles.descContainer}>
      <h3>{product.name}</h3>
      <h4>Price: ₹{product.price}</h4>
      <p>Description: {product.description}</p>
      
      </div>
      
    </div>
    </div>
    </>
  );
};

export default ProductDetailScreen;
