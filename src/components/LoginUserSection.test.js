const React = require('react');
const ReactDom = require('react-dom');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { configure, shallow, render } = require('enzyme');
import LoginUserSection from './LoginUserSection';

Enzyme.configure({
    adapter: new Adapter(),
});

it('Login Component Renders', () => {
    const div = document.createElement('div');
    ReactDom.render('<LoginUserSection />', div);
    ReactDom.unmountComponentAtNode(div);
});

describe("<LoginUserSection />", function() {
    it('Should Render login <LoginUserSection /> component passing test', () => {
        const userInputSection = shallow(<LoginUserSection />);
    });
});
