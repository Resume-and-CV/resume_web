module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    'node_modules/axios/index.js': 'commonjs',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
  setupFiles: ['<rootDir>/src/setupTests.js'],

  jest: {
    moduleNameMapper: {
      '^axios$': 'axios/dist/node/axios.cjs',
    },
  },
}
