import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import { createShallow } from "@material-ui/core/test-utils";
import Navbar from "../src/components/Navbar";
import App from "../src/App";
import { Route, HashRouter } from "react-router-dom";
import StudentList from "../src/components/StudentList";
import Routes from "../src/components/Routes";
import SchoolList from "../src/components/SchoolList";
import EditStudentDialog from "../src/components/EditStudentDialog";
import { EDIT_STUDENT_TOGGLE } from "../src/reducers/toggleActions";
import StudentListCard from "../src/components/StudentListCard";
import { IconButton } from "@material-ui/core";
import SideMenu from "../src/components/SideMenu"
import { toggleEditStudentDialog } from '../src/reducers/toggleActions'

let state = {
  toggles: {
    editStudentDialog: false,
  },
  schools: [],
  students: [],
};
const store = mockStore(() => state);

describe("App and Route Component", () => {
  let shallow = createShallow({ untilSelector: "App" });
  let wrapper = shallow(<App store={store} />);
  let RouteWrapper = wrapper.find(Routes).dive();

  test("Should Contain a React Router and <Routes>", () => {
    expect(wrapper.find(HashRouter)).toHaveLength(1);
    expect(wrapper.find(Routes)).toHaveLength(1);
  });
  test("Routes Should Contain At Least one Route", () => {
    expect(RouteWrapper.find(Route).length).toBeGreaterThan(0);
  });
  test("Should Contain a Navbar", () => {
    expect(RouteWrapper.find({ component: Navbar })).toHaveLength(1);
  });
  test("Routes Map To Correct Components", () => {
    state = {
      toggles: {
        sideMenu: false,
        editStudentDialog: true,
      },
      schools: [],
      students: [],
    };
    store.dispatch({ type: EDIT_STUDENT_TOGGLE });

    shallow = createShallow({ untilSelector: "App" });
    wrapper = shallow(<App store={store} />);
    RouteWrapper = wrapper.find(Routes).dive();

    const pathMap = RouteWrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap["/students"]).toBe(StudentList);
    expect(pathMap["/schools"]).toBe(SchoolList);
    expect(pathMap["/students/edit/:id"]).toBe(EditStudentDialog);
  });
});

describe("Student List Component", () => {
  state = {
    toggles: {
      editStudentDialog: false,
    },
    schools: [
      {
        id: "109e16b2-b266-4443-b01c-6ac5b12738b7",
        name: "Test School 1",
        image: "https://picsum.photos/200/300",
      },
    ],
    students: [],
  };
  const store = mockStore(() => state);
  const shallow = createShallow({ untilSelector: "StudentList" });
  const wrapper = shallow(<StudentList store={store} />);
  test("Should Display No Students Yet", () => {
    expect(wrapper.find("h1").html()).toBe("<h1>No one is here yet</h1>");
  });
  test("Should Display a Student", () => {
    wrapper.setProps({
      students: [
        {
          id: "c715d01a-86eb-4f0d-8c90-ccec2be6c5ef",
          name: "Test Studnet 1",
          image: "https://picsum.photos/200/300",
          gpa: 4.0,
          school: "109e16b2-b266-4443-b01c-6ac5b12738b7",
        },
      ],
    });
    expect(wrapper.find(StudentListCard)).toHaveLength(1);
  });
});

describe("Student Card Component", () => {
  state = {
    toggles: {
      editStudentDialog: false,
    },
    schools: [
      {
        id: "109e16b2-b266-4443-b01c-6ac5b12738b7",
        name: "Test School 1",
        image: "https://picsum.photos/200/300",
      },
    ],
    students: [],
  };
  const shallow = createShallow({ untilSelector: "StudentListCard" });
  const wrapper = shallow(
    <StudentListCard
      store={store}
      student={{
        id: "c715d01a-86eb-4f0d-8c90-ccec2be6c5ef",
        name: "Test Studnet 1",
        image: "https://picsum.photos/200/300",
        gpa: 4.0,
        school: "109e16b2-b266-4443-b01c-6ac5b12738b7",
      }}
    />
  );
  test("Should Contain Three Buttons/Icons - Edit, Delete, Profile", () => {
    expect(wrapper.find(IconButton)).toHaveLength(3);
    expect(wrapper.find("EditIcon")).toHaveLength(1);
    expect(wrapper.find("DeleteIcon")).toHaveLength(1);
    expect(wrapper.find("PersonIcon")).toHaveLength(1);
  });
});

describe("Navbar Component", () => {
  let shallow = createShallow({ untilSelector: "Navbar" });
  const wrapper = shallow(<Navbar store={store}  />);
  test("Contains An AppBar, TypoGraphy, Button", () => {
    expect(wrapper.find("WithStyles(ForwardRef(AppBar))")).toHaveLength(1);
    expect(wrapper.find("WithStyles(ForwardRef(Button))")).toHaveLength(1);
    expect(wrapper.find("WithStyles(ForwardRef(Typography))")).toHaveLength(1);
  });
  describe("onClick Methods", () => {
    store.dispatch = jest.fn()
    const action = toggleEditStudentDialog({type: EDIT_STUDENT_TOGGLE})
    test("Side Menu Toggle", () => {
      // Findi
      expect(wrapper.find('MenuIcon')).toHaveLength(1)
      shallow = createShallow({untilSelector: "SideMenu"})
       const sideMenuWrapper = shallow(<SideMenu store={store} />)
       const sideMenuToggle = wrapper.find('MenuIcon')
      //Initial State
     expect(sideMenuWrapper.find("WithStyles(ForwardRef(Drawer))").props().open).toBe(false)
     console.log(sideMenuToggle.debug())
     sideMenuToggle.dive().simulate('click')
    })
  });
});
