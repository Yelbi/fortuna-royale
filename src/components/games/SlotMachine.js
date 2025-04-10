import React, { useState, useEffect } from 'react';
import './SlotMachine.css';

const SlotMachine = () => {
  // Símbolos disponibles para la tragamonedas
  const symbols = ['🍒', '🍋', '🍇', '🍉', '💎', '7️⃣', '🎰'];
  
  // Estado para los rodillos, apuesta y saldo
  const [reels, setReels] = useState([
    { symbol: symbols[0], spinning: false },
    { symbol: symbols[0], spinning: false },
    { symbol: symbols[0], spinning: false }
  ]);
  const [bet, setBet] = useState(5);
  const [balance, setBalance] = useState(100);
  const [lastWin, setLastWin] = useState(0);
  const [message, setMessage] = useState('¡Buena Suerte!');
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  
  // Función para girar los rodillos
  const spin = () => {
    // Verificar si hay suficiente saldo
    if (balance < bet) {
      setMessage('¡Saldo insuficiente!');
      return;
    }
    
    // Restar la apuesta del saldo
    setBalance(prevBalance => prevBalance - bet);
    setLastWin(0);
    setMessage('¡Girando!');
    setIsSpinning(true);
    
    // Marcar todos los rodillos como girando
    setReels(prevReels => 
      prevReels.map(reel => ({ ...reel, spinning: true }))
    );
    
    // Función para detener un rodillo
    const stopReel = (index, delay) => {
      setTimeout(() => {
        setReels(prevReels => {
          const newReels = [...prevReels];
          // Seleccionar un símbolo aleatorio
          const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
          newReels[index] = { symbol: randomSymbol, spinning: false };
          return newReels;
        });
        
        // Si es el último rodillo, verificar resultado
        if (index === reels.length - 1) {
          setTimeout(checkWin, 500);
        }
      }, delay);
    };
    
    // Detener cada rodillo con un retraso creciente
    reels.forEach((_, index) => {
      stopReel(index, 1000 + index * 500);
    });
  };
  
  // Verificar si hay combinaciones ganadoras
  const checkWin = () => {
    setIsSpinning(false);
    
    // Obtener los símbolos actuales
    const currentSymbols = reels.map(reel => reel.symbol);
    
    // Calcular la ganancia
    let winAmount = 0;
    
    // Tres símbolos iguales (mayor premio)
    if (currentSymbols[0] === currentSymbols[1] && currentSymbols[1] === currentSymbols[2]) {
      // Diferentes multiplicadores según el símbolo
      const multiplier = 
        currentSymbols[0] === '7️⃣' ? 50 :
        currentSymbols[0] === '💎' ? 25 :
        currentSymbols[0] === '🎰' ? 15 : 10;
      
      winAmount = bet * multiplier;
      setMessage(`¡JACKPOT! Ganaste ${winAmount} monedas`);
    }
    // Dos símbolos iguales
    else if (
      currentSymbols[0] === currentSymbols[1] || 
      currentSymbols[1] === currentSymbols[2] || 
      currentSymbols[0] === currentSymbols[2]
    ) {
      winAmount = bet * 2;
      setMessage(`¡Buen intento! Ganaste ${winAmount} monedas`);
    }
    // Sin combinación ganadora
    else {
      setMessage('¡Inténtalo de nuevo!');
    }
    
    // Actualizar el saldo y la última ganancia
    if (winAmount > 0) {
      setBalance(prevBalance => prevBalance + winAmount);
      setLastWin(winAmount);
    }
    
    // Si el autoplay está activado, girar de nuevo
    if (autoPlay && balance >= bet) {
      setTimeout(spin, 1500);
    }
  };
  
  // Cambiar la apuesta
  const changeBet = (amount) => {
    const newBet = Math.max(1, Math.min(20, bet + amount));
    setBet(newBet);
  };
  
  // Toggle autoplay
  const toggleAutoPlay = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    
    // Si se activa el autoplay y no se está girando, iniciar
    if (newAutoPlay && !isSpinning && balance >= bet) {
      setTimeout(spin, 500);
    }
  };
  
  // Añadir más créditos (solo para demostración)
  const addCredits = () => {
    setBalance(prevBalance => prevBalance + 100);
    setMessage('¡Se añadieron 100 monedas a tu saldo!');
  };
  
  return (
    <div className="slot-machine">
      <h2>Slot Fortune</h2>
      
      <div className="slot-display">
        <div className="message-display">{message}</div>
        <div className="win-display">
          {lastWin > 0 && <div className="win-amount">+{lastWin}</div>}
        </div>
      </div>
      
      <div className="slot-reels">
        {reels.map((reel, index) => (
          <div 
            key={index} 
            className={`reel ${reel.spinning ? 'spinning' : ''}`}
          >
            <div className="symbol">{reel.symbol}</div>
          </div>
        ))}
      </div>
      
      <div className="slot-controls">
        <div className="balance-display">
          <span>Saldo:</span>
          <span className="balance-amount">{balance}</span>
        </div>
        
        <div className="bet-controls">
          <button 
            className="bet-button" 
            onClick={() => changeBet(-1)}
            disabled={isSpinning || bet <= 1}
          >
            -
          </button>
          <div className="bet-display">
            <span>Apuesta:</span>
            <span className="bet-amount">{bet}</span>
          </div>
          <button 
            className="bet-button" 
            onClick={() => changeBet(1)}
            disabled={isSpinning || bet >= 20}
          >
            +
          </button>
        </div>
        
        <div className="action-buttons">
          <button 
            className="spin-button" 
            onClick={spin}
            disabled={isSpinning || balance < bet}
          >
            {isSpinning ? 'Girando...' : 'Girar'}
          </button>
          
          <button 
            className={`autoplay-button ${autoPlay ? 'active' : ''}`} 
            onClick={toggleAutoPlay}
            disabled={balance < bet}
          >
            {autoPlay ? 'Detener Auto' : 'Auto Juego'}
          </button>
        </div>
        
        <button className="add-credits" onClick={addCredits}>
          Añadir Créditos
        </button>
      </div>
      
      <div className="slot-info">
        <h3>Pagos</h3>
        <div className="paytable">
          <div className="paytable-row">
            <div className="paytable-symbols">7️⃣ 7️⃣ 7️⃣</div>
            <div className="paytable-value">x50</div>
          </div>
          <div className="paytable-row">
            <div className="paytable-symbols">💎 💎 💎</div>
            <div className="paytable-value">x25</div>
          </div>
          <div className="paytable-row">
            <div className="paytable-symbols">🎰 🎰 🎰</div>
            <div className="paytable-value">x15</div>
          </div>
          <div className="paytable-row">
            <div className="paytable-symbols">Cualquier 3 iguales</div>
            <div className="paytable-value">x10</div>
          </div>
          <div className="paytable-row">
            <div className="paytable-symbols">Cualquier 2 iguales</div>
            <div className="paytable-value">x2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;