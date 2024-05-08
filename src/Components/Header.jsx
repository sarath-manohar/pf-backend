import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { TokenAuthenticationContext } from '../context/TokenAuth';

function Header({insideDashBoard}) {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationContext)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <div>
         <Navbar className="bg-info position top-0 w-100">
        <Container>
          <Navbar.Brand >
          <Link to={'/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}  >
          <i className="fa-solid fa-list-check me-2"></i>
            Project-Fair
          </Link>
          </Navbar.Brand>
         { insideDashBoard&&
         <button className='btn align-items-right border text-light' onClick={handleLogout}>Logout</button>
         }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header