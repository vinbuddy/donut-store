import { storage } from "./storage.js"
import showAnimationAdding, {showAnimationShakeCart} from "./showAnimationAdding.js"
import { updateQuantity } from "./updateQuantity.js"
import renderPreviewCart from "./renderPreviewCart.js"

function addToStorage(id, quantity) {
    const cart = storage.get() 
    
    let payload = {
        id,
        quantity: Number(quantity),
    }

    let isDuplicate = cart.some((item, index) => {
        // Duplicate => update quantity
        if(item.id === id) {
            storage.update(index, {id, quantity: item.quantity + Number(quantity)})
        }

        return item.id === id
    })
    
    if (!isDuplicate) {
        storage.set(payload)
    }

}

function addToCart() {
    const addBtn = document.querySelectorAll('.add')
    const quantity = document.querySelector('.quantity-select-value')
   
    if (addBtn) {
        addBtn.forEach(btn => {
            btn.onclick = function () {
                addToStorage(btn.dataset.id, quantity && quantity.innerHTML || 1)
                updateQuantity()
                showAnimationAdding(btn)
                showAnimationShakeCart()
                renderPreviewCart()
            }
        })
    } 

    
}


function start() {
    addToCart()
}

start()

export { addToCart }