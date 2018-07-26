module.exports = {
    "extends": "airbnb",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "rules": {
        "max-len": [2, 160, 2], 
        "linebreak-style": ["error", "windows"],
        "func-names": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "no-else-return": ["error", { "allowElseIf": true }],
        "parserOptions": {
          "sourceType": "module"
        },
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "consistent-return": ["error", { "treatUndefinedAsUnspecified": false }],
        'dot-notation': ["error", { "allowKeywords": true }],
        'arrow-body-style': ["error", "always"],
        
        'object-shorthand': [2, "consistent"],
        'no-restricted-imports': ["error", "passport"],
        'no-unused-vars': [2, { "args": "none" }],
        'no-empty': ["error", { allowEmptyCatch: true }],
        'no-shadow': ["error", { "hoist": "functions" }]
      }
}
