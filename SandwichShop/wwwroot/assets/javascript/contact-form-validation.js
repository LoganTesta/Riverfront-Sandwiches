/* JavaScript Contact Form Validation. */
var userName;
var userEmail;
var userComments;
var clickedSubmitContact = false;

function validateContactForm() {
    if (clickedSubmitContact) {
        var userName = document.forms["contactForm"]["userName"].value.trim();
        var userEmail = document.forms["contactForm"]["userEmail"].value.trim();
        var userSubject = document.forms["contactForm"]["userSubject"].value.trim();
        var userComments = document.forms["contactForm"]["userComments"].value.trim();
        var validContactForm = true;

        var atPosition = userEmail.indexOf("@");
        var dotPosition = userEmail.lastIndexOf(".");
        var lastEmailCharacter = userEmail.length - 1;

        var validName = true;
        if (userName === null || userName === "") {
            validName = false;
        }

        if (validName) {
            document.forms["contactForm"]["userName"].classList.remove("required-field-needed");
        } else {
            validContactForm = false;
            document.forms["contactForm"]["userName"].classList.add("required-field-needed");
        }


        /*If the @ position is at the start (or less) position of value 0,  validContactForm=false. */
        /* There must be at least 1 character after the @ position and the last dot position. */
        /* There must be at least two characters after the last "." symbol.  */
        var validEmail = true;
        if (userEmail === null || userEmail === "") {
            validEmail = false;
        } else if (atPosition <= 0) {
            validEmail = false;
        } else if (atPosition + 1 >= dotPosition) {
            validEmail = false;
        } else if (dotPosition + 1 >= lastEmailCharacter) {
            validEmail = false;
        }

        if (validEmail) {
            document.forms["contactForm"]["userEmail"].classList.remove("required-field-needed");
        } else {
            validContactForm = false;
            document.forms["contactForm"]["userEmail"].classList.add("required-field-needed");
        }


        var validComments = true;
        if (userComments === null || userComments === "") {
            validComments = false;
        }

        if (validComments) {
            document.forms["contactForm"]["userComments"].classList.remove("required-field-needed");
        } else {
            validContactForm = false;
            document.forms["contactForm"]["userComments"].classList.add("required-field-needed");
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
    } else {
        return false;
    }
}

function setClickedContactButtonTrue() {
    var elementWithFocus = document.activeElement;
    if (contactButton === elementWithFocus) {
        clickedSubmitContact = true;
    }
}

var contactButton = document.getElementById("contactButton");
contactButton.addEventListener("click", setClickedContactButtonTrue, "false");
contactButton.addEventListener("click", validateContactForm, "false");

var userName = document.getElementById("userName");
userName.addEventListener("change", validateContactForm, "false");

var userSubject = document.getElementById("userSubject");
userSubject.addEventListener("change", validateContactForm, "false");

var userEmail = document.getElementById("userEmail");
userEmail.addEventListener("change", validateContactForm, "false");

var userComments = document.getElementById("userComments");
userComments.addEventListener("change", validateContactForm, "false");
