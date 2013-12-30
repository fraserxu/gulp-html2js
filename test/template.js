angular.module("../fixtures/test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test.tpl.html",
    "Testing01...");
}]);

angular.module("../fixtures/test2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test2.tpl.html",
    "Testing02...");
}]);
