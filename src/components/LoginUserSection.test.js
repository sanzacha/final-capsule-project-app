// import React from 'react';
// import Enzyme, { mount, configure, shallow, render } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { expect } from 'chai';


const ReactDom = require('react-dom');
const Enzyme = require('enzyme');
const { mount, configure, shallow, render } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { expect } = require('chai');

Enzyme.configure({
    adapter: new Adapter()
});

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render('<LoginUserSection />', div);
    ReactDom.unmountComponentAtNode(div);
});

describe("<LoginUserSection />", function() {
    it('should render user login <LoginUserSection /> component', () => {
        const loginUserSection = shallow('<LoginUserSection />');

        expect(loginUserSection.find('form')).to.have.length(1);
    });
  });

