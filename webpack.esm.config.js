const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.esm.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
    clean: false,
  },
  externals: {
    jspdf: 'jspdf',
  },
  optimization: {
    minimize: false,
  },
};