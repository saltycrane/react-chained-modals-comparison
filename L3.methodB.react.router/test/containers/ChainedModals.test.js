import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ChainedModals from '../../src/containers/ChainedModals';
import ModalName from '../../src/components/ModalName';


describe('ChainedModals', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ChainedModals
        location={{pathname: '/name'}}
        modalList={['/name', '/phone', '/done']}
        formData={{name: 'James'}}
      >
        <ModalName />
      </ChainedModals>
    );
    expect(wrapper).to.be.ok;
  });
});
