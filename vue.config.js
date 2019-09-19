module.exports = {
  devServer: {
    proxy: 'https://platform.ibanfirst.com',
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
}
