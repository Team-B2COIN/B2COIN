
let urlStr = window.location.href;
let url = new URL(urlStr);
let urlparams = url.searchParams;
let iddetail = urlparams.get('id');

const IMGPATH = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main")


async function fetchMovieData() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY9MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/movie_id?api_key=2bc3945c7a677ba731052247cfa86a41&language=eng`,
      options
    );
    const data = await response.json();
    if (data) {
      showMovie(data);
    } else {
      console.error("No data received from the API.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchMovieData();






const showMovie = (movie) => {
  const { id, poster_path, title, vote_average, overview } = movie;
  const roundedVoteAverage = vote_average.toFixed(1);
  const movieEl = document.createElement("div");

  movieEl.classList.add("movie");
  movieEl.innerHTML = `
                          <img src="${IMGPATH + poster_path}" alt="${title}"/>
                          <div class="movie-info">
                          <h3>${title}</h3>
                          <span>${roundedVoteAverage}</span>
                          </div>
                          <div class="overview"> ${overview} <div>`;

  main.appendChild(movieEl);
};




