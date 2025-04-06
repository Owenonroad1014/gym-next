import '../_styles/GradientText.css'

export default function GradientText({
  children,
  className = '',
  colors = ['#f8d808', '#f87808', '#f8d808', '#f87808', '#f8d808'], // Default colors
  animationSpeed = 8, // Default animation speed in seconds
  showBorder = false, // Default overlay visibility
  showContent = true, // Default content visibility
}) {

 
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      {showContent && (
        <div className="text-content" style={gradientStyle}>
          {children}
        </div>
      )}
    </div>
  )
}
