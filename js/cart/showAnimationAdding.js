function showAnimationAdding(btnElement) {
    const cartIcon = btnElement.querySelector('.add__cart-icon')
    const cartContent = btnElement.querySelector('.add__cart-content')
    const cartSuccess = btnElement.querySelector('.add__cart-success')

    cartIcon.classList.add('added')
    cartContent.classList.add('added')
    cartSuccess.classList.add('added')

    // Prevent pointer while adding 
    btnElement.style.pointerEvents = 'none'
    btnElement.style.cursor = 'wait'

    setTimeout(( ) => {
        cartIcon.classList.remove('added')
    }, 1000)

    setTimeout(() => {
        cartSuccess.classList.remove('added')

    }, 1500)
    
    setTimeout(() => {
        cartContent.classList.remove('added')
        btnElement.style.pointerEvents = 'auto'
        btnElement.style.cursor = 'default'

    }, 2600)

}

function showAnimationShakeCart() {
    const quantities = document.querySelectorAll('.quantity')
    const cartIcons = document.querySelectorAll('.cart-icon')

    // shake quantity 0.7s
    quantities.forEach(quantity => {
        quantity.classList.add('shake')

        setTimeout(() => {
            quantity.classList.remove('shake')
        }, 700)
    })

    // cart icon active 1.4s
    cartIcons.forEach(cartIcon => {
        cartIcon.classList.add('active')

        setTimeout(() => {
            cartIcon.classList.remove('active')
        }, 1400)
    })
}

export {showAnimationShakeCart}
export default showAnimationAdding