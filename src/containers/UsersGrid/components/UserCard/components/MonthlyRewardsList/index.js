import { MonthlyRewardsRow } from './components';
import './styles.css';

const MonthlyRewardsList = ({ data }) => {
  return (
    <ul className="monthly-rewards-list">
      {data.map((rowData) => (
        <MonthlyRewardsRow
          key={rowData.label}
          label={rowData.label}
          reward={rowData.reward}
        />
      ))}
    </ul>
  );
};

export default MonthlyRewardsList;
