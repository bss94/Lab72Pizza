import {Spinner} from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center
          bg-opacity-25 bg-black h-100 w-100 position-absolute">
      <Spinner/>
    </div>
  );
};

export default LoadingSpinner;