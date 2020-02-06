const companySection = $('#company')
const eventSection =  $('#event')
const bookMeetingSection = $('#bookMeeting')
let currentPage = 'Company'

$('#companyNameBtn').click(() => {
    companySection.addClass('hide')
    eventSection.removeClass('hide')
    currentPage = 'Event'
})

$('#requestMeeting').click(() => {
    eventSection.addClass('hide')
    bookMeetingSection.removeClass('hide')
    currentPage = 'BookMeeting'
    let networkStatus  = navigator.onLine
    if (navigator.onLine) {
        initBookMeeting()
    } else {
        updateNetworkIndicator()
    }

})

$('#gotohome').click(() => {
    eventSection.addClass('hide')
    bookMeetingSection.addClass('hide')
    companySection.removeClass('hide')
    currentPage = 'Company'
})