function carouselHandler(images, parent) {
    let carouselImg
    if (parent) {
        carouselImg = parent.querySelector('#product-image');
    } else {
        carouselImg = document.getElementById('product-image');
    }
    let index = 0;
    const duration = 500;

    if (images.length) {
        carouselImg.setAttribute('src', images[index].image);
    }

    function prev() {
        index = index - 1 > -1 ? index - 1 : images.length - 1;
        carouselImg.setAttribute('src', images[index].image);
        onChange(index)
        // animate('right')
    }

    function next() {
        index = index + 1 < images.length ? index + 1 : 0;
        carouselImg.setAttribute('src', images[index].image);
        onChange(index)
        // animate('left')
    }

    function seek(newIndex) {
        if (Number.isInteger(newIndex) && newIndex >= 0 && newIndex <= images.length - 1) {
            index = newIndex;
            carouselImg.setAttribute('src', images[index].image);
            onChange(index)
        }
    }

    function onChange() {}

    const slideshow = (() => {
        let interval
        let duration = 1000

        function setDuration(newDuration) {
            if (Number.isInteger(newDuration) && newDuration >= 0) {
                duration = newDuration
            }
            off()
            on()
        }
        
        function on() {
            clearInterval(interval);
            interval = setInterval(() => {
                next()
            }, duration);
        }

        function off() {
            clearInterval(interval);
        }

        function pause(duration = 3000) {
            off()
            if (Number.isInteger(duration) && duration >= 0) {
                setTimeout(() => {
                    on()
                }, duration);
            }
        }

        return {
            on: on,
            off: off,
            pause: pause,
            setDuration: setDuration
        }
    })()

    function thumbnails(container, onclick) {
        const thumbnails = container.querySelector('#thumbnails')
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.thumbnail;
            img.alt = `Product image #${index+1}`;
            img.addEventListener('click', () => {
                if (typeof onclick == 'function') {
                    onclick(index)
                }
            })
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail')
            thumbnail.appendChild(img);
            thumbnails.appendChild(thumbnail);
        })
        onChange = (index) => {
            Array.from(thumbnails.children).forEach((child, i) => {
                if (index == i) {
                    child.classList.add('selected')
                } else {
                    child.classList.remove('selected')
                }
            })
            console.log(index)
        }
        onChange(index)
    }


    function animate(direction) {
        if (direction == 'left') {
            carouselImg.classList.add('slide-out');
            setTimeout(() => {
                carouselImg.classList.remove('slide-out');
            }, duration);
        } else if (direction == 'right') {
            carouselImg.classList.add('slide-in');
            setTimeout(() => {
                carouselImg.classList.remove('slide-in');
            }, duration);
        }
    }
    carouselImg.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease;`;


    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    return {
        seek: seek,
        prev: prev,
        next: next,
        thumbnails: thumbnails,
        slideshow: slideshow,
    };
}

const createLightbox = (images) => {
    const lightboxElem = document.getElementById('product-carousel').cloneNode(true);
    const carousel = carouselHandler(images, lightboxElem)
    carousel.thumbnails(lightboxElem, (index) => {
        // carousel.slideshow.pause()
        carousel.seek(index)
    })

    function openLightbox() {
        lightboxElem.classList.add('lightbox');
        lightboxElem.style.position = 'absolute';
        lightboxElem.style.top = '50%';
        lightboxElem.style.left = '50%';
        lightboxElem.style.transform = 'translate(-50%, -50%)';
        lightboxElem.style.zIndex = '1000';
        lightboxElem.style.backgroundColor = 'white';
        lightboxElem.style.padding = '20px';
        lightboxElem.style.backgroundColor = 'transparent';
        lightboxElem.style.width = '500px'
            
    
        const backdrop = document.createElement('div');
        backdrop.classList.add('lightbox-backdrop');
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        backdrop.style.zIndex = '999';


        const closeBtn = document.createElement('button');
        const closeImg = document.createElement('img');
        closeImg.src = './images/icon-close.svg';
        closeImg.alt = 'Close';
        closeBtn.appendChild(closeImg);
        closeBtn.style.position = 'fixed';
        closeBtn.style.top = '-8px';
        closeBtn.style.right = '-8px';
        closeBtn.style.transform = 'translate(50%, -50%)';
        closeBtn.style.display = 'flex'
        closeBtn.addEventListener('click', () => {
            closeLightbox()
        })
    

        lightboxElem.appendChild(closeBtn);
        document.body.appendChild(backdrop);
        document.body.appendChild(lightboxElem);

        
        const prevBtn = lightboxElem.querySelector('#prev-btn');
        const nextBtn = lightboxElem.querySelector('#next-btn');
        prevBtn.addEventListener('click', carousel.prev);
        nextBtn.addEventListener('click', carousel.next);

        const imgHeight = lightboxElem.querySelector('img').getBoundingClientRect().height
        prevBtn.style.display = 'flex'
        prevBtn.style.top = `${(imgHeight/2).toFixed(0)}px`
        prevBtn.style.transform = 'translate(-40%, 50%)';
        nextBtn.style.display = 'flex'
        nextBtn.style.top = `${(imgHeight/2).toFixed(0)}px`
        nextBtn.style.transform = 'translate(40%, 50%)';

        backdrop.addEventListener('click', closeLightbox);
    }
    
    function closeLightbox() {
        const lightboxElem = document.querySelector('.lightbox');
        const backdrop = document.querySelector('.lightbox-backdrop');
        if (lightboxElem) lightboxElem.remove();
        if (backdrop) backdrop.remove();
    }

    console.log('init lightbox')
    
    return {
        open: openLightbox,
        close: closeLightbox,
    }
}

export { carouselHandler, createLightbox }