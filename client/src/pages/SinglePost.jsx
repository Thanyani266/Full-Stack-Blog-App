import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import { MDBInput } from "mdb-react-ui-kit"

const SinglePost = () => {
    const [post, setPost] = useState({});
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
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

      console.log(post);
      const getComments = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/comments/${postId}`)
            return res.data
          } catch (err) {
            console.log(err);
          }
        }
      const x = getComments()
      console.log(x);

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

      {/* 👇️ show elements on click */}
      {isShown && (
        <div>
          <form style={{margin: '15% 20%'}} onSubmit={handleSubmitComment}>
        <MDBInput label='Add your comment' id='comment' type='text' name='comment' value={comment} onChange={(event) => setComment(event.target.value)} className='mb-2'/>
        
        <MDBInput type='submit' value="Post" className='btn'/>    
    </form>
        </div>
      )}

      {/* 👇️ show component on click */}
      {isShown && <h1>Box</h1>}
    </div>
          </> : ""}
        </div>
    </div>
  )
}

export default SinglePost
