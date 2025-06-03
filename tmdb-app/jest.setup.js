// Import Jest DOM testing library that extends Jest with DOM testing utilities
require('@testing-library/jest-dom');

// If you need to add global mocks for your tests, you can add them here
// For example, if you need to mock window.matchMedia for responsive components:
/*
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
*/

// You can also set up global test data or utilities here
// global.testData = { ... };

// If you use fetch in your components, you might want to mock it:
/*
global.fetch = jest.fn();
*/

// Add any other global setup you might need for your tests
