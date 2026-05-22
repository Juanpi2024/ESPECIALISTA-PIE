import { useState } from 'react';
import { Brain, Star } from 'lucide-react';
import BrainDump from './components/BrainDump';
import VisualTimer from './components/VisualTimer';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [tokens, setTokens] = useState(0);

  const handleNewTask = (rawText) => {
    // Aquí iría la integración real con IA. 
    // Por ahora simulamos la fragmentación de la tarea ingresada.
    const newTask = {
      id: Date.now(),
      original: rawText,
      chunks: [
        { id: `${Date.now()}-1`, text: `Paso 1 para: ${rawText.substring(0, 20)}...`, done: false },
        { id: `${Date.now()}-2`, text: 'Siguiente acción requerida', done: false }
      ]
    };
    setTasks([newTask, ...tasks]);
  };

  const handleChunkComplete = (taskId, chunkId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          chunks: t.chunks.map(c => c.id === chunkId ? { ...c, done: !c.done } : c)
        };
      }
      return t;
    }));
    // Gamificación: Economía de fichas
    setTokens(tokens + 10);
  };

  return (
    <div className="app-container">
      <header className="main-header glass-panel">
        <h1>
          <Brain className="text-teal-600" />
          Foco TDAH
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e6fffa', padding: '0.5rem 1rem', borderRadius: '20px', color: '#285e61', fontWeight: 'bold' }}>
          <Star size={18} color="#ecc94b" fill="#ecc94b" />
          {tokens} Fichas
        </div>
      </header>

      <main className="main-content" style={{ maxWidth: '800px' }}>
        
        <VisualTimer durationMinutes={25} />
        
        <BrainDump onTaskSubmit={handleNewTask} />

        <div className="tasks-container">
          <h3 style={{ color: '#2c7a7b', marginBottom: '1rem' }}>Tus Focos Actuales</h3>
          {tasks.length === 0 ? (
            <p style={{ color: '#a0aec0', textAlign: 'center', padding: '2rem' }}>
              No hay tareas activas. Usa la bandeja de arriba para vaciar tu mente.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {tasks.map(task => (
                <div key={task.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                    "{task.original}"
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {task.chunks.map((chunk, index) => (
                      <label 
                        key={chunk.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          background: chunk.done ? 'rgba(79, 209, 197, 0.1)' : 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          opacity: index > 0 && !task.chunks[index-1].done ? 0.5 : 1,
                          pointerEvents: index > 0 && !task.chunks[index-1].done ? 'none' : 'auto'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={chunk.done}
                          onChange={() => handleChunkComplete(task.id, chunk.id)}
                          style={{ width: '20px', height: '20px', accentColor: '#4fd1c5' }}
                        />
                        <span style={{ 
                          textDecoration: chunk.done ? 'line-through' : 'none',
                          color: chunk.done ? '#a0aec0' : '#2d3748',
                          fontSize: '1.1rem'
                        }}>
                          {chunk.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
