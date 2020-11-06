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
import { MemoryRouter, Route, HashRouter as Router, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import StudentList from "../src/components/StudentList";
import Routes from "../src/components/Routes"
import SchoolList from "../src/components/SchoolList";
import EditStudentDialog from "../src/components/EditStudentDialog";
import { EDIT_STUDENT_TOGGLE } from "../src/reducers/toggleActions";


describe("Component Testing", () => {
  let wrapper;
  let mountWrapper;
  let initState;
  let store;
  const mount = createMount();
  let shallow;
  
  beforeEach(() => {
    initState = {
      toggles: {
        editStudentDialog: false
      },
      schools: [],
      students: [],
    };
    store = mockStore(initState);
  })
  describe("App Component", () => {
  shallow = createShallow({ untilSelector: "App" });
  test("Should Contain a React Router and <Routes>", () => {
      wrapper = shallow(<App store={store} />)
      expect(wrapper.find(HashRouter)).toBeTruthy()
      expect(wrapper.find(Routes)).toBeTruthy()
    })
})
  describe("Routes Component", () => {
    shallow = createShallow({untilSelector: "Routes"})
    wrapper = shallow(<Routes />)
    test("Should Contain At Least one Route",() => {
      expect(wrapper.find(Route).length).toBeGreaterThan(0)
    })
    test('Routes Map To Correct Components', () => {
      const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
      expect(pathMap['/students']).toBe(StudentList)
      expect(pathMap['/schools']).toBe(SchoolList)
      console.log(wrapper.prop("editStudentDialog"))
      expect(pathMap['/students/edit/:id']).toBe(EditStudentDialog)
    })
  })
});
