/* JavaScript Subscribe Form Validation. */

let clickedSubmitSubscribe = false;


function validateSubscribeForm() {

    if (clickedSubmitSubscribe) {
        let userNameSubscribe = document.forms["subscribeForm"]["userNameSubscribe"].value.trim();
        let userEmailSubscribe = document.forms["subscribeForm"]["userEmailSubscribe"].value.trim();
        let validContactForm = true;

        let atPosition = userEmailSubscribe.indexOf("@");
        let dotPosition = userEmailSubscribe.lastIndexOf(".");
        let lastEmailCharacter = userEmailSubscribe.length - 1;

        let validName = true;
        if (userNameSubscribe === null || userNameSubscribe === "") {
            validName = false;
        }

        if (validName) {
            document.forms["subscribeForm"]["userNameSubscribe"].classList.remove("required-field-needed");
        } else {
            validContactForm = false;
            document.forms["subscribeForm"]["userNameSubscribe"].classList.add("required-field-needed");
        }


        /* If the @ position is at the start (or less) position of value 0, validContactForm = false. */
        /* There must be at least 1 character after the @ position and the last dot position. */
        /* There must be at least two characters after the last "." symbol.  */
        let validEmail = true;
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
            document.getElementsByClassName("javascript-validation-results-subscribe")[0].classList.add("show");
            document.getElementsByClassName("javascript-validation-results-subscribe")[0].innerHTML = "Please fill all required fields in the correct format.";
            return false;
        } else if (validContactForm) {
            document.getElementsByClassName("javascript-validation-results-subscribe")[0].classList.remove("show");
            document.getElementsByClassName("javascript-validation-results-subscribe")[0].innerHTML = "";
            return true;
        }
    } else {
        return false;
    }
}

function setClickedSubscribeButtonTrue() {
    let elementWithFocus = document.activeElement;
    if (subscribeButton === elementWithFocus) {
        clickedSubmitSubscribe = true;
    }
}

let subscribeButton = document.getElementById("subscribeButton");
subscribeButton.addEventListener("click", setClickedSubscribeButtonTrue, "false");
subscribeButton.addEventListener("click", validateSubscribeForm, "false");

let userNameSubscribe = document.getElementById("userNameSubscribe");
userNameSubscribe.addEventListener("change", validateSubscribeForm, "false");

let userEmailSubscribe = document.getElementById("userEmailSubscribe");
userEmailSubscribe.addEventListener("change", validateSubscribeForm, "false");
