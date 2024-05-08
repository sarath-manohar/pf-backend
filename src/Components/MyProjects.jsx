import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteUserProjectAPI, getUserProjectsAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyProjects() {
    const [allProjects,setAllProjects]=useState([])
    const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

    const getUserProjects=async()=>{
        const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    const result = await getUserProjectsAPI(reqHeader)
    if(result.status=== 200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }
    }

    const handleDelete = async(pid)=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await deleteUserProjectAPI(pid,reqHeader)
          if(result.status===200){
            getUserProjects()
          }else{
            toast.warning(result.response.data)
          }

        }catch(err){
          console.log(err);
        }
      }
    }

    useEffect(()=>{
        getUserProjects()
      },[addProjectResponse,editProjectResponse])

  return (
    <>
    <div className='card shadow p-3 mt-3'>
        <div className='d-flex'>
            <h2>My Projects</h2>
        </div>
        <div className='ms-auto'>
            <AddProjects/>
        </div>
        <div className="mt-4">
            {/* collection of user projects */}
            {allProjects.length>0?
            allProjects.map((project,index)=>(
                
                <div className="border d-flex align-items-center rounded p-2">
                <h5>{project?.title}</h5>
                <div className="d-flex icons justify-content-between ms-auto">
                    <EditProject project={project}/>
                    <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github "></i></a>
                    <button className='btn' onClick={()=>handleDelete(project?._id)}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            )):
            <p className='text-danger fw-bolder'>No Projects Uploaded Yet!!!</p>}
        </div>

        <ToastContainer autoClose={3000} position="top-center" theme="colored" />
    </div>
        
    </>
  )
}

export default MyProjects