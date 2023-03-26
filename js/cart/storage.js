const cart = JSON.parse(localStorage.getItem('cart')) || []

export const storage = {
    get () {
        return JSON.parse(localStorage.getItem('cart')) || []
    }, 
    set(payload) {
        cart.push(payload)
        return localStorage.setItem('cart', JSON.stringify(cart))
    },
    update (index, newPayload) {
        cart[index] = newPayload
        return localStorage.setItem('cart', JSON.stringify(cart))
    }
    

}
