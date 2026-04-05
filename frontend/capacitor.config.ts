import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.annseva.app',
  appName: 'AnnSeva',
  webDir: 'build',
  // Remove the 'server' block below for production APK builds.
  // It is only needed for live-reload during development.
  server: {
    // Use your computer's LAN IP so the phone can reach the dev server.
    // Find it with: ipconfig  (look for "IPv4 Address" on your Wi-Fi adapter)
    url: 'http://192.168.1.12:3000',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
