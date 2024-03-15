/*dans ce fichier nous eclatons toutes les methodes de la class necessaires pour notre programme*/
/*ensuite nous exportons ces methodes pour les rendre accessibles dans d'autres fichiers*/
/*la ligne 7 : nous creons notre bdd database nommee moviedb avec une table moviesTask*/

import { LocalDatabase } from "./LocalDatabase.js";

const database = new LocalDatabase('moviedb', ['moviesTask'], 1)

export const addMovie = async (movieData) => {
    await database.addData('moviesTask', movieData)
}

export const updatedMovie = async (movieData) => {
    await database.updateData('moviesTask', movieData)
}

export const getAllMovie = async () => {
    return await database.getAllData('moviesTask')
}

export const getMovie = async (key) => {
    return await database.getData('moviesTask', key)
}

export const deleteMovie = async (key) => {
    await database.deleteData('moviesTask', key)
}


