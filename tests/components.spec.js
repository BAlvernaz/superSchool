import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import { createMount, createShallow } from "@material-ui/core/test-utils";
import Navbar from "../src/components/Navbar";
import App from "../src/App";
import {
  MemoryRouter,
  Route,
  HashRouter as Router,
  HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import StudentList from "../src/components/StudentList";
import Routes from "../src/components/Routes";
import SchoolList from "../src/components/SchoolList";
import EditStudentDialog from "../src/components/EditStudentDialog";
import { EDIT_STUDENT_TOGGLE } from "../src/reducers/toggleActions";
import StudentListCard from "../src/components/StudentListCard";

const initState = {
  toggles: {
    editStudentDialog: false,
  },
  schools: [],
  students: [],
};
const store = mockStore(initState);

describe("App Component", () => {
  const shallow = createShallow({ untilSelector: "App" });
  const wrapper = shallow(<App store={store} />);

  test("Should Contain a React Router and <Routes>", () => {
    expect(wrapper.find(HashRouter)).toHaveLength(1);
    expect(wrapper.find(Routes)).toBeTruthy();
  });
});

describe("Routes Component", () => {
  const shallow = createShallow({ untilSelector: "Routes" });
  const wrapper = shallow(<Routes editStudentDialog />);
  test("Should Contain At Least one Route", () => {
    expect(wrapper.find(Route).length).toBeGreaterThan(0);
  });
  test("Should Contain a Navbar", () => {
    expect(wrapper.find({ component: Navbar })).toHaveLength(1);
  });
  test("Routes Map To Correct Components", () => {
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap["/students"]).toBe(StudentList);
    expect(pathMap["/schools"]).toBe(SchoolList);
  });
});

describe("Student List Component", () => {
  const newState = {
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
  const store = mockStore(newState);
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
