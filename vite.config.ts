import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.SAMBANOVA_API_KEY': JSON.stringify(env.SAMBANOVA_API_KEY || 'fc3cafff-21b3-4ab8-a6b2-980be9e21639'),
        'process.env.RAZORPAY_KEY_ID': JSON.stringify(env.RAZORPAY_KEY_ID || ''),
        'process.env.RAZORPAY_BASIC_BUTTON_ID': JSON.stringify(env.RAZORPAY_BASIC_BUTTON_ID || ''),
        'process.env.RAZORPAY_PREMIUM_BUTTON_ID': JSON.stringify(env.RAZORPAY_PREMIUM_BUTTON_ID || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
