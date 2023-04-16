import renderStarRating from './renderStarRating.js'
import renderPreviewCart from './cart/renderPreviewCart.js'
import { products } from './products.js'
import { renderQuantity } from './cart/updateQuantity.js'
import { addToCart } from './cart/addToCart.js'

import { user } from './user/user.js'
import { storage } from './cart/storage.js'

const menuBtn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const overlay = document.getElementById('overlay')
const closeBtn = document.getElementById('menu-close-btn')
const menuNavs = document.querySelectorAll('.menu__nav-link')

const header = document.getElementById('header')

const outlet = document.getElementById('outlet')
const bestSeller = document.getElementById('best-seller')

const searchInput = document.querySelector('.search__input')
const resultList = document.getElementById('result-list')
const searchResult = document.getElementById('result')
const resultTitle = document.querySelector('.result__title')
const closeResultBtn = document.querySelector('.result__close-btn')


const navAuth = document.querySelector('.nav__auth')
const menuNavAuth = document.querySelector('.menu__nav-auth')
const menuNavSignOut = document.querySelector('.menu__nav-sign-out')

function handleMenu() {
    const open = () => {
        menu.classList.toggle('menu--show')
        overlay.classList.toggle('menu--show')
    }
    const close = () => {
        menu.classList.remove('menu--show')
        overlay.classList.remove('menu--show')
    }

    menuBtn.addEventListener('click', () => {
        open()
    })

    closeBtn.addEventListener('click', () => {
        close()
    })

    overlay.addEventListener('click', () => {
        close()
    })

    
    menuNavs.forEach((nav => {
        nav.onclick = function () {
            close()
        }
    }))
}

function handleScrollHeader () {
    window.onscroll = () => {
        
        if (window.scrollY > 0) {
            header.style.borderBottom = '1px solid #dee2e6'
        } else {
            header.style.borderBottom = '1px solid transparent'
        }
    }
}

function renderOutletProducts () {

    if (outlet) {
        const htmls = products.filter((product) => product.outlet === true).map((product) => {
            return `
                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                    <div class="card__product">
                        <a href="./detail.html#${product.id}">
                            <img loading="lazy" class="product-img card__img" src="./${product.img_path}" alt="">
                            <div class="card__info">
                                <h3 title="${product.name}" class="card__name">${product.name}</h3>
                                <div class="card__rating">
                                    ${renderStarRating(product.rating)}
                                </div>
                                <p class="card__price">$${product.price}</p>
                                
                            </div>
                        </a>
                        <button data-id=${product.id} class="add primary-btn card__btn">
                            <i class='add__cart-icon bx bx-cart-alt'></i>
                            <span class="add__cart-content">Add to cart</span>
                            
                            <i class='add__cart-success bx bx-check'></i>
                        </button>
                    </div>
                </div>
            `
        })
    
        outlet.innerHTML = htmls.join('') 
    }
}

function renderBestSellerProducts() {
    if (bestSeller) {
        const htmls = products.filter((product) => product.best_seller === true).map((product) => {
            
            return `
                <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-4">
                    <div class="card__product">
                        <a href="./detail.html#${product.id}">
                            <img loading="lazy" class="product-img card__img" src="./${product.img_path}" alt="">
                            <div class="card__info">
                                <h3 title="${product.name}" class="card__name">${product.name}</h3>
                                <div class="card__rating">
                                    ${renderStarRating(product.rating)}
                                </div>
                                <p class="card__price">$${product.price}</p>
                                
                            </div>
                        </a>
                        <button data-id=${product.id} class="add primary-btn card__btn">
                            <i class='add__cart-icon bx bx-cart-alt'></i>
                            <span class="add__cart-content">Add to cart</span>
                            
                            <i class='add__cart-success bx bx-check'></i>
                        </button>
                    </div>
                </div>
            `
        })
    
        bestSeller.innerHTML = htmls.join('') 
    }
}
function searchProducts() {
    searchInput.oninput = (e) => {

        let value = e.target.value.toLocaleLowerCase()
        resultTitle.innerText = `Result of '${value}'`

        if (value.length > 0) {
            searchResult.classList.remove('hide')
            searchResult.classList.add('show') // show 

            const htmls = products.filter(item => item.name.toLocaleLowerCase().includes(value))
            .map(product => {
                return `
                    <li class="result__item">
                       <a href="./detail.html#${product.id}">
                            <img loading="lazy" class="result__img" src="./${product.img_path}" alt="">
                            <h4 class="result__name">${product.name}</h4>
                       </a>
                    </li>
                `
            })

        
            if (htmls.length > 0) {
                resultList.innerHTML = htmls.join('')
            } else {
                resultList.innerHTML = '';
                resultTitle.innerText = 'No Results'
            }
            
        } else {
            searchResult.classList.remove('show') // hide 
            searchResult.classList.add('hide') // hide 

        }
    }

    
    closeResultBtn.onclick = () => {
        searchInput.value = ''
        searchResult.classList.add('hide')
        searchInput.focus()
    }

    window.addEventListener("popstate", function() {
        searchResult.classList.add('hide')
        searchInput.value = ''
    })
}

function renderQuantityValue() {
    renderQuantity()
}

function showCurrentUser () {
    // check current user
    const currentUser = user.get()

    let isSignIn = Object.keys(currentUser).length !== 0

    if (isSignIn) {
        navAuth.innerHTML = `
            <div class="user">
                <img loading="lazy" src="./assets/img/avatar-fallback.jpg" class="user__avatar" alt="">
                <p class="user__name">
                    ${currentUser.name}
                    <i class='bx bx-chevron-down'></i>
                </p>

                <ul class="user__menu">
                    <li class="user__action">
                        <a href="./cart.html">
                            <i class='user__icon bx bx-shopping-bag' ></i>
                            Your cart
                        </a>
                    </li>
                    <li class="sign-out user__action">
                        <i class='user__icon bx bx-log-out'></i>
                        Sign out
                    </li>
                </ul>
            </div>
        `

        menuNavAuth.innerHTML = `
            <div class="menu__user">
                <img loading="lazy" class="menu__user-img" src="./assets/img/avatar-fallback.jpg" alt="">
                <p class="menu__user-name">${currentUser.name}</p>
            </div>
        `

        menuNavSignOut.innerHTML = `
            <li class="menu__nav-item menu__nav-item--seperate sign-out">
                <i class='menu_nav-icon bx bx-log-out'></i>
                <span>Sign out</span>
            </li>
        `

    } else {
        navAuth.innerHTML = `
            <a href="./register.html" class="primary-btn transparent">
                Sign Up
            </a> 
            <a href="./login.html" class="primary-btn">
                Sign In
            </a>  
        `

        menuNavAuth.innerHTML = `
            <a href="./register.html" class="primary-btn transparent">
                Sign Up
            </a> 
            <a href="./login.html" class="primary-btn">
                Sign In
            </a>  
        `

        menuNavSignOut.innerHTML = ''
    }
}

function handleSignOutUser() {
    const signOutBtns = document.querySelectorAll('.sign-out')

    signOutBtns.forEach(btn => {
        btn.onclick = function () {
            user.delete()
            showCurrentUser()
        }
    })
}


function start() {

    renderOutletProducts()
    renderBestSellerProducts()

    handleMenu()
    handleScrollHeader()

    searchProducts()
   
    renderQuantityValue()
    renderPreviewCart()
    addToCart()

    showCurrentUser()
    handleSignOutUser()
}

start()