import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

function UpdateSection(){

    const { id_1, id_2 } = useParams()
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ teacher, setTeacher ] = useState('')
    const [ sectionClass, setSectionClass ] = useState({})
    const [ stclassData, setClassTitle ] = useState([])
    const [ currentClass, setClass ] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/api/singleClass/' + id_2)
            .then((res) => {
                console.log(res.data)
                setSectionClass(res.data)
            })
            .catch(err => {
				console.log(err)
			})

            axios.get('http://localhost:5000/api/singleSection/' + id_1)
            .then((res) => {
                console.log(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setTeacher(res.data.teacher)
            })
            .catch(err => {
				console.log(err)
			})

            axios.get('http://localhost:5000/api/getClasses')
            .then((res) => {
                console.log(res.data)
                setClassTitle(res.data)
                setClass(res.data[0].title)
            })
            .catch(err => {
				console.log(err)
			})

            
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#description').fadeOut(100)
            $('#teacher').fadeOut(100)
            $('#studentClass').fadeOut(100)


        if(title !== '' && description !== '' && teacher !== ''){

            const section = {
                title,
                description,
                teacher,
                currentClass
            }

            axios.post('http://localhost:5000/api/updateSection/' + id_1 , section)
                .then(res => {
                    console.log(res.data)
                    //window.location = '/addSection/' + id
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

            if(teacher === ''){
                $('#teacher').fadeIn(100)
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
                            <h1>Add New Section</h1>
                        </div>

                        <br/>

                        <h3 className={styles.classTitle}>{sectionClass.title}</h3>

                        <br/>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                <form className={styles.formMargin} onSubmit={onSubmit}>

                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) }/>
                                        <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide title for Section.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                        <Form.Text id="description" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide description for Section.
                                        </Form.Text>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Teacher</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Teacher" value={teacher} onChange={ e => setTeacher(e.target.value) } />
                                        <Form.Text id="teacher" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide teacher for Section.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={currentClass} onChange={ e => setClass(e.target.value) } required>
                                            {
                                                 stclassData.map((classIns) => {
                                                     return <option 
                                                        key={classIns.title}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Button className={styles.formButton} type="submit">
                                        
                                        Update Section
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

export default UpdateSection