module.exports = {
  entry: './src/jq.js',
  target: 'node',
  output: {
    filename: './lib/jq.js'
  },
  module: {
    loaders: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?trace=false&cache=true'
      }
    ]
  }
};
