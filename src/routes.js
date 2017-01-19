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
  BrowserToEdit,
  CategoriesContainer,
  CategoriesView,
  RecordContainer,
  RecordCreate,
  RecordView,
  RecordEdit,
} from './components/'

import App from './App'

// Assign the history:
const urlBase = "/ohoc"

// ALERT!!!! if any change in survye routes... change also 'survey-types.js'
var routes = (history) => (
  <Router history={history}>
    <Route path={urlBase} component={AppContainer} >
      <IndexRoute component={BrowseRecords} />

      <Route path="browser" component={BrowseRecords} />

      <Route path="categories" component={CategoriesContainer} >
        <Route path={urlBase + "/categories/list/:categoryId(/:page)"} component={CategoriesView} />
      </Route>

      <Route path="records" component={RecordContainer} >
        <Route path={urlBase + "/record/create"} component={RecordCreate} />
        <Route path={urlBase + "/record/:recordId(/:recordName)"} component={RecordView} />
      </Route>

      <Route path="controlRoom" component={RecordContainer} >
        <IndexRoute component={BrowserToEdit} />

        <Route path={urlBase + "/controlRoom/record/create"} component={RecordCreate} />
        <Route path={urlBase + "/controlRoom/record/edit/:recordId(/:recordName)"} component={RecordEdit} />
      </Route>
    </Route>
  </Router>
)

export default routes
