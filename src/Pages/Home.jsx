import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../assets/images/alaminxyz.gif'
import ProjectCard from '../Components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'

function Home() {
const navigate = useNavigate()
const [isLoggedIn,setIsLoggedIn]=useState(false)
const [homeProjects,setHomeProjects]=useState([])


const getHomeProject =async ()=>{
  const result = await getHomeProjectsAPI()
  if(result.status===200){
    setHomeProjects(result.data)
  }else{
    console.log(result);
  }
}

console.log(homeProjects);

useEffect(()=>{
  getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
},[])

const handleProjectsPage =()=>{
  if(sessionStorage.getItem("token")){
    navigate('/projects')
  }else{
    toast.warning("please login")
  }
}

  return (
    <>
      <div style={{width:'100%', height:'90vh'}} className='container-fluid rounded bg-info'>
        <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
                <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'><i className="fa-solid fa-list-check me-2"></i> Project-Fair</h1>
                <p className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ea ab fugit cum et tempore quia cumque, cupiditate impedit amet esse excepturi repellendus incidunt. Deserunt commodi sint delectus vero eius.</p>
                {isLoggedIn?
                  <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
                <Link to={'/login'} className='btn btn-warning'>Start to Explore</Link>}
            </Col>
            <Col sm={12} md={6} >
   <img width={'500px'} src={titleimage} alt="noimage" />
            </Col>
        </Row>

      </div>

      {/* all projects */}
      <div className='allprojects mt-5'>
        <h1 className='text-center'>Explore Your Projects</h1>
        <marquee scrollAmount ={25} >
        <Row>
           {homeProjects.length>0?homeProjects.map((project,index)=>(
            <Col key={index} sm={12} md={6} lg={4}>
            <ProjectCard project={project}/>
            </Col>
           )):null }
       
        </Row>
        </marquee>
      <div className='d-flex justify-content-center mt-5 btn'><p onClick={handleProjectsPage} >View More Projects</p></div>
      <ToastContainer autoClose={3000} position="top-center" theme="colored"  />
      </div>



    </>
  )
}

export default Home