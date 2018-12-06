module.exports = {
  presets: [
    '@vue/app'
  ],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/assets/sass/global.scss")]
    }
  }
}
