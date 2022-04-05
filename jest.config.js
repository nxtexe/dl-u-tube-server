const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths), // to register module aliases
  moduleDirectories: [ // to allow aliases to work
    ".",
    "src",
    "src/common/AppServer",
    "node_modules"
  ]
};