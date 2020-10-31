import { v4 as uuidv4 } from "uuid";
import {
  ADD_STUDENT,
  EDIT_STUDENT,
  GET_STUDENTS,
  REMOVE_STUDENT,
  GET_SCHOOLS
} from "../reducers/actions";
import { studentReducer } from "../reducers/studentReducer";
import { schoolReducer } from "../reducers/schoolReducer";
import { togglerReducer } from "../reducers/togglerReducer"
import { EDIT_STUDENT_TOGGLE, SIDEMENU_TOGGLE } from "../reducers/toggleActions";

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
      },
    ]);
  });
  test("Remove Students", () => {
    expect(
      studentReducer(
        [
          {
            id: student1UUID,
            name: "Test Student 1",
            school: school1UUID,
          },
          {
            id: student2UUID,
            name: "Test Student 2",
            school: school1UUID,
          },
        ],
        { type: REMOVE_STUDENT, studentId: student2UUID }
      )
    ).toEqual([
      {
        id: student1UUID,
        name: "Test Student 1",
        school: school1UUID,
      },
    ]);
  });
  test("Edit Student", () => {
    expect(
      studentReducer(
        [
          {
            id: student1UUID,
            name: "Test Student 1",
            school: school1UUID,
          },
          {
            id: student2UUID,
            name: "Test Student 2",
            school: school1UUID,
          },
        ],
        {
          type: EDIT_STUDENT,
          student: {
            id: student1UUID,
            name: " Editted: Student 1",
            school: school1UUID,
          },
        }
      )
    ).toEqual(
        [{
      id: student1UUID,
      name: " Editted: Student 1",
      school: school1UUID,
    },
    {
      id: student2UUID,
      name: "Test Student 2",
      school: school1UUID,
    }
  ])
  })
});

describe("School Reducer", () => {
    test("Initial State", () => {
        expect(schoolReducer([], {type: GET_SCHOOLS, schools: []})).toEqual([])
    })
})

describe("Toggle Reducer", () => {
    test('Toggle SideMenu', () => {
        expect(togglerReducer({sideMenu: false,
                              editStudentDialog: false},
                              {type: SIDEMENU_TOGGLE}))
        .toEqual({
            sideMenu: true,
            editStudentDialog: false
        })
    })
    test('Toggle Student Edit Dialog', () => {
        expect(togglerReducer({sideMenu: false,
                              editStudentDialog: false},
                              {type: EDIT_STUDENT_TOGGLE}))
        .toEqual({
            sideMenu: false,
            editStudentDialog: true
        })
    })
})

