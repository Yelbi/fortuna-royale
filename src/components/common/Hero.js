import React from 'react';
import './Hero.css';

const Hero = ({ title, subtitle, background = 'primary', actionButton }) => {
  return (
    <section className={`hero ${background}`}>
      <div className="container">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {actionButton && (
          <div className="hero-action">
            {actionButton}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;