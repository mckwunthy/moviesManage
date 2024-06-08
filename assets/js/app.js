/*fichier de gestion de tout le processus de fonctionnement de l'application*/
import { addMovie, updatedMovie, getAllMovie, getMovie, deleteMovie } from "./script.js"

window.onload = async () => {

    setupListeners()

    let moviesTask = await getAllMovie()

    //init left box informations
    let initLeftBox = () => {
        let initInfosBox = `
        <div class="boxInformations anta-regular">
        ici seront affichées les infosmations relatives à la vidéo selectionnée
        </div>
        `
        document.querySelector('.boxInfos').innerHTML = initInfosBox
    }
    initLeftBox()

    //movie box : show and hide movie box
    var addMovieBt = document.querySelector('.add-movie button')
    addMovieBt.onclick = () => {
        var addForm = document.querySelector('.add-form')
        addForm.classList.remove('none')
    }

    //cancel movie data entry
    var cancelBt = document.querySelector('.cancel')
    cancelBt.onclick = () => {
        var addForm = document.querySelector('.add-form')
        addForm.classList.add('none')
    }

    //enregistrement des donnees
    var submitBt = document.forms[0].elements[8]
    submitBt.onclick = () => {

        addMovie(movieData)
        // .then((response) => {
        //     // console.log(response);
        // })

        //on vide movieData et check apres les avoir utiliser (inserer)
        movieData = {}
        check = {}
    }

    //object gestionnaire d'affichage, modification, supprimer
    let handelFunction = {
        //affichage des donnees
        afficheDataMovie: (dataToShow) => {
            var movieBox = document.querySelector('.movie-box')
            //s'il nya acune donnee enregistrees
            if (!dataToShow.length) {
                movieBox.innerHTML = "<div class=\"aucune anta-regular\">AUCUNE DONNEE A AFFICHER</div>"
                return
            }
            //sil exist des donnees enregistrees//
            //head de la table
            let tableHead = `
                     <table>
                         <thead>
                             <tr>
                                 <th>#</th>
                                 <th>title</th>
                                 <th>realisateur</th>
                                 <th>genre</th>
                                 <th>annee</th>
                                 <th>durée</th>
                                 <th>langue</th>
                                 <th>acteurs</th>
                                 <th>actions</th>
                             </tr>
                         </thead>
                     <tbody>
                   
         `
            //foot de la table
            let tableFoot = `
         </tbody>
             <tfoot>
                 <tr>
                     <th>#</th>
                     <th>title</th>
                     <th>realisateur</th>
                     <th>genre</th>
                     <th>annee</th>
                     <th>durée</th>
                     <th>langue</th>
                     <th>acteurs</th>
                     <th>actions</th>
                 </tr>
             </tfoot>
             </table>
             `

            let tableBody = ""
            for (let index = 0; index < dataToShow.length; index++) {
                const element = dataToShow[index];
                //body de la table
                tableBody += `
                             <tr>								
                                 <td>${index + 1}</td>
                                 <td>${element.title}</td>
                                 <td>${element.realisateur}</td>
                                 <td>${element.gender}</td>
                                 <td>${element.year}</td>
                                 <td>${(element.time - element.time % 60) / 60}H${element.time % 60}min</td>
                                 <td>${element.language}</td>
                                 <td>${element.actors}</td>
                                 <td>
                                     <button class="view anta-regular" data-id='${element._id}'>view</button>
                                     <button class="update anta-regular" data-id='${element._id}'>update</button>
                                     <button class="save none anta-regular" data-id='${element._id}'>save</button>
                                     <button class="delete anta-regular" data-id='${element._id}'>delete</button>
                                 </td >
                             </tr >
             `
            };
            movieBox.innerHTML = tableHead + tableBody + tableFoot

            //affichage de donne sur la gauche
            let viewBt = document.querySelectorAll('button.view')
            viewBt.forEach(viewBtClicked => {
                viewBtClicked.onclick = handelFunction.showInLeftBox
            });

            //mise a jour dune entree
            let updatBt = document.querySelectorAll('button.update')
            updatBt.forEach(updatBtClicked => {
                updatBtClicked.onclick = handelFunction.updateMovie
            });

            //suppression d'un element
            let deleteBt = document.querySelectorAll('button.delete')
            deleteBt.forEach(deleteBtClicked => {
                deleteBtClicked.onclick = (event) => {
                    let id = event.target.dataset.id
                    let movieToDelete = moviesTask.find(t => t._id == id)
                    handelFunction.deleteMovieSelect(movieToDelete._id)

                    window.location.reload()
                }
            });
        },
        //affichage des infos dans la box de gauche au click
        showInLeftBox: (event, data = moviesTask) => {
            let id = event.target.dataset.id
            let selectMovie = data.find(t => t._id == id)

            let infosFromTable = `
            <div class="infos flex flex-column gap-10">
								<div class="title">
									<strong>Title :</strong>
									${selectMovie.title}
								</div>
								<div class="realisator">
									<strong>Réalisateur :</strong>
									${selectMovie.realisateur}
								</div>
								<div class="gender-and-year">
									<strong>Genre :</strong>
									${selectMovie.gender}
									<strong>Annee :</strong>
									${selectMovie.year}
								</div>
								<div class="language">
									<strong>Langue :</strong>
									${selectMovie.language}
								</div>
								<div class="actors">
									<strong>Acteurs :</strong>
									${selectMovie.actors}
								</div>
							</div>
							<div class="synospis courgette-regular">
								<strong>Synopsis :</strong>
								${selectMovie.synopsis}
							</div>
            `;
            document.querySelector('.boxInfos').innerHTML = infosFromTable
        },
        //mise à jour des informations de movies
        updateMovie: (event, data = moviesTask) => {
            let id = event.target.dataset.id
            let selectMovie = data.find(t => t._id == id)

            let form = `
            <h3 class="anta-regular">Updat movie</h3>
						<form action="#" name="movieFormUpdat">
							<input type="text" name="title" id="title" placeholder="Title" pattern="[a-zA-Z0-9].{2,}" value="${selectMovie.title}"><br>
							<input type="text" name="realisateur" id="realisateur" placeholder="Réalisateur" pattern="[a-zA-Z].{2,}" value="${selectMovie.realisateur}"><br>
							<select name="gender" id="gender">
								<option value="">choose movie gender</option>
								<option value="comedie">comedie</option>
								<option value="drame">drame</option>
								<option value="thriller">thriller</option>
								<option value="action">action</option>
								<option value="aventure">aventure</option>
								<option value="horreur">horreur</option>
								<option value="fiction">fiction</option>
								<option value="fantastique">fantastique</option>
								<option value="animation">animation</option>
								<option value="musical">musical</option>
								<option value="documentaire">documentaire</option>
								<option value="guerre">guerre</option>
								<option value="western">western</option>
								<option value="biopic">biopic</option>
								<option value="romantique">romantique</option>
							</select><br>
							<input type="text" name="year" placeholder="Year" id="year" pattern="^[1-2][0-9]{3}" value="${selectMovie.year}"><br>
							<input type="text" name="language" id="language" placeholder="Langue" pattern="^[a-zA-Z]{2,15}" value="${selectMovie.language}"><br>
							<input type="number" name="time" id="time" placeholder="Durée en minutes" value="${selectMovie.time}" min="1" max="9999"><br>
							<input type="text" name="actors" id="actors" placeholder="Acteurs" pattern="[a-zA-Z].{2,100}" value="${selectMovie.actors}"><br>
							<textarea name="synopsis" id="synopsis" cols="30" rows="5" placeholder="Synopsis (au moins 10 caracteres)" minlength="10" maxlength="600">${selectMovie.synopsis}</textarea><br>
						    <button class="">updat</button>
                        </form>
						<div class="cancel absolute flex jcc aic">cancel</div>
            `
            let addForm = document.querySelector('.add-form')
            addForm.innerHTML = ""
            addForm.innerHTML = form
            addMovieBt.click()

            //clik on cancel bt pour annuler modificatoin
            document.querySelector('div.cancel').onclick = () => {
                window.location.reload()
            }

            //initialisation des donnees formulaire
            check = {
                title: true,
                realisateur: true,
                gender: false,
                year: true,
                language: true,
                actors: true,
                time: true,
                synopsis: true
            }
            movieData = {
                title: selectMovie.title,
                realisateur: selectMovie.realisateur,
                gender: selectMovie.gender,
                year: selectMovie.year,
                language: selectMovie.language,
                actors: selectMovie.actors,
                time: selectMovie.time,
                synopsis: selectMovie.synopsis
            }

            //on verifie demblee les infos uplode dans le formulaire pour la mise à jour

            var formRegister = document.forms['movieFormUpdat']

            document.forms['movieFormUpdat']['title'].onkeyup = listenerFunction.checkTitle
            document.forms['movieFormUpdat']['realisateur'].onkeyup = listenerFunction.checkRealisateur
            document.forms['movieFormUpdat']['gender'].onchange = listenerFunction.checkGender
            document.forms['movieFormUpdat']['year'].onkeyup = listenerFunction.checkYear
            document.forms['movieFormUpdat']['language'].onkeyup = listenerFunction.checkLanguage
            document.forms['movieFormUpdat']['time'].onkeyup = listenerFunction.checkTime
            document.forms['movieFormUpdat']['actors'].onkeyup = listenerFunction.checkActors
            document.forms['movieFormUpdat']['synopsis'].onkeyup = listenerFunction.checkSynopsis

            //validation des saisie des modification chque fois qu'il y à une entree de donnee (mise àà jour)
            let buttonForm = document.forms['movieFormUpdat']['8']
            buttonForm.classList.contains("none") ? null : buttonForm.classList.add("none")

            window.onkeyup = () => {
                // console.log(checkFormValidity());
                // console.log(content);
                // console.log(check);
                // console.log(movieData);

                if (checkFormValidity()) {
                    buttonForm.classList.contains("none") ? buttonForm.classList.remove("none") : null
                    return
                }
                buttonForm.classList.contains("none") ? null : buttonForm.classList.add("none")
            }

            window.onchange = () => {
                // console.log(checkFormValidity());
                // console.log(content);
                // console.log(check);
                // console.log(movieData);

                if (checkFormValidity()) {
                    buttonForm.classList.contains("none") ? buttonForm.classList.remove("none") : null
                    return
                }
                buttonForm.classList.contains("none") ? null : buttonForm.classList.add("none")
            }

            //une fois les donnees saisie correct, on autorise la mise à jour
            if (document.querySelector('form button')) {
                document.querySelector('form button').onclick = () => {
                    let newTaskMovie = {
                        title: document.forms['movieFormUpdat']['title'].value,
                        realisateur: document.forms['movieFormUpdat']['realisateur'].value,
                        gender: document.forms['movieFormUpdat']['gender'].value,
                        year: document.forms['movieFormUpdat']['year'].value,
                        language: document.forms['movieFormUpdat']['language'].value,
                        actors: document.forms['movieFormUpdat']['actors'].value,
                        time: document.forms['movieFormUpdat']['time'].value,
                        synopsis: document.forms['movieFormUpdat']['synopsis'].value
                    }

                    const updateTodo = (id, todo) => {
                        const index = moviesTask.findIndex(t => t._id == id);
                        if (index !== -1) {
                            moviesTask[index] = { ...moviesTask[index], ...todo };
                            updatedMovie({ ...todo, _id: id })
                        }
                    }
                    updateTodo(selectMovie._id, newTaskMovie)
                }
            }

        },
        //fonction de suppression
        deleteMovieSelect: (id) => {
            deleteMovie(id)
        }
    }

    handelFunction.afficheDataMovie(moviesTask)

    //recherche d'information a partir de la barre de recherche
    let searcheResult = document.querySelector('div.searche-result')
    let input = document.querySelector('.search-box input')

    searcheResult.innerHTML = ""
    let searchMovie = (inputData, dataBase = moviesTask) => {
        dataBase.forEach(movieData => {
            if (movieData.title.includes(inputData) || movieData.realisateur.includes(inputData) || movieData.gender.includes(inputData) || movieData.year.includes(inputData) || movieData.time.includes(inputData) || movieData.language.includes(inputData) || movieData.actors.includes(inputData)) {
                searcheResult.innerHTML += `<div class="movieItem" data-id="${movieData._id}"> ${movieData.title}  ~ ${movieData.gender} ~  ${movieData.year} </div>`
            }

            if (!input.value) {
                searcheResult.innerHTML = ""
                searcheResult.classList.add("none")
            }
        });

        //selection un element de la liste pour l'afficher
        let movieItems = document.querySelectorAll('div.movieItem')
        movieItems.forEach(movieItemsClicked => {
            movieItemsClicked.onclick = handelFunction.showInLeftBox
        });

        searcheResult.onmouseleave = () => {
            // searcheResult.classList.add("none")
            searcheResult.style.display = "none"
        }

        input.onmouseenter = () => {
            searcheResult.style.display = "block"
        }

    }

    input.oninput = () => {
        searcheResult.style.display = "block"
        searcheResult.innerHTML = ""
        let inputData = input.value
        searchMovie(inputData, moviesTask)
    }

}