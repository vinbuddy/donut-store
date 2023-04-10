const increaseBtn = document.querySelectorAll('.increase-btn')
const decreaseBtn = document.querySelectorAll('.decrease-btn')
const selectedQuantity = document.querySelectorAll('.quantity-select-value')


function handleIncrease () {
    increaseBtn.forEach(btn => {
        btn.onclick = function () {
            selectedQuantity.forEach(selectValue => {
                selectValue.innerHTML++
            })
        }

    })
}

function handleDecrease () {
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


function start() {
    handleIncrease()
    handleDecrease()
}

start()
