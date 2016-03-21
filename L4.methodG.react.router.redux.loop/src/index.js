require('./scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// import { createStore } from 'redux';
// import { install, loop, Effects } from 'redux-loop';

// const firstAction = {
//   type: 'FIRST_ACTION'
// };

// const doSecondAction = (value) => {
//   console.log('doSecondAction');
//   return new Promise((resolve) => {
//     resolve({
//       type: 'SECOND_ACTION',
//       payload: value
//     });
//   });
// }

// const thirdAction = {
//   type: 'THIRD_ACTION'
// };

// const initialState = {
//   firstRun: false,
//   secondRun: false,
//   thirdRun: false
// };

// function reducer(state, action) {
//   switch(action.type) {
//     case 'FIRST_ACTION':
//       console.log('FIRST_ACTION');
//       return loop(
//         {...state, firstRun: true},
//         Effects.batch([
//           Effects.promise(doSecondAction, 'hello'),
//           Effects.constant(thirdAction)
//         ])
//       );

//     case 'SECOND_ACTION':
//       console.log('SECOND_ACTION');
//       return {...state, secondRun: action.payload};

//     case 'THIRD_ACTION':
//       console.log('THIRD_ACTION');
//       return {...state, thirdRun: true};

//     default:
//       return state;
//   }
// }

// const store = createStore(reducer, initialState, install());

// store
//   .dispatch(firstAction)
//   .then(() => {
//     console.log(store.getState());
//   });

// ReactDOM.render(
//   <div>asdf</div>,
//   document.getElementById('root')
// );
