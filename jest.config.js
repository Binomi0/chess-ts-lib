/** @type {import("jest").Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  // transform: {
  //   '^.+\\.(t|j)s$': 'ts-jest',
  // },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // automock: true,
  verbose: true,
  // transform: {
  //   '^.+\\.test.ts$': 'ts-jest',
  // },
  modulePathIgnorePatterns: ["^.+\\.d.ts$", "dist"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["./jest.setup.ts"], // Cambiado a .ts
};
