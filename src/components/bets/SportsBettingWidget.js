import React, { useState, useEffect } from 'react';
import './SportsBettingWidget.css';

const SportsBettingWidget = () => {
  // Datos de ejemplo para los partidos
  const initialMatches = [
    {
      id: 1,
      league: 'Champions League',
      homeTeam: 'Real Madrid',
      awayTeam: 'Bayern Munich',
      date: '12 Abr 2025',
      time: '20:45',
      odds: {
        home: 2.10,
        draw: 3.40,
        away: 3.20
      },
      score: null,
      status: 'upcoming' // upcoming, live, finished
    },
    {
      id: 2,
      league: 'Premier League',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      date: '11 Abr 2025',
      time: '16:00',
      odds: {
        home: 1.90,
        draw: 3.50,
        away: 3.80
      },
      score: {
        home: 2,
        away: 1
      },
      status: 'live',
      minute: 67
    },
    {
      id: 3,
      league: 'La Liga',
      homeTeam: 'Barcelona',
      awayTeam: 'Sevilla',
      date: '10 Abr 2025',
      time: '19:00',
      odds: {
        home: 1.70,
        draw: 3.80,
        away: 4.50
      },
      score: {
        home: 3,
        away: 1
      },
      status: 'finished'
    }
  ];

  // Estados
  const [matches, setMatches] = useState(initialMatches);
  const [selectedBets, setSelectedBets] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [totalOdds, setTotalOdds] = useState(0);
  const [potentialWin, setPotentialWin] = useState(0);
  const [balance, setBalance] = useState(200);
  const [betPlaced, setBetPlaced] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, live, upcoming
  
  // Filtrar partidos según la pestaña activa
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'live') return match.status === 'live';
    if (activeTab === 'upcoming') return match.status === 'upcoming';
    return true;
  });

  // Calcular cuota total y ganancia potencial cuando cambian las apuestas seleccionadas
  useEffect(() => {
    if (selectedBets.length === 0) {
      setTotalOdds(0);
      setPotentialWin(0);
      return;
    }
    
    // Multiplicar todas las cuotas seleccionadas
    const odds = selectedBets.reduce((acc, bet) => acc * bet.odd, 1);
    setTotalOdds(Number(odds.toFixed(2)));
    
    // Calcular ganancia potencial
    const win = Number((betAmount * odds).toFixed(2));
    setPotentialWin(win);
  }, [selectedBets, betAmount]);

  // Simular cambios en los partidos en vivo
  useEffect(() => {
    if (!matches.some(match => match.status === 'live')) return;
    
    const interval = setInterval(() => {
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.status !== 'live') return match;
          
          // Incrementar minuto
          const newMinute = (match.minute || 0) + 1;
          
          // Posibilidad de cambio de marcador (10% de probabilidad)
          const scoreChange = Math.random() < 0.1;
          let newScore = match.score || { home: 0, away: 0 };
          
          if (scoreChange) {
            // Determinar qué equipo marca (60% local, 40% visitante en este ejemplo)
            const homeScores = Math.random() < 0.6;
            
            if (homeScores) {
              newScore = { ...newScore, home: newScore.home + 1 };
            } else {
              newScore = { ...newScore, away: newScore.away + 1 };
            }
            
            // Actualizar cuotas después de un gol
            const newOdds = { ...match.odds };
            if (homeScores) {
              newOdds.home = Number((newOdds.home * 0.8).toFixed(2));
              newOdds.away = Number((newOdds.away * 1.2).toFixed(2));
            } else {
              newOdds.away = Number((newOdds.away * 0.8).toFixed(2));
              newOdds.home = Number((newOdds.home * 1.2).toFixed(2));
            }
            
            return {
              ...match,
              minute: newMinute,
              score: newScore,
              odds: newOdds
            };
          }
          
          // Fin del partido
          if (newMinute >= 90) {
            return {
              ...match,
              status: 'finished'
            };
          }
          
          return {
            ...match,
            minute: newMinute
          };
        });
      });
    }, 5000); // Actualizar cada 5 segundos
    
    return () => clearInterval(interval);
  }, [matches]);

  // Añadir o quitar una apuesta del boleto
  const toggleBet = (matchId, type, odd) => {
    // Verificar si ya existe esta apuesta
    const existingBetIndex = selectedBets.findIndex(
      bet => bet.matchId === matchId
    );
    
    if (existingBetIndex !== -1) {
      // Si existe y es del mismo tipo, eliminarla
      if (selectedBets[existingBetIndex].type === type) {
        setSelectedBets(selectedBets.filter((_, index) => index !== existingBetIndex));
        return;
      }
      
      // Si existe pero es de otro tipo, actualizar el tipo y cuota
      const updatedBets = [...selectedBets];
      updatedBets[existingBetIndex] = { matchId, type, odd };
      setSelectedBets(updatedBets);
      return;
    }
    
    // Si no existe, añadir la nueva apuesta
    setSelectedBets([...selectedBets, { matchId, type, odd }]);
  };

  // Comprobar si una apuesta está seleccionada
  const isBetSelected = (matchId, type) => {
    return selectedBets.some(
      bet => bet.matchId === matchId && bet.type === type
    );
  };

  // Cambiar la cantidad de la apuesta
  const handleBetAmountChange = (e) => {
    const amount = Number(e.target.value);
    if (amount < 1) return;
    setBetAmount(amount);
  };

  // Colocar la apuesta
  const placeBet = () => {
    if (selectedBets.length === 0) return;
    if (balance < betAmount) return;
    
    // Restar la cantidad apostada del saldo
    setBalance(prevBalance => prevBalance - betAmount);
    
    // Mostrar mensaje de confirmación
    setBetPlaced(true);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setBetPlaced(false);
      setSelectedBets([]);
      setShowTicket(false);
    }, 3000);
  };

  // Obtener el match completo a partir de un ID
  const getMatchById = (matchId) => {
    return matches.find(match => match.id === matchId);
  };

  // Función para mostrar la cuota con color según su cambio
  const renderOddsWithTrend = (currentOdd, initialOdd = currentOdd) => {
    let trend = '';
    if (currentOdd < initialOdd) trend = 'down';
    if (currentOdd > initialOdd) trend = 'up';
    
    return (
      <span className={`odd-value ${trend}`}>
        {trend === 'down' && '↓'}
        {trend === 'up' && '↑'}
        {currentOdd.toFixed(2)}
      </span>
    );
  };

  return (
    <div className="sports-betting-widget">
      <div className="betting-header">
        <h2>Apuestas Deportivas</h2>
        <div className="betting-tabs">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Todos
          </button>
          <button 
            className={`tab-button ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            En Vivo
          </button>
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Próximos
          </button>
        </div>
      </div>
      
      <div className="matches-container">
        {filteredMatches.length === 0 ? (
          <div className="no-matches">
            No hay partidos disponibles en esta categoría.
          </div>
        ) : (
          filteredMatches.map(match => (
            <div key={match.id} className={`match-card ${match.status}`}>
              <div className="match-header">
                <span className="league-name">{match.league}</span>
                {match.status === 'live' && (
                  <div className="live-indicator">
                    <span className="live-dot"></span>
                    <span className="live-minute">{match.minute}'</span>
                  </div>
                )}
              </div>
              
              <div className="match-teams">
                <div className="team home-team">
                  <span className="team-name">{match.homeTeam}</span>
                  {match.score && <span className="team-score">{match.score.home}</span>}
                </div>
                
                <div className="match-info">
                  {match.status === 'upcoming' ? (
                    <div className="match-datetime">
                      <div className="match-date">{match.date}</div>
                      <div className="match-time">{match.time}</div>
                    </div>
                  ) : match.status === 'live' ? (
                    <div className="vs-text">VS</div>
                  ) : (
                    <div className="match-result">Final</div>
                  )}
                </div>
                
                <div className="team away-team">
                  {match.score && <span className="team-score">{match.score.away}</span>}
                  <span className="team-name">{match.awayTeam}</span>
                </div>
              </div>
              
              {match.status !== 'finished' && (
                <div className="match-odds">
                  <button 
                    className={`odd-button ${isBetSelected(match.id, 'home') ? 'selected' : ''}`}
                    onClick={() => toggleBet(match.id, 'home', match.odds.home)}
                  >
                    1 <span className="odd-value">{match.odds.home.toFixed(2)}</span>
                  </button>
                  
                  <button 
                    className={`odd-button ${isBetSelected(match.id, 'draw') ? 'selected' : ''}`}
                    onClick={() => toggleBet(match.id, 'draw', match.odds.draw)}
                  >
                    X <span className="odd-value">{match.odds.draw.toFixed(2)}</span>
                  </button>
                  
                  <button 
                    className={`odd-button ${isBetSelected(match.id, 'away') ? 'selected' : ''}`}
                    onClick={() => toggleBet(match.id, 'away', match.odds.away)}
                  >
                    2 <span className="odd-value">{match.odds.away.toFixed(2)}</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="betting-ticket">
        <div className="ticket-header" onClick={() => setShowTicket(!showTicket)}>
          <h3>Mi Boleto ({selectedBets.length})</h3>
          <span className={`toggle-icon ${showTicket ? 'open' : ''}`}>
            {showTicket ? '▼' : '▲'}
          </span>
        </div>
        
        {showTicket && (
          <div className="ticket-body">
            {selectedBets.length === 0 ? (
              <div className="empty-ticket">
                No hay apuestas seleccionadas. Haz click en una cuota para añadirla a tu boleto.
              </div>
            ) : (
              <>
                <div className="selected-bets">
                  {selectedBets.map((bet, index) => {
                    const match = getMatchById(bet.matchId);
                    const betTypeMap = {
                      home: `1 (${match.homeTeam})`,
                      draw: 'X (Empate)',
                      away: `2 (${match.awayTeam})`
                    };
                    
                    return (
                      <div key={index} className="selected-bet">
                        <div className="bet-info">
                          <div className="bet-match">
                            {match.homeTeam} vs {match.awayTeam}
                          </div>
                          <div className="bet-type">
                            {betTypeMap[bet.type]}
                          </div>
                        </div>
                        <div className="bet-odd">{bet.odd.toFixed(2)}</div>
                        <button
                          className="remove-bet"
                          onClick={() => toggleBet(bet.matchId, bet.type, bet.odd)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="ticket-details">
                  <div className="bet-amount-control">
                    <label htmlFor="betAmount">Cantidad apostada ($):</label>
                    <input
                      id="betAmount"
                      type="number"
                      min="1"
                      value={betAmount}
                      onChange={handleBetAmountChange}
                    />
                  </div>
                  
                  <div className="ticket-summary">
                    <div className="summary-row">
                      <span>Apuestas</span>
                      <span>{selectedBets.length}</span>
                    </div>
                    <div className="summary-row">
                      <span>Cuota total</span>
                      <span>{totalOdds.toFixed(2)}</span>
                    </div>
                    <div className="summary-row potential-win">
                      <span>Ganancia potencial</span>
                      <span>${potentialWin.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    className="place-bet-button"
                    onClick={placeBet}
                    disabled={selectedBets.length === 0 || balance < betAmount}
                  >
                    Realizar Apuesta
                  </button>
                  
                  <div className="balance-info">
                    <span>Tu saldo</span>
                    <span>${balance.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {betPlaced && (
          <div className="bet-confirmation">
            ¡Apuesta realizada con éxito!
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsBettingWidget;