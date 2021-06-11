import React, { useState } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Button, Form, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.title}</td>
            <td>{props.classIns.totalMarks}</td>
            <td>{props.classIns.obtainedMarks}</td>
            <td>{props.classIns.percentage}</td>
            <td>{props.classIns.testGrade}</td>
            <td><Link to={'/updateGrade/' + props.classIns._id}><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
            <button onClick={() =>  {
                   axios.delete('http://localhost:5000/api/deleteGrade/'+props.classIns._id)
                   .then(response => { 
                       console.log(response.data)
                       window.location = '/viewGrades'
                    });
            }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
        </tr>

    </tbody>
        
    
)

function ViewGrades() {

    const [ admin_no, setAdminNo ] = useState('')
    const [ student, setStudent ] = useState({})
    const [ studentGrades, setStudentGrades ] = useState([])

    const classSectionDataList = () => {
        return studentGrades.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        axios.get('http://localhost:5000/api/singleStudentByRoll/' + admin_no)
        .then(res => {
            console.log(res.data)
            setStudent(res.data)
        })
        .catch(err => console.log('error : ' + err))

        
        axios.get('http://localhost:5000/api/getStudentGrades/' + admin_no)
            .then(res => {
                console.log(res.data)
                setStudentGrades(res.data)
            })
            .catch(err => console.log('error : ' + err))

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
                                    <h1>Student Grade</h1>
                                </div>

                                <br/>



                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>

                            <div className={styles.formStyle}>
                                    
                                        <br/>
                                        <form name="classForm" className={styles.formMargin} onSubmit={onSubmit} noValidate>

                                            <Form.Group>
                                                <Form.Label>Student Admin No</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Enter Admin No" value={admin_no} onChange={ e => setAdminNo(e.target.value) } required/>
                                                <Form.Text id="admin_no" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide Admin No of Student.
                                                </Form.Text>
                                                <Form.Text id="titleCheck" className={styles.authtextF1} style={{display: 'none'}}>
                                                    You have already Updated Grade for this exam.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                View Grade
                                            </Button>
                                            
                                        </form>

                                        <br/>
                                    
                                    
                                </div>
                                
                                <br/>
                                <h1 className={styles.credStyle}>Name : {student.name}</h1>
                                <h1 className={styles.credStyle}>Admin No : {student.admin_no}</h1>

                                <br/>


                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th>Exam Title</th>
                                                <th>Total Marks</th>
                                                <th>Obtained Marks</th>
                                                <th>Percentage</th>
                                                <th>Grade</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        {classSectionDataList()}
                                        
                                    </Table>
                                </div>
                                <br/><br/>

                                <Link style={{height: '45px'}} className={styles.addSecButton} to={ '/gradeReport/' + admin_no }>Print Report</Link>
                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default ViewGrades