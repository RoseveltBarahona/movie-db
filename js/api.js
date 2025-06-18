
import { uiUpdatePage,uiRendermovies, container } from './ui.js'

const url = "https://api.themoviedb.org/3/movie/"
const api_key = 'c0ef5fa9f031369e95da9661af9b65e6'
const btnNextPage = document.getElementById("btn-next")
const btnPrevPage = document.getElementById("btn-prev")
const excludeTerms = ["index", ""]

let listOfmovies = "top_rated"
let page = 1
let totalPages


getListFromUrl()
verifyUrl()
loadMovies()

function getListFromUrl() {
	let page = window.location.pathname.split("/")
	let list = page[page.length - 1].split(".").shift()

	if (excludeTerms.includes(list)) return

	listOfmovies = list
}

function verifyUrl() {
	if (window.location.search) {
		const params = new URLSearchParams(location.search)
		page = Number(params.get("page"))        

		loadMovies()
        uiUpdatePage(page)
	}
}

btnNextPage.addEventListener("click", () => {
	if (page < totalPages) {
		page += 1
		container.scrollIntoView({ block:"start", behavior: "smooth" }) 
		loadMovies()
		setUrl()
        uiUpdatePage(page)
		btnNextPage.blur()                  
	}
})

btnPrevPage.addEventListener("click", () => {
	if (page > 1) {
		page -= 1
		container.scrollIntoView({ block:"start", behavior: "smooth" })
		loadMovies()
		setUrl()
        uiUpdatePage(page)
		btnPrevPage.blur()        
	} else {
		alert("estas en la página1, no hay nada atras :) ")
	}
})

async function loadMovies() {
	try {
		const response = await fetch(`${url}${listOfmovies}?api_key=${api_key}&language=es-ES&page=${page}`)
		if (!response.ok) {
			throw new Error("Error en la solicitud")
		}
		const data = await response.json()
		uiRendermovies(data.results)
		totalPages = data.total_pages
	}
	catch (error) {
		console.error('Error fetching movies:', error)
	}
}

function setUrl() {
	const url = new URL(location.href)
	url.searchParams.set("page", page)
	window.history.replaceState("", "", url)
	//localStorage.setItem("lastURL", JSON.stringify(location.href))
}