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
 - hopefully: React + React Router + Redux + Redux Saga
 
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
 - Choice: React only
 
### L2 - complexity level 2

 - Support browser Back and Forward navigation
 - Allow deep linking to a specific modal
 - Choice: React + React Router
 
### L3 - complexity level 3

 - Support saving form data in the modals
 - Show validation errors from the API
 - Show a spinner while waiting for the ajax request

### L4 - complexity level 4

 - Display data from the server pre-filled in the user input boxes
 - Using the browser Back and Forward navigation should preserve the user's input
 
#### without Redux

 - Start to see a need for Redux here. Need to save each of the modals state in parent component.
   When there are many modals with a lot of state, it may be too much to store in the parent component.
   It works w/o Redux with limitations. If we navigate to the end of the modal chain, the state is lost.

#### with Redux but no thunks

 - Redux is used to hold the user data and keep track of current modal.
 - Wrapper component is still used to navigate to the next modal.
 - Individual modal components make the ajax calls.
 - State and functionality is managed by both Redux and components which may be undesireable.

#### with Redux and redux-thunk

 - Move ajax calls to actions.js using redux-thunk.
 - Move navigation from component to actions using redux-thunk.
 - More state is now in redux but the component still does some management
   i.e. check when the redux state says the request is successful then advance to the next modal
 - Uses componentWillReceiveProps to trigger `gotoNext`.
   Prefer to do this in the Promise's .then() so it's more connected like Dan Abramov
   showed in http://stackoverflow.com/a/35641680/101911
 - Related code is spread amongst actions, reducers and components.

### L5 - complexity level 5

 - Support conditionally shown modals
   e.g. if a validation step fails, the modal will be shown. Otherwise, it is skipped.
   Skip a modal based on conditions present at time of page load (e.g. backend says so).
