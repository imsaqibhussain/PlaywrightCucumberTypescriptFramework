module.exports = {
  /* Existing Behaviour of running one file */
  default:
    '--require tests/features/support/hooks.ts --require tests/step-definitions/*.ts --require-module ts-node/register',
};
