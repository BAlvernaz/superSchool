const faker = require('faker')
const axios = require('axios')


const createSchools = async (count) => {
    for (let i = 0; i < count; i++) {
        const schoolName = faker.address.city() + " University"
        const image = faker.image.city()
        try{
        await axios.post('http://localhost:8000/api/schools/', {name: schoolName, image})
        } catch (ex) {
            console.error(ex)
        }
    }
}

const createStudents = async (count) => {
    for (let i = 0; i < count; i++) {
        try {
        const name = faker.name.findName()
        const response = await axios.get("http://localhost:8000/api/schools")
        const schoolIds = response.data.map(school => school.id)
        const image = faker.image.people()
        await axios.post('http://localhost:8000/api/students/', {name, school: schoolIds[Math.floor(Math.random() * schoolIds.length)], gpa: (Math.random() * 4).toFixed(2), image})
        } catch (err) {
            console.error(err)
        }
    }
}

createStudents(6)


