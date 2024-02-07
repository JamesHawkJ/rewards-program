import { PointsBrick } from '..';
import './styles.css';

const PointsIndicator = ({ label, points }) => {
  return (
    <div className="points-indicator">
      <p>{label}</p>
      <PointsBrick points={points} />
    </div>
  );
};

export default PointsIndicator;
