module.exports = {
  default: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'junit:test-results/cucumber-report.xml'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['src/features/**/*.feature'],
    publishQuiet: true,
    dryRun: false,
    parallel: 2
  },
  chrome: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    format: ['progress-bar', 'json:test-results/cucumber-report.json'],
    paths: ['src/features/**/*.feature'],
    parallel: 2
  },
  firefox: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    format: ['progress-bar', 'json:test-results/cucumber-report.json'],
    paths: ['src/features/**/*.feature'],
    parallel: 2
  },
  webkit: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    format: ['progress-bar', 'json:test-results/cucumber-report.json'],
    paths: ['src/features/**/*.feature'],
    parallel: 2
  },
  headed: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    format: ['progress-bar'],
    paths: ['src/features/**/*.feature'],
    parallel: 1
  }
}

