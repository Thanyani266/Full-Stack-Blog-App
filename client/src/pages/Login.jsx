import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext)

  const handleChange = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <MDBContainer style={{maxWidth: '600px', marginTop: '10%'}} className='border rounded-5 p-5'>
        <MDBTypography tag='h4' className='text-center mb-5'>User Login</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Username' id='username' type='username' name='username' onChange={handleChange} className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' onChange={handleChange} className='mb-3'/>
        <MDBBtn type='submit' className='w-100'>Login</MDBBtn>
        {err && <p>{err}</p>}  
      </form>
      <MDBCardFooter className='text-muted text-center mt-4'>If you don&apos;t have an account, please register <Link to='/register'>here</Link>.</MDBCardFooter>
    </MDBContainer>
  )
}

export default Login

