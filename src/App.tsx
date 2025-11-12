import { PdfProvider } from './context/PdfContext';
import Home from './pages/Home';

function App() {
  return (
    <PdfProvider>
      <Home />
    </PdfProvider>
  );
}

export default App;
