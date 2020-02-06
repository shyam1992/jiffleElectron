let fetchCallBack = {}
let meetings = []
$('#storeMeetingData').click(() => {
    let meeting_request = {
        meeting_with: $('#meeting_with_offline').val(),
        room_uuid: $('.js-data-room-cache').val(),
        users:[...$('.js-data-internal-users-cache').val(), ...$('.js-data-external-users-cache').val()]
      };
      meeting_request.start_time = `2020-02-07 ${$('#startTime').text()}`;
      meeting_request.end_time = `2020-02-07 ${$('#endTime').text()}`;
      meetings.push(meeting_request)
      $('#offlineModal').modal('hide')
})

const syncMeetings = () => {
    if(meetings.length > 0) {
        meetings.forEach((item) => {
            API.createMeeting(item)
        })
    }
}

const offline = {
    storeData({data, api}) {
        ipcRenderer.send('storeData', {data, fileName : api})
    },
    fetchData({fileName, callBack}) {
        fetchCallBack[fileName] = callBack
        ipcRenderer.send('fetchData', fileName)
    }
}

ipcRenderer.on('storeData', (event, arg) => {
    console.log(arg) 
})

ipcRenderer.on('fetchData', (event, arg) => {
    fetchCallBack[arg.fileName](arg.data)
    console.log('in offline',arg) 
})
