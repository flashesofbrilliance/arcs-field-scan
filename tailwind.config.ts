export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        panel: '#111111',
        signal: '#00F0FF',
        amber: '#FFD700',
        vermillion: '#FF4500',
        gold: '#C9A84C',
        thread: '#FF0055',
        dim: '#888888',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,240,255,0.3), 0 0 24px rgba(0,240,255,0.12)',
      },
    },
  },
  plugins: [],
};
