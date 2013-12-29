angular.module('templates-js', ['../fixtures/test2.tpl.html']);

angular.module("../fixtures/test2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test2.tpl.html",
    "Testing02...");
}]);
