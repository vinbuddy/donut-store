import { products } from './products.js'
import renderStarRating from './renderStarRating.js'

const menuBtn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const overlay = document.getElementById('overlay')
const closeBtn = document.getElementById('menu-close-btn')
const header = document.getElementById('header')

const outlet = document.getElementById('outlet')
const bestSeller = document.getElementById('best-seller')

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
                        <a href="">
                            <img class="card__img" src="${product.img_path}" alt="">
                            <div class="card__info">
                                <h3 title="${product.name}" class="card__name">${product.name}</h3>
                                <div class="card__rating">
                                    ${renderStarRating(product.rating)}
                                </div>
                                <p class="card__price">$${product.price}</p>
                                
                            </div>
                        </a>
                        <button class="primary-btn card__btn">Add to cart</button>
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
                        <a href="">
                            <img class="card__img" src="${product.img_path}" alt="">
                            <div class="card__info">
                                <h3 title="${product.name}" class="card__name">${product.name}</h3>
                                <div class="card__rating">
                                    ${renderStarRating(product.rating)}
                                </div>
                                <p class="card__price">$${product.price}</p>
                                
                            </div>
                        </a>
                        <button class="primary-btn card__btn">Add to cart</button>
                    </div>
                </div>
            `
        })
    
        bestSeller.innerHTML = htmls.join('') 
    }
}

function start() {
    renderOutletProducts()
    renderBestSellerProducts()

    handleMenu()
    handleScrollHeader()

}

start()