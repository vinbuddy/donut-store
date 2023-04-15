import {validateSignUp} from './validate.js'
import { user } from '../user/user.js'
import { storeAccounts } from '../user/storeAccounts.js'

function start() {
    const form = document.querySelector('#form-register')
    const submitBtn  = form.querySelector('#submit-btn')
    
    function onSubmit(data) {
        const video = document.querySelector('#form-video')
        let delay = 12000
        
        user.set(data)
        storeAccounts.set(data)
        
        if (video.style.display !== 'none') {
            video.play() // animation
            delay = 3000

        }
        
        if(video) 
        submitBtn.classList.add('loading')
        submitBtn.style.pointerEvents = 'none'
        submitBtn.disabled = true

        
        // Redirect to home page when submit
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
        }, delay)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 