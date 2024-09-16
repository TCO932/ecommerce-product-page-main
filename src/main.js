
import { carouselHandler } from './components/carousel.js';
import { cartHandler } from './components/cart.js';
import { menuToggler } from './components/menu.js';
import { Product } from './Product.js';

const { toggle, show, hide, getState } = menuToggler()
function handleMediaChange(e) {
    const menuBtn = document.querySelector('#menu-btn')
    if (e.matches) {
        menuBtn.addEventListener('click', toggle)
        menuBtn.style.display = 'block'
        // document.addEventListener('click', function(event) {
        //     console.log('clicked');
        //     if (!menuBtn.contains(event.target) && !menu.contains(event.target) && getState() === true) {
        //         hide();
        //         console.log(event.target);
        //         console.log('overlay clicked');
        //     }
        // });
    } else {
        menuBtn.removeEventListener('click', toggle)
        menuBtn.style.display = 'none'
    }
}

const mediaQuery = window.matchMedia('(max-width: 768px)');
handleMediaChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaChange);


const images = [
    {
        image: './images/image-product-1.jpg',
        thumbnail: './images/image-product-1-thumbnail.jpg'
    },
    {
        image: './images/image-product-2.jpg',
        thumbnail: './images/image-product-2-thumbnail.jpg'
    },
    {
        image: './images/image-product-3.jpg',
        thumbnail: './images/image-product-3-thumbnail.jpg'
    },
    {
        image: './images/image-product-4.jpg',
        thumbnail: './images/image-product-4-thumbnail.jpg'
    },
]
const carousel = carouselHandler(images)
const thumbnails = document.querySelector('#thumbnails')
images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.thumbnail;
    img.alt = `Product image #${index+1}`;
    img.addEventListener('click', () => {
        carousel.seek(index)
        img.focus();
    })
    thumbnails.appendChild(img);
})

const cart = cartHandler(onCartUpdate)

const badge = document.querySelector('#cart-badge')
function badgeUpdate(productQuantity) {
    if (productQuantity > 0) {
        badge.textContent = `${cart.count()}`
        badge.style.display = 'block'
    } else {
        badge.style.display = 'none'
    }
}

function onCartUpdate() {
    document.querySelector('#quantity').textContent = `${productData.quantity}`
    const productQuantity = cart.count()
    badgeUpdate(productQuantity)
}
        
const productData = new Product(
    'Sneaker Company',
    'Fall Limited Edition Sneakers',
    'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    125, 
    50, 
    250, 
    0, 
    images[0]
)

function setData() {
    document.querySelector('#manufacturer').textContent = productData.manufacturer
    document.querySelector('#name').textContent = productData.name
    document.querySelector('#description').textContent = productData.description
    document.querySelector('#current-price').textContent = `$${productData.currentPrice.toFixed(2)}`
    document.querySelector('#discount').textContent = `${productData.discount}%`
    document.querySelector('#old-price').textContent = `$${productData.oldPrice.toFixed(2)}`
    document.querySelector('#quantity').textContent = `${productData.quantity}`

    badgeUpdate(cart.count())
}

setData()
document.querySelector('#reduce-btn').addEventListener('click', () => {
    productData.quantity > 0? productData.quantity-- : null
    document.querySelector('#quantity').textContent = `${productData.quantity}`
})
document.querySelector('#add-btn').addEventListener('click', () => {
    productData.quantity++
    document.querySelector('#quantity').textContent = `${productData.quantity}`
})

document.querySelector('#add-to-card-btn').addEventListener('click', () => {
    cart.add({...productData})
})
