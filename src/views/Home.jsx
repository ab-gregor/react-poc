import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import data from './data.json';
import LogoutButton from '../components/LogoutButton';
import Header from '../components/HeaderHome';
import Carousel from '../components/Carousel';
import styles from './Home.module.css'



const HomeScreen = () => {
  const user = useSelector((state) => state.user);
    const navigate=useNavigate();



  return (
    <>
      <Header/>
      <Carousel/>
      <div>
        <h3 className={styles.browse} >Browse through our Categories</h3>
      
      <div className={styles.categoryContainer}>
        {data.productTypes.map(type => (
          <div key={type.id} className={styles.categoryCard}>
            <Link to={`/productHome/${type.id}`}>
            <img className={styles.categoryImage}src={require(`../assets/${type.image}`)} alt={type.name} />
              {type.name}
              
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HomeScreen;
