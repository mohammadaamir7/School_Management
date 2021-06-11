import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'




function EditTimetable() {

    const [ timetableData, settimetableData ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/getTimetable')
        .then((res) => {
            console.log(res.data)
            res.data.sort((a, b) => (a.day > b.day) ? 1 : -1)
            
            settimetableData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const manageStartHours = (lecStart) => {

        if(lecStart == 8){
            return <td>8 : 00 am</td>
        }
        if(lecStart == 9){
            return <td>9 : 00 am</td>
        }
        if(lecStart == 10){
            return <td>10 : 00 am</td>
        }
        if(lecStart == 11){
            return <td>11 : 00 am</td>
        }
        if(lecStart == 12){
            return <td>12 : 00 pm</td>
        }
        if(lecStart == 13){
            return <td>1 : 00 pm</td>
        }


    }


    const manageEndHours = (lecEnd) => {

        if(lecEnd == 9){
            return <td>9 : 00 am</td>
        }
        if(lecEnd == 10){
            return <td>10 : 00 am</td>
        }
        if(lecEnd == 11){
            return <td>11 : 00 am</td>
        }
        if(lecEnd == 12){
            return <td>12 : 00 pm</td>
        }
        if(lecEnd == 13){
            return <td>1 : 00 pm</td>
        }
        if(lecEnd == 14){
            return <td>2 : 00 pm</td>
        }


    }

    const timetableDataList = () => {
        
        return timetableData.map((timetable) => (
            <tbody>
                <tr>
                    <td>{timetable.title}</td>
                    <td>{timetable.day}</td>
                    <td>{timetable.teacherName}</td>
        
                    {manageStartHours(timetable.lecStart)}
        
                    {manageEndHours(timetable.lecEnd)}
                    <td><Link to={ '/updateTimetable/' + timetable._id }><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
                    <button onClick={() =>  {
                        axios.delete('http://localhost:5000/api/deleteTimetable/' + timetable._id)
                        .then(response => { 
                            console.log(response.data)
                            window.location = '/viewTimetable'
                            });
                    }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
                </tr>
        
            </tbody>

        ))
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
                                    <h1>Timetable Data</h1>
                                </div>

                                <br/>

                                <Link className={styles.addSecButton} to={ '/viewTimetable' }>Timetable</Link>
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Lecture</th>
                                                <th className={styles.tableHeading}>Day</th>
                                                <th className={styles.tableHeading}>Class Teacher</th>
                                                <th className={styles.tableHeading}>Start time</th>
                                                <th className={styles.tableHeading}>End time</th>
                                                <th className={styles.tableHeading}>Actions</th>
                                            </tr>
                                        </thead>

                                        {timetableDataList()}
                                        
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

export default EditTimetable