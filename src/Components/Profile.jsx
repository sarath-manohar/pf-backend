import React, { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);
  return (
    <>
 <div className="card shadow p-5 mt-2 me-2 ">
    <div className="d-flex justify-content-between">
        <h1>Profile</h1>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down fa-beat-fade"></i></button>
    </div>
    <Collapse in={open}>     
    <div className="row justify-content-center mt-3">
     {/* upload profile picture */}
     <label>
        <input type="file" style={{display:'none'}} />
        <img width={'200px'} height={'300px'} src="https://cdn.iconscout.com/icon/free/png-512/avatar-380-456332.png" alt="profile" />
     </label>
     <div className='mt-3'>
        <input type="text" className='form-control' placeholder='github link' />
        <br/>
        <input type="text" className='form-control' placeholder='LinkedIn' />
     </div>
     <div className='mt-3 text-align-center d-grid'>
        <button className='btn btn-success'>Update</button>
     </div>
    </div>
    
    </Collapse>
 </div>

        
    </>
  )
}

export default Profile