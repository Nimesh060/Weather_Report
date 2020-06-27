const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_error = document.querySelector('#error')
const message_result = document.querySelector('#result')
const max_temp = document.querySelector('#max_temp')
const min_temp = document.querySelector('#min_temp')
const humidity = document.querySelector('#humidity')
 
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    message_error.textContent = 'Loading ...'
    message_result.textContent = ''
    max_temp.textContent = ''
    min_temp.textContent = ''
    humidity.textContent = ''

    const loc = search.value
    fetch("/weather?address="+loc).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message_error.textContent = data.error 
            } else {
                message_error.textContent = data.forecast
                message_result.textContent = data.location
                max_temp.textContent = data.temp_max
                min_temp.textContent = data.temp_min
                humidity.textContent = data.humidity
            }
        })
    })
})
