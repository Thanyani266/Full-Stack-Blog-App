import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {MDBInput, MDBTextArea} from 'mdb-react-ui-kit'
import {toast} from 'react-toastify'

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech']

const EditPost = () => {
  const navigate = useNavigate()
  const state = useLocation().state
  const [title, setTitle] = useState(state?.title)
  const [desc, setDesc] = useState(state?.desc)
  const [category, setCategory] = useState(state?.category)

  const postId = state.post_id

  const updatePost = async (id) => {
    const response = await axios.put(`http://localhost:5000/api/posts/${id}`, {
      title,
      desc,
      category
    })
    if (response.status === 200) {
        toast.success(response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!title || !desc || !category) {
        toast.error("Please provide value into each input field")
    }else{
        if(postId) {
            updatePost(postId)
        }
        navigate('/')
    } 
  }
  
  return (
    <div className='mx-5'>
      <form style={{margin: '20%'}} onSubmit={handleSubmit}>
        <MDBInput label='Title' id='title' type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)} className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} value={desc} onChange={(event) => setDesc(event.target.value)} className='mb-2'/>
        <select className='form-select mb-2' defaultValue={category} onChange={(event) => setCategory(event.target.value)}>
          <option>{category}</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <MDBInput type='submit' value="Update" />    
    </form>
    </div>
  )
}

export default EditPost
