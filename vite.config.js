import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 可选：配置路径别名，方便引用
    },
  },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'], // 明确包含的图片格式
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // 自定义输出文件名（带哈希）
      },
    },
  },
});