function validateForm() {
    const nazwaInput = document.getElementById("name");
    const narodowoscInput = document.getElementById("game");


    const errorNazwa = document.getElementById("errorName");
    const errorNarodowosc = document.getElementById("errorGame");

    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([nazwaInput, gameInput], [errorNazwa, errorGame, ], errorsSummary);

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

    if (!checkRequired(nazwaInput.value)) {
        valid = false
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        valid = false
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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

    if (!checkRequired(colorsInput.value)) {
        valid = false
        colorsInput.classList.add("error-input");
        errorColors.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(colorsInput.value, 2, 60)) {
        valid = false
        colorsInput.classList.add("error-input");
        errorColors.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}