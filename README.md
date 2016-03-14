# React Chained Modals Comparison

A comparison of approaches to create a sequence of modals where clicking the "Next"
button advances to the next modal. Requirements are broken down into levels where
L1 is the simplest and L4 is the most complex. Each higher level includes the
requirements of the previous level.

Approaches compared:

 - [React](https://facebook.github.io/react/) only
 - React + [React Router](https://github.com/reactjs/react-router)
 - React + React Router + [Redux](https://github.com/reactjs/redux)
 - React + React Router + Redux + [Redux Thunk](https://github.com/gaearon/redux-thunk)
 - React + React Router + Redux + [Redux Saga](https://github.com/yelouafi/redux-saga)
 - React + React Router + Redux + Redux Thunk + Async/Await (ES2017)

Interesting, but not covered:

 - [Redux Loop](https://github.com/raisemarketplace/redux-loop)
 
## Demo

http://saltycrane.github.io/react-chained-modals-comparison
 
## Usage

    $ npm install
    $ npm start
    $ # goto http://localhost:3000/#/name in the browser

## Requirements / approaches

### L1 - complexity level 1

 - Clicking the "Next" button advances through a sequence of modals
 - Support a configurable list of modals that is known at page load
 - Fade in animation works

#### [React only](/src/L1.react)
 
### L2 - complexity level 2

 - Support browser Back and Forward navigation
 - Allow deep linking to a specific modal
 - Support saving form data in the modals
 - Show validation errors from the API
 - Show a spinner while waiting for the ajax request

#### [React + React Router](/src/L2.react.router)

### L3 - complexity level 3

 - Display data from the server pre-filled in the user input boxes
 - Using the browser Back and Forward navigation should preserve the user's input
 
#### [React + React Router](/src/L3.react.router)

 - Start to see a need for Redux here. Need to save each of the modals state in parent component.
   When there are many modals with a lot of state, it may be too much to store in the parent component.
   It works w/o Redux with limitations. If we navigate to the end of the modal chain, the state is lost.

#### [React + React Router + Redux](/src/L3.react.router.redux)

 - Redux is used to hold the user data and keep track of current modal.
 - Parent component is still used to navigate to the next modal.
 - Individual modal components make the ajax calls.
 - State and functionality is managed by both Redux and components which may be undesireable.

#### [React + React Router + Redux + Redux Thunk](/src/L3.react.router.redux.thunk)

 - Move ajax calls and naviation from components to actions using redux-thunk.
 - Used `componentWillReceiveProps` to call `gotoNext` but could call it from `storeX`

### L4 - complexity level 4

 - Support conditionally shown modals based on result of an ajax call
   e.g. if a validation step fails, the modal will be shown. Otherwise, it is skipped.

#### [React + React Router + Redux + Redux Thunk](/src/L4.react.router.redux.thunk)

 - Promise related code in `shouldShowCheck` looks a little ugly

#### [React + React Router + Redux + Redux Saga](/src/L4.react.router.redux.saga)

 - Probably there is still not enough complexity for Redux Saga to really shine,
   but it looks a little better to me.

#### [React + React Router + Redux + Redux Thunk + Async/Await](/src/L4.react.router.redux.thunk.aa)

 - async/await syntax is nicer than generator syntax used with redux-saga
 - redux-saga is more testable and can handle more complex workflows
 - requires ES2017 (stage 3)

## See also

 - http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680#35641680 
 - https://medium.com/@MattiaManzati/tips-to-handle-authentication-in-redux-2-introducing-redux-saga-130d6872fbe7
 - http://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async/34933395#34933395
 - http://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux

todo:
 - pass route and data object to a `clickNext` action
   then keep the store part separate from the advancing part
