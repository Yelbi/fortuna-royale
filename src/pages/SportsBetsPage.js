import React, { useState } from 'react';
import Hero from '../components/common/Hero';
import GameCard from '../components/common/GameCard';
import SectionHeading from '../components/common/SectionHeading';
import SportsBettingWidget from '../components/bets/SportsBettingWidget';
import './SportsBetsPage.css';

function SportsBetsPage() {
  // Datos de ejemplo para apuestas deportivas
  const apuestasDeportivas = [
    { 
      id: 1, 
      nombre: "Fútbol - Liga MX", 
      descripcion: "Apuestas en partidos de la Liga MX con cuotas actualizadas en tiempo real. Múltiples mercados disponibles.",
      categoria: "futbol" 
    },
    { 
      id: 2, 
      nombre: "Baloncesto - NBA", 
      descripcion: "Disfruta de los mejores partidos de la NBA y apuesta en vivo con estadísticas detalladas.",
      categoria: "baloncesto" 
    },
    { 
      id: 3, 
      nombre: "Fútbol - Champions League", 
      descripcion: "Apuesta en los encuentros más emocionantes de la Champions League con las mejores cuotas del mercado.",
      categoria: "futbol" 
    },
    { 
      id: 4, 
      nombre: "Tenis - ATP Tour", 
      descripcion: "Participa en apuestas de torneos internacionales de tenis con seguimiento punto por punto.",
      categoria: "tenis" 
    },
    { 
      id: 5, 
      nombre: "Béisbol - MLB", 
      descripcion: "Apuesta en los partidos de la Major League Baseball con múltiples opciones y estadísticas en vivo.",
      categoria: "beisbol" 
    },
    { 
      id: 6, 
      nombre: "Fútbol - Premier League", 
      descripcion: "Las mejores cuotas para la liga inglesa. Apuesta en todos los partidos con amplia variedad de mercados.",
      categoria: "futbol" 
    },
  ];

  // Próximos eventos destacados
  const proximosEventos = [
    { 
      id: 1, 
      equipos: "Real Madrid vs Barcelona", 
      liga: "LaLiga", 
      fecha: "10 de Abril, 20:00", 
      categoria: "futbol" 
    },
    { 
      id: 2, 
      equipos: "Lakers vs Warriors", 
      liga: "NBA", 
      fecha: "12 de Abril, 18:30", 
      categoria: "baloncesto" 
    },
    { 
      id: 3, 
      equipos: "Nadal vs Djokovic", 
      liga: "Masters 1000", 
      fecha: "15 de Abril, 15:00", 
      categoria: "tenis" 
    },
  ];

  // Estado para filtrar apuestas por categoría
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  // Estado para mostrar el módulo de apuestas
  const [mostrarApuestas, setMostrarApuestas] = useState(false);
  
  // Filtrar apuestas según la categoría seleccionada
  const apuestasFiltradas = categoriaActiva === 'todos' 
    ? apuestasDeportivas 
    : apuestasDeportivas.filter(apuesta => apuesta.categoria === categoriaActiva);

  // Manejar click en una apuesta
  const handleApuestaClick = () => {
    setMostrarApuestas(true);
    // Desplazar la pantalla hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Volver a la lista de apuestas
  const volverAListaApuestas = () => {
    setMostrarApuestas(false);
  };

  return (
    <div className="sports-page">
      <Hero 
        title="Apuestas Deportivas"
        subtitle="Vive la emoción del deporte con las mejores cuotas y mercados disponibles."
        background="secondary"
      />
      
      <div className="container">
        {mostrarApuestas ? (
          // Mostrar el módulo de apuestas
          <>
            <div className="apuestas-header">
              <button className="btn-back" onClick={volverAListaApuestas}>
                ← Volver a mercados disponibles
              </button>
            </div>
            <div className="apuestas-widget-container">
              <SportsBettingWidget />
            </div>
          </>
        ) : (
          // Mostrar lista de mercados
          <>
            <section className="upcoming-events fade-in">
              <SectionHeading
                title="Próximos Eventos Destacados"
                subtitle="No te pierdas los eventos deportivos más importantes de la semana"
              />
              
              <div className="events-slider">
                {proximosEventos.map(evento => (
                  <div key={evento.id} className="event-card">
                    <div className="event-category">{evento.categoria}</div>
                    <h3>{evento.equipos}</h3>
                    <div className="event-details">
                      <span className="event-league">{evento.liga}</span>
                      <span className="event-date">{evento.fecha}</span>
                    </div>
                    <button className="btn-secondary" onClick={handleApuestaClick}>Ver Cuotas</button>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="deportes-filtros fade-in">
              <button 
                className={`filtro-btn ${categoriaActiva === 'todos' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('todos')}
              >
                Todos los Deportes
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'futbol' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('futbol')}
              >
                Fútbol
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'baloncesto' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('baloncesto')}
              >
                Baloncesto
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'tenis' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('tenis')}
              >
                Tenis
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'beisbol' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('beisbol')}
              >
                Béisbol
              </button>
            </div>
            
            <section className="section fade-in">
              <SectionHeading
                title={`Mercados Disponibles ${categoriaActiva !== 'todos' ? `- ${categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)}` : ''}`}
                subtitle="Explora los distintos mercados y apuestas disponibles para cada deporte"
              />
              
              {apuestasFiltradas.length === 0 ? (
                <div className="no-apuestas">
                  <p>No se encontraron apuestas en esta categoría.</p>
                </div>
              ) : (
                <div className="cards-grid">
                  {apuestasFiltradas.map(apuesta => (
                    <GameCard
                      key={apuesta.id}
                      title={apuesta.nombre}
                      description={apuesta.descripcion}
                      themeColor="secondary"
                      buttonText="Ver Apuestas"
                      onButtonClick={handleApuestaClick}
                    />
                  ))}
                </div>
              )}
            </section>
            
            <section className="sports-live-section fade-in">
              <div className="live-betting-banner">
                <div className="live-content">
                  <div className="live-icon">EN VIVO</div>
                  <h3>Apuestas en Vivo</h3>
                  <p>Apuesta mientras se desarrollan los eventos deportivos y aprovecha las cuotas dinámicas que cambian según el desarrollo del juego.</p>
                  <button className="btn-secondary" onClick={handleApuestaClick}>Ir a Apuestas en Vivo</button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default SportsBetsPage;