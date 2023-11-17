import { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext"
import { Link, NavLink } from 'react-router-dom'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBCollapse,
  MDBTypography
} from 'mdb-react-ui-kit'
import './Navbar.css'

const Navbar = () => {
  const [showBasic, setShowBasic] = useState(false);

  const {currentUser, logout} = useContext(AuthContext)

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <Link to='/'><MDBTypography tag='p' className='fw-bold fs-4 mt-3 mx-2'>Mutsi</MDBTypography></Link>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 align-items-center'>
            
            <MDBTypography tag='ul' className='d-flex'>
        <MDBTypography tag='li' className='mx-2'>
            <NavLink to='/' className='text-dark  text-uppercase'>Home</NavLink>
        </MDBTypography>
            <MDBTypography tag='li' className='mx-3'>
            {currentUser ? <NavLink to='/add' className='text-dark text-uppercase'>New Post</NavLink> : ""}
            </MDBTypography>
        </MDBTypography>

      <div className="d-flex align-items-center ms-auto">
        {currentUser ? <MDBTypography tag='li' onClick={logout} className='text-dark text-uppercase mx-2' style={{cursor: 'pointer'}}>
              Logout
            </MDBTypography> : 
            <MDBTypography tag='li' onClick={logout} className='mx-2'>
            <NavLink to='/login' className='text-dark text-uppercase'>Login</NavLink>
          </MDBTypography>}
        <MDBTypography tag='li' className='mx-3'>
            {currentUser ? "" : <NavLink to='/register' className='text-dark text-uppercase'>Register</NavLink>}
        </MDBTypography>
        {currentUser ? <>
          
          <MDBTypography tag='li' className='navbar-text me-3 align-items-center'>{currentUser.username}</MDBTypography>
          <a
          className="btn btn-dark px-3"
          href="https://github.com/mdbootstrap/mdb-ui-kit"
          role="button"
          ><i className="fab fa-github"></i>
        </a></> : "" }
          
      </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar