let urlStr = window.location.href;
let url = new URL(urlStr);
let urlparams = url.searchParams;
let iddetail = urlparams.get('id');

const IMGPATH = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");

async function fetchMovieData() {
  
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY9MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${iddetail}?api_key=2bc3945c7a677ba731052247cfa86a41&language=eng`, 
    );
    const data = await response.json();
    console.log(data);
    showMovie(data);
  } 

fetchMovieData();

const showMovie = (movie) => {
  const { id, poster_path, title, vote_average, overview } = movie; //추가적인 정보 여기서 
  const roundedVoteAverage = vote_average.toFixed(1);
  const movieEl = document.createElement("div");

  movieEl.classList.add("movie");
  movieEl.innerHTML = `
                          <img src="${IMGPATH + poster_path}" alt="${title}"/>
                          <div class="movie-info">
                          <h3>${title}</h3>
                          <span>${roundedVoteAverage}</span>
                          </div>
                          <div class="overview">${overview}</div>`;

  main.appendChild(movieEl);
};

//데이터 가져올려면 메인에서 이동해야 됩니다
//요구사항: html 내부 제거, css 조정
//댓글 기능 병합...