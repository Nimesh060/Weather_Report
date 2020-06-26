const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_error = document.querySelector('#error')
const message_result = document.querySelector('#result')
 
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    message_error.textContent = 'Loading ...'
    message_result.textContent = ''

    const loc = search.value
    fetch("/weather?address="+loc).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message_error.textContent = data.error 
            } else {
                message_error.textContent = data.forecast
                message_result.textContent = data.location 
            }
        })
    })
})
