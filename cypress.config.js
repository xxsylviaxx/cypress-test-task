const cypress = require("cypress");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.nobl9.com/",
    specPattern: "cypress/e2e/*.cy.js",
    supportFile: "cypress/support/commands.js",
    fixturesFolder: "cypress/fixtures",
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1500,
    viewportHeight: 1000
  },
});
