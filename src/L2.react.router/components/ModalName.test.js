import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ModalName from './ModalName';


describe('ModalName', () => {
  it('renders a button', () => {
    const wrapper = shallow(<ModalName step={1} onClickNext={() => {}} />);
    expect(wrapper.find('Button')).to.have.length(1);
  });

  it('calls click handler', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ModalName step={1} onClickNext={spy} />);
    wrapper.find('Button').simulate('click');
    expect(spy.calledOnce).to.be.true;
  })
});
