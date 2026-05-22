import React, { useState, useEffect } from 'react';
import { Play, Square, Coffee } from 'lucide-react';

export default function VisualTimer({ durationMinutes = 20, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const totalTime = durationMinutes * 60;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durationMinutes * 60);
  };

  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  
  // Color calculation for visual stress reduction
  // Starts teal, slowly shifts to soft orange near the end
  const getGradientColor = () => {
    if (progressPercentage < 50) return '#4fd1c5'; // Teal
    if (progressPercentage < 80) return '#f6ad55'; // Orange
    return '#fc8181'; // Soft Red
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
      <h3 style={{ color: '#2c7a7b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <Coffee size={20} /> Modo Foco
      </h3>
      
      <div style={{
        position: 'relative',
        width: '200px',
        height: '20px',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '10px',
        margin: '0 auto 2rem auto',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progressPercentage}%`,
          background: getGradientColor(),
          transition: 'width 1s linear, background 1s ease',
          borderRadius: '10px'
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={toggleTimer}
          style={{
            background: isActive ? '#f6ad55' : '#4fd1c5',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '24px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background 0.3s'
          }}
        >
          {isActive ? <><Square size={20} /> Pausar</> : <><Play size={20} /> Empezar ({durationMinutes}m)</>}
        </button>
        <button
          onClick={resetTimer}
          style={{
            background: 'transparent',
            color: '#a0aec0',
            border: '2px solid #e2e8f0',
            padding: '0.75rem 1.5rem',
            borderRadius: '24px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
