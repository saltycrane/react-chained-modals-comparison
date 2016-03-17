import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalPhone from '../../src/components/ModalPhone';


describe('ModalPhone', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ModalPhone
        step={2}
        formData={{phone: '234'}}
      />
    );
    expect(wrapper.find('Button')).to.have.length(1);
  });
});
