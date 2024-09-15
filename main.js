function menuToggler() {
    const menu = document.querySelector('#menu')
    const menuBtn = document.querySelector('#menu-btn')
    let isShown = false

    toggle = () => {
        if (isShown) {
            menu.style.display = 'none'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-menu.svg')
        } else {
            menu.style.display = 'block'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-close.svg')
        }

        isShown = !isShown
        console.log('toggled')
    }

    show = () => {
        isShown = false
        toggle()
    }
    
    hide = () => {
        isShown = true
        toggle()
    }

    getState = () => {
        return isShown
    }

    return {
        toggle: toggle,
        show: show,
        hide: hide,
        getState: getState
    }
}

function handleMediaChange(e) {
    const menuBtn = document.querySelector('#menu-btn')
    const { toggle, show, hide, getState } = menuToggler()
    if (e.matches) {
        menuBtn.addEventListener('click', toggle)
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

function carouselHandler() {
    const carouselImg = document.getElementById('product-image')
    let index = 0

    if (images.length) {
        carouselImg.setAttribute('src', images[index].image)
    }

    function prev() {
        index = index - 1 > -1? index - 1 : images.length - 1
        carouselImg.setAttribute('src', images[index].image)
    }

    function next() {
        index = index + 1 < images.length? index + 1 : 0
        carouselImg.setAttribute('src', images[index].image)
    }

    function seek(newIndex) {
        if (Number.isInteger(newIndex) && isInRange(newIndex, 0, images.length - 1)) {
            index = newIndex
            carouselImg.setAttribute('src', images[index].image)
        }
    }

    const prevBtn = document.getElementById('prev-btn')
    const nextBtn = document.getElementById('next-btn')
    prevBtn.addEventListener('click', prev)
    nextBtn.addEventListener('click', next)
    
    return {
        prev: prev,
        next: next
    }
}

const carousel = carouselHandler()


function cartHandler(params) {
    const cartBtn = document.getElementById('cart-btn')
    cartBtn.addEventListener('click', toggle)
    let isShown = false
    const basket = []

    function toggle(params) {
        if (isShown) {
            menu.style.display = 'none'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-menu.svg')
        } else {
            menu.style.display = 'block'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-close.svg')
        }
    }
}