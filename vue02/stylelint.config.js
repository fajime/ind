module.exports = {
  'extends'         : ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  'ignoreFiles'     : ['coverage/**/*', 'dist/**/*'],
  'defaultSeverity' : 'warning',
  'overrides'       : [
    {
      'files'        : ['**/*.html', '**/*.vue'],
      'customSyntax' : 'postcss-html'
    }
  ],
  'rules' : {
    'selector-class-pattern'                             : null,
    'max-nesting-depth'                                  : 10,
    'string-quotes'                                      : 'single',
    'color-function-notation'                            : 'legacy',
    'alpha-value-notation'                               : 'number',
    'declaration-block-no-redundant-longhand-properties' : null,
    'shorthand-property-no-redundant-values'             : null,
    'number-max-precision'                               : null,
    'value-keyword-case'                                 : ['lower', { 'camelCaseSvgKeywords' : true }]
  }
};
