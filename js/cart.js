import { addToStorage } from "./cart/addToCart.js"
import { storage } from "./cart/storage.js"
import { products } from "./products.js"
import { updateQuantity } from "./cart/updateQuantity.js"
import renderPreviewCart from "./cart/renderPreviewCart.js"
import { user } from "./user/user.js"
import { renderOderProduct, renderTotalPayment } from "./form/checkout.js"

const cartList = document.getElementById('cart-list')
const checkoutBtn = document.querySelector('.checkout__btn')
const checkAllBtn = document.getElementById('select-all-btn')


function renderCart() {
    const cart = storage.get()

    const htmls = cart.map((cartItem) => {
        const product = products.find(product => product.id === cartItem.id)
        
        return `
        <div data-id="${product.id}" class="col-12 cart__item">
            <div class="row">
                <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                    <div class="cart__item-inner">
                        <label class="cart__check-single cart__checkbox">
                            <i class='cart__check-icon bx bx-check'></i>
                        </label>
                    </div>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-10 col-10">
                    <div class="cart__item-inner">
                        <div class="cart__product">
                            <a href="./detail.html#${product.id}">
                                <img loading="lazy" class="cart__product-img" src="./${product.img_path}" alt="">
                            </a>
                            <p class="cart__product-name">${product.name}</p>
                            <div class="cart__info-mobile">
                                <p class="cart__product-name">${product.name}</p>
                                <p class="cart__price">$${product.price}</p>

                                <div class="cart__actions">
                                    <div class="cart__quantity">
                                        <button class="cart__quantity-decrease ">
                                            <i class='bx bx-minus'></i>
                                        </button>
                                        <div class="cart__quantity-value">
                                            ${cartItem.quantity}
                                        </div>
                                        <button  class="cart__quantity-increase">
                                            <i class='bx bx-plus'></i>
                                        </button>
                                    </div>
                                    <button class="cart__remove">
                                        <img width="100%" height="100%" src="./assets/img/icons/delete.png" alt="">
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 d-none d-sm-block d-sm-none d-md-block">
                    <div class="cart__item-inner">
                        <p class="cart__price">$${product.price}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 d-none d-sm-block d-sm-none d-md-block">
                    <div class="cart__item-inner">
                        <div class="cart__quantity">
                            <button class="cart__quantity-decrease ">
                                <i class='bx bx-minus'></i>
                            </button>
                            <div class="cart__quantity-value">
                                ${cartItem.quantity}
                            </div>
                            <button  class="cart__quantity-increase">
                                <i class='bx bx-plus'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 d-none d-sm-block d-sm-none d-md-block">
                    <div class="cart__item-inner">
                        <button class="cart__remove">
                            <img width="100%" height="100%" src="./assets/img/icons/delete.png" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
    })

    if (htmls.length > 0) {
        cartList.innerHTML = htmls.join('')
    } else {
        cartList.innerHTML = `
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-center justify-content-center">
                    <img class="cart__empty" src="./assets/img/empty-cart.png" />
                </div>
            </div>
        `
    }

}

let totalBill = 0
let islessThanOne = false
let shippingCost = 1.99;
let isCheckAll = false

let selectedProducts = []

function toggleDisableBtn() {
    const checked = cartList.querySelectorAll('.cart__checkbox--checked')
            
    // Toggle disable checkout btn
    if (checked.length > 0) {
        checkoutBtn.disabled = false
    } else {
        checkoutBtn.disabled = true
    }
}


function renderPriceTotalBill() {
    const totalBillElement = document.getElementById('total-bill')
    totalBillElement.innerHTML = `$${Math.round(totalBill * 100 ) / 100}`
}

function renderPriceTotalPay() {
    const totalPayment = document.querySelector('.checkout__total-price')
    let totalPay = shippingCost + totalBill
    
    if (totalBill > 0) {
        totalPayment.innerHTML = `$${Math.round(totalPay * 100 ) / 100}`
    } else {
        totalPayment.innerHTML = `$${0}`
        
    }
}

function calculateTotalBill(price = 0, quantity = 1, action) {
    
    switch(action) {
        case 'plus':
            totalBill = totalBill + (price * quantity)
            break 
        case 'minus':
            totalBill = totalBill - (price * quantity)
            
            break

        case 'increase quantity':
            totalBill = totalBill + price
            break
        case 'decrease quantity':
            if (!islessThanOne) {
                totalBill = totalBill - price 
            }
            break
        case 'reset':
            totalBill = 0 
            break
        
        default: 
            totalBill = totalBill
            break;
    }
    renderPriceTotalBill()
    renderPriceTotalPay()
}

function updatePriceCheckout(productElement) {
    const checked = productElement.querySelector('.cart__checkbox--checked')
    const data = products.find(item => item.id === productElement.dataset.id)

    let price = Number(data.price)

    let quantity = storage.get().find(item => item.id === data.id).quantity 
    if (checked) {
        calculateTotalBill(price, quantity, 'plus')
    } else {
        calculateTotalBill(price, quantity, 'minus')
    }
}

function toggleSelectProduct(item) {
    if (selectedProducts.includes(item)) {
        let index = selectedProducts.indexOf(item);
        selectedProducts.splice(index, 1)
    } else {
        selectedProducts.push(item)
    }
}

// select -> update 
function selectProduct() {
    const checkBtns = document.querySelectorAll('.cart__check-single')
    
    checkBtns.forEach(btn => {
        btn.onclick = function () {
            this.classList.toggle('cart__checkbox--checked')
            const product = this.closest('.cart__item')
            
            if (!isCheckAll) {
                toggleSelectProduct(product.dataset.id)
                updatePriceCheckout(product)
                isCheckAll = false

            } else {
                // Remove check all 
                checkAllBtn.classList.remove('cart__checkbox--checked')
                checkBtns.forEach(btn => {
                    btn.classList.remove('cart__checkbox--checked')
                })

                calculateTotalBill(0, 1, 'reset')
                selectedProducts = []
                isCheckAll = false
            }

            toggleDisableBtn()

        }
    })
}

function selectCartQuantity() {
    const increaseBtns = document.querySelectorAll('.cart__quantity-increase')
    const decreaseBtns = document.querySelectorAll('.cart__quantity-decrease')

    // Update quantity increase
    increaseBtns.forEach(btn => {
        btn.onclick = function () {
            const productElement = this.closest('.cart__item')
            const quantities = productElement.querySelectorAll('.cart__quantity-value')
            const isChecked = productElement.querySelector('.cart__checkbox--checked')
            

            quantities.forEach(quantity => {
                quantity.innerHTML++
            })
            
            addToStorage(productElement.dataset.id, 1)
            renderPreviewCart()

            const data = products.find(item => item.id === productElement.dataset.id)
            let price = Number(data.price)
            let quantity = storage.get().find(item => item.id === data.id).quantity
            
            if(isChecked) {
                calculateTotalBill(price, quantity, 'increase quantity')
            }
        }
    })

    // Update quantity decrease
    decreaseBtns.forEach(btn => {
        btn.onclick = function () {
            const productElement = this.closest('.cart__item')
            const isChecked = productElement.querySelector('.cart__checkbox--checked')
            const quantities = productElement.querySelectorAll('.cart__quantity-value')
            const cart = storage.get()

            quantities.forEach(quantity => {
                if (quantity.innerHTML > 1) {
                    quantity.innerHTML--

                    cart.forEach((item, index) => {
                        if(item.id === productElement.dataset.id) {
                            storage.update(index, "quantity", item.quantity - 1)
                        }
                    })
                    islessThanOne = false

                } else {
                    islessThanOne = true
                }
            })
           
            renderPreviewCart()
            
            const data = products.find(item => item.id === productElement.dataset.id)
            let price = Number(data.price)
            let quantity = storage.get().find(item => item.id === data.id).quantity
            
          
            if(isChecked) {
                calculateTotalBill(price, quantity, 'decrease quantity')
            }
           
          
        }
    })
}

function selectAllProduct() {
    const checkBtns = document.querySelectorAll('.cart__check-single')
    const productElements = document.querySelectorAll('.cart__item')

    checkAllBtn.onclick = function () {
        isCheckAll = !isCheckAll   
        checkAllBtn.classList.toggle('cart__checkbox--checked')
        
        checkBtns.forEach(btn => {
            const product = btn.closest('.cart__item')
            if (isCheckAll) {
                let checked = btn.classList.contains('cart__checkbox--checked')
                
                if (checked === false) {
                    toggleSelectProduct(product.dataset.id, "add")
                }

                btn.classList.add('cart__checkbox--checked')

                calculateTotalBill(null, null, 'reset') // reset total bill = null 

                // update new total bill
                productElements.forEach(productElement => {
                    updatePriceCheckout(productElement)
                })

                
            } else {
                btn.classList.remove('cart__checkbox--checked')
                calculateTotalBill(null, null, 'reset')
                
                toggleSelectProduct(product.dataset.id)
                
            }
            
        })

        
        toggleDisableBtn()
    }
}

function removeSingleProduct() {

}

function removeProduct() {
    const removeBtns = document.querySelectorAll('.cart__remove')

    removeBtns.forEach(btn => {
        btn.onclick = function () {
            const productElement = this.closest('.cart__item')
            const cart =  storage.get()

            cart.forEach((cartItem, index) => {
                if (cartItem.id === productElement.dataset.id) {
                    storage.delete(index)
                }

                // After removed product -> update new DOM
                start()
                updateQuantity()
                renderPreviewCart()
                calculateTotalBill(null, null, 'reset')
            })

            
        }
    })
}

function clearProduct() {
    const clearBtn = document.getElementById('clear-btn')

    clearBtn.onclick = function () {
        storage.clear()

        start()
        renderPreviewCart()
        updateQuantity()
    }
}


// Confirm forms
function confirm() {
    const confirmWrapper = document.querySelector('.confirm')
    const closeBtn = document.querySelectorAll('.form__close')

    const voucherInput = document.querySelector('.form__voucher-input')


    checkoutBtn.onclick = function () {
        // sign in
        const currentUser = user.get()
        let isSignIn = Object.keys(currentUser).length !== 0

        if(isSignIn) {
            confirmWrapper.classList.add('confirm--show')

            showCheckoutForm()
            renderOderProduct(selectedProducts)
            renderTotalPayment()
            voucherInput.value = ''
            
        } else {
            let paths = window.location.pathname.split('/')
            let length = paths.length
            paths[length - 1] = 'login.html'

            let path = paths.join('/')

            window.location.href = window.location.origin + path
        }
        
    }


    closeBtn.forEach(btn => {
        btn.onclick = function () {
            confirmWrapper.classList.remove('confirm--show')
        }
    })
    confirmWrapper.onclick = function (e) {
        if (e.target.classList.contains('confirm'))
            confirmWrapper.classList.remove('confirm--show')
    }
}

function showCheckoutForm() {
    const shippingAddressForm = document.getElementById('form-shipping-address')
    const orderForm = document.getElementById('form-order')
    const billForm = document.getElementById('form-bill')
    
    const currentUser = user.get()
    let shippingAddress  = currentUser.shipping_address


    if (!shippingAddress) {
        orderForm.classList.remove('form__order--show')
        shippingAddressForm.classList.add('form__shipping-address--show')
    } else {
        orderForm.classList.add('form__order--show')
        shippingAddressForm.classList.remove('form__shipping-address--show')
    }
    
    billForm.classList.remove('form__bill--show')

}

function start() {
    renderCart()
    selectCartQuantity()
    selectProduct()
    selectAllProduct()
    removeProduct()
    clearProduct()

    confirm()
}

start()

export {removeProduct}