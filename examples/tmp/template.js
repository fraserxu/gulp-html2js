angular.module("../../test/fixtures/test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../test/fixtures/test.tpl.html",
    "Testing01...");
}]);

angular.module("../../test/fixtures/test2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../test/fixtures/test2.tpl.html",
    "Testing02...");
}]);

angular.module("../../test/fixtures/test3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../test/fixtures/test3.tpl.html",
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
