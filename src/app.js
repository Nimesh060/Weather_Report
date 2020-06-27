const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

// heroku port number
const port = process.env.PORT || 3000

// Path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, "../template/partials")

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'I am at help page',
        title: 'Help',
        name : 'Nimesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Nimesh'
    })
})

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Nimesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Provide Address !"
        })
    }

    geocode(req.query.address, (error, {lat, long, loc} = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(lat, long, (error, {temp, weather, temp_min, temp_max, humidity} = {}) => {
            if(error) {
                return res.send({error})
            }
             
            res.send({
                temperature: temp,
                weather,
                forecast: "Temperature is "+temp+"°C, therefore expecting "+weather,
                location: loc,
                temp_min: "Minimum Temperature : "+temp_min+"°C",
                temp_max: "Maximum Temperature : "+temp_max+"°C",
                humidity: "Humidity : "+humidity+"%"
            })
        })
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nimesh',
        errorMessage: 'Help Article Not Found' 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nimesh',
        errorMessage: 'Page Not Found' 
    })
})

app.listen(port, () => {
    console.log("Server running on port " + port)
})