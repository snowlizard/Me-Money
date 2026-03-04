import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

createRoot(document.getElementById('root')!).render(
  <Home />
)
