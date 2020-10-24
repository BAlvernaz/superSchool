import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { removeStudent } from "../reducers/actions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { toggleEditStudentDialog } from "../reducers/toggleActions";
import { Link as RouterLink } from "react-router-dom";

const StudentListCard = ({
  student,
  schools,
  deleteStudent,
  editStudentToggle,
}) => {
  return (
    <Card
      style={{
        minWidth: 247,
      }}
    >
      <CardContent>
        <Typography style={{ fontSize: 18 }}>
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
          <IconButton
            component={RouterLink}
            to={`/students/edit/${student.id}`}
            onClick={() => editStudentToggle()}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => deleteStudent(student.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
const stateToProps = ({ schools, toggles }, { student }) => {
  return {
    schools,
    student,
    eStudentTog: toggles.editStudentDialog,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(removeStudent(studentId)),
    editStudentToggle: () => dispatch(toggleEditStudentDialog()),
  };
};

export default connect(stateToProps, dispatchToProps)(StudentListCard);
