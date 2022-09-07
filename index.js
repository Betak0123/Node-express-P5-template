console.log('Sofus skal fixe mit github.')
let users = []


const express = require('express')
const ip = require('ip')
const suckitLib = require('socket.io')
const app = express()



const port = 6969
console.log('Min IP er: '+ip.address())

app.use('/', express.static('client'))

app.get('/ip', (req, res) =>{
    res.json(
        {
            'ip': ip.address(),
            'port': port
        }
    )
})

const server = app.listen(port, () =>{
    console.log('Server lytter nu på port: ' + port)
})

const serverSuckit = suckitLib(server)

serverSuckit.sockets.on('connection', socket =>{
    console.log('new socket connection established')
    // Socket.on er en eventlistener på nye beskeder fra klienter
    socket.on('chat', message =>{
        // Når serveren modtager beskeder, sender den beskeden rundt til alle
        serverSuckit.sockets.emit('newMessage',message)
        // serverSuckit.sockets.emit('newMessage', {'message': message, 'color':2})
    })
    socket.on('newUsers', user =>{
        users.push({'name':user, 'id': socket.id})
        console.log(user)
    })

})
