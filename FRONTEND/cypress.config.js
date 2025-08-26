const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_BASE_URL,
    env: {
      apiUrl: process.env.REACT_APP_API_BASE_URL,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
