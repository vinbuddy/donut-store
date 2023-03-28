import {products} from './products.js'
import renderStarRating from './renderStarRating.js';

const detail = document.getElementById('detail')

function render (currentId) {
    const product = products.find((item) => item.id === currentId)

    const htmls = `
        <div class="col-lg-5 col-md-5 col-sm-12 col-12 mb-4">
            <img class="detail__img" src="${product?.detail_img_path}" alt="">
        </div>
        
        <div class="col-lg-7 col-md-7 col-sm-12 col-12">
            <div class="detail__info">
                <h3 class="detail__title">${product.name}</h3>

                <div class="detail__rating">
                    ${renderStarRating(product.rating)}
                </div>

                <p class="detail__price">$${product.price}</p>

                <p class="detail__desc">${product?.description || ''}</p>

                <ul class="detail__ingredients">
                    ${!!product?.ingredients ? '<h5>Ingredients</h5>': ''}

                    ${product?.ingredients?.map(ingredient => {
                        return `<li class="detail__ingredient-item">${ingredient}</li>`
                    }).join('') || ''}
                </ul>

                <div class="detail__quantity">
                    <button class="detail__quantity-btn decrease">
                        <i class='bx bx-minus'></i>
                    </button>
                    <div class="detail__quantity-value">
                        <input class="detail__quantity-input" type="text" value="1"  oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');">
                    </div>
                    <button class="detail__quantity-btn increase">
                        <i class='bx bx-plus'></i>
                    </button>
                </div>

                <div>
                    <button data-id=${product.id}  class="add primary-btn detai__add">
                        <i class='add__cart-icon bx bx-cart-alt'></i>
                        <span class="add__cart-content">Add to cart</span>
                        
                        <i class='add__cart-success bx bx-check'></i>
                    </button>
                </div>
            </div>
        </div>
    `

    detail.innerHTML = htmls
}

function start () {
    const currentId = window.location.hash.charAt(0) === '#' && window.location.hash.slice(1);
    render(currentId);
    
    
    // re-render when location change
    window.addEventListener("popstate", function() {
        const newCurrentId = window.location.hash.charAt(0) === '#' && window.location.hash.slice(1);
        render(newCurrentId)
    })

}

start()