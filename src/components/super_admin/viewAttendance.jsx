import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'


function ViewAttendance(){

    const { title_s, title_c } = useParams()
    // var [ presents ] = useState([])
    // var [ absents ] = useState([])
    // const [ trackPresents ] = useState([])
    // const [ trackAbsents ] = useState([])
    // const [ trackAttendance, setTrackAttendance ] = useState([])
    const [ credentials, setCredentials ] = useState([])
    //const [ collected, setCollectedStatus ] = useState([])
    const [ collected_data, setCollectedData ] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:5000/api/viewAttendance/' + title_s + '/' + title_c)
            .then(res => {
                var data_len = res.data.length
                var loop_len = 0
                if(data_len < 10){
                    loop_len = data_len
                }else{
                    loop_len = 10
                }
                
                //console.log(res.data)

                var names = []
                var ad_no = []
                var statusArrayPresent = []
                var statusArrayAbsent = []

                for(var i = 0; i < loop_len; i++){
                    // presents = []
                    // absents = []
                   
                    //console.log('present : ' + JSON.stringify(res.data[i].presentStudents))

                    


                    res.data[i].presentStudents.forEach(student => {
                    
                        //presents.push(student)
                        names.push(student.name)
                        ad_no.push(student.admin_no)

                    })

                    
                    var prs_len = res.data[i].presentStudents.length
                    //console.log('prs_len : ' + prs_len)

                    
                    var stprs = []
                    for(var index = 0 ; index < prs_len; index++){
                        const obj = {
                            name: res.data[i].presentStudents[index].name,
                            status: true
                        }

                        stprs.push(obj)
                    }

                    statusArrayPresent.push(stprs)
                    
                    
    
                    res.data[i].absentStudents.forEach(student => {
                        //absents.push(student)
                        names.push(student.name)
                        ad_no.push(student.admin_no)

                    })

                    var abs_len = res.data[i].absentStudents.length
                    //console.log('abs_len : ' + abs_len)

                    
                    var stabs = []
                    for(var index = 0 ; index < abs_len; index++){
                        const obj = {
                            name: res.data[i].absentStudents[index].name,
                            status: false
                        }

                        stabs.push(obj)
                    }

                    statusArrayAbsent.push(stabs)
                

                    // trackPresents.push(presents)
                    // trackAbsents.push(absents)
                }

                // for(var index = 0; index < statusArrayPresent.length; index++){
                //     console.log(statusArrayPresent[index])
                // }
                // for(var index = 0; index < statusArrayPresent.length; index++){
                //     console.log('present data : ' + JSON.stringify(statusArrayPresent[index]))
                // }

                // for(var index = 0; index < statusArrayAbsent.length; index++){
                //     console.log('absent data : ' + JSON.stringify(statusArrayAbsent[index]))
                // }
                
                // console.log('present length : ' + JSON.stringify(statusArrayPresent.length))
                // console.log('absent length : ' + JSON.stringify(statusArrayAbsent.length))
                
                // console.log('present : ' + JSON.stringify(statusArrayPresent))
                // console.log('absent : ' + JSON.stringify(statusArrayAbsent))
                
                // console.log('present : ' + JSON.stringify(trackAbsents))
                // console.log('absent : ' + JSON.stringify(absents))
                
                var combinedStatus = []
                for(var index = 0; index < statusArrayPresent.length; index++){
                    combinedStatus.push(statusArrayPresent[index], statusArrayAbsent[index])
                }
                //console.log('combined : ' + JSON.stringify(combinedStatus))

                for(var index = 0; index < combinedStatus.length; index++){
                    combinedStatus = combinedStatus.filter(function(el) { return el !== undefined})
                }

                //console.log('combined : ' + JSON.stringify(combinedStatus.length))


                var uniqueArray = []
                for(var i=0; i < names.length; i++){
                    if(uniqueArray.indexOf(names[i]) === -1) {
                        uniqueArray.push(names[i]);
                    }
                }

                

                var uniqueNo = []
                for(var i=0; i < ad_no.length; i++){
                    if(uniqueNo.indexOf(ad_no[i]) === -1) {
                        uniqueNo.push(ad_no[i]);
                    }
                }

                

                var name_num = []

                for(var i = 0 ; i < uniqueArray.length ; i++){
                    const obj = {
                        name: uniqueArray[i],
                        admin_no: uniqueNo[i],
                    }

                    name_num.push(obj)
                }


                setCredentials(name_num)
                
                
                var totalStudents = uniqueArray.length
                var x = 0
                var pushStatus = []
                var collectedStatus = []

                while( x < totalStudents ){
                    pushStatus = []
                    for(var ind = 0; ind < combinedStatus.length; ind++){
                        combinedStatus[ind].forEach(element => {
                            if(element.name === uniqueArray[x]){
                                if(element.status === true){
                                    pushStatus.push('P')
                                }else{
                                    pushStatus.push('A')
                                }
                            }
                        })
                        
                            
                        
                        
                    }

                    collectedStatus.push(pushStatus)
                    x++
                }

                // for(var ind = 0; ind < collectedStatus.length; ind++){
                //     console.log('collected : ' + JSON.stringify(collectedStatus[ind]))
                // }
                //console.log('Final push : ' + JSON.stringify(collectedStatus))
                //setCollectedStatus(collectedStatus)



                var collected_data = []

                for(var i = 0 ; i < uniqueArray.length ; i++){
                    const obj = {
                        name: uniqueArray[i],
                        admin_no: uniqueNo[i],
                        attd: collectedStatus[i]
                    }

                    collected_data.push(obj)
                }

                collected_data.sort((a, b) => (a.admin_no > b.admin_no) ? 1 : -1)

                setCollectedData(collected_data)

                //console.log('collected data : ' + JSON.stringify(collected_data))


                // var track = []

                // trackPresents.forEach(child => {
                //     var studentAttendance = []

                //     child.forEach(student => {
                //         const atObj = {
                //             admin_no: student.admin_no,
                //             name: student.name,
                //             status: 'present',
                //         }

                //         studentAttendance.push(atObj)
                //     })

                
                //     track.push(studentAttendance)
                // })

                // trackAbsents.forEach(child => {
                //     var studentAttendance = []

                //     child.forEach(student => {
                //         const atObj = {
                //             admin_no: student.admin_no,
                //             name: student.name,
                //             status: 'absent',
                //         }

                //         studentAttendance.push(atObj)
                //     })

                
                //     track.push(studentAttendance)
                // })


                // setTrackAttendance(track)
                
                
            })
            .catch(err => {console.log(err)})
            
           
    }, [])


    const tableHeads = () => {
        return collected_data.map((child) => (
            <tbody>
                <tr>
                    <td>{child.name}</td>
                    <td>{child.admin_no}</td>
                    {child.attd.map((attd) => (
                        attd === 'P' ? <td style={{color:'green'}}>P</td> : <td style={{color:'red'}}>A</td>
                    ))}
                    
                </tr>
        
            </tbody>
        ))
    }


   
    

    // const attendanceView = () => {
        
        
    //     return collected.map((element) => (
            
    //             element.map((child) => (
                                   
    //                 <>
                        
    //                     {child === 'P' ? <td style={{color:'green', paddingLeft: '5%'}}>P</td> : <td style={{color:'red',  paddingLeft: '5%'}}>A</td>}
                        
    
    //                 </>
                                
                           
    //                 ))
                
                
    //             ))
        
    // }


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

                                    <div className={styles.Colorhead}>
                                        <h1>Students</h1>
                                    </div>
                                </Col>    
                            </Row>
                            

                            <br/>

                            <Row>
                                <Col>

                                    

                                    <div className={styles.tableMargin}>

                                        

                                        <Table className={styles.tableWidth} responsive='sm'>
                                            <thead>
                                                <tr>
                                                    <th className={styles.tableHeading}>Name</th>
                                                    <th className={styles.tableHeading}>Admin No</th>
                                                    <th colSpan='10' className={styles.tableHeading}>Attendance</th>
                                                    
                                                </tr>
                                            </thead>

                                            { tableHeads()}
                                            
                                            
                                        </Table>

                                        {/* <Table className={styles.tableWidth} responsive='sm'>
                                            <thead>
                                                <tr>
                                                    <th className={styles.tableHeading}>Admin No</th>
                                                    <th className={styles.tableHeading}>Name</th>
                                                    <th colSpan='7' className={styles.tableHeading}>Attendance</th>
                                                    
                                                </tr>
                                            </thead>

                                            { attendanceView()}
                                            
                                            
                                        </Table> */}


                                        <Link to={ '/editAttendance/' + title_s + '/' + title_c }>Edit Attendance</Link>
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

export default ViewAttendance