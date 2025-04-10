import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del tema
export const ThemeContext = createContext();

// Definir el proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Estado para manejar el tema (dark/light)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Comprobar si hay una preferencia de tema guardada
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};