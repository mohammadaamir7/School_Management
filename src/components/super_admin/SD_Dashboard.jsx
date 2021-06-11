import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function AdminDashboard(){

    const [ presents, setPresents ] = useState([])
    const [ absents, setAbsents ] = useState([])
    const [ totalStudents, setTotalStudents ] = useState([])
    const [ totalClasses, setTotalClasses ] = useState([])
    const [ totalSections, setTotalSections ] = useState([])
    
    useEffect(() => {

        axios.get('http://localhost:5000/api/getDataCount')
            .then(res => {
                console.log(res.data)

                setTotalClasses(res.data.classes)
                setTotalSections(res.data.sections)
                setTotalStudents(res.data.students)
                setPresents(res.data.prs_count)
                setAbsents(res.data.abs_count)

            }).catch(err => console.log(err))
        
       
    }, [])

    
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
    
        <div className={styles.greyColor}>
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
                                    
                                </div>                            
    
    
                                <br/>
    
                                <div className={styles.Colorhead}>
                                    
                                </div>
                            </Col>    
                        </Row>
                        
    
                        <br/>
    
                        <Row>
                            <Col md='3'>
                                <div className={styles.whiteDiv}>
                                    <h5>Total Classes</h5>
                                    <p>{totalClasses}</p>
                                </div>
                                
                            </Col>

                            <Col md='3'>
                                <div className={styles.whiteDiv}>
                                    <h5>Total Sections</h5>
                                    <p>{totalSections}</p>
                                </div>
                                
                            </Col>

                            <Col md='3'>
                                <div className={styles.whiteDiv}>
                                    <h5>Total Students</h5>
                                    <p>{totalStudents}</p>
                                </div>
                                
                            </Col>

                            <Col md='3'>
                                <div className={styles.whiteDiv}>
                                    <h5>Total Present Students</h5>
                                    <p>{presents}</p>
                                </div>
                                
                            </Col>

                            <Col md='3'>
                                <div className={styles.whiteDiv}>
                                    <h5>Total Absent Students</h5>
                                    <p>{absents}</p>
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

export default AdminDashboard