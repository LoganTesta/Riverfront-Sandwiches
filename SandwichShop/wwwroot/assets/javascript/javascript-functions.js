
function setCurrentPage(linkNumber, navBarName) {
    let navBar = document.getElementById("" + navBarName);
    let navBarItems = navBar.getElementsByClassName("nav__nav-link");
    for (let i = 0; i < navBarItems.length; i++) {
        navBarItems[i].className.replace(" current-page", "");
    }
    navBarItems[linkNumber].className += " current-page";
}
