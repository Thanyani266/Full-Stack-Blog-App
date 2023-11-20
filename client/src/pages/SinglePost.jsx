import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import { MDBInput,
MDBContainer,
MDBTypography,
MDBCard,
MDBCardBody,
MDBCardTitle,
MDBCardText,
MDBCardImage,
MDBIcon,
MDBBtn
} from "mdb-react-ui-kit"

const SinglePost = () => {
    const [post, setPost] = useState({});
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState({})
    const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
            setPost(res.data);
          } catch (err) {
            console.log(err);
          }
        }
    
        fetchData();
      }, [postId])

      console.log(post)
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
            setComments(res.data);
          } catch (err) {
            console.log(err);
          }
        }
    
        fetchComments();
      }, [postId])

      const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`);
            navigate('/')
          } catch (err) {
            console.log(err);
          }
      }
    
      const addComment = async (data) => {
        const response = await axios.post(`http://localhost:5000/api/comments`, data)
        if (response.status === 200) {
            toast.success(response.data);
        }
      }

      const handleSubmitComment = (event) => {
        event.preventDefault();
        const commentData = new FormData();
        commentData.append('comment', comment);
        commentData.append('content_id', postId);
        commentData.append('account_id', post.author_id);
        commentData.append('writer_id', currentUser.user_id)
        const val = {
          comment: commentData.get('comment'),
          content_id: commentData.get('content_id'),
          account_id: commentData.get('account_id'),
          writer_id: commentData.get('writer_id')
        }
        console.log(val);
        
        if (!comment) {
            toast.error("Please provide value into each input field")
        }else{
            addComment(val);
            window.location.reload()
        } 
      }
  return (
    <div className='mt-5'>
      <MDBContainer breakpoint="md">
      <MDBCard className='mb-3'>
      <MDBCardBody>
          <MDBCardTitle className='text-center'>{post && post.title}</MDBCardTitle>
        </MDBCardBody>
        <MDBCardImage position='top' className='rounded-0' src={`http://localhost:5000/${post && post.image}`} alt='...' />
        <MDBCardBody>
          <MDBTypography tag='p' className='bg-secondary align-items-center py-3 px-2'>
          <span><MDBIcon fas icon="calendar-day" className='me-2'/>{moment(post && post.date).format('llll')}</span>
          <span className='float-end'>
          {currentUser && currentUser.username === (post && post.username) ? <>
          <Link className='btn text-dark' to={`/edit/${postId}`} state={post}>Edit</Link>
          <span className='btn' onClick={handleDelete}>delete</span></>: ""}
          </span>
          </MDBTypography>
          <MDBTypography tag='p' className='text-muted'>Author: <span className='text-capitalize text-secondary'>{post && post.username}</span></MDBTypography>
          <hr className="hr hr-blurry" />
          <MDBCardText>
            {post && post.desc}
          </MDBCardText>
          <hr className="hr hr-blurry" />
          <MDBCardText>
            <small className='text-muted'>
              <MDBBtn onClick={handleClick}>Comments ({comments ? comments.length : 0})<MDBIcon fas icon="angle-double-down" /></MDBBtn>
              {/* 👇️ show elements on click */}
      {isShown && (
        <div style={{width: '70%'}} className='mt-2 mb-3'>
          <form onSubmit={handleSubmitComment}>
        <MDBInput label='Add your comment' id='comment' type='text' name='comment' value={comment} onChange={(event) => setComment(event.target.value)} className='mb-2'/>
        
        <MDBInput type='submit' value="Post" className='btn'/>    
    </form>
        </div>
      )}
      {/* 👇️ show component on click */}
      {isShown && comments?.map((item, index) => {
        return (
          <MDBCard key={index} className="mb-2">
            <MDBCardBody>
              <MDBTypography><MDBIcon fas icon="user-alt" /><span className="text-capitalize ms-1">ndwamato</span><span className="text-muted float-end">3 weeks ago</span></MDBTypography>
              <MDBCardBody className="bg-danger bg-opacity-25">
              <MDBCardText>{item.comment}</MDBCardText>
              </MDBCardBody>
            </MDBCardBody>
          </MDBCard>)
      })}
         
          
            </small>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
      </MDBContainer>
      
        <div>
          <h1>{post && post.title}</h1>
          <span>{post && post.desc}</span>
          <h5>{post && post.username}</h5>
          <h6>Posted: {moment(post && post.date).fromNow()}</h6>
          {currentUser && currentUser.username === (post && post.username) ? <>
          <Link to={`/edit/${postId}`} state={post}>edit</Link>
          <button onClick={handleDelete}>delete</button>
          <div>
      <button onClick={handleClick}>Click</button>
    </div>
          </> : ""}
        </div>
    </div>
  )
}

export default SinglePost
