import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import NewStudentForm from './components/NewStudentForm'
import StudentList from './components/StudentList'
import { connect } from 'react-redux'
import { getStudents, getSchools } from './reducers/actions'

import Navbar from './components/Navbar'
import SchoolList from './components/SchoolList'

class App extends React.Component {
    componentDidMount() {
        this.props.loadStudents()
        this.props.loadSchools()
    }

    render() {
        return (
            <div>
                <Router>
                    <Route component={Navbar} />
                    <Route component={StudentList} />
                    <Route component={NewStudentForm} />
                    <Route component={SchoolList} />
                </Router>
            </div>
        )
    }
}

const dispatchToProp = dispatch => {
    return {
        loadStudents: () => dispatch(getStudents()),
        loadSchools: () => dispatch(getSchools())
    }
}

export default connect(null, dispatchToProp)(App)