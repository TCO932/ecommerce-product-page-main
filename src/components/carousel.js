function carouselHandler(images) {
    const carouselImg = document.getElementById('product-image');
    let index = 0;
    const duration = 500;

    if (images.length) {
        carouselImg.setAttribute('src', images[index].image);
    }

    function prev() {
        index = index - 1 > -1 ? index - 1 : images.length - 1;
        carouselImg.setAttribute('src', images[index].image);
        // animate('right')
    }

    function next() {
        index = index + 1 < images.length ? index + 1 : 0;
        carouselImg.setAttribute('src', images[index].image);
        // animate('left')
    }

    function seek(newIndex) {
        if (Number.isInteger(newIndex) && newIndex >= 0 && newIndex <= images.length - 1) {
            index = newIndex;
            carouselImg.setAttribute('src', images[index].image);
        }
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
        next: next
    };
}

export { carouselHandler }