const APIURL =
  "https://api.themoviedb.org/3/movie/top_rated?&api_key=&page=1";
  // api_key="" 기입
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=&query=";
  // api_key="" 기입
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const btn = document.getElementById("btn"); // 추가한 코드
let allMovies = []; // 추가한 코드
const getMovies = async (url) => {
  const resp = await fetch(url);
  const respData = await resp.json();
  const { results } = respData; // 변경한 코드
  allMovies = results; // 변경한 코드
};
const showMovies = (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { id, poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
<img
src="${IMGPATH + poster_path}"
alt="${title}"
/>
<div class="movie-info">
<h3>${title}</h3>
<span>${vote_average}</span>
</div>
<div class="overview">
${overview}
<div>`;
    movieEl.addEventListener("click", () => {
      alert(`영화 ID: ${id}`);
    });
    main.appendChild(movieEl);
  });
};
getMovies(APIURL);
// 추가한 코드
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