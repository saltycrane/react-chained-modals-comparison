# React Chained Modals

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
 
#### L4 without Redux

 - Start to see a need for Redux here. Need to save each of the modals state in parent component.
   When there are many modals with a lot of state, it may be too much to store in the parent component.
   It works w/o Redux with limitations. If we navigate to the end of the modal chain, the state is lost.

#### L4 with Redux but no thunks

 - State is stored both in Redux and the modal components which may be undesireable
   The modal components make the ajax calls.
   The ChainedModals wrapper component does the route changes.

#### L4 with Redux and redux-thunk

 - Move ajax calls to actions.js using redux-thunk.
 - Move more navigation from component to redux.
 - More state is now in redux but the component still has to do some management
   i.e. check when the redux state says the request is successful then advance to the next modal
 - A negative: using componentWillReceiveProps to trigger `gotoNext`.
   Prefer to do this in a .then() so it's more connected.

### L5 - complexity level 5

 - Support conditionally shown modals
   e.g. if a validation step fails, the modal will be shown. Otherwise, it is skipped.
