import '@testing-library/jest-dom'

// Add custom matchers
expect.extend({
  toHaveClass(received, className) {
    const pass = received.classList.contains(className)
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to have class "${className}"`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to have class "${className}"`,
        pass: false,
      }
    }
  },
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver 