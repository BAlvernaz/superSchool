import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import SchoolList from "./SchoolList";
import SideMenu from "./SideMenu";
import UserDialog from "./UserDialog";
import StudentList from "./StudentList";
import LoginDialog from "./LoginDialog";

const Routes = () => {
  return (
    <div>
      <Route component={SideMenu} />
      <div>
        <Route component={Navbar} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/schools" component={SchoolList} />
        <Route path="/students/edit/:id" component={UserDialog} />
        <Route path="/register" component={UserDialog}/> 
        <Route path="/login" component={LoginDialog} />
      </div>
    </div>
  );
};

export default Routes;
