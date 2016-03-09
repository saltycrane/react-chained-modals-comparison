import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalBackdrop from './ModalBackdrop';


describe('ModalBackdrop', () => {
  it('renders without error', () => {
    const wrapper = shallow(<ModalBackdrop />);
    expect(wrapper).to.be.ok;
  })
});
