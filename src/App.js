import React from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
import NewStudentForm from './components/NewStudentForm'
import StudentList from './components/StudentList'
import { connect } from 'react-redux'
import { getStudents } from './reducers/studentReducer'
import { getSchools } from './reducers/schoolReducer'
import Navbar from './components/Navbar'

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