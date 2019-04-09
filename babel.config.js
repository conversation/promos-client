module.exports = api => {
  const env = api.cache(() => process.env.NODE_ENV)
  const ignore = env === 'test' ? [] : [/test\.jsx?$/]
  const presets = ['@babel/preset-env']

  return { ignore, presets }
}
