import data from '../__mocks__/api/v1/users.js';
import API from './index';

describe('fetchUsers', () => {
  it('should resolve with user data when shouldResolve is true', async () => {
    const users = await API.get(true);
    expect(users).toEqual(expect.arrayContaining(data.users));
  });

  it('should reject with an error when shouldResolve is false', async () => {
    await expect(API.get(false)).rejects.toThrow(Error);
  });
});
