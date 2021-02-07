function validateForm() {
    const lokalizacjaInput = document.getElementById("location");
    const priceInput = document.getElementById("price");

    const errorLokalizacja = document.getElementById("errorLocation");
    const errorPrice = document.getElementById("errorPrice");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([lokalizacjaInput, priceInput], [errorLokalizacja, errorPrice], errorsSummary);

    let valid = true;

    if (!checkRequired(lokalizacjaInput.value)) {
        valid = false
        lokalizacjaInput.classList.add("error-input");
        errorLokalizacja.innerText = "Pole jest wymagane";
    } else if (!checkTextPriceRange(lokalizacjaInput.value, 2, 60)) {
        valid = false
        lokalizacjaInput.classList.add("error-input");
        errorLokalizacja.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(priceInput.value)) {
        valid = false
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if (priceInput.value < 0) {
        valid = false
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno zawierać dodatnie wartości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}