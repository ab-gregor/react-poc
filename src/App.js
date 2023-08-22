import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import HomeScreen from './views/Home';
import Admin from './components/Admin';
import Login from './views/Login'
import LogoutButton from './components/LogoutButton';
import ProductListScreen from './views/ProductList';
import ProductDetailScreen from './views/ProductDetailScreen';
import { CartProvider } from './contexts/CartContext';
import CartScreen from './views/CartScreen';
import AdminScreen from './views/AdminScreen';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
     <Router>
        <div className="App">
          
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/productHome" element={<HomeScreen />} />
            <Route path="/productHome/:typeId" element={<ProductListScreen />} />
            <Route path="/productHome/:typeId/:productId" element={<ProductDetailScreen />} />
            <Route path="/cart" element={<CartScreen/>}/>
            <Route path="/admin" element={<Admin/>}>
              
              <Route path="admin2" element={<AdminScreen/>} />
              
            </Route>
            
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
