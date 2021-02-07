function validateForm() {
    const imieInput = document.getElementById("firstName");
    const nazwiskoInput = document.getElementById("lastName");
    const dataInput = document.getElementById("dateOfBirth");
    const gameInput = document.getElementById("game");

    const errorImie = document.getElementById("errorFirstName");
    const errorNazwisko = document.getElementById("errorLastName");
    const errorData = document.getElementById("errorDateOfBirth");
    const errorGame = document.getElementById("errorGame");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([imieInput, nazwiskoInput, dataInput, gameInput], [errorImie, errorNazwisko, errorData, errorGame], errorsSummary);

    let valid = true;
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(imieInput.value)) {
        valid = false
        imieInput.classList.add("error-input");
        errorImie.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(imieInput.value, 2, 60)) {
        valid = false
        imieInput.classList.add("error-input");
        errorImie.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(nazwiskoInput.value)) {
        valid = false
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwiskoInput.value, 2, 60)) {
        valid = false
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dataInput.value)) {
        valid = false
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dataInput.value, nowString)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(gameInput.value)) {
        valid = false
        gameInput.classList.add("error-input");
        errorGame.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(gameInput.value, 2, 60)) {
        valid = false
        gameInput.classList.add("error-input");
        errorGame.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}