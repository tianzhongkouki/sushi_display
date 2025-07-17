let sushiList = [];
let history = [];

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
}

fetch('sushi.txt')
  .then(response => response.text())
  .then(text => {
    sushiList = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    updateSushi();
    setInterval(updateSushi, 10000);
  })
  .catch(error => {
    console.error("寿司リストの読み込みに失敗しました:", error);
  });

