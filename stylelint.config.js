module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwindcss', 'layer', 'variants', 'responsive', 'screen', 'apply'],
      },
    ],
  },
};
