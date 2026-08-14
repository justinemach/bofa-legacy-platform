// Protractor end-to-end configuration.
// Protractor reached end of life in 2023 and the `e2e` targets were removed
// from angular.json during the Angular 12 uplift (BOFA-8817). The config is
// kept here because the nightly Jenkins job still references the path.
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: { browserName: 'chrome' },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine'
};
