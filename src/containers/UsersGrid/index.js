import { useEffect } from 'react';
import { WithSpinner } from '../../components';
import { UserCard } from './components';
import { useUsersApi, useUsersState } from '../../context';

import './styles.css';

const Grid = WithSpinner(() => {
  const { records } = useUsersState();
  const { calculateRewardsForAllUsers } = useUsersApi();

  useEffect(() => {
    calculateRewardsForAllUsers(records);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users-grid">
      {records.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
});

const UsersGrid = () => {
  const { isLoading } = useUsersState();

  return (
    <Grid isLoading={isLoading} />
  );
};

export default UsersGrid;
