// function to simulate making an ajax request. Returns a Promise.
export function request(url, value) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      switch (url) {
        case '/api/name':
          if (value.split(/\s+/).length >= 2) {
            resolve();
          } else {
            reject('Specify first and last name.');
          }
          break;

        case '/api/phone':
          resolve();
          break;

        case '/api/check':
          const { phone } = value;
          const isValid = phone && phone.replace(/\D/g, '').length === 10

          if (isValid) {
            resolve();
          } else {
            reject('Check failed.');
          }
          break;

        default:
          reject('Invalid URL passed to simulated api.')
      }
    }, 1000);
  });
}
