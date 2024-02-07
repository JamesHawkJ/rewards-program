import data from '../__mocks__/api/v1/users.js';

const API = {
  get: (shouldResolve = true) => new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(data.users) : reject(new Error('Fetch failed'));
    }, 2000);
  }),
};

export default API;
