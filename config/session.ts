/**
 * Config source: https://git.io/JeYHp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { SessionConfigContract } from '@ioc:Adonis/Addons/Session'

const sessionConfig: SessionConfigContract = {
  driver: Env.get('SESSION_DRIVER', 'cookie') as string,

  /*
  |--------------------------------------------------------------------------
  | Cookie name
  |--------------------------------------------------------------------------
  |
  | The name of the cookie that will hold the session id.
  |
  */
  cookieName: 'adonis-session',

  /*
  |--------------------------------------------------------------------------
  | Clear session when browser closes
  |--------------------------------------------------------------------------
  |
  | Whether or not you want to destroy the session when browser closes. Setting
  | this value to `true` will ignore the `age`.
  |
  */
  clearWithBrowser: false,

  /*
  |--------------------------------------------------------------------------
  | Session age
  |--------------------------------------------------------------------------
  |
  | The duration for which session stays active after no activity. A new HTTP
  | request to the server is considered as activity.
  |
  | The value can be a number in milliseconds or a string that must be valid
  | as per https://npmjs.org/package/ms package.
  |
  | Example: `2 days`, `2.5 hrs`, `1y`, `5s` and so on.
  |
  */
  age: '2h',

  /*
  |--------------------------------------------------------------------------
  | Cookie values
  |--------------------------------------------------------------------------
  |
  | The cookie settings are used to setup the session id cookie and also the
  | driver will use the same values.
  |
  */
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: false,
  },

  /*
  |--------------------------------------------------------------------------
  | Configuration for file driver
  |--------------------------------------------------------------------------
  |
  | The file driver needs absolute path to the directory in which sessions
  | must be stored.
  |
  */
  file: {
    location: '',
  },

  /*
  |--------------------------------------------------------------------------
  | Redis driver
  |--------------------------------------------------------------------------
  |
  | The redis connection you want session driver to use. The same connection
  | must be defined inside `config/redis.ts` file
  |
  */
  redisConnection: 'session',
}

export default sessionConfig
