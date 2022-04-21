import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  day: document.querySelector("[data-days]"),
  hour: document.querySelector("[data-hours]"),
  minute: document.querySelector("[data-minutes]"),
  second: document.querySelector("[data-seconds]"),
};

let userChosenTime = null;

const startBtn = document.querySelector("[data-start]");
startBtn.addEventListener("click", startCount);
startBtn.disabled = true;
const timer = flatpickr("input#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
});

function startCount() {
  const currentTime = new Date();
  const timeDelta = userChosenTime.getTime() - currentTime.getTime();
  setClock(convertMs(timeDelta));

  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDelta = userChosenTime.getTime() - currentTime.getTime();
    setClock(convertMs(timeDelta));

    if (timeDelta < 1000) {
      clearInterval(intervalId);
      console.log("time is out");
    }
  }, 1000);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
function setClock(timeObj) {
  refs.day.textContent = addLeadingZero(timeObj.days);
  refs.hour.textContent = addLeadingZero(timeObj.hours);
  refs.minute.textContent = addLeadingZero(timeObj.minutes);
  refs.second.textContent = addLeadingZero(timeObj.seconds);
}
function checkDate(userTime) {
  const currentTime = new Date();
  userChosenTime = userTime;
  const timeDelta = userChosenTime.getTime() - currentTime.getTime();

  if (timeDelta < 0) {
    Notify.failure("Please choose a date in future", {
      timeout: 2000,
      showOnlyTheLastOne: true,
      position: "center-top",
    });
    startBtn.disabled = true;

    return;
  }
  startBtn.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
