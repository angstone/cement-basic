module.exports = function(w) {
  return {
    files: [
      { pattern: 'src/**/*.spec.ts', ignore: true },
      { pattern: 'src/**/constants/*', ignore: true },
      'src/**/*.ts',
    ],
    tests: [
      // { pattern: 'src/**/app.spec.ts', ignore: true },
      'src/**/*.spec.ts',
      'e2eSpecs/**/*.spec.ts',
    ],

    env: {
      type: 'node',
    },

    // workers: {
    // //  initial: 1,
    // //  regular: 1,
    //   recycle: true,
    // },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'mocha',

    setup: function(w) {
      const mocha = w.testFramework

      const fs = require('fs')
      fs.copyFileSync(
        w.localProjectDir + '/mocha-globals.js',
        w.projectCacheDir + '/mocha-globals.js'
      )
      mocha.addFile('mocha-globals.js')
    },
  }
}
