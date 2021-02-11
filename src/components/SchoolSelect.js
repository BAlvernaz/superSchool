import React from "react";
import { connect } from "react-redux";
import { Select, MenuItem } from "@material-ui/core";

const SchoolSelect = ({ schools, school, onChange, student }) => {
  return (
    <Select
      name="school"
      value={school}
      onChange={onChange}
      autoWidth
      label="School That You Attend"
      style= {{minWidth: "240px"}}
    >
     {student ? <MenuItem value={""}>Not Currently Attending A School</MenuItem> : "" }
      {schools.length > 0 ? (
        schools.map((_school) => (
          <MenuItem key={_school.id} value={_school.id}>
            {_school.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem value={""}>No Schools to Choose From</MenuItem>
      )}
    </Select>
  );
};

const stateToProps = ({ schools }, { school, onChange, student }) => {
  return {
    schools,
    school,
    onChange,
    student
  };
};

export default connect(stateToProps)(SchoolSelect);
