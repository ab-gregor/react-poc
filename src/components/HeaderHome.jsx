import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import groezeryLogo from '../assets/groEZerylogobordered.png'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from './LogoutButton';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

function NavScrollExample() {
    const user = useSelector((state) => state.user);
    const navigate=useNavigate();
  return (
    <Navbar expand="lg" className="">
      <Container fluid>
        <Navbar.Brand href="#"><img className="logo" src={groezeryLogo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div
            className="my-2 my-lg-0 me-auto2"
            style={{ maxHeight: '100px' ,marginRight:'0px'}}
            navbarScroll
          >
            
            <Nav.Item style={{ color:'white'}}>
              <b>Logged in as :</b>
            </Nav.Item>
            
            <NavDropdown title={user.name}>
          <NavDropdown.Item>
          <LogoutButton/>
          </NavDropdown.Item>
          </NavDropdown>
          
          <Nav.Item style={{ cursor: 'pointer', color:"#4e9c73" }}>
          <ShoppingCartRoundedIcon  onClick={() => navigate('/cart')}/>
          
          </Nav.Item>
        
          </div>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;