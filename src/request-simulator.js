// function to simulate making an ajax request. Returns a Promise.
// Fails randomly 50% of the time.
export function request() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < 0.5) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
