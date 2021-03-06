define(["exports"], function (exports) {
	"use strict";

	requirejs.config({
		baseUrl: '/scripts',
		paths: {
			"backbone": "lib/backbone/backbone.js",
			"backbone.babysitter": "lib/backbone.babysitter/lib/backbone.babysitter.js",
			"backbone.marionette": "lib/backbone.marionette/lib/backbone.marionette.js",
			"backbone.wreqr": "lib/backbone.wreqr/lib/backbone.wreqr.js",
			"jade": "lib/jade/runtime.js",
			"jquery": "lib/jquery/dist/jquery.js",
			"underscore": "lib/underscore/underscore.js"
		}
	});

	require(['app'], function (startApp) {
		startApp();
	});
});
//# sourceMappingURL=main.js.map
