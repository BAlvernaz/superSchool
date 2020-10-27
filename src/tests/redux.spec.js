import { v4 as uuidv4 } from 'uuid';
import { ADD_STUDENT, GET_STUDENTS } from '../reducers/actions';
import { studentReducer } from '../reducers/studentReducer';


describe('Students Reducer', () => {
    test('Returns Initial State', () => {
        expect(studentReducer(undefined, {type: GET_STUDENTS, students: []})).toEqual([])
    })
    test('Add Students', () => {
        const student1UUID = uuidv4()
        const school1UUID = uuidv4()
        expect(studentReducer(undefined, {type: ADD_STUDENT, student: {
            id: student1UUID,
            name: "Test Student 1",
            school: school1UUID}})).toEqual([{
                id: student1UUID,
                name: "Test Student 1",
                school: school1UUID}])
    })
})