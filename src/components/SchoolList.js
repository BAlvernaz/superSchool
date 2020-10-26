import React from "react";
import { connect } from "react-redux";

const SchoolList = ({ schools,students }) => {
  return (
    <div className="schoolContainer">
      {schools.map((school) => (
        <div>
          <h1>{school.name}</h1>
          <hr />
      {students.filter(student => student.school === school.id).length > 0 ? students.filter(student => student.school === school.id).map(student => <h5>{student.name}</h5>) :<h5>No Students at this School</h5>}
        </div>
      ))}
    </div>
  );
};

const stateToProps = ({ schools, students }) => {
  return {
    schools,
    students
  };
};
export default connect(stateToProps)(SchoolList);
