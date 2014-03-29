var app;
try { app = angular.module("template-test"); }
catch(err) { app = angular.module("template-test", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("../templates/test.tpl.html",
    "Testing01...");
}]);

var app;
try { app = angular.module("template-test"); }
catch(err) { app = angular.module("template-test", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("../templates/test2.tpl.html",
    "Testing02...");
}]);

var app;
try { app = angular.module("template-test"); }
catch(err) { app = angular.module("template-test", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("../templates/test3.tpl.html",
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
