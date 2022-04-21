import "../css/common.css";
const body = document.querySelector("body");
const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
};
refs.stopBtn.disabled = true;
let timer = null;
const interval = 1000;

function Btns(...buttons) {
  buttons.forEach((button) =>
    button.disabled ? (button.disabled = false) : (button.disabled = true)
  );
}

refs.startBtn.addEventListener("click", () => {
  Btns(refs.stopBtn, refs.startBtn);
  switchBobyBgColor(interval);
});

refs.stopBtn.addEventListener("click", () => {
  Btns(refs.stopBtn, refs.startBtn);
  clearInterval(timer);
});

function switchBobyBgColor(interval) {
  body.style.backgroundColor = getRandomHexColor();

  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, interval);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
