import path from 'path'
import qs from 'qs'
import Express from 'express'
import React from 'react'
import { Router, match, createMemoryHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import reducers from './reducers'
import App from './containers/App'
import { fetchCounter } from './api/counter'
import { renderToString } from 'react-dom/server'

import routes from './routes'

const app = Express()
const port = 8000

// view engine setup
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/server/views'))
// serve static files from /public
app.use('/public', Express.static(path.join(__dirname, '/public')))

// Catch request w/ SSR
app.use(function(req, res, next) {
  match({
    routes,
    location: req.path
  }, (error, redirectLocation, renderProps) => {
    if (error === null) {
      // test if route is a redirect
      if (redirectLocation) {
        return res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
      }
      // Compile an initial state
      const store = createStore(reducers)

      // Bind router on reducer
      // TODO @Nico implement redux-react-router middleware
      // const history = syncHistoryWithStore(browserHistory, store)

      // Get location from resolved props
      const location = renderProps.router.location.pathname
      // initialize history in server mode
      const history = createMemoryHistory(location)

      // render html tree
      const html = renderToString(
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      )
      // Grab the initial state from our Redux store
      const finalState = store.getState()
      // render through pug tpl
      return res.render('layout', {
        headTitle: `NMY - ${location}`,
        htmlData: html,
        initialState: JSON.stringify(finalState)
      })
    }
    if (error === undefined) {
      return next()
    }
  })
})

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter, 10) || apiResult || 0

    // Compile an initial state
    let preloadedState = { counter }

    // Create a new Redux store instance
    const store = createStore(reducers, preloadedState)

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    // res.send(renderFullPage(html, finalState))
    res.render('layout', { headTitle: 'Home', htmlData: html, initialState: finalState })
  })
}

// app.use(handleRender)
app.listen(port, 'localhost')
console.log('App listen on port ', port)
