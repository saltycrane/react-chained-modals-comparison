import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RoutedApp from '../../src/containers/App';


describe('RoutedApp', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <RoutedApp />
    );
    expect(wrapper).to.be.ok;
  });
});
