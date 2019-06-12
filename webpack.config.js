const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/js/quadStrike.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map'
};