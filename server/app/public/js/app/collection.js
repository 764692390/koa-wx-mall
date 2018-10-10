requirejs.config({
    "baseUrl": "<%= base.cdn %>/js/lib",
    "paths": {
        "publicTip": "<%= base.cdn %>/js/app/public-tip",
        "zepto": "zepto.min"
    },
    "shim": {
        "jquery.Spinner": ["jquery"]
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip) {
    $(function() {

    });
})