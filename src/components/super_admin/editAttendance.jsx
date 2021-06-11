import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditAttendance(){

    const { title_s, title_c } = useParams()
    var [ presents, setPresents ] = useState([])
    var [ absents, setAbsents ] = useState([])
    const [ totalStudents, settotalStudents ] = useState([])
    const [ presentStudents, setPresentStudents ] = useState([])
    const [ absentStudents, setAbsentStudents ] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array()
    );
    const [ todayDate, setTodayDate ] = useState(new Date())
    const [ today, setToday ] = useState(false)
    
    useEffect(() => {
        var date = ''
        var yr = new Date(todayDate).getFullYear()
        var mn = new Date(todayDate).getMonth() + 1
        var dy = new Date(todayDate).getDate()
        date = yr + '-' + mn + '-' + dy
        

        setPresents([])
        setAbsents([])
        settotalStudents([])

        axios.get('http://localhost:5000/api/getDayAttendance/' + title_s + '/' + title_c + '/' + date)
            .then(res => {
                
                if(res.data.presentStudents){
                    setToday(true)
                    console.log('res' + res.data) 
                    
                    
                    
                    res.data.presentStudents.forEach(student => {
                        presents.push(student)
                    })

                    res.data.absentStudents.forEach(student => {
                        absents.push(student)
                    })


                    var studentAttendance = []

                    presents.forEach(student => {
                        const atObj = {
                            admin_no: student.admin_no,
                            name: student.name,
                            _id: student._id,
                            status: true,
                        }

                        studentAttendance.push(atObj)
                    })

                    absents.forEach(student => {
                        const atObj = {
                            admin_no: student.admin_no,
                            name: student.name,
                            _id: student._id,
                            status: false,
                        }

                        studentAttendance.push(atObj)
                    })

                    studentAttendance.sort((a, b) => (a.admin_no > b.admin_no) ? 1 : -1)
                    
                    var checkArray = []
                    for(var ind = 0; ind < studentAttendance.length; ind++){
                        checkArray.push(studentAttendance[ind].status)
                    }
                
                    setCheckedState(checkArray)
                    
                    settotalStudents(studentAttendance)

                }else{
                    setToday(false)
                }
 
                
            })
        
       
    }, [todayDate])

    const handleOnChange = (position, admin_no, name, id) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);

        var status = !checkedState[position]

        if(status === true){
            
            totalStudents.forEach((element, index) => {
                if(element.admin_no === admin_no && element.status === false){
                    element.status = true
                }
            })
        }
        else if(status === false){
            
            totalStudents.forEach((element, index) => {
                if(element.admin_no === admin_no && element.status === true){
                    element.status = false
                }
            })
        }
        
        
      };

    

    const studentList = () => {
        
        
        return totalStudents.map((currentstudent, index) => (
        
        <tbody>
            <tr>
                <td>{currentstudent.admin_no}</td>
                <td>{currentstudent.name}</td>
                

                <td>
                    {currentstudent.status === true ? <td style={{color:'green', paddingLeft: '5%'}}>P</td> : <td style={{color:'red',  paddingLeft: '5%'}}>A</td>}
                </td>

                <td>
                    <Form.Check                            
                        type="checkbox"
                        name={currentstudent.name}
                        value={currentstudent.name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index, currentstudent.admin_no, currentstudent.name, currentstudent._id)}
                    />
                </td>
                
                
            </tr>

        </tbody>
        
        ))
        
        
    }

    const noAtt = () => {
        return <h1>This Date's Attendance has not been taken<br/><br/></h1>
    }

    const submitAttendance = () => {
        
        totalStudents.forEach(element => {
            if(element.status === true){
                var obj = {
                    admin_no: element.admin_no,
                    name: element.name
                }
                presentStudents.push(obj)
            }else if(element.status === false){
                var obj = {
                    admin_no: element.admin_no,
                    name: element.name
                }
                absentStudents.push(obj)
            }
        })


        var date = ''
        var yr = new Date(todayDate).getFullYear()
        var mn = new Date(todayDate).getMonth() + 1
        var dy = new Date(todayDate).getDate()
        date = yr + '-' + mn + '-' + dy

        const attendanceIns = {
            presentStudents,
            absentStudents,
            section: title_s,
            Sclass: title_c
        }

        console.log(attendanceIns)

        axios.post('http://localhost:5000/api/editAttendance/' + date, attendanceIns)
            .then(res => {console.log(res)
                window.location = '/viewAttendance/' + title_s + '/' + title_c
            })
            .catch(err => {console.log(err)})
    
        
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
                                    <h1>{title_s} Attendance</h1>
                                </div>
    
                                <br/>
    
                                <div className={styles.tableMargin}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Select Date:</Form.Label><br/>
                                        <DatePicker
                                            selected={todayDate}
                                            onChange={date => setTodayDate(date)}
                                            />
                                    </Form.Group>
                                </div>
    
                                
    
    
                                <br/>
    
                                <div className={styles.Colorhead}>
                                    {today === true ?
                                        <h1>Students</h1> : <><br/><br/></>
                                    }
                                    
                                </div>
                            </Col>    
                        </Row>
                        
    
                        <br/>
    
                        <Row>
                            <Col>
    
                                
    
                                <div className={styles.tableMargin}>
    
                                    
                                    {totalStudents.length >= 1 ?
                                    
                                        <Table className={styles.tableWidth} responsive='sm'>
                                            <thead>
                                                <tr>
                                                    <th className={styles.tableHeading}>Admin No</th>
                                                    <th className={styles.tableHeading}>Name</th>
                                                    <th className={styles.tableHeading}>Attendance</th>
                                                    <th className={styles.tableHeading}>Actions</th>
                                                </tr>
                                            </thead>
        
                                            
                                            
                                            {studentList()}
                                        </Table>
                                        : noAtt()
                                    }
                                    {today === true ?
                                        <>
                                            <Button className={styles.formButton} onClick={submitAttendance}>
                                                
                                                Submit Attendance
                                            </Button>
            
                                            
                                        </> : <></>
                                        
                                    }

                                    <Link style={{marginLeft: '2%'}}  to={ '/viewAttendance/' + title_s + '/' + title_c }>View Attendance</Link> 
                                    
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

export default EditAttendance