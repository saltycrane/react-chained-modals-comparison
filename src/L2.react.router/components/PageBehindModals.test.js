import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PageBehindModals from './PageBehindModals';


describe('PageBehindModals', () => {
  it('renders text', () => {
    const wrapper = shallow(<PageBehindModals />);
    const text = wrapper.find('p').first().text();
    expect(text).to.contain('Background text');
  });
});
