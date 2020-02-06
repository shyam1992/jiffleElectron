const baseURI = `https://logan.jntesting.net/api/hackathon/`
let EndPoints = {
    internalUsers : `users/internal?per_page=15&page=1&ignore_activity=true&activity_uuid=zhXo-Wy29AoUB4vn8LABdQ&basic_info=true&current_location_uuid=szciKaJXKlCPGdqWSEVDh`,
    externalUsers : `users/external?per_page=15&page=1&ignore_activity=true&activity_uuid=zhXo-Wy29AoUB4vn8LABdQ&basic_info=true&current_location_uuid=szciKaJXKlCPGdqWSEVDh`,
    activities : `activities_rooms?activity_uuid=zhXo-Wy29AoUB4vn8LABdQ&current_location_uuid=szciKaJXKlCPGdqWSEVDhA`
}
const API = {
  fetch : function(params) {
    let requestUrl = `${baseURI}${EndPoints[params.key]}`
    return new Promise((res,rej) => {
      $.get({
        url: requestUrl,
        dataType: 'json',
        crossDomain: true,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'X-Mobile-User-UUID': 'ikWGcSngU4zUmnUwefz41w',
          'Authorization': 'Bearer a70ebe7f3c9ed62f01f2403b0beddb3ceefd5cd56f89919dc0bf9edc48a37d9d',
        }
      }).done(function(result){
        res(result.data)
        offline.storeData({data : result.data, api: params.key})
      }).fail(function(error){
        rej(error)
      });
    })
  },
  update: function(params) {
    let requestUrl = `${baseURI}${params.url}`
    return new Promise((res,rej) => {
      $.ajax({
        type: "POST",
        url: requestUrl,
        data: params.request,
        dataType: 'json',
        crossDomain: true,
        beforeSend: (xhr, options) => {
          //xhr.setRequestHeader('Content-Type', 'application/json')
          return true
        },
        headers:{
          'Access-Control-Allow-Origin': '*',
          'X-Mobile-User-UUID': 'ikWGcSngU4zUmnUwefz41w',
          'Authorization':'Bearer a70ebe7f3c9ed62f01f2403b0beddb3ceefd5cd56f89919dc0bf9edc48a37d9d',
        }
      }).done(function(result){
        console.log(result);
        res(result)
      }).fail(function(error){
        console.log(error);
        rej(error.responseJSON)
      });
    })
  },
  createMeeting: function(data) {
    return new Promise((res,rej) => {
      let url = `/meeting_request/create`
      let meeting_request = {
        activity_uuid: 'zhXo-Wy29AoUB4vn8LABdQ',
        requestor: 'f5tnlzrPAbjYocomMEsn0g',
        quick_meeting: true,
        user_preferences:{
          'f5tnlzrPAbjYocomMEsn0g': {
            meeting_host : false
          }
        },
        location_preference: '',
        custom_fields: {
            currency_field : ''
        },
        external_request_uuid: '',
        meeting_uuid: '',
      };
      meeting_request = {...meeting_request,...data};
      let request = {
        api_params: {
          current_location_uuid: 'szciKaJXKlCPGdqWSEVDhA',
          meeting_request: meeting_request
        }
      }
      this.update({url,request}).
      then(resp => {
        res(resp)
      })
      .catch(err => {
        rej(err.errors)
      })
    })
  }
}