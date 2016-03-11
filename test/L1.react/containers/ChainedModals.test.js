import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ModalName from '../../../src/L1.react/components/ModalName';
import ModalPhone from '../../../src/L1.react/components/ModalPhone';
import ChainedModals from '../../../src/L1.react/containers/ChainedModals';


describe('ChainedModals', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ChainedModals modalList={[ModalName, ModalPhone]} />
    );
    expect(wrapper).to.be.ok;
  });
});
