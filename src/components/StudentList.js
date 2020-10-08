import React from 'react'
import axios from 'axios'

const StudentList = () => {
    return (
        <div>
            {students.length > 0 
             ? students.map(student => (
                <div key={student.id}>
                    <h3>{student.name}</h3>
                    <button onClick={async () => {
                        await axios.delete(`http://localhost:8000/api/students/${student.id}`)
                    }}>Remove Student</button>
                </div>
             )) : <h1>No one is here yet</h1>}
        </div>
    )
}
export default StudentList