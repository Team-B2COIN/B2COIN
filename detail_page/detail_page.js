//아이디,비밀번호,내용입력
const idElement = document.getElementById("id");
const pwdElement = document.getElementById("pwd");
const txtElement = document.getElementById("txt");
const saveButten = document.getElementById("saveBtn");

saveButten.addEventListener("click", () => {
    localStorage.setItem("id", idElement);
    localStorage.setItem("pwd", pwdElement);
    localStorage.setItem("txt", txtElement);

    //아이디 비밀번호 스토리지에 저장
    let userInfo = { id: idElement.value, pwd: pwdElement.value }
    localStorage.setItem("userInfor", JSON.stringify(userInfo));
    alert("저장되었습니다.");
})
