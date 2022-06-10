module.exports = {
  preset                     : '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns    : ['node_modules/(?!(?:@babel|place|folders|here))'],
  setupFilesAfterEnv         : ['./tests/unit/jest.setup.js'],
  collectCoverage            : true,
  collectCoverageFrom        : ['src/**/*.{mjs,js,vue}', '!**/node_modules/**', '!**/demo/**', '!**/mock.{mjs,js}', '!**/vendor/**'],
  coverageDirectory          : '<rootDir>/coverage',
  coveragePathIgnorePatterns : ['/node_modules/', '/src/main.m?js', '/src/index.m?js', '/src/lang', '/src/locale'],
  coverageThreshold          : {
    global : {
      branches   : 90,
      functions  : 90,
      lines      : 90,
      statements : -10
    }
  }
};
