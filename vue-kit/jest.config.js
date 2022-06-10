module.exports = {
  preset    : '@vue/cli-plugin-unit-jest',
  transform : {
    '^.+\\.vue$' : 'vue-jest'
  },
  collectCoverage            : true,
  collectCoverageFrom        : ['src/**/*.{vue, js}', '!**/__DEMO/**', '!**/vendor/**'],
  coverageDirectory          : '<rootDir>/coverage',
  coveragePathIgnorePatterns : ['/node_modules/', '/src/main.m?js', '/src/index.m?js', '/src/lang', '/src/locale', '/__DEMO/', '/src/catalog/', '/src/demoapp/', '/src/storybook/'],
  coverageReporters          : ['json-summary', 'text', 'lcov'],
  coverageThreshold          : {
    global : {
      branches   : 90,
      functions  : 90,
      lines      : 90,
      statements : -20
    }
  }

};
