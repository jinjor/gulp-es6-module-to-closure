var escodegen = require('escodegen');
var esprima = require('esprima-fb');

var Compiler = function() {
}

Compiler.prototype.traverseSomething = function(ast, namespace, header) {
  if (!ast) {

  } else if (Array.isArray(ast)) {
    for (var i = ast.length - 1; i >= 0; i--) {
      var each = ast[i];
      var replace = this.traverseSomething(each, namespace, header);
      // console.log(replace);
      if (replace !== undefined) {
        if (Array.isArray(replace)) {
          var _rep = [i, 1].concat(replace);
          ast.splice.apply(ast, _rep);
        } else {
          ast[i] = replace;
        }
      }
    }
  } else {
    var methodName = 'traverse' + ast.type;
    var method = this[methodName];

    if (method) {
      var replace = method.apply(this, [ast, namespace, header]);
      if (replace) {
        return replace;
      }
    } else if (typeof ast === 'object') {
      Object.keys(ast).forEach(function(key) {
        if (key !== 'type') {
          var replace = this.traverseSomething(ast[key], namespace, header);
          if (replace !== undefined) {
            ast[key] = replace;
          }
        }
      }.bind(this));
    } else {

    }
  }
};

Compiler.prototype.traverseImportDeclaration = function(ast, namespace, header) {
  // console.log(JSON.stringify(ast, null, 5));

  var outs = [];
  for (var i = 0, len = ast.specifiers.length; i < len; i++) {
    var specifier = ast.specifiers[i];
    // console.log(JSON.stringify(ast.source, null, 5));
    var path = ast.source.value;
    var file = ast.source.value.split('/');
    if (file.length >= 3) {
      console.log(file);
      file.pop();
      if(file[0] === '.'){
        file.shift();
      }
      console.log(file);
      var name = file.join('.') + '.' + specifier.id.name;
    } else {
      var name = specifier.id.name;
    }
    // console.log(name, );
    var _name = namespace ? namespace + '.' + name : name;
    
    var out = esprima.parse('goog.require("' + _name + '");');
    outs[i] = out;
    if (header) {
      header.require.push({
        name: specifier.id.name,
        path: path
      });
    }
  }

  if (header) {} else {
    return outs;
  }


}
Compiler.prototype.traverseExportDeclaration = function(ast, namespace, header) {
  // console.log(JSON.stringify(ast, null, 5));
  if (ast.declaration.type === 'VariableDeclaration') {
    var dec = ast.declaration.declarations[0]; //FIXME
    var name = dec.id.name;
    var right = escodegen.generate(dec.init);
    var _name = namespace ?  namespace + '.' + name : name;
    if (header) {
      header.provide.push({
        name: name
      });
    } else {
      return [
        esprima.parse('goog.provide("' + namespace + '.' + name + '");'),
        esprima.parse(_name + ' = ' + right + ';'),
      ];
    }
  } else {
    if (ast.declaration.type !== 'Identifier') {
      throw new Error('not supported');
    }
    var name = ast.declaration.name;
    if (header) {
      header.provide.push({
        name: name
      });
    } else {
      return esprima.parse('goog.provide("' + namespace + '.' + name + '");');
    }

  }

}

Compiler.prototype.getHeader = function(ast) {
  var header = {
    provide: [],
    require: []
  };
  this.traverseSomething(ast, '', header);
  return header;
}


Compiler.prototype.compile = function(ast, namespace) { // contains side effect
  this.traverseSomething(ast, namespace);
  // console.log(JSON.stringify(ast, null, 5));

  return escodegen.generate(ast);
};

module.exports = Compiler;