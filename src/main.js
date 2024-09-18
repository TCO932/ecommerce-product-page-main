
import { carouselHandler, createLightbox } from './components/carousel.js';
import { cartHandler } from './components/cart.js';
import { menuToggler } from './components/menu.js';
import { Product } from './Product.js';


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
const lightbox = createLightbox(images)
carousel.slideshow.setDuration(5000)
carousel.thumbnails(document, (index) => {
    carousel.seek(index)
    carousel.slideshow.pause()
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


const imageContainer = document.querySelector('.product-image-container')
const { toggle, show, hide, getState } = menuToggler()
function handleMediaChange(e) {
    const menuBtn = document.querySelector('#menu-btn')
    if (e.matches) {
        menuBtn.addEventListener('click', toggle)
        menuBtn.style.display = 'block'
        
        imageContainer.removeEventListener('click', lightbox.open)
    } else {
        menuBtn.removeEventListener('click', toggle)
        menuBtn.style.display = 'none'
        imageContainer.addEventListener('click', lightbox.open)
    }
}

const mediaQuery = window.matchMedia('(max-width: 768px)');
handleMediaChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaChange);