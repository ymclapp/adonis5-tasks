/**
 * Config source: https://git.io/Jee3I
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { HashConfigContract } from '@ioc:Adonis/Core/Hash'

/*
|--------------------------------------------------------------------------
| Hash Config
|--------------------------------------------------------------------------
|
| The `HashConfigContract` relies on the `HashList` interface which is
| defined inside `contracts` directory.
|
*/
const hashConfig: HashConfigContract = {
  /*
  |--------------------------------------------------------------------------
  | Default hasher
  |--------------------------------------------------------------------------
  |
  | By default we make use of the bcrypt hasher to hash values. However, feel
  | free to change the default value
  |
  */
  default: 'bcrypt',

  list: {
    /*
    |--------------------------------------------------------------------------
    | Argon
    |--------------------------------------------------------------------------
    |
    | Argon mapping uses the `argon2` driver to hash values.
    |
    | Make sure you install the underlying dependency for this driver to work.
    | https://www.npmjs.com/package/@phc/argon2.
    |
    | npm install @phc/argon2@"<2.0.0"
    |
    */
    argon: {
      driver: 'argon2',
      variant: 'id',
      iterations: 3,
      memory: 4096,
      parallelism: 1,
      saltSize: 16,
    },

    /*
    |--------------------------------------------------------------------------
    | Bcrypt
    |--------------------------------------------------------------------------
    |
    | Bcrypt mapping uses the `bcrypt` driver to hash values.
    |
    | Make sure you install the underlying dependency for this driver to work.
    | https://www.npmjs.com/package/@phc/bcrypt.
    |
    | npm install @phc/bcrypt@"<2.0.0"
    |
    */
    bcrypt: {
      driver: 'bcrypt',
      rounds: 10,
    },
  },
}

export default hashConfig
