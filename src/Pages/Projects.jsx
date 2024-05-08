import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getAllUserProjectsAPI } from '../services/allAPI'

function Projects() {
const [allProjects,setAllProjects]=useState([])
const [searchKey,setSearchKey]=useState("")

const getAllProjects = async()=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    const result = await getAllUserProjectsAPI(searchKey,reqHeader)
    if(result.status=== 200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }
}
console.log(allProjects);

useEffect(()=>{
  getAllProjects()
},[searchKey])



  return (
    <>
      <Header/>
      
  <div style={{marginTop:'100px'}} className='projects'>
    <h1 className='text-center mb-5'>All-Projects</h1>
  <div className="d-flex justify-content-center align-items-center w-100">
    <div className="d-flex border w-50 rounded mb-3">
      <input type="text" placeholder='search projects by technologies' className='form-control' onChange={e=>setSearchKey(e.target.value)} />
      <i class="fa-solid fa-magnifying-glass p-2 fs-5"></i>
    </div>
  </div>

  <Row className='mt-5 container-fluid'>
    {allProjects?.length>0?
    allProjects.map((project,index)=>(
<Col key={index} sm={12} md={6} lg={4}>
     <ProjectCard project={project}/>
    </Col>
    )):<div className='text-danger fs-3 fw-bolder' >Nothing to Display</div>
      }
  </Row>
  </div>


    </>
  )
}

export default Projects