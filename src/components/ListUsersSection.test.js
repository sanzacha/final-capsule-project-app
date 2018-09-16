const React = require('react');
const ReactDom = require('react-dom');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { configure, shallow, render } = require('enzyme');
import ListUsersSection from './ListUsersSection';

Enzyme.configure({
    adapter: new Adapter(),
});

it('List User Component Renders', () => {
    const div = document.createElement('div');
    ReactDom.render('<ListUsersSection />', div);
    ReactDom.unmountComponentAtNode(div);
});

describe("<ListUsersSection />", function() {
    it('Should Render User List section <ListUsersSection /> component', () => {
        const userList = shallow(<ListUsersSection />);
    });
});
