import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    external: [ 'vue' ],
    output: {
        name: 'StockPile',
        exports: 'named',
        globals: { 'vue': 'Vue' }
    },
    plugins: [
        commonjs(),
        buble(),
        terser()
    ],
};
