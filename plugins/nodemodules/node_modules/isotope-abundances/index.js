var isotopes = require('./ISOTOPES.json');

module.exports = function(element){
  if (!(element in isotopes)) return {};

  return isotopes[element];
}