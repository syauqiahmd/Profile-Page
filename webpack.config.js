// ini file untuk konfigurasi webpack
module.exports = {
  mode: "production",
  entry: {
    app: "./resource/js/app.js"
  },
  output: {
    path: __dirname + "/assets/js",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}