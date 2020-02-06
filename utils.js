const initBookMeeting = () => {
    API.fetch({key : 'internalUsers'}).then((data) => {
        $('.js-data-internal-users-ajax').select2({
            data : prepareDDNData(data.items)
          })
    })
    API.fetch({key : 'externalUsers'}).then((data) => {
        $('.js-data-external-users-ajax').select2({
            data : prepareDDNData(data.items)
        })
    })
    
    API.fetch({key : 'activities'}).then((data) => {
        $('.js-data-room-ajax').select2({
            data : data.activity.rooms.map(item => {
                return {
                id : item.uuid,
                text: item.name
            }})
        })
    })
    
    $("#schedule-demo").jqs({
          mode:"edit"
    });
    $('#cover').css('diaply','block')
    setTimeout(() => {
        $('#cover').css('diaply','none')
    },2000)
}

const prepareDDNData = (data) => {
    return data.map(item => {
        return {
            id : item.uuid,
            text : `${item.first_name} ${item.last_name}`
        }
    })
}

const loadInternalUsers = (data) => {
    $(".js-data-internal-users-cache").select2({
        data: prepareDDNData(JSON.parse(data).items)
    })
}

const loadExternalUsers = (data) => {
    $(".js-data-external-users-cache").select2({
        data: prepareDDNData(JSON.parse(data).items)
    })
}

const loadRooms = (data) => {
    $(".js-data-room-cache").select2({
        data: JSON.parse(data).activity.rooms.map(item => {
            return {
            id : item.uuid,
            text: item.name
        }})
    })
}
let timeArray = [
    {
        id:'09:00 AM',
        text: '09:00 AM'
    },
    {
        id:'09:30 AM',
        text: '09:30 AM'
    },
    {
        id:'10:00 AM',
        text: '10:00 AM'
    },
    {
        id:'10:30 AM',
        text: '10:30 AM'
    },
    {
        id:'11:00 AM',
        text: '11:00 AM'
    },
    {
        id:'11:30 AM',
        text: '11:30 AM'
    },
    {
        id:'12:00 PM',
        text: '12:00 PM'
    },
    {
        id:'12:30 PM',
        text: '12:30 PM'
    },
    {
        id:'01:00 PM',
        text: '01:00 PM'
    },
    {
        id:'01:30 PM',
        text: '01:30 PM'
    },
    {
        id:'02:00 PM',
        text: '02:00 PM'
    },
    {
        id:'02:30 PM',
        text: '02:30 PM'
    },
    {
        id:'03:00 PM',
        text: '03:00 PM'
    },
    {
        id:'03:30 PM',
        text: '03:30 PM'
    },
    {
        id:'04:00 PM',
        text: '04:00 PM'
    },
    {
        id:'04:30 PM',
        text: '04:30 PM'
    },
    {
        id:'05:00 PM',
        text: '05:00 PM'
    },
    {
        id:'05:30 PM',
        text: '05:30 PM'
    },
    {
        id:'06:00 PM',
        text: '06:00 PM'
    },
    {
        id:'06:30 PM',
        text: '06:30 PM'
    },
]
const initOffline = () => {
    offline.fetchData({fileName : 'internalUsers', callBack: loadInternalUsers})
    offline.fetchData({fileName : 'externalUsers', callBack: loadExternalUsers})
    offline.fetchData({fileName : 'activities', callBack: loadRooms})
    $("#datepicker").datepicker();
    $("#startTime").select2({
        data: timeArray
    })
    $("#endTime").select2({
        data: timeArray
    })
}

$('#submitOnlineMeeting').click(() => {
    let meeting_request = {
        meeting_with: $('#meeting_with').val(),
        room_uuid: $('.js-data-room-ajax').val(),
        users: [...$('.js-data-internal-users-ajax').val(), ...$('.js-data-external-users-ajax').val()]
      };
      meeting_request.start_time = `2020-02-07 ${$('.jqs-period-time').text().split(' - ')[0]} AM`
      meeting_request.end_time = `2020-02-07 ${$('.jqs-period-time').text().split(' - ')[1]} AM`;
    API.createMeeting(meeting_request).then(() =>{
        new Notification('Meeting Created', {
            body: 'Meeting Created Successfully'
        })
        eventSection.removeClass('hide')
        bookMeetingSection.addClass('hide')
        currentPage = 'Event'
    })
})