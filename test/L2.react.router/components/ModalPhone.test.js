import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalPhone from '../../../src/L2.react.router/components/ModalPhone';


describe('ModalPhone', () => {
  it('renders a button', () => {
    const wrapper = shallow(<ModalPhone step={1} />);
    expect(wrapper.find('Button')).to.have.length(1);
  });
});
