import { memo } from 'react';
import './styles.css';
import {
  MonthlyRewardsList,
  PointsIndicator
} from './components';
import { useMonthlyRewards } from '../../../../hooks';

const UserCard = ({ user }) => {
  const {
    currentMonthName,
    currentYear,
    previousMonthName,
    previousYear,
    praPreviousMonthName,
    praPreviousYear
  } = useMonthlyRewards(user);

  return (
    <div className="user-card" key={user.id}>
      <h2>{user.name}</h2>
      <p>Rewards</p>
      <MonthlyRewardsList
        data={[
          { label: `${currentMonthName} ${currentYear}`, reward: user[`${currentMonthName} ${currentYear}`] },
          { label: `${previousMonthName} ${previousYear}`, reward: user[`${previousMonthName} ${previousYear}`] },
          { label: `${praPreviousMonthName} ${praPreviousYear}`, reward: user[`${praPreviousMonthName} ${praPreviousYear}`] }
        ]}
      />
      <PointsIndicator
        label={'Total Rewards:'}
        points={user.totalRewardPoints}
      />
    </div>
  );
};

export default memo(UserCard);
