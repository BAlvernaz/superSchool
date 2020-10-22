import React from 'react'
import { connect } from 'react-redux'
import { Card, Typography, CardContent, IconButton } from "@material-ui/core";
import { removeStudent } from "../reducers/actions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const StudentListCard = ({ student, schools, deleteStudent }) => {
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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon onClick={() => deleteStudent(student.id)} />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    )
}
const stateToProps = ({ schools }, { student }) => {
    return {
        schools,
        student
    }
}

const dispatchToProps = dispatch => {
    return {
        deleteStudent: (studentId) => dispatch(removeStudent(studentId))
    }
}

export default connect(stateToProps, dispatchToProps)(StudentListCard)