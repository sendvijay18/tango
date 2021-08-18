const ROLES = {
    ADMIN: 'admin',
    GENERAL: 'general'
}

const USERS = [
    {id: 1, name: 'vijay', role: ROLES.GENERAL},
    {id: 2, name: 'tango', role: ROLES.ADMIN}
]

module.exports = {
    USERS, ROLES
}