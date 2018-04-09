module.exports = {
  extends: 'stylelint-config-recommended-scss',
  rules: {
    // Don't trigger error on empty or yet to be filled files
    'no-empty-source': null,
    // css modules situation my ninja
    'selector-pseudo-class-no-unknown': [ true, {
      ignorePseudoClasses: [
        'export',
        'import',
        'global',
        'local',
      ],
    }],
    'property-no-unknown': [ true, {
      ignoreProperties: [
        'composes',
        'compose-with',
      ],
    }],
  }
}
