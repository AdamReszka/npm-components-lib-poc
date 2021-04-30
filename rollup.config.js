import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';


export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            external(),
            resolve(),
            terser(),
            commonjs({
                namedExports: {
                    'node_modules/react-js/index.js': ['isValidElementType'],
                },
                include: [
                    /node_modules\/prop-types/,
                    /node_modules\/hoist-non-react-statics/,
                    /node_modules\/invariant/,
                    /node_modules\/react-is/,
                    /node_modules\/warning/,
                ],
            })
        ]
    }
];
