angular.module("../fixtures/test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test.tpl.html",
    "Testing01...");
}]);

angular.module("../fixtures/test2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test2.tpl.html",
    "Testing02...");
}]);

angular.module("../fixtures/test3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../fixtures/test3.tpl.html",
    "<div class=\"quotes should be escaped\">\n" +
    "  <span>\n" +
    "    <span>\n" +
    "      <span>\n" +
    "        Lorem ipsum\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </span>\n" +
    "</div>");
}]);
