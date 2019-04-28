module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "settings": {
        "import/resolver": {
          "alias": {
              "map: [
                ["@", "./src"]
              ],
              "extensions": [".js"]
           }
        }
    },
    "rules": {
        "indent": [2, 4],
    },
};