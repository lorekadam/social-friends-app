import React from 'react';
import { shallow, mount } from 'enzyme';
import Register from '../pages/Register';

describe('<Register />', () => {
  xit('Renders', () => {
    const wrapper = mount(<Register />);
    console.log(wrapper.debug());
  });
});
