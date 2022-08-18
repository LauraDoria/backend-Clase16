const socket = io()

//New message
const addMessage = (e) => {
  const newMessage = {
    user: document.getElementById('username').value,
    message: document.getElementById('messageInput').value,
    date: new Date().toLocaleTimeString()
  }
  console.log(newMessage);
  socket.emit('newMessage', newMessage)
  return false
}

//Display chat history
const render = (messages) => {
  const chatHistory = messages.map(message => {
    return `<div><p><strong>${message.user}</strong> says: ${message.text}</p></div>`
  }).join(" ");
  document.getElementById('messagesContainer').innerHTML = chatHistory;
}

socket.on('showMessages', (messages) => {
    render(messages)
})

//Nuevo mensaje
const save = (newData) => {
    knex('websocketChatAppHistory')
        .insert({
            user: document.getElementById('username').value,
            message: document.getElementById('messageInput').value,
            date: new Date().toLocaleTimeString(),    
        })
        .then(() => {

            return 
        }).catch((error) => {
            console.error(error)
        })
}

//Obtener mensaje
const getById = (productId) => {
    knex
        .from('websocketChatAppHistory')
        .select('*')
        .where('id', productId)
        .then((product) => {
            if (product === null) console.log('No se encontró el mensaje.') 
            return JSON.parse(product)
        }).catch((error) => {
            console.error(error)
        }) 
}

//Obtener todos los mensajes
const getAll = () => {
    knex
        .from('websocketChatAppHistory')
        .select('*')
        .orderBy('id', 'asc')
        .then((products) => {
            if (products === null) console.log('No se encontraron mensajes.');
            return JSON.parse(products)
        }).catch((error) => {
            console.error(error)
        }) 
}

//Eliminar mensaje
const deleteById = (productId) => {
    const productToDelete = getById(id)
    if (productToDelete === null) {
        return 'No se encontró el producto.'
    } else {
        knex
            .from('websocketChatAppHistory')
            .where('id', productId)
            .del('*')
            .then(() => {
                return 'Mensaje eliminado.'
            }).catch((error) => {
                console.error(error)
            })
    }
}

//Eliminar todos los mensajes
const deleteAll = () => {
    knex
        .from('websocketChatAppHistory')
        .del('*')
        .then(() => {
            return 'Se eliminó el historial de mensajes para este usuario.'
        }).catch((error) => {
            console.error(error)
        }) 
}