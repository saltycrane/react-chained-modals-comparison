import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store'

import ChainedModals from '../../src/containers/ChainedModals';
import ModalName from '../../src/components/ModalName';


const mockStore = configureMockStore();

describe('ChainedModals', () => {
  it('renders without error', () => {
    const store = mockStore({});
    const wrapper = shallow(
      <Provider store={store}>
        <ChainedModals location={{pathname: '/name'}}>
          <ModalName />
        </ChainedModals>
      </Provider>
    );
    expect(wrapper).to.be.ok;
  });
});
