const faker = require('faker')
const axios = require('axios')


const createSchools = async (count) => {
    for (let i = 0; i < count; i++) {
        const schoolName = faker.address.city() + " University"
        await axios.post('http://localhost:8000/api/schools/', {name: schoolName})
    }
}

const createStudents = async (count) => {
    for (let i = 0; i < count; i++) {
        const name = faker.name.findName()
        const response = await axios.get("http://localhost:8000/api/schools")
        const schoolIds = response.data.map(school => school.id)
        await axios.post('http://localhost:8000/api/students/', {name, school: schoolIds[Math.floor(Math.random() * schoolIds.length)]})
    }
}

createSchools(3)
createStudents(6)

