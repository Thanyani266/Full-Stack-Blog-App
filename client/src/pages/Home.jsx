import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Header from "../components/Header"
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBTypography,
  MDBNavbarToggler,
  MDBCollapse,
  MDBCardImage,
} from 'mdb-react-ui-kit';

const Home = () => {
  const [posts, setPosts] = useState([])
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const category = useLocation().search
  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [category])
  console.log(posts);
  return (
    <>
    <Header />
    <MDBNavbar expand='lg' light bgColor='light' className="mt-5">
      <MDBContainer fluid className="justify-content-center">
        <MDBNavbarToggler
          type='button'
          data-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavCentred(!openNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openNavCentred} center='true' id='navbarCenteredExample'>
          <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
          <MDBTypography tag='ul' className='d-flex float-end'>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/' className='text-dark'>All</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=cart' className='text-dark'>Cart</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=food' className='text-dark'>Food</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=blof' className='text-dark'>Blof</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=tym' className='text-dark'>Tyme</NavLink>
            </MDBTypography>
          </MDBTypography>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <div className='mt-5'>
      {posts.map((post, index) => {
        return (
        <div key={index}>
          <h1>{post.title}</h1>
          <span>{post.desc}</span>
          <MDBCardImage src={`http://localhost:5000/${post.image}`} fluid alt={post.image} style={{height: '200px'}}/>
          <p>{post.category}</p>
          <Link to={`/post/${post.post_id}`}><button>view</button></Link>
        </div>
      )})}
    </div>
    </>
  )
}

export default Home
