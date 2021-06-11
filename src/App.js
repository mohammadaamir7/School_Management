import React from 'react';
import SuperAdminDashboard from './components/super_admin/dashboard'
import AddStudent from './components/super_admin/addStudent'
import AddSection from './components/super_admin/addSection'
import ClassData from './components/super_admin/classData'
import SectionData from './components/super_admin/sectionData'
import UpdateSection from './components/super_admin/updateSection'
import Attendance from './components/super_admin/attendance'
import SectionAttendance from './components/super_admin/sectionAttendance'
import ViewAttendance from './components/super_admin/viewAttendance'
import EditAttendance from './components/super_admin/editAttendance'
import ViewStudents from './components/super_admin/viewStudents'
import ManageGrades from './components/super_admin/manageGrades'
import ViewGrades from './components/super_admin/viewGrades'
import GradeReport from './components/super_admin/gradeReport'
import UpdateGrade from './components/super_admin/updateGrade'
import ManageTitmetable from './components/super_admin/manageTimetable'
import ViewTitmetable from './components/super_admin/viewTimetable'
import EditTitmetable from './components/super_admin/editTimetable'
import UpdateTitmetable from './components/super_admin/updateTimetable'
import SuperadminDashboard from './components/super_admin/SD_Dashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (

    <Router>

      <Switch>
          <Route exact path="/">
            <SuperAdminDashboard />
          </Route>
          <Route exact path="/addStudent">
            <AddStudent />
          </Route>
          <Route exact path="/addSection/:id">
            <AddSection />
          </Route>
          <Route exact path="/classData">
            <ClassData />
          </Route>
          <Route exact path="/sectionData/:id">
            <SectionData />
          </Route>
          <Route exact path="/updateSection/:id_1/:id_2">
            <UpdateSection />
          </Route>
          <Route exact path="/attendance">
            <Attendance />
          </Route>
          <Route exact path="/sectionAttendance/:id_s/:id_c">
            <SectionAttendance />
          </Route>
          <Route exact path="/viewAttendance/:title_s/:title_c">
            <ViewAttendance />
          </Route>
          <Route exact path="/editAttendance/:title_s/:title_c">
            <EditAttendance />
          </Route>
          <Route exact path="/viewStudents/:title">
            <ViewStudents />
          </Route>
          <Route exact path="/manageGrades/:id">
            <ManageGrades />
          </Route>
          <Route exact path="/viewGrades">
            <ViewGrades />
          </Route>
          <Route exact path="/gradeReport/:admin_no">
            <GradeReport />
          </Route>
          <Route exact path="/updateGrade/:id">
            <UpdateGrade />
          </Route>
          <Route exact path="/manageTimetable">
            <ManageTitmetable />
          </Route>
          <Route exact path="/viewTimetable">
            <ViewTitmetable />
          </Route>
          <Route exact path="/editTimetable">
            <EditTitmetable />
          </Route>
          <Route exact path="/updateTimetable/:id">
            <UpdateTitmetable />
          </Route>
          <Route exact path="/superadminDashboard">
            <SuperadminDashboard />
          </Route>
          
      </Switch>

    </Router>

  );
}

export default App;
