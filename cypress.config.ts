import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4000/',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
    }
  }
});