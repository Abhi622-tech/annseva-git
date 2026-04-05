import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.annseva.app',
  appName: 'AnnSeva',
  webDir: 'build',
  android: {
    allowMixedContent: true
  }
};

export default config;
