import React, { useState } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

function SAdashboard() {
    

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ incharge, setIncharge ] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
        

        
            $('#description').fadeOut(100)
        
        
        


        if(title !== '' && description !== '' && incharge !== ''){


            const classObj = {
                title,
                description,
                incharge
            }

            axios.post('http://localhost:5000/api/addClass', classObj)
                .then(res => {
                    console.log(res.data)
                    window.location = '/'
                })
                .catch(err => console.log('error : ' + err))
        }else{
            document.classForm.classList.add('was-validated')
            if(title === ''){
                $('#title').fadeIn(100)
            }

            if(description === ''){
                $('#description').fadeIn(100)
            }

            if(incharge === ''){
                $('#incharge').fadeIn(100)
            }
            
            
        }
    }

    return (
        <>

        <Navbar className={styles.respNav} expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color: '#ffffff'}}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        <div className={styles.overflow}>
            <div className={styles.background}>
                <div className={styles.topSet}>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                </div>
            </div>

            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Add New Class</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                <form name='classForm' className={[styles['formMargin'] , 'needs-validation'].join(' ')} onSubmit={onSubmit} noValidate>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name='title' className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required/>
                                        <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide title for Class.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } required/>
                                        <Form.Text id="description" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide description for Class.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Class Incharge</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Class Incharge" value={incharge} onChange={ e => setIncharge(e.target.value) } required/>
                                        <Form.Text id="incharge" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Class Incharge name for Class.
                                        </Form.Text>
                                    </Form.Group>

                                    <Button className={styles.formButton} type="submit">
                                        
                                        Add New Class
                                    </Button>
                                    
                                </form>

                                <br/>
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
        
        

        
        </>
    )
}

export default SAdashboard