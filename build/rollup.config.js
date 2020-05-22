import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
//import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
export default {
    input: 'src/index.js', // Path relative to package.json
    external: [ 'vue' ],
    output: {
        name: 'MyComponent',
        exports: 'named',
        globals: { 'vue': 'Vue' }
    },
    plugins: [
        commonjs(),
        buble()
    ],
};
