import {validateSignUp} from './validate.js'

function start() {
    const form = document.querySelector('#form-register')
    const video = document.querySelector('#form-video')

    function onSubmit(data) {
        video.play()

        setTimeout(() => {
            window.location.href = "/"
        }, 12000)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 