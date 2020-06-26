const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

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
        
        forecast(lat, long, (error, {temp, weather} = {}) => {
            if(error) {
                return res.send({error})
            }
             
            res.send({
                temperature: temp,
                weather,
                forecast: "Temperature is "+temp+"°C, therefore its "+weather,
                location: loc
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

app.listen(3000, () => {
    console.log("Server running on port 3000")
})