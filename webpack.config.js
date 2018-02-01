module.exports = {
  entry: './src/jq.js',
  output: {
    filename: './lib/jq.js'
  },
  module: {
    loaders: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader'
      }
    ]
  }
};
