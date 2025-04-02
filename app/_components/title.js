
import './_styles/ShinyText.css';
import PropTypes from 'prop-types';

const ShinyText = ({ text, disabled = false, speed = 10, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ 
        animationDuration,
        '--animation-duration': animationDuration 
      }}
    >
      {text}
    </div>
  );
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string
};

export default ShinyText;