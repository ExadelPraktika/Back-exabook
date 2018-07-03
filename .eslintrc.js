module.exports = {
    "extends": "airbnb",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "rules": {
        "max-len": [2, 120, 2], 
        "linebreak-style": ["error", "windows"],
        "func-names": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "no-else-return": ["error", { "allowElseIf": true }],
        "parserOptions": {
          "sourceType": "module"
        },
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }]
      }
}
