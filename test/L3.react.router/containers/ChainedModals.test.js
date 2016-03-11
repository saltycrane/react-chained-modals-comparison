import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ChainedModals from '../../../src/L3.react.router/containers/ChainedModals';


describe('ChainedModals', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <ChainedModals
        location={{pathname: '/name'}}
        modalList={['/name', '/phone', '/done']} />
    );
    expect(wrapper).to.be.ok;
  });
});
