import {validateSignUp} from './validate.js'
import { user } from '../user/user.js'
import { storeAccounts } from '../user/storeAccounts.js'
import { vouchers } from '../voucher.js'

function start() {
    const form = document.querySelector('#form-register')
    const submitBtn  = form.querySelector('#submit-btn')
    
    function onSubmit(data) {
        // // add voucher 
        vouchers.forEach(voucher => {
            let date = new Date()
            let month = date.getUTCMonth() + 1
            let day = date.getUTCDate() + 3
            let year = date.getUTCFullYear();

            voucher['date'] = `${day}-${month}-${year}`
        })

        data['vouchers'] = vouchers
        user.set(data)
        storeAccounts.set(data)

        
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
        }, 3000)
    }

    // pass callback to get data
    validateSignUp(form, onSubmit)

}

start() 