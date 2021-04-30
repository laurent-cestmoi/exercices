
const seeding = require('../seeding');

const issues = require('../../sources/issues.json');

const seed = seeding(async ({ insert }) => {
  await insert('issues', issues);
});

module.exports = seed ;

module.exports.seed = seed ;