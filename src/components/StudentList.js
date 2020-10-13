import { Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import { connect } from "react-redux";
import { removeStudent } from "../reducers/actions";

const StudentList = ({ students, deleteStudent, schools }) => {
  return (
    <div>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student.id}>
            <Typography>
              {student.name}
            </Typography>
            <Typography>
              {schools.find(school => school.id === student.school).name}
            </Typography>
            <button
              onClick={() => {
                deleteStudent(student.id);
              }}
            >
              Remove Student
            </button>
          </div>
        ))
      ) : (
        <h1>No one is here yet</h1>
      )}
    </div>
  );
};
const stateToProps = ({ students, schools }) => {
  return {
    students,
    schools
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(removeStudent(studentId)),
  };
};

export default connect(stateToProps, dispatchToProps)(StudentList);
