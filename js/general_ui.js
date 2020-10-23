/* responsive header with scroll effect in desktop sizes */

const constants = {
    SCROLL_STOP: 120,
}

let header_el = document.querySelector(".header")

const mmWidth768 = window.matchMedia("(max-width: 768px)")

window.onscroll = function() {
    if(mmWidth768.matches) return;

    if (document.body.scrollTop > constants.SCROLL_STOP || document.documentElement.scrollTop > constants.SCROLL_STOP) {
        header_el.classList.toggle('shrink', true)
    } else {
        header_el.classList.toggle('shrink', false)
    }
}