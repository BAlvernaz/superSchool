import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem } from "@material-ui/core";

const SchoolSelect = ({schools, school, onChange}) => {
    return ( <Select
        name="school"
        value={school}
        onChange={onChange}
        autoWidth
        label="School That You Attend"
      >
        {schools.length > 0 ? (
          schools.map((_school) => (
            <MenuItem key={_school.id} value={_school.id}>
              {_school.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value={null}>No Schools to Choose From</MenuItem>
        )}
      </Select>)
}

const stateToProps = ({schools}, { school, onChange }) => {
    return {
        schools, 
        school, 
        onChange
    }
}

export default connect(stateToProps)(SchoolSelect)