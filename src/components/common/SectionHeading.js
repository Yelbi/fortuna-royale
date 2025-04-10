import React from 'react';
import './SectionHeading.css';

const SectionHeading = ({ title, subtitle, alignment = 'left' }) => {
  return (
    <div className={`section-heading ${alignment}`}>
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;