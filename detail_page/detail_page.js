// 현재 코드 문제(JH)
// 1. CSS 없음 > 리뷰댓글 쌓이는 부분 아주 엉망
// 2. 영화 아이디값 제대로 넘어오는지 확인 불가 > 계속 수정 예정


// 아이디, 비밀번호, 내용 입력 요소 가져오기
const idElement = document.getElementById("userId");
const pwdElement = document.getElementById("userPwd");
const reviewElement = document.getElementById("userReview");
const saveButton = document.getElementById("saveBtn");

// 현재 영화 ID 가져오기
const movieID = getMovieUrlId();

function getMovieUrlId() {
    const url = window.location.href;
    const urlParts = url.split('?');
    const movieUrlPart = new URLSearchParams(urlParts[1]); // 아마 여기 수정 예정
    return movieUrlPart.get('id');
}

// 로컬 스토리지에서 데이터 가져오기
function getCommentsForMovie(movieID) {
    const commentsJSON = localStorage.getItem(`comments_${movieID}`);
    return commentsJSON ? JSON.parse(commentsJSON) : [];
}

// 로컬 스토리지에 데이터 저장하기
function saveComment(comment) {
    const comments = getCommentsForMovie(movieID);
    comments.push(comment);
    localStorage.setItem(`comments_${movieID}`, JSON.stringify(comments));
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
    const comments = getCommentsForMovie(movieID);
    comments.splice(index, 1); // 선택한 댓글 삭제
    localStorage.setItem(`comments_${movieID}`, JSON.strnigify(comments));
    displayComments(); // 삭제 후 댓글 목록 새로고침
}

// 댓글 목록을 화면에 표시하는 함수 업데이트
function displayComments() {
    const commentStack = document.getElementById('commentStack');
    const comments = getCommentsForMovie(movieID);

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

displayComments();