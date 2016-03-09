import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import ChainedModals from './ChainedModals';


describe('ChainedModals', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ChainedModals modalList={[ModalName, ModalPhone]} />
    );
    expect(wrapper).to.be.ok;
  });
});
