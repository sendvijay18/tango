const { USERS, ROLES } =require('../usersRoles'); 
const crypto = require('crypto')

function setUser(req,res, next) {
    const userid = req.body.userid
    // console.log("user set done"+ userid)
    if(userid){
        req.user = USERS.find(user => user.id === userid)
    }
    next()
}

function authenticateUser(req, res, next) {
    console.log(req.user)
    if(req.user == null) {
        res.status(403)
        return res.send('sign In with user credentials')
    }
    next()
}

function authenticateRole(userRole) {
    return (req, res, next) => {
        // console.log(userRole)
        // console.log(req.user.role)
        if(req.user.role !== userRole){
            res.status(401)
            return res.send('User Type not allowed')
        }
        return res.send('Admin')
        next()
    }
}

function getEncryptedText(req, res, next){
    // console.log(crypto.getCiphers());
    let iv = crypto.randomBytes(16);

    let key = 'tangoApp123443563456758857863255'
    let mesg = req.body.mesg
    // console.log(iv)
    let cipher = crypto.createCipheriv('aes256', key, iv)
    let encrypted = cipher.update(mesg, 'utf-8', 'hex')
    encrypted += cipher.final('hex');
    // decryption
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')

    return res.send("Decrypted Mesg: " +encrypted + "\nDecrypted Mesg: " + decrypted)
}


module.exports = {
    setUser, authenticateUser, authenticateRole, getEncryptedText 
}