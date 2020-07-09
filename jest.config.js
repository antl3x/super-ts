module.exports = {
  moduleDirectories: ['<rootDir>', 'node_modules'],
  moduleNameMapper: {
    '^@runtime/(.*)$': 'src/runtime/$1',
    '^@algebraic/(.*)$': 'src/algebraic/$1',
    '^@common/(.*)$': 'src/common/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      packageJson: 'package.json',
    },
  },
};
