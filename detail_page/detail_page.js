function getMovieUrlId() {
    const url = window.location.href;
    const urlParts = url.split('?');
    const movieUrlPart = new URLSearchParams(urlParts[1]); // 아마 여기 수정 예정
    return movieUrlPart.get('id');
}

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

export async function fetchMovieData() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
        },
    };
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieIdFromUrl}`, options
    );
    const data = await response.json();
    console.log(data);
    return data;
} // 선언만 아직 실행x

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

/// >>> 연결 되는데 스트링