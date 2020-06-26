const request = require('request')

const forecast = (lat, long, callback) => {
    url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=33a588fec74134a8f407431f8faa37f6&units=metric'

    request( { url, json:true}, (error, { body } = {}) => {
        if(error){
            callback("Cannot connect to weather service !!!", undefined)
        } else if(body.message) { 
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                weather: body.weather[0].main
            })
        }
    })
}

module.exports = forecast