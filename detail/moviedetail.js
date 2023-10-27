// (쿼리 스트링을 활용) 클릭한 카드의 id값을 가져와서 해당 상세 페이지 JSON을 가져온다.

const iddetail = 

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
    options
  );
  const data = await response.json();
  console.log(data);
  return data.results;
}
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