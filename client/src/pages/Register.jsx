import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: ""
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (event) => {
      setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        await axios.post("http://localhost:5000/api/auth/register", inputs)
        navigate('/login')
      } catch (err) {
        setError(err.response.data)
      }
    }
    
  return (
    <MDBContainer style={{maxWidth: '600px', marginTop: '8%'}} className='border rounded-5 p-5'>
        <MDBTypography tag='h4' className='text-center mb-5'>User Registration</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Username' id='username' type='text' name='username' onChange={handleChange} className='mb-3'/>
        <MDBInput label='Email' id='email' type='email' name='email' onChange={handleChange} className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' onChange={handleChange} className='mb-3'/>
        <MDBBtn type='submit' className='w-100'>Register</MDBBtn>
        {err && <p>{err}</p>} 
      </form>
      <MDBCardFooter className='text-muted text-center mt-4'>Already have an account? Login <Link to='/login'>here</Link>.</MDBCardFooter>
    </MDBContainer>
  )
}

export default Register

