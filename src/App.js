import { useEffect } from 'react';
import { UsersGrid } from './containers';
import { useUsersApi } from './context';
import { ErrorsDisplay } from './components';

function App() {
  const { fetchUsers } = useUsersApi();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="App">
      <ErrorsDisplay />
      <UsersGrid />
    </div>
  );
}

export default App;
