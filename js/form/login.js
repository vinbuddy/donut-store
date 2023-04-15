import { user } from '../user/user.js'
import { validateSignIn } from './validate.js'

function start() {
    const form = document.querySelector('#form-login')
    const submitBtn  = form.querySelector('#submit-btn')

    
    function onSubmit (data) {
        user.set(data)

        submitBtn.classList.add('loading')
        submitBtn.style.pointerEvents = 'none'
        submitBtn.disabled = true

        setTimeout(() => {
            submitBtn.style.pointerEvents = 'auto'
            submitBtn.classList.remove('loading')
            submitBtn.disabled = false

            // history.back()

            let paths = window.location.pathname.split('/')
            let length = paths.length
            paths[length - 1] = 'index.html'

            let path = paths.join('/')

            window.location.href = window.location.origin + path
        }, 2000)
    }

    validateSignIn(form, onSubmit)
}

start()