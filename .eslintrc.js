module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "plugins": [
    "editorconfig",
    "import",
    "html",
  ],
  "extends": "airbnb-base",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [2, {
      ignore: ['^@/'],
    }],
    "import/prefer-default-export": 0,
    "max-len": 0,
    "no-console": [1, {
      allow: ["warn", "error"],
    }],
    "no-nested-ternary": 0,
  }
};
