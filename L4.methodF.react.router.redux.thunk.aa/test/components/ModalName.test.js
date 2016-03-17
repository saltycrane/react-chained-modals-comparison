import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalName from '../../src/components/ModalName';


describe('ModalName', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ModalName
        step={1}
        formData={{name: 'Kate'}}
      />
    );
    expect(wrapper.find('Button')).to.have.length(1);
  });
});
