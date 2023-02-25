import { useState } from 'react';
import QrCodeScanner from './components/QrCodeScanner';

function App() {
  const [link, setLink] = useState('');
  return (
    <div className="App">
      <QrCodeScanner
        onChange={(value) => {
          setLink(value);
        }}
      />
      <p>{link}</p>
    </div>
  );
}

export default App;
