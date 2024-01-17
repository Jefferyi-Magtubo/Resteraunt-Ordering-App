import { menuArray } from './data.js'

const menu = document.getElementById("menu")
const orderElement = document.getElementById("orderEl")
const order = document.getElementById('order')
let itemsInCart = []
const payModal = document.getElementById('payment-modal')
const custName = document.getElementById("custName")
const cardNumber = document.getElementById('card-number')
const cvv = document.getElementById('cvv')

// Buttons

document.addEventListener('click', function(e) {
    if(e.target.dataset.buy) {
        handleBuyBtn(e.target.dataset.buy)
    }

    if(e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    }

    if(e.target.id === "purchase-btn") {
        handlePurchaseBtn()
    }

    if(e.target.id === 'pay-btn') {
        e.preventDefault()
        
        if(!custName.checkValidity() || !cardNumber.checkValidity() || !cvv.checkValidity()) {
            custName.placeholder = "Please enter name here!"
            cardNumber.placeholder = "Please enter your card number here!"
            cvv.placeholder = "Please enter your CVV here!"
            return;
        }

        handlePayBtn(custName.value)
    }
})

function handleBuyBtn(itemId) {
    const selectedOrderItem = menuArray.find(menuItem => menuItem.id === parseInt(itemId))

    const buyBtn = document.getElementById(`button-${itemId}`).disabled = true;

    itemsInCart.push(selectedOrderItem)

    if(orderElement.classList.contains('hidden')) {
        orderElement.classList.toggle('hidden')
    }
        
    renderOrder()
    
    renderPrice()
}

function handleRemoveBtn(itemId) {
    const newItemsinCartArray = itemsInCart.filter((menuItem) => menuItem.id !== parseInt(itemId))

    itemsInCart = newItemsinCartArray

    document.getElementById(`button-${itemId}`).disabled = false

    if (itemsInCart.length === 0) {
        orderElement.classList.toggle('hidden')
    }

    renderOrder()

    renderPrice()
}

function handlePurchaseBtn() {
    payModal.style.display = "flex"
}

function handlePayBtn(customerName) {

    payModal.style.display = "none"
    
    orderElement.innerHTML = `
    <div id="payment-confirmation">
        <h1>Thanks ${customerName}! Your order is on its way!</h1>
    </div>
    `

    custName.value = ""
    cardNumber.value = ""
    cvv.value = ""
}

// rendering functions

function renderMenu() {
    const html = menuArray.map((menuItem) => {
        return `
            <section class="menuItem">
                <div class="emoji">
                    <p>${menuItem.emoji}</p>
                </div>
                <div> 
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p>$${menuItem.price}</p>
                </div>
                <div class="add">
                    <button class="buy-btn" id="button-${menuItem.id}" data-buy="${menuItem.id}">+</button>
                </div>
            </section>
        `
    }).join('')

    menu.innerHTML = html
}

function renderOrder() {
    order.innerHTML = itemsInCart.map((item) => {
        return `
        <div class="order-item">
            <h2>${item.name}</h2>
            <p id=${item.id} class="remove-btn" data-remove=${item.id}>remove</p>
            <p class="order-item-price">$ ${item.price}</p>
        </div>
        `
    }).join('')
}

function renderPrice() {
    let total = 0

    itemsInCart.forEach((item) => {
        total += item.price
    })

    document.getElementById('price').innerText = `$ ${total}`
}

renderMenu()