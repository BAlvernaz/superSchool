import React from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
import NewStudentForm from './components/NewStudentForm'
import StudentList from './components/StudentList'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            students: []
        }
    }
    async componentDidMount() {
        const response = await axios.get("http://localhost:8000/api/students")
        this.setState({students: response.data})
    }

    render() {
        const { students } = this.state
        return (
            <div>
                <Router>
                    <Route component={StudentList} />
                    <Route component={NewStudentForm} />
                </Router>
            </div>
        )
    }
}

export default App