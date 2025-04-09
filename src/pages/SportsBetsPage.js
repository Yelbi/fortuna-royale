import React from 'react';
import './SportsBetsPage.css';

function SportsBetsPage() {
  // Datos de ejemplo para apuestas deportivas
  const apuestasDeportivas = [
    { id: 1, nombre: "Fútbol - Liga MX", descripcion: "Apuestas en partidos de la Liga MX con cuotas actualizadas." },
    { id: 2, nombre: "Baloncesto - NBA", descripcion: "Disfruta de los mejores partidos de la NBA y apuesta en vivo." },
    { id: 3, nombre: "Fútbol - Champions League", descripcion: "Apuesta en los encuentros más emocionantes de la Champions League." },
    { id: 4, nombre: "Tenis - ATP Tour", descripcion: "Participa en apuestas de torneos internacionales de tenis." }
  ];

  return (
    <div className="sports-page">
      <section className="sports-hero">
        <h2>Apuestas Deportivas</h2>
        <p>Vive la emoción del deporte con las mejores cuotas y mercados disponibles.</p>
      </section>

      <section className="sports-container">
        <div className="cards-grid">
          {apuestasDeportivas.map(apuesta => (
            <div key={apuesta.id} className="card">
              <h3>{apuesta.nombre}</h3>
              <p>{apuesta.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SportsBetsPage;
