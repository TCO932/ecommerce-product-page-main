function cartHandler(callback) {
    const cart = document.getElementById('cart')
    const products = cart.querySelector('.products')
    const cartBtn = document.getElementById('cart-btn')
    cartBtn.addEventListener('click', toggle)
    let isShown = false
    const basket = []

    function toggle() {
        if (isShown) {
            cart.style.display = 'none'
            cartBtn.querySelector('img').setAttribute('src', './images/icon-cart.svg')
        } else {
            cart.style.display = 'flex'
            cartBtn.querySelector('img').setAttribute('src', './images/icon-close.svg')

            renderBasket()
        }
        isShown = !isShown
    }

    function renderBasket() {
        products.replaceChildren()
        if (basket.length == 0) {
            products.textContent = 'Your cart is empty.'
            cart.classList.add('empty')
        } else {
            cart.classList.remove('empty')
            basket.forEach((product, index) => {
                const productElem = document.createElement('div')
                productElem.classList.add('product')
    
                const img = document.createElement('img')
                img.src = product.img.thumbnail
                img.alt = 'Product image'
    
    
                const text = document.createElement('div')
                text.classList.add('text')
    
                const nameP = document.createElement('p')
                nameP.classList.add('name')
                nameP.textContent = product.name
    
                const priceSpan = document.createElement('span')
                priceSpan.classList.add('product-price')
                priceSpan.textContent = `$${product.currentPrice.toFixed(2)} x ${product.quantity} = `
    
                const totalPriceSpan = document.createElement('span')
                totalPriceSpan.classList.add('total-price')
                totalPriceSpan.textContent = `$${(product.currentPrice * product.quantity).toFixed(2)}`
    
                text.appendChild(nameP)
                text.appendChild(priceSpan)
                text.appendChild(totalPriceSpan)
    
    
                const removeBtn = document.createElement('button')
                const removeImg = document.createElement('img')
                removeImg.src = './images/icon-delete.svg'
                removeImg.alt = 'Remove'
                removeBtn.addEventListener('click', () => {
                    remove(index)
                })
                removeBtn.appendChild(removeImg)
    
    
                productElem.appendChild(img)
                productElem.appendChild(text)
                productElem.appendChild(removeBtn)
    
                products.appendChild(productElem)
            })
        }
    }

    function add(product) {
        basket.push(product)
        onUpdate()
        console.log(basket)
    }

    function remove(index) {
        if (index > -1) {
            basket.splice(index, 1);
            onUpdate()
            console.log(basket)
        }
    }

    function count() {
        return basket.reduce((accumulator, product) => {
            return accumulator + product.quantity;
        }, 0);
    }

    function onUpdate() {
        console.log('updated')
        if (typeof callback == 'function') {
            callback()
        }
        if (isShown) {
            renderBasket()
        }
    }

    function getBasket() {
        return basket
    }

    return {
        toggle: toggle,
        add: add,
        remove: remove,
        count: count,
        getBasket: getBasket,
    }
}

export { cartHandler }