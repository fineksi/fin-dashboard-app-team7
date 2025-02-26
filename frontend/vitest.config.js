import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'text'],  // Pastikan 'lcov' ada untuk SonarCloud
      reportsDirectory: './coverage',  // Pastikan laporan disimpan di folder 'coverage'
      include: ['src/**/*.{js,jsx,ts,tsx}'],  // Tentukan file yang akan dicakup
    }
  }
});
