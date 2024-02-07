import PointsIndicator from '../../../PointsIndicator';

const MonthlyRewardsRow = ({ label, reward }) => {
  return (
    <li key={label}>
      <PointsIndicator label={label} points={reward} />
    </li>
  );
};

export default MonthlyRewardsRow;
