import logo from './logo.svg';
import './App.css';
import AppRouter from './Router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Button from '@mui/material/Button';
import Admin from './components/Admin';
import Login from './views/Login'
import LogoutButton from './components/LogoutButton';
import ErrorBoundary from './components/ErrorBoundary';
function Home() {
  return <div>Home Screen</div>;
}

function ProductList() {
  return <div><LogoutButton/>Product List Screen</div>;
}
function App() {
  return (
    <ThemeProvider theme={theme}>
     <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/admin" element={<Admin/>}>
              
              <Route path="admin2" element={<Admin/>} />
              
            </Route>
            
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
