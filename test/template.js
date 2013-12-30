angular.module("../test/fixtures/test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/test.tpl.html",
    "Testing01...");
}]);

angular.module("../test/fixtures/test2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/test2.tpl.html",
    "Testing02...");
}]);
