import { v4 as uuidv4 } from "uuid";
import {
  ADD_STUDENT,
  EDIT_STUDENT,
  GET_STUDENTS,
  REMOVE_STUDENT,
  GET_SCHOOLS,
  LOGIN
} from "../src/reducers/actions";
import { studentReducer } from "../src/reducers/studentReducer";
import { schoolReducer } from "../src/reducers/schoolReducer";
import { togglerReducer } from "../src/reducers/togglerReducer"
import {  SIDEMENU_TOGGLE, USER_FORM_DIALOG_TOGGLE, LOGIN_FORM_DIALOG_TOGGLE } from "../src/reducers/toggleActions";
import { userReducer } from '../src/reducers/userReducer'

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
  const fakeToggles = {
    sideMenu: false,
    userFormDialog: false,  
    loginFormDialog: false}
    test('Toggle SideMenu', () => {
        expect(togglerReducer(fakeToggles,
                              {type: SIDEMENU_TOGGLE}))
        .toEqual({
            ...fakeToggles,
            sideMenu: true
        })
    })
    test("Toggle User Form Dialog", () => {
      expect(togglerReducer(fakeToggles, {type: USER_FORM_DIALOG_TOGGLE})).toEqual({...fakeToggles, userFormDialog: true})
    })
    test("Toggle User Login Form Dialog", () => {
      expect(togglerReducer(fakeToggles, {type: LOGIN_FORM_DIALOG_TOGGLE})).toEqual({...fakeToggles, loginFormDialog: true})
    })
})

describe("User Reducer", () => {
   test("Initilal state", () => {
     expect(userReducer({}, {type: LOGIN})).toEqual({})
   })
})

