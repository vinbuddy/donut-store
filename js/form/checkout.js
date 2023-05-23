import { storeAccounts } from "../user/storeAccounts.js"
import { user } from "../user/user.js"
import { validateShippingAdress } from "./validate.js"
import { products } from "../products.js"
import { storage } from "../cart/storage.js"
import { removeProduct } from "../cart.js"

const shippingAddressForm = document.getElementById('form-shipping-address')
const orderForm = document.getElementById('form-order')
const billForm = document.getElementById('form-bill')
const address = document.querySelector('.form__address')
const editAddressBtn = document.querySelector('.form__edit-btn')
const submitAddressBtn = document.getElementById('confirm-info-submit')
const orderList = document.querySelector('.form__orders')

let orderProductIds 



function inputAddressData() {
    function onSubmit(data) {
        // add shippingAddress info 
        const currentUser = user.get()
        const accounts = storeAccounts.get()

        currentUser['shipping_address'] = data
        user.set(currentUser)

        accounts.forEach((account, index) => {
            if (account.id === currentUser.id) {
                storeAccounts.update(index, currentUser)
            } 
        })


        shippingAddressForm.classList.remove('form__shipping-address--show')
        orderForm.classList.add('form__order--show')

        renderCurrentAddress()
        showCurrentAddressInfo()
    }

    validateShippingAdress(shippingAddressForm, onSubmit)
}

function renderCurrentAddress() {
    const currentUser = user.get();
    
    address.innerHTML = `
        <p>${currentUser?.shipping_address?.fullName} | ${currentUser?.shipping_address?.phone}</p>
        <p>${currentUser?.shipping_address?.address}</p>
    `
}

function editAddress() {
    editAddressBtn.onclick = function () {
        shippingAddressForm.classList.add('form__shipping-address--show')
        orderForm.classList.remove('form__order--show')

        showCurrentAddressInfo();
    }
}

function showCurrentAddressInfo() {
    const currentUser = user.get()

    const nameInput = document.getElementById('name')
    const phoneInput = document.getElementById('phone')
    const addressInput = document.getElementById('address')

    if (currentUser?.shipping_address) {
        nameInput.value = currentUser?.shipping_address?.fullName
        phoneInput.value = currentUser.shipping_address.phone
        addressInput.value = currentUser?.shipping_address?.address 

        submitAddressBtn.innerText = 'Update'

        inputAddressData()
    } else {
        nameInput.value = ''
        phoneInput.value = ''
        addressInput.value = ''

        submitAddressBtn.innerText = 'Continue'
    }
    
}

function renderOderProduct(orderProducts) {
    const cart = storage.get()
    orderProductIds = orderProducts

    const htmls = orderProducts.map(orderId => {
        const product = products.find((product) => {
            return product.id === orderId
        })

        const quantityItem = cart.find(item => item.id === orderId)

        return `
            <li class="form__orders-item">
                <a class="form__orders-link" href="./detail.html#${product.id}">
                    <img src="${product.img_path}" alt="">
                    <div class="form__orders-info">
                        <h4 class="form__orders-name">${product.name}</h4>
                       <div class="d-flex align-items-center justify-content-between">
                            <p class="form__orders-price">$${product.price}</p>
                            <span class="ms-2 form__orders-quantity">+${quantityItem.quantity}</span>
                       </div>
                    </div>
                </a>
            </li>
        `

    })

    orderList.innerHTML = htmls.join('') 
}

function applyVoucher() {
    const voucherUser = user.get().vouchers
    const voucherInput = document.querySelector('.form__voucher-input')
    const voucherApplyBtn = document.querySelector('.form__voucher-btn') 
    
    // validate 
    voucherApplyBtn.onclick = function() {
        const errorElement = document.querySelector('.form__voucher ~ .form__error')
        let voucherValue = voucherInput.value

        const voucher = voucherUser.find(voucher => voucher.code === voucherValue)
        
        if(voucher) {
            errorElement.innerText = ''
            renderTotalPayment(voucher.sale)
        } else {
            errorElement.innerText = 'Invalid voucher code'
        }
    }
}

function renderTotalPayment(voucherSale = 0) {
    const costs = document.querySelector('.form__cost')
    const totalBill = document.getElementById('total-bill').innerText
    const shippingCost = document.getElementById('shipping-cost').innerText
    const total = document.getElementById('total-pay').innerText.split('$')[1]

    const discount = voucherSale ? (Number(voucherSale) * Number(total)) / 100 : 0

    const totalPay = Number(total) - discount

    costs.innerHTML = `
        <li class="form__cost-item">
            <span class="form__cost-label">Total bill</span>
            <span class="form__cost-price">${totalBill}</span>
        </li>
        <li class="form__cost-item">
            <span class="form__cost-label">Shipping cost</span>
            <span class="form__cost-price">${shippingCost}</span>
        </li>
        <li class="form__cost-item">
            <span class="form__cost-label">Discount</span>
            <span class="form__cost-price">$${Math.round(discount * 1000 ) / 1000}</span>
        </li>
        <li class="form__cost-item">
            <span class="form__cost-label">Total</span>
            <span id="total-amount" style="color: var(--primary-color); font-size: 20px; font-weight: 600;" class="form__cost-price">$ ${parseFloat(totalPay).toFixed(2)}</span>
        </li>
    `
}

function createOrderId() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let length = 6;
    let randomId = ''

    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    // Return the random string.
    return '#'+ randomId.toUpperCase();
}

function getCurrentDate() {
    let date = new Date()
    let month = date.getUTCMonth() + 1
    let day = date.getUTCDate() 
    let year = date.getUTCFullYear();

    return `${day}-${month}-${year}`
}

function renderBill({order_id, date}) {
    const billData = document.getElementById('bill-data')
    billData.innerHTML = `
        <span>${order_id}</span>
        <span>${date}</span>
    `

    orderForm.classList.remove('form__order--show')
    billForm.classList.add('form__bill--show')
    
}

function placeOrder() {
    orderForm.onsubmit = function (e) {
        const totalAmount = document.getElementById('total-amount').innerText
        const voucherInput = document.querySelector('.form__voucher-input')
        const currentUser = user.get()

        const cart = storage.get()
        const orderProductData = []

        e.preventDefault()

        // Clear voucher
        currentUser.vouchers.forEach((voucher, index) => {
            if (voucher.code === voucherInput.value.trim()) {
                currentUser.vouchers.splice(index, 1)
                user.set(currentUser)
                storeAccounts.update(index, currentUser)
            }
        })
       

        // Get data (create bill id, date)
        orderProductIds.forEach(id => {
            const cartItem = cart.find((cartItem) => {
                return cartItem.id === id
            })

            orderProductData.push(cartItem)
        })

        const orderData = {
            order_id: createOrderId(),
            date: getCurrentDate(),
            price: totalAmount,
            order_products: orderProductData
        }

        // Show bill
        renderBill(orderData)

        // Clear selected products
        const checkeds = document.querySelectorAll('.cart__check-single.cart__checkbox--checked') 
        checkeds.forEach((item, index) => {
            let productElement = item.closest('.cart__item')
            let removeBtn = productElement.querySelector('.cart__remove')

            if (productElement.dataset.id === orderProductIds[index]) {
                removeBtn.click()
            }
        })
    }
}

function start() {
    inputAddressData()
    renderCurrentAddress()
    editAddress()
    applyVoucher()
    renderTotalPayment()
    placeOrder()
}

start()

export {renderOderProduct, renderTotalPayment}


