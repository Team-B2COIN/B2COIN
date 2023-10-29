// (쿼리 스트링을 활용) 클릭한 카드의 id값을 가져와서 해당 상세 페이지 JSON을 가져온다.

const IMGPATH = "https://image.tmdb.org/t/p/w500";

let urlStr = window.location.href;
let url = new URL(urlStr);
let urlparams = url.searchParams;
let iddetail = urlparams.get('id');

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${iddetail}?api_key=8172f03c96ba74084086d2a8724c2989`,
    options)
  .then(response => response.json())
  .then(response => {
  const { title, overview, poster_path, vote_average, release_date, genres, runtime, tagline } = response;
  const test0 = document.getElementById("page0")
  const vote1 = (vote_average).toFixed(1)
  test0.innerHTML = `
  <img class="poster" src="${IMGPATH + poster_path}" alt="">
  <div class="movie-info">
    <h1>${title}</h1>
    <span>${vote1}</span>`;

  const test1 = document.getElementById("page1")
  test1.innerHTML = `
    <div class="fact">
    <div class="age">정보</div>
    <div class="release">${release_date}</div>
    <div class="genres">${genres[0].name}</div>
    <div class="runtime">${runtime}분</div>
  </div>
  <div class="tagline">${tagline}</div>
  <div class="overview">${overview}</div>`;

  console.log(response);
return response;
})}



fetchMovieData();

// 가져온 정보값을 html에서 지정한 위치에 보낸다.
//document.getElementById('영화 제목')와 innerHTML="" 활용

// (로컬 스토리지) 리뷰 작성 (지혜님)
// + validation check 기능 삽입 ex) 아이디를 입력해주세요.
// stringify 저장한 값을 가져온다.
// 영화별 리뷰를 저장하려면 어떤 객체로 저장해야 하는가?
// 정말 전혀 모르겠다.

// 최종적으로 만든 두 기능을 합친다.

// 솔직하게 모른다고 말하기. 설명 듣고 혼자서 다시 해보기.
// 콜백 함수, dom 함수