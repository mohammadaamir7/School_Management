import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';


function ManageTimetable() {

    const [ title, setTitle ] = useState('')
    const [ day, setDay ] = useState('monday')
    const [ lecStart, setLecStart ] = useState(8)
    const [ lecEnd, setLecEnd ] = useState(9)
    const [ teacherName, setTeacherName ] = useState('')
    const [ timetableData, setTimetable ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/getTimetable')
            .then(res => {
                setTimetable(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#teacherName').fadeOut(100)
            $('#lecStart').fadeOut(100)
            $('#lecEnd').fadeOut(100)
            
      
        var flag = true

        var diff = 0
        diff = lecEnd - lecStart


        if(title !== '' && teacherName !== '' && lecEnd > lecStart && diff == 1 || (lecStart == 9 && lecEnd == 10)){

            timetableData.forEach(element => {
                
                if(element.day === day){
                    if(element.lecStart == lecStart){
                        flag = false
                    }
                }else{
                    flag = true
                }
            })

            

            if(flag === true){
                
                const lecture = {
                    title,
                    lecStart,
                    lecEnd,
                    teacherName,
                    day
                }
                
    
                axios.post('http://localhost:5000/api/addLecture', lecture)
                    .then(res => {
                        console.log(res.data)
                        window.location = '/viewTimetable'
                    })
                    .catch(err => console.log('error : ' + err))
            }else if(flag === false){
                console.log('false flag')
                alert('This time slot is already filled with a lecture.')
            }

            
        }else{
            document.classForm.classList.add('was-validated')
            if(title === ''){
                $('#title').fadeIn(100)
            }

            if(teacherName === ''){
                $('#teacherName').fadeIn(100)
            }

            // if(lecStart === 0){
            //     $('#lecStart').fadeIn(100)
            // }

            // if(lecEnd === 0){
            //     $('#lecEnd').fadeIn(100)
            // }
            
            if(lecStart > lecEnd){
                
                alert('Start TIme is greater than End Time')
            }

            if(lecStart == lecEnd){
                alert('Start TIme and End Time are same')
            }

            if(diff > 1){
                alert('Duration of lecture is more than one hour.')
            }
            // if(lecStart === 0 || lecEnd === 0){
            //     alert('Start TIme or End Time is not valid')
            // }
            
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
                                    <h1>Add New Lecture</h1>
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
                                                <Form.Label>Lecture Title</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required/>
                                                <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide title for Lecture.
                                                </Form.Text>
                                                <Form.Text id="titleCheck" className={styles.authtextF1} style={{display: 'none'}}>
                                                    You have already Added this Lecture.
                                                </Form.Text>
                                            </Form.Group> 

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Day</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={day} onChange={ e => setDay(e.target.value) } required>
                                                    <option value='monday'>Monday</option>
                                                    <option value='tuesday'>Tuesday</option>
                                                    <option value='wednesday'>Wednesday</option>
                                                    <option value='thursday'>Thursday</option>
                                                    <option value='friday'>Friday</option>
                                                    
                                                    
                                                </Form.Control>
                                                <Form.Text id="lecEnd" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide End Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Teacher Name</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Teacher" value={teacherName} onChange={ e => setTeacherName(e.target.value) } required />
                                                <Form.Text id="teacherName" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide teacher name for this lecture.
                                                </Form.Text>
                                            </Form.Group>


                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Start Time</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={lecStart} onChange={ e => setLecStart(e.target.value) } required>
                                                    <option value='8'>8 : 00 am</option>
                                                    <option value='9'>9 : 00 am</option>
                                                    <option value='10'>10 : 00 am</option>
                                                    <option value='11'>11 : 00 am</option>
                                                    <option value='12'>12 : 00 pm</option>
                                                    <option value='13'>1 : 00 pm</option>
                                                    
                                                </Form.Control>
                                                <Form.Text id="lecStart" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide Start Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>End Time</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={lecEnd} onChange={ e => setLecEnd(e.target.value) } required>
                                                    <option value='9'>9 : 00 am</option>
                                                    <option value='10'>10 : 00 am</option>
                                                    <option value='11'>11 : 00 am</option>
                                                    <option value='12'>12 : 00 pm</option>
                                                    <option value='13'>1 : 00 pm</option>
                                                    <option value='14'>2 : 00 pm</option>
                                                    
                                                </Form.Control>
                                                <Form.Text id="lecEnd" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide End Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                Add Lecture
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

export default ManageTimetable