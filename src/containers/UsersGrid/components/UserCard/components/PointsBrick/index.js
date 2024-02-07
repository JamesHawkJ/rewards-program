import WithSpinner from '../../../../../../components/WithSpinner';

const Brick = WithSpinner(({ points }) => {
  return (
    <div className="points-brick">
      <span>{points} Points</span>
    </div>
  );
}, 'small');

const PointsBrick = ({ points }) => {
  return (
    <Brick
      isLoading={!Number.isInteger(points)}
      points={points}
    />
  );
};

export default PointsBrick;
