import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/common/Hero';
import GameCard from '../components/common/GameCard';
import SectionHeading from '../components/common/SectionHeading';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const { user } = useContext(AuthContext);

  // Datos de ejemplo para las diferentes secciones
  const eventosPopulares = [
    { 
      id: 1, 
      nombre: "Ruleta en Vivo", 
      descripcion: "Apuesta en tiempo real con crupieres en vivo y disfruta de la auténtica experiencia de casino desde tu hogar."
    },
    { 
      id: 2, 
      nombre: "Blackjack Plus", 
      descripcion: "Disfruta del Blackjack con promociones exclusivas y reglas especiales que aumentan tus posibilidades de ganar."
    },
    { 
      id: 3, 
      nombre: "Fútbol en Directo", 
      descripcion: "Apuestas en los partidos más emocionantes con cuotas actualizadas en tiempo real y estadísticas detalladas."
    }
  ];

  const nuevosJuegos = [
    { 
      id: 1, 
      nombre: "Slot Adventure", 
      descripcion: "Nuevas tragamonedas con temáticas únicas, gráficos inmersivos y grandes jackpots progresivos."
    },
    { 
      id: 2, 
      nombre: "Poker Royale", 
      descripcion: "Juego de poker con mesas actualizadas, torneos diarios y la posibilidad de enfrentarte a jugadores profesionales."
    }
  ];

  const nuevasApuestas = [
    { 
      id: 1, 
      nombre: "Baloncesto NBA", 
      descripcion: "Nuevas cuotas y mercados en partidos de la NBA, con estadísticas detalladas y apuestas especiales."
    },
    { 
      id: 2, 
      nombre: "Tennis Open", 
      descripcion: "Apuestas en torneos internacionales de tenis con seguimiento en vivo y múltiples opciones de mercado."
    }
  ];

  return (
    <div className="home-page">
      <Hero 
        title={user ? `¡Bienvenido de nuevo, ${user.nombre || 'Usuario'}!` : "¡Bienvenido a Fortuna Royale!"}
        subtitle="Descubre eventos populares, nuevos juegos y apuestas deportivas emocionantes."
        actionButton={
          !user && (
            <Link to="/register" className="btn-primary">
              Regístrate Ahora
            </Link>
          )
        }
      />

      <div className="container">
        <section className="section fade-in">
          <SectionHeading
            title="Eventos Populares"
            subtitle="Los juegos y eventos con mayor participación esta semana"
          />
          <div className="cards-container">
            {eventosPopulares.map(evento => (
              <GameCard
                key={evento.id}
                title={evento.nombre}
                description={evento.descripcion}
                themeColor="primary"
                buttonText="Jugar Ahora"
                onButtonClick={() => console.log(`Jugando ${evento.nombre}`)}
              />
            ))}
          </div>
        </section>

        <section className="section fade-in">
          <SectionHeading
            title="Nuevos Juegos"
            subtitle="Las últimas incorporaciones a nuestro catálogo de juegos"
          />
          <div className="cards-container">
            {nuevosJuegos.map(juego => (
              <GameCard
                key={juego.id}
                title={juego.nombre}
                description={juego.descripcion}
                themeColor="secondary"
                buttonText="Probar Ahora"
                onButtonClick={() => console.log(`Probando ${juego.nombre}`)}
              />
            ))}
          </div>
        </section>

        <section className="section fade-in">
          <SectionHeading
            title="Nuevas Apuestas"
            subtitle="Las opciones de apuestas deportivas más recientes"
          />
          <div className="cards-container">
            {nuevasApuestas.map(apuesta => (
              <GameCard
                key={apuesta.id}
                title={apuesta.nombre}
                description={apuesta.descripcion}
                themeColor="primary"
                buttonText="Apostar"
                onButtonClick={() => console.log(`Apostando en ${apuesta.nombre}`)}
              />
            ))}
          </div>
        </section>

        <section className="promo-banner fade-in">
          <div className="promo-content">
            <h3>¡Bono Especial!</h3>
            <p>Obtén un 100% en tu primer depósito hasta $500</p>
            <Link to="/register" className="btn-primary">
              Reclamar Ahora
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;