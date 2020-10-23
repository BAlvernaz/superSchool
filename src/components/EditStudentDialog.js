import { Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toggleEditStudentDialog } from '../reducers/toggleActions'

const EditStudentDialog = ({ editDialog, dialogToggle }) => {
    return (
        <div>
        <Dialog open={editDialog} onClose={() => {
            dialogToggle()}} >
            <DialogTitle>Edit Student</DialogTitle>
        </Dialog>
        </div>
    )
}

const stateToProps = ({ toggles }) => {
    return {
        editDialog: toggles.editStudentDialog
    }

}

const dispatchToProps = dispatch => {
    return {
        dialogToggle: () => dispatch(toggleEditStudentDialog())
    }
}

export default connect(stateToProps, dispatchToProps)(EditStudentDialog)