/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: ["**/*.d.ts"],
  mount: {
    /* ... */
  },
  plugins: ["@snowpack/plugin-babel", "./CssAsTextLoader.js"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {},
  packageOptions: {
    knownEntrypoints: ["solid-js/web"],
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
