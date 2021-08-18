const express = require('express')
const cors = require('cors')
const app = express()
const socket = require("socket.io")
const crypto = require('crypto')

const { USERS, ROLES } = require('./usersRoles');
const { setUser, authenticateUser, authenticateRole, getEncryptedText } = require('./authservice/auth');
app.use(express.json())
app.use(cors())
app.use(setUser)
const users = []

app.get('/admin', authenticateUser, authenticateRole(ROLES.ADMIN), (req,res) => {
    res.send('Admin page')
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/encrypt', getEncryptedText, (req,res) => {
    res.send("task1");
})

const server = app.listen('3000', () => {
    console.log("server running on port no. 3000");
})

io = socket(server)
io.on('connection', (socket) => {
    console.log(socket.id)
    
    socket.on("notifyAdmin", (data) => {
        data.user = USERS.find(user => {
            user.id === data
            if(ROLES.ADMIN !==  user.role){
                console.log("new non admin user logged in")
                socket.join(data);
            } else {
                console.log("Admin user logged in")
            }
        }) 
    })

    socket.on('Disconnect', () => {
        console.log('User Disconnects')
    })
})
