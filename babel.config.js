const plugins = [];
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  "presets": ["@babel/env", "@babel/preset-react"],
  plugins
}
