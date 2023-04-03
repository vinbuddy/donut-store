import {validateSignUp} from './validate.js'
import submitAnimation from './submitAnimation.js';

function start() {
    const form = document.querySelector('#form-register')
    const video = document.querySelector('#form-video')

    function onSubmit(data) {
        // console.log(data);
        submitAnimation(video)

        setTimeout(() => {
            window.location.href = "/"
        }, 12000)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 