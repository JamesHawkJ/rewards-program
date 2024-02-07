import logo from '../../assets/logo.svg';
import './styles.css';

const Spinner = ({ customClass = '' }) => {
  return (
    <img className={`spinner ${customClass}`} src={logo} alt="Loading..." data-testid="spinner" />
  );
};

export default Spinner;
