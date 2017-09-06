/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Dictionary_Helper
* @description Dictionary helper module for data client data to DB data
* @param none
* @returns {Object} || DB friendly Object
* @throws {Attr Not Found Error}
*/

module.exports = {
  user: {
    id_number: '_id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    entry_date: 'entry_date',
    permissions: 'permissions'
  }
}