'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis');
const schema = require('../app/data/schema');


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/graphql', graphqlAdonis({ schema }));

Route.get('/graphiql', graphiqlAdonis({endpointURL: '/graphql'}))