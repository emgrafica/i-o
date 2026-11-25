import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: string) => {
      return '';
    },
  }),
});

Object.defineProperty(window, 'scrollX', {
  value: 0,
});
Object.defineProperty(window, 'scrollY', {
  value: 0,
});
