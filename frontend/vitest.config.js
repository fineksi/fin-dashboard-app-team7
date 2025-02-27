import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'text'],
      reportsDirectory: './coverage'
    },
    coverage: {
      include: ['src/**/*.jsx', 'src/*.js'],
      exclude: ['src/main.jsx']
    }
  }
});