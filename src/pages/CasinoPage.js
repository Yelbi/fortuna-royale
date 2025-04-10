import React, { useState } from 'react';
import Hero from '../components/common/Hero';
import GameCard from '../components/common/GameCard';
import SectionHeading from '../components/common/SectionHeading';
import SlotMachine from '../components/games/SlotMachine';
import './CasinoPage.css';

function CasinoPage() {
  // Datos de ejemplo para los juegos de casino
  const casinoJuegos = [
    { 
      id: 1, 
      nombre: "Ruleta Europea", 
      descripcion: "La ruleta clásica con variantes modernas y límites flexibles. Disfruta de la emoción de apostar a tus números favoritos.", 
      categoria: "mesa"
    },
    { 
      id: 2, 
      nombre: "Tragamonedas Vegas", 
      descripcion: "Las tragamonedas con grandes jackpots progresivos y gráficos de última generación que te transportarán a Las Vegas.", 
      categoria: "slots"
    },
    { 
      id: 3, 
      nombre: "Blackjack", 
      descripcion: "El juego de cartas por excelencia en el casino. Múltiples mesas disponibles con diferentes límites y reglas especiales.", 
      categoria: "mesa"
    },
    { 
      id: 4, 
      nombre: "Mega Fortune Slots", 
      descripcion: "Tragamonedas con temática de lujo y fortuna. Gana grandes premios con sus múltiples líneas de pago y bonos especiales.", 
      categoria: "slots"
    },
    { 
      id: 5, 
      nombre: "Baccarat VIP", 
      descripcion: "La experiencia VIP del baccarat con altos límites de apuesta y servicio personalizado para los jugadores más exigentes.", 
      categoria: "mesa"
    },
    { 
      id: 6, 
      nombre: "Video Poker Deluxe", 
      descripcion: "Múltiples variantes de video poker con gráficos mejorados y la posibilidad de jugar varias manos simultáneamente.", 
      categoria: "poker"
    },
  ];

  // Estado para filtrar juegos por categoría
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  // Estado para mostrar el juego activo
  const [juegoActivo, setJuegoActivo] = useState(null);
  
  // Filtrar juegos según la categoría seleccionada
  const juegosFiltrados = categoriaActiva === 'todos' 
    ? casinoJuegos 
    : casinoJuegos.filter(juego => juego.categoria === categoriaActiva);

  // Manejar click en un juego
  const handleJuegoClick = (juegoId) => {
    // En una implementación real, aquí cargarías el juego correspondiente
    // Para el ejemplo, simplemente mostraremos el Slot Machine si es tragamonedas
    if (juegoId === 2 || juegoId === 4) {
      setJuegoActivo('slot');
    } else {
      // Simular que otros juegos no están disponibles en el ejemplo
      alert('Este juego estará disponible próximamente.');
    }
  };

  // Volver a la lista de juegos
  const volverAListaJuegos = () => {
    setJuegoActivo(null);
  };

  return (
    <div className="casino-page">
      {!juegoActivo ? (
        // Vista de lista de juegos
        <>
          <Hero 
            title="Descubre nuestros Juegos de Casino"
            subtitle="Explora la mejor selección de juegos tradicionales y modernos en Fortuna Royale Casino."
            background="primary"
          />
          
          <div className="container">
            <div className="categoria-filtros">
              <button 
                className={`filtro-btn ${categoriaActiva === 'todos' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('todos')}
              >
                Todos los Juegos
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'mesa' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('mesa')}
              >
                Juegos de Mesa
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'slots' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('slots')}
              >
                Tragamonedas
              </button>
              <button 
                className={`filtro-btn ${categoriaActiva === 'poker' ? 'activo' : ''}`}
                onClick={() => setCategoriaActiva('poker')}
              >
                Poker
              </button>
            </div>
            
            <section className="section fade-in">
              <SectionHeading
                title={`Juegos de Casino ${categoriaActiva !== 'todos' ? `- ${categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)}` : ''}`}
                subtitle="Disfruta de la experiencia de un casino real desde la comodidad de tu hogar"
              />
              
              {juegosFiltrados.length === 0 ? (
                <div className="no-juegos">
                  <p>No se encontraron juegos en esta categoría.</p>
                </div>
              ) : (
                <div className="cards-grid">
                  {juegosFiltrados.map(juego => (
                    <GameCard
                      key={juego.id}
                      title={juego.nombre}
                      description={juego.descripcion}
                      themeColor="primary"
                      buttonText="Jugar Ahora"
                      onButtonClick={() => handleJuegoClick(juego.id)}
                    />
                  ))}
                </div>
              )}
            </section>
            
            <section className="casino-promo fade-in">
              <div className="promo-card">
                <div className="promo-content">
                  <h3>¡Torneo semanal de Blackjack!</h3>
                  <p>Participa en nuestro torneo semanal de Blackjack y compite por un premio acumulado de $10,000</p>
                  <button className="btn-primary">Más Información</button>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        // Vista del juego seleccionado
        <div className="container">
          <div className="juego-activo-header">
            <button className="btn-back" onClick={volverAListaJuegos}>
              ← Volver a los juegos
            </button>
          </div>
          
          {juegoActivo === 'slot' && (
            <div className="juego-slot-container">
              <SlotMachine />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CasinoPage;