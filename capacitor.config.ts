
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c5ac92da74ac4b95b0d913883dae5f68',
  appName: 'teachify-quick-plans-02',
  webDir: 'dist',
  server: {
    url: 'https://c5ac92da-74ac-4b95-b0d9-13883dae5f68.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
