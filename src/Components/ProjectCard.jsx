import React, { useState } from 'react'
import projectpic from '../assets/images/iStock-1135541613.webp'
import { Card,Modal,Row,Col } from 'react-bootstrap'
import {SERVER_URL} from '../services/server_url'

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" height={'200px'} src={`${SERVER_URL}/uploads/${project?.projectImage}`} onClick={handleShow}/>
    <Card.Body>
      <Card.Title>{project?.title}</Card.Title>
      <Card.Text>
        
      </Card.Text>
      
    </Card.Body>
  </Card> 

  <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img className='image-fluid' style={{height:'200px'}} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
          </Col>
          <Col md={6}>
            <h6>{project?.title}</h6>
            <p>Project Overview: {project?.overview}</p>
            <p>Languages Used: <span className='fw-bolder'>{project?.languages}</span></p>
          </Col>
        </Row>
  <div className='mt-3'>
      <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github fa-2x"></i></a>
      <a href={project?.website} target='_blank' className='me-3 btn text-dark'><i class="fa-solid fa-link fa-2x"></i></a>
  </div>

        </Modal.Body>
       
      </Modal>

    </>
  )
}

export default ProjectCard