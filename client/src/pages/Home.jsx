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
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardFooter,
  MDBRipple,
} from 'mdb-react-ui-kit';
import moment from "moment";

const excerpt = (text) => {
  if(text.length > 18){
    text = text.substring(0, 18) + '...'
  }else if(text.length <= 18){
    text = text + '...'
  }
  return text 
}

const postTitle = (text) => {
  if(text.length > 11){
    text = text.substring(0, 11) + '...'
  }else if(text.length <= 11){
    text = text + ''
  }
  return text 
}

const Home = () => {
  const [posts, setPosts] = useState([])
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const category = useLocation().search

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

  const [activeTab, setActiveTab] = useState("All");
  const location = useLocation()
  console.log(location);
  
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab("All")
    }else if (location.pathname === '/?category=cart') {
      setActiveTab("Cart")
    }else if (location.pathname === '/?category=food') {
      setActiveTab("Food")
    }else if (location.pathname === '/?category=blof') {
      setActiveTab("Blof")
    }else if (location.pathname === '/?category=tyme') {
      setActiveTab("Tyme")
    }
  }, [location])
  console.log(posts);
  return (
    <>
    <Header />
    <MDBNavbar expand='lg' light bgColor='light' className="shadow-0 mt-5">
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
          <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 mx-auto'>
          <MDBTypography tag='ul' className='d-flex float-end nav-bar2'>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/' className={`${activeTab === "All" ? "active" : ""} text-dark`} onClick={() => setActiveTab("All")}>All</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=cart' className={`${activeTab === "Cart" ? "active" : ""} text-dark`} onClick={() => setActiveTab("Cart")}>Cart</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=food' className={`${activeTab === "Food" ? "active" : ""} text-dark`} onClick={() => setActiveTab("Food")}>Food</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=blof' className={`${activeTab === "Blof" ? "active" : ""} text-dark`} onClick={() => setActiveTab("Blof")}>Blof</NavLink>
            </MDBTypography>
            <MDBTypography tag='li' className='mx-2'>
              <NavLink to='/?category=tym' className={`${activeTab === "Tyme" ? "active" : ""} text-dark`} onClick={() => setActiveTab("Tyme")}>Tyme</NavLink>
            </MDBTypography>
          </MDBTypography>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <div className='mt-5'>
      <MDBContainer className="text-center">
        <MDBRow>
      {posts.map((post, index) => {
        return (
          <MDBCol size='md-4' key={index} className="mb-4">
              <MDBCard>
                <MDBCardHeader>{post.category}</MDBCardHeader>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay rounded-0'>
                  <MDBCardImage src={`http://localhost:5000/${post.image}`} fluid alt='...' style={{height: '300px'}} />
                    <a>
                      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{postTitle(post.title)}</MDBCardTitle>
                  <MDBCardText>{excerpt(post.desc)}</MDBCardText>
                  <Link to={`/post/${post.post_id}`}><MDBBtn>see more<MDBIcon fas icon="angle-double-right" className="ms-2"/></MDBBtn></Link>
                  <MDBTypography tag='p' className="mt-3">
                    Posted by: {post.author_name}
                  </MDBTypography>
                </MDBCardBody>
                <MDBCardFooter>{moment(post && post.date).fromNow()}</MDBCardFooter>
              </MDBCard>
              </MDBCol>
      )})}
      </MDBRow>
          </MDBContainer>
    </div>
    </>
  )
}

export default Home
