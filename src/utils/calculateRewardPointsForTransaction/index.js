const calculateRewardPointsForTransaction = transactionAmount => {
  if (transactionAmount > 100) {
    return (transactionAmount - 100) * 2 + 50;
  } else if (transactionAmount > 50 && transactionAmount < 101) {
    return transactionAmount - 50;
  }
  return 0;
};

export default calculateRewardPointsForTransaction;
