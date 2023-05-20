var cart;
const save = () => {
    return localStorage.setItem('cart', JSON.stringify(cart))
}

export const storage = {
    get () {
        return JSON.parse(localStorage.getItem('cart')) || []
    }, 
    set(value) {
        cart = this.get()

        cart.unshift(value)
        save()
    },
    // update (index, newValue) {
    //     cart = this.get()

    //     cart[index] = newValue
    //     save()
    // },
    update (index, key, newValue) {
        cart = this.get()

        cart[index][key] = newValue
        save()
    },
    delete(index) {
        cart = this.get()
        cart.splice(index, 1)

        save()
    },
    clear() {
        return localStorage.removeItem('cart')
    }
}
