import {validateSignUp} from './validate.js'
import { user } from '../user/user.js'
import { storeAccounts } from '../user/storeAccounts.js'

function start() {
    const form = document.querySelector('#form-register')
    const submitBtn  = form.querySelector('#submit-btn')
    
    function onSubmit(data) {
        const video = document.querySelector('#form-video')
        
        user.set(data)
        storeAccounts.set(data)

        if(video) 
            video.play() // animation
        submitBtn.classList.add('loading')
        submitBtn.style.pointerEvents = 'none'
        submitBtn.disabled = true

        let delay = video ? 12000 : 3000
        
        // Redirect to home page when submit
        setTimeout(() => {
            submitBtn.style.pointerEvents = 'auto'
            submitBtn.classList.remove('loading')
            submitBtn.disabled = false
            
            history.back()
        }, delay)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 