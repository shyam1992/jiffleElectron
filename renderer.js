// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
ipcRenderer.sendSync('synchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg)
})
ipcRenderer.send('asynchronous-message', 'ping')

syncMeetings = null

const networkStabilityDiv = document.getElementById('checkNetworkStability')
var connection = navigator.connection
var type = connection.effectiveType;
const start = () => {
    updateNetworkIndicator()
}

function updateNetworkIndicator() {
    let networkStatus  = navigator.onLine
    if(!navigator.onLine && currentPage && currentPage === 'BookMeeting') {
        $('#confirmationModal').modal('show')
    } else {
        syncMeetings && syncMeetings()
    }
    console.log('network fluctuation', networkStatus)
}

// Update the online status icon based on connectivity
window.addEventListener('online',  updateNetworkIndicator)
window.addEventListener('offline', updateNetworkIndicator)

document.getElementById('confirmshowOffline').addEventListener('click', () => {
    $('#confirmationModal').modal('hide')
    $('#offlineModal').modal('show')
    initOffline()
})

function updateConnectionStatus() {
    let myNotification = new Notification('Network Issue', {
        body: 'Your Network is Fluctuating'
    })
      
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
  console.log("Connection type changed from " + type + " to " + connection.effectiveType)
  type = connection.effectiveType
}

connection.addEventListener('change', updateConnectionStatus)

start()