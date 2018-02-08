let roles  = {

    Admin: {
        can: ['READ', 'PATCH', 'DELETE', 'UPDATE'],
        inherits: ['standard']
    },
    Super_Admin: {
        inherits: ['Admin'],
        can: ['CREATE']
    },
    Guest: {
        can: ['READ']
    },
    Donor : {
        can: ['READ', 'CREATE', 'UPDATE']
    },
    developer: {
        can: [''],
        inherits: ['admin']
    }
}
module.exports = roles;