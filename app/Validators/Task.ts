import { schema, validator } from '@ioc:Adonis/Core/Validator'

class TaskValidator {
  /**
   * Using a pre-compiled schema you can validate the "shape", "type",
   * "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ inTable: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = validator.compile(schema.create({
    title: schema.string(),
  }))

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
  */
  public messages = {
    'title.required': 'Enter task title',
  }
}

export default new TaskValidator()
