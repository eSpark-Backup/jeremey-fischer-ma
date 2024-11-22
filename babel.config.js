module.exports = function (api) {
  api.cache(true);
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.BABEL_ENV === 'production'
  ) {
    return {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
        ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
      ],
    };
  } else {
    return {
      presets: ['module:@react-native/babel-preset'],
    };
  }
};
