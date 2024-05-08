import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import {Form,Spinner} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { TokenAuthenticationContext } from '../context/TokenAuth';


function Auth({register}) {
    const{isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationContext)
 const [loginStatus,setLoginStatus]= useState(false)
     const isRegisterForm=register?true:false
  const navigate = useNavigate()
     const [userData,setUserData]=useState({
        username:"",email:"",password:""
     })

   const handleRegister=async(e)=>{
    e.preventDefault()
    console.log(userData);

    const{username,email,password}=userData

    if(!username || !email || !password){
        toast.info("please fill the missing fields")
    }else{
    try{
            // toast.success("proceed to api call")
       const result =await registerAPI (userData)
       console.log(result);
       if(result.status===200){
      
        toast.success(`${result.data.username} has successfully registered`)
        setUserData({username:"",email:"",password:""})
        setTimeout(()=>{
            navigate('/login')
        },3000)
       }else{
        toast.warning(result.response.data)
       }

    }catch(err){
        console.log(err)
    }
    }
   }

   const handleLogin= async(e)=>{
    e.preventDefault()
    const{email,password}=userData

    if(!email || !password){
        toast.info("please fill the missing fields")
    }else{
    try{
            // toast.success("proceed to api call")
       const result =await loginAPI ({email,password})
       console.log(result);
       if(result.status===200){
        setLoginStatus(true)
        
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorized(true)
        setUserData({email:"",password:""})
        setTimeout(()=>{
            navigate('/')
            setLoginStatus(false)
        },2000)
        
       }else{
        toast.warning(result.response.data)
       }

    }catch(err){
        console.log(err)
    }
    }
   }
    

  return (
    <>
        <div style={{width:'100', height:'100vh'}} className='d-flex justify-content-center align-items center mt-5'>
            <div className="w-75 container">
                <Link to={'/'} style={{textDecoration:'none',color:'blue'}}>Back To Home</Link>
            <div className="card shadow p-5 bg-info">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="https://meandmath.com/wp-content/uploads/2022/02/Sign-Up-for-Desired-Courses.png" alt="" 
                       className='rounded-start w-100' />
                    </div>
                    <div className="col-lg-6">
                       <div className="d-flex align-items-center flex-column">
                        <h1 className='fw-bolder text-light mt-2'><i className="fa-solid fa-list-check me-2"></i>Project-Fair</h1>
                        <h5 className='fw-bolder pb-3 mt-4 text-light'>
                            {
                                isRegisterForm?'sign up to your account':'sign in to your account'
                            }
                        </h5>
                        <Form className='text-light w-100'>
                            {
                                isRegisterForm&&
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        
                                <Form.Control type="text" placeholder="username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />  
                                </Form.Group>
                            }
                               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        
                                <Form.Control type="email" placeholder="enter your email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />  
                                 </Form.Group> 
                                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        
                                <Form.Control type="password" placeholder="enter your password" 
                                onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>  
                                         </Form.Group>
                                         {
                                            isRegisterForm?
                                            <div>
                                                <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                                                <p>Already have an account?Click here to <Link to={'/login'} style={{textDecoration:'none',color:'red'}}>Login</Link> </p>
                                            </div>:
                                       <div>
                                     <button onClick={handleLogin} className='btn btn-primary mb-2'>Login {loginStatus&& <Spinner animation="border" variant="warning" />} </button>
                            <p>New User?Click here to <Link to={'/register'} style={{textDecoration:'none',color:'green'}}>Register</Link> </p>
                                     </div>
                                         }

                        </Form>
                       </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={3000} position="top-center" theme="colored"  />
            </div>

        </div>

    </>
  )
}

export default Auth