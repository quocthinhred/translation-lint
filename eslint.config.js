"use strict";

// Import the plugin downloaded from npm
const eslintPluginExample = require("eslint-plugin-example");
const babelEslint = require("@babel/eslint-parser")

module.exports = [
    {
        files: ["src/components/**/*.js"],
        languageOptions: {
            sourceType: "module",
            ecmaVersion: "latest",
            parser: babelEslint,
            "parserOptions": {
                "ecmaVersion": 6,
                "sourceType": "module",
                "requireConfigFile": false,
                "ecmaFeatures": {
                    "jsx": true,
                    "modules": true,
                    "experimentalObjectRestSpread": true
                },
                "babelOptions": {
                    "presets": ["@babel/preset-react"]
                },
            }
        },
        // Using the eslint-plugin-example plugin defined locally
        plugins: { "example": eslintPluginExample },
        rules: {
            "example/foo-bar": "error",
        },
    }
]