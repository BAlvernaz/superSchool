import React from 'react'
import axios from 'axios'

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
            </div>
        )
    }
}

export default App