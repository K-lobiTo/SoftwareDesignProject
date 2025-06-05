module.exports = {
    testEnvironment: "jsdom",

    moduleFileExtensions: ["js", "jsx"],

    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },

    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx}",
    ],

    collectCoverage: true,
    collectCoverageFrom: [
        "src/firebase/**/*.{js,jsx}",
        "src/tmdb/**/*.{js,jsx}",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "clover"],
    coverageThreshold: {
        global: {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0,
        },
    },
};
