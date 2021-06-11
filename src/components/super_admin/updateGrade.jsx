import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';


function UpdateGrade() {

    const { id } = useParams()
    const [ grade, setGrade ] = useState({})
    const [ title, setTitle ] = useState('')
    const [ totalMarks, setTotalMarks ] = useState(0)
    const [ obtainedMarks, setObtainedMarks ] = useState(0)
    const [ gradesTitles, setGradesTitles ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/singleGrade/' + id)
        .then((res) => {
            console.log(res.data)
            setGrade(res.data)
            setTitle(res.data.title)
            setTotalMarks(res.data.totalMarks)
            setObtainedMarks(res.data.obtainedMarks)
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://localhost:5000/api/getGradestitles/' + id)
        .then((res) => {
            console.log(res.data)
            setGradesTitles(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])


    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#totalmarks').fadeOut(100)
            $('#obtainedmarks').fadeOut(100)
            $('#titleCheck').fadeOut(100)
            
      
        var flag = false

        gradesTitles.forEach(element => {
            if(element === title.toLowerCase()){
                flag = true
            }
        })

        if(title !== '' && totalMarks != 0 && obtainedMarks != 0 && flag === false && totalMarks >= obtainedMarks){



            const section = {
                title,
                totalMarks,
                obtainedMarks,
                // student_id: student._id,
                // student_admin_no: student.admin_no,
                // student_name: student.name,
            }

            axios.post('http://localhost:5000/api/updateGrade/' + id, section)
                .then(res => {
                    console.log(res.data)
                    window.location = '/viewGrades'
                })
                .catch(err => console.log('error : ' + err))
        }else{
            document.classForm.classList.add('was-validated')
            if(title === ''){
                $('#title').fadeIn(100)
            }

            if(totalMarks === 0){
                $('#totalmarks').fadeIn(100)
            }

            if(obtainedMarks === 0){
                $('#obtainedmarks').fadeIn(100)
            }

            if(flag === true){
                $('#titleCheck').fadeIn(100)
            }
            
            if(totalMarks < obtainedMarks){
                alert('Total Marks are less than Obtained Marks')
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
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Update Grade</h1>
                                </div>

                                
                                
                            </Col>    
                        </Row>

                        
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.formStyle}>
                                    <div className={styles.Border}>
                                        <br/>
                                        <form name="classForm" className={styles.formMargin} onSubmit={onSubmit} noValidate>

                                            <Form.Group>
                                                <Form.Label>Grade Title</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required/>
                                                <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide title for Grade.
                                                </Form.Text>
                                                <Form.Text id="titleCheck" className={styles.authtextF1} style={{display: 'none'}}>
                                                    You have already Updated Grade for this exam.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Total Marks</Form.Label>
                                                <Form.Control className={styles.formField} type="number" placeholder="Total" value={totalMarks} onChange={ e => setTotalMarks(e.target.value) } required />
                                                <Form.Text id="totalmarks" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide total marks for Grade.
                                                </Form.Text>
                                            </Form.Group>


                                            <Form.Group>
                                                <Form.Label>Obtained Marks</Form.Label>
                                                <Form.Control className={styles.formField} type="number" placeholder="Obtained" value={obtainedMarks} onChange={ e => setObtainedMarks(e.target.value) } required />
                                                <Form.Text id="obtainedmarks" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide obtained marks for Grade.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                Update Grade
                                            </Button>
                                            
                                        </form>

                                        <br/>
                                    </div>
                                    
                                </div>

                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default UpdateGrade