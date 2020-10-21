import { Card, Typography, CardContent, IconButton } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { removeStudent } from "../reducers/actions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const StudentList = ({ students, deleteStudent, schools }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {students.length > 0 ? (
        students.map((student) => (
          <Card
            style={{
              minWidth: 247,
            }}
          >
            <CardContent>
              <Typography style={{ fontSize: 26 }}>
                {"Name: " + student.name}
              </Typography>
              <Typography>
                {"Attending: " +
                  schools.find((school) => school.id === student.school).name}
              </Typography>
              <div
                style={{
                  display: "flex",
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
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
    schools,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(removeStudent(studentId)),
  };
};

export default connect(stateToProps, dispatchToProps)(StudentList);
