module.exports = api => {
  const nodeEnv = api.cache(() => process.env.NODE_ENV)
  const ignore = nodeEnv === 'test' ? [] : [/test\.jsx?$/]
  const presets = ['@babel/preset-env']
  const env = {
    esm: {
      presets: [['@babel/preset-env', { modules: false }]]
    }
  }

  return { ignore, presets, env }
}
