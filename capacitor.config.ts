
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.teachify.quickplans',
  appName: 'تطبيق إعداد خطط الدروس',
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
