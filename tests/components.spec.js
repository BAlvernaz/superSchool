import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store'

const mockStore = configureStore();

import Navbar from '../src/components/Navbar';
import App from '../src/App'


describe("Component Testing", () => {
    let wrapper;
    describe("App Component", () => {

        test('Contains a Navbar', () => {
            const initState = {
                toggles: {
                    editStudentDialog: false
                }
            }
            const store = mockStore(initState)
            wrapper = shallow(<App store={store}/>)
            const component = wrapper.dive()
            expect(component.find("Router").length).toEqual(1)
        })
    })
})