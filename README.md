# React Chained Modals Comparison

A comparison of approaches to create a sequence of modals where clicking the "Next"
button advances to the next modal. Requirements are broken down into levels where
L1 is the simplest and L5 is the most complex. Each higher level includes the
requirements of the previous level.

Approaches compared:

 - React only
 - React + React Router
 - React + React Router + Redux
 - React + React Router + Redux + Redux Thunk
 - React + React Router + Redux + Redux Saga
 
## Demo

http://saltycrane.github.io/react-chained-modals-comparison
 
## Usage

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

#### [React + React Router](/src/L2.react.router)
 
### L3 - complexity level 3

 - Support saving form data in the modals
 - Show validation errors from the API
 - Show a spinner while waiting for the ajax request

#### [React + React Router](/src/L3.react.router)

### L4 - complexity level 4

 - Display data from the server pre-filled in the user input boxes
 - Using the browser Back and Forward navigation should preserve the user's input
 
#### [React + React Router](/src/L4.react.router)

 - Start to see a need for Redux here. Need to save each of the modals state in parent component.
   When there are many modals with a lot of state, it may be too much to store in the parent component.
   It works w/o Redux with limitations. If we navigate to the end of the modal chain, the state is lost.

#### [React + React Router + Redux](/src/L4.react.router.redux)

 - Redux is used to hold the user data and keep track of current modal.
 - Parent component is still used to navigate to the next modal.
 - Individual modal components make the ajax calls.
 - State and functionality is managed by both Redux and components which may be undesireable.

#### [React + React Router + Redux + Redux Thunk](/src/L4.react.router.redux.thunk)

 - Move ajax calls and naviation from components to actions using redux-thunk.

### L5 - complexity level 5

 - Support conditionally shown modals
   e.g. if a validation step fails, the modal will be shown. Otherwise, it is skipped.
   Skip a modal based on conditions present at time of page load (e.g. backend says so).

#### [React + React Router + Redux + Redux Thunk](/src/L5.react.router.redux.thunk)

 - Promise related code in `shouldShowCheck` looks a little ugly

#### [React + React Router + Redux + Redux Saga](/src/L5.react.router.redux.saga)

## See also

 - http://stackoverflow.com/a/35641680/101911
