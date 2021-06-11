import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.title}</td>
            <td>{props.classIns.studentCount}</td>
            <td>{props.classIns.teacher}</td>
            <td><Link to = {'/viewStudents/' + props.classIns.title}>view</Link></td>
            <td><Link to={'/updateSection/' + props.classIns._id + '/' + props.classIns.class_id }><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
            <button onClick={() =>  {
                   axios.delete('http://localhost:5000/api/deleteSection/'+props.classIns._id)
                   .then(response => { 
                       console.log(response.data)
                       window.location = '/sectionData/' + props.classIns.class_id
                    });
            }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
        </tr>

    </tbody>
        
    
)

function SectionData() {

    const { id } = useParams()
    const [ classSectionData, setclassSectionData ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/sectionData/' + id)
        .then((res) => {
            console.log(res.data)
            setclassSectionData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const classSectionDataList = () => {
        return classSectionData.map((currentclass) => {
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
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Section Data</h1>
                                </div>

                                <br/>

                                <Link className={styles.addSecButton} to={ '/addSection/' + id }>Add Section</Link>
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Title</th>
                                                <th className={styles.tableHeading}>Total Students</th>
                                                <th className={styles.tableHeading}>Class Teacher</th>
                                                <th className={styles.tableHeading}>Students</th>
                                                <th className={styles.tableHeading}>Actions</th>
                                            </tr>
                                        </thead>

                                        {classSectionDataList()}
                                        
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

export default SectionData