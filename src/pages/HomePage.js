import React from 'react';
import './HomePage.css';

function HomePage() {
  // Datos de ejemplo
  const eventosPopulares = [
    { id: 1, nombre: "Ruleta en Vivo", descripcion: "Apuesta en tiempo real con crupieres en vivo." },
    { id: 2, nombre: "Blackjack Plus", descripcion: "Disfruta del Blackjack con promociones exclusivas." },
    { id: 3, nombre: "Fútbol en Directo", descripcion: "Apuestas en los partidos más emocionantes." }
  ];

  const nuevosJuegos = [
    { id: 1, nombre: "Slot Adventure", descripcion: "Nuevas tragamonedas con temáticas únicas." },
    { id: 2, nombre: "Poker Royale", descripcion: "Juego de poker con mesas actualizadas." }
  ];

  const nuevasApuestas = [
    { id: 1, nombre: "Baloncesto NBA", descripcion: "Nuevas cuotas y mercados en partidos de la NBA." },
    { id: 2, nombre: "Tennis Open", descripcion: "Apuestas en torneos internacionales de tenis." }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h2>¡Bienvenido a Fortuna Royale!</h2>
        <p>Descubre eventos populares, nuevos juegos y apuestas deportivas emocionantes.</p>
      </section>

      <section className="section">
        <h3>Eventos Populares</h3>
        <div className="cards-container">
          {eventosPopulares.map(evento => (
            <div key={evento.id} className="card">
              <h4>{evento.nombre}</h4>
              <p>{evento.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>Nuevos Juegos</h3>
        <div className="cards-container">
          {nuevosJuegos.map(juego => (
            <div key={juego.id} className="card">
              <h4>{juego.nombre}</h4>
              <p>{juego.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>Nuevas Apuestas</h3>
        <div className="cards-container">
          {nuevasApuestas.map(apuesta => (
            <div key={apuesta.id} className="card">
              <h4>{apuesta.nombre}</h4>
              <p>{apuesta.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
