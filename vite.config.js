import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 可选：配置路径别名，方便引用
    },
  },
  // 新增：开发服务器配置（仅开发环境生效）
  // server: {
  //   proxy: {
  //     // 匹配所有以/api开头的请求
  //     '^/(.*)': {
  //       target: 'http://localhost:8060', // 转发目标：网关地址（必须正确）
  //       changeOrigin: true, 
  //     },
  //   },
  // },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'], // 明确包含的图片格式
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // 自定义输出文件名（带哈希）
      },
    },
  },
});