import React, { useRef, useEffect } from 'react';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.electron.send('start-video');

    window.electron.receive('video-frame', (frameBase64) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = `data:image/jpeg;base64,${frameBase64}`;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    });

    window.electron.receive('video-error', (error) => {
      console.error('Erreur vidéo:', error);
    });
  }, []);

  return (
    <div>
      <h1>Flux vidéo</h1>
      <canvas ref={canvasRef} width="640" height="360"></canvas>
    </div>
  );
}

export default App;
