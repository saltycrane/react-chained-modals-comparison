import React from 'react';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import ChainedModals from './ChainedModals';


const App = () => (
  <div>
    <PageBehindModals />
    <ChainedModals modalList={[ModalName, ModalPhone]} />
  </div>
);

export default App;
