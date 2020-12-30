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
import { Route, HashRouter } from "react-router-dom";
import StudentList from "../src/components/StudentList";
import Routes from "../src/components/Routes";
import SchoolList from "../src/components/SchoolList";
import StudentListCard from "../src/components/StudentListCard";
import { Button, Dialog, IconButton, Radio, Select, TextField } from "@material-ui/core";
import SideMenu from "../src/components/SideMenu";
import UserForm from "../src/components/UserForm";
import UserDialog from "../src/components/UserDialog";
import LoginForm from "../src/components/LoginForm"
let state = {
  toggles: {
    userFormDialog: false,
    sideMenu: false,
  },
  schools: [],
  students: [],
};
const store = mockStore(() => state);
store.dispatch = jest.fn();

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
    expect(pathMap["/students/edit/:id"]).toBe(UserDialog);
    expect(pathMap["/register"]).toBe(UserDialog);
  });
});

describe("Student List Component", () => {
  state = {
    toggles: {
      sideMenu: false,
    },
    schools: [
      {
        id: "109e16b2-b266-4443-b01c-6ac5b12738b7",
        name: "Test School 1",
        image: "No Image",
      },
    ],
    students: [],
  };
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
  beforeEach(() => {
    store.dispatch.mockClear();
  });
  let shallow = createShallow({ untilSelector: "Navbar" });
  const wrapper = shallow(<Navbar store={store} />);
  test("Contains An AppBar, TypoGraphy, Button", () => {
    expect(wrapper.find("WithStyles(ForwardRef(AppBar))")).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find("WithStyles(ForwardRef(Typography))")).toHaveLength(1);
  });
  describe("onClick Methods", () => {
    test("Side Menu Toggle", () => {
      expect(wrapper.find("MenuIcon")).toHaveLength(1);
      shallow = createShallow({ untilSelector: "SideMenu" });
      const sideMenuWrapper = shallow(<SideMenu store={store} />);
      const sideMenuToggle = wrapper.find("MenuIcon").shallow();
      // Initial State
      expect(
        sideMenuWrapper.find("WithStyles(ForwardRef(Drawer))").props().open
      ).toBe(false);
      //  Simulating a Button Click - Check That the Store recieved a dispatch.
      sideMenuToggle.prop("onClick")();
      expect(store.dispatch).toHaveBeenCalled();
    });
    test("Register Menu Toggle", () => {
      state = {
        toggles: {
          userFormDialog: false
        }
      }
      const openRegDialog = wrapper.find(Button).filterWhere(n => n.props().to === "/register")
      expect(openRegDialog).toHaveLength(1)
      const regDialogWrapper = shallow(<UserDialog store={store} match={{params:{}}}/>)
      expect(regDialogWrapper.find(Dialog).props().open).toBe(false)
      openRegDialog.prop("onClick")()
      expect(store.dispatch).toHaveBeenCalled()
    })
  });
});

describe("UserForm Component", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
  });

  const shallow = createShallow({ untilSelector: "UserForm" });
  const wrapper = shallow(<UserForm store={store} />);
  test("One Select, One Button, Six State Properties", () => {
    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(Object.keys(wrapper.state())).toHaveLength(9);
  });
  test("Contains the Correct Textfields - first_name, last_name, email, password, image", () => {
    const textFields = wrapper.find(TextField).map(tf => tf.prop("name"))
    expect(textFields).toHaveLength(6)
    expect(textFields.includes('first_name')).toBeTruthy()
    expect(textFields.includes('last_name')).toBeTruthy()
    expect(textFields.includes('email')).toBeTruthy()
    expect(textFields.includes('password')).toBeTruthy()
    expect(textFields.includes('password2')).toBeTruthy()
    expect(textFields.includes('image')).toBeTruthy()
  })

  test("Contains the Correct Radio Permission Toggles - is_student, is_teacher", () => {
    const radios = wrapper.find(Radio).map(radio => radio.prop('name'))
    expect(radios).toHaveLength(2)
    expect(radios.includes("is_student")).toBeTruthy()
    expect(radios.includes("is_teacher")).toBeTruthy()
  })
});

describe("Login Component",() => {
  const shallow = createShallow({ untilSelector: "LoginForm"})
  const wrapper = shallow(<LoginForm store={store} />)
  test("Contains Two TextFields - Email Password", () => {
    const textFields = wrapper.find(TextField).map(tf => tf.prop("name"))
    const buttons = wrapper.find(Button).map(btn => btn.prop("type"))
    expect(textFields).toHaveLength(2)
    expect(buttons).toHaveLength(2)
  } )
})
