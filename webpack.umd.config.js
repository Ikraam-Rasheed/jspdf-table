const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
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
    filename: 'index.umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'jspdfDynamicTables',
      type: 'umd',
    },
    globalObject: 'this',
    clean: false,
  },
  externals: {
    jspdf: {
      commonjs: 'jspdf',
      commonjs2: 'jspdf',
      amd: 'jspdf',
      root: 'jspdf',
    },
  },
};