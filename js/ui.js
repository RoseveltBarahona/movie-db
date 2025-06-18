export const container = document.getElementById("container-movies")
const footer = document.getElementById("footer")
const footerPageInfo = document.getElementById("footer-page-info")
const footerPageNumber = document.getElementById("footer-page-info-number")
const currentPage = document.getElementById("current-page")

export function uiRendermovies(movies) {
	let moviesHTML = ''

	movies.forEach( (movie , index) => {
		moviesHTML += `
				<li class="movie" >
					<h3 class="movie__title">${movie.title}</h3>
					<div class="wrap-votes">
						<p class="movie__votes"><span>votos:</span> ${movie.vote_count} </p>
                        <p class="u-sr-only" id="desc-${index}">puntuación ${movie.vote_average.toFixed(2)}</p>
						<span class="movie__votes-average" aria-describedby="desc-${index} ">
                            <span aria-hidden="true">${movie.vote_average.toFixed(2)}</span>
                        </span>
					</div>
					<img loading="lazy" class="movie__poster" alt="" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
				</li>`
	})
	container.innerHTML = moviesHTML

	footer.removeAttribute("hidden")
}

export function uiUpdatePage(page) {
	currentPage.textContent = page
    footerPageInfo.textContent =  'página ' + page
    footerPageNumber.textContent = page
}