// (쿼리 스트링을 활용) 클릭한 카드의 id값을 가져와서 해당 상세 페이지 JSON을 가져온다.

const IMGPATH = "https://image.tmdb.org/t/p/w500";

let urlStr = window.location.href;
let url = new URL(urlStr);
let urlparams = url.searchParams;
let iddetail = urlparams.get('id');

// 로컬 스토리지에서 데이터 가져오기
function getCommentsForMovie(movieId) {
  const commentsJSON = localStorage.getItem(`comments_${movieId}`);
  return commentsJSON ? JSON.parse(commentsJSON) : [];
}

// 로컬 스토리지에 데이터 저장하기
function saveComment(comment) {
  const comments = getCommentsForMovie(movieIdFromUrl);
  comments.push(comment);
  localStorage.setItem(`comments_${movieIdFromUrl}`, JSON.stringify(comments));
}

// 댓글 삭제 버튼 및 기능 추가
function addDeleteButton(comment, index) {
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '삭제';
  deleteButton.addEventListener('click', () => {
      deleteComment(index);
  });
  return deleteButton;
}

function deleteComment(index) {
  const comments = getCommentsForMovie(movieIdFromUrl);
  comments.splice(index, 1); // 선택한 댓글 삭제
  localStorage.setItem(`comments_${movieIdFromUrl}`, JSON.strnigify(comments));
  displayComments(); // 삭제 후 댓글 목록 새로고침
}

// 댓글 목록을 화면에 표시하는 함수 업데이트
export function displayComments() {
  const commentStack = document.getElementById('commentStack');
  const comments = getCommentsForMovie(movieIdFromUrl);

  commentStack.innerHTML = '';

  comments.forEach((comment, index) => {
      const commentDiv = document.createElement('div');
      commentDiv.innerHTML = `
                              <p>${comment.name}</p>
                              <p>${comment.review}</p> `;

      const deleteButton = addDeleteButton(comment, index);
      commentDiv.appendChild(deleteButton);
      commentStack.appendChild(commentDiv);
  });
}


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

// 아이디, 비밀번호, 내용 입력 요소 가져오기
const idElement = document.getElementById("userId");
const pwdElement = document.getElementById("userPwd");
const reviewElement = document.getElementById("userReview");
const saveButton = document.getElementById("saveBtn");

// 현재 영화 ID 가져오기
const movieIdFromUrl = getMovieUrlId();
console.log(movieIdFromUrl); //변수 선언 및 할당

saveButton.addEventListener("click", () => {
    const userId = idElement.value;
    const userPwd = pwdElement.value;
    const userReview = reviewElement.value;

    if (userId && userPwd && userReview) {
        const comment = {
            name: userId,
            pwd: userPwd,
            review: userReview,
        };
        saveComment(comment);
        displayComments();

        alert("등록되었습니다!");

        idElement.value = '';
        pwdElement.value = '';
        reviewElement.value = '';

    } else {
        alert("아이디, 비밀번호, 리뷰를 모두 입력해주세요.");
    }
});

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