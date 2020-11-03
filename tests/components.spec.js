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
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import StudentList from "../src/components/StudentList";

describe("Component Testing", () => {
  let wrapper;
  let initState;
  let store;
  const mount = createMount();
  const shallow = createShallow()

  describe("App Component", () => {
    beforeEach(() => {
      initState = {
        toggles: {
          editStudentDialog: false,
        },
        schools: [],
      };
      store = mockStore(initState);
    });
    test("Display's Navbar at base URL", () => {
      wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
      expect(wrapper.find(Navbar).length).toEqual(1);
    });
    test("Display's Navbar at any URL", () => {
        wrapper = mount(
            <MemoryRouter initialEntries={["/random"]}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>
        )
        expect(wrapper.find(Navbar).length).toEqual(1)
    });
    test("Display's Student List When URL Contains /students", () => {
      
    })
});
});
