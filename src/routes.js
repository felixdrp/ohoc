import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

/**
 * React-router components.
 *
 * React router help to render component related to the path or url.
 *
 * Please have a look to:
 * https://github.com/reactjs/react-router
 *
 */

// Please add new core components to /components/index.js

import {
  // Core components
  AppContainer,
  BrowseRecords,
  RecordContainer,
  RecordCreate,
  RecordView,
} from './components/'

import App from './App'

// Assign the history:

// ALERT!!!! if any change in survye routes... change also 'survey-types.js'
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer} >
      <IndexRoute component={BrowseRecords} />

      <Route path="browser" component={BrowseRecords} />

      <Route path="records" component={RecordContainer} >
        <Route path="/record/:recordId(/:recordName)" component={RecordView} />
      </Route>

      <Route path="records" component={RecordContainer} >
        <Route path="/controlRoom/record/create" component={RecordCreate} />
        <Route path="/controlRoom/record/edit/:recordId(/:recordName)" component={RecordView} />
      </Route>
    </Route>
  </Router>
)

export default routes
