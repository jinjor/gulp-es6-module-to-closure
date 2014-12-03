var FileInfo = require('../lib/file-info.js');
var HeaderExtractor = require('../lib/header-extractor.js');

describe('path-resolver', function() {

    it('can resolve path', function() {
        var fi = new FileInfo(new HeaderExtractor(), true);
        fi.get('spec/fixtures/src/import.js').then(function(info) {
            expect(info).toBeTruthy();
        }, function(e) {
            console.log(e);
            throw e;
        });
        fi.get('spec/fixtures/src/export.js').then(function(info) {
            expect(info).toBeTruthy();
        }, function(e) {
            console.log(e);
            throw e;
        });
    });

});