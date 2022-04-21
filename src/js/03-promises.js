import { Notify } from "notiflix/build/notiflix-notify-aio";

const promises = document.querySelector(".form");
promises.addEventListener("submit", (event) => {
  event.preventDefault();

  const formElement = event.currentTarget.elements;
  let delay = Number(formElement.delay.value);
  let step = Number(formElement.step.value);
  let amount = Number(formElement.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({i, delay }) => {
        Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({i, delay }) => {
        Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });

    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
