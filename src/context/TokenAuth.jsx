import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthenticationContext = createContext()


function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized]=useState(false)

useEffect(()=>{
 if(sessionStorage.getItem("token")){
    setIsAuthorized(true)
 }else{
    setIsAuthorized(false)
 }
},[isAuthorized])

  return (
    <>
    <TokenAuthenticationContext.Provider value={{isAuthorized,setIsAuthorized}}>
    {children}
    </TokenAuthenticationContext.Provider>
    </>
  )
}

export default TokenAuth