/* -------- 1. 스토리 클릭 시 모달 띄우기 -------- */
// "story-modal" 클래스 요소 취득하기
const storyModal = document.querySelector(".story-modal");
const storyElements = document.querySelectorAll(".story-element");

// "story-element" 클래스 div가 클릭될 시 "story-modal" 클래스 요소 보여줌
storyElements.forEach((storyElement) => {
  storyElement.addEventListener("click", () => {
    storyModal.style.display = "block";
  });
});

/* ------ 1-1. 스토리 밖의 공간을 눌러야 해제되도록 ------ */
storyModal.addEventListener("click", (event) => {
  if (event.target === storyModal) {
    storyModal.style.display = "none";
  }
});

/* ---------- 2. 프로필 미리보기 (모달) ---------- */
// "profile-container" 클래스 요소 취득하기
const profile_container = document.querySelector(".profile-container");

// "profile-modal" id를 가진 요소 취득하기
const profile_modal = document.getElementById("profile-modal");

// hover 시 모달 띄움
profile_container.addEventListener("mouseover", () => {
  profile_modal.style.display = "block";
  profile_modal.style.position = "absolute";
});

// mouseout 시 모달 꺼짐
profile_container.addEventListener("mouseout", () => {
  profile_modal.style.display = "none";
});

/* --------------- 3. 좋아요 버튼 --------------- */
const likeCount = document.getElementById("like-count");
const blackHeart = document.getElementById("black-heart");
const redHeart = document.getElementById("red-heart");

/* ---------- 3-1. 하트 클릭 시 알림창 표시 ---------- */
const toast = document.getElementById("like-toast");

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

// 검정색 하트를 눌렀을 때
blackHeart.addEventListener("click", () => {
  // 빨간 하트를 보여주고 검정 하트는 숨기기
  redHeart.style.display = "inline";
  blackHeart.style.display = "none";

  // 좋아요 개수 증가
  const count = likeCount.innerText;
  likeCount.innerText = parseInt(count) + 1;

  // 알림창 표시
  showToast("jun._.haha_님이 회원님의 게시물을 좋아합니다.");
});

// 빨간색 하트를 눌렀을 때
redHeart.addEventListener("click", () => {
  // 검정 하트는 보여주고 빨간 하트는 숨기기
  blackHeart.style.display = "inline";
  redHeart.style.display = "none";

  // 좋아요 개수 감소
  const count = likeCount.innerText;
  likeCount.innerText = parseInt(count) - 1;
});

/* ----------------- 4. 댓글 추가 ----------------- */
const commentsCreateForm = document.querySelector(".comments-create-form");
const commentContainer = document.querySelector(".written-comments-container");
const commentInput = document.querySelector(".comment");

// 댓글의 내용을 저장할 자료구조
const commentsList = [];
let commentId = 0;

// form 태그 제출 시 이벤트 핸들링. event(e)를 인자로 받아 event 정보를 취득
commentsCreateForm.addEventListener("submit", (e) => {
  // form 태그가 클릭 되었을 때 페이지 이동을 막고 댓글 내용을 취득하기
  e.preventDefault();
  const commentText = commentInput.value;
  if (!commentText) return;
  commentsList.push(commentText);

  // 댓글 내용이 표시될 HTML노드를 만들어주기 (string 형식으로 HTML요소를 만들어서 HTML파일에 삽입)
  commentId = commentsList.length;
  const commentNode = `
    <div class="comment-wrapper">
      <span class="comment">${commentText}</span>
      <img
        id="${commentId}" 
        class="comment-delete-icon" 
        onclick="deleteComment(${commentId})" 
        src="./images/close.png" 
        alt="comment" 
      />
    </div>
  `;

  // "written-comments-container"에 댓글 HTML노드를 추가해주기
  // 채팅창 값은 비워주기
  commentContainer.innerHTML = commentContainer.innerHTML + commentNode;
  commentInput.value = "";
});

/* ----------------- 5. 댓글 삭제 ----------------- */
const deleteComment = (id) => {
  // commentsList 의 id번째 원소를 하나 삭제 (각 comment의 id 를 commentsList 에서의 순서로 설정했기에 가능)
  commentsList.splice(id, 1);

  // 새로운 commentsList에 map 함수를 호출하여 댓글 HTML 노드들로 이루어진 배열 만들기
  // join 함수를 이용해 배열 원소들을 하나의 스트링으로 만들어 commentContainer의 innerHTML에 저장

  commentContainer.innerHTML = commentsList
    .map(
      (comment, index) => `
  <div class="comment-wrapper">
    <span class="comment">${comment}</span>
    <img id="${index}" class="comment-delete-icon" onclick="deleteComment(${index})" src="./images/close.png" alt="comment" />
  </div>`
    )
    .join("");
};

/* ----------------- 6. 새로고침 ----------------- */
// header에 있는 'instagram'을 누르면 사이트가 새로고침 되도록
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    location.reload();
  });
});

/* --------- 7. 아이콘 hover 시 살짝 투명하게 --------- */
// 아이콘(header, article)들에 hover하면 투명도가 생기도록
const icons = document.querySelectorAll(
  ".logo, .search, .icon-list, .profile, .article, #black-heart, #red-heart"
);
icons.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    icon.style.opacity = "0.5";
  });
});
// mouseout 하면 투명도 원상복귀
icons.forEach((icon) => {
  icon.addEventListener("mouseout", () => {
    icon.style.opacity = "1";
  });
});

/* --------------- 8. 이모지 모달 --------------- */
const emojiButton = document.getElementById("emoji-button");
const emojiModal = document.getElementById("emoji-modal");

// 1. 이모지 버튼 클릭 시 모달 보이기
emojiButton.addEventListener("click", () => {
  emojiModal.classList.toggle("show");
});

// 2. 이모지 선택 시 댓글 입력창에 추가
const emojiOptions = document.querySelectorAll(".emoji-option");
emojiOptions.forEach((emoji) => {
  emoji.addEventListener("click", () => {
    commentInput.value += emoji.textContent;
    emojiModal.style.display = "none"; // 선택 후 모달 닫기
    commentInput.focus(); // 입력창 포커스 유지
  });
});
