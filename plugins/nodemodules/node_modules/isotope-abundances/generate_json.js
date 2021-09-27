// Michael Porter 2017
// This script will read in the isotopic data
// as it comes from NIST and format it in JSON

var fs = require('fs');
var filename = 'NIST_DATA.dat';

var all_isotopes = [];

fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  var lines = data.split(/\r?\n/);
  var currentIsotope = {}

  lines.forEach(function(line){
    if (line === '') { 
      all_isotopes.push(currentIsotope);
      currentIsotope = {};
      return;
    }
    var key = line.split('=')[0].trim();
    var val = line.split('=')[1].trim();
    currentIsotope[key] = val;
  });

  real_isotopes = {};

  all_isotopes.forEach(function(isotope){
    var symbol = isotope['Atomic Symbol'];
    var mass = isotope['Relative Atomic Mass'].replace(/\(\d{0,}\)/, '');
    var abundance = isotope['Isotopic Composition'].replace(/\(\d{0,}\)/, '');

    if (abundance === '') return;

    if (!(symbol in real_isotopes)){
      real_isotopes[symbol] = [];
    }

    real_isotopes[symbol].push([parseFloat(mass), parseFloat(abundance)]);

    if (symbol === 'D') real_isotopes['H'].push([parseFloat(mass), parseFloat(abundance)]);
  });

  for (var key in real_isotopes) {
    var iso_list = real_isotopes[key];
    var iso_data = [];
    var numerator = 0.0;
    var denominator = 0.0;
    var avg_mass;
    iso_list.forEach(function(entry){
      numerator += entry[0] * entry[1];
      denominator += entry[1];
      iso_data.push({
        'Mass': entry[0],
        'Abundance': entry[1]
      })
    });
    avg_mass = numerator / denominator;
    real_isotopes[key] = {
      'Mass': Math.round(avg_mass * 100000) / 100000,
      'Isotopes': iso_data
    }
  }

  fs.writeFile('./ISOTOPES.json', JSON.stringify(real_isotopes, null, 2), function(err){
    if (err) throw err;
  });
});