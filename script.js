//api 불러오기
const APIURL = "https://api.themoviedb.org/3/movie/top_rated?&api_key=2bc3945c7a677ba731052247cfa86a41&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=2bc3945c7a677ba731052247cfa86a41&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const btn = document.getElementById("btn");

let allMovies = [];
const getMovies = async (url) => {
  const resp = await fetch(url);
  const respData = await resp.json();
  const { results } = respData;
  allMovies = results;

  window.addEventListener("load", () => {
    showMovies(allMovies);
  });

  showMovies(allMovies);
  const clickBtn = (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(allMovies[0]);
    const filteredMovies = allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    showMovies(filteredMovies);
  };

  btn.addEventListener("click", clickBtn);
};

const showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { id, poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
                          <img src="${IMGPATH + poster_path}" alt="${title}"/>
                          <div class="movie-info">
                          <h3>${title}</h3>
                          <span>${vote_average}</span>
                          </div>
                          <div class="overview"> ${overview} <div>`;

    main.appendChild(movieEl);

    //팝업 알람
    movieEl.addEventListener("click", () => {
      alert(`영화 ID: ${id}`);
    });

    //카드 클릭하면 상세 페이지
    movieEl.addEventListener("click", clickPopup);
    function clickPopup() {
      location.href = "C:\work\B2COIN\detail\moviedetail.html";
    };

  });
};
getMovies(APIURL);