import { storeAccounts } from "../user/storeAccounts.js"
import { user } from "../user/user.js"
import { validateShippingAdress } from "./validate.js"
// import { selectedProducts as orderProducts, selectedProducts } from "../cart.js"
import { products } from "../products.js"
import { storage } from "../cart/storage.js"

const shippingAddressForm = document.getElementById('form-shipping-address')
const orderForm = document.getElementById('form-order')
const address = document.querySelector('.form__address')
const editAddressBtn = document.querySelector('.form__edit-btn')
const submitAddressBtn = document.getElementById('confirm-info-submit')
const orderList = document.querySelector('.form__orders')

// const prevOrder = orderProducts

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
                            <p class="form__orders-price">${product.price}</p>
                            <span class="ms-2 form__orders-quantity">+${quantityItem.quantity}</span>
                       </div>
                    </div>
                </a>
            </li>
        `

    })

    orderList.innerHTML = htmls.join('') 
}

function start() {
    inputAddressData()
    renderCurrentAddress()
    editAddress()
}

start()

export {renderOderProduct}


