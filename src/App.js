import React from "react";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import StudentList from "./components/StudentList";
import { connect } from "react-redux";
import { getStudents, getSchools } from "./reducers/actions";
import Navbar from "./components/Navbar";
import SchoolList from "./components/SchoolList";
import SideMenu from './components/SideMenu'
import StudentForm from './components/StudentForm'
import EditStudentDialog from "./components/EditStudentDialog";

class App extends React.Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadSchools();
  }

  render() {
    const { studentEditDialog } = this.props
    return (
      <div>
        <Router>
          <div>
            <Route component={SideMenu} />
            <div>
              <Route component={Navbar} />
              <Route component={StudentForm} />
              <Route path="/students" component={StudentList} />
              <Route exact path="/schools" component={SchoolList} />
              {studentEditDialog && <Route path="/students/edit/:id" component={EditStudentDialog} />}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const stateToProps = ({ toggles }) => {
  return {
    studentEditDialog: toggles.editStudentDialog
  }
}

const dispatchToProp = (dispatch) => {
  return {
    loadStudents: () => dispatch(getStudents()),
    loadSchools: () => dispatch(getSchools()),
  };
};

export default connect(stateToProps, dispatchToProp)(App);
