
module.exports = {
    parser: "babel-eslint",
    rules: {
        "graphql/template-strings": ['error', {
            env: 'apollo',
        }]
    },
    "env": {
        "es6": true,
        "node": true,
    },
    plugins: [
        'graphql',
    ]
};