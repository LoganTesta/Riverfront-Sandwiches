/* JavaScript Subscribe Form Validation. */
var userNameSubscribe;
var userEmailSubscribe;

function validateSubscribeForm() {
    var userNameSubscribe = document.forms["subscribeForm"]["userNameSubscribe"].value;
    var userEmailSubscribe = document.forms["subscribeForm"]["userEmailSubscribe"].value;
    var validContactForm = true;

    var atPosition = userEmailSubscribe.indexOf("@");
    var dotPosition = userEmailSubscribe.lastIndexOf(".");
    var lastEmailCharacter = userEmailSubscribe.length - 1;

    var validName = true;
    if (userNameSubscribe === null || userNameSubscribe === "") {
        validName = false;
    }

    if (validName) {
        document.forms["subscribeForm"]["userNameSubscribe"].classList.remove("required-field-needed");
    } else {
        validContactForm = false;
        document.forms["subscribeForm"]["userNameSubscribe"].classList.add("required-field-needed");
    }


    /*If the @ position is at the start (or less) position of value 0,  validContactForm=false. */
    /* There must be at least 1 character after the @ position and the last dot position. */
    /* There must be at least two characters after the last "." symbol.  */
    var validEmail = true;
    if (userEmailSubscribe === null || userEmailSubscribe === "") {
        validEmail = false;
    } else if (atPosition <= 0) {
        validEmail = false;
    } else if (atPosition + 1 >= dotPosition) {
        validEmail = false;
    } else if (dotPosition + 1 >= lastEmailCharacter) {
        validEmail = false;
    }

    if (validEmail) {
        document.forms["subscribeForm"]["userEmailSubscribe"].classList.remove("required-field-needed");
    } else {
        validContactForm = false;
        document.forms["subscribeForm"]["userEmailSubscribe"].classList.add("required-field-needed");
    }


    if (validContactForm === false) {
        document.getElementsByClassName("javascript-validation-results-contact-us")[0].classList.add("show");
        document.getElementsByClassName("javascript-validation-results-contact-us")[0].innerHTML = "Please fill all required fields in the correct format.";
        return false;
    } else if (validContactForm) {
        document.getElementsByClassName("javascript-validation-results-contact-us")[0].classList.remove("show");
        document.getElementsByClassName("javascript-validation-results-contact-us")[0].innerHTML = "";
        return true;
    }
}

var subscribeButton = document.getElementById("subscribeButton");
subscribeButton.addEventListener("click", validateSubscribeForm, "false");

var userNameSubscribe = document.getElementById("userNameSubscribe");
userNameSubscribe.addEventListener("change", validateSubscribeForm, "false");

var userEmailSubscribe = document.getElementById("userEmailSubscribe");
userEmailSubscribe.addEventListener("change", validateSubscribeForm, "false");
