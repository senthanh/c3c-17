var should = require('chai').should();
var isoAbund = require('../index');

describe('Isotope Abundances', function() {
    it('returns {} if no element specified', function() {
        isoAbund('INVALID').should.deep.equal({});
    });

    it('two isotopes for Hydrogen', function() {
        isoAbund('H').Isotopes.length.should.equal(2);
    });
});