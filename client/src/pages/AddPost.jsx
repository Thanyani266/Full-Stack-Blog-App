import {useContext, useState} from 'react'
import axios from 'axios'
import {MDBInput, MDBTextArea} from 'mdb-react-ui-kit'
import {toast} from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech']

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState('')
  const [category, setCategory] = useState('')
  const {currentUser} = useContext(AuthContext)
  const date = new Date().toLocaleString()

  const addPost = async (data) => {
    const response = await axios.post('http://localhost:5000/api/posts', data)
    if (response.status === 200) {
        toast.success(response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('author_id', currentUser.user_id);
    formData.append('file', file);
    formData.append('category', category);
    formData.append('date', date);
    
    if (!title || !desc || !file || !category) {
        toast.error("Please provide value into each input field")
    }else{
        addPost(formData);
        window.location.href = '/'
    } 
  }

  return (
    <div className='mx-5'>
      <form style={{margin: '15% 20%'}} onSubmit={handleSubmit}>
        <MDBInput label='Title' id='title' type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)} className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} value={desc} onChange={(event) => setDesc(event.target.value)} className='mb-2'/>
        <MDBInput id='file' type='file' onChange={(event) => setFile(event.target.files[0])} className='mb-2'/>
        <select className='form-select mb-2' onChange={(event) => setCategory(event.target.value)}>
          <option>Please Select Category</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <MDBInput type='submit' value="Add" className='btn'/>    
    </form>
    </div>
  )
}

export default AddPost
