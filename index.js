const menuBtn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const overlay = document.getElementById('overlay')
const closeBtn = document.getElementById('menu-close-btn')
const navLinks = document.querySelectorAll('.menu__nav-link')

const header = document.getElementById('header')

function handleMenu() {

    const openMenu = () => {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('menu--show')
            overlay.classList.toggle('menu--show')
        })
    }

    const closeMenu =() => {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('menu--show')
            overlay.classList.remove('menu--show')
        })

        overlay.addEventListener('click', () => {
            menu.classList.remove('menu--show')
            overlay.classList.remove('menu--show')
        })
    }

    const activeNav = () => {
        navLinks.forEach((nav) => {
            nav.onclick = function () {
                let actived = document.querySelector('.menu__nav-link.menu__nav-link--active')
                actived.classList.remove('menu__nav-link--active')

                this.classList.add('menu__nav-link--active')

                // Close Menu
                menu.classList.remove('menu--show')
                overlay.classList.remove('menu--show')
            }
        })
    }
    

    openMenu()
    closeMenu()
    activeNav()
}

function handleScrollHeader () {
    window.onscroll = () => {
        
        if (window.scrollY > 0) {
            header.style.borderBottom = '1px solid #dee2e6'
        } else {
            header.style.borderBottom = '1px solid transparent'
        }
    }
}

function start() {
    handleMenu()
    handleScrollHeader()
}

start()