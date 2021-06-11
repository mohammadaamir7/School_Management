import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'


const ClassVar = props => (
    
        
    <tbody>
        <tr>
            <td>{props.classIns.title}</td>
            <td>{props.classIns.sectionCount}<Link to = { '/sectionData/' + props.classIns.id } className={styles.sectionButton}>Manage</Link></td>
            <td>{props.classIns.studentCount}</td>
            <td>{props.classIns.incharge}</td>
        </tr>

    </tbody>
        
    
)

function ClassData() {
    const [ classData, setClassData ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/classData')
        .then((res) => {
            console.log(res.data)
            setClassData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const classDataList = () => {
        return classData.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
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
                        <div className={styles.backBar}>
                            <h1>Class Data</h1>
                        </div>

                        <br/>

                        <div className={styles.tableMargin}>
                            <Table className={styles.tableWidth} hover responsive='sm'>
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeading}>Class</th>
                                        <th className={styles.tableHeading}>Number of Sections</th>
                                        <th className={styles.tableHeading}>Total Students</th>
                                        <th className={styles.tableHeading}>Class Incharge</th>
                                    </tr>
                                </thead>

                                {classDataList()}
                                
                            </Table>
                        </div>
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default ClassData