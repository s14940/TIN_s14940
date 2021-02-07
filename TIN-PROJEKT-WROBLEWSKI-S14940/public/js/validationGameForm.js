function validateForm() {
    const nameInput = document.getElementById("name");
    const dataInput = document.getElementById("date");
    const okrazeniaInput = document.getElementById("tours");

    const errorName = document.getElementById("errorName");
    const errorData = document.getElementById("errorDate");
    const errorTours= document.getElementById("errorTours");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([nameInput, dataInput, toursInput], [errorName, errorData, errorTours], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dataInput.value)) {
        valid = false
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }

    if (!checkRequired(okrazeniaInput.value)) {
        valid = false
        toursInput.classList.add("error-input");
        errorTours.innerText = "Pole jest wymagane";
    } else if (toursInput.value < 0) {
        valid = false
        toursInput.classList.add("error-input");
        errorTours.innerText = "Pole powinno zawierać dodatnie wartości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}