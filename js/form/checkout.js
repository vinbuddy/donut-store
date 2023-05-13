import { validateCheckoutInfo } from "./validate.js"

function start() {
    const form = document.querySelector('#confirm-checkout-info')
    function onSubmit(data) {
    }
    validateCheckoutInfo(form, onSubmit)
}

start()