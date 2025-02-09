/**
 * Contract source: https://git.io/Jee3t
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Core/Hash' {
  import { HashDrivers } from '@ioc:Adonis/Core/Hash'

  interface HashersList {
    bcrypt: HashDrivers['bcrypt'],
    argon: HashDrivers['argon'],
  }
}
