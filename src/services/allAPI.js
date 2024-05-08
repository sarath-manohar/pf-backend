import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"


// register

export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/register`,user,"")
}

// loginAPI

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/login`,user,"")
}

// addProjectApi

export const addprojectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/addprojects`,reqBody,reqHeader)
}

// homeProjectsAPI

export const getHomeProjectsAPI = async()=>{
    return await commonAPI('GET',`${SERVER_URL}/homeprojects`,"","")
}

// allUserProjectsAPI

export const getAllUserProjectsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/alluserprojects?search=${searchKey}`,"",reqHeader)
}

// UserProjectsAPI

export const getUserProjectsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/userprojects`,"",reqHeader)
}

// editUserProject

export const editUserProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/projects/edit/${id}`,reqBody,reqHeader)
}

// deleteuserproject

export const deleteUserProjectAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/projects/remove/${id}`,{},reqHeader)
}
