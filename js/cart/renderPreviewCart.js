import { products } from "../products.js";
import { storage } from "./storage.js";

const previewList = document.getElementById('preview-list')
const previewQuantity = document.getElementById('preview-quantity')

function renderPreviewCart() {
    const cart = storage.get()
    const previewCart = cart.slice(0, 4)

    const previewItem = previewCart.map((cartItem => {

        const product = products.find((product) => {
            return product.id === cartItem.id
        })

        return `
            <li class="preview__item">
                <a href="./detail.html#${product.id}" class="preview__link">
                    <img class="preview__img" src="./${product?.img_path}" alt="">
                    
                    <div class="preview__info">
                        <h4 class="preview__name">${product.name}</h4>
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="preview__price">$${product.price}</p>
                            <span class="preview__count">
                               +${cartItem.quantity}
                            </span>
                        </div>
                    </div>
                </a>
            </li>
        `
    }))

    const emptyCart = `
        <li class="preview__empty">
            <img src="../../assets/img/empty-cart.png" class="preview__empty-img" />
        </li>
    `

    if (cart.length > 0) {
        previewList.innerHTML = previewItem.join('')
    } else {
        previewList.innerHTML = emptyCart
    }

    previewQuantity.innerHTML = `
        <span id="preview-quantity" class="preview__quantity">${cart.length} products added</span>
        <a href="./cart.html" class="preview__view-cart">View Cart</a>
    `
}

export default renderPreviewCart