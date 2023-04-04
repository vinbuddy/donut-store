import renderStarRating from './renderStarRating.js'
import { products } from './products.js'

import { renderQuantity } from './cart/updateQuantity.js'
import renderPreviewCart from './cart/renderPreviewCart.js'
import { addToCart } from './cart/addToCart.js'

const menuBtn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const overlay = document.getElementById('overlay')
const closeBtn = document.getElementById('menu-close-btn')
const header = document.getElementById('header')

const outlet = document.getElementById('outlet')
const bestSeller = document.getElementById('best-seller')

const searchInput = document.querySelector('.search__input')
const resultList = document.getElementById('result-list')
const searchResult = document.getElementById('result')
const resultTitle = document.querySelector('.result__title')
const closeResultBtn = document.querySelector('.result__close-btn')


function handleMenu() {

    const openMenu = () => {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('menu--show')
            overlay.classList.toggle('menu--show')
        })
    }

    const closeMenu =() => {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('menu--show')
            overlay.classList.remove('menu--show')
        })

        overlay.addEventListener('click', () => {
            menu.classList.remove('menu--show')
            overlay.classList.remove('menu--show')
        })
    }


    openMenu()
    closeMenu()
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
                        <a href="../pages/detail.html#${product.id}">
                            <img class="product-img card__img" src="${product.img_path}" alt="">
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
                        <a href="../pages/detail.html#${product.id}">
                            <img class="product-img card__img" src="${product.img_path}" alt="">
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
                       <a href="../pages/detail.html#${product.id}">
                            <img class="result__img" src="${product.img_path}" alt="">
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


function start() {

    renderOutletProducts()
    renderBestSellerProducts()

    handleMenu()
    handleScrollHeader()

    searchProducts()
   
    renderQuantityValue()

    renderPreviewCart()

    addToCart()
}

start()