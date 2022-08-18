//Require libraries
const express = require('express')
const {Server: IOServer, Socket} = require('socket.io')
const {Server: HttpServer} = require('http')
const router = require('./router')
const path = require('path');
const multer = require('multer')

//Instance server
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'))

//Middlewares
app.use(express.static(path.join(__dirname, '../public/views')))
app.get('/', (req, res) => {
    res.render('home')
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)

//Websocket chat
const messageHistory = [
    {user: 'user1', message: 'Hola!'},
    {user: 'user2', message: 'Cómo va?'},
    {user: 'user3', message: 'Bien, ustedes?'}
]
fs.writeFileSync('./chatHistory.txt', JSON.stringify(messageHistory, null, 2), 'utf-8')
io.on('connection', (socket) => {
   console.log('New user connected');
   socket.emit('showMessages', messageHistory)

   socket.on('newMessage', (data) => {
       messageHistory.push(data);
       fs.writeFileSync('./chatHistory.txt', JSON.stringify(messageHistory, null, 2), 'utf-8')
       io.sockets.emit('showMessages', messageHistory);
   })
   socket.on('disconnect', () => console.log('User disconnected'))
})

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.log( `Se produjo un error: ${error}`)
})