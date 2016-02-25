# React Chained Modals

### Level 1

 - Clicking the "Next" button advances through a sequence of modals
 - Support a configurable list of modals that is known at page load
 - Fade in animation works
 - Choice: React only
 
### Level 2

 - Support browser Back and Forward navigation
 - Allow deep linking to a specific modal
 - Choice: React + React Router
 
### Level 3

 - Support saving form data in the modals
 - Show validation errors from the API
 - Show a spinner while waiting for the ajax request

### Level 4

 - Display data from the server pre-filled in the user input boxes
 - Using the browser Back and Forward navigation should preserve the user's input
   Start to see a need for Redux here. Need to save modal state in parent component.
   It works w/o Redux with limitations. If we navigate to the end of the modal chain, the state is lost.
