import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalName from './ModalName';


describe('ModalName', () => {
  it('renders a button', () => {
    const wrapper = shallow(<ModalName step={1} />);
    expect(wrapper.find('Button')).to.have.length(1);
  });
});
