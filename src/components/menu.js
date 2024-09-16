function menuToggler() {
    const menu = document.querySelector('#menu')
    const menuBtn = document.querySelector('#menu-btn')
    let isShown = false

    const toggle = () => {
        if (isShown) {
            menu.style.display = 'none'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-menu.svg')
        } else {
            menu.style.display = 'block'
            menuBtn.querySelector('img').setAttribute('src', './images/icon-close.svg')
        }

        isShown = !isShown
    }

    const show = () => {
        isShown = false
        toggle()
    }
    
    const hide = () => {
        isShown = true
        toggle()
    }

    const getState = () => {
        return isShown
    }

    return {
        toggle: toggle,
        show: show,
        hide: hide,
        getState: getState
    }
}

export { menuToggler }