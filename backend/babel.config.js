module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }],
    "@babel/preset-typescript"
  ],
  plugins: [
    ['inline-dotenv', {
      path: './.env'
    }],
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@routes': './src/routes',
        '@database': './src/database',
        '@services': './src/services',
        '@middlewares': './src/middlewares',
        '@errors': './src/errors',
        '@config': './src/config',
        '@interfaces': './src/interfaces'
      }
    }]
  ]
}
