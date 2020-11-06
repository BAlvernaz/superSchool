import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import SchoolList from "./SchoolList";
import SideMenu from "./SideMenu";
import StudentForm from "./StudentForm";
import EditStudentDialog from "./EditStudentDialog";
import StudentList from "./StudentList";

const Routes = ({ studentEditDialog }) => {
  return (
    <div>
      <Route component={SideMenu} />
      <div>
        <Route component={Navbar} />
        <Route component={StudentForm} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/schools" component={SchoolList} />
        {studentEditDialog && (
          <Route path="/students/edit/:id" component={EditStudentDialog} />
        )}
      </div>
    </div>
  );
};

export default Routes;
