import {products} from './products.js'
import { addToCart } from './cart/addToCart.js'
import renderStarRating from './renderStarRating.js'

const tabs = document.querySelectorAll('.menu__tab-item')
const menu = document.getElementById('menu-list')

function renderMenuItem (tabType) {
    const htmls = products.filter(item => item.type === tabType)
        .map((product) => {
            return `
                <div class="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-4">
                    <div class="card__menu">
                        <a href="./detail.html#${product.id}">
                            <img loading="lazy" class="card__menu-img" src="./${product.img_path}" />
                            <div class="card__menu-info">
                                <h3 title="${product.name}" class="card__menu-name">${product.name}</h3>
                                <div class="card__menu-rating">
                                    ${renderStarRating(product.rating)}
                                </div>
                            </div>
                        </a>
                        <div class="card__menu-buying">
                            <p class="card__menu-price">$${product.price}</p>
                            <button data-id=${product.id} class="add primary-btn circle">
                                <i class='add__cart-icon bx bx-cart-alt'></i>
                                <span class="add__cart-content"><i class='bx bx-plus'></i></span>
                                <i class='add__cart-success bx bx-check'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `
    })

    menu.innerHTML = htmls.join('')
}

function handleChangeTab(currentTab) {
    tabs.forEach((tab) => {
        if (currentTab === tab.dataset.type) {
            tab.classList.add('menu__tab-item--active')
        } 

        tab.onclick = function() {
            renderMenuItem(this.dataset.type)
            // add - remove active tab
            document.querySelector('.menu__tab-item.menu__tab-item--active').classList.remove('menu__tab-item--active')
            this.classList.add('menu__tab-item--active')
            
            // call addToCart to querySelector new button class when change tab
            addToCart()
        }
        
    })
}

function start () {
    const currentTab = window.location.hash.charAt(0) === '#' && window.location.hash.slice(1);

    renderMenuItem(currentTab || 'donut') // first active
    handleChangeTab(currentTab || 'donut')

    addToCart()
}

start()