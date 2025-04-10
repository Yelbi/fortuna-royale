import React from 'react';
import './GameCard.css';

const GameCard = ({ 
  title, 
  description, 
  icon, 
  buttonText = 'Jugar Ahora', 
  onButtonClick, 
  themeColor = 'primary' 
}) => {
  return (
    <div className={`game-card ${themeColor}`}>
      {icon && <div className="game-card-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      {buttonText && onButtonClick && (
        <button 
          className={`game-card-button ${themeColor}`} 
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default GameCard;