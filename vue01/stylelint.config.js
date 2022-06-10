module.exports = {
  'extends'     : ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  'plugins'     : ['stylelint-scss'],
  'ignoreFiles' : ['src/sass/vendor/**/*'],
  'rules'       : {
    'selector-class-pattern'   : null,
    'scss/at-mixin-pattern'    : null,
    'scss/at-function-pattern' : null,
    'max-nesting-depth'        : 10
  }
};
