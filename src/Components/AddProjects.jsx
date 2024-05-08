import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';



function AddProjects() {

  const [show, setShow] = useState(false);

  const handleClose = () =>  {
    setShow(false);
    setProjectData({
      title:"",languages:"",github:"",website:"",overview:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);
 
  // get Context
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

  const[preview,setPreview]=useState("")
  const[fileStatus,setFileStatus]=useState(false)
  const [projectData,setProjectData]=useState({
    title:"",languages:"",github:"",website:"",overview:"",projectImage:""
  })

  console.log(projectData);

useEffect(()=>{
  if(projectData.projectImage.type=="image/png"||projectData.projectImage.type=="image/jpg"||projectData.projectImage.type=="image/jpeg"){
    console.log("generate url");
    setPreview(URL.createObjectURL(projectData.projectImage));
    setFileStatus(false)
  }else{
    console.log("upload the following file formats (jpg,png,jpeg)");
    setFileStatus(true)
    setPreview("")
    setProjectData({...projectData,projectImage:""})
  }


},[projectData.projectImage])

const handleAddProject=async()=>{
  const{title,languages,github,website,overview,projectImage}=projectData
  if( !title || !languages || !github || !website || !overview || !projectImage){
    toast.info("please fill the missing fields")
  }else{
    // proceed to api call
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
    // api call header
   const token =sessionStorage.getItem("token")
   if(token){
    const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
        // api call
        try{
          const result = await addprojectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }

        }catch(err){
          console.log(result);
        }
   }

  }
}

  return (
    <div>
<Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
            <div className="col-6">
            <label>
            <input type="file" style={{ display: "none" }} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
            <img
              width={"300px"}
              src={preview?preview:"https://th.bing.com/th/id/OIP.UvI8fDqx_u8rYtLPh9c6iQHaHa?rs=1&pid=ImgDetMain"}
              alt=""
            />
          </label>
         {fileStatus&& <div className="mt-2 text-danger">upload the following file formats (jpg/png/jpeg) only</div>}
            </div>
            <div className="col-6">
           <div className="mb-3">
            <input type="text" className='form-control' placeholder='Project Title' 
            value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
           </div>
           <div className="mb-3">
            <input type="text" className='form-control' placeholder='Languages Used' 
             value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
           </div>

           <div className="mb-3">
            <input type="text" className='form-control' placeholder='Github' 
             value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />
           </div>
           <div className="mb-3">
            <input type="text" className='form-control' placeholder='Website Link'
             value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
           </div>
           <div className="mb-3">
            <input type="text" className='form-control' placeholder='Project Overview' 
             value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
           </div>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} position="top-center" theme="colored"  />
    </div>
  )
}

export default AddProjects