module.exports = {
  collectCoverageFrom: ["**/src/**/*.js"],
  coverageThreshold: {
    global: {
      statments: 18,
      branches: 13,
      functions: 10,
      lines: 18,
    },
  },
};
