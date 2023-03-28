import { storage } from "./storage.js"

const quantityValues = document.querySelectorAll('.quantity')

function updateQuantity() {
    const cart = storage.get()
    localStorage.setItem('quantity', cart.length)
    
    let quantity = localStorage.getItem('quantity') 
    
    quantityValues.forEach((quantityValue) => {
        quantityValue.innerText = quantity

    })
}

export {updateQuantity}