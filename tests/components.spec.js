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
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import StudentList from "../src/components/StudentList";

describe("Component Testing", () => {
  let wrapper;
  describe("App Component", () => {
    test("Displays Navbar at Any Route", () => {
      const initState = {
        toggles: {
          editStudentDialog: false,
        },
        schools : []
      };
      const store = mockStore(initState);
      const shallow = createShallow({ untilSelector: "App" });
      const mount = createMount();
      const wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
          <App  />
          </Provider>
        </MemoryRouter>
      );
      expect(
        wrapper.find(Navbar).length
      ).toEqual(1);
    });
  });
});
