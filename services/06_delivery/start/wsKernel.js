'use strict'

const Ws = use('Ws')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
*/
const globalMiddleware = [
  'Adonis/Middleware/Session',
  'Adonis/Middleware/AuthInit',
  'App/Middleware/AuthCheck',
  'App/Middleware/DateTime'
]

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
| Ws.channel('chat', 'ChatController').middleware(['auth'])
*/
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth'
}

Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
