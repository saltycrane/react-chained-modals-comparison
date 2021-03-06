import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../src/containers/App';


describe('App', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <App />
    );
    expect(wrapper).to.be.ok;
  });
});
