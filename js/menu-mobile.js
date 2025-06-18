const body = document.getElementById("body")
const openMenu = document.getElementById("btn-open")
const closeMenu = document.getElementById("btn-close")
const topNavMenu = document.querySelector(".topnav")
const windowSize = window.matchMedia("(width < 744px)")
const elemsToDisable = document.querySelectorAll(".hero , main , #logo ,#btn-open , #footer")

// only for trap focus :
//const childsMenuFocusable = topNavMenu.querySelectorAll("button, a") // (":scope button, a")
//const firstFocusable = childsMenuFocusable[0];
//const lastFocusable = childsMenuFocusable[childsMenuFocusable.length - 1];

function trapFocus(e) {
    let tabPressed = e.key === "Tab"
    if (!tabPressed) {
        return;
    }

    if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
        }
    } else /* tab */ {
        if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
        }
    }
}
//document.addEventListener("keydown", trapFocus)

function setupNavigation(size) {
    if (size.matches) {
        //mobile
        topNavMenu.setAttribute("inert", "")
        topNavMenu.style.transition = "none"
    }
    else {
        // tablet/desktop
        topNavMenu.removeAttribute("inert")
        body.classList.remove("u-hide-scroll")
        hideMobileMenu()
        topNavMenu.removeAttribute('inert');
    }
}

setupNavigation(windowSize)

windowSize.addEventListener("change", () => {
    setupNavigation(windowSize)
})

openMenu.addEventListener("click", openMobileMenu)
closeMenu.addEventListener("click", hideMobileMenu)

function openMobileMenu() {
    openMenu.setAttribute("aria-expanded", "true")
    topNavMenu.removeAttribute("inert")
    topNavMenu.removeAttribute("style")

    body.classList.add("u-hide-scroll")
    enableEscapeKey()
    disableOtherElements(elemsToDisable)
    closeMenu.focus()
}

function hideMobileMenu() {
    openMenu.setAttribute("aria-expanded", "false")
    topNavMenu.setAttribute("inert", "")
    body.classList.remove("u-hide-scroll")

    enableOtherElements(elemsToDisable)
    setTimeout(() => topNavMenu.style.transition = "none", 500)
    openMenu.focus()
}

function disableOtherElements(elems) {
    elems.forEach(element =>  element.setAttribute("inert", ""))
}

function enableOtherElements(elems) {
    elems.forEach(element => element.removeAttribute("inert"))
}

function enableEscapeKey() {
    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape")  hideMobileMenu()
    })
}