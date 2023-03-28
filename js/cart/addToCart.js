import { storage } from "./storage.js"
import showAnimationAdding from "./showAnimationAdding.js"
import { updateQuantity } from "./updateQuantity.js"

function addToCart(id, quantity = 1) {
    const cart = storage.get() 
    
    let payload = {
        id,
        quantity: quantity,
    }

    let isDuplicate = cart.some((item, index) => {
        // Duplicate => update quantity
        if(item.id === id) {
            storage.update(index, {id, quantity: item.quantity + quantity})
        }

        return item.id === id
    })
    
    if (!isDuplicate) {
        storage.set(payload)
    }

}

function handleAdd(btnClicked) {
    const addBtn = document.querySelectorAll('.add')

    if (addBtn) {
        // Multi add btn (home page, detail page)
        addBtn.forEach(btn => {
            btn.onclick = function () {
                addToCart(btn.dataset.id)
                updateQuantity()
                showAnimationAdding(btn)
            }
        })
    } 

    // Excute at (menu page) because of changing tabs will not querySelectorAll('.add') 
    // so get this btn clicked 
    if (btnClicked) {
        addToCart(btnClicked.dataset.id)
        updateQuantity()
        showAnimationAdding(btnClicked)
    }
   
}

function start() {
    handleAdd()
}

start()

export { handleAdd }