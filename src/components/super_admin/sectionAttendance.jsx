import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function SectionAttendance(){

    const { id_s, id_c } = useParams()
    const [ students, setStudents ] = useState([])
    const [ section, setSection ] = useState({})
    const [ classT, setClass ] = useState({})
    const [ presentStudents, setPresentStudents ] = useState([])
    const [ absentStudents, setAbsentStudents ] = useState([])
    const [ fullArray, setFullArray ] = useState([])
    const [ today, setToday ] = useState(false)
    const [ todayDate, setTodayDate ] = useState(new Date())

    useEffect(() => {
        var classTitle = '' 

        axios.get('http://localhost:5000/api/singleClass/' + id_c)
        .then(res => {
            console.log(res)
            setClass(res.data)
            classTitle = res.data.title
        })
        .catch(err => {console.log(err)})

        var date = ''
        var yr = new Date(todayDate).getFullYear()
        var mn = new Date(todayDate).getMonth() + 1
        var dy = new Date(todayDate).getDate()
        date = yr + '-' + mn + '-' + dy
        

        // setPresents([])
        // setAbsents([])
        setStudents([])

        
        axios.get('http://localhost:5000/api/singleSection/' + id_s)
            .then((res) => {
                var sectionData = res.data
                setSection(res.data)
                //console.log(res.data)
                var title = res.data.title
                console.log('title : ' + title)
                console.log('date : ' + date)
                axios.get('http://localhost:5000/api/getDayAttendance/' + title + '/' + classTitle + '/' + date)
                .then((res) => {
                    console.log('res data : ' + JSON.stringify(res.data))
                    // var flag = true

                    // for(var index = 0 ; index < res.data.length ; index++){
                        
                    //     if(new Date(res.data[index].date).getFullYear() === new Date(todayDate).getFullYear() && new Date(res.data[index].date).getMonth() === new Date(todayDate).getMonth() && new Date(res.data[index].date).getDate() === new Date(todayDate).getDate()){
                    //         setToday(true)
                    //     }
                    // }

                    if(res.data.presentStudents){
                        setToday(true)
                        
                    }else{
                         setToday(false)
                         setSection(sectionData)
                         axios.get('http://localhost:5000/api/getStudents/' + title)
                            .then((res) => {
                                res.data.sort((a, b) => (a.admin_no > b.admin_no) ? 1 : -1)
                                setStudents(res.data)
                                
                                res.data.forEach(student => {
                                    const absObj = {
                                        admin_no : student.admin_no,
                                        name : student.name
                                    }
                                    absentStudents.push(absObj)

                                    
                                })

                                
                                //console.log(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                    

                    
                        
                }).catch(err => {
                    console.log(err)
                })

                
           })
            .catch(err => {
                console.log(err)
            })


            
    
            
        
       
    }, [todayDate])

    const studentList = () => {


        return students.map((currentstudent) => (

        <tbody>
            <tr>
                <td>{currentstudent.admin_no}</td>
                <td>{currentstudent.name}</td>
                <td>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                        onChange={e => {
                            const { checked } = e.target
                            
                            const dataObj = {
                                admin_no: currentstudent.admin_no,
                                name: currentstudent.name
                            }

                            if(checked === true){
                                presentStudents.push(dataObj)
                                setAbsentStudents(absentStudents.filter(el => el.admin_no !== currentstudent.admin_no))
                                //absentStudents.indexOf(dataObj.admin_no) !== -1 && absentStudents.splice(absentStudents.indexOf(dataObj.admin_no), 1)
                            }
                            if(checked === false || checked === '' || checked === undefined || checked === null){
                                absentStudents.push(dataObj)
                                setPresentStudents(presentStudents.filter(el => el.admin_no !== currentstudent.admin_no))
                                //presentStudents.indexOf(dataObj.admin_no) !== -1 && presentStudents.splice(presentStudents.indexOf(dataObj.admin_no), 1)
                            }
                        }}

                        type="checkbox" style={{textAlign: 'center'}}/>
                    </Form.Group>
                </td>
                
            </tr>

        </tbody>
        
        ))
    }

    const noAtt = () => {
        return <h1>This Date's Attendance has been taken<br/><br/><br/></h1>
    }


    const submitAttendance = () => {
        if(today === false){

            var dateT = ''
            var yr = new Date(todayDate).getFullYear()
            var mn = new Date(todayDate).getMonth() + 1
            var dy = new Date(todayDate).getDate()
            dateT = yr + '-' + mn + '-' + dy

            const attendanceIns = {
                date: dateT,
                presentStudents,
                absentStudents,
                section: section.title,
                Sclass: classT.title
            }

            console.log(attendanceIns)


            axios.post('http://localhost:5000/api/submitAttendance', attendanceIns)
                .then(res => {
                    console.log(res)
                    window.location = '/sectionAttendance/' + id_s + '/' + id_c
                })
                .catch(err => {console.log(err)})
        }else{
            alert("This Date's Attendance has been taken")
        }
        
    }

    const allpresentAttendance = () => {

        var empty = []

        axios.get('http://localhost:5000/api/singleSection/' + id_s)
            .then((res) => {                
                
                axios.get('http://localhost:5000/api/getStudents/' + res.data.title)
                .then((res) => {
                    
                    var full = []
                    
                    console.log(res)
                    
                    res.data.forEach(student => {
                        const absObj = {
                            admin_no : student.admin_no,
                            name : student.name
                        }

                        full.push(absObj)
                        fullArray.push(absObj)

                        
                    })
                    
                    
                    var dateT = ''
                    var yr = new Date(todayDate).getFullYear()
                    var mn = new Date(todayDate).getMonth() + 1
                    var dy = new Date(todayDate).getDate()
                    dateT = yr + '-' + mn + '-' + dy
                    
                    console.log('class title : ' + classT.title)
                    const attendanceIns = {
                        date: dateT,
                        presentStudents: fullArray,
                        absentStudents: empty,
                        section: section.title,
                        Sclass: classT.title
                    }
                    
                    
                    axios.post('http://localhost:5000/api/submitAttendance', attendanceIns)
                    .then(res => {
                        console.log(res)
                        window.location = '/sectionAttendance/' + id_s + '/' + id_c
                    })
                    .catch(err => {console.log(err)})

                })
                .catch(err => {
                    console.log(err)
                })

                
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
                                <h1>{section.title} Attendance</h1>
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
                                    {today === false ?
                                        <h1>Students</h1> : <><br/><br/></>
                                    }
                                    
                            </div>
                        </Col>    
                    </Row>
                    

                    <br/>

                    <Row>
                        <Col>

                            

                            <div className={styles.tableMargin}>

                                

                               {students.length >= 1 ?
                                    
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
                                
                                {today === false ? 
                                    <>
                                        <Button className={styles.formButton} onClick={submitAttendance}>
                                            
                                            Submit Attendance
                                        </Button>
        
                                        <Button style={{marginLeft: '2%'}} className={styles.formButton} onClick={allpresentAttendance}>
                                                
                                            Mark All Present and Submit
                                        </Button>
                                    </> : <></>
                                }
                                

                                <Link style={{marginLeft: '2%'}} to={ '/viewAttendance/' + section.title + '/' + classT.title }>View Attendance</Link>
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

export default SectionAttendance