import { v4 as uuidv4 } from "uuid";
import { ADD_STUDENT, GET_STUDENTS, REMOVE_STUDENT } from "../reducers/actions";
import { studentReducer } from "../reducers/studentReducer";

describe("Students Reducer", () => {
    const student1UUID = uuidv4();
    const school1UUID = uuidv4();
    const student2UUID = uuidv4();
  test("Returns Initial State", () => {
    expect(
      studentReducer(undefined, { type: GET_STUDENTS, students: [] })
    ).toEqual([]);
  });
  test("Add Students", () => {
    expect(
      studentReducer(undefined, {
        type: ADD_STUDENT,
        student: {
          id: student1UUID,
          name: "Test Student 1",
          school: school1UUID,
        },
      })
    ).toEqual([
      {
        id: student1UUID,
        name: "Test Student 1",
        school: school1UUID,
      },
    ]);
    expect(
      studentReducer(
        [
          {
            id: student1UUID,
            name: "Test Student 1",
            school: school1UUID,
          },
        ],
        {
          type: ADD_STUDENT,
          student: {
            id: student2UUID,
            name: "Test Student 2",
            school: school1UUID,
          },
        }
      )
    ).toEqual([
      {
        id: student1UUID,
        name: "Test Student 1",
        school: school1UUID,
      },
      {
        id: student2UUID,
        name: "Test Student 2",
        school: school1UUID,
      }
    ]);
  });
  test("Remove Students", () => {
       expect(studentReducer([
        {
          id: student1UUID,
          name: "Test Student 1",
          school: school1UUID,
        },
        {
          id: student2UUID,
          name: "Test Student 2",
          school: school1UUID,
        }
      ], {type: REMOVE_STUDENT, studentId: student2UUID})).toEqual([
        {
          id: student1UUID,
          name: "Test Student 1",
          school: school1UUID,
        }])
  })
});
