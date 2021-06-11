import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

function AddStudent(){

    const [ name, setName ] = useState('')
    const [ admin_no, setAdminno ] = useState('')
    const [ phone, setPhone ] = useState()
    const [ email, setEmail ] = useState('')
    const [ studentClass, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ roll_no, setRollno ] = useState('')
    const [ father_name, setFathername ] = useState('')
    const [ father_num, setFathernum ] = useState()
    const [ login_email, setLoginemail ] = useState('')
    const [ stclassData, setClassTitle ] = useState([])
    const [ sectionData, setSectionTitle ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/getClasses')
            .then((res) => {
                console.log(res.data)
                setClassTitle(res.data)
                setClass(res.data[0].title)

                axios.get('http://localhost:5000/api/changeSections/' + res.data[0].title)
                .then((res) => {
                    console.log(res.data)
                    setSectionTitle(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            })
            .catch(err => {
				console.log(err)
			})

            // axios.get('http://localhost:5000/api/getSections')
            // .then((res) => {
            //     console.log(res.data)
            //     setSectionTitle(res.data)
            //     setSection(res.data[0].title)
            // })
            // .catch(err => {
			// 	console.log(err)
			// })

            
    }, [])

    const changeSections = (e) => {
        setClass( e.target.value )

        axios.get('http://localhost:5000/api/changeSections/' + e.target.value)
        .then((res) => {
            console.log(res.data)
            setSectionTitle(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }

    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#name').fadeOut(100)
            $('#admin_no').fadeOut(100)
            $('#phone').fadeOut(100)
            $('#email').fadeOut(100)
            $('#studentClass').fadeOut(100)
            $('#section').fadeOut(100)
            $('#roll_no').fadeOut(100)
            $('#father_name').fadeOut(100)
            $('#father_num').fadeOut(100)
            $('#login_email').fadeOut(100)
        
        
        


        if(name !== '' && admin_no !== '' && phone !== '' && email !== '' && studentClass !== '' && section !== '' && roll_no!== '' && father_name !== '' && father_num !== '' && login_email !== ''){


            const student = {
                name,
                admin_no,
                phone,
                email,
                studentClass,
                section,
                roll_no,
                father_name,
                father_num,
                login_email,
            }

            axios.post('http://localhost:5000/api/addStudent', student)
                .then(res => console.log(res.data))
                .catch(err => console.log('error : ' + err))
        }else{
            document.classForm.classList.add('was-validated')
            if(name === ''){
                $('#name').fadeIn(100)
            }

            if(admin_no === ''){
                $('#admin_no').fadeIn(100)
            }

            if(phone === ''){
                $('#phone').fadeIn(100)
            }

            if(email === ''){
                $('#email').fadeIn(100)
            }

            if(studentClass === ''){
                $('#studentClass').fadeIn(100)
            }

            if(section === ''){
                $('#section').fadeIn(100)
            }

            if(roll_no === ''){
                $('#roll_no').fadeIn(100)
            }

            if(father_name === ''){
                $('#father_name').fadeIn(100)
            }

            if(father_num === ''){
                $('#father_num').fadeIn(100)
            }

            if(login_email === ''){
                $('#login_email').fadeIn(100)
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
                            <h1>Add New Student</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                <form name='classForm' className={[styles['formMargin'] , 'needs-validation'].join(' ')} onSubmit={onSubmit} noValidate>

                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Name" value={name} onChange={ e => setName(e.target.value) } required/>
                                        <Form.Text id="name" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Name for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicAdminno">
                                        <Form.Label>Administration Number</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Administration Number" value={admin_no} onChange={ e => setAdminno(e.target.value) } required />
                                        <Form.Text id="admin_no" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Administration Number for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Phone Number" value={phone} onChange={ e => setPhone(e.target.value) } required />
                                        <Form.Text id="phone" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Phone Number for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className={styles.formField} type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) } required />
                                        <Form.Text id="email" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Email for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={studentClass} onChange={ changeSections } required>
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

                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                            {
                                                 sectionData.map((classIns) => {
                                                     return <option 
                                                        key={classIns.title}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicRollno">
                                        <Form.Label>Roll No</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Roll No" value={roll_no} onChange={ e => setRollno(e.target.value) } required />
                                        <Form.Text id="roll_no" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Roll No for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicFathername">
                                        <Form.Label>Father Name</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Father Name" value={father_name} onChange={ e => setFathername(e.target.value) } required />
                                        <Form.Text id="father_name" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Father's Name of Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicFathernum">
                                        <Form.Label>Father Number</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Father Number" value={father_num} onChange={ e => setFathernum(e.target.value) } required />
                                        <Form.Text id="father_num" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Father's Number of Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicLoginemail">
                                        <Form.Label>Login Email</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Login Email" value={login_email} onChange={ e => setLoginemail(e.target.value) } required />
                                        <Form.Text id="login_email" className={styles.authtextF2}  style={{display: 'none'}}>
                                            Please provide Login Email for Student.
                                        </Form.Text>
                                    </Form.Group>

                                    <Button className={styles.formButton} type="submit">
                                        
                                        Add Student
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

export default AddStudent