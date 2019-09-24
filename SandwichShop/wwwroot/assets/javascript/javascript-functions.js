
function setCurrentPage(linkNumber, navBarName) {
    var navBar = document.getElementById("" + navBarName);
    var navBarItems = navBar.getElementsByClassName("nav__nav-link");
    for (var i = 0; i < navBarItems.length; i++) {
        navBarItems[i].className.replace(" current-page", "");
    }
    navBarItems[linkNumber].className += " current-page";
}
