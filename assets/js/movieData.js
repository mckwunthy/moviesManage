/*nous traitons specifiquement la validation des donnees saisie dans le formulaire d'ajout de videos*/

/*variables*/
var formRegister = document.forms['movieForm']
var title = document.forms[0]['title']
var realisateur = document.forms[0]['realisateur']
var gender = document.forms[0]['gender']
var year = document.forms[0]['year']
var language = document.forms[0]['language']
var time = document.forms[0]['time']
var actors = document.forms[0]['actors']
var synopsis = document.forms[0]['synopsis']



var check = {}

var movieData = {}

/*listenerFunction: comprend les fonctions qui valide les différents champs du formulaire*/
var listenerFunction = {
    checkTitle: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z0-9].{2,}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, title: false }
            document.getElementById('title').classList.contains('wrong') ? null : document.getElementById('title').classList.add('wrong')
        } else {
            check = { ...check, title: true }
            movieData = { ...movieData, title: content }
            document.getElementById('title').classList.contains('correct') ? null : document.getElementById('title').classList.add('correct')
        }
        setSubmitButton()
    },
    checkRealisateur: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z].{2,}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, realisateur: false }
            document.getElementById('realisateur').classList.contains('wrong') ? null : document.getElementById('realisateur').classList.add('wrong')
        } else {
            check = { ...check, realisateur: true }
            movieData = { ...movieData, realisateur: content }
            document.getElementById('realisateur').classList.contains('correct') ? null : document.getElementById('realisateur').classList.add('correct')
        }
        setSubmitButton()
    },
    checkGender: (ev) => {
        var input = ev.target
        // console.log(input);
        var content = input.value
        // console.log(content);
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z]{5,}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, gender: false }
            document.getElementById('gender').classList.contains('wrong') ? null : document.getElementById('gender').classList.add('wrong')
        } else {
            check = { ...check, gender: true }
            movieData = { ...movieData, gender: content }
            document.getElementById('gender').classList.contains('correct') ? null : document.getElementById('gender').classList.add('correct')
        }

        console.log(checkFormValidity());
        // console.log(gender.value);
        console.log(check);
        console.log(movieData);

        setSubmitButton()
    },
    checkYear: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[1-2][0-9]{3}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, year: false }
            document.getElementById('year').classList.contains('wrong') ? null : document.getElementById('year').classList.add('wrong')
        } else {
            check = { ...check, year: true }
            movieData = { ...movieData, year: content }
            document.getElementById('year').classList.contains('correct') ? null : document.getElementById('year').classList.add('correct')
        }
        setSubmitButton()
    },
    checkLanguage: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z]{2,15}$/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, language: false }
            document.getElementById('language').classList.contains('wrong') ? null : document.getElementById('language').classList.add('wrong')
        } else {
            check = { ...check, language: true }
            movieData = { ...movieData, language: content }
            document.getElementById('language').classList.contains('correct') ? null : document.getElementById('language').classList.add('correct')
        }
        setSubmitButton()
    },
    checkTime: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/[1-9][0-9]{0,5}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, time: false }
            document.getElementById('time').classList.contains('wrong') ? null : document.getElementById('time').classList.add('wrong')
        } else {
            check = { ...check, time: true }
            movieData = { ...movieData, time: content }
            document.getElementById('time').classList.contains('correct') ? null : document.getElementById('time').classList.add('correct')
        }
        setSubmitButton()
    },
    checkActors: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z].{2,100}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, actors: false }
            document.getElementById('actors').classList.contains('wrong') ? null : document.getElementById('actors').classList.add('wrong')
        } else {
            check = { ...check, actors: true }
            movieData = { ...movieData, actors: content }
            document.getElementById('actors').classList.contains('correct') ? null : document.getElementById('actors').classList.add('correct')
        }
        setSubmitButton()
    },
    checkSynopsis: (ev) => {

        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/[a-zA-Z0-9].{9,600}/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, synopsis: false }
            document.getElementById('synopsis').classList.contains('wrong') ? null : document.getElementById('synopsis').classList.add('wrong')
        } else {
            check = { ...check, synopsis: true }
            movieData = { ...movieData, synopsis: content }
            document.getElementById('synopsis').classList.contains('correct') ? null : document.getElementById('synopsis').classList.add('correct')
        }
        setSubmitButton()
    }

}

/*verifons si tous les elements du formulaire sont valide avant d'autoriser leur enregistrement*/
var checkFormValidity = () => {
    var result = true
    if (formRegister) {
        if (Object.keys(check).length === 8) {
            for (const key in check) {
                const value = check[key];
                result = result && value
                if (!result) return result
            }
            return result
        }
    }
    return false
}

/*si le formation contient des donnees valides on affiche le bouton enregistrer pour la sauvegarde*/
var setSubmitButton = () => {
    if (formRegister) {
        if (checkFormValidity()) {
            if (formRegister.elements[8]) {
                formRegister.elements[8].classList.contains('none') ? formRegister.elements[8].classList.remove('none') : null
                return;
            }
        }
        formRegister.elements[8].classList.contains('none') ? null : formRegister.elements[8].classList.add('none')
    }
}


/*les evenements*/
var setupListeners = () => {
    title ? title.onkeyup = listenerFunction.checkTitle : null
    realisateur ? realisateur.onkeyup = listenerFunction.checkRealisateur : null
    gender ? gender.onchange = listenerFunction.checkGender : null
    year ? year.onkeyup = listenerFunction.checkYear : null
    language ? language.onkeyup = listenerFunction.checkLanguage : null
    time ? time.onkeyup = listenerFunction.checkTime : null
    actors ? actors.onkeyup = listenerFunction.checkActors : null
    synopsis ? synopsis.onkeyup = listenerFunction.checkSynopsis : null

    window.onkeyup = () => {
        console.log(checkFormValidity());
        // console.log(content);
        // console.log(check);
        //console.log(movieData);

    }
}