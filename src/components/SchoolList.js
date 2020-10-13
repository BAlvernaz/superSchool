import React from "react";
import { connect } from "react-redux";

const SchoolList = ({ schools }) => {
  return (
    <div className="schoolContainer">
      {schools.map((school) => (
        <div>
          <h1>{school.name}</h1>
          <hr />
      {school.students.length > 0 ? school.students.map(student => <h5>{student.name}</h5>) : <h5>No Students at this School</h5>}
        </div>
      ))}
    </div>
  );
};

const stateToProps = ({ schools }) => {
  return {
    schools,
  };
};
export default connect(stateToProps)(SchoolList);
