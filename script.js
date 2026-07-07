// 여기만 수정하면 돼요!
// date는 반드시 YYYY-MM-DD 형식으로 적기
// password는 편지마다 다르게 설정 가능
const letters = [
 
  {
    date: "2026-07-07",
    title: "짜쟌",
    password: "파란색",
    hint: "내가 제일 좋아하는 색은?",
    content: `바보야 안녕 이거 너무 싱기하지 내가 또 신기한 걸 만들어 왓서
...
`
  },
  {
    date: "2026-07-08",
    title: "메롱",
    password: "blue",
    hint: "하늘과 바다의 색 영어로 🌊",
    content: `오늘도 편지를 열어줘서 고마워.
...
`
  }
];

const passwordInput = document.getElementById("passwordInput");
const message = document.getElementById("message");
const letterBox = document.getElementById("letterBox");
const letterDate = document.getElementById("letterDate");
const letterTitle = document.getElementById("letterTitle");
const letterContent = document.getElementById("letterContent");
const letterList = document.getElementById("letterList");
const todayDate = document.getElementById("todayDate");
const hintText = document.getElementById("hintText");
const mainTitle = document.getElementById("mainTitle");

const today = getKoreaDateString();
const todayLetter = letters.find(letter => letter.date === today);

todayDate.textContent = formatDate(today);

// 위 제목을 오늘 날짜로 변경
const todayParts = today.split("-");
mainTitle.textContent = `${Number(todayParts[1])}월 ${Number(todayParts[2])}일의 편지`;

if (todayLetter) {
  hintText.textContent = `💡 힌트: ${todayLetter.hint}`;
}

renderLetterList();

passwordInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    openTodayLetter();
  }
});

function openTodayLetter() {
  if (!todayLetter) {
    showMessage("오늘 등록된 편지가 아직 없어요.", "error");
    return;
  }

  const inputPassword = passwordInput.value.trim();

  if (inputPassword === todayLetter.password) {
    showMessage("암호가 맞았어요!", "success");
    showLetter(todayLetter);
  } else {
    showMessage("암호가 틀렸어요! 다시 시도해 주세요.", "error");
    letterBox.classList.add("hidden");
  }
}

function showLetter(letter) {
  letterDate.textContent = formatDate(letter.date);
  letterTitle.textContent = letter.title;
  letterContent.textContent = letter.content;
  letterBox.classList.remove("hidden");
}

function renderLetterList() {
  letterList.innerHTML = "";

  letters.forEach(letter => {
    const isOpen = letter.date <= today;

    const item = document.createElement("div");
    item.className = "letter-item";

    item.innerHTML = `
      <div class="letter-icon">${isOpen ? "💌" : "✉️"}</div>
      <div class="letter-info">
        <strong>${formatDate(letter.date)}</strong>
        <span>${letter.title}</span>
      </div>
      <div class="status ${isOpen ? "" : "locked"}">
        ${isOpen ? "열람 가능 ›" : "잠김 🔒"}
      </div>
    `;

    letterList.appendChild(item);
  });
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function scrollToList() {
  document.getElementById("list").scrollIntoView({ behavior: "smooth" });
}

function getKoreaDateString() {
  const now = new Date();
  const koreaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const week = days[date.getDay()];

  return `${year}.${month}.${day} (${week})`;
}
