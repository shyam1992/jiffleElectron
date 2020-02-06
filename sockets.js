let socket = null
const createSocketConnection = () => {
    console.log('WS connecting now.....')
    socket = io(`http://localhost:2567/`,{
        reconnection: false
    })
    socket.on('connection', () => {
        console.log('WS connected')
    })
    socket.on('notification', (data) => {
        new Notification(data.title, {
            body: data.msg
          })
    })

    socket.on('disconnect', () => {
        console.log('WS disconnected')
    })
    socket.on('reconnect_attempt', (attempt) => {
        console.log('Trying to reconnect...')
        socket.reconnects = false
    })
}

createSocketConnection()