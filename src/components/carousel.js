function carouselHandler(images, parent) {
    let carouselContainer
    if (parent) {
        carouselContainer = parent.querySelector('.product-image-container');
    } else {
        carouselContainer = document.querySelector('.product-image-container');
    }
    let index = 0;
    const duration = 500;
    const animDuration = 500;

    images.forEach((item, i) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = `Product image #${i+1}`;
        carouselContainer.appendChild(img);
    })

    const imageElems = Array.from(carouselContainer.children)

    function setActive() {
        imageElems.forEach((imgElem, i) => {
            imgElem.classList.remove('active')
            if (index == i) {
                imgElem.classList.add('active')
            }
        })
    }

    setActive()

    function prev() {
        const newIndex = index - 1 > -1 ? index - 1 : images.length - 1;
        const currentIndex = index
        
        clearAnim()
        imageElems[newIndex].classList.add('left-to-mid');
        imageElems[currentIndex].classList.add('mid-to-right');
        setTimeout(() => {
            imageElems[newIndex].classList.remove('left-to-mid');
            imageElems[currentIndex].classList.remove('mid-to-right');
        }, animDuration);
        
        index = newIndex
        onChange()
    }

    function next() {
        const newIndex = index + 1 < images.length ? index + 1 : 0;
        const currentIndex = index
        
        clearAnim()
        imageElems[newIndex].classList.add('right-to-mid');
        imageElems[currentIndex].classList.add('mid-to-left');
        setTimeout(() => {
            imageElems[newIndex].classList.remove('right-to-mid');
            imageElems[currentIndex].classList.remove('mid-to-left');
        }, animDuration);

        index = newIndex
        onChange()
    }

    function clearAnim() {
        imageElems.forEach(img => {
            img.classList.remove('left-to-mid', 'mid-to-right', 'right-to-mid', 'mid-to-left')
        })
    }

    function seek(newIndex) {
        if (Number.isInteger(newIndex) && newIndex >= 0 && newIndex <= images.length - 1) {
            index = newIndex;
            onChange()
        }
    }

    function onChange() {
        setActive()
        onChangeCallback(index)
    }
    
    function onChangeCallback() {}


    const slideshow = (() => {
        let interval
        let duration = 10000

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

        function pause(duration = 15000) {
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
        onChangeCallback = (index) => {
            Array.from(thumbnails.children).forEach((child, i) => {
                if (index == i) {
                    child.classList.add('selected')
                } else {
                    child.classList.remove('selected')
                }
            })
        }
        onChangeCallback(index)
    }


    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.addEventListener('click', () => {
        prev()
        slideshow.pause()
    });
    nextBtn.addEventListener('click', () => {
        next()
        slideshow.pause()
    });

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
    lightboxElem.querySelector('.product-image-container').replaceChildren()
    const carousel = carouselHandler(images, lightboxElem)
    carousel.thumbnails(lightboxElem, (index) => {
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
        closeBtn.style.top = '-20px';
        closeBtn.style.right = '0';
        closeBtn.style.width = 'auto';
        closeBtn.style.display = 'flex'
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', closeLightbox)
    

        lightboxElem.appendChild(closeBtn);
        document.body.appendChild(backdrop);
        document.body.appendChild(lightboxElem);

        
        const prevBtn = lightboxElem.querySelector('#prev-btn');
        const nextBtn = lightboxElem.querySelector('#next-btn');
        prevBtn.addEventListener('click', () => {
            carousel.prev()
            carousel.slideshow.pause()
        });
        nextBtn.addEventListener('click', () => {
            carousel.next()
            carousel.slideshow.pause()
        });

        const imgHeight = lightboxElem.querySelector('img').getBoundingClientRect().height
        prevBtn.style.display = 'flex'
        prevBtn.style.top = `250px`
        prevBtn.style.left = '0';
        prevBtn.style.transform = 'translate(-50%, -50%)';

        nextBtn.style.display = 'flex'
        nextBtn.style.top = `250px`
        nextBtn.style.right = '0';
        nextBtn.style.transform = 'translate(50%, -50%)';

        backdrop.addEventListener('click', closeLightbox);
    }
    
    function closeLightbox() {
        const lightboxElem = document.querySelector('.lightbox');
        const backdrop = document.querySelector('.lightbox-backdrop');
        if (lightboxElem) lightboxElem.remove();
        if (backdrop) backdrop.remove();
    }

    return {
        open: openLightbox,
        close: closeLightbox,
    }
}

export { carouselHandler, createLightbox }