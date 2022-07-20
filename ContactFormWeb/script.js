//get elements from documnet
const formElem = document.getElementById('form');
const firstNameElem = document.getElementById('first-name');
const lastNameElem = document.getElementById('last-name');
const emailElem = document.getElementById('email');
const messageElem = document.getElementById('message');

// console.log(formElem, firstNameElem, lastNameElem, emailElem, messageElem);

class UI {
    constructor() {
        this.allElementsAreValid = true;
    }

    showError(elem, message) {
        elem.parentElement.classList.add('error');
        const smallElem = elem.parentElement.querySelector('small');//fiecare small din cele 4 divuri
        smallElem.innerHTML = message;
    }

    showSuccess(elem) {
        elem.parentElement.classList.remove('error');
        elem.parentElement.classList.add('success');
    }

    showSubmitSuccessMessage() {
        if(this.allElementsAreValid) {
            let successMessage = document.createElement('p');
            successMessage.className = 'success';
            successMessage.innerHTML = "Thannk you for contacting us " + firstNameElem.value + " " + lastNameElem.value + "!";
            let firstInput = document.getElementById('first-input');
            formElem.insertBefore(successMessage, firstInput);

            setTimeout(() => {
                successMessage.remove();
            }, 
            2000);
        }
    }

    clearFields() {
        firstNameElem.value = '';
        lastNameElem.value = '';
        emailElem.value = '';
        messageElem.value = '';
    }
}


formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    let ui = new UI();
    
    if(firstNameElem.value === '') {
        ui.showError(firstNameElem, "First Name Required");
        ui.allElementsAreValid = false;
    }
    else {
        ui.showSuccess(firstNameElem);
    }

    if(lastNameElem.value === '') {
        ui.showError(lastNameElem, "Last Name Required");
        ui.allElementsAreValid = false;
    }
    else {
        ui.showSuccess(lastNameElem);
    }

    if(emailElem.value === '') {
        ui.showError(emailElem, "Email Name Required");
        ui.allElementsAreValid = false;
    }
    else {
        ui.showSuccess(emailElem);
    }

    if(messageElem.value === '') {
        ui.showError(messageElem, "Message Required");
        ui.allElementsAreValid = false;
    }
    else {
        ui.showSuccess(messageElem);
    }

    ui.showSubmitSuccessMessage();
    ui.clearFields();
});