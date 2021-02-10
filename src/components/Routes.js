import React from "react";
import { Route, Switch } from "react-router-dom";
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
        <Route component={LoginDialog} />
      </div>
      <Switch>
        <Route path="/students/edit/:id" component={UserDialog} />
        <Route component={UserDialog} />
      </Switch>
    </div>
  );
};

export default Routes;
