import { useUsersState } from '../../context';
import './styles.css';

const ErrorsDisplay = () => {
  const { errors } = useUsersState();

  return (
    <div className="errors-display">
      {errors.map((error) => {
        return (
          <div key={error.createdAt} className="error">
            {error.error.message}
          </div>
        );
      })}
    </div>
  );
};

export default ErrorsDisplay;
