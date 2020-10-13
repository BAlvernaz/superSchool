import React from "react";
import { connect } from "react-redux";
import { removeStudent } from "../reducers/actions";

const StudentList = ({ students, deleteStudent }) => {
  return (
    <div>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student.id}>
            <button
              onClick={async () => {
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
const stateToProps = ({ students }) => {
  return {
    students,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(removeStudent(studentId)),
  };
};

export default connect(stateToProps, dispatchToProps)(StudentList);
