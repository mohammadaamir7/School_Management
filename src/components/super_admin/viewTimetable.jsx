import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'


function ViewTimetable() {

    const [ timetable, setTimetable ] = useState([])
    const [ monday, setMonday ] = useState([])
    const [ tuesday, setTuesday ] = useState([])
    const [ wednesday, setWednesday ] = useState([])
    const [ thursday, setThursday ] = useState([])
    const [ friday, setFriday ] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/api/getTimetable')
        .then((res) => {
            console.log(res.data)
            setTimetable(res.data)

            var m = []
            var tu = []
            var w = []
            var th = []
            var f = []

            res.data.sort((a, b) => (a.lecStart > b.lecStart) ? 1 : -1)

            res.data.forEach(element => {
                if(element.day === 'monday'){
                    m.push(element)
                }
                if(element.day === 'tuesday'){
                    tu.push(element)
                }
                if(element.day === 'wednesday'){
                    w.push(element)
                }
                if(element.day === 'thursday'){
                    th.push(element)
                }
                if(element.day === 'friday'){
                    f.push(element)
                }
            })

            setMonday(m)
            setTuesday(tu)
            setWednesday(w)
            setThursday(th)
            setFriday(f)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const manageStartHours = (lecStart) => {

        if(lecStart == 8){
            return <p>8 : 00 am</p>
        }
        if(lecStart == 9){
            return <p>9 : 00 am</p>
        }
        if(lecStart == 10){
            return <p>10 : 00 am</p>
        }
        if(lecStart == 11){
            return <p>11 : 00 am</p>
        }
        if(lecStart == 12){
            return <p>12 : 00 pm</p>
        }
        if(lecStart == 13){
            return <p>1 : 00 pm</p>
        }


    }


    const manageEndHours = (lecEnd) => {

        if(lecEnd == 9){
            return <p>9 : 00 am</p>
        }
        if(lecEnd == 10){
            return <p>10 : 00 am</p>
        }
        if(lecEnd == 11){
            return <p>11 : 00 am</p>
        }
        if(lecEnd == 12){
            return <p>12 : 00 pm</p>
        }
        if(lecEnd == 13){
            return <p>1 : 00 pm</p>
        }
        if(lecEnd == 14){
            return <p>2 : 00 pm</p>
        }


    }

    const mondayShow = () => {
        
        if(monday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Monday</td>
        }else{
            var count = 0
            return monday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td>
            ))
        }
    }

    const tuesdayShow = () => {
        if(tuesday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Monday</td>
        }else{
            var count = 0
            return tuesday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td> : <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td>
            ))
        }
    }

    const wednesdayShow = () => {
        if(wednesday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Wednesday</td>
        }else{
            var count = 0
            return wednesday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td>
            ))
        }
    }

    const thursdayShow = () => {
        if(thursday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Thursday</td>
        }else{
            var count = 0
            return thursday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td> : <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td>
            ))
        }
    }

    const fridayShow = () => {
        if(friday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Friday</td>
        }else{
            var count = 0
            return friday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/>Start: {manageStartHours(day.lecStart)}End: {manageEndHours(day.lecEnd)}</td>
            ))
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
                                    <h1>Timetable</h1>
                                </div>

                                

                                
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Monday</td>
                                                {mondayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Tuesday</td>
                                                {tuesdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Wednesday</td>
                                                {wednesdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Thursday</td>
                                                {thursdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Friday</td>
                                                {fridayShow()}
                                            </tr>
                                        </tbody>
                                        
                                    </Table>

                                    

                                </div>
                            </Col>
                            
                        </Row>
                        <br/>

                        <div style={{display: 'flex', height: 'auto'}}>
                            <Link className={styles.timetableButton} to={ '/editTimetable' }>Edit Timetable</Link>
                            <Link style={{paddingLeft: '3%'}} className={styles.timetableButton} to={ '/manageTimetable' }>Manage</Link>
                        </div>
                        
                        <br/>
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default ViewTimetable