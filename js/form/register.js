import {validateSignUp} from './validate.js'
import { user } from '../user/user.js'
import { storeAccounts } from '../user/storeAccounts.js'

function start() {
    const form = document.querySelector('#form-register')
    const video = document.querySelector('#form-video')
    const submitBtn  = form.querySelector('#submit-btn')

    function onSubmit(data) {
        user.set(data)
        storeAccounts.set(data)

        video.play() // animation
        submitBtn.classList.add('loading')
        submitBtn.style.pointerEvents = 'none'
        submitBtn.disabled = true
        
        // Redirect to home page when submit
        setTimeout(() => {
            submitBtn.style.pointerEvents = 'auto'
            submitBtn.classList.remove('loading')
            submitBtn.disabled = false
            
            window.location.href = "/"
        }, 12000)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 