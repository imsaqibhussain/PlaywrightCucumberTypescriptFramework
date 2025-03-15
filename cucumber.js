module.exports = {
  default: [
    '--require tests/features/support/hooks.ts',
    '--require tests/step-definitions/*.ts',
    '--require-module ts-node/register',
    '--format json:reports/cucumber-report.json', // Generates JSON report
    '--publish-quiet'
  ].join(' '),
};
