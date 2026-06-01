const INDENT_SIZE = 4;
const VALID_NUMBER_OF_CALLBACKS = 2;

module.exports = {
    root: true,

    env: {
        es6: true,
        browser: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    globals: {
        process: true,
        module: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2019,
        ecmaFeatures: {
            impliedStrict: true,
        },
        requireConfigFile: false,
        sourceType: 'module',
        babelOptions: {
            presets: [ '@babel/preset-react' ],
        },
    },
    plugins: [
        'react-hooks',
    ],
    rules: {

        /**
         * @todo Consider adding more 'import/*' rules.
         */

        // 'import/namespace': [
        //     'error',
        //     {
        //         allowComputed: true,
        //     },
        // ],

        /**
         * Possible Errors.
         * https://eslint.org/docs/rules/#possible-errors
         */

        'no-console': 'off',

        /**
         * Best practices.
         * https://eslint.org/docs/rules/#best-practices
         */

        'curly': 'error',
        'dot-location': [
            'error',
            'property',
        ],
        'dot-notation': [
            'error',
            {
                // https://eslint.org/docs/rules/dot-notation#allowpattern
                allowPattern: '^[a-z]+(_[a-z]+)+$',
            },
        ],
        'eqeqeq': [
            'error',
            // Not 'smart' to avoid confusion because of inconsistency
            'always',
        ],
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': [
            'warn',
            {
                ignore: [
                    -1,
                    0,
                    1,
                    1000,
                ],
            },
        ],
        'no-multi-spaces': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-prototype-builtins': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': 'error',
        'no-with': 'error',
        'prefer-promise-reject-errors': [
            'error',
            {
                allowEmptyReject: true,
            },
        ],
        'require-await': 'error',
        'require-unicode-regexp': 'error',
        'wrap-iife': 'error',
        'yoda': 'error',

        /**
         * Variables.
         * https://eslint.org/docs/rules/#variables
         */

        'no-label-var': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-undef-init': 'error',
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
            },
        ],

        /**
         * Node.js and CommonJS.
         * https://eslint.org/docs/rules/#nodejs-and-commonjs
         */

        'callback-return': 'error',
        'global-require': 'error',
        'no-buffer-constructor': 'error',
        'no-new-require': 'error',
        'no-path-concat': 'error',
        'no-process-exit': 'error',
        'no-sync': 'error',

        /**
         * Stylistic Issues.
         * https://eslint.org/docs/rules/#stylistic-issues
         */

        'array-element-newline': [
            'error',
            {
                // Configuration for array expressions (if unspecified, this rule will not apply to array expressions). Requires consistent usage of linebreaks between array elements
                ArrayExpression: 'consistent',

                // Configuration for array patterns of destructuring assignments (if unspecified, this rule will not apply to array patterns). Requires line breaks if the number of elements is at least the given integer.
                ArrayPattern: {
                    minItems: 2,
                },
            },
        ],
        // IMPORTANT! "array-bracket-newline" have to be defined after "array-element-newline" for correct working of "multiline" value!
        'array-bracket-newline': [
            'error',
            {
                // Requires line breaks if there are line breaks inside elements or between elements. If this is false, this condition is disabled.
                multiline: true,
            },
        ],
        'array-bracket-spacing': [
            'error',
            'always',
        ],
        'block-spacing': 'error',
        'brace-style': [
            'error',
            'stroustrup',
        ],
        'camelcase': 'error',
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': [
            'error',
            'always',
        ],
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'warn',
        'func-names': [
            'warn',
            'as-needed',
        ],
        'func-style': [
            'error',
            'declaration',
        ],
        'function-paren-newline': 'error',
        'implicit-arrow-linebreak': 'error',
        'import/no-unresolved': 'error',
        'indent': [
            'error',
            INDENT_SIZE,
            {
                SwitchCase: 1,
                ignoredNodes: [ 'JSXElement' ], // ignore to avoid conflict with jsx-indent which works a little differently.
            },
        ],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': [
            'error',
            // LF vs. CRLF. One of the most common issues in some projects. Will be easier to notice in case this is ever copied over to a project with a different style.
            'unix',
        ],
        'lines-around-comment': [
            'error',
            {
                afterBlockComment: true,
                allowBlockStart: true,
                allowClassStart: true,
                allowObjectStart: true,
                allowArrayStart: true,
            },
        ],
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'max-depth': 'warn',
        'max-lines-per-function': [
            'warn',
            {
                max: 100,
            },
        ],
        'max-nested-callbacks': [
            'error',
            VALID_NUMBER_OF_CALLBACKS,
        ],
        'max-params': 'warn',
        'max-statements-per-line': 'error',
        'multiline-ternary': [
            'error',
            'always',
        ],
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-per-chained-call': [
            'warn',
            {
                ignoreChainWithDepth: 1,
            },
        ],
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-continue': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': [
            'error', {
                max: 1,
                maxBOF: 0,
                maxEOF: 1,
            },
        ],
        'no-negated-condition': 'warn',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    minProperties: 1,
                },
                ObjectPattern: {
                    multiline: true,
                },
                ImportDeclaration: {
                    consistent: true,
                },
                ExportDeclaration: {
                    consistent: true,
                },
            },
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'object-property-newline': 'error',
        'one-var': [
            'error',
            'never',
        ],
        'one-var-declaration-per-line': [
            'error',
            'always',
        ],
        'operator-assignment': 'error',
        'operator-linebreak': [
            'error',
            'after',
        ],
        'padded-blocks': [
            'error',
            'never',
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'block-like',
                    'break',
                    'case',
                    'class',
                    'continue',
                    'iife',
                    'return',
                    'throw',
                ],
            },
            {
                blankLine: 'always',
                prev: [
                    'directive',
                    'import',
                    'export',
                    'const',
                    'let',
                    'block-like',
                ],
                next: '*',
            },
            {
                blankLine: 'always',
                prev: [ 'expression' ],
                next: [
                    'const',
                    'let',
                ],
            },
            {
                blankLine: 'never',
                prev: 'directive',
                next: 'directive',
            },
            {
                blankLine: 'any',
                prev: 'import',
                next: 'import',
            },
            {
                blankLine: 'any',
                prev: 'export',
                next: 'export',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                ],
                next: [
                    'const',
                    'let',
                ],
            },
        ],
        'prefer-object-spread': 'error',
        'quote-props': [
            'error',
            'consistent-as-needed',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': 'error',
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-in-parens': [
            'error',
            'always',
        ],
        'space-infix-ops': 'error',
        'space-unary-ops': [
            'error',
            {
                overrides: {
                    '!': true,
                },
            },
        ],
        'switch-colon-spacing': 'error',
        'template-tag-spacing': 'error',
        'unicode-bom': 'error',

        /**
         * ECMAScript 6.
         * https://eslint.org/docs/rules/#ecmascript-6
         */

        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'generator-star-spacing': 'error',
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true,
            },
        ],
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': [
            'error',
            'always',
        ],

        /**
         * https://www.npmjs.com/package/eslint-plugin-react
         */

        'react/prop-types': 'off',
        'react/jsx-curly-spacing': [
            'error',
            {
                when: 'always',
                children: true,
            },
        ],
        'react/jsx-max-props-per-line': [
            'error',
            {
                maximum: 1,
            },
        ],
        'react/jsx-first-prop-new-line': [
            'error',
            'multiline',
        ],
        'react/forbid-dom-props': [ 'error' ],
        'react/forbid-elements': [ 'error' ],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration',
            },
        ],
        'react/no-array-index-key': [ 'error' ],
        'react/no-invalid-html-attribute': [ 'error' ],
        'react/self-closing-comp': [ 'error' ],
        'react/jsx-closing-bracket-location': [ 'error' ],
        'react/jsx-closing-tag-location': [ 'error' ],
        'react/jsx-no-useless-fragment': [ 'error' ],
        'react/jsx-pascal-case': [ 'error' ],
        'react/jsx-tag-spacing': [ 'error' ],
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'jsx-quotes': [ 'error', 'prefer-single' ],
        'react/jsx-equals-spacing': [ 'error', 'never' ],
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-wrap-multilines': [
            'error', {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'ignore',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ],
        'react/jsx-indent': [ 'error', INDENT_SIZE ],

        'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
        'react': {
            // React version. "detect" automatically picks the version you have installed.
            version: 'detect',
        },
        'import/resolver': {
            jsconfig: {
                config: './jsconfig.json',
            },
        },
    },

    overrides: [
        {
            files: [ '**/*.test.js' ],
            env: {
                jest: true,
            },
            rules: {

                /* Tests have more nested structure because of describe/test directives usage, so we need to increase max number of nester callbacks in comparison with parent eslint config. */

                'max-nested-callbacks': [
                    'error',
                    4,
                ],

                /* In tests we often operate with some stub numbers, timers. Code will be cleaner if we disable this rule. */

                'no-magic-numbers': 'off',

                /* In tests we often pass to components empty functions to avoid unnecessary code */

                'no-empty-function': 'off',
            },
        },
    ],
};
