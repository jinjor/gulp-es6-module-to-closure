goog.provide("import");
goog.provide("import.bar");

goog.require("package1.default");

goog.scope(function() {
    var ab = package1.default;

    var bar = 'z' + ab;;
    import.bar = bar;
});