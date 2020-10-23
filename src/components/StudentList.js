import React from "react";
import { connect } from "react-redux";
import StudentListCards from './StudentListCards'


const StudentList = ({ students }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
      }}
    >
      {students.length > 0 ? (
        students.map((student) => (
         <StudentListCards student={student}  key={student.id} />
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

export default connect(stateToProps)(StudentList);
