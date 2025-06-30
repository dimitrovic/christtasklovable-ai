import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import './fix-white-edges.css'
import './fix-layout.css'

createRoot(document.getElementById("root")!).render(<App />);
