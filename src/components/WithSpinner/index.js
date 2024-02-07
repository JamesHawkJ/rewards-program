import Spinner from '../Spinner';

const WithSpinner = (WrappedComponent, customSpinnerClassName) => {
  const WithSpinnerComponent = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <Spinner customClass={customSpinnerClassName} />
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  return WithSpinnerComponent;
};

export default WithSpinner;
