global.console = {
    ...console,
    log: jest.fn(),
    info: jest.fn(),
    warn: console.warn,
    error: console.error
  };