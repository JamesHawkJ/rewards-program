import calculateRewardPointsForTransaction from './index';

describe('calculateRewardPointsForTransaction', () => {
  it('should return 0 reward points for transaction amount less than or equal to 50', () => {
    const amount = 50;
    const rewardPoints = calculateRewardPointsForTransaction(amount);
    expect(rewardPoints).toBe(0);
  });

  it('should return the correct reward points for transaction amount between 51 and 100', () => {
    const amount = 75;
    const reward = 25;
    const rewardPoints = calculateRewardPointsForTransaction(amount);
    expect(rewardPoints).toEqual(reward);
  });

  it('should return the correct reward points for transaction amount greater than 100', () => {
    const amount = 120;
    const reward = 90;
    const rewardPoints = calculateRewardPointsForTransaction(amount);
    expect(rewardPoints).toEqual(reward);
  });
});
