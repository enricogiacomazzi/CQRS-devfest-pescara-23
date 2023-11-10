import {init} from './api.ts';
import {Page} from './components/Page.tsx';
import {useEffect, useState} from 'react';

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        init().then(() => setLoaded(true));
    }, []);

  return (
      <div className="container">
          <h1>Harry's todo list</h1>
          {loaded && <Page/>}
      </div>
  );
}

export default App
