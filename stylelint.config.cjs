module.exports = {
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwindcss', 'layer', 'variants', 'responsive', 'screen', 'apply'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          '-webkit-box',
          '-webkit-box-orient',
          '-webkit-line-clamp',
        ],
      },
    ],
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'unit-no-unknown': true,
  },
};
