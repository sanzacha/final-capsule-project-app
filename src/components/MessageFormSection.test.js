const React = require('react');
const ReactDom = require('react-dom');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { configure, shallow, render } = require('enzyme');
import MessageFormSection from './MessageFormSection';

Enzyme.configure({
    adapter: new Adapter(),
});

it('Message Form Component Renders', () => {
    const div = document.createElement('div');
    ReactDom.render('<MessageFormSection />', div);
    ReactDom.unmountComponentAtNode(div);
});

describe("<MessageFormSection />", function() {
    it('Should Render Message Input section <MessageFormSection /> component', () => {
        const messageInputSection = shallow(<MessageFormSection />);
    });
});
