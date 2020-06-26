const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3R1bm5lcjA3MCIsImEiOiJja2JjYXF0YjYwMDR0MnpsOXQ5ZGVtenVmIn0.eD8tXx2zaJ4lhTvCnvvZVQ&limit=1'

    request({ url, json:true}, (error, {body} = {} )=> {
        if(error){
            callback("Cannot connect to weather service !!!", undefined)
        } else if(body.message || body.features.length === 0){
            callback("Unable to find Address, try another search !!!", undefined)
        } else { 
            callback(undefined, {
                long : body.features[0].center[0],
                lat : body.features[0].center[1],
                loc : body.features[0].place_name
            })
        } 
    })
}



module.exports = geocode