let sushiList = [];
let history = [];
let timerId = null;
let nextUpdateTime = null;
let remainingTime = 7000;
let paused = false;

function updateSushi() {
  if (sushiList.length === 0) return;

  let newSushi;
  do {
    newSushi = sushiList[Math.floor(Math.random() * sushiList.length)];
  } while (history.length > 0 && newSushi === history[history.length - 1]);

  history.push(newSushi);
  if (history.length > 3) {
    history = history.slice(-3);
  }

  document.getElementById("current").innerText = newSushi;
  document.getElementById("prev1").innerText = history.length > 1 ? `前の寿司: ${history[history.length - 2]}` : "";
  document.getElementById("prev2").innerText = history.length > 2 ? `2つ前の寿司: ${history[history.length - 3]}` : "";

  nextUpdateTime = Date.now() + 7000;
  timerId = setTimeout(updateSushi, 7000);
}

function startDisplay() {
  if (timerId !== null) return; // すでに動いている

  if (paused && remainingTime > 0) {
    // 一時停止からの再開
    timerId = setTimeout(() => {
      updateSushi();
    }, remainingTime);
    nextUpdateTime = Date.now() + remainingTime;
    paused = false;
  } else {
    // 初回 or 完全再開
    updateSushi();
  }
}

function stopDisplay() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
    remainingTime = nextUpdateTime - Date.now(); // 次までの残り時間を記録
    paused = true;
  }
}

// 初期読み込み
fetch("sushi.txt")
  .then(response => response.text())
  .then(text => {
    sushiList = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    document.getElementById("current").innerText = "スタート！";
  })
  .catch(error => {
    console.error("寿司の読み込みに失敗:", error);
  });
