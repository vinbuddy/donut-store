function handleIncrease () {
    const increaseBtn = document.querySelectorAll('.increase-btn')
    const selectedQuantity = document.querySelectorAll('.quantity-select-value')

    increaseBtn.forEach(btn => {
        btn.onclick = function () {
            selectedQuantity.forEach(selectValue => {
                selectValue.innerHTML++
            })
        }

    })
}

function handleDecrease () {
    const decreaseBtn = document.querySelectorAll('.decrease-btn')
    const selectedQuantity = document.querySelectorAll('.quantity-select-value')

    decreaseBtn.forEach(btn => {
        btn.onclick = function () {
            selectedQuantity.forEach(selectValue => {
                if (selectValue.innerHTML > 1) {
                    selectValue.innerHTML--
                }
            })
        }
    })
}


export {handleDecrease, handleIncrease}
