import { storage } from "./storage.js"
import showAnimationAdding from "./showAnimationAdding.js"

function addToCart(btnClicked) {
    const cart = storage.get() 
    const id = btnClicked.dataset.id

    let payload = {
        id,
        quantity: 1,
    }

    let isDuplicate = cart.some((item, index) => {
        // Duplicate => update quantity
        if(item.id === id) {
            storage.update(index, {id, quantity: item.quantity + 1})
        }

        return item.id === id
    })
    
    if (!isDuplicate) {
        storage.set(payload)
    }

    showAnimationAdding(btnClicked)
}


export default addToCart