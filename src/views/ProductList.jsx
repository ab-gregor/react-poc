import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from './data.json';
import styles from './ProductList.module.css'
import HeaderProductList from '../components/HeaderProductList'

const ProductListScreen = () => {
  const { typeId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = data.products.filter(product => 
    product.typeId.toString() === typeId && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productType = data.productTypes.find(type => type.id === Number(typeId));

  return (
    <div>
      <HeaderProductList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.results}>
      <h6>Showing Results for : {productType.name}</h6>
      </div>    
      <div className={styles.outerContainer}>
      <div className={styles.productCardContainer}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.productListCard}>
            <span className={styles.imageSpan}>
            <img className={styles.productImage}src={require(`../assets/${product.image}`)} alt={product.name} width={100} />
            </span>
            <div className={styles.nameAndPriceContainer}>
            <Link to={`/productHome/${typeId}/${product.id}`}>
              <h4>{product.name}</h4>
              </Link>
              <h4>Price: ₹{product.price}</h4>
            </div>
          </div>
          
        ))}
      
    </div>
    </div>
    </div>
  );
};

export default ProductListScreen;
