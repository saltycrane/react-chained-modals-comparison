import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalName from '../../src/components/ModalName';
import ModalPhone from '../../src/components/ModalPhone';
import ChainedModals from '../../src/containers/ChainedModals';


describe('ChainedModals', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ChainedModals modalList={[ModalName, ModalPhone]} />
    );
    expect(wrapper).to.be.ok;
  });
});
