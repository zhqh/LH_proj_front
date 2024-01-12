import { createVitePlugins } from './build/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/utils';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
  const isProduction = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          // target: 'http://8.218.142.250:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/str': {
          target: 'http://localhost:8080',
          // target: 'http://8.218.142.250',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/str/, ''),
        },
      },
      host: true,
      hmr: true,
    },
    base: './',
    plugins: createVitePlugins(viteEnv, isProduction),
    build: {
      minify: 'terser',
      // minify: false,
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";@import '/@/styles/mixin.scss';`,
        },
      },
    },
  };
}
