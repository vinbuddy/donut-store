function showAnimationAdding(btnElement) {
    const cartIcon = btnElement.querySelector('.add__cart-icon')
    const cartContent = btnElement.querySelector('.add__cart-content')
    const cartSuccess = btnElement.querySelector('.add__cart-success')

    cartIcon.classList.add('added')
    cartContent.classList.add('added')
    cartSuccess.classList.add('added')

    // Prevent pointer while adding 
    btnElement.style.pointerEvents = 'none'

    setTimeout(( ) => {
        cartIcon.classList.remove('added')
    }, 1000)

    setTimeout(() => {
        cartSuccess.classList.remove('added')

    }, 1500)
    
    setTimeout(() => {
        cartContent.classList.remove('added')
        btnElement.style.pointerEvents = 'auto'

    }, 2600)

}

export default showAnimationAdding