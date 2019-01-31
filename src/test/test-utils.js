export const resolvePromises = () => new Promise(resolve => setImmediate(resolve))

export const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export const silenceConsoleError = () => global.console = { error: jest.fn() }
