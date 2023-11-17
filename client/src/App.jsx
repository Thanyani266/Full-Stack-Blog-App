import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SinglePost from "./pages/SinglePost"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/post/:id" element={ <SinglePost/> } />
        <Route path="/add" element={ <AddPost/> } />
        <Route path="/edit/:id" element={ <EditPost/> } />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
