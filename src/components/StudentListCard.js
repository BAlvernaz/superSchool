import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea
} from "@material-ui/core";

const StudentListCard = ({
  student,
  schools,

}) => {
  console.log(student)
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
            {student.school ? "Attending: " +
              schools.find((school) => school.id === student.school).name : "Not Currently Attending A School"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
const stateToProps = ({ schools }, { student }) => {
  return {
    schools,
    student,
  };
};


export default connect(stateToProps)(StudentListCard);
