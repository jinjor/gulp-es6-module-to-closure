var FileInfo = require('../lib/file-info.js');
var Compiler = require('../lib/compiler.js');

describe('path-resolver', function() {

    it('can resolve path', function() {
        var c = new Compiler();
        var fi = new FileInfo(c, true);
        fi.get('spec/fixtures/src/import.js').then(function(text) {
            console.log(text);
            expect(text).toBeTruthy();
        }, function(e) {
            console.log(e);
            throw e;
        });
        fi.get('spec/fixtures/src/export.js').then(function(text) {
            console.log(text);
            expect(text).toBeTruthy();
        }, function(e) {
            console.log(e);
            throw e;
        });
    });

});