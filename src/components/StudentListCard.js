import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
  CardMedia,
  CardActionArea
} from "@material-ui/core";
import { removeStudent } from "../reducers/actions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

const StudentListCard = ({
  student,
  schools,
  deleteStudent,

}) => {
  return (
    <Card
      style={{
        minWidth: 247,
      }}
    >
      <CardActionArea>
        <CardMedia style={{ height: "140px" }} image={student.profile.image} />
        <CardContent>
          <Typography style={{ fontSize: 18 }}>
            {"Name: " + student.profile.first_name + " " + student.profile.last_name}
          </Typography>
          <Typography>
            {"Attending: " +
              schools.find((school) => school.id === student.school).name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div
        style={{
          display: "flex",
        }}
      >
        <IconButton
          component={RouterLink}
          to={`/students/edit/${student.id}`}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => deleteStudent(student.id)}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton component={RouterLink} to={`/students/view/${student.id}`}>
          <PersonIcon />
        </IconButton>
      </div>
    </Card>
  );
};
const stateToProps = ({ schools }, { student }) => {
  return {
    schools,
    student,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(removeStudent(studentId)),
  };
};

export default connect(stateToProps, dispatchToProps)(StudentListCard);
