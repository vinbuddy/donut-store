import { storage } from "./storage.js"

const quantityValues = document.querySelectorAll('.quantity')

function updateQuantity() {
    const cart = storage.get()
    localStorage.setItem('quantity', cart.length)

    renderQuantity()
}

function renderQuantity () {
    let quantity = localStorage.getItem('quantity') || 0

    quantityValues.forEach((quantityValue) => {
        quantityValue.innerText = quantity
    })
}

export {updateQuantity, renderQuantity}