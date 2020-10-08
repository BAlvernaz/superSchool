import React from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
import NewStudentForm from './NewStudentForm'

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
                {students.length > 0 ? students.map(student => <div>{student.name}</div>) : <h1>"No Students Yet"</h1>}
                <NewStudentForm />
            </div>
        )
    }
}

export default App