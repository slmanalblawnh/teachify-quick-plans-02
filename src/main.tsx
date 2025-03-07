
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App.tsx'
import './index.css'
import { Capacitor } from '@capacitor/core';

// Initialize PWA elements for native-like features
defineCustomElements(window);

// Initialize the app
const initApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
};

// Wait for the device to be ready when running as a native app
if (Capacitor.isNativePlatform()) {
  document.addEventListener('deviceready', initApp, false);
} else {
  // Web environment - initialize immediately
  initApp();
}
