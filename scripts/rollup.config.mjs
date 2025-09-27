import path from 'path';
import fs from 'fs-extra';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodePolifills from 'rollup-plugin-polyfill-node';
import importImage from '@rollup/plugin-image';
import multi from '@rollup/plugin-multi-entry';
import json from '@rollup/plugin-json';

// path for block
const blockSrcDir = path.resolve(process.cwd(), './src/vm/extensions/block');
const blockFile = path.resolve(blockSrcDir, 'index.js');
// path for entry
const entrySrcDir = path.resolve(process.cwd(), './src/gui/lib/libraries/extensions/entry');
const entryFile = path.resolve(entrySrcDir, 'index.jsx');
// path for output
const moduleName = 'costumex';
const outputDir = path.resolve(process.cwd(), './dist');
fs.emptyDirSync(outputDir);
const moduleFile = path.resolve(outputDir, `${moduleName}.mjs`);

const rollupOptions = {
    input: [entryFile, blockFile],
    context: 'window',
    plugins: [
        multi(),
        importImage(),
        json(),
        nodeResolve({
            browser: true, 
            preferBuiltins: false, // Changed to false for browser environment
            modulePaths: [
                path.resolve(process.cwd(), './node_modules'),
            ],
            // Add these options to better resolve @babel/runtime
            include: ['**'],
            skip: [],
        }),
        commonjs(),
        nodePolifills(),
        babel({
            babelrc: false,
            // Exclude node_modules from babel transformation except for specific packages
            exclude: ['node_modules/**'],
            presets: [
                ['@babel/preset-env',
                    {
                        "modules": false,
                        targets: {
                            browsers: [
                                'last 3 versions',
                                'Safari >= 8',
                                'iOS >= 8']
                        }
                    }
                ],
                '@babel/preset-react'
            ],
            babelHelpers: 'runtime',
            plugins: [
                '@babel/plugin-transform-react-jsx',
                [
                    "@babel/plugin-transform-runtime",
                    { 
                        "regenerator": true,
                        "useESModules": true // This helps with ES module compatibility
                    }
                ]
            ],
        }),
    ],
    output: {
        file: moduleFile,
        format: 'es',
        sourcemap: true,
    },
    external: [], // Keep this empty to bundle everything
    watch: {
        clearScreen: false,
        chokidar: {
            usePolling: true,
        },
        buildDelay: 500,
    },
}

export default rollupOptions;
