import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

function Attendance(){

    const [ stclassData, setClassTitle ] = useState([])
    const [ studentClass, setClass ] = useState('')
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

    return(
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
                                <h1>Attendance</h1>
                            </div>

                            <br/>

                            <div className={styles.tableMargin}>
                                <Form.Group controlId="formBasicstudentClass">
                                    <Form.Label>Select Class</Form.Label>
                                    <Form.Control className={styles.formField2} as="select" value={studentClass} onChange={ changeSections } required>
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
                            </div>

                            <br/>

                            <div className={styles.backBar}>
                                <h1>Sections</h1>
                            </div>
                        </Col>    
                    </Row>
                    

                    <br/>

                    <Row>
                        <Col>

                            

                            <div className={styles.tableMargin}>

                                

                              



                                <Table className={styles.tableWidth} responsive='sm'>
                                    {/* <thead>
                                        <tr>
                                            <th className={styles.tableHeading}>Title</th>
                                            <th className={styles.tableHeading}>Total Students</th>
                                            <th className={styles.tableHeading}>Class Teacher</th>
                                            <th className={styles.tableHeading}>Actions</th>
                                        </tr>
                                    </thead> */}

                                    <tbody>
                                        <tr>
                                            {
                                                    sectionData.map((classIns) => {
                                                        return <td 
                                                        key={classIns.title}
                                                        value={classIns.title}>
                                                            <Link to={'/sectionAttendance/' + classIns._id + '/' + classIns.class_id} className={styles.attendancelink}>{classIns.title}</Link>
                                                    </td>;
                                                    })
                                            }
                                        </tr>
                                    </tbody>

                                    
                                    
                                </Table>
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

export default Attendance