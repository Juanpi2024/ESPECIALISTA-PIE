import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

export default function BrainDump({ onTaskSubmit }) {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsProcessing(true);
    // Simular procesamiento de IA para fragmentar tareas
    setTimeout(() => {
      onTaskSubmit(input);
      setInput('');
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#2c7a7b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🧠 ¿Qué tienes en mente?
      </h2>
      <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
        Escribe todo lo que necesites hacer, sin importar el orden o el tamaño. Yo me encargo de organizarlo.
      </p>
      
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ej: Tengo que renovar el pasaporte la próxima semana pero me da mucha pereza buscar los requisitos..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '1rem',
            paddingRight: '4rem',
            borderRadius: '12px',
            border: '2px solid rgba(79, 209, 197, 0.3)',
            background: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem',
            resize: 'vertical',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#4fd1c5'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(79, 209, 197, 0.3)'}
          disabled={isProcessing}
        />
        
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#a0aec0',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            title="Dictado por voz (Próximamente)"
          >
            <Mic size={24} />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            style={{
              background: input.trim() && !isProcessing ? '#4fd1c5' : '#cbd5e0',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !isProcessing ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {isProcessing && (
        <div style={{ marginTop: '1rem', color: '#2c7a7b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="spinner">↻</span> Organizando tus tareas...
        </div>
      )}
    </div>
  );
}
