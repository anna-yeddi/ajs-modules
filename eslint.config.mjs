import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import stylisticJs from '@stylistic/eslint-plugin-js';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended,
});
export default [
    {
        ignores: [ 'dist/', '*.json' ], // exclude directories
    },
    {
        // setting a standard and parsing
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: [ '@babel/preset-env' ],
                },
            },
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: globals.browser,
        },
    },
    ...compat.extends('eslint-config-airbnb-base'),
    {
    // files: ['src/**/*.js'],
        rules: {
            indent: [ 'error', 4 ], // auto
            semi: [ 'error', 'always' ], // semicolon, auto
            'no-unused-vars': 'off', // unused variables
            'no-console': 'off', // console.log
        },
    },
    {
        files: [ '*.config.*' ], // config rules
        rules: {
            'no-underscore-dangle': [ 'off' ], // dual underscore before/after variables
            'import/no-extraneous-dependencies': 'off', // import from dev-dependencies
        },
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            'max-len': [ 'error', { code: 120 } ], // length of a line, no auto
            quotes: [ 'error', 'single' ], // single quotes, auto
            'object-property-newline': [ 'error' ], // split an object per line, auto
            'array-bracket-spacing': [ 'error', 'always' ],
            'no-multiple-empty-lines': [ 'error', {
                max: 1, // one inner
                maxBOF: 1, // one above in imports
            } ], // empty lines, auto
        },
    },
    pluginJs.configs.recommended,
];
