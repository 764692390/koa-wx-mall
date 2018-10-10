requirejs.config({
    "baseUrl": "/js/lib",
    "paths": {
        "index": "/js/app/index",
        "publicTip": "/js/app/public-tip",
        "public": "/js/app/public",
        "zepto": "zepto.min",
        "vue": "vue.min",
        "vue-resource": "vue-resource.min"
    }
});

requirejs(["index"]);