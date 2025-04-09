import React from 'react';
import './CasinoPage.css';

function CasinoPage() {
  // Datos de ejemplo para los juegos de casino
  const casinoJuegos = [
    { id: 1, nombre: "Ruleta Europea", descripcion: "La ruleta clásica con variantes modernas." },
    { id: 2, nombre: "Tragamonedas Vegas", descripcion: "Las tragamonedas con grandes jackpots." },
    { id: 3, nombre: "Blackjack", descripcion: "El juego de cartas por excelencia en el casino." }
  ];

  return (
    <div className="casino-page">
      <section className="casino-hero">
        <h2>Descubre nuestros Juegos de Casino</h2>
        <p>Explora la mejor selección de juegos tradicionales y modernos en Fortuna Royale Casino.</p>
      </section>
      
      <section className="casino-games">
        <div className="cards-grid">
          {casinoJuegos.map(juego => (
            <div key={juego.id} className="card">
              <h3>{juego.nombre}</h3>
              <p>{juego.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CasinoPage;
