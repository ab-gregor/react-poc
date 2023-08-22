import React from 'react';
import { useCart } from '../contexts/CartContext';
import styles from './CartScreen.module.css'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Header from '../components/HeaderHome';
const CartScreen = () => {
  const { cart, removeFromCart } = useCart();

  return (

    <div>
      <Header/>
      <h2 className={styles.cartHeading}>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(product => (
            <li key={product.id}>
              <div key={product.id} className={styles.productListCard}>
            <span className={styles.imageSpan}>
            <img className={styles.productImage}src={require(`../assets/${product.image}`)} alt={product.name} width={100} />
            </span>
            <div className={styles.nameAndPriceContainer}>
            
              <h5>{product.name}</h5>
              
              <h6>Price: ₹{product.price}</h6>
              <Button onClick={() => removeFromCart(product.id)} variant="outlined" startIcon={<DeleteIcon />} size='small' color='error'>Remove</Button>
            </div>
          </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartScreen;
