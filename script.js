// 여기만 수정하면 돼요!
// date는 반드시 YYYY-MM-DD 형식으로 적기
// password는 편지마다 다르게 설정 가능
const letters = [
 
  {
    date: "2026-07-07",
    title: "이두니, 유니스트에 오다!",
    password: "309",
    hint: "내 기숙사는 몇동일까요?",
    content: `준희야 안뇽 암호 잘 풀었네ㅋ
주말은 역시나 시간이 너무 적은 것 같아.. 우리 철판 아이스크림도 만들기로 했는데 못했고 보겜카도 노래방도 못갔거둥.. 철판은 냉동실에서 꽁꽁 얼고 있겠다ㅜ 이번주 주말에 꼭 하쟈~ 뭔가 하기로 했던거 못하면 원래는 내일 하지 뭐! 했는데 내일 못하니까 너무 슬퍼 너 휴가 나왔을 때도 하려고 했던 거 못하면 이런 기분이였는데..🥲 난 너랑 떨어지면 안되나봐 
너랑 떨어지면 모든 효율이 떨어지네.. 에너지 효율이 너무 떨어져ㅜㅜ 약간 보조빠때리가 충전기보다 충전 느린 거 처럼ㅜㅜ 너는 내 충전기ㅜㅜ
그래도 이런거 내가 만들어서 갖구 오니까 재밌지?! 오늘 내가 있는 곳 까지 와줘서 너무 고마워ㅎ.,ㅎ 지금 헤어진지 30분도 안됐는데 꿈 같고 너무 보고 시퍼..ㅜㅜ 눈물이 날 지경이야.. 그래도 이틀만 버텨볼게!!!!! 금요일이면 보게 될테니깡.
나는 사시른 유니스트에 할 게 너무너무 없었지만 가치잇는거 만으로 징짜 넘 조았어 그냥 하는 말이 아니라 진심으로!!!!! 내일 학교 가는데에 에너지의 보탬이 되어써 ㅎ 내일은 또 어떻게 학교를 가야하나... 두렵다. 나는 사실 빨리 개강하면 좋겠어ㅋㅋㅋㅋㅋ 준희는 너무너무 싫겠지만? 난 학교를 매일 가더라도 널 매일 봐야하거든... 이번주에 머할지 꼭 생각해조ㅎㅎ 벌써 너 볼 생각에 넘 설렌당 기차도 가치 타구 가자ㅎㅎㅎㅎ내려서는 크리스피도넛도 꼭 먹구 부산역 아트박스에는 어떤 말랑이가 있는지도 보고 오장 다으메는 꼭 편지 써와~ㅎ
사랑해 자기야 -기여운 예은이가-

...
`
  },
  {
    date: "2026-07-08",
    title: "메롱",
    password: "??",
    hint: "8일에 열립니당",
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
